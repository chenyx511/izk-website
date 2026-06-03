import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { env } from "../lib/env";
import * as schema from "@db/schema";
import * as relations from "@db/relations";

const fullSchema = { ...schema, ...relations };

let instance: ReturnType<typeof drizzle<typeof fullSchema>>;

function resolveDbPath(): string {
  const url = env.databaseUrl;
  if (url.startsWith("file:")) {
    const p = url.slice("file:".length);
    return path.isAbsolute(p) ? p : path.resolve(process.cwd(), p);
  }
  return path.resolve(process.cwd(), "data/izk.db");
}

export function getDb() {
  if (!instance) {
    const dbPath = resolveDbPath();
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    const sqlite = new Database(dbPath);
    sqlite.pragma("journal_mode = WAL");
    instance = drizzle(sqlite, { schema: fullSchema });
  }
  return instance;
}
