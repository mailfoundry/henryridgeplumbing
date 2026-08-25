import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "@/lib/db";

function isAuthed(request: NextRequest) {
  const cookie = request.cookies.get("hrp_admin")?.value;
  return cookie && cookie === process.env.ADMIN_PASSWORD;
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await request.json();

  const valid = ["new", "contacted", "quoted", "completed"];
  if (!valid.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const updated = await db.quoteRequest.update({ where: { id }, data: { status } });
  return NextResponse.json(updated);
}
