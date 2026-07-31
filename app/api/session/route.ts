import { NextRequest, NextResponse } from "next/server";
import { sessionCookieName } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (!process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json(
      { error: "DASHBOARD_PASSWORD is not set on the server." },
      { status: 500 }
    );
  }

  if (password !== process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookieName(), "active", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookieName(), "", { path: "/", maxAge: 0 });
  return res;
}
