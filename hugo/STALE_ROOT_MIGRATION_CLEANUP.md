# Cleaning root-level files left by the Hugo reorganization

The Hugo site now lives in `hugo/`. Some local checkouts may still contain
root-level files and directories from before that move. They are not project
sources and are ignored by the repository-root `.gitignore` so they cannot be
committed accidentally.

Before deleting anything, save or commit any work that is not part of this
migration. Then remove the root-level remnants:

```sh
./hugo/scripts/post-migration-cleanup.sh
```

The cleanup script moves a root `Makefile.config` to `hugo/Makefile.config`
before removing files, and refuses to overwrite an existing
`hugo/Makefile.config`.

It removes only the following root-level paths:

```text
.hugo_build.lock  .yarn/       _vendor/   agent_config_types_list.txt
content/          data/        examples/  hugpython/
integrations_data/ layouts/    local/     node_modules/
playwright-report/ public/     resources/ static/  test-results/
```
