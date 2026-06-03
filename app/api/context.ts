import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { SafeAdmin } from "./queries/admins";
import { authenticateRequest } from "./auth/authenticate";

export type TrpcContext = {
  req: Request;
  resHeaders: Headers;
  admin?: SafeAdmin;
};

export async function createContext(
  opts: FetchCreateContextFnOptions,
): Promise<TrpcContext> {
  const ctx: TrpcContext = { req: opts.req, resHeaders: opts.resHeaders };
  try {
    ctx.admin = await authenticateRequest(opts.req.headers);
  } catch {
    // Authentication is optional for public procedures
  }
  return ctx;
}
