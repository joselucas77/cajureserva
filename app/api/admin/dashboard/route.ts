import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/route-auth";

export async function GET() {
  const session = await requireRole("ADMIN");
  if (!session?.hubId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [totalSpaces, totalReservations, byType] = await Promise.all([
    prisma.space.count({ where: { hubId: session.hubId } }),
    prisma.reservation.count({
      where: {
        space: { hubId: session.hubId },
        status: { in: ["PENDING", "CONFIRMED"] },
      },
    }),
    prisma.space.groupBy({
      by: ["type"],
      where: { hubId: session.hubId },
      _count: { type: true },
    }),
  ]);

  const total = byType.reduce((acc, it) => acc + it._count.type, 0) || 1;

  const occupationByType = [
    "MEETING_ROOM",
    "AUDITORIUM",
    "COWORKING",
    "LAB_TECH",
  ].map((t) => {
    const found = byType.find((x) => x.type === t);
    const value = found?._count.type ?? 0;
    const percentage = Math.round((value / total) * 100);
    return { type: t, value, percentage };
  });

  return NextResponse.json({
    totalSpaces,
    totalReservations,
    occupationByType: occupationByType ?? [],
  });
}
