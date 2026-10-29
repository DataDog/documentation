/**
 * The staged `api-spec/` tree: which files it must hold, and the stamp written
 * on success and read to decide whether a fetch can be skipped, and what to say
 * when one fails under `--best-effort`.
 */

import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

/**
 * The files the API loaders import by exact path (`specParser.ts`,
 * `codeExampleLoader.ts`). A bundle missing any of them is rejected before it
 * replaces the staged tree. The translation overlays are deliberately not
 * listed: `translationsLoader.ts` globs them and falls through to English when
 * one is absent.
 */
export const REQUIRED_SPEC_FILES = [
  "v1/full_spec.yaml",
  "v2/full_spec.yaml",
  "v1/CodeExamples.json",
  "v2/CodeExamples.json",
] as const;

/**
 * A dotfile at the root of the staged tree, so `rm -rf api-spec/` is a complete
 * reset and the loaders' `v<N>/` globs cannot see it.
 */
const STAMP_FILENAME = ".stamp.json";

const StageStampSchema = z
  .object({
    /** The bucket prefix the bundle came from, or the `--bundle` path. */
    source: z.string(),
    /** S3's ETag for the bundle; null for a local `--bundle`. */
    etag: z.string().nullable(),
    fileCount: z.number(),
  })
  .strict();

export type StageStamp = z.infer<typeof StageStampSchema>;

export async function missingRequiredFiles(
  stagedDir: string,
): Promise<string[]> {
  const missing: string[] = [];
  for (const relative of REQUIRED_SPEC_FILES) {
    try {
      await access(path.join(stagedDir, relative));
    } catch {
      missing.push(relative);
    }
  }
  return missing;
}

export async function writeStamp(
  stagedDir: string,
  stamp: StageStamp,
): Promise<void> {
  await writeFile(
    path.join(stagedDir, STAMP_FILENAME),
    JSON.stringify(stamp, null, 2) + "\n",
  );
}

/**
 * The stamp of a tree that is whole, or null when it does not parse against
 * the current shape. An older stamp shape costs one refetch rather than being
 * trusted.
 */
export function parseStamp(rawJson: string): StageStamp | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    return null;
  }
  const result = StageStampSchema.safeParse(parsed);
  return result.success ? result.data : null;
}

/** The stamp of a tree that is whole, or null. Never throws. */
export async function readStampIfAny(
  stagedDir: string,
): Promise<StageStamp | null> {
  try {
    return parseStamp(
      await readFile(path.join(stagedDir, STAMP_FILENAME), "utf8"),
    );
  } catch {
    return null;
  }
}

/**
 * What to tell a developer whose fetch just failed, when `--best-effort` says
 * not to abort. Takes the stamp that survived the failure, or null if there is
 * no whole tree on disk.
 *
 * As with `fetch:examples`, `dev` passes `--best-effort` and no `build` does.
 * A possibly-stale spec is a mild compromise; no spec at all means the API
 * pages cannot load, so that case is named rather than softened.
 */
export function describeBestEffortFallback(stamp: StageStamp | null): string {
  if (stamp === null) {
    return (
      `No complete api-spec/ tree on disk, so the API docs cannot load. ` +
      `Re-run \`yarn fetch:spec\` once the network is reachable, or stage a ` +
      `local bundle with \`yarn fetch:spec --bundle <path>\`.`
    );
  }
  return (
    `Continuing with the ${stamp.fileCount} spec files already staged from ` +
    `${stamp.source}. They may be stale; \`yarn fetch:spec --force\` ` +
    `refreshes them.`
  );
}
