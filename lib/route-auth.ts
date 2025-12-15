import { cookies } from "next/headers";
import { verifySessionToken, sessionCookie } from "@/lib/auth";

export async function requireSession() {
  const jar = await cookies();
  const token = jar.get(sessionCookie.name)?.value;
  if (!token) return null;
  try {
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

export async function requireRole(role: "CLIENT" | "ADMIN") {
  const s = await requireSession();
  if (!s || s.role !== role) return null;
  return s;
}
