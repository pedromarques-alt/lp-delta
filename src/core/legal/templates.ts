import type { ClientConfig } from "../types";

export interface LegalDoc {
  title: string;
  sections: { heading: string; paragraphs: string[] }[];
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
    sections: [
      {
        heading: "1. Responsável pelo tratamento",
        paragraphs: [
          `${l.legalName} (${l.tradeName}), NIF ${l.nif}, com sede em ${l.address}, é a entidade responsável pelo tratamento dos dados pessoais recolhidos neste website.`,
          `Para qualquer questão sobre proteção de dados, contacte-nos através de ${l.privacyEmail}.`,
        ],
      },
      {
        heading: "2. Dados que recolhemos",
        paragraphs: [
          "Através do formulário de contacto recolhemos: tipo de pedido, valor pretendido, nome, contacto telefónico, email e, opcionalmente, a mensagem que nos enviar.",
          "Se aceitar cookies de medição, recolhemos ainda dados de navegação de forma agregada (ver Política de Cookies).",
          "Para proteger o formulário contra spam e abusos, utilizamos o Google reCAPTCHA, que analisa a interação com o site (por exemplo, endereço IP e comportamento no formulário). Este serviço é prestado pela Google e está sujeito à Política de Privacidade (https://policies.google.com/privacy) e aos Termos de Serviço (https://policies.google.com/terms) da Google.",
        ],
      },
      {
        heading: "3. Finalidades e fundamento de licitude",
        paragraphs: [
          "Utilizamos os seus dados para responder ao seu pedido de contacto e analisar a sua situação com vista a apresentar-lhe uma solução adequada. O fundamento é a execução de diligências pré-contratuais a seu pedido e o seu consentimento.",
          "Os dados de medição de audiência só são tratados com o seu consentimento.",
        ],
      },
      {
        heading: "4. Destinatários",
        paragraphs: [
          "Os dados podem ser comunicados a entidades parceiras (por exemplo, instituições financeiras) apenas na medida necessária para dar seguimento ao seu pedido, bem como a prestadores de serviços que tratam dados em nosso nome (alojamento, CRM, comunicações), vinculados por contrato.",
        ],
      },
      {
        heading: "5. Conservação",
        paragraphs: [
          `Conservamos os seus dados pelo período de ${l.retention}, ou enquanto for necessário para cumprir obrigações legais.`,
        ],
      },
      {
        heading: "6. Os seus direitos",
        paragraphs: [
          `Pode exercer os direitos de acesso, retificação, apagamento, limitação, oposição e portabilidade, e retirar o consentimento a qualquer momento, enviando um pedido para ${l.privacyEmail}.`,
          "Tem ainda o direito de apresentar reclamação à Comissão Nacional de Proteção de Dados (www.cnpd.pt).",
        ],
      },
      {
        heading: "7. Segurança",
        paragraphs: [
          "Adotamos medidas técnicas e organizativas adequadas para proteger os seus dados contra acesso não autorizado, perda ou alteração.",
        ],
      },
      {
        heading: "8. Atualizações",
        paragraphs: [`Última atualização: ${l.lastUpdated}.`],
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
