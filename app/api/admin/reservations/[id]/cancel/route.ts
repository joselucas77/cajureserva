import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/route-auth";

export async function POST(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = await requireRole("ADMIN");
  if (!session?.hubId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;

  const r = await prisma.reservation.findFirst({
    where: { id, space: { hubId: session.hubId } },
  });

  if (!r) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (r.status !== "PENDING")
    return NextResponse.json(
      { error: "Reserva não está pendente." },
      { status: 400 }
    );

  const updated = await prisma.reservation.update({
    where: { id },
    data: { status: "CANCELED", canceledAt: new Date() },
  });

  return NextResponse.json({ reservation: updated });
}
