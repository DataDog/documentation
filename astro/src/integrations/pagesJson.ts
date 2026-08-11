import type { AstroConfig, AstroIntegration } from "astro";
import { readFile, writeFile, rm } from "node:fs/promises";
import { buildListingFromIndex } from "../lib/pagesListing/buildListingFromIndex";
import type { PageIndexEntry } from "../lib/pagesListing/types";

const SIDECAR = "pages-index.json";
const OUTPUT = "pages.json";

/**
 * Emits `dist/client/pages.json` after the build, hashing each page's plaintext
 * straight from disk instead of rebuilding it.
 *
 * The `.md` routes materialize every body exactly once during the static build.
 * The `pages-index.json` route emits a cheap metadata sidecar (no bodies). This
 * integration then reads that sidecar, streams each emitted `.md` through md5,
 * assembles the final `pages.json`, and deletes the sidecar. Nothing is built
 * twice and memory stays flat at any page count.
 *
 * Runs only at build time, so `pages.json` exists in `astro build`/`preview` and
 * production, but not in `astro dev` — it is a machine-consumption artifact.
 *
 * Imports must stay alias-free (relative + npm only): this code runs in Node
 * during build orchestration, outside Vite's module graph, so `@lib` aliases do
 * not resolve here.
 */
export function pagesJson(): AstroIntegration {
  let clientDir: URL;

  return {
    name: "pages-json",
    hooks: {
      "astro:config:done": ({ config }: { config: AstroConfig }) => {
        // `build.client` is unambiguously dist/client for output: "server";
        // the build:done `dir` is adapter-dependent, so capture this instead.
        clientDir = config.build.client;
      },
      "astro:build:done": async ({ logger }) => {
        const sidecarUrl = new URL(SIDECAR, clientDir);
        const index = JSON.parse(
          await readFile(sidecarUrl, "utf8"),
        ) as PageIndexEntry[];

        const listing = await buildListingFromIndex(index, (file) =>
          readFile(new URL(file, clientDir), "utf8"),
        );

        await writeFile(
          new URL(OUTPUT, clientDir),
          JSON.stringify(listing, null, 2),
          "utf8",
        );
        // `force` so a second build:done consumer removing it first, or a
        // partially cleaned dist, cannot fail the build at its very last step.
        await rm(sidecarUrl, { force: true });

        logger.info(
          `wrote ${OUTPUT} (${Object.keys(listing).length} pages) and removed ${SIDECAR}`,
        );
      },
    },
  };
}
