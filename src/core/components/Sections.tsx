import type { ClientConfig, ExplainerSection, HeroSection } from "../types";
import { Icon } from "./Icon";
import { LeadForm } from "./LeadForm";

function Hero({ s }: { s: HeroSection }) {
  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="pill">{s.badge}</span>
          <h1>{s.title}</h1>
          <p className="lead">{s.subtitle}</p>
          <ul className="benefits">
            {s.benefits.map((b) => (
              <li key={b}>
                <span className="tick">
                  <Icon name="check" size={16} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <a href={s.cta.href} className="btn btn-primary btn-lg">
            {s.cta.label}
            <Icon name="arrow" size={16} />
          </a>
        </div>
        <div className="hero-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.image.src} alt={s.image.alt} />
          {s.imageCaption && (
            <p className="hero-caption">
              {s.imageCaption.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function Explainer({ s }: { s: ExplainerSection }) {
  return (
    <section className="explainer">
      <div className="container explainer-inner">
        <div className="explainer-copy">
          <p className="eyebrow">{s.eyebrow}</p>
          <h2>{s.title}</h2>
          <p>{s.text}</p>
          {s.link && (
            <a href={s.link.href} className="btn btn-primary btn-sm">
              {s.link.label}
              <Icon name="arrow" size={16} />
            </a>
          )}
        </div>
        <div className="steps-wrap">
          <h3>{s.stepsTitle}</h3>
          <ol className="steps">
            {s.steps.map((st, i) => (
              <li key={st.title} className="step">
                <div className="step-head">
                  <span className="step-num">{i + 1}</span>
                  <span className="step-icon">
                    <Icon name={st.icon} size={30} />
                  </span>
                </div>
                <h4>{st.title}</h4>
                <p>{st.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Sections({ config }: { config: ClientConfig }) {
  return (
    <>
      {config.sections.map((s, i) => {
        switch (s.type) {
          case "hero":
            return <Hero key={i} s={s} />;
          case "explainer":
            return <Explainer key={i} s={s} />;
          case "form":
            return <LeadForm key={i} config={config} />;
        }
      })}
    </>
  );
}
