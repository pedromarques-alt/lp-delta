import Link from "next/link";
import type { ClientConfig } from "../types";
import { Icon } from "./Icon";

export function Footer({ config }: { config: ClientConfig }) {
  const { footer, legal, labels } = config;
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      {(footer.partners || footer.registration) && (
        <div className="container footer-top">
          {footer.partners && (
            <div className="partners">
              <p className="eyebrow">{footer.partners.title}</p>
              <p className="partners-sub">{footer.partners.subtitle}</p>
              <ul className="partners-list">
                {footer.partners.items.map((p) => (
                  <li key={p.name}>
                    {p.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.logo}
                        alt={p.name}
                        style={{ height: `${p.heightRem ?? 1.75}rem`, width: "auto" }}
                      />
                    ) : (
                      <span className="partner-name">{p.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {footer.registration && (
            <div className="registration">
              <span className="registration-icon">
                <Icon name="shield" size={26} />
              </span>
              <p>{footer.registration.text}</p>
              <Link href="/politica-de-privacidade" className="link-arrow">
                {labels.privacy} <Icon name="arrow" size={14} />
              </Link>
            </div>
          )}
        </div>
      )}

      <div className="footer-legal">
        <div className="container footer-legal-inner">
          <p>
            © {year} {legal.tradeName}. {labels.rights}
          </p>
          <nav aria-label="Legal">
            <Link href="/politica-de-privacidade">{labels.privacy}</Link>
            <Link href="/politica-de-cookies">{labels.cookies}</Link>
            {legal.complaintsBook && (
              <a
                href="https://www.livroreclamacoes.pt"
                target="_blank"
                rel="noopener noreferrer"
              >
                {labels.complaintsBook}
              </a>
            )}
            {footer.website && (
              <a className="footer-website" href={footer.website.href} target="_blank" rel="noopener noreferrer">
                {footer.website.label}
              </a>
            )}
          </nav>
          <a
            className="powered-by"
            href="https://uppout.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Powered by</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/core/uppout-logo.png" alt="Uppout" />
          </a>
        </div>
      </div>
    </footer>
  );
}
