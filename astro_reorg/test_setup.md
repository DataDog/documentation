# Test setup for resolve_pr_conflicts.py

## Prerequisites

Two branches must exist on the remote (configured in `config.yaml` under `test:`):

- A non-reorged mock master branch for the mock contributors to branch from.
- A reorged mock master branch that acts as a base for the PR. This usually doesn't need to be created, since we can just use `jen.gilbert/astro-reorg-scripts` as the base.

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

Create the test PRs:

```bash
python3 astro_reorg/create_test_prs.py
```

This script will output the commands you should use to execute a dry run and a real run of the automatic conflict resolution script.

### 2. Execute a dry run

python3 astro_reorg/resolve_pr_conflicts.py \
  --base-branch <PROVIDED_BRANCH_NAME>

### 3. Execute a real run

python3 astro_reorg/resolve_pr_conflicts.py --no-dry-run \
  --base-branch <PROVIDED_BRANCH_NAME>
```

Expected outcomes: the wording-tweak PR gets an auto-fix; the other three get
the `astro-reorg-manual-review` label.
