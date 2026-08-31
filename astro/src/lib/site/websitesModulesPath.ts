/**
 * Resolves the on-disk location of `github.com/DataDog/websites-modules` for the
 * `@websites-modules` Vite alias.
 *
 * Five modules import through that alias (menu/footer/i18n data), and it used to
 * resolve unconditionally to a sibling checkout
 * (`../../../../../../dd/websites-modules`) via `realpathSync` — a path that only
 * exists on a laptop with that exact sibling clone. Any other machine, including
 * CI, hard-failed before the config even loaded.
 *
 * `hugo/go.mod` already depends on the same module (pinned version, currently
 * `v1.4.314`), and Hugo materializes Go modules into its own module cache
 * (`$HUGO_CACHEDIR/modules/filecache/modules/pkg/mod/...`) as part of `hugo
 * build`/`hugo server`. So the same content Hugo already fetched is the natural
 * CI-safe source — the sibling checkout is kept only as a local-dev convenience.
 *
 * Resolution order:
 *   1. `WEBSITES_MODULES_PATH` — explicit override, wins unconditionally.
 *   2. Hugo's module cache, matched against the version pinned in `hugo/go.mod`.
 *   3. The sibling checkout (`../../../../../../dd/websites-modules`), local dev only.
 */
import { existsSync, readdirSync, readFileSync, realpathSync } from "node:fs";
import { homedir, platform } from "node:os";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

/** The five files every `@websites-modules` importer reads. Kept in sync with
 * `footerMenus.ts`, `menuData.ts`, `languageNames.ts`, and `i18n.ts`. */
const REQUIRED_RELATIVE_FILES = [
  "config/_default/menus/menus.en.yaml",
  "data/menu_data/menus.yaml",
  "data/menu_data/product_categories.yaml",
  "data/menu_data/products.yaml",
  "data/language_names.yaml",
];

function pinnedVersion(hugoGoModPath: string): string | undefined {
  if (!existsSync(hugoGoModPath)) {
    return undefined;
  }
  const match = readFileSync(hugoGoModPath, "utf8").match(
    /github\.com\/DataDog\/websites-modules\s+(v\S+)/,
  );
  return match?.[1];
}

function defaultHugoCacheDir(): string {
  if (process.env.HUGO_CACHEDIR) {
    return process.env.HUGO_CACHEDIR;
  }
  // Mirrors Hugo's own default cache location.
  return platform() === "darwin"
    ? join(homedir(), "Library", "Caches", "hugo_cache")
    : join(homedir(), ".cache", "hugo_cache");
}

/** Go's module-cache path escaping: an uppercase letter becomes `!` + lowercase. */
function escapeModulePathSegment(segment: string): string {
  return segment.replace(/[A-Z]/g, (letter) => `!${letter.toLowerCase()}`);
}

/**
 * Candidate cached module directories, most preferred first: the version
 * pinned in `hugo/go.mod` (if cached), then every other cached version,
 * newest first. Hugo's module cache can hold multiple versions at once (from
 * other checkouts/branches), and a cached version's mount can be a partial
 * checkout that's missing files a different cached version does have — so
 * the pinned version isn't guaranteed to be the one with the required files,
 * and neither is "the newest one present". The caller tries these in order
 * until one actually has every required file.
 */
function candidateHugoModuleCacheDirs(hugoGoModPath: string): string[] {
  const cacheDir = defaultHugoCacheDir();
  const modRoot = join(
    cacheDir,
    "modules",
    "filecache",
    "modules",
    "pkg",
    "mod",
    "github.com",
    escapeModulePathSegment("DataDog"),
  );
  if (!existsSync(modRoot)) {
    return [];
  }

  const entries = readdirSync(modRoot)
    .filter((entry) => entry.startsWith("websites-modules@"))
    .sort()
    .reverse();

  const wanted = pinnedVersion(hugoGoModPath);
  const wantedEntry = wanted ? `websites-modules@${wanted}` : undefined;
  const ordered = wantedEntry
    ? [wantedEntry, ...entries.filter((entry) => entry !== wantedEntry)]
    : entries;

  return ordered
    .filter((entry) => entries.includes(entry))
    .map((entry) => join(modRoot, entry));
}

function missingRequiredFiles(dir: string): string[] {
  return REQUIRED_RELATIVE_FILES.filter(
    (relative) => !existsSync(join(dir, relative)),
  );
}

function hasRequiredFiles(dir: string): boolean {
  return missingRequiredFiles(dir).length === 0;
}

/**
 * Resolves `@websites-modules`. Prefers a candidate with every required file,
 * but a directory that exists and has *most* of them is still far more useful
 * than hard-failing the whole config load — Hugo's module cache can hold a
 * partial mount for a given version (only the subtrees some other checkout's
 * config actually mounted), so "has everything" is a nice-to-have, not always
 * achievable locally. Only throws when no candidate directory exists at all.
 */
export function resolveWebsitesModulesPath(astroConfigUrl: string): string {
  const attempted: string[] = [];
  let bestPartial: { dir: string; missing: string[] } | undefined;

  function consider(dir: string): string | undefined {
    const missing = missingRequiredFiles(dir);
    if (missing.length === 0) {
      return dir;
    }
    // A directory with none of the required files isn't a websites-modules
    // checkout at all (e.g. an empty override path) — never treat it as a
    // usable partial match.
    if (
      missing.length < REQUIRED_RELATIVE_FILES.length &&
      (!bestPartial || missing.length < bestPartial.missing.length)
    ) {
      bestPartial = { dir, missing };
    }
    return undefined;
  }

  const override = process.env.WEBSITES_MODULES_PATH;
  if (override) {
    attempted.push(`WEBSITES_MODULES_PATH=${override}`);
    const resolved = consider(override);
    if (resolved) {
      return realpathSync(resolved);
    }
  }

  const hugoGoModPath = fileURLToPath(new URL("../hugo/go.mod", astroConfigUrl));
  const candidates = candidateHugoModuleCacheDirs(hugoGoModPath);
  if (candidates.length === 0) {
    attempted.push("Hugo module cache: not found");
  }
  for (const candidate of candidates) {
    attempted.push(`Hugo module cache: ${candidate}`);
    const resolved = consider(candidate);
    if (resolved) {
      return realpathSync(resolved);
    }
  }

  const sibling = fileURLToPath(
    new URL("../../../../../../dd/websites-modules", astroConfigUrl),
  );
  attempted.push(`sibling checkout: ${sibling}`);
  if (existsSync(sibling)) {
    const resolved = consider(sibling);
    if (resolved) {
      return realpathSync(resolved);
    }
  }

  if (bestPartial) {
    // eslint-disable-next-line no-console
    console.warn(
      `@websites-modules: using ${bestPartial.dir}, which is missing ` +
        `${bestPartial.missing.length} of ${REQUIRED_RELATIVE_FILES.length} ` +
        `expected files:\n` +
        bestPartial.missing.map((relative) => `  - ${relative}`).join("\n") +
        `\n\nAny import of those files will fail at request/build time. Set ` +
        `WEBSITES_MODULES_PATH to a checkout that has them, or run a Hugo ` +
        `build/server first so its module cache picks them up.`,
    );
    return realpathSync(bestPartial.dir);
  }

  throw new Error(
    "Could not resolve @websites-modules. Tried, in order:\n" +
      attempted.map((line) => `  - ${line}`).join("\n") +
      "\n\nSet WEBSITES_MODULES_PATH to an explicit checkout, or run a Hugo " +
      `build/server first so its module cache is populated (see ${hugoGoModPath}).`,
  );
}
