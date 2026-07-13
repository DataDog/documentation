# Docs repository reorg context

This repo is currently a Hugo site. We instead want it to contain a `hugo` and `astro` site side by side, with no overlap in their envs, `package.json` files, etc.

`astro_reorg/config.yaml` describes the relocation target for every file and folder at the top level of the repo.

`astro_reorg/execute_reorg.py` implements the file and folder path changes, and updates any dependencies on those paths, such as GitHub actions, CODEOWNERS, and Husky workflows.

`astro_reorg/helpers.py` contains shared utilities used by the other scripts (path manipulation, git/shell helpers, YAML config loading).

`astro_reorg/local_rollback.py` functions as an "undo" action for the reorg: removes `hugo/` and restores `.gitignore`, `.github/`, and `.husky/` from git.

`astro_reorg/validate_reorg.py` verifies the functionality of affected entities where possible.

`astro_reorg/resolve_pr_conflicts.py` finds open PRs with merge conflicts caused by the reorg, and either auto-fixes them (by replaying commits at post-reorg paths) or labels them for manual review. It defaults to a dry run against a mock base branch, so it can't touch real PRs by accident.

`astro_reorg/create_test_prs.py` creates test PRs for exercising `resolve_pr_conflicts.py`, including the conflicts it can't auto-fix. Each spec in `TEST_PRS` becomes a PR that reproduces one conflict scenario.

Both scripts share the `test:` section of `config.yaml`, which names the branches a test run uses: `mock_reorged_master_branch` (the stand-in for post-reorg `master` that test PRs target and the resolver treats as the base) and `branch_from` (the frozen snapshot the test PRs are cut from).

For flags and the mechanics of each scenario, read the script's module docstring and the comments on `TEST_PRS` — that's the source of truth, so this file doesn't have to track them.

You can ignore the `astro` folder, it's a remnant from another branch where an Astro site is being developed. It is completely out of scope.