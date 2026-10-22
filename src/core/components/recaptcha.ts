/** reCAPTCHA v3 (invisível). O script do Google só é carregado quando o formulário aparece. */

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, opts: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

const SCRIPT_ID = "recaptcha-api";

export function loadRecaptcha(siteKey: string) {
  if (document.getElementById(SCRIPT_ID)) return;
  const s = document.createElement("script");
  s.id = SCRIPT_ID;
  s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
  s.async = true;
  s.defer = true;
  document.head.appendChild(s);
}

export function getRecaptchaToken(siteKey: string, action: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const g = window.grecaptcha;
    if (!g) return reject(new Error("recaptcha não carregou"));
    g.ready(() => g.execute(siteKey, { action }).then(resolve, reject));
  });
}
