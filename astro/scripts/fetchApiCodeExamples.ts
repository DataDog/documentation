#!/usr/bin/env node
/**
 * Stages the API docs' SDK code examples into `astro/api-code-examples/`.
 *
 * The steps:
 *
 *   resolve pins -> clone six SDK repos -> rename -> nest Rust
 *   -> copy examples/v* -> stage the committed legacy .py/.rb files from hugo/
 *
 * Three choices worth knowing about:
 *
 *   1. Clones are `--filter=blob:none --sparse` with only `examples/` checked
 *      out. The six full trees are ~900 MB.
 *   2. Branch matching asks `git ls-remote` whether a same-named branch exists
 *      rather than attempting a clone and letting it fail, so a fetch from a
 *      normal branch — the expected path — prints no clone failures.
 *   3. The staged tree is cleared before a real fetch, so it holds exactly what
 *      the current refs produce and never accumulates files from older tags.
 *
 * Runs as TypeScript directly under Node 24's type-stripping — no build step,
 * which is why relative imports carry their `.ts` extension.
 *
 * Usage: node scripts/fetchApiCodeExamples.ts [--pins <path>] [--force]
 *                                             [--best-effort]
 *
 *   --pins <path>   Read SDK versions from a local `sdk_versions.json` instead
 *                   of the network. Makes the fetch deterministic and lets it
 *                   run offline.
 *   --force         Re-fetch even when the staged tree is already present.
 *   --best-effort   Warn and exit 0 when the fetch fails, instead of exiting 1.
 *                   Set on `dev` only, never on any `build` — see
 *                   `describeBestEffortFallback`.
 */

