import { getClient } from "@/clients";
import { LegalPage } from "@/core/components/LegalPage";
import { cookiePolicy } from "@/core/legal/templates";

export const metadata = { title: "Política de Cookies", robots: { index: false } };

export default function Page() {
  return <LegalPage doc={cookiePolicy(getClient())} />;
}
