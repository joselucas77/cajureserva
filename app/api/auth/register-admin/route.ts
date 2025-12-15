import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { registerAdminSchema } from "@/validators/auth";

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = registerAdminSchema.safeParse(json);
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );

  const { fullName, hubName, email, phone, city, state, plan, password } =
    parsed.data;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists)
    return NextResponse.json({ error: "Email já cadastrado" }, { status: 409 });

  const passwordHash = await bcrypt.hash(password, 10);

  const created = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: { fullName, email, passwordHash, role: "ADMIN" },
    });

    const hub = await tx.hub.create({
      data: {
        name: hubName,
        phone,
        city,
        state,
        plan,
        ownerId: user.id,
      },
    });

    await tx.user.update({
      where: { id: user.id },
      data: { hubId: hub.id },
    });

    return { userId: user.id, hubId: hub.id };
  });

  return NextResponse.json({ ok: true, ...created }, { status: 201 });
}
