import { z } from "zod";

export const productSpecSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const productFeatureSchema = z.object({
  title: z.string(),
  desc: z.string(),
});

export const productDownloadSchema = z.object({
  name: z.string(),
  url: z.string(),
  size: z.string(),
});

export const productVideoSchema = z.object({
  name: z.string(),
  url: z.string(),
  thumbnail: z.string(),
});

export const productPayloadSchema = z.object({
  slug: z.string().min(1).max(100),
  nameJa: z.string().min(1),
  nameEn: z.string().min(1),
  nameZh: z.string().optional(),
  nameKo: z.string().optional(),
  shortDesc: z.string().min(1),
  shortDescZh: z.string().optional(),
  shortDescEn: z.string().optional(),
  shortDescKo: z.string().optional(),
  image: z.string().min(1),
  detailImage: z.string().min(1),
  gallery: z.array(z.string()).default([]),
  fullDesc: z.string().min(1),
  specs: z.array(productSpecSchema).default([]),
  features: z.array(productFeatureSchema).default([]),
  downloads: z.array(productDownloadSchema).default([]),
  videos: z.array(productVideoSchema).default([]),
  sortOrder: z.number().int().default(0),
  isActive: z.enum(["active", "inactive"]).default("active"),
});

export type ProductPayload = z.infer<typeof productPayloadSchema>;

export type ProductRecord = ProductPayload & { id: number };
