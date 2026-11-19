import type { AstroConfig, AstroIntegration } from "astro";
import { readFile, rm } from "node:fs/promises";
import { ON_DEMAND_PAGES_INTERMEDIATE_FILE } from "../lib/sitemap/sitemapFiles";
import { absoluteUrl } from "../lib/site/siteUrl";

/**
 * Adds the pages that render on demand, such as Cdocs variants, to the
 * sitemap. `@astrojs/sitemap` lists only pages built ahead of time.
 *
 * The `on-demand-pages-index.json` route emits their paths during the static
 * build. This integration reads them into `onDemandUrls`, the array passed to
 * `@astrojs/sitemap` as `customPages`, and deletes the intermediate file. It
 * must come before `@astrojs/sitemap`, which reads the array in the same hook.
 *
 * Imports must stay alias-free (relative + npm only): this code runs in Node
 * during build orchestration, outside Vite's module graph, so `@lib` aliases do
 * not resolve here.
 */
export function onDemandSitemapPages(onDemandUrls: string[]): AstroIntegration {
  let clientDir: URL;
  let site: string | undefined;

  return {
    name: "on-demand-sitemap-pages",
    hooks: {
      "astro:config:done": ({ config }: { config: AstroConfig }) => {
        // `build.client` is unambiguously dist/client for output: "server";
        // the build:done `dir` is adapter-dependent, so capture this instead.
        clientDir = config.build.client;
        site = config.site;
      },
      "astro:build:done": async ({ logger }) => {
        const intermediateFileUrl = new URL(
          ON_DEMAND_PAGES_INTERMEDIATE_FILE,
          clientDir,
        );
        let paths: string[];
        try {
          paths = JSON.parse(await readFile(intermediateFileUrl, "utf8"));
        } catch {
          // A build that skips the route (for example, a filtered build)
          // has no on-demand pages to add.
          return;
        }
        if (!site) {
          throw new Error(
            "astro.config.mjs `site` must be set for the sitemap to list on-demand pages.",
          );
        }

        onDemandUrls.push(...paths.map((path) => absoluteUrl(path, site!)));
        await rm(intermediateFileUrl, { force: true });

        logger.info(
          `added ${paths.length} on-demand pages to the sitemap and removed ${ON_DEMAND_PAGES_INTERMEDIATE_FILE}`,
        );
      },
    },
  };
}
