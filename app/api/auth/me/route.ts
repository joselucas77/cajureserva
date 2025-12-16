import { getSessionFromCookie } from "@/lib/get-session";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSessionFromCookie();
  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  return NextResponse.json(
    { user: session.user },
    { headers: { "Cache-Control": "no-store" } }
  );
}
