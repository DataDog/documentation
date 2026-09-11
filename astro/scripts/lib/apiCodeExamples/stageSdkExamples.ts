/**
 * Clones the six SDK repos at their resolved refs and stages their
 * `examples/v*` trees.
 *
 * Clones are `--filter=blob:none --sparse` with only `examples/` checked out.
 * The six full trees are ~900 MB.
 */

import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { SDK_REPOS, type SdkRepo } from "../websitesSourcesData.ts";
import { runGit, sdkRepositoryUrl } from "./git.ts";
import { logProgress } from "./logging.ts";
import { stagedRelativePathFor } from "./pathResolution.ts";
import { copyIntoStagedTree, listFilesRecursive } from "./stagedTree.ts";

interface RepoResult {
  repo: SdkRepo;
  stagedCount: number;
  skippedCount: number;
}

/** Returns the number of files staged across all six repos. */
export async function stageSdkExamples(
  refs: Record<SdkRepo, string>,
): Promise<number> {
  const workDir = await mkdtemp(path.join(tmpdir(), "dd-api-examples-"));
  try {
    const results = await Promise.all(
      SDK_REPOS.map((repo) => stageSdkRepo(repo, refs[repo], workDir)),
    );
    let stagedTotal = 0;
    for (const result of results) {
      stagedTotal += result.stagedCount;
      logProgress(
        `${result.repo} @ ${refs[result.repo]} — staged ${result.stagedCount}, skipped ${result.skippedCount} outside examples/v*`,
      );
    }
    return stagedTotal;
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
}

async function stageSdkRepo(
  repo: SdkRepo,
  ref: string,
  workDir: string,
): Promise<RepoResult> {
  const cloneDir = path.join(workDir, repo);

  await runGit([
    "clone",
    "--filter=blob:none",
    "--sparse",
    "--depth",
    "1",
    "--branch",
    ref,
    sdkRepositoryUrl(repo),
    cloneDir,
  ]);
  await runGit(["-C", cloneDir, "sparse-checkout", "set", "examples"]);

  const examplesDir = path.join(cloneDir, "examples");
  let stagedCount = 0;
  let skippedCount = 0;

  for (const relativePath of await listFilesRecursive(examplesDir)) {
    const stagedPath = stagedRelativePathFor(relativePath);
    if (stagedPath === null) {
      skippedCount += 1;
      continue;
    }
    await copyIntoStagedTree(path.join(examplesDir, relativePath), stagedPath);
    stagedCount += 1;
  }

  return { repo, stagedCount, skippedCount };
}
