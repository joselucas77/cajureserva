import { cookies } from "next/headers";
import { JwtPayload, verifyJwt } from "./jwt";

export type Session = {
  user: {
    id: string;
    username?: string;
    role?: string;
  };
  raw: JwtPayload;
};

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME ?? "cajureserva_token";

export async function getSessionFromCookie(): Promise<Session | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const payload = await verifyJwt(token);
    const id = String(payload.sub ?? "");
    if (!id) return null;

    return {
      user: {
        id,
        username:
          typeof payload.username === "string" ? payload.username : undefined,
        role: typeof payload.role === "string" ? payload.role : undefined,
      },
      raw: payload,
    };
  } catch {
    return null;
  }
}
