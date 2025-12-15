import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/route-auth";
import { reservationCreateSchema } from "@/validators/reservation";
import { buildStartEnd } from "@/lib/time";

export async function GET() {
  const session = await requireRole("CLIENT");
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const reservations = await prisma.reservation.findMany({
    where: { clientId: session.sub },
    include: {
      space: {
        select: {
          id: true,
          name: true,
          type: true,
          location: true,
          pricePerHourCents: true,
        },
      },
    },
    orderBy: { startAt: "desc" },
  });

  return NextResponse.json({ reservations });
}

export async function POST(req: Request) {
  const session = await requireRole("CLIENT");
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await req.json().catch(() => null);
  const parsed = reservationCreateSchema.safeParse(json);
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );

  const space = await prisma.space.findUnique({
    where: { id: parsed.data.spaceId },
  });
  if (!space || !space.isActive)
    return NextResponse.json({ error: "Espaço inválido" }, { status: 404 });

  const { startAt, endAt, durationMinutes } = buildStartEnd(
    parsed.data.date,
    parsed.data.startTime,
    parsed.data.durationHours
  );

  // Conflito
  const conflict = await prisma.reservation.findFirst({
    where: {
      spaceId: space.id,
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
    (space.pricePerHourCents * durationMinutes) / 60
  );

  const created = await prisma.reservation.create({
    data: {
      spaceId: space.id,
      clientId: session.sub,
      startAt,
      endAt,
      durationMinutes,
      totalPriceCents,
      status: "PENDING",
    },
  });

  return NextResponse.json({ reservation: created }, { status: 201 });
}
