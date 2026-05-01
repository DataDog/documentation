# Nav/banner icons

A subset of the SVGs from `~/dd/websites-modules/static/icons/`, plus `searchbar_search.svg` which lives in the Hugo docs repo at `static/images/svg-icons/searchbar_search.svg` (the Hugo `svg` partial resolves it there for the documentation repo).

Only icons referenced by the header or announcement banner are bundled here. When adding a new icon reference to the nav, copy the matching file from upstream into this folder.

## Included icons

Product-category icons (mega-menu + mobile nav):

- `eye-4.svg` — observability
- `host-map.svg` — infra
- `apm.svg` — applications
- `database-2.svg` — data
- `log.svg` — logs
- `security-platform.svg` — security
- `rum.svg` — digital experience
- `ci.svg` — software delivery
- `software-catalog.svg` — service management
- `bits-ai.svg` — ai
- `dashboard.svg` — platform capabilities

Glyphs:

- `right-carrot-normal-2.svg` — used in the "View pricing" link
- `searchbar_search.svg` — magnifying glass for the search toggle
- `modal-up-arrow.svg` — caret on the logo-download popover

## Gaps / fallbacks

The Hugo site uses an icon font (via `fantasticon`) for many per-product icons (`icon-container`, `icon-serverless`, `icon-profiling-1`, etc.). Not every font glyph has a corresponding SVG upstream, and per the product data (`products.yaml`) comment, individual product icons aren't currently rendered in the nav anyway. If a future change adds product-level icons back into the menu, copy the matching SVG from `~/dd/websites-modules/static/icons/` here and reference it by name.
