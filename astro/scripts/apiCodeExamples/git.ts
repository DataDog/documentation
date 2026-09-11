import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { ASTRO_ROOT } from "./locations.ts";

const execFileAsync = promisify(execFile);

export function runGit(
  args: readonly string[],
  options: { cwd?: string; maxBuffer?: number } = {},
): Promise<{ stdout: string; stderr: string }> {
  return execFileAsync("git", [...args], options);
}

/**
 * The documentation repo's own branch — not a branch of any SDK repo.
 */
export async function readDocsBranch(): Promise<string> {
  const { stdout } = await runGit(["rev-parse", "--abbrev-ref", "HEAD"], {
    cwd: ASTRO_ROOT,
  });
  return stdout.trim();
}

export function sdkRepositoryUrl(repo: string): string {
  return `https://github.com/DataDog/${repo}.git`;
}
