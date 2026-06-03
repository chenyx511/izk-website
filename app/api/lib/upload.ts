import fs from "node:fs";
import path from "node:path";
import { nanoid } from "nanoid";
import type { Context } from "hono";
import { authenticateRequest } from "../auth/authenticate";
import { env } from "./env";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

function uploadDir(): string {
  const base = env.isProduction
    ? path.resolve(process.cwd(), "dist/public/uploads")
    : path.resolve(import.meta.dirname, "../../public/uploads");
  fs.mkdirSync(base, { recursive: true });
  return base;
}

export function createUploadHandler() {
  return async (c: Context) => {
    try {
      await authenticateRequest(c.req.raw.headers);
    } catch {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.parseBody();
    const file = body.file;
    if (!file || typeof file === "string") {
      return c.json({ error: "file is required" }, 400);
    }

    const blob = file as File;
    if (!ALLOWED.has(blob.type)) {
      return c.json({ error: "Unsupported file type" }, 400);
    }
    if (blob.size > MAX_BYTES) {
      return c.json({ error: "File too large (max 8MB)" }, 400);
    }

    const ext = blob.type.split("/")[1]?.replace("jpeg", "jpg") ?? "bin";
    const name = `${Date.now()}-${nanoid(8)}.${ext}`;
    const dir = uploadDir();
    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync(path.join(dir, name), buffer);

    return c.json({ url: `/uploads/${name}` });
  };
}
