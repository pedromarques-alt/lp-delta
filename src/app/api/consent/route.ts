import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Regista a prova de consentimento (cookies + política de privacidade).
 * Cada registo é enviado para CONSENT_WEBHOOK_URL (Make/Sheets/CRM/BD) e escrito
 * no log do servidor. O `hash` permite detetar alterações posteriores ao registo.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const str = (k: string, max: number) => String(body[k] ?? "").trim().slice(0, max);
  const id = str("id", 40);
  const status = str("status", 10);
  if (!uuidRe.test(id) || (status !== "accepted" && status !== "rejected")) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const record = {
    type: "consent",
    id,
    status,
    client: str("client", 60),
    policyVersion: str("policyVersion", 60),
    cookieText: str("cookieText", 600),
    privacyNotice: str("privacyNotice", 300),
    page: str("page", 300),
    clientTimestamp: str("at", 40),
    receivedAt: new Date().toISOString(),
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
    userAgent: (req.headers.get("user-agent") ?? "").slice(0, 300),
  };
  const hash = createHash("sha256").update(JSON.stringify(record)).digest("hex");
  const signed = { ...record, hash };

  console.log("[consent]", JSON.stringify(signed));

  const hook = process.env.CONSENT_WEBHOOK_URL;
  if (hook) {
    try {
      const r = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signed),
      });
      if (!r.ok) throw new Error(`webhook ${r.status}`);
    } catch (e) {
      console.error("[consent] falha no webhook", e);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  }
  return NextResponse.json({ ok: true });
}
