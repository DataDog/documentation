# Datadog site

## Prompt

Datadog has many data centers ("Datadog sites"). Each Datadog user exists on a certain Datadog site.

The Hugo site has a mechanism where the user can select their Datadog site (for example, `US1`), and this influences the content on the page through various shortcodes, partials, etc. that reference the active Datadog site and make decisions on what content to hide or display.

The API pages specifically, which is our current scope for Astro, display different endpoints based on the selected Datadog site. In contrast, the site dropdown on the Astro site does not do anything yet, and the alternative endpoint URLs are just dormant.

For example, this site-switching functionality is available on the Hugo site at `localhost:1313/api/latest/action-connection/`, but the equivalent Astro page (`http://localhost:4321/api/latest/action-connection/`) does not have this feature yet.

Review how Hugo is implementing this mechanism, and plan an Astro equivalent. Update the API page logic to display the correct endpoint based on the user's choice of Datadog site. If there are any data dependencies, such as a manifest of the available Datadog sites, add those dependencies to [the `mocked_dependencies` folder](../src/mocked_dependencies/) so we can reference them, as has already been done for other features.

## Claude's plan

### How Hugo does it today

The mechanism Hugo uses is essentially:

1. **At build time**, render every region's content into the DOM, each wrapped in an element with `data-region="<key>"` and the `d-none` (display: none) class. So a single endpoint header emits ~7 `<span>`s, one per allowed region, with only one visible.
2. **At page load**, a JS module ([assets/scripts/region-redirects.js](../../assets/scripts/region-redirects.js)) resolves the active region from `?site=` query param → `site` cookie → app referrer → default (`us`), writes the cookie, then calls `showRegionSnippet(region)` which:
    - Removes `d-none` from every `[data-region="<active>"]` element and adds it to the rest.
    - Swaps the dropdown button label.
    - Rewrites `[data-region-param]` elements (for things like endpoint domains referenced inline in text).
    - Rewrites external app links to point at the correct regional app host.
3. **On selector change**, the same function runs and also updates the cookie + query param.

Region config has two sources in Hugo:

