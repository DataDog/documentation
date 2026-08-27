import type { AstroConfig, AstroIntegration } from "astro";
import { readdir } from "node:fs/promises";

/**
 * Build-time guard that makes "confined to /api" and "fully static" mechanical
 * instead of a convention someone can silently break.
 *
 * Three checks run in `astro:build:done`:
 *   1. Prerender guard — every `/api` route must be `prerender: true`.
 *   2. Containment guard — every emitted file must live under `api/` or
 *      `{fr,ja,ko,es}/api/` (Astro emits locale-prefixed output per directory,
 *      not `api/{lang}/...`).
 *   3. Coverage guard — the emitted category count clears a floor, so a spec
 *      parsing regression can't silently ship a near-empty tree that a
 *      `--delete` upload would then use to wipe out Hugo's ~170 categories.
 *
 * Imports must stay alias-free (relative + npm only), same reasoning as
 * `pagesJson.ts`/`llmsTxt.ts`: this runs in Node during build orchestration,
 * outside Vite's module graph.
 */

const API_ROUTE = /^\/(?:(?:fr|ja|ko|es)\/)?api(?:\/|$)/;
const CONTAINED_PATH = /^(?:api|fr\/api|ja\/api|ko\/api|es\/api)\//;
const CATEGORY_ROUTE = /\/api\/latest\/[^/]+\/?$/;

export interface RouteLike {
  route: string;
  prerender?: boolean;
}

/** Returns the route patterns of any `/api` route that isn't prerendered. */
export function findUnprerenderedApiRoutes(routes: RouteLike[]): string[] {
  return routes
    .filter((route) => API_ROUTE.test(route.route) && !route.prerender)
    .map((route) => route.route);
}

/** Returns any emitted file path that falls outside the `/api` containment. */
export function findUncontainedPaths(filePaths: string[]): string[] {
  return filePaths.filter((filePath) => !CONTAINED_PATH.test(filePath));
}

/**
 * Counts distinct `/api/latest/{category}` routes. Used as a floor so a spec
 * regression producing near-zero categories fails the build instead of
 * shipping (and then, via the deploy script's `--delete`, erasing Hugo's
 * existing category pages).
 */
export function countCategoryRoutes(routes: RouteLike[]): number {
  return routes.filter(
    (route) => route.prerender && CATEGORY_ROUTE.test(route.route),
  ).length;
}

async function listFilesRecursive(dir: URL, prefix = ""): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      files.push(...(await listFilesRecursive(new URL(`${entry.name}/`, dir), relative)));
    } else {
      files.push(relative);
    }
  }
  return files;
}

export interface StaticApiGuardOptions {
  /** Minimum number of `/api/latest/{category}` routes required to pass. */
  minCategoryCount?: number;
}

export function staticApiGuard(
  options: StaticApiGuardOptions = {},
): AstroIntegration {
  const minCategoryCount = options.minCategoryCount ?? 150;
  let clientDir: URL;

  return {
    name: "static-api-guard",
    hooks: {
      "astro:config:done": ({ config }: { config: AstroConfig }) => {
        clientDir = config.build.client;
      },
      "astro:build:done": async ({ logger, routes }) => {
        const problems: string[] = [];

        const unprerendered = findUnprerenderedApiRoutes(routes);
        if (unprerendered.length > 0) {
          problems.push(
            `Prerender guard: the following /api routes are not prerendered:\n` +
              unprerendered.map((route) => `  - ${route}`).join("\n"),
          );
        }

        const filePaths = await listFilesRecursive(clientDir);
        const uncontained = findUncontainedPaths(filePaths);
        if (uncontained.length > 0) {
          problems.push(
            `Containment guard: the following emitted files fall outside ` +
              `api/ and {fr,ja,ko,es}/api/:\n` +
              uncontained.map((filePath) => `  - ${filePath}`).join("\n"),
          );
        }

        const categoryCount = countCategoryRoutes(routes);
        if (categoryCount < minCategoryCount) {
          problems.push(
            `Coverage guard: only ${categoryCount} /api/latest/{category} ` +
              `routes were emitted, below the floor of ${minCategoryCount}. ` +
              `This usually means the API spec failed to parse.`,
          );
        }

        if (problems.length > 0) {
          throw new Error(
            `staticApiGuard found ${problems.length} problem(s):\n\n` +
              problems.join("\n\n"),
          );
        }

        logger.info(
          `staticApiGuard passed: ${filePaths.length} files contained under /api, ` +
            `${categoryCount} categories emitted.`,
        );
      },
    },
  };
}
