# Docs repository reorg context

This repo is currently a Hugo site. We instead want it to contain a `hugo` and `astro` site side by side, with no overlap in their envs, `package.json` files, etc.

The `reorg_config.yaml` describes the relocation target for every file and folder at the top level of the repo.

`reorg.py` implements the file and folder path changes, and updates any dependencies on those paths, such as GitHub actions, CODEOWNERS, and Husky workflows.

`reorg_rollback.py` functions as an "undo" action for the reorg.

`reorg_harness.py` verifies the functionality of affected entities where possible.