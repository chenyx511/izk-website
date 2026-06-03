import type { ProductRecord, ProductPayload } from "@contracts/product";
import type { Product } from "@db/schema";

function parseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function rowToProduct(row: Product): ProductRecord {
  return {
    id: row.id,
    slug: row.slug,
    nameJa: row.nameJa,
    nameEn: row.nameEn,
    nameZh: row.nameZh ?? undefined,
    nameKo: row.nameKo ?? undefined,
    shortDesc: row.shortDesc,
    shortDescZh: row.shortDescZh ?? undefined,
    shortDescEn: row.shortDescEn ?? undefined,
    shortDescKo: row.shortDescKo ?? undefined,
    image: row.image,
    detailImage: row.detailImage,
    gallery: parseJson<string[]>(row.gallery, []),
    fullDesc: row.fullDesc,
    specs: parseJson(row.specs, []),
    features: parseJson(row.features, []),
    downloads: parseJson(row.downloads, []),
    videos: parseJson(row.videos, []),
    sortOrder: row.sortOrder,
    isActive: row.isActive,
  };
}

export function payloadToRow(data: ProductPayload) {
  return {
    slug: data.slug,
    nameJa: data.nameJa,
    nameEn: data.nameEn,
    nameZh: data.nameZh ?? null,
    nameKo: data.nameKo ?? null,
    shortDesc: data.shortDesc,
    shortDescZh: data.shortDescZh ?? null,
    shortDescEn: data.shortDescEn ?? null,
    shortDescKo: data.shortDescKo ?? null,
    image: data.image,
    detailImage: data.detailImage,
    gallery: JSON.stringify(data.gallery ?? []),
    fullDesc: data.fullDesc,
    specs: JSON.stringify(data.specs ?? []),
    features: JSON.stringify(data.features ?? []),
    downloads: JSON.stringify(data.downloads ?? []),
    videos: JSON.stringify(data.videos ?? []),
    sortOrder: data.sortOrder,
    isActive: data.isActive,
  };
}
