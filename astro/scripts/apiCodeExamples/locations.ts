import path from "node:path";
import { fileURLToPath } from "node:url";

export const ASTRO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);

/** Where the fetch stages everything the API docs' code example loader reads. */
export const STAGED_DIR = path.join(ASTRO_ROOT, "api-code-examples");

export const HUGO_ROOT = path.resolve(ASTRO_ROOT, "..", "hugo");
