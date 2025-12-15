import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  // Ajuste o nome do cookie se no seu login você estiver usando outro.
  const SESSION_COOKIE = process.env.SESSION_COOKIE_NAME ?? "session";

  // Força expirar o cookie (compatível com a maioria dos ambientes)
  cookieStore.set({
    name: SESSION_COOKIE,
    value: "",
    path: "/",
    expires: new Date(0),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.json({ ok: true });
}