import { execFile } from "node:child_process";
import { constants as fsConstants } from "node:fs";
import {
  copyFile,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import {
  fetchSdkVersions,
  parseSdkVersions,
  SDK_REPOS,
  type SdkPins,
  type SdkRepo,
} from "./lib/websitesSourcesData.ts";

const execFileAsync = promisify(execFile);

const ASTRO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const STAGED_DIR = path.join(ASTRO_ROOT, "api-code-examples");
const HUGO_ROOT = path.resolve(ASTRO_ROOT, "..", "hugo");

/**
 * Written on success, read to decide whether a fetch can be skipped. A dotfile
 * inside the staged tree so `rm -rf api-code-examples/` is a complete reset and
 * the loader's extension-scoped glob cannot see it.
 */
const STAMP_FILENAME = ".stamp.json";

/** The versions the tags in `hugo/.gitignore:17-23` mark as disposable. */
const LEGACY_INDEX_PREFIX = "content/en/api/";
const API_VERSIONS = ["v1", "v2"];

const LOG_PREFIX = "fetch:examples";

interface FetchOptions {
  pinsPath: string | null;
  force: boolean;
  bestEffort: boolean;
}

interface StageStamp {
  docsBranch: string;
  refs: Record<string, string>;
  exampleFileCount: number;
  legacyFileCount: number;
}

/* ------------------------------------------------------------------ */
/*  Path transforms — rename, nest, copy-scope                         */
/* ------------------------------------------------------------------ */

/**
 * Maps a path relative to a clone's `examples/` directory onto its path
 * relative to the staged tree, or null if it should not be staged at all.
 *
 * Carries all three transforms: the beta rename, the flat-Rust nesting, and the
 * `examples/v*` copy scope. Computing the target path rather than renaming in
 * place leaves the clone untouched.
 */
export function stagedRelativePathFor(
  exampleRelativePath: string,
): string | null {
  const segments = exampleRelativePath.split("/");

  // Rust ships its examples flat, so a top-level `.rs` is a path to be built,
  // not a path to be filtered out.
  if (segments.length === 1) {
    return segments[0].endsWith(".rs")
      ? resolveNestedRustPath(segments[0])
      : null;
  }

  // Everything else must already be `v1|v2/<category>/<file>`. That shape is
  // the loader's key space, so anything else — `examples/datadog/` in the go
  // and python repos, a deeper nesting we have not seen — has nowhere to go.
  if (segments.length !== 3 || !API_VERSIONS.includes(segments[0])) {
    return null;
  }

  const [version, categorySlug, filename] = segments;
  return `${version}/${categorySlug}/${applyBetaExtensionRename(filename)}`;
}

/**
 * `v1_aws-integration_CreateAWSAccount.rs` -> `v1/aws-integration/CreateAWSAccount.rs`
 *
 * Splits on the **first two underscores only**, which leaves suffixed names
 * like `v1_usage-metering_GetUsageNetworkHosts_1249907835.rs` intact. Category
 * slugs use hyphens and never underscores, so two splits is always right.
 */
export function resolveNestedRustPath(flatFilename: string): string | null {
  const match = /^(v\d+)_([^_]+)_(.+)$/.exec(flatFilename);
  if (!match) {
    return null;
  }
  const [, version, categorySlug, remainder] = match;
  return `${version}/${categorySlug}/${remainder}`;
}

/**
 * `.py` -> `.pybeta`, `.rb` -> `.rbbeta`, everything else unchanged.
 *
 * The rename exists so fresh SDK output lands *beside* Hugo's committed legacy
 * files rather than over them — Hugo treats `py` and `pybeta` as two distinct
 * languages. Astro collapses the pair into one Python entry with `.pybeta`
 * preferred (`src/lib/api/codeExampleLoader.ts`), so the rename's value here is
 * keeping those legacy files reachable.
 */
export function applyBetaExtensionRename(filename: string): string {
  if (filename.endsWith(".py") || filename.endsWith(".rb")) {
    return `${filename}beta`;
  }
  return filename;
}

/**
 * `content/en/api/v1/monitors/MuteMonitor.py` -> `v1/monitors/MuteMonitor.py`
 *
 * No rename here, deliberately. These files exist precisely to be reachable at
 * the legacy extension; renaming them to `.pybeta` would shadow SDK output.
 */
export function stripHugoApiContentPrefix(indexPath: string): string | null {
  if (!indexPath.startsWith(LEGACY_INDEX_PREFIX)) {
    return null;
  }
  const relativePath = indexPath.slice(LEGACY_INDEX_PREFIX.length);
  const segments = relativePath.split("/");
  if (segments.length !== 3 || !API_VERSIONS.includes(segments[0])) {
    return null;
  }
  return relativePath;
}

/* ------------------------------------------------------------------ */
/*  Ref resolution                                                     */
/* ------------------------------------------------------------------ */

/**
 * On `master`, the pinned tag. On any other branch, a same-named branch in the
 * SDK repo if one exists, else the pinned tag.
 *
 * This preserves the coordinated-preview workflow: a spec-repo PR can be
 * previewed against unreleased client code by pushing a matching branch name to
 * the client repo. No such branch is the normal case.
 */
export async function resolveSdkRef({
  repo,
  pinnedTag,
  docsBranch,
  sdkBranchExists,
}: {
  repo: SdkRepo;
  pinnedTag: string;
  docsBranch: string;
  sdkBranchExists: (repo: SdkRepo, branch: string) => Promise<boolean>;
}): Promise<string> {
  if (docsBranch === "master") {
    return pinnedTag;
  }
  return (await sdkBranchExists(repo, docsBranch)) ? docsBranch : pinnedTag;
}

/* ------------------------------------------------------------------ */
/*  Arguments                                                          */
/* ------------------------------------------------------------------ */

export function parseCommandLineArguments(
  argv: readonly string[],
): FetchOptions {
  const options: FetchOptions = {
    pinsPath: null,
    force: false,
    bestEffort: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === "--force") {
      options.force = true;
      continue;
    }

    if (argument === "--best-effort") {
      options.bestEffort = true;
      continue;
    }

    if (argument.startsWith("--pins=")) {
      options.pinsPath = argument.slice("--pins=".length);
      continue;
    }

    if (argument === "--pins") {
      const value = argv[index + 1];
      if (value === undefined || value.startsWith("--")) {
        throw new Error("--pins needs a path to a local sdk_versions.json.");
      }
      options.pinsPath = value;
      index += 1;
      continue;
    }

    throw new Error(
      `Unrecognized argument \`${argument}\`. Valid flags are --pins <path>, --force and --best-effort.`,
    );
  }

  return options;
}

/* ------------------------------------------------------------------ */
/*  Best-effort fallback                                               */
/* ------------------------------------------------------------------ */

/**
 * What to tell a developer whose fetch just failed, when `--best-effort` says
 * not to abort. Takes the stamp that survived the failure, or null if there is
 * no whole tree on disk.
 *
 * `dev` passes `--best-effort` and no `build` does, which is the whole reason
 * the flag exists: an unreachable network must not stop someone working on an
 * unrelated part of the site, and it must never let a build ship API pages
 * with missing SDK tabs.
 *
 * The two messages are deliberately different. Reusing an older branch's tree
 * is a mild, mostly-invisible compromise. Having no tree at all means every
 * API page renders with no SDK tabs, which looks exactly like a bug — so it has
 * to be named, not softened into "stale".
 */
export function describeBestEffortFallback(stamp: StageStamp | null): string {
  if (stamp === null) {
    return (
      `No complete api-code-examples/ tree on disk, so API pages render ` +
      `without SDK code examples. Re-run \`yarn fetch:examples\` once the ` +
      `network is reachable.`
    );
  }
  const total = stamp.exampleFileCount + stamp.legacyFileCount;
  return (
    `Continuing with the ${total} files already staged for ` +
    `${stamp.docsBranch}. They may be stale; \`yarn fetch:examples --force\` ` +
    `refreshes them.`
  );
}

