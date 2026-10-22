import { getClient } from "@/clients";
import { Sections } from "@/core/components/Sections";

export default function Home() {
  return <Sections config={getClient()} />;
}
