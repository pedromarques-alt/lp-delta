import type { LegalDoc } from "../legal/templates";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <section className="legal-page">
      <div className="container legal-inner">
        <h1>{doc.title}</h1>
        {doc.sections.map((s) => (
          <div key={s.heading}>
            <h2>{s.heading}</h2>
            {s.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
