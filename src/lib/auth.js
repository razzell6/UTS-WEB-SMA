import crypto from "crypto";

export const COOKIE_NAME = "admin_session";

export function makeToken() {
  return crypto
    .createHmac("sha256", process.env.ADMIN_PASSWORD)
    .update("admin-session")
    .digest("hex");
}

export function isValidToken(token) {
  if (!token || !process.env.ADMIN_PASSWORD) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(makeToken());
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}