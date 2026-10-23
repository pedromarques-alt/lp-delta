import type { ClientConfig } from "../types";

export interface LegalDoc {
  title: string;
  /** Data de última atualização, mostrada por baixo do título */
  updatedAt?: string;
  /** Cada bloco é um parágrafo (string) ou uma lista de pontos (string[]) */
  sections: { heading: string; paragraphs: (string | string[])[] }[];
}

/**
 * Textos-modelo (PT) gerados a partir de config.legal.
 * IMPORTANTE: são um ponto de partida e devem ser validados por quem
 * tratar da parte jurídica do cliente antes de ir para produção.
 */
export function privacyPolicy(c: ClientConfig): LegalDoc {
  const l = c.legal;
  return {
    title: "Política de Privacidade",
    updatedAt: l.lastUpdated,
    sections: [
      {
        heading: "1. Responsável pelo Tratamento dos Dados",
        paragraphs: [
          `A ${l.legalName}, pessoa coletiva n.º ${l.nif}, com sede em ${l.address}, é a entidade responsável pelo tratamento dos dados pessoais recolhidos através deste website.`,
        ],
      },
      {
        heading: "2. Dados Pessoais Recolhidos",
        paragraphs: [
          "Através dos formulários de contacto disponibilizados no website poderão ser recolhidos os seguintes dados:",
          [
            "Nome",
            "Número de telefone",
            "Endereço de correio eletrónico",
            "Informações relativas ao pedido de financiamento",
            "Outros dados fornecidos voluntariamente pelo utilizador",
          ],
        ],
      },
      {
        heading: "3. Finalidades do Tratamento",
        paragraphs: [
          "Os dados pessoais recolhidos destinam-se a:",
          [
            "Responder a pedidos de contacto",
            "Prestar informações sobre os serviços disponibilizados",
            "Analisar pedidos de financiamento",
            "Apresentar propostas junto de instituições financeiras parceiras",
            "Cumprir obrigações legais e regulamentares",
            "Melhorar a qualidade dos serviços prestados",
          ],
        ],
      },
      {
        heading: "4. Fundamento Jurídico",
        paragraphs: [
          "O tratamento dos dados pessoais assenta nos seguintes fundamentos:",
          [
            "Consentimento do titular dos dados",
            "Execução de diligências pré-contratuais solicitadas pelo titular",
            "Cumprimento de obrigações legais",
            "Interesse legítimo da empresa no desenvolvimento da sua atividade",
          ],
        ],
      },
      {
        heading: "5. Conservação dos Dados",
        paragraphs: [
          "Os dados pessoais serão conservados apenas durante o período necessário para as finalidades que justificaram a sua recolha ou durante os prazos legalmente exigidos.",
        ],
      },
      {
        heading: "6. Partilha de Dados",
        paragraphs: [
          "Os dados poderão ser comunicados:",
          [
            "A instituições de crédito e entidades financeiras parceiras",
            `A prestadores de serviços que atuem em nome da ${l.tradeName}`,
            "A autoridades públicas ou reguladoras quando legalmente exigido",
          ],
          `A ${l.tradeName} não vende nem cede dados pessoais a terceiros para fins comerciais.`,
        ],
      },
      {
        heading: "7. Direitos dos Titulares dos Dados",
        paragraphs: [
          "Nos termos do Regulamento Geral sobre a Proteção de Dados (RGPD), o titular dos dados pode exercer os seguintes direitos:",
          [
            "Direito de acesso",
            "Direito de retificação",
            "Direito ao apagamento",
            "Direito à limitação do tratamento",
            "Direito de oposição",
            "Direito à portabilidade dos dados",
          ],
          `Para o exercício destes direitos, o titular poderá contactar a ${l.tradeName} através dos meios de contacto disponibilizados no website.`,
        ],
      },
      {
        heading: "8. Segurança dos Dados",
        paragraphs: [
          `A ${l.tradeName} adota medidas técnicas e organizativas adequadas para proteger os dados pessoais contra perda, destruição, alteração, acesso não autorizado ou qualquer outra forma de tratamento ilícito.`,
        ],
      },
      {
        heading: "9. Cookies",
        paragraphs: [
          "Este website utiliza cookies para melhorar a experiência de navegação e analisar a utilização do website.",
          "Os cookies podem incluir:",
          [
            "Cookies essenciais ao funcionamento do website",
            "Cookies estatísticos e analíticos",
            "Cookies de desempenho",
          ],
          "O utilizador pode, a qualquer momento, configurar o seu navegador para recusar ou eliminar cookies, embora tal possa afetar algumas funcionalidades do website.",
        ],
      },
      {
        heading: "10. Reclamações",
        paragraphs: [
          "Sem prejuízo de qualquer outro recurso administrativo ou judicial, o titular dos dados tem o direito de apresentar reclamação junto da Comissão Nacional de Proteção de Dados (CNPD).",
        ],
      },
      {
        heading: "11. Alterações à Política de Privacidade",
        paragraphs: [
          `A ${l.tradeName} reserva-se o direito de alterar a presente Política de Privacidade a qualquer momento, sendo as alterações publicadas nesta página.`,
        ],
      },
      // Acrescento ao texto institucional: o formulário usa reCAPTCHA e isso tem de estar divulgado.
      {
        heading: "12. Proteção do Formulário (Google reCAPTCHA)",
        paragraphs: [
          "Para proteger o formulário de contacto contra spam e abusos, utilizamos o Google reCAPTCHA, que analisa a interação com o website (por exemplo, o endereço IP e o comportamento no formulário). Este serviço é prestado pela Google e está sujeito à Política de Privacidade (https://policies.google.com/privacy) e aos Termos de Serviço (https://policies.google.com/terms) da Google.",
        ],
      },
    ],
  };
}

export function cookiePolicy(c: ClientConfig): LegalDoc {
  const l = c.legal;
  const t = c.tracking;
  const analytics: string[] = [];
  if (t?.gaId) analytics.push("Google Analytics (medição de audiência)");
  if (t?.metaPixelId) analytics.push("Meta Pixel (medição de conversões)");
  return {
    title: "Política de Cookies",
    sections: [
      {
        heading: "1. O que são cookies",
        paragraphs: [
          "Cookies são pequenos ficheiros guardados no seu dispositivo quando visita um website, permitindo recordar preferências e medir a utilização do site.",
        ],
      },
      {
        heading: "2. Cookies que utilizamos",
        paragraphs: [
          "Estritamente necessários: guardam a sua escolha sobre cookies e garantem o funcionamento do site. Não requerem consentimento.",
          "Segurança: o Google reCAPTCHA, usado no formulário para distinguir pessoas de robôs, pode utilizar cookies e dados do dispositivo para esse fim. Não é utilizado para publicidade.",
          analytics.length
            ? `Medição e marketing (apenas com o seu consentimento): ${analytics.join("; ")}.`
            : "Neste momento não utilizamos cookies de medição ou marketing.",
        ],
      },
      {
        heading: "3. Como gerir as suas preferências",
        paragraphs: [
          "Pode aceitar ou recusar cookies não essenciais no aviso apresentado na primeira visita. Pode também apagar os dados do site nas definições do seu navegador, o que fará o aviso aparecer novamente.",
        ],
      },
      {
        heading: "4. Contacto",
        paragraphs: [
          `Questões sobre esta política: ${l.privacyEmail}. Última atualização: ${l.lastUpdated}.`,
        ],
      },
    ],
  };
}
