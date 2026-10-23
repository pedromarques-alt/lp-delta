import type { LegalDoc } from "../legal/templates";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <section className="legal-page">
      <div className="container legal-inner">
        <h1>{doc.title}</h1>
        {doc.updatedAt && <p className="legal-updated">Última atualização: {doc.updatedAt}.</p>}
        {doc.sections.map((s) => (
          <div key={s.heading}>
            <h2>{s.heading}</h2>
            {s.paragraphs.map((p, i) =>
              Array.isArray(p) ? (
                <ul key={i}>
                  {p.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p key={i}>{p}</p>
              )
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
