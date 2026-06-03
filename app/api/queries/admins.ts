import { eq } from "drizzle-orm";
import { adminUsers, type AdminUser } from "@db/schema";
import { getDb } from "./connection";

export type SafeAdmin = Pick<AdminUser, "id" | "username" | "createdAt" | "updatedAt">;

function toSafe(admin: AdminUser): SafeAdmin {
  return {
    id: admin.id,
    username: admin.username,
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
  };
}

export async function findAdminByUsername(username: string) {
  const [row] = await getDb()
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.username, username))
    .limit(1);
  return row;
}

export async function findAdminById(id: number) {
  const [row] = await getDb()
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.id, id))
    .limit(1);
  return row ? toSafe(row) : undefined;
}

export async function listAdmins() {
  const rows = await getDb().select().from(adminUsers);
  return rows.map(toSafe);
}

export async function createAdminUser(username: string, passwordHash: string) {
  const [created] = await getDb()
    .insert(adminUsers)
    .values({ username, passwordHash })
    .returning({
      id: adminUsers.id,
      username: adminUsers.username,
      createdAt: adminUsers.createdAt,
      updatedAt: adminUsers.updatedAt,
    });
  if (!created) throw new Error("Failed to create admin");
  return created;
}

export async function updateAdminCredentials(
  id: number,
  data: { username?: string; passwordHash?: string },
) {
  await getDb().update(adminUsers).set(data).where(eq(adminUsers.id, id));
  const updated = await findAdminById(id);
  if (!updated) throw new Error("Admin not found");
  return updated;
}

export async function countAdmins() {
  const rows = await getDb().select({ id: adminUsers.id }).from(adminUsers);
  return rows.length;
}
