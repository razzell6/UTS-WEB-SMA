import { NextResponse } from "next/server";
import { COOKIE_NAME, isValidToken } from "../../../lib/auth";

// Cek apakah sudah login
export async function GET(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return NextResponse.json({ loggedIn: isValidToken(token) });
}

// Logout
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return res;
}