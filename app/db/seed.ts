import { getDb } from "../api/queries/connection";
import { hashPassword } from "../api/auth/password";
import { payloadToRow } from "../api/lib/product-mapper";
import { adminUsers, siteContent, products, siteSettings } from "./schema";
import { defaultProductPayloads, siteContentItems } from "../shared/cms-defaults";

async function seed() {
  const db = getDb();
  console.log("Seeding database...");

  await db
    .insert(adminUsers)
    .values({ username: "admin", passwordHash: hashPassword("admin") })
    .onDuplicateKeyUpdate({ set: { passwordHash: hashPassword("admin") } });
  console.log("  Admin user: admin / admin");

  for (const item of siteContentItems) {
    await db.insert(siteContent).values(item).onDuplicateKeyUpdate({
      set: { value: item.value, section: item.section, label: item.label },
    });
  }
  console.log(`  Seeded ${siteContentItems.length} content items`);

  for (const item of defaultProductPayloads) {
    await db.insert(products).values(payloadToRow(item)).onDuplicateKeyUpdate({
      set: payloadToRow(item),
    });
  }
  console.log(`  Seeded ${defaultProductPayloads.length} products`);

  const settingsItems = [
    { key: "template", value: "dark-industrial" },
    { key: "site_title", value: "和泉金属工業株式会社 | 研削盤と超仕上機のメーカー" },
  ];

  for (const item of settingsItems) {
    await db.insert(siteSettings).values(item).onDuplicateKeyUpdate({
      set: { value: item.value },
    });
  }
  console.log(`  Seeded ${settingsItems.length} settings`);
  console.log("Seed complete!");
}

seed().catch(console.error);
