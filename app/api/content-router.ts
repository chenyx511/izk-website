import { z } from "zod";
import { CMS_CONTENT_KEYS } from "@contracts/constants";
import { createRouter, publicProcedure, authedProcedure } from "./middleware";
import { getDb } from "./queries/connection";
import { siteContent } from "@db/schema";
import { eq } from "drizzle-orm";

export const contentRouter = createRouter({
  // Get all content grouped by section
  list: publicProcedure.query(async () => {
    const db = getDb();
    const items = await db.select().from(siteContent);
    const grouped: Record<string, typeof items> = {};
    for (const item of items) {
      if (!grouped[item.section]) grouped[item.section] = [];
      grouped[item.section].push(item);
    }
    return grouped;
  }),

  // Get single content value by key
  getByKey: publicProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const [item] = await db
        .select()
        .from(siteContent)
        .where(eq(siteContent.key, input.key));
      return item?.value ?? "";
    }),

  // Get all content as flat key-value map
  getAll: publicProcedure.query(async () => {
    const db = getDb();
    const items = await db.select().from(siteContent);
    const map: Record<string, string> = {};
    for (const item of items) {
      map[item.key] = item.value;
    }
    return map;
  }),

  // Update content (admin only)
  update: authedProcedure
    .input(z.object({ key: z.string(), value: z.string() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(siteContent)
        .set({ value: input.value })
        .where(eq(siteContent.key, input.key));
      return { success: true };
    }),

  // Bulk update (admin only)
  updateMany: authedProcedure
    .input(z.record(z.string(), z.string()))
    .mutation(async ({ input }) => {
      const db = getDb();
      for (const [key, value] of Object.entries(input)) {
        if (!(CMS_CONTENT_KEYS as readonly string[]).includes(key)) continue;
        await db
          .update(siteContent)
          .set({ value })
          .where(eq(siteContent.key, key));
      }
      return { success: true };
    }),
});
