import { count } from "drizzle-orm";
import { hashPassword } from "../auth/password";
import { getDb } from "../queries/connection";
import { countAdmins, createAdminUser } from "../queries/admins";
import { products } from "@db/schema";
import { runSeed } from "../../db/seed";

export async function ensureDefaultAdmin() {
  const total = await countAdmins();
  if (total > 0) return;
  await createAdminUser("admin", hashPassword("admin"));
  console.log("[bootstrap] Created default admin (admin / admin)");
}

export async function ensureSeedData() {
  const db = getDb();
  const [row] = await db.select({ n: count() }).from(products);
  if ((row?.n ?? 0) > 0) return;
  console.log("[bootstrap] Empty database — importing default CMS data...");
  await runSeed();
}

export async function runBootstrap() {
  await ensureDefaultAdmin();
  await ensureSeedData();
}
