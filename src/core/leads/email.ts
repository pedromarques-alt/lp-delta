import nodemailer from "nodemailer";

export interface Lead {
  client: string;
  choice: string;
  phase: string;
  amount: string;
  income: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean | null;
  page: string;
  cookieConsentId: string;
  policyVersion: string;
  ip: string | null;
  userAgent: string;
  receivedAt: string;
}

/** Lista de distribuição: LEAD_EMAIL_TO aceita vários emails separados por vírgula ou ponto e vírgula. */
export function leadRecipients(): string[] {
  return (process.env.LEAD_EMAIL_TO ?? "")
    .split(/[,;\s]+/)
    .map((e) => e.trim())
    .filter(Boolean);
}

export function emailConfigured() {
  return leadRecipients().length > 0 && !!process.env.SMTP_HOST;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function sendLeadEmail(lead: Lead) {
  const port = Number(process.env.SMTP_PORT ?? 587);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });

  const rows: [string, string][] = [
    ["Nome", lead.name],
    ["Telefone", lead.phone],
    ["Email", lead.email],
    ["Pedido", lead.choice],
    ["Fase do processo", lead.phase],
    ["Valor pretendido", lead.amount],
    ["Rendimento líquido mensal do agregado", lead.income],
    ["Mensagem", lead.message || "—"],
    ["Página", lead.page],
    ["Recebido em", lead.receivedAt],
    ["Consentimento (ID)", lead.cookieConsentId],
    ["Versão das políticas aceites", lead.policyVersion],
    ["IP", lead.ip ?? "—"],
  ];

  const message = {
    from: process.env.LEAD_EMAIL_FROM || process.env.SMTP_USER,
    replyTo: lead.email,
    subject: `Novo lead (${lead.client || "site"}): ${lead.name}`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    html:
      `<table cellpadding="6" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">` +
      rows
        .map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`)
        .join("") +
      `</table>`,
  };

  // Uma mensagem por destinatário: ninguém vê os outros emails e uma falha não bloqueia as restantes.
  const to = leadRecipients();
  const results = await Promise.allSettled(
    to.map((address) => transport.sendMail({ ...message, to: address }))
  );
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[lead] email falhou para ${to[i]}`, r.reason);
  });
  if (results.every((r) => r.status === "rejected")) {
    throw new Error("nenhum email foi enviado");
  }
}
