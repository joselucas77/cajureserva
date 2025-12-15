import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/validators/auth";
import { sessionCookie, signSessionToken } from "@/lib/auth";

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return NextResponse.json(
      { error: "Credenciais inválidas" },
      { status: 401 }
    );

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok)
    return NextResponse.json(
      { error: "Credenciais inválidas" },
      { status: 401 }
    );

  const token = await signSessionToken({
    sub: user.id,
    role: user.role,
    hubId: user.hubId,
  });

  const jar = await cookies();
  jar.set(sessionCookie.name, token, sessionCookie.options);

  return NextResponse.json({
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  });
}
