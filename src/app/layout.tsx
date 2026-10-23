import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Script from "next/script";
import { getClient } from "@/clients";
import { Header } from "@/core/components/Header";
import { Footer } from "@/core/components/Footer";
import { CookieBanner } from "@/core/components/CookieBanner";
import "@fontsource-variable/montserrat";
import "./globals.css";

const config = getClient();

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const t = config.theme;
  const gtmId = config.tracking?.gtmId;
  const vars = {
    "--primary": t.primary,
    "--primary-text": t.primaryText,
    "--primary-soft": t.primarySoft,
    "--navy": t.navy,
    "--text": t.text,
    "--muted": t.muted,
    "--bg": t.bg,
    "--surface": t.surface,
    "--border": t.border,
  } as CSSProperties;

  return (
    <html lang={config.lang} style={vars}>
      {gtmId && (
        <head>
          <Script id="gtm" strategy="beforeInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});try{if(JSON.parse(localStorage.getItem('cookie-consent-v2')).status==='accepted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'})}}catch(e){}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        </head>
      )}
      <body>
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <Header config={config} />
        <main>{children}</main>
        <Footer config={config} />
        <CookieBanner config={config} />
      </body>
    </html>
  );
}
