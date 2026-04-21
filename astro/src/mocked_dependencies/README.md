# Mocked dependencies

The Astro site sometimes needs to refer to shared or single-sourced resources that it cannot access yet in development. For now, we keep a snapshot of each referenced resource in this folder so the site can build and render locally.

These stubs must be replaced with the live dependencies before the site goes live.

## Structure

Mocked folders mirror the source path so traceability is automatic. Two top-level roots:

- `websites_modules/` — mirrors `~/dd/websites-modules/`
- `hugo_site/` — mirrors the Datadog documentation Hugo repo root

Under each root, the subpath exactly matches the upstream path. To find the upstream source of a mocked file, strip `mocked_dependencies/<root>/` and prepend either `~/dd/websites-modules/` or the Hugo docs repo root.

## Inventory

### `websites_modules/`

- `data/menu_data/menus.yaml` — site header `main_left` and `main_right` menu trees (copied verbatim).
- `data/menu_data/product_categories.yaml` — Product mega-menu category groupings, gradients, icons (copied verbatim).
- `data/menu_data/products.yaml` — Per-product `lang_key`/`url`/`icon` (copied verbatim).
- `i18n/en.yaml` — English label translations (copied verbatim; the Astro site is English-only for now, so this is the only language bundled).
- `static/icons/` — Subset of SVG icons referenced by the nav/banner. See `static/icons/README.md` for the list and any gaps or fallbacks.

### `hugo_site/`

- `config/_default/params.en.yaml` — Site-level params (copied whole). Code only reads the `announcement_banner:` block, but the rest is preserved to keep the snapshot traceable.
- `data/api/` — OpenAPI spec and SDK examples (moved here from the old flat `api/` folder so it fits the mirrored-path convention).
- `data/en/webinars.yaml` — Geo-targeting data for the announcement banner. Currently seeded with `{ webinars: [] }`, which matches live behavior where the banner falls back to site params.