/** The stamp of a tree that is whole, or null. Never throws. */
async function readStampIfAny(): Promise<StageStamp | null> {
  try {
    return JSON.parse(
      await readFile(path.join(STAGED_DIR, STAMP_FILENAME), "utf8"),
    ) as StageStamp;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Driver                                                             */
/* ------------------------------------------------------------------ */

async function main(options: FetchOptions): Promise<void> {
  const docsBranch = await readDocsBranch();

  if (!options.force && (await stagedTreeIsCurrent(docsBranch))) {
    console.log(
      `${LOG_PREFIX}: api-code-examples/ is already staged for ${docsBranch}. Pass --force to re-fetch.`,
    );
    return;
  }

  const pins = await readSdkPins(options.pinsPath);
  const refs = await resolveAllSdkRefs(pins, docsBranch);

  await rm(STAGED_DIR, { recursive: true, force: true });
  await mkdir(STAGED_DIR, { recursive: true });

  const workDir = await mkdtemp(path.join(tmpdir(), "dd-api-examples-"));
  let exampleFileCount = 0;
  try {
    const results = await Promise.all(
      SDK_REPOS.map((repo) => stageSdkRepo(repo, refs[repo], workDir)),
    );
    for (const result of results) {
      exampleFileCount += result.stagedCount;
      console.log(
        `${LOG_PREFIX}: ${result.repo} @ ${refs[result.repo]} — staged ${result.stagedCount}, skipped ${result.skippedCount} outside examples/v*`,
      );
    }
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }

  const legacyFileCount = await stageHugoLegacyExamples();
  console.log(
    `${LOG_PREFIX}: staged ${legacyFileCount} committed legacy .py/.rb files from hugo/`,
  );

  await writeStamp({
    docsBranch,
    refs,
    exampleFileCount,
    legacyFileCount,
  });

  console.log(
    `${LOG_PREFIX}: ${exampleFileCount + legacyFileCount} files in api-code-examples/.`,
  );
}

/**
 * The documentation repo's own branch — not a branch of any SDK repo.
 */
async function readDocsBranch(): Promise<string> {
  const { stdout } = await execFileAsync(
    "git",
    ["rev-parse", "--abbrev-ref", "HEAD"],
    { cwd: ASTRO_ROOT },
  );
  return stdout.trim();
}

async function readSdkPins(pinsPath: string | null): Promise<SdkPins> {
  if (pinsPath === null) {
    return fetchSdkVersions();
  }
  console.log(`${LOG_PREFIX}: reading SDK pins from ${pinsPath}`);
  return parseSdkVersions(await readFile(pinsPath, "utf8"));
}

async function resolveAllSdkRefs(
  pins: SdkPins,
  docsBranch: string,
): Promise<Record<SdkRepo, string>> {
  const refs: Partial<Record<SdkRepo, string>> = {};
  await Promise.all(
    SDK_REPOS.map(async (repo) => {
      refs[repo] = await resolveSdkRef({
        repo,
        pinnedTag: pins[repo],
        docsBranch,
        sdkBranchExists,
      });
    }),
  );
  return refs as Record<SdkRepo, string>;
}

/**
 * Quiet by design. On any branch other than `master` this is asked six times
 * and answers "no" six times, which is the normal path — see divergence 2 in
 * the file header.
 */
async function sdkBranchExists(
  repo: SdkRepo,
  branch: string,
): Promise<boolean> {
  try {
    const { stdout } = await execFileAsync("git", [
      "ls-remote",
      "--heads",
      repositoryUrl(repo),
      `refs/heads/${branch}`,
    ]);
    return stdout.trim().length > 0;
  } catch {
    return false;
  }
}

function repositoryUrl(repo: SdkRepo): string {
  return `https://github.com/DataDog/${repo}.git`;
}

async function stageSdkRepo(
  repo: SdkRepo,
  ref: string,
  workDir: string,
): Promise<{ repo: SdkRepo; stagedCount: number; skippedCount: number }> {
  const cloneDir = path.join(workDir, repo);

  await execFileAsync("git", [
    "clone",
    "--filter=blob:none",
    "--sparse",
    "--depth",
    "1",
    "--branch",
    ref,
    repositoryUrl(repo),
    cloneDir,
  ]);
  await execFileAsync("git", [
    "-C",
    cloneDir,
    "sparse-checkout",
    "set",
    "examples",
  ]);

  const examplesDir = path.join(cloneDir, "examples");
  let stagedCount = 0;
  let skippedCount = 0;

  for (const relativePath of await listFilesRecursive(examplesDir)) {
    const stagedPath = stagedRelativePathFor(relativePath);
    if (stagedPath === null) {
      skippedCount += 1;
      continue;
    }
    await copyWithoutClobbering(
      path.join(examplesDir, relativePath),
      path.join(STAGED_DIR, stagedPath),
    );
    stagedCount += 1;
  }

  return { repo, stagedCount, skippedCount };
}

/**
 * The 148 `.py`/`.rb` files that are *committed* in Hugo rather than generated
 * by any SDK repo. Five live operations render a Python or Ruby tab only
 * because of these.
 *
 * Enumerated with `git ls-files`, which reads the **index** rather than the
 * working tree. That is the whole point: it returns the same 148 files whether
 * or not Hugo has ever been built, and structurally cannot pick up Hugo's
 * build output. `hugo/.gitignore:17-23` ignores the six generated extensions
 * and deliberately not `.py`/`.rb`, which is why these are tracked at all.
 *
 * A read of Hugo's repo, never of its build — the constraint that Astro does
 * not run Hugo's build still holds.
 */
async function stageHugoLegacyExamples(): Promise<number> {
  let stdout: string;
  try {
    ({ stdout } = await execFileAsync(
      "git",
      [
        "ls-files",
        "-z",
        `${LEGACY_INDEX_PREFIX}v*/*/*.py`,
        `${LEGACY_INDEX_PREFIX}v*/*/*.rb`,
      ],
      { cwd: HUGO_ROOT, maxBuffer: 8 * 1024 * 1024 },
    ));
  } catch (error) {
    throw new Error(
      `Could not list Hugo's committed legacy examples in ${HUGO_ROOT}. ` +
        `Astro reads them out of Hugo's git index: ${(error as Error).message}`,
    );
  }

  const indexPaths = stdout.split("\0").filter((line) => line.length > 0);
  let stagedCount = 0;

  for (const indexPath of indexPaths) {
    const stagedPath = stripHugoApiContentPrefix(indexPath);
    if (stagedPath === null) {
      continue;
    }
    await copyWithoutClobbering(
      path.join(HUGO_ROOT, indexPath),
      path.join(STAGED_DIR, stagedPath),
    );
    stagedCount += 1;
  }

  if (stagedCount === 0) {
    throw new Error(
      `Found no committed legacy .py/.rb examples in ${HUGO_ROOT}. ` +
        `Expected ~148; hugo/.gitignore may have started ignoring them.`,
    );
  }

  return stagedCount;
}

/* ------------------------------------------------------------------ */
/*  Filesystem helpers                                                 */
/* ------------------------------------------------------------------ */

async function listFilesRecursive(dir: string): Promise<string[]> {
  const entries = await readdir(dir, {
    withFileTypes: true,
    recursive: true,
  });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) =>
      path.relative(dir, path.join(entry.parentPath, entry.name)),
    );
}

