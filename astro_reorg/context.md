# Docs repository reorg context

This repo is currently a Hugo site. We instead want it to contain a `hugo` and `astro` site side by side, with no overlap in their envs, `package.json` files, etc.

`astro_reorg/config.yaml` describes the relocation target for every file and folder at the top level of the repo.

`astro_reorg/execute_reorg.py` implements the file and folder path changes, and updates any dependencies on those paths, such as GitHub actions, CODEOWNERS, and Husky workflows.

`astro_reorg/rollback.py` functions as an "undo" action for the reorg.

`astro_reorg/validate_reorg.py` verifies the functionality of affected entities where possible.

You can ignore the `astro` folder, it's a remnant from another branch where an Astro site is being developed. It is completely out of scope.