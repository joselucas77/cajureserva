import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { registerClientSchema } from "@/validators/auth";

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = registerClientSchema.safeParse(json);
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );

  const { fullName, email, password } = parsed.data;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists)
    return NextResponse.json({ error: "Email já cadastrado" }, { status: 409 });

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { fullName, email, passwordHash, role: "CLIENT" },
  });

  return NextResponse.json(
    { user: { id: user.id, email: user.email } },
    { status: 201 }
  );
}
