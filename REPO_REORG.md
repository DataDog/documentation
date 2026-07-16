# `documentation` repository reorg

# Project overview

We're gradually migrating the Datadog docs site from Hugo to Astro. To support this, we must reorganize the `documentation` repo to support two sites (`hugo` and `astro`, with shared resources in a `shared` folder).

**This reorg causes conflicts in almost every open PR in the `documentation` repo.**

## What does the reorg change?

For a full list of repo files and folders and their updated location, see [the configuration file for the reorg script](https://github.com/DataDog/documentation/blob/jen.gilbert/astro-reorg-scripts/astro_reorg/config.yaml).

# Handling PR conflicts

To support contributors, we provide an automatic fix where possible. When an automatic fix is not possible, we'll provide any support needed to contributors as they manually resolve the conflicts.

## Resolution steps for contributors

If your PR is open at the time of the reorg, and has conflicts related to the reorg, your PR will receive a comment describing one of four scenarios:

* **Skipped as a WIP:**: We did not try to autofix your PR because it has the `WORK IN PROGRESS` label, so we assume you're still working on it.
* **Autofixed PR:** We fixed your conflicts automatically, closed your PR, and linked a new PR for your review.  
* **Stale PR:** We did not act on your PR, because it appears to be stale.
* **Manual fix required:** We could not resolve your conflicts automatically.

Based on the comment you received, follow the relevant instructions below.

### If we skipped your PR as a WIP, but your PR is ready now

1. Remove the `WORK IN PROGRESS` label.
2. Remove the `astro-reorg-skip` label.

Your PR will be processed in the next batch.

### If we autofixed your PR
 
1. Verify that the new PR looks correct in the browser.  
2. Remove the `WORK IN PROGRESS` label from the new PR.    
3. Wait for the standard docs team approval before merging. (Optionally, you can check the provided "ready for merge" checkbox in the PR description if you would like the docs team to merge it for you.)

### If your PR was skipped due to staleness, but you want it to be processed

Remove the label `astro-reorg-stale`. Your PR will be processed the next time we run a batch.

### If we could not resolve the conflicts automatically

If you feel comfortable resolving the conflicts yourself manually:

1. Resolve the conflicts. For a full list of repo files and folders and their updated location, see [the configuration file for the reorg script](https://github.com/DataDog/documentation/blob/jen.gilbert/astro-reorg-scripts/astro_reorg/config.yaml).  
2. When your PR is ready for merge, remove the `WORK IN PROGRESS` label.   
3. Wait for the standard docs team approval before merging. (Optionally, you can check the provided "ready for merge" checkbox in the PR description if you would like the docs team to merge it for you.)

If you prefer that we resolve your conflicts, add the label `astro-reorg-help-requested` to your PR. This will add it to our support queue, and we will reach out to you as soon as possible.

## Need help? {#need-help?}

### Datadog employees

Reach out in [\#docs-repo-reorg-support](https://dd.enterprise.slack.com/archives/C0BJ3MJDY5N) on Slack.

### Other contributors

Tag the `@datadog/webops-platform` team in a comment on your PR.