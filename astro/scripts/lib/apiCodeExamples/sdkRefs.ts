/**
 * Turns the SDK version pins into the git ref to clone for each repo.
 */

import { readFile } from "node:fs/promises";
import {
  fetchSdkVersions,
  parseSdkVersions,
  SDK_REPOS,
  type SdkPins,
  type SdkRepo,
} from "../websitesSourcesData.ts";
import { runGit, sdkRepositoryUrl } from "./git.ts";
import { logProgress } from "./logging.ts";

export async function readSdkPins(pinsPath: string | null): Promise<SdkPins> {
  if (pinsPath === null) {
    return fetchSdkVersions();
  }
  logProgress(`reading SDK pins from ${pinsPath}`);
  return parseSdkVersions(await readFile(pinsPath, "utf8"));
}

export async function resolveAllSdkRefs(
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

/**
 * Quiet by design. On any branch other than `master` this is asked six times
 * and answers "no" six times, which is the normal path.
 */
async function sdkBranchExists(
  repo: SdkRepo,
  branch: string,
): Promise<boolean> {
  try {
    const { stdout } = await runGit([
      "ls-remote",
      "--heads",
      sdkRepositoryUrl(repo),
      `refs/heads/${branch}`,
    ]);
    return stdout.trim().length > 0;
  } catch {
    return false;
  }
}
