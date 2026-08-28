#!/usr/bin/env node
/**
 * Standalone re-run of the containment/coverage half of
 * `src/integrations/staticApiGuard.ts` against an already-built `dist/client`.
 *
 * Useful after a deploy script has moved/renamed files, or in CI as a final
 * check before upload. Does not re-check the prerender guard, which needs
 * live route metadata (`prerender`/`route`) that only exists during the
 * build itself — that guard already runs inside `astro build` every time.
 *
 * The two regexes below mirror `CONTAINED_PATH` and the category-directory
 * shape in staticApiGuard.ts. Kept duplicated (rather than imported) because
 * this script runs as plain Node outside Vite/Astro's TS-aware module graph.
 * Keep them in sync if either file changes.
 *
 * Usage: node scripts/verifyDist.mjs [dist/client] [--min-categories=150]
 */
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const CONTAINED_PATH = /^(?:_astro|api|fr\/api|ja\/api|ko\/api|es\/api)\//;

const args = process.argv.slice(2);
const positional = args.filter((arg) => !arg.startsWith("--"));
const distDir = positional[0] ?? "dist/client";
const minCategoriesArg = args.find((arg) =>
  arg.startsWith("--min-categories="),
);
const minCategoryCount = minCategoriesArg
  ? Number(minCategoriesArg.split("=")[1])
  : 150;

async function listFilesRecursive(dir, prefix = "") {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      files.push(
        ...(await listFilesRecursive(join(dir, entry.name), relative)),
      );
    } else {
      files.push(relative);
    }
  }
  return files;
}

async function main() {
  const resolvedDistDir = await stat(distDir).catch(() => null);
  if (!resolvedDistDir?.isDirectory()) {
    console.error(
      `verify:dist: ${distDir} does not exist or is not a directory.`,
    );
    process.exit(1);
  }

  const problems = [];
  const filePaths = await listFilesRecursive(distDir);

  const uncontained = filePaths.filter(
    (filePath) => !CONTAINED_PATH.test(filePath),
  );
  if (uncontained.length > 0) {
    problems.push(
      `Containment guard: the following emitted files fall outside ` +
        `api/ and {fr,ja,ko,es}/api/:\n` +
        uncontained.map((filePath) => `  - ${filePath}`).join("\n"),
    );
  }

  const categoryDirs = new Set(
    filePaths
      .map((filePath) => filePath.match(/^api\/latest\/([^/]+)\/index\.html$/))
      .filter(Boolean)
      .map((match) => match[1]),
  );
  if (categoryDirs.size < minCategoryCount) {
    problems.push(
      `Coverage guard: only ${categoryDirs.size} api/latest/{category} ` +
        `directories were found, below the floor of ${minCategoryCount}. ` +
        `This usually means the API spec failed to parse.`,
    );
  }

  if (problems.length > 0) {
    console.error(
      `verify:dist found ${problems.length} problem(s) in ${distDir}:\n\n` +
        problems.join("\n\n"),
    );
    process.exit(1);
  }

  console.log(
    `verify:dist passed: ${filePaths.length} files contained under /api, ` +
      `${categoryDirs.size} categories found in ${distDir}.`,
  );
}

main();
