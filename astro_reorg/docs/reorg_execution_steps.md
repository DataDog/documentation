# Reorg execution steps

## When a date has been set

### 1. Update the reorg README

- [x] Add the target date to the reorg README.

### 2. Publish the README

- [x] Publish [REPO_REORG.md](../../REPO_REORG.md) on master, so you can link to it.
- [x] Set the `REORG_README_BRANCH` constant in `resolve_pr_conflicts.py` to `"master"` (it defaults to the scripts branch), commit, and push. Leave `CONFIG_LINK_BRANCH` pointing at the scripts branch — the reorg deletes `astro_reorg/` from master, so that link must stay on a branch that retains it.

### 3. Announce the reorg

Announce the reorg (see copy for various channels below).

- [x] To the #docs-announcements channel (https://dd.slack.com/archives/C09641REVHN/p1785165930974599)
- [x] To the #documentation channel (https://dd.slack.com/archives/C0DESMBQU/p1785255569372869)
- [x] In a banner in the `documentation` README

## The day before

### 1. Bump the announcement in the #docs-backroom channel

See link you saved above.

### 2. Verify that the docs oncall folks have what they need

Remind them of the reorg, link them to the Confluence page, and ask if they have any questions.

## The day of

NOTE: This file will get deleted from your reorg branch, so don't edit it there. You can push what you have, then check it off [here](https://github.com/DataDog/documentation/blob/jen.gilbert/astro-reorg-scripts/astro_reorg/docs/reorg_execution_steps.md) instead.

### 1. In #docs-announcements, post the reorg tracker

This is saved in your DMs.

### 2. Bump the announcement in the #documentation channel

See link you saved above. Add this to the thread, but also post to the channel, and add a link to the reorg:

```
Hi all, I'm about to begin work on the planned documentation repo reorg. We'll be in a code freeze for several hours at minimum. I'll update this thread when I lift the code freeze. Thanks!
```

### 3. Declare an incident

### 4. Declare a code freeze

See the [Confluence page](https://datadoghq.atlassian.net/wiki/spaces/WEB/pages/5286757291/Code+Freeze+Workflows).

Announce the freeze in `#documentation` with a link to the reorg README.

### 5. Create a reorged `master` branch

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
- [ ] Stage and commit the result (the push happens in the next step):
   ```bash
   git add -A -- ':!astro/'
   git commit -m "Create hugo site folder"
   ```

### 6. Push and open a PR against master

```bash
git push -u origin jen.gilbert/hugo-site-folder &&
gh pr create --base master --title "Create Hugo site folder" 
```

### 7. Verify that the GitHub actions etc. are working, and make any necessary fixes

- [ ] Verify that GitHub actions aren't erring out from bad paths.
- [ ] While the preview is building, run some local checks:
   - [ ] The Cdocs e2e tests are passing.
   - [ ] Integrations pages are working correctly.
   - [ ] API pages are working correctly.
   - [ ] Single sourced content is working correctly.

### 8. Verify the preview build

- [ ] The GitLab artifacts for the preview build should be similar to those of the last build on `master`: same number of HTML files in `public`, for example.
- [ ]

### 9. Merge to master and verify the build

### 10. Run the PR resolution script

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

### 11. End the code freeze

### 12. Post in #documentation and #docs-backroom

### 13. Monitor the queues

- [All processed PRs](https://github.com/DataDog/documentation/pulls?q=is%3Apr+label%3Aastro-reorg-processed)
- [Fixed-and-closed PRs](https://github.com/DataDog/documentation/pulls?q=is%3Apr+label%3Aastro-reorg-autofixed)
- [Auto-generated PRs](https://github.com/DataDog/documentation/pulls?q=is%3Apr+label%3Aastro-reorg-auto-pr)
- [Manual intervention PRs](https://github.com/DataDog/documentation/pulls?q=is%3Apr+label%3Aastro-reorg-manual-review)
- [PRs escalated with a help request](https://github.com/DataDog/documentation/pulls?q=is%3Apr+label%3Aastro-reorg-help-requested)
