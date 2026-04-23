import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "admin_panel_access";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const password = typeof body?.password === "string" ? body.password : "";
    const expected = "admin567";

    if (password !== expected) {
      return NextResponse.json({ message: "Invalid admin password." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(COOKIE_NAME, "granted", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: COOKIE_MAX_AGE_SECONDS,
    });

    return response;
  } catch {
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
