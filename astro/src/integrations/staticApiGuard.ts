import type { AstroConfig, AstroIntegration } from "astro";
import { readdir } from "node:fs/promises";

/**
 * Build-time guard that makes "confined to /api" and "fully static" mechanical
 * instead of a convention someone can silently break.
 *
 * Three checks, all reported together from `astro:build:done`:
 *   1. Prerender guard — every `/api` route must be `prerender: true`.
 *   2. Containment guard — every emitted file must live under `api/` or
 *      `{fr,ja,ko,es}/api/` (Astro emits locale-prefixed output per directory,
 *      not `api/{lang}/...`).
 *   3. Coverage guard — the emitted category count clears a floor, so a spec
 *      parsing regression can't silently ship a near-empty tree that a
 *      `--delete` upload would then use to wipe out Hugo's ~170 categories.
 *
 * The two guards read different inputs, and the distinction matters. Routes come
 * from `astro:routes:resolved` — `astro:build:done` does not receive them — and
 * describe route *definitions*, so the whole category tree is a single dynamic
 * `[category]` entry there. Coverage therefore counts generated *pages* instead,
 * which `astro:build:done` does provide.
 *
 * Imports must stay alias-free (relative + npm only), same reasoning as
 * `pagesJson.ts`/`llmsTxt.ts`: this runs in Node during build orchestration,
 * outside Vite's module graph.
 */

const API_ROUTE = /^\/(?:(?:fr|ja|ko|es)\/)?api(?:\/|$)/;
// `_astro` is Astro's default asset directory and the one the deployment
// platform's router treats as a cacheable static fast-path. Everything else
// must stay inside the app's own `/api` namespace.
const CONTAINED_PATH = /^(?:_astro|api|fr\/api|ja\/api|ko\/api|es\/api)\//;
// Page pathnames arrive without a leading slash (`api/latest/dashboards/`).
// English only, matching `scripts/verifyDist.mjs`, so translated output can't
// inflate the count past the floor.
const CATEGORY_PAGE = /^api\/latest\/([^/]+)\/?$/;

export interface RouteLike {
  route: string;
  prerender?: boolean;
}

/** The subset of Astro's `IntegrationResolvedRoute` this guard reads. */
export interface ResolvedRouteLike {
  pattern: string;
  isPrerendered: boolean;
}

/**
 * Narrows `astro:routes:resolved` output to `RouteLike`, so the guard functions
 * stay independent of Astro's integration types.
 */
export function toRouteLike(routes: ResolvedRouteLike[]): RouteLike[] {
  return routes.map((route) => ({
    route: route.pattern,
    prerender: route.isPrerendered,
  }));
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
 * Counts distinct `api/latest/{category}` pages. Used as a floor so a spec
 * regression producing near-zero categories fails the build instead of
 * shipping (and then, via the CI deploy's `aws s3 sync --delete`, erasing
 * Hugo's existing category pages).
 */
export function countCategoryPages(pathnames: string[]): number {
  const categories = new Set<string>();
  for (const pathname of pathnames) {
    const match = pathname.match(CATEGORY_PAGE);
    if (match) {
      categories.add(match[1]);
    }
  }
  return categories.size;
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
  let resolvedRoutes: RouteLike[] = [];

  return {
    name: "static-api-guard",
    hooks: {
      "astro:config:done": ({ config }: { config: AstroConfig }) => {
        clientDir = config.build.client;
      },
      // Routes are only handed to integrations here — `astro:build:done` gets
      // `{ pages, dir, assets, logger }` and no routes at all.
      "astro:routes:resolved": ({ routes }) => {
        resolvedRoutes = toRouteLike(routes);
      },
      "astro:build:done": async ({ logger, pages }) => {
        const problems: string[] = [];

        const unprerendered = findUnprerenderedApiRoutes(resolvedRoutes);
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

        const categoryCount = countCategoryPages(
          pages.map((page) => page.pathname),
        );
        if (categoryCount < minCategoryCount) {
          problems.push(
            `Coverage guard: only ${categoryCount} api/latest/{category} ` +
              `pages were emitted, below the floor of ${minCategoryCount}. ` +
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
