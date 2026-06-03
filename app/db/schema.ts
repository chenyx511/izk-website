import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const adminUsers = sqliteTable("admin_users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  passwordHash: text("passwordHash").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = typeof adminUsers.$inferInsert;

export const siteContent = sqliteTable("site_content", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  section: text("section").notNull(),
  label: text("label").notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type SiteContent = typeof siteContent.$inferSelect;
export type InsertSiteContent = typeof siteContent.$inferInsert;

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  nameJa: text("nameJa").notNull(),
  nameEn: text("nameEn").notNull(),
  nameZh: text("nameZh"),
  nameKo: text("nameKo"),
  shortDesc: text("shortDesc").notNull(),
  shortDescZh: text("shortDescZh"),
  shortDescEn: text("shortDescEn"),
  shortDescKo: text("shortDescKo"),
  image: text("image").notNull(),
  detailImage: text("detailImage").notNull(),
  gallery: text("gallery").notNull(),
  fullDesc: text("fullDesc").notNull(),
  specs: text("specs").notNull(),
  features: text("features").notNull(),
  downloads: text("downloads").notNull(),
  videos: text("videos").notNull(),
  sortOrder: integer("sortOrder").default(0).notNull(),
  isActive: text("isActive", { enum: ["active", "inactive"] })
    .default("active")
    .notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

export const siteSettings = sqliteTable("site_settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = typeof siteSettings.$inferInsert;
