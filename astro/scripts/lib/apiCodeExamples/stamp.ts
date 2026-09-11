/**
 * The stamp is written on success and read to decide whether a fetch can be
 * skipped, and what to say when one fails under `--best-effort`.
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * A dotfile inside the staged tree, so `rm -rf api-code-examples/` is a
 * complete reset and the loader's extension-scoped glob cannot see it.
 */
const STAMP_FILENAME = ".stamp.json";

export interface StageStamp {
  docsBranch: string;
  refs: Record<string, string>;
  exampleFileCount: number;
  legacyFileCount: number;
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

/** The stamp of a tree that is whole, or null. Never throws. */
export async function readStampIfAny(
  stagedDir: string,
): Promise<StageStamp | null> {
  try {
    return JSON.parse(
      await readFile(path.join(stagedDir, STAMP_FILENAME), "utf8"),
    ) as StageStamp;
  } catch {
    return null;
  }
}

/**
 * "Present and current" is deliberately cheap: a stamp is only written after a
 * complete fetch, so its presence means the tree is whole, and the recorded
 * branch is what decides whether the resolved refs could have changed.
 *
 * It does not re-check the pins, which would mean a network round trip on every
 * `yarn dev`. The pins track the SDKs' latest releases and turn over weekly, so
 * `yarn fetch:examples --force` (or deleting the directory) is how a newer
 * release is picked up.
 */
export async function stagedTreeIsCurrent(
  stagedDir: string,
  docsBranch: string,
): Promise<boolean> {
  const stamp = await readStampIfAny(stagedDir);
  return (
    stamp !== null &&
    stamp.docsBranch === docsBranch &&
    stamp.exampleFileCount > 0
  );
}

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
