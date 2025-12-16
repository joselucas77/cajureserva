import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/route-auth";

export async function GET(req: Request) {
  const session = await requireRole("CLIENT");
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const spaces = await prisma.space.findMany({
    where: {
      isActive: true,
      ...(type ? { type: type as any } : {}),
    },
    include: {
      hub: { select: { name: true, city: true, state: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ spaces });
}
