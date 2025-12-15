import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/route-auth";

export async function GET(req: Request) {
  const session = await requireRole("ADMIN");
  if (!session?.hubId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase() ?? "";
  const status = searchParams.get("status"); // PENDING|CONFIRMED|CANCELED|null
  const date = searchParams.get("date"); // yyyy-mm-dd

  const startDay = date ? new Date(date + "T00:00:00") : null;
  const endDay = date ? new Date(date + "T23:59:59") : null;

  const reservations = await prisma.reservation.findMany({
    where: {
      space: { hubId: session.hubId },
      ...(status && status !== "all" ? { status: status as any } : {}),
      ...(date
        ? {
            startAt: { gte: startDay! },
            endAt: { lte: endDay! },
          }
        : {}),
      ...(q
        ? {
            OR: [
              { space: { name: { contains: q, mode: "insensitive" } } },
              { client: { fullName: { contains: q, mode: "insensitive" } } },
              { client: { email: { contains: q, mode: "insensitive" } } },
            ],
          }
        : {}),
    },
    include: {
      space: { select: { name: true, type: true, location: true } },
      client: { select: { fullName: true, email: true } },
    },
    orderBy: { startAt: "desc" },
  });

  return NextResponse.json({ reservations });
}