- [config/_default/params.yaml:164](../../config/_default/params.yaml#L164) — `allowedRegions` list (name, value, weight, domain, exact_domains). Drives the dropdown options and the server-URL-to-region mapping in [api/regions.html](../../layouts/partials/api/regions.html) and [api/get-endpoint.html](../../layouts/partials/api/get-endpoint.html).
- [assets/scripts/config/regions.config.js](../../assets/scripts/config/regions.config.js) — a large map keyed by region with dozens of per-region values (`dd_site`, `dd_full_site`, `dd_api`, `dd_site_name`, etc.). Drives the runtime swaps.

For API endpoints specifically, the per-region URLs are baked in at build time via the spec's `servers[0].variables.site.enum`, which is already how Astro [regions.ts:31](../src/data/api/regions.ts#L31) extracts them. The enum is intersected with `allowedRegions.domain` so we only show supported regions, and regions in `allowedRegions` that aren't in the enum get a "Not supported in the X region" fallback ([api/list.html:155](../../layouts/api/list.html#L155)).

### What exists in Astro already

- [RegionSelector.tsx](../src/components/RegionSelector/RegionSelector.tsx) — dropdown with localStorage persistence, dispatches a `regionchange` event. Nothing listens to it yet.
- [regions.ts](../src/data/api/regions.ts) — hardcoded `SITE_TO_REGION` map using `us1` keys. Extracts regions from the spec's `servers` enum.
- [ApiEndpoint.astro:78](../src/components/ApiEndpoint/ApiEndpoint.astro#L78) — receives `regionUrls: Record<string, string>` per endpoint but only renders `us1`.
- [curl.ts:117](../src/data/api/curl.ts#L117) — bakes in a single `site` at build time.
- [ApiLayout.astro](../src/layouts/ApiLayout.astro) — mounts `<RegionSelector>` once in the API toolbar.

### Plan

#### 1. Snapshot Hugo's region config into `mocked_dependencies`

Add the two Hugo data sources so we can reference them authoritatively:

- `astro/src/mocked_dependencies/hugo_site/data/allowedRegions.yaml` — the `allowedRegions` block from [params.yaml:164–212](../../config/_default/params.yaml#L164-L212).
- `astro/src/mocked_dependencies/hugo_site/data/regions.config.js` — a verbatim copy of [assets/scripts/config/regions.config.js](../../assets/scripts/config/regions.config.js).
- Update [mocked_dependencies/README.md](../src/mocked_dependencies/README.md) inventory with both entries.

#### 2. Build a region config module that reads from the snapshot

New file `astro/src/data/api/regionConfig.ts`:

- Imports the YAML and the regions config map from the snapshot.
- Exports:
    - `allowedRegions: AllowedRegion[]` — sorted by `weight`, for the dropdown.
    - `datacenterLabel(key)` — maps `us` → `US1`, etc. (from `regions.config.js.dd_datacenter`).
    - `siteDomain(key)` — maps `us` → `datadoghq.com` (from `dd_site`).
    - `appHost(key)` — maps `us` → `app.datadoghq.com` (from `dd_full_site`), for referrer detection.
- This module becomes the single source of truth for region data everywhere in Astro.

Rework [regions.ts](../src/data/api/regions.ts) to:

- Drop the hardcoded `SITE_TO_REGION` map; derive it from `regionConfig.ts` (keyed on `domain` from `allowedRegions`).
- Change region keys from `us1` to `us` so cookie / query param values are compatible with Hugo.
- `getRegions(spec)` still intersects the spec's `site.enum` with `allowedRegions` so unsupported regions get filtered out per endpoint — the call site in [endpoints.ts:528](../src/data/api/endpoints.ts#L528) gets that intersection result in `regionUrls`, and any allowed region *not* in the intersection represents a "Not supported" case.

#### 3. Render all region variants at build time

**Endpoint URL** ([ApiEndpoint.astro](../src/components/ApiEndpoint/ApiEndpoint.astro)):

- Replace the single `<code>{ep.regionUrls?.['us1'] ?? …}</code>` with a loop over `allowedRegions`: for each region, emit `<code data-region="{key}" class="d-none …">{ep.regionUrls[key] ?? "Not supported in the {NAME} region"}</code>`. The "Not supported" text matches Hugo's string exactly.
- The default-visible region (US1) has `d-none` removed server-side so SSR renders correctly before JS runs.

**Curl example** ([curl.ts](../src/data/api/curl.ts) → endpoints.ts:539):

- Change the curl builder from returning a single string to returning `Record<string, string>` (one curl per region), generated by looping over `allowedRegions` with each region's `siteDomain`.
- Store this on the endpoint data as `curlByRegion`.
- Update [ApiCodeExample.tsx](../src/components/ApiCodeExample/ApiCodeExample.tsx): when the curl entry has region variants, render all variants inside the curl tab, each wrapped in `<div data-region="{key}" class="d-none">`. Syntax highlighting runs once per variant at build time (N×7 but curl strings are small).

**`x-unstable` / deprecated messages and everything else**: out of scope for this plan — those don't vary by region.

#### 4. A single client-side region state manager

New file `astro/src/components/RegionSelector/regionState.ts` — framework-agnostic, loaded by the RegionSelector island and any page that renders `[data-region]` elements:

- `resolveInitialRegion()` — query `?site=` → cookie `site` → referrer host (matched against `appHost()` from regionConfig) → default `us`. Mirrors Hugo's precedence in [region-redirects.js:36–51](../../assets/scripts/region-redirects.js#L36-L51).
- `setRegion(key)` — writes cookie `site` (path `/`, matching Hugo so the same cookie works on both sites), updates `?site=` query param via `history.replaceState`, updates `document.documentElement.dataset.region`, dispatches a `regionchange` CustomEvent.
- `applyRegion(key)` — toggles `d-none` on every `[data-region]` element so only the active region is visible. Also updates the dropdown button label.
- Runs `applyRegion(resolveInitialRegion())` on `DOMContentLoaded`.

Uses `js-cookie` (already in the Hugo repo's dependencies) or a small inline cookie helper — whichever is lighter for Astro; probably inline since it's ~10 lines.

#### 5. Rewire the RegionSelector component

[RegionSelector.tsx](../src/components/RegionSelector/RegionSelector.tsx):

- Drop localStorage; drive state through `regionState.ts` (cookie + query param).
- Populate options from `allowedRegions` sorted by `weight` instead of a prop — the island no longer needs `regions` JSON passed in.
- Display `datacenterLabel(key)` (e.g. "US1") in options, consistent with Hugo's dropdown.

[RegionSelectorIsland.astro](../src/components/RegionSelector/RegionSelectorIsland.astro) + [ApiLayout.astro:27](../src/layouts/ApiLayout.astro#L27):

- Remove the `regions` prop since the component reads from the config module directly.

#### 6. Tests and docs

- Update [region-selector.mdoc](../src/content/docs/components/region-selector.mdoc) to document the new prop-less API and the cookie/query-param behavior.
- Headless test: render `ApiEndpoint` with a sample endpoint, assert all 7 region spans are present and six have `d-none`.
- Playwright test: load the action-connection page, change the selector to EU, assert the visible URL becomes `https://api.datadoghq.eu/...` and `?site=eu` is in the URL.
- Playwright test: unsupported-region fallback — pick an endpoint whose spec enum excludes some region, switch to that region, assert the "Not supported" message renders.

### Open questions / risks

- **Curl size**: 7× curl strings per endpoint × ~200 endpoints = not tiny but not huge. If bundle size becomes a concern later, we can switch to Hugo's approach of wrapping only the URL in a `[data-region]` span and leaving the rest of the curl static. Starting with the full-variant approach because it's simpler and matches the "render everything" model; flag if build output looks bloated.
- **Cookie scope**: Hugo sets cookie with `path: '/'`. For true cross-site reuse the cookie domain would also need to match in production, but that's an ops concern outside this PR.
- **Key migration**: any existing Astro users with `us1` in localStorage need a fallback. Since this is pre-launch, we can drop the localStorage read entirely rather than write a migration.
