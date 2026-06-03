import { ErrorMessages } from "@contracts/constants";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const createRouter = t.router;
export const publicProcedure = t.procedure;

const requireAuth = t.middleware(async (opts) => {
  const { ctx, next } = opts;

  if (!ctx.admin) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: ErrorMessages.unauthenticated,
    });
  }

  return next({ ctx: { ...ctx, admin: ctx.admin } });
});

export const authedProcedure = t.procedure.use(requireAuth);
/** @deprecated use authedProcedure */
export const authedQuery = authedProcedure;
/** @deprecated use authedProcedure */
export const adminQuery = authedProcedure;
/** @deprecated use publicProcedure */
export const publicQuery = publicProcedure;
