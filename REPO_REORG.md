# `documentation` repository reorg

# Reorg status

Not yet merged.

# Project overview

We're gradually migrating the Datadog docs site from Hugo to Astro. To support this, we must reorganize the `documentation` repo into a monorepo that supports two sites (`hugo` and `astro`), instead of having the entire repo serve as our Hugo site.

**This reorg causes conflicts in almost every open PR in the `documentation` repo.**

## What does the reorg change?

The most impactful change is that any Hugo-specific site files move to a `hugo` folder instead of being located at the top level of the repo. This change impacts thousands of files, and causes the majority of conflicts.

For a full list of repo files and folders and their updated location, see [the configuration file for the reorg script](https://github.com/DataDog/documentation/blob/jen.gilbert/astro-reorg-scripts/astro_reorg/config.yaml).

# Handling PR conflicts

Once the reorg is merged to master, all open PRs are processed. Conflicts are fixed automatically where possible. When an automatic fix is not possible, we defer to the author's best judgment in resolving the conflicts, but offer escalation options in the PR comments in case they need help.

## PR cases

* **Skipped because it has no conflicts:**: We did not try to autofix the PR because it doesn't have any conflicts.
* **Skipped as a WIP:**: We did not try to autofix the PR because it has the `WORK IN PROGRESS` label, but left a comment describing how to invoke the autofix.
* **Autofixed PR:** We fixed the conflicts automatically, closed the PR, and linked a new PR for the author's review. 
* **Stale PR:** We did not act on the PR, because it appears to be stale. We left a comment describing how to invoke the autofix.
* **Manual fix required:** We could not resolve the conflicts automatically. We left a comment describing how to ask for help if needed.