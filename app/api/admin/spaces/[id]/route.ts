import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/route-auth";
import { brlToCents } from "@/lib/time";
import { spaceUpdateSchema } from "@/validators/space";

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = await requireRole("ADMIN");
  if (!session?.hubId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;

  const json = await req.json().catch(() => null);
  const parsed = spaceUpdateSchema.safeParse(json);
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );

  const space = await prisma.space.findFirst({
    where: { id, hubId: session.hubId },
  });
  if (!space) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await prisma.space.update({
    where: { id },
    data: {
      ...(parsed.data.name ? { name: parsed.data.name } : {}),
      ...(parsed.data.type ? { type: parsed.data.type } : {}),
      ...(parsed.data.capacity ? { capacity: parsed.data.capacity } : {}),
      ...(parsed.data.location ? { location: parsed.data.location } : {}),
      ...(parsed.data.imageUrl !== undefined
        ? { imageUrl: parsed.data.imageUrl || null }
        : {}),
      ...(parsed.data.pricePerHour !== undefined
        ? { pricePerHourCents: brlToCents(parsed.data.pricePerHour) }
        : {}),
      ...(parsed.data.isActive !== undefined
        ? { isActive: parsed.data.isActive }
        : {}),
    },
  });

  return NextResponse.json({ space: updated });
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = await requireRole("ADMIN");
  if (!session?.hubId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;

  const space = await prisma.space.findFirst({
    where: { id, hubId: session.hubId },
  });
  if (!space) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.space.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
