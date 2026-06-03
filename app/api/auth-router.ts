import * as cookie from "cookie";
import { z } from "zod";
import { Session } from "@contracts/constants";
import { getSessionCookieOptions } from "./lib/cookies";
import { createRouter, publicProcedure, authedProcedure } from "./middleware";
import { hashPassword, verifyPassword } from "./auth/password";
import { signSessionToken } from "./auth/session";
import {
  createAdminUser,
  findAdminByUsername,
  listAdmins,
  updateAdminCredentials,
} from "./queries/admins";
import { TRPCError } from "@trpc/server";

function appendSessionCookie(
  resHeaders: Headers,
  reqHeaders: Headers,
  token: string,
) {
  const opts = getSessionCookieOptions(reqHeaders);
  resHeaders.append(
    "set-cookie",
    cookie.serialize(Session.cookieName, token, {
      httpOnly: opts.httpOnly,
      path: opts.path,
      sameSite: opts.sameSite?.toLowerCase() as "lax" | "none",
      secure: opts.secure,
      maxAge: Session.maxAgeSec,
    }),
  );
}

export const authRouter = createRouter({
  login: publicProcedure
    .input(
      z.object({
        username: z.string().min(1).max(64),
        password: z.string().min(1).max(128),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const admin = await findAdminByUsername(input.username.trim());
      if (!admin || !verifyPassword(input.password, admin.passwordHash)) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid username or password",
        });
      }
      const token = await signSessionToken({
        adminId: admin.id,
        username: admin.username,
      });
      appendSessionCookie(ctx.resHeaders, ctx.req.headers, token);
      return {
        id: admin.id,
        username: admin.username,
      };
    }),

  me: authedProcedure.query((opts) => opts.ctx.admin),

  logout: authedProcedure.mutation(async ({ ctx }) => {
    const opts = getSessionCookieOptions(ctx.req.headers);
    ctx.resHeaders.append(
      "set-cookie",
      cookie.serialize(Session.cookieName, "", {
        httpOnly: opts.httpOnly,
        path: opts.path,
        sameSite: opts.sameSite?.toLowerCase() as "lax" | "none",
        secure: opts.secure,
        maxAge: 0,
      }),
    );
    return { success: true };
  }),

  updateAccount: authedProcedure
    .input(
      z.object({
        currentPassword: z.string().min(1),
        newUsername: z.string().min(1).max(64).optional(),
        newPassword: z.string().min(4).max(128).optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const admin = await findAdminByUsername(ctx.admin!.username);
      if (!admin || !verifyPassword(input.currentPassword, admin.passwordHash)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Current password is incorrect",
        });
      }

      const nextUsername = input.newUsername?.trim();
      if (nextUsername && nextUsername !== admin.username) {
        const taken = await findAdminByUsername(nextUsername);
        if (taken) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Username already exists",
          });
        }
      }

      const updated = await updateAdminCredentials(admin.id, {
        username: nextUsername || undefined,
        passwordHash: input.newPassword
          ? hashPassword(input.newPassword)
          : undefined,
      });

      const token = await signSessionToken({
        adminId: updated.id,
        username: updated.username,
      });
      appendSessionCookie(ctx.resHeaders, ctx.req.headers, token);
      return updated;
    }),

  createAdmin: authedProcedure
    .input(
      z.object({
        username: z.string().min(2).max(64),
        password: z.string().min(4).max(128),
      }),
    )
    .mutation(async ({ input }) => {
      const username = input.username.trim();
      const existing = await findAdminByUsername(username);
      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username already exists",
        });
      }
      return createAdminUser(username, hashPassword(input.password));
    }),

  listAdmins: authedProcedure.query(async () => listAdmins()),
});
