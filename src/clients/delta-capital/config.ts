import type { ClientConfig } from "@/core/types";

/**
 * Delta Capital — Crédito Habitação
 * Textos copiados do design aprovado pelo cliente. Campos marcados com
 * TODO são dados legais/operacionais que o design não traz.
 */
export const deltaCapital: ClientConfig = {
  id: "delta-capital",
  lang: "pt-PT",

  brand: {
    name: "Delta Capital",
    logo: {
      src: "/clients/delta-capital/logo.png",
      alt: "Delta Capital",
      width: 500,
      height: 300,
      heightRem: 4.1,
    },
  },

  theme: {
    primary: "#D4B04E",
    primaryText: "#1B3550",
    primarySoft: "#F3EBD2",
    navy: "#14304D",
    text: "#2F4A63",
    muted: "#587087",
    bg: "#FAFAF6",
    surface: "#FFFFFF",
    border: "#E4E6E3",
  },

  seo: {
    // TODO: confirmar título/descrição com o cliente
    title: "Delta Capital | Crédito Habitação",
    description:
      "Comparamos propostas de vários bancos e acompanhamos todo o processo para encontrar o melhor crédito habitação para si, sem custos de intermediação para o cliente.",
  },

  header: { cta: { label: "Contactar", href: "#simulacao" } },

  sections: [
    {
      type: "hero",
      badge: "Crédito Habitação",
      // \n = quebra de linha igual ao design (em mobile reflui sozinho)
      title: "Tratamos de encontrar\no melhor crédito habitação\npara si.",
      subtitle:
        "Seja para comprar a sua casa, construir ou transferir o crédito que já tem, ajudamos a encontrar a solução mais adequada ao seu perfil — e sem custos para si.",
      benefits: [
        "Comparamos propostas de vários bancos.",
        "Acompanhamento especializado.",
        "Sem custos de intermediação para o cliente",
      ],
      cta: { label: "Quero saber qual a minha solução", href: "#simulacao" },
      image: {
        src: "/clients/delta-capital/hero.jpg",
        alt: "Casal a ver um tablet no meio de caixas de mudança",
        position: "58% 40%",
      },
      imageCaption: ["Mais do que um crédito.", "É o seu próximo capítulo."],
    },
    {
      type: "explainer",
      eyebrow: "O que é a Delta Capital?",
      title: "Não precisa de\nir banco a banco.",
      text: "A Delta Capital é uma intermediária de crédito que analisa o seu perfil, compara propostas das instituições financeiras parceiras e acompanha todo o processo, para encontrar uma solução adequada às suas necessidades.",
      link: { label: "Saber mais sobre nós", href: "#simulacao" },
      stepsTitle: "Como funciona?",
      steps: [
        {
          icon: "profile",
          title: "Perfil",
          text: "Percebemos a sua situação financeira e os seus objetivos.",
        },
        {
          icon: "bank",
          title: "Comparação",
          text: "Analisamos as soluções junto dos bancos parceiros.",
        },
        {
          icon: "docs",
          title: "Acompanhamento",
          text: "Apoiamos na documentação e acompanhamos todo o processo.",
        },
      ],
    },
    { type: "form" },
  ],

  form: {
    id: "simulacao",
    badge: "Simulação de crédito habitação",
    title: "Diga-nos o que procura.",
    subtitle:
      "Responda a algumas perguntas para encontrarmos a melhor solução para si.",
    choice: {
      label: "O que pretende fazer?",
      options: [
        { value: "comprar-casa", label: "Comprar casa", icon: "house" },
        { value: "construir-casa", label: "Construir casa", icon: "build" },
        {
          value: "transferir-credito",
          label: "Transferir o crédito atual",
          icon: "transfer",
        },
      ],
    },
    select: {
      label: "Valor pretendido de crédito",
      placeholder: "Selecione uma opção",
      // TODO: o design não define os escalões — confirmar com o cliente
      options: [
        "Até 100.000 €",
        "100.000 € – 200.000 €",
        "200.000 € – 300.000 €",
        "300.000 € – 500.000 €",
        "Mais de 500.000 €",
      ],
    },
    labels: {
      name: "Nome",
      namePlaceholder: "O seu nome",
      phone: "Contacto telefónico",
      phonePlaceholder: "O seu número de telefone",
      email: "Email",
      emailPlaceholder: "O seu email",
      message: "Mensagem",
      messagePlaceholder: "Escreva a sua mensagem...",
      optional: "opcional",
    },
    submit: "Enviar pedido",
    submitting: "A enviar...",
    successTitle: "Pedido enviado com sucesso.",
    successText: "Entraremos em contacto consigo em breve.",
    errorText:
      "Não foi possível enviar o pedido. Tente novamente dentro de instantes.",
    privacyNote:
      "Os seus dados estão seguros e são tratados de forma confidencial.",
    // Recomendado para RGPD; desligado por defeito para respeitar o design.
    consentCheckbox: false,
    consentText:
      "Li e aceito que os meus dados sejam tratados para me contactarem sobre este pedido, nos termos da",
  },

  footer: {
    partners: {
      title: "Parceiros de confiança",
      subtitle:
        "Trabalhamos com as principais instituições financeiras para encontrar a melhor solução para si.",
      // Logótipos recebidos do cliente, convertidos para o tom único do tema.
      // TODO: confirmar com o cliente que as parcerias e o uso das marcas estão autorizados.
      items: [
        { name: "Santander", logo: "/clients/delta-capital/partners/santander.png", heightRem: 0.85 },
        { name: "BPI", logo: "/clients/delta-capital/partners/bpi.png", heightRem: 1.15 },
        { name: "novobanco", logo: "/clients/delta-capital/partners/novobanco.png", heightRem: 0.7 },
        { name: "CGD", logo: "/clients/delta-capital/partners/cgd.png", heightRem: 1.5 },
        { name: "Inter", logo: "/clients/delta-capital/partners/inter.png", heightRem: 1.0 },
        { name: "UCI", logo: "/clients/delta-capital/partners/uci.png", heightRem: 1.05 },
        { name: "CTT", logo: "/clients/delta-capital/partners/ctt.png", heightRem: 1.25 },
        { name: "ABANCA", logo: "/clients/delta-capital/partners/abanca.png", heightRem: 0.7 },
      ],
    },
    // TODO: preencher o número de registo real no Banco de Portugal
    website: { label: "www.deltacapital.pt", href: "https://deltacapital.pt/" },
    registration: { text: "Registada no Banco de Portugal com n.º 0000X." },
  },

  legal: {
    // TODO: dados reais da empresa (todos obrigatórios antes de publicar)
    legalName: "[Denominação social]",
    tradeName: "Delta Capital",
    nif: "[NIF]",
    address: "[Morada da sede]",
    email: "[email de contacto]",
    privacyEmail: "[email de proteção de dados]",
    retention: "[prazo de conservação, ex.: 24 meses]",
    complaintsBook: true,
    lastUpdated: "16 de outubro de 2026",
  },

  tracking: { gtmId: "GTM-TPJF4CT4" },
  // tracking: { gaId: "G-XXXXXXX", metaPixelId: "000000000000000" },

  cookies: {
    text: "Utilizamos cookies para garantir o funcionamento do site e, com o seu consentimento, medir a sua utilização.",
    accept: "Aceitar",
    reject: "Recusar",
    policyLabel: "Política de Cookies",
  },

  labels: {
    privacy: "Política de Privacidade",
    cookies: "Política de Cookies",
    complaintsBook: "Livro de Reclamações",
    rights: "Todos os direitos reservados.",
  },
};
