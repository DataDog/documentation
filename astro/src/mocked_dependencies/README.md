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

- `config/_default/menus/menus.en.yaml` — Footer menus (`footer_resources`, `footer_about`, `footer_blog`, `footer_sub`, `footer_social`), copied verbatim.
- `data/menu_data/menus.yaml` — site header `main_left` and `main_right` menu trees (copied verbatim).
- `data/menu_data/product_categories.yaml` — Product mega-menu category groupings, gradients, icons (copied verbatim).
- `data/menu_data/products.yaml` — Per-product `lang_key`/`url`/`icon` (copied verbatim).
- `data/language_names.yaml` — Per-language label dictionary for the footer language selector (copied verbatim).
- `i18n/en.yaml` — English label translations (copied verbatim and extended with footer-specific keys: `footer_blurb_heading`, `footer_blurb_desc`, `contact_us`, `resources`, `personalized_demo`).
- `static/icons/` — **Removed from mocked_dependencies.** Icons are now rendered via the websites-modules iconfont (`<i class="icon-{name}">`). Font files live in `astro/public/fonts/`; the iconfont SCSS is imported via the `@websites-modules` Vite alias defined in `astro.config.mjs`.

### `hugo_site/`

- `config/_default/params.en.yaml` — **Removed from mocked_dependencies.** Now read directly from the Hugo repo root via `PARAMS_EN_YAML_PATH` in `src/externalDependencies.ts`.
- `config/_default/params.yaml` — **Removed from mocked_dependencies.** Now read directly from the Hugo repo root via `PARAMS_YAML_PATH` in `src/externalDependencies.ts`.
- `assets/scripts/config/regions.config.js` — **Removed from mocked_dependencies.** Now imported directly from the Hugo repo root via `src/externalDependencies.ts`.
- `data/api/` — **Removed from mocked_dependencies.** Specs, translations, and code example metadata are now sourced directly from the Hugo repo root via `src/externalDependencies.ts`.
- `data/en/webinars.yaml` — Geo-targeting data for the announcement banner. Currently seeded with `{ webinars: [] }`, which matches live behavior where the banner falls back to site params.
- `static/images/svg-icons/` — Docs-repo SVGs referenced by the footer (`world`, `arrow`, `app-store-badge`, `google-play-badge`, `apple`, `google-play`). These files use Hugo's `default-size` / `default-fill` / `default-opacity` placeholder tokens; `SvgIcon.astro` substitutes them at render time.
