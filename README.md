# LP Base — landing pages de angariação de leads

Base reutilizável (Next.js + TypeScript) para landing pages com um único objetivo: captar leads.
Cada cliente é uma **config** em `src/clients/<cliente>`; o resto (header, footer, formulário, páginas legais, cookies) é partilhado em `src/core`.

## Estrutura

```
src/
  core/                    ← reutilizável, não mexer por cliente
    components/            Header, Footer, LeadForm, CookieBanner, Sections, Icon
    legal/templates.ts     Política de Privacidade e de Cookies (geradas da config)
    types.ts               contrato da config
  clients/
    index.ts               registo de clientes
    delta-capital/config.ts  textos, tema, secções, dados legais
  app/                     rotas (/, /politica-de-privacidade, /politica-de-cookies, /api/lead)
public/clients/<cliente>/  logótipo e imagens
```

## Correr

```bash
cp .env.example .env.local   # preencher LEAD_WEBHOOK_URL
npm install
npm run dev:delta            # http://localhost:3000
npm run build:delta
```

## Adicionar um novo cliente

1. Copiar `src/clients/delta-capital` para `src/clients/<novo>` e editar `config.ts`.
2. Copiar `public/clients/delta-capital` para `public/clients/<novo>` (logótipo, imagem).
3. Registar em `src/clients/index.ts`.
4. Build/deploy com `NEXT_PUBLIC_CLIENT=<novo>` (um projeto de deploy por cliente, cada um com o seu `LEAD_WEBHOOK_URL`).

O tema (cores) vem da config via variáveis CSS. Secções disponíveis: `hero`, `explainer`, `form` — a ordem define-se em `sections`. Para uma secção nova, adicionar o tipo em `types.ts` e o componente em `Sections.tsx`.

## Leads

`POST /api/lead` valida (nome, email, telefone, valor), tem honeypot anti-spam e reencaminha o JSON para `LEAD_WEBHOOK_URL` (Make, Zapier, n8n, CRM…). Sem a variável definida, regista em log do servidor.

## Compliance — antes de publicar

- Preencher `legal` na config (denominação, NIF, morada, emails, prazo de conservação). Os textos legais são **modelos** e devem ser validados juridicamente.
- Cookies: o banner só carrega GA/Meta Pixel após aceitação. Definir `tracking.gaId` / `tracking.metaPixelId` quando existirem.
- `form.consentCheckbox`: recomendado ligar (RGPD); desligado por defeito para respeitar o design.
- Footer inclui link do Livro de Reclamações (`legal.complaintsBook`); confirmar obrigatoriedade com o cliente.
- Número de registo no Banco de Portugal (`footer.registration`) e logótipos de bancos parceiros: usar os oficiais e confirmar autorização de uso.
