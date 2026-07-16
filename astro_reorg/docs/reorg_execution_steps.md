# Reorg execution steps

## When a date has been set

### 1. Update the reorg README

- [ ] Add the target date to the reorg README.

### 2. Publish the README

- [ ] Publish [REPO_REORG.md](../../REPO_REORG.md) on master, so you can link to it.
- [ ] Update the [`REPO_REORG_README_LINK` constant](../resolve_pr_conflicts.py#L121) in `resolve_pr_conflicts.py`, commit, and push.

### 3. Announce the reorg

Announce the reorg:

- [ ] To the #documentation channel (<LINK>)
- [ ] To the #docs-backroom channel (<LINK>)
- [ ] In a banner in the `documentation` README

## The day before

### 1. Bump the announcement in the #documentation channel

See link you saved above.

### 2. Remind the docs on-call of the reorg

- [ ] Post the message below in #docs-backroom, tagging the current on-call folks, and put the URL here: <LINK>

```
Hi <ONCALLS>,

Tomorrow at about <X TIME>, I'll declare a code freeze in order to reorganize the docs repo. These are the steps I'll take:

1. Start the code freeze.
2. Reorg the repo and verify the build.
3. Make any necessary last-minute fixes to GitHub actions, etc. broken by the reorg.
4. Merge the reorg to master, and verify the build.
5. Run a script that processes every open PR in the docs repo:
    - PRs with no conflicts: Label them to avoid reprocessing them.
    - PRs marked `WORK IN PROGRESS`: Skip, but leave a comment on them describing how to opt in to the auto fix.
    - PRs with no recent activity (1 month): Skip, but leave a comment on them describing how to opt in to the auto fix.
    - PRs with conflicts that can be automatically fixed: Close the original PR and link a new autofix PR.
    - PRs with conflicts that CANNOT be automatically fixed: Put a label on it to prevent repeat processing, and comment on the PR to delegate conflict resolution to the author (with an escalation path if they need it).
6. Lift the code freeze.

Auto-fixable PRs are closed, manual-intervention PRs are automatically labeled `WORK IN PROGRESS`, and auto-created PRs are labeled `WORK IN PROGRESS` so their authors can review them. This means that your review queue will be strangely quiet at first, and should not ever contain weird noise from the reorg.

Once an author has reviewed an auto-created PR and removed the `WORK IN PROGRESS` label, you can treat it as any other PR.

If you have questions, please reach out in #docs-repo-reorg-support.
```

## The day of

NOTE: This file will get deleted from your reorg branch, so don't edit it there. You can push what you have, then check it off [here](https://github.com/DataDog/documentation/blob/jen.gilbert/astro-reorg-scripts/astro_reorg/docs/reorg_execution_steps.md) instead.

### 1. Bump the announcement in the #documentation channel

See link you saved above.

### 2. Bump the detailed message in #docs-backroom

See link you saved above.

### 3. Declare a code freeze

See the [Confluence page](https://datadoghq.atlassian.net/wiki/spaces/WEB/pages/5286757291/Code+Freeze+Workflows).

Announce the freeze in `#documentation` with a link to the reorg README.

### 4. Create a reorged `master` branch

- [ ] Merge master into the scripts branch:
   ```bash
   git checkout jen.gilbert/astro-reorg-scripts
   git merge master
   ```
- [ ] Cut a reorg branch from the reorg scripts branch:
   ```bash
   git checkout -b jen.gilbert/hugo-site-folder
   ```
- [ ] Run the reorg script:
   ```bash
   python3 astro_reorg/execute_reorg.py
   ```
- [ ] Delete the `astro_reorg` folder:
   ```bash
   rm -rf astro_reorg/
   ```
- [ ] Stage, commit, and push the result:
   ```bash
   git add -A -- ':!astro/'
   git commit -m "Create hugo site folder"
   ```

### 5. Push and open a PR against master

```bash
git push -u origin jen.gilbert/hugo-site-folder &&
gh pr create --base master --title "Create Hugo site folder" 
```

### 5. Verify that the GitHub actions etc. are working, and make any necessary fixes

### 6. Merge to master and verify the build

### 7. Run the PR resolution script

Run the script in batches, building confidence before scaling up. The script defaults to a dry run against the mock base branch — pass `--live` to target real master, and `--no-dry-run` to apply changes.

- [ ] Start with a single PR as a dry run to confirm the output looks right:
   ```bash
   python3 astro_reorg/resolve_pr_conflicts.py --live --limit 1
   ```
- [ ] If that looks good, run one PR for real:
   ```bash
   python3 astro_reorg/resolve_pr_conflicts.py --live --no-dry-run --limit 1
   ```
- [ ] Review the result on GitHub. If it looks good, increase the limit and repeat until all PRs are processed:
   ```bash
   python3 astro_reorg/resolve_pr_conflicts.py --live --no-dry-run --limit 10
   python3 astro_reorg/resolve_pr_conflicts.py --live --no-dry-run --limit 50
   # ... and so on until all PRs are processed
   ```

You can view [all processed PRs here](https://github.com/DataDog/documentation/pulls?q=is%3Apr+label%3Aastro-reorg-processed), regardless of their outcome.

### 8. End the code freeze

### 9. Post in #documentation and #docs-backroom

### 10. Monitor the queues

- [All processed PRs](https://github.com/DataDog/documentation/pulls?q=is%3Apr+label%3Aastro-reorg-processed)
- [Fixed-and-closed PRs](https://github.com/DataDog/documentation/pulls?q=is%3Apr+label%3Aastro-reorg-autofixed)
- [Auto-generated PRs](https://github.com/DataDog/documentation/pulls?q=is%3Apr+label%3Aastro-reorg-auto-pr)
- [Manual intervention PRs](https://github.com/DataDog/documentation/pulls?q=is%3Apr+label%3Aastro-reorg-manual-review)
- [PRs escalated with a help request](https://github.com/DataDog/documentation/pulls?q=is%3Apr+label%3Aastro-reorg-help-requested)
