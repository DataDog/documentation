# Docs repository reorg context

This repo is currently a Hugo site. We instead want it to contain a `hugo` and `astro` site side by side, with no overlap in their envs, `package.json` files, etc.

`astro_reorg/config.yaml` describes the relocation target for every file and folder at the top level of the repo.

`astro_reorg/execute_reorg.py` implements the file and folder path changes, and updates any dependencies on those paths, such as GitHub actions, CODEOWNERS, and Husky workflows.

`astro_reorg/helpers.py` contains shared utilities used by the other scripts (path manipulation, git/shell helpers, YAML config loading).

`astro_reorg/local_rollback.py` functions as an "undo" action for the reorg: removes `hugo/` and restores `.gitignore`, `.github/`, and `.husky/` from git.

`astro_reorg/validate_reorg.py` verifies the functionality of affected entities where possible.

`astro_reorg/resolve_pr_conflicts.py` finds open PRs with merge conflicts caused by the reorg, and either auto-fixes them (by replaying commits at post-reorg paths) or labels them for manual review. Defaults to dry-run mode; use `--no-dry-run` to apply changes. For safety it defaults to the mock base branch (see below); pass `--live` to run against the real `master`.

`astro_reorg/create_test_prs.py` creates test PRs for exercising the reorg tooling. For each spec in `TEST_PRS` it branches off `branch_from` (a frozen snapshot of `master`, so PR diffs stay small), applies a content change, pushes, and opens a PR against `mock_base_branch`, then opens the PRs in the browser.

The two scripts above share the `test:` section of `config.yaml`, which names the branches a test run uses: `mock_base_branch` (the stand-in for post-reorg `master` that test PRs target) and `branch_from` (the frozen snapshot they're cut from). `create_test_prs.py` reads both; `resolve_pr_conflicts.py` defaults to `mock_base_branch` so it operates on the same branch the test PRs were opened against — no need to pass `--base-branch` by hand. Pass `--live` to that script to run against the real `master` instead.

You can ignore the `astro` folder, it's a remnant from another branch where an Astro site is being developed. It is completely out of scope.