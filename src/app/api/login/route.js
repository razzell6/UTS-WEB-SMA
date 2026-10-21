import { NextResponse } from "next/server";
import { COOKIE_NAME, makeToken } from "../../../lib/auth";

export async function POST(request) {
  const { username, password } = await request.json();

  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_USERNAME) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_USERNAME / ADMIN_PASSWORD belum diatur di server" },
      { status: 500 }
    );
  }

  const userOk =
    String(username || "").trim().toLowerCase() ===
    process.env.ADMIN_USERNAME.trim().toLowerCase();
  const passOk = password === process.env.ADMIN_PASSWORD;

  if (!userOk || !passOk) {
    return NextResponse.json(
      { ok: false, error: "Username atau password salah" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, makeToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}