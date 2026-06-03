import * as jose from "jose";
import { env } from "../lib/env";

const JWT_ALG = "HS256";
const SESSION_TTL = "7d";

export type SessionPayload = {
  adminId: number;
  username: string;
};

export async function signSessionToken(
  payload: SessionPayload,
): Promise<string> {
  const secret = new TextEncoder().encode(env.appSecret);
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setExpirationTime(SESSION_TTL)
    .sign(secret);
}

export async function verifySessionToken(
  token: string,
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(env.appSecret);
    const { payload } = await jose.jwtVerify(token, secret, {
      algorithms: [JWT_ALG],
    });
    const adminId = payload.adminId;
    const username = payload.username;
    if (typeof adminId !== "number" || typeof username !== "string") {
      return null;
    }
    return { adminId, username };
  } catch {
    return null;
  }
}
