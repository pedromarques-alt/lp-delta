import type { ClientConfig } from "@/core/types";
import { deltaCapital } from "./delta-capital/config";

/**
 * Registo de clientes. Para adicionar um novo:
 * 1. copiar src/clients/delta-capital para src/clients/<novo>
 * 2. registar aqui
 * 3. build com NEXT_PUBLIC_CLIENT=<novo>
 */
const clients: Record<string, ClientConfig> = {
  "delta-capital": deltaCapital,
};

export function getClient(): ClientConfig {
  const id = process.env.NEXT_PUBLIC_CLIENT ?? "delta-capital";
  const c = clients[id];
  if (!c) {
    throw new Error(
      `Cliente "${id}" não encontrado. Disponíveis: ${Object.keys(clients).join(", ")}`
    );
  }
  return c;
}
