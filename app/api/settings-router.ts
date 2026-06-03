import { z } from "zod";
import { createRouter, publicProcedure, authedProcedure } from "./middleware";
import { getDb } from "./queries/connection";
import { siteSettings } from "@db/schema";
import { eq } from "drizzle-orm";

export const settingsRouter = createRouter({
  // Get a setting value by key
  get: publicProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const [item] = await db
        .select()
        .from(siteSettings)
        .where(eq(siteSettings.key, input.key));
      return item?.value ?? "";
    }),

  // Get all settings
  getAll: publicProcedure.query(async () => {
    const db = getDb();
    const items = await db.select().from(siteSettings);
    const map: Record<string, string> = {};
    for (const item of items) {
      map[item.key] = item.value;
    }
    return map;
  }),

  // Update or create setting (admin)
  set: authedProcedure
    .input(z.object({ key: z.string(), value: z.string() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const [existing] = await db
        .select()
        .from(siteSettings)
        .where(eq(siteSettings.key, input.key));

      if (existing) {
        await db
          .update(siteSettings)
          .set({ value: input.value })
          .where(eq(siteSettings.key, input.key));
      } else {
        await db.insert(siteSettings).values(input);
      }
      return { success: true };
    }),
});
