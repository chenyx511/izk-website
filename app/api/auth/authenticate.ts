import * as cookie from "cookie";
import { Session } from "@contracts/constants";
import { findAdminById } from "../queries/admins";
import { verifySessionToken } from "./session";

export async function authenticateRequest(headers: Headers) {
  const cookies = cookie.parse(headers.get("cookie") || "");
  const token = cookies[Session.cookieName];
  if (!token) {
    throw new Error("UNAUTHORIZED");
  }
  const claim = await verifySessionToken(token);
  if (!claim) {
    throw new Error("UNAUTHORIZED");
  }
  const admin = await findAdminById(claim.adminId);
  if (!admin) {
    throw new Error("UNAUTHORIZED");
  }
  return admin;
}
