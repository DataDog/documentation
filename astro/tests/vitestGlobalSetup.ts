import { sync } from "astro";
import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Vitest runs Vite in serve mode, so `astro:content` reads the dev server's
// content store at `.astro/data-store.json`. `astro sync` and `astro check`
// write theirs to the cache dir instead (`node_modules/.astro/`), and only
// `astro dev` writes the dev copy. Without this setup, tests read whatever the
// last dev server left behind: stale content locally, and an empty "en"
// collection in CI, which never runs the dev server.
//
// Astro's public `sync()` always writes to the cache dir, so sync there and
// copy the result to where serve mode looks.
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const syncedStoreFile = path.join(root, "node_modules/.astro/data-store.json");
const devStoreFile = path.join(root, ".astro/data-store.json");

export default async function setup() {
  await sync({ root, logLevel: "warn" });
  await mkdir(path.dirname(devStoreFile), { recursive: true });
  await copyFile(syncedStoreFile, devStoreFile);
}
