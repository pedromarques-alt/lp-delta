"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ClientConfig } from "../types";
import { Icon } from "./Icon";
import { saveConsent, useConsent } from "../consent";
import { getRecaptchaToken, loadRecaptcha } from "./recaptcha";

type Status = "idle" | "sending" | "ok" | "error";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export function LeadForm({ config }: { config: ClientConfig }) {
  const f = config.form;
  const [choice, setChoice] = useState(f.choice.options[0]?.value ?? "");
  const [status, setStatus] = useState<Status>("idle");
  const { consent, ready } = useConsent(config);
  const accepted = consent?.status === "accepted";

  useEffect(() => {
    if (SITE_KEY) loadRecaptcha(SITE_KEY);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!consent || consent.status !== "accepted") return;
    const data = new FormData(form);
    const payload = {
      client: config.id,
      choice,
      phase: String(data.get("phase") ?? ""),
      amount: String(data.get("amount") ?? ""),
      income: String(data.get("income") ?? ""),
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      consent: f.consentCheckbox ? data.get("consent") === "on" : undefined,
      cookieConsentId: consent.id,
      policyVersion: consent.policyVersion,
      website: String(data.get("website") ?? ""), // honeypot
      page: typeof window !== "undefined" ? window.location.href : "",
    };
    setStatus("sending");
    try {
      const captcha = SITE_KEY ? await getRecaptchaToken(SITE_KEY, "lead") : "";
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, captcha }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("ok");
      form.reset();
      (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
        event: "generate_lead",
      });
      (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.(
        "track",
        "Lead"
      );
    } catch (err) {
      console.error("[lead] envio falhou", err);
      setStatus("error");
    }
  }

  return (
    <section className="form-section" id={f.id}>
      <div className="container">
        <div className="form-card">
          <div className="form-top">
            <span className="pill pill-sm">{f.badge}</span>
            {f.progress && (
              <div className="progress" aria-hidden="true">
                <span>
                  {f.progress.current} de {f.progress.total}
                </span>
                <div className="bar">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(f.progress.current / f.progress.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <h2>{f.title}</h2>
          <p className="form-sub">{f.subtitle}</p>

          {status === "ok" ? (
            <div className="form-success" role="status">
              <span className="tick tick-lg">
                <Icon name="check" size={26} />
              </span>
              <h3>{f.successTitle}</h3>
              <p>{f.successText}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate={false} aria-disabled={!accepted}>
              {ready && !accepted && (
                <div className="consent-blocked" role="alert">
                  <p>{config.cookies.formBlocked}</p>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => saveConsent("accepted", config)}
                  >
                    {config.cookies.formAccept}
                  </button>
                </div>
              )}
              <div
                className={ready && !accepted ? "form-locked" : undefined}
                inert={ready && !accepted}
              >
              <fieldset className="field">
                <legend>
                  {f.choice.label} <span className="req">*</span>
                </legend>
                <div className="choices">
                  {f.choice.options.map((o) => (
                    <label
                      key={o.value}
                      className={`choice ${choice === o.value ? "is-active" : ""}`}
                    >
                      <input
                        type="radio"
                        name="choice"
                        value={o.value}
                        checked={choice === o.value}
                        onChange={() => setChoice(o.value)}
                      />
                      <Icon name={o.icon} size={22} />
                      <span>{o.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {(
                [
                  ["phase", f.phaseSelect],
                  ["amount", f.select],
                  ["income", f.incomeSelect],
                ] as const
              ).map(([name, sel]) => (
                <div className="field" key={name}>
                  <label htmlFor={name}>
                    {sel.label} <span className="req">*</span>
                  </label>
                  <select id={name} name={name} required defaultValue="">
                    <option value="" disabled>
                      {sel.placeholder}
                    </option>
                    {sel.options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              <div className="field-row">
                <div className="field">
                  <label htmlFor="name">
                    {f.labels.name} <span className="req">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder={f.labels.namePlaceholder}
                    required
                    minLength={2}
                  />
                </div>
                <div className="field">
                  <label htmlFor="phone">
                    {f.labels.phone} <span className="req">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder={f.labels.phonePlaceholder}
                    required
                    pattern="[+0-9 \(\)\-]{9,20}"
                    title="Número de telefone válido (9 a 20 dígitos)"
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="email">
                  {f.labels.email} <span className="req">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={f.labels.emailPlaceholder}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="message">
                  {f.labels.message}{" "}
                  <span className="opt">({f.labels.optional})</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder={f.labels.messagePlaceholder}
                />
              </div>

              {/* honeypot anti-spam */}
              <div className="hp" aria-hidden="true">
                <label>
                  Website
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              {f.consentCheckbox && (
                <label className="consent">
                  <input type="checkbox" name="consent" required />
                  <span>
                    {f.consentText}{" "}
                    <Link href="/politica-de-privacidade" target="_blank">
                      {config.labels.privacy}
                    </Link>
                    .
                  </span>
                </label>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={status === "sending" || !accepted}
              >
                {status === "sending" ? f.submitting : f.submit}
                <Icon name="arrow" size={16} />
              </button>

              {status === "error" && (
                <p className="form-error" role="alert">
                  {f.errorText}
                </p>
              )}

              <p className="privacy-note">
                <Icon name="lock" size={14} />
                {f.privacyNote}
              </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
