# `@dd/ask-ai`

The Ask AI widget, shared by the Hugo documentation site and the Astro one. See
[README.md](./README.md) for what the package owns and how a host mounts it.

## Formatting

- After editing code, format the files you touched — and only those files.
  Do not run a project-wide sweep unless the user has explicitly asked for one.
- Run Prettier from this directory (`shared/packages/ask-ai/`), never from the
  repository root. Prettier resolves the _nearest_ config to each file and uses
  it wholesale — there is no cascade and no `extends`. Files here must get this
  package's `.prettierrc` (2-space, otherwise Prettier defaults), which matches
  `astro/.prettierrc`. The repo-root `prettier.config.js` is Hugo's (4-space,
  single quotes, 120 columns) and must not be applied to this package.
- Scope it to the files you touched:

  ```bash
  yarn prettier --write src/panel.ts src/logger.ts
  ```

  `yarn format` and `yarn format:check` exist for the project-wide sweep, but
  only run those when the user asks for one.

- Prettier is a devDependency here, pinned to the same major as `astro/`, so
  both projects and format-on-save in an editor all produce identical output.
  Do not reach for `npx prettier` or `yarn dlx prettier`; either can resolve a
  different version.
- `.prettierignore` exists because Prettier does not read `.gitignore` (it only
  auto-skips `node_modules`). Add generated or vendored trees there rather than
  letting Prettier walk them.

The package is fully formatted, so `prettier --check .` passes on a clean tree.
Keep it that way: a file that comes back dirty means an edit skipped the
formatter, not that the baseline drifted.
