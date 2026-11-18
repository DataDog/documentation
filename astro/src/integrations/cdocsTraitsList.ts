import type { AstroConfig, AstroIntegration } from "astro";
import { mkdir, readFile, rename } from "node:fs/promises";
import {
  CDOCS_TRAITS_SIDECAR,
  cdocsTraitsListPath,
} from "../lib/cdocs/traitsListFile";

/**
 * Moves the Cdocs traits list from its build-time sidecar to its
 * content-hashed path under `_astro/`, so it can be cached indefinitely.
 *
 * The `cdocs-traits-index.json` route emits the sidecar during the static
 * build. The server computes the same hashed path from the same JSON at
 * request time (see `getCdocsTraitsListUrl`), so it links to the file without
 * reading anything this integration writes.
 *
 * Runs only at build time. In `astro dev`, the server links to the sidecar
 * route instead.
 *
 * Imports must stay alias-free (relative + npm only): this code runs in Node
 * during build orchestration, outside Vite's module graph, so `@lib` aliases do
 * not resolve here.
 */
export function cdocsTraitsList(): AstroIntegration {
  let clientDir: URL;

  return {
    name: "cdocs-traits-list",
    hooks: {
      "astro:config:done": ({ config }: { config: AstroConfig }) => {
        // `build.client` is unambiguously dist/client for output: "server";
        // the build:done `dir` is adapter-dependent, so capture this instead.
        clientDir = config.build.client;
      },
      "astro:build:done": async ({ logger }) => {
        const sidecarUrl = new URL(CDOCS_TRAITS_SIDECAR, clientDir);
        let traitsListJson: string;
        try {
          traitsListJson = await readFile(sidecarUrl, "utf8");
        } catch {
          // A build that skips the route (for example, a filtered build)
          // has no traits list to write.
          return;
        }

        // Hash the bytes as emitted, without reparsing, so the name matches
        // the one the server computes from the same JSON.
        const outputPath = cdocsTraitsListPath(traitsListJson);
        const outputUrl = new URL(outputPath, clientDir);
        await mkdir(new URL(".", outputUrl), { recursive: true });
        await rename(sidecarUrl, outputUrl);

        logger.info(`moved ${CDOCS_TRAITS_SIDECAR} to ${outputPath}`);
      },
    },
  };
}
