import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/route-auth";
import { spaceCreateSchema } from "@/validators/space";
import { brlToCents } from "@/lib/time";

export async function GET() {
  const session = await requireRole("ADMIN");
  if (!session?.hubId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const spaces = await prisma.space.findMany({
    where: { hubId: session.hubId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ spaces });
}

export async function POST(req: Request) {
  const session = await requireRole("ADMIN");
  if (!session?.hubId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await req.json().catch(() => null);
  const parsed = spaceCreateSchema.safeParse(json);
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );

  const created = await prisma.space.create({
    data: {
      hubId: session.hubId,
      name: parsed.data.name,
      type: parsed.data.type,
      capacity: parsed.data.capacity,
      location: parsed.data.location,
      imageUrl: parsed.data.imageUrl || null,
      pricePerHourCents: brlToCents(parsed.data.pricePerHour),
      isActive: parsed.data.isActive,
    },
  });

  return NextResponse.json({ space: created }, { status: 201 });
}
