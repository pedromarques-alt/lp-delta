import { getClient } from "@/clients";
import { LegalPage } from "@/core/components/LegalPage";
import { privacyPolicy } from "@/core/legal/templates";

export const metadata = { title: "Política de Privacidade", robots: { index: false } };

export default function Page() {
  return <LegalPage doc={privacyPolicy(getClient())} />;
}
