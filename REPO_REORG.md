# `documentation` repository reorg

## Status

Merged.

## Project overview

We're gradually migrating the Datadog docs site from Hugo to Astro. To support this, we must reorganize the `documentation` repo into a monorepo that supports two sites (`hugo` and `astro`), instead of having the entire repo serve as our Hugo site.

**This reorg causes conflicts in almost every open PR in the `documentation` repo.**

### Which files will be moved?

The most impactful change is that any Hugo-specific site files move to a `hugo` folder instead of being located at the top level of the repo. This change impacts thousands of files, and causes the majority of conflicts.

For a full list of repo files and folders and their updated location, see [the configuration file for the reorg script](https://github.com/DataDog/documentation/blob/jen.gilbert/astro-reorg-scripts/astro_reorg/config.yaml).

## Impact to contributors

### PR conflicts

This reorg will cause conflicts in almost every open PR in the `documentation` repo.

Once the reorg is merged to master, all open PRs will be processed by a conflict-resolution script. Conflicts will be fixed automatically where possible.

When an automatic fix is not possible, we'll defer to the author's best judgment in resolving the conflicts, but offer escalation options in the PR comments in case they need help.

### Code freeze

We'll institute a code freeze while the reorg is in progress, likely for a few hours on the morning of the reorg. We'll lift the freeze after the reorg changes have been merged, the build is confirmed to be operational, and the open PRs have been processed.

### Post migration cleanup

After the migration has been completed:
- Your local repo will have some redundant files hanging out in the root directory. We've added them to `.gitignore` to prevent anyone from adding them back to the repo, but they take up space and clutter your local directory. 
- You need to move your `Makefile.config` to the `hugo/` directory.

You can run the following script to clean up your local repo and move the config file into the correct place:
```sh
./hugo/scripts/post-migration-cleanup.sh
```

The script deletes a lot of files, so it take a little while to complete.

## Owners

This project is owned by the WebOps Platform team (#webops-platform).



