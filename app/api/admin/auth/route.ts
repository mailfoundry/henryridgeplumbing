import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("hrp_admin", process.env.ADMIN_PASSWORD!, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24h
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