/** `cp -n`: the first writer wins, a second one is not an error. */
async function copyWithoutClobbering(from: string, to: string): Promise<void> {
  await mkdir(path.dirname(to), { recursive: true });
  try {
    await copyFile(from, to, fsConstants.COPYFILE_EXCL);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
      throw error;
    }
  }
}

/**
 * "Present and current" is deliberately cheap: a stamp is only written after a
 * complete fetch, so its presence means the tree is whole, and the recorded
 * branch is what decides whether the resolved refs could have changed.
 *
 * It does not re-check the pins, which would mean a network round trip on every
 * `yarn dev`. The pins track the SDKs' latest releases and turn over weekly, so
 * `--force` (or deleting the directory) is how a newer release is picked up.
 */
async function stagedTreeIsCurrent(docsBranch: string): Promise<boolean> {
  const stamp = await readStampIfAny();
  return (
    stamp !== null &&
    stamp.docsBranch === docsBranch &&
    stamp.exampleFileCount > 0
  );
}

async function writeStamp(stamp: StageStamp): Promise<void> {
  await writeFile(
    path.join(STAGED_DIR, STAMP_FILENAME),
    JSON.stringify(stamp, null, 2) + "\n",
  );
}

/* ------------------------------------------------------------------ */
/*  Entry point                                                        */
/* ------------------------------------------------------------------ */

// Guarded so the exported helpers above can be imported by the test suite
// without the driver running.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // A bad flag is always fatal, `--best-effort` or not — it is a mistake in the
  // invocation, not a condition of the world.
  const options = parseCommandLineArguments(process.argv.slice(2));

  main(options).catch(async (error: unknown) => {
    console.error(`${LOG_PREFIX}: ${(error as Error).message}`);
    if (!options.bestEffort) {
      process.exit(1);
    }
    console.warn(
      `${LOG_PREFIX}: ${describeBestEffortFallback(await readStampIfAny())}`,
    );
  });
}
