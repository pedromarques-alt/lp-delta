import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Basic Auth (caixa de utilizador/password do browser) para partilhar o site por port forwarding.
 * Só fica ativa se SITE_PASSWORD estiver definido (.env.local). Utilizador: SITE_USER (por defeito "delta").
 * O browser guarda as credenciais e envia-as em todos os pedidos (páginas, imagens, JS), por isso só pede uma vez.
 */
export function proxy(request: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  if (!password) return NextResponse.next();

  const user = process.env.SITE_USER || "delta";
  const auth = request.headers.get("authorization");

  if (auth?.startsWith("Basic ")) {
    try {
      const [u, ...rest] = atob(auth.slice(6)).split(":");
      if (u === user && rest.join(":") === password) return NextResponse.next();
    } catch {}
  }

  return new NextResponse("Autenticação necessária", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Acesso restrito", charset="UTF-8"' },
  });
}
