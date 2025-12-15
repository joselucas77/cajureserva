import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/route-auth";
import { reservationUpdateSchema } from "@/validators/reservation";
import { buildStartEnd } from "@/lib/time";

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = await requireRole("CLIENT");
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;

  const current = await prisma.reservation.findFirst({
    where: { id, clientId: session.sub },
    include: { space: true },
  });

  if (!current)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (current.status !== "PENDING") {
    return NextResponse.json(
      { error: "Só é possível editar reservas pendentes." },
      { status: 400 }
    );
  }

  const json = await req.json().catch(() => null);
  const parsed = reservationUpdateSchema.safeParse(json);
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );

  const date = parsed.data.date ?? current.startAt.toISOString().slice(0, 10);
  const startTime =
    parsed.data.startTime ?? current.startAt.toTimeString().slice(0, 5);
  const durationHours =
    parsed.data.durationHours ?? Math.round(current.durationMinutes / 60);

  const { startAt, endAt, durationMinutes } = buildStartEnd(
    date,
    startTime,
    durationHours
  );

  // Conflito (exceto a própria reserva)
  const conflict = await prisma.reservation.findFirst({
    where: {
      id: { not: current.id },
      spaceId: current.spaceId,
      status: { in: ["PENDING", "CONFIRMED"] },
      startAt: { lt: endAt },
      endAt: { gt: startAt },
    },
  });

  if (conflict) {
    return NextResponse.json(
      {
        error:
          "Conflito de horário: este espaço já possui reserva no período selecionado.",
      },
      { status: 409 }
    );
  }

  const totalPriceCents = Math.round(
    (current.space.pricePerHourCents * durationMinutes) / 60
  );

  const updated = await prisma.reservation.update({
    where: { id: current.id },
    data: { startAt, endAt, durationMinutes, totalPriceCents },
  });

  return NextResponse.json({ reservation: updated });
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = await requireRole("CLIENT");
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;

  const current = await prisma.reservation.findFirst({
    where: { id, clientId: session.sub },
  });

  if (!current)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await prisma.reservation.update({
    where: { id: current.id },
    data: { status: "CANCELED", canceledAt: new Date() },
  });

  return NextResponse.json({ reservation: updated });
}
