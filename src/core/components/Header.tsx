import type { ClientConfig } from "../types";
import { Icon } from "./Icon";

export function Header({ config }: { config: ClientConfig }) {
  const { brand, header } = config;
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#top" className="brand" aria-label={brand.logo.alt}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brand.logo.src}
            alt={brand.logo.alt}
            width={brand.logo.width}
            height={brand.logo.height}
          />
        </a>
        <a href={header.cta.href} className="btn btn-primary btn-sm">
          {header.cta.label}
          <Icon name="arrow" size={16} />
        </a>
      </div>
    </header>
  );
}
