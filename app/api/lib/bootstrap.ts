import { hashPassword } from "../auth/password";
import { countAdmins, createAdminUser } from "../queries/admins";

export async function ensureDefaultAdmin() {
  const total = await countAdmins();
  if (total > 0) return;
  await createAdminUser("admin", hashPassword("admin"));
  console.log("[bootstrap] Created default admin user (admin / admin)");
}
