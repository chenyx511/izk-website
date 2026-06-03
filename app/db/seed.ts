import { getDb } from "../api/queries/connection";
import { hashPassword } from "../api/auth/password";
import { payloadToRow } from "../api/lib/product-mapper";
import { adminUsers, siteContent, products, siteSettings } from "./schema";
import { defaultProductPayloads, siteContentItems } from "../shared/cms-defaults";

export async function runSeed() {
  const db = getDb();
  console.log("Seeding database...");

  await db
    .insert(adminUsers)
    .values({ username: "admin", passwordHash: hashPassword("admin") })
    .onConflictDoUpdate({
      target: adminUsers.username,
      set: { passwordHash: hashPassword("admin") },
    });
  console.log("  Admin user: admin / admin");

  for (const item of siteContentItems) {
    await db.insert(siteContent).values(item).onConflictDoUpdate({
      target: siteContent.key,
      set: { value: item.value, section: item.section, label: item.label },
    });
  }
  console.log(`  Seeded ${siteContentItems.length} content items`);

  for (const item of defaultProductPayloads) {
    const row = payloadToRow(item);
    await db.insert(products).values(row).onConflictDoUpdate({
      target: products.slug,
      set: row,
    });
  }
  console.log(`  Seeded ${defaultProductPayloads.length} products`);

  const settingsItems = [
    { key: "template", value: "dark-industrial" },
    {
      key: "site_title",
      value: "和泉金属工業株式会社 | 研削盤と超仕上機のメーカー",
    },
  ];

  for (const item of settingsItems) {
    await db.insert(siteSettings).values(item).onConflictDoUpdate({
      target: siteSettings.key,
      set: { value: item.value },
    });
  }
  console.log(`  Seeded ${settingsItems.length} settings`);
  console.log("Seed complete!");
}

import { fileURLToPath } from "node:url";

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runSeed().catch(console.error);
}
