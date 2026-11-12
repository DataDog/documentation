/**
 * The filesystem operations the two stagers share.
 */

import { constants as fsConstants } from "node:fs";
import { copyFile, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";

/**
 * Clearing before a real fetch is what keeps `api-code-examples/` holding
 * exactly what the current refs produce, rather than accumulating files from
 * older tags.
 */
export async function resetOutputDirectory(outputDir: string): Promise<void> {
  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });
}

/** `cp -n`: the first writer wins, a second one is not an error. */
export async function copyWithoutOverwriting(
  from: string,
  to: string,
): Promise<void> {
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
