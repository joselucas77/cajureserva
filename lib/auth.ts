import { SignJWT, jwtVerify } from "jose";
import type { NextRequest } from "next/server";

export type Role = "CLIENT" | "ADMIN";

export type SessionPayload = {
  sub: string;
  role: Role;
  hubId?: string | null;
};

export const COOKIE_NAME =
  process.env.SESSION_COOKIE_NAME ?? "cajureserva_token";

function getSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET não definido");
  return new TextEncoder().encode(secret);
}

export async function signSessionToken(payload: SessionPayload) {
  const key = getSecretKey();

  if (!payload?.sub) throw new Error("SessionPayload.sub é obrigatório");

  return new SignJWT({
    role: payload.role,
    hubId: payload.hubId ?? null,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub) // ✅ padroniza payload.sub no verify
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function verifySessionToken(token: string) {
  try {
    const key = getSecretKey();
    const { payload } = await jwtVerify(token, key);

    const sub = String(payload.sub ?? "");
    const role = String(payload.role ?? "").toUpperCase() as Role;
    const hubId =
      payload.hubId === null || payload.hubId === undefined
        ? null
        : String(payload.hubId);

    if (!sub) return null;
    if (role !== "ADMIN" && role !== "CLIENT") return null;

    return { sub, role, hubId } satisfies SessionPayload;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: NextRequest) {
  return req.cookies.get(COOKIE_NAME)?.value ?? null;
}

export const sessionCookie = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true as const,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  },
};
