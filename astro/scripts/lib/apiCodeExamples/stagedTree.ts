/**
 * Writes into `api-code-examples/`: the directory reset both stagers depend on,
 * and the copy they share.
 */

import { constants as fsConstants } from "node:fs";
import { copyFile, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { STAGED_DIR } from "./locations.ts";

/**
 * Clearing before a real fetch is what keeps the staged tree holding exactly
 * what the current refs produce, rather than accumulating files from older tags.
 */
export async function resetStagedTree(): Promise<void> {
  await rm(STAGED_DIR, { recursive: true, force: true });
  await mkdir(STAGED_DIR, { recursive: true });
}

/** `cp -n`: the first writer wins, a second one is not an error. */
export async function copyIntoStagedTree(
  from: string,
  stagedRelativePath: string,
): Promise<void> {
  const to = path.join(STAGED_DIR, stagedRelativePath);
  await mkdir(path.dirname(to), { recursive: true });
  try {
    await copyFile(from, to, fsConstants.COPYFILE_EXCL);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
      throw error;
    }
  }
}

export async function listFilesRecursive(dir: string): Promise<string[]> {
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
