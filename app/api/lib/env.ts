import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value ?? "";
}

export const env = {
  appSecret: required("APP_SECRET") || "dev-secret-change-in-production",
  isProduction: process.env.NODE_ENV === "production",
  /** 默认 SQLite 文件，无需 MySQL */
  databaseUrl: process.env.DATABASE_URL || "file:./data/izk.db",
};
