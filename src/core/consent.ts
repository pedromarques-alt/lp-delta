"use client";

import { useEffect, useState } from "react";
import type { ClientConfig } from "./types";

export const CONSENT_STORAGE_ITEM = "cookie-consent-v2";
const CONSENT_EVENT = "consent-change";

export type ConsentStatus = "accepted" | "rejected";

/** Registo local da escolha. O `id` liga o lead ao registo guardado no servidor. */
export interface StoredConsent {
  id: string;
  status: ConsentStatus;
  at: string;
  policyVersion: string;
  synced: boolean;
}

export function readConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_ITEM);
    if (!raw) return null;
    const v = JSON.parse(raw) as StoredConsent;
    if ((v.status === "accepted" || v.status === "rejected") && v.id) return v;
  } catch {}
  return null;
}

function writeConsent(v: StoredConsent) {
  try {
    localStorage.setItem(CONSENT_STORAGE_ITEM, JSON.stringify(v));
  } catch {}
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/** Envia a prova de consentimento para o servidor (data, versão, textos mostrados). */
async function syncConsent(v: StoredConsent, config: ClientConfig): Promise<void> {
  try {
    const res = await fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        id: v.id,
        status: v.status,
        at: v.at,
        client: config.id,
        policyVersion: v.policyVersion,
        cookieText: config.cookies.text,
        privacyNotice: config.cookies.privacyNotice,
        page: window.location.href,
      }),
    });
    if (res.ok) writeConsent({ ...v, synced: true });
  } catch {}
}

/** randomUUID só existe em contextos seguros (https/localhost); fora disso usa getRandomValues. */
function newId(): string {
  try {
    if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  } catch {}
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

export function saveConsent(status: ConsentStatus, config: ClientConfig) {
  const v: StoredConsent = {
    id: newId(),
    status,
    at: new Date().toISOString(),
    policyVersion: config.legal.lastUpdated,
    synced: false,
  };
  writeConsent(v);
  void syncConsent(v, config);
}

/** Estado atual do consentimento; `ready` só fica true no cliente (evita mismatch de hidratação). */
export function useConsent(config: ClientConfig) {
  const [consent, setConsent] = useState<StoredConsent | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = () => setConsent(readConsent());
    load();
    setReady(true);
    window.addEventListener(CONSENT_EVENT, load);
    window.addEventListener("storage", load);
    // Se o envio anterior falhou (offline, erro), volta a tentar
    const stored = readConsent();
    if (stored && !stored.synced) void syncConsent(stored, config);
    return () => {
      window.removeEventListener(CONSENT_EVENT, load);
      window.removeEventListener("storage", load);
    };
  }, [config]);

  return { consent, ready };
}
