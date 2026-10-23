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
  ip: string | null;
  userAgent: string;
}

/**
 * Escreve a prova de consentimento no log e envia-a para CONSENT_WEBHOOK_URL.
 * O `hash` permite detetar alterações posteriores ao registo. Lança erro se o webhook falhar.
 */
export async function logConsent(record: ConsentRecord) {
  const hash = createHash("sha256").update(JSON.stringify(record)).digest("hex");
  const signed = { ...record, hash };
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
