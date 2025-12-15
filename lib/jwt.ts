import { jwtVerify } from "jose";

export type JwtPayload = {
  sub?: string;
  cpf?: string;
  username?: string;
  role?: string;
  exp?: number;
  [key: string]: unknown;
};

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Missing JWT_SECRET env var");
  }
  return new TextEncoder().encode(secret);
}

export async function verifyJwt(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, getSecret());
  return payload as JwtPayload;
}
