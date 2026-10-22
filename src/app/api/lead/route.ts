import { NextResponse } from "next/server";
import { emailConfigured, sendLeadEmail } from "@/core/leads/email";

export const runtime = "nodejs";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[+0-9 ()\-]{9,20}$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // honeypot: bots preenchem, humanos não. Respondemos "ok" para não dar pistas.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (secret) {
    const token = String(body.captcha ?? "");
    let human = false;
    if (token) {
      try {
        const r = await fetch("https://www.google.com/recaptcha/api/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ secret, response: token }),
        });
        const v = await r.json();
        // v3 devolve uma pontuação (0 = bot, 1 = humano)
        human = v.success === true && v.action === "lead" && (v.score ?? 0) >= 0.5;
        if (!human) console.warn("[lead] reCAPTCHA recusado:", JSON.stringify(v));
      } catch (e) {
        console.error("[lead] falha ao validar reCAPTCHA", e);
        return NextResponse.json({ ok: false }, { status: 502 });
      }
    }
    if (!token) console.warn("[lead] pedido sem token reCAPTCHA");
    if (!human) return NextResponse.json({ ok: false, error: "captcha" }, { status: 422 });
  }

  const str = (k: string, max: number) =>
    String(body[k] ?? "").trim().slice(0, max);

  const lead = {
    client: str("client", 60),
    choice: str("choice", 60),
    amount: str("amount", 80),
    name: str("name", 120),
    phone: str("phone", 30),
    email: str("email", 160),
    message: str("message", 2000),
    consent: body.consent === undefined ? null : body.consent === true,
    page: str("page", 300),
    receivedAt: new Date().toISOString(),
  };

  if (
    lead.name.length < 2 ||
    !emailRe.test(lead.email) ||
    !phoneRe.test(lead.phone) ||
    !lead.amount ||
    lead.consent === false
  ) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const hook = process.env.LEAD_WEBHOOK_URL;
  const byEmail = emailConfigured();

  if (!hook && !byEmail) {
    // Nada configurado: regista em log do servidor (útil em dev).
    console.warn("[lead] sem LEAD_WEBHOOK_URL nem LEAD_EMAIL_TO/SMTP_HOST. Lead:", lead);
    return NextResponse.json({ ok: true });
  }

  // Cada canal é independente: o lead só se perde se TODOS falharem.
  const jobs: Promise<void>[] = [];
  if (hook) {
    jobs.push(
      fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      }).then((r) => {
        if (!r.ok) throw new Error(`webhook ${r.status}`);
      })
    );
  }
  if (byEmail) jobs.push(sendLeadEmail(lead));

  const results = await Promise.allSettled(jobs);
  results.forEach((r) => {
    if (r.status === "rejected") console.error("[lead] falha no envio", r.reason);
  });
  if (results.some((r) => r.status === "fulfilled")) {
    console.log(`[lead] enviado (${hook ? "webhook" : ""}${hook && byEmail ? " + " : ""}${byEmail ? "email" : ""}): ${lead.name}`);
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false }, { status: 502 });
}
