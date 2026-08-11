import type { AstroConfig, AstroIntegration } from "astro";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { buildLlmsTree } from "../lib/pagesListing/llmsTree";
import { LlmsIndexSchema } from "../lib/pagesListing/types";

const SIDECAR = "llms-index.json";
const INDEX_FILE = "llms.txt";

/**
 * Emits the whole llms.txt tree after the build: `dist/client/llms.txt` plus one
 * detail file per section (and its `part_N` splits).
 *
 * The `llms-index.json` route emits the resolved page-source structure during the
 * build — that step has to run inside Vite, since the sources reach the API spec
 * through `import.meta.glob`. This integration then reads that sidecar, builds the
 * tree exactly once, writes every file, and deletes the sidecar.
 *
 * Building here rather than from routes is what removes the coupling: a route
 * would need `getStaticPaths` to enumerate every section and `part_N` path without
 * request context, so it would have to re-derive `site` independently of the
 * config and agree with it exactly — the split boundaries depend on rendered link
 * lengths, which depend on the origin. One post-build pass produces the paths and
 * their contents together, from one `site`, and does it once instead of once per
 * section.
 *
 * Runs only at build time, so the tree exists in `astro build`/`preview` and
 * production, but not in `astro dev` — it is a machine-consumption artifact.
 *
 * Imports must stay alias-free (relative + npm only): this code runs in Node
 * during build orchestration, outside Vite's module graph, so `@lib` aliases do
 * not resolve here.
 */
export function llmsTxt(): AstroIntegration {
  let clientDir: URL;
  let site: string | undefined;

  return {
    name: "llms-txt",
    hooks: {
      "astro:config:done": ({ config }: { config: AstroConfig }) => {
        // `build.client` is unambiguously dist/client for output: "server";
        // the build:done `dir` is adapter-dependent, so capture this instead.
        clientDir = config.build.client;
        site = config.site;
      },
      "astro:build:done": async ({ logger }) => {
        if (!site) {
          throw new Error(
            "astro.config.mjs `site` must be set for llms.txt to render canonical URLs.",
          );
        }

        const sidecarUrl = new URL(SIDECAR, clientDir);
        const llmsIndex = LlmsIndexSchema.parse(
          JSON.parse(await readFile(sidecarUrl, "utf8")),
        );
        const { index, detailFiles } = buildLlmsTree(llmsIndex, site);

        await writeFile(new URL(INDEX_FILE, clientDir), index, "utf8");
        for (const [urlPath, contents] of detailFiles) {
          await writeDetailFile(clientDir, urlPath, contents);
        }
        // `force` so a second build:done consumer removing it first, or a
        // partially cleaned dist, cannot fail the build at its very last step.
        await rm(sidecarUrl, { force: true });

        logger.info(
          `wrote ${INDEX_FILE} and ${detailFiles.size} section files, and removed ${SIDECAR}`,
        );
      },
    },
  };
}

/**
 * Writes one detail file, creating its directories.
 *
 * `urlPath` is site-root-relative ("/api/latest/metrics/llms.txt"), never
 * absolute, so a preview `site` with a branch base path leaves the output layout
 * alone: the branch prefix belongs in the links, not on disk.
 */
async function writeDetailFile(
  clientDir: URL,
  urlPath: string,
  contents: string,
): Promise<void> {
  const target = new URL(urlPath.replace(/^\//, ""), clientDir);
  await mkdir(new URL(".", target), { recursive: true });
  await writeFile(target, contents, "utf8");
}
