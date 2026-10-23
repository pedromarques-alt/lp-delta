import { createHash } from "node:crypto";

export interface ConsentRecord {
  /** "consent" = escolha no banner; "lead" = pedido enviado com consentimento (inclui nome/email) */
  type: "consent" | "lead";
  id: string;
  status: string;
  client: string;
  name: string;
  email: string;
  policyVersion: string;
  cookieText: string;
  privacyNotice: string;
  page: string;
  clientTimestamp: string;
  receivedAt: string;
  userAgent: string;
}

/**
 * Escreve a prova de consentimento no log e envia-a para CONSENT_WEBHOOK_URL.
 * O `hash` permite detetar alterações posteriores ao registo. Lança erro se o webhook falhar.
 */
export async function logConsent(record: ConsentRecord) {
  // Data e hora legíveis, em hora de Lisboa (ex.: 23/10/2026 12:23:49)
  const dataHora = new Date(record.receivedAt).toLocaleString("pt-PT", {
    timeZone: "Europe/Lisbon",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).replace(",", "");
  const full = { ...record, dataHora };
  const hash = createHash("sha256").update(JSON.stringify(full)).digest("hex");
  const signed = { ...full, hash };
  console.log("[consent]", JSON.stringify(signed));

  const hook = process.env.CONSENT_WEBHOOK_URL;
  if (!hook) return;
  const r = await fetch(hook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signed),
  });
  if (!r.ok) throw new Error(`webhook ${r.status}`);
}
