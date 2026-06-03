import { z } from "zod";
import { productPayloadSchema, type ProductPayload } from "@contracts/product";
import { createRouter, publicProcedure, authedProcedure } from "./middleware";
import { getDb } from "./queries/connection";
import { products } from "@db/schema";
import { eq, asc } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { payloadToRow, rowToProduct } from "./lib/product-mapper";

export const productRouter = createRouter({
  list: publicProcedure.query(async () => {
    const db = getDb();
    const rows = await db
      .select()
      .from(products)
      .where(eq(products.isActive, "active"))
      .orderBy(asc(products.sortOrder));
    return rows.map(rowToProduct);
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const [row] = await db
        .select()
        .from(products)
        .where(eq(products.slug, input.slug))
        .limit(1);
      return row ? rowToProduct(row) : null;
    }),

  listAll: authedProcedure.query(async () => {
    const db = getDb();
    const rows = await db.select().from(products).orderBy(asc(products.sortOrder));
    return rows.map(rowToProduct);
  }),

  create: authedProcedure
    .input(productPayloadSchema)
    .mutation(async ({ input }) => {
      const db = getDb();
      const [created] = await db
        .insert(products)
        .values(payloadToRow(input))
        .returning({ id: products.id });
      return { id: created?.id ?? 0, success: true };
    }),

  update: authedProcedure
    .input(
      z.object({
        id: z.number(),
        data: productPayloadSchema.partial(),
      }),
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const [existing] = await db
        .select()
        .from(products)
        .where(eq(products.id, input.id))
        .limit(1);
      if (!existing) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Product not found" });
      }
      const current = rowToProduct(existing);
      const merged: ProductPayload = {
        slug: input.data.slug ?? current.slug,
        nameJa: input.data.nameJa ?? current.nameJa,
        nameEn: input.data.nameEn ?? current.nameEn,
        nameZh: input.data.nameZh ?? current.nameZh,
        nameKo: input.data.nameKo ?? current.nameKo,
        shortDesc: input.data.shortDesc ?? current.shortDesc,
        shortDescZh: input.data.shortDescZh ?? current.shortDescZh,
        shortDescEn: input.data.shortDescEn ?? current.shortDescEn,
        shortDescKo: input.data.shortDescKo ?? current.shortDescKo,
        image: input.data.image ?? current.image,
        detailImage: input.data.detailImage ?? current.detailImage,
        gallery: input.data.gallery ?? current.gallery,
        fullDesc: input.data.fullDesc ?? current.fullDesc,
        specs: input.data.specs ?? current.specs,
        features: input.data.features ?? current.features,
        downloads: input.data.downloads ?? current.downloads,
        videos: input.data.videos ?? current.videos,
        sortOrder: input.data.sortOrder ?? current.sortOrder,
        isActive: input.data.isActive ?? current.isActive,
      };
      await db
        .update(products)
        .set(payloadToRow(merged))
        .where(eq(products.id, input.id));
      return { success: true };
    }),

  delete: authedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(products).where(eq(products.id, input.id));
      return { success: true };
    }),
});
