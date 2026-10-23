"use client";

import Link from "next/link";
import Script from "next/script";
import type { ClientConfig } from "../types";
import { saveConsent, useConsent, type ConsentStatus } from "../consent";

export function CookieBanner({ config }: { config: ClientConfig }) {
  const { consent: stored, ready } = useConsent(config);
  const consent = stored?.status ?? null;

  function choose(v: ConsentStatus) {
    saveConsent(v, config);
    // Consent Mode v2: o GTM já carregou com tudo negado; só atualiza o estado
    if (config.tracking?.gtmId) {
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer = w.dataLayer || [];
      const state = v === "accepted" ? "granted" : "denied";
      // gtag() empurra o objeto `arguments`, que o GTM exige para comandos de consentimento
      (function (..._args: unknown[]) {
        w.dataLayer!.push(arguments);
      })("consent", "update", {
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state,
        analytics_storage: state,
      });
    }
  }

  const t = config.tracking;

  return (
    <>
      {/* Scripts de medição só carregam após consentimento */}
      {consent === "accepted" && t?.gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${t.gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${t.gaId}');`}
          </Script>
        </>
      )}
      {consent === "accepted" && t?.metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${t.metaPixelId}');fbq('track','PageView');`}
        </Script>
      )}

      {ready && consent === null && (
        <div className="cookie-banner" role="dialog" aria-label="Cookies">
          <div className="cookie-text">
          <p>
            {config.cookies.text}{" "}
            <Link href="/politica-de-cookies">{config.cookies.policyLabel}</Link>
          </p>
          <p className="cookie-privacy">
            {config.cookies.privacyNotice}{" "}
            <Link href="/politica-de-privacidade">{config.labels.privacy}</Link>.
          </p>
          </div>
          <div className="cookie-actions">
            <button className="btn btn-ghost btn-sm" onClick={() => choose("rejected")}>
              {config.cookies.reject}
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => choose("accepted")}>
              {config.cookies.accept}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
