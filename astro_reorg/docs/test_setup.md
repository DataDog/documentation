# Test setup for resolve_pr_conflicts.py

## Prerequisites

Two branches must exist on the remote, named in `config.yaml` under `test:`:

- `mock_authors_branch_from` — a non-reorged snapshot of master that the mock contributor PRs are cut from. The scripts branch (`jen.gilbert/astro-reorg-scripts`) works and already exists, so you usually don't need to create this one.
- `mock_reorged_master_branch` — a reorged stand-in for post-reorg master that the test PRs target and the resolver treats as the base. You create this below. It must have the reorg applied, so the scripts branch can't stand in for it.

## Setup steps

### 1. Choose a branch name for the reorged mock master

**Do not create the branch yet.**

Choose a name for the reorged mock master you intend to create, such as `mock-reorged-master-7-14-1258` (this example just used the date and current time to make the branch name unique).

### 2. Update the script config

Update `mock_reorged_master_branch` in `config.yaml` to match your intended branch name. Commit the change.

### 3. Create the mock reorged master branch

Replace `<YOUR_BRANCH_NAME>` with the branch name you chose above.

```bash
git checkout jen.gilbert/astro-reorg-scripts
git checkout -b <YOUR_BRANCH_NAME>
python3 astro_reorg/execute_reorg.py
git add -- . ':!astro'
git commit -m "Apply reorg"
git push --set-upstream origin <your-branch-name>
```

### 4. Switch back to `jen.gilbert/astro-reorg-scripts`

Switch back to the Astro reorg scripts branch:

```bash
git checkout jen.gilbert/astro-reorg-scripts
```

Revert any lingering (untracked) reorg changes:

```bash
python3 astro_reorg/local_rollback.py
```

## Running the test

### 1. Create the test PRs

```bash
python3 astro_reorg/create_test_prs.py
```

This opens one PR per spec in `TEST_PRS`. Because some specs carry a `base_edit`, the script also builds a throwaway conflicting base branch (unique per run, so no force-push) and points every PR at it, so a single resolver run exercises both the clean auto-fixes and the manual-review fallbacks together. On completion it:

- writes `test_pr_list.md` at the repo root, listing every PR and its expected outcome, and
- prints the exact dry-run and real-run commands to use next, already filled in with the right `--base-branch` and `--limit`.

### 2. Execute a dry run

Run the dry-run command printed by `create_test_prs.py`. It looks like:

```bash
python3 astro_reorg/resolve_pr_conflicts.py --base-branch <PRINTED_BRANCH> --limit <N>
```

`--limit` is required, so don't drop it.

### 3. Execute a real run

Run the real-run command printed by `create_test_prs.py`. It looks like:

```bash
python3 astro_reorg/resolve_pr_conflicts.py --no-dry-run --base-branch <PRINTED_BRANCH> --limit <N>
```

Expected outcomes (`test_pr_list.md` is the authoritative list):

- **Auto-fixed** — original closed and replaced with a `[reorg fix]` PR (`astro-reorg-autofixed`): the wording-tweak PR and the new-page-with-nav PR.
- **Skipped as WIP** — `astro-reorg-skip` label plus a comment: the `WORK IN PROGRESS` PR.
- **Manual review** — `astro-reorg-manual-review` and `WORK IN PROGRESS` labels plus a comment: the non-reorg-conflict PR and the two unresolvable-reorg-conflict PRs.
