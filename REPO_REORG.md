# `documentation` repository reorg

This project is owned by the WebOps Platform team (#webops-platform).

# Reorg status

Not yet merged.

# Project overview

We're gradually migrating the Datadog docs site from Hugo to Astro. To support this, we must reorganize the `documentation` repo into a monorepo that supports two sites (`hugo` and `astro`), instead of having the entire repo serve as our Hugo site.

**This reorg causes conflicts in almost every open PR in the `documentation` repo.**

## Which files does the reorg change?

The most impactful change is that any Hugo-specific site files move to a `hugo` folder instead of being located at the top level of the repo. This change impacts thousands of files, and causes the majority of conflicts.

For a full list of repo files and folders and their updated location, see [the configuration file for the reorg script](https://github.com/DataDog/documentation/blob/jen.gilbert/astro-reorg-scripts/astro_reorg/config.yaml).

# Impact

## Code freeze

We'll institute a code freeze while the reorg is in progress.

## PR conflicts

This reorg will cause conflicts in almost every open PR in the `documentation` repo.

Once the reorg is merged to master, all open PRs will be processed by a conflict-resolution script. Conflicts will be fixed automatically where possible. 

When an automatic fix is not possible, we'll defer to the author's best judgment in resolving the conflicts, but offer escalation options in the PR comments in case they need help.