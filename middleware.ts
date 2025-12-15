import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

type Role = "ADMIN" | "CLIENT";

async function getSession(req: NextRequest) {
  const cookieName = process.env.SESSION_COOKIE_NAME ?? "cajureserva_token";
  const token = req.cookies.get(cookieName)?.value;
  if (!token) return null;

  const secret = process.env.JWT_SECRET;
  if (!secret) return null;

  try {
    const key = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, key);

    const role = String(payload.role ?? "").toUpperCase() as Role;
    const sub = String(payload.sub ?? "");

    if (!sub) return null;
    if (role !== "ADMIN" && role !== "CLIENT") return null;

    return { sub, role };
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname === "/space-placeholder.jpg"
  ) {
    return NextResponse.next();
  }

  // rotas públicas
  const publicRoutes = ["/", "/login", "/register", "/logout"];
  const isPublic = publicRoutes.includes(pathname);

  const session = await getSession(req);

  // se está logado e tenta acessar login/register -> manda pro painel certo
  if (session && (pathname === "/login" || pathname === "/register")) {
    const url = req.nextUrl.clone();
    url.pathname = session.role === "ADMIN" ? "/admin" : "/app";
    return NextResponse.redirect(url);
  }

  if (isPublic) return NextResponse.next();

  const isClientArea = pathname.startsWith("/app");
  const isAdminArea = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isPrivateApi =
    pathname.startsWith("/api") && !pathname.startsWith("/api/auth");

  // não é área protegida
  if (!isClientArea && !isAdminArea && !isAdminApi && !isPrivateApi) {
    return NextResponse.next();
  }

  // não logado -> login
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // restrição por role
  if ((isAdminArea || isAdminApi) && session.role !== "ADMIN") {
    const url = req.nextUrl.clone();
    url.pathname = "/app";
    return NextResponse.redirect(url);
  }

  if (isClientArea && session.role !== "CLIENT") {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/app/:path*",
    "/admin/:path*",
    "/api/:path*",
    "/login",
    "/register",
    "/logout",
  ],
};
