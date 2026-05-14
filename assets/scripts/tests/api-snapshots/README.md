# API snapshot harness (throwaway)

Temporary safety check for the shorter-api-pages migration. Diffs the rendered HTML of a representative subset of endpoints before and after the per-endpoint page split.

This whole directory is gitignored and is deleted once the migration lands.

## Use

```sh
# from repo root, build the site so public/ has HTML to read
yarn build:hugo

# install + capture baseline against current master HTML
cd assets/scripts/tests/api-snapshots
npm install
npx vitest run -u   # writes __snapshots__/

# ...make changes, rebuild...

# verify no content drift
cd assets/scripts/tests/api-snapshots
npx vitest run
```

## What it checks

For each entry in `targets` (matched to the audit set in `plans/shorter_api_pages.md`):

- Before the migration: pulls the `<h2 id="endpoint-slug">` section's `.endpoint-content` from `public/api/latest/{tag}/index.html`.
- After the migration: pulls the `.endpoint-content` from `public/api/latest/{tag}/{endpoint-slug}/index.html`. Falls back to the H2-section path so intermediate steps still produce comparable output.

Wrapper / anchor / collapse-trigger diffs are normalized away so only the inner endpoint content (overview, permissions, parameters, request, response, code examples) is compared.
