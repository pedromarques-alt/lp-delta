export type IconName =
  | "check"
  | "profile"
  | "bank"
  | "docs"
  | "house"
  | "build"
  | "transfer"
  | "lock"
  | "shield"
  | "arrow";

export interface Theme {
  primary: string; // cor de destaque (botões, badges)
  primaryText: string; // texto sobre a cor de destaque
  primarySoft: string; // fundo suave do destaque (pills)
  navy: string; // títulos
  text: string; // texto corrido
  muted: string; // texto secundário
  bg: string; // fundo da página
  surface: string; // cartões / formulário
  border: string;
}

export interface Brand {
  name: string;
  logo: { src: string; alt: string; width: number; height: number; heightRem?: number };
}

export interface Cta {
  label: string;
  href: string;
}

export interface HeroSection {
  type: "hero";
  badge: string;
  title: string;
  subtitle: string;
  benefits: string[];
  cta: Cta;
  image: { src: string; alt: string; position?: string };
  /** Texto manuscrito sobreposto à imagem (opcional) */
  imageCaption?: string[];
}

export interface ExplainerSection {
  type: "explainer";
  eyebrow: string;
  title: string;
  text: string;
  link?: Cta;
  stepsTitle: string;
  steps: { icon: IconName; title: string; text: string }[];
}

export interface FormOption {
  value: string;
  label: string;
  icon: IconName;
}

export interface SelectConfig {
  label: string;
  placeholder: string;
  options: string[];
}

export interface FormConfig {
  id: string; // âncora (#id)
  badge: string;
  title: string;
  subtitle: string;
  /** Indicador "1 de 4" tal como no design (opcional) */
  progress?: { current: number; total: number };
  choice: { label: string; options: FormOption[] };
  /** Fase do processo (campo `phase`) */
  phaseSelect: SelectConfig;
  /** Valor pretendido (campo `amount`) */
  select: SelectConfig;
  /** Rendimento líquido mensal do agregado (campo `income`) */
  incomeSelect: SelectConfig;
  labels: {
    name: string;
    namePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    optional: string;
  };
  submit: string;
  submitting: string;
  successTitle: string;
  successText: string;
  errorText: string;
  privacyNote: string;
  /** Checkbox de consentimento RGPD (recomendado ligar) */
  consentCheckbox?: boolean;
  consentText?: string;
}

export interface FormSection {
  type: "form";
}

export type Section = HeroSection | ExplainerSection | FormSection;

export interface FooterConfig {
  partners?: {
    title: string;
    subtitle: string;
    items: { name: string; logo?: string; heightRem?: number }[];
  };
  registration?: { text: string };
  /** Link para o site institucional do cliente */
  website?: { label: string; href: string };
  /** Links legais do rodapé (abrem em novo separador). Se vazio, usa as páginas internas. */
  links?: { label: string; href: string }[];
}

export interface LegalData {
  legalName: string; // denominação social
  tradeName: string; // nome comercial
  nif: string;
  address: string;
  email: string;
  phone?: string;
  /** Contacto para questões de proteção de dados */
  privacyEmail: string;
  /** Prazo de conservação dos dados de leads */
  retention: string;
  /** Mostra o link do Livro de Reclamações Eletrónico no footer */
  complaintsBook: boolean;
  /** Atualizado manualmente quando os textos mudam */
  lastUpdated: string;
}

export interface TrackingConfig {
  gtmId?: string;
  gaId?: string;
  metaPixelId?: string;
}

export interface ClientConfig {
  id: string;
  lang: string;
  brand: Brand;
  theme: Theme;
  seo: { title: string; description: string };
  header: { cta: Cta };
  sections: Section[];
  form: FormConfig;
  footer: FooterConfig;
  legal: LegalData;
  tracking?: TrackingConfig;
  /** Textos do cookie banner */
  cookies: {
    text: string;
    accept: string;
    reject: string;
    policyLabel: string;
    /** Aviso de que aceitar implica concordar com a Política de Privacidade (seguido do link) */
    privacyNotice: string;
    /** Aviso no formulário quando os cookies não foram aceites */
    formBlocked: string;
    /** Botão do formulário para aceitar os cookies */
    formAccept: string;
  };
  /** Rótulos do footer */
  labels: {
    privacy: string;
    cookies: string;
    complaintsBook: string;
    rights: string;
  };
}
