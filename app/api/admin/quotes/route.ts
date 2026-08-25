import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "@/lib/db";

function isAuthed(request: NextRequest) {
  const cookie = request.cookies.get("hrp_admin")?.value;
  return cookie && cookie === process.env.ADMIN_PASSWORD;
}

export async function GET(request: NextRequest) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const quotes = await db.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(quotes);
}
