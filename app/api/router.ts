import { authRouter } from "./auth-router";
import { contentRouter } from "./content-router";
import { productRouter } from "./product-router";
import { settingsRouter } from "./settings-router";
import { createRouter, publicProcedure } from "./middleware";

export const appRouter = createRouter({
  ping: publicProcedure.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  content: contentRouter,
  product: productRouter,
  settings: settingsRouter,
});

export type AppRouter = typeof appRouter;
