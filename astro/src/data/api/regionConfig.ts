/**
 * Region configuration sourced from the Hugo site's snapshots.
 *
 * - `allowedRegions` comes from Hugo's `config/_default/params.yaml` and drives
 *   the list of Datadog sites we surface in the dropdown and in per-region
 *   endpoint URLs.
 * - `dd_datacenter`, `dd_site`, `dd_full_site`, etc. come from Hugo's
 *   `assets/scripts/config/regions.config.js` and drive per-region labels and
 *   app-host lookups used at runtime (e.g. for referrer detection).
 *
 * Keeping both sources mocked under `mocked_dependencies/hugo_site/` means the
 * Astro site uses the same region keys (`us`, `eu`, `ap1`, …) as Hugo so the
 * `site` cookie and `?site=` query param transfer seamlessly between sites.
 */

import { parse as parseYaml } from 'yaml';

// @ts-ignore — Vite raw import
import paramsRaw from '../../mocked_dependencies/hugo_site/config/_default/params.yaml?raw';
// @ts-ignore — plain ES module import
import regionsConfig from '../../mocked_dependencies/hugo_site/assets/scripts/config/regions.config.js';

export interface AllowedRegion {
  /** Region key used in the `site` cookie / `?site=` query param. E.g. `us`, `eu`, `ap1`. */
  key: string;
  /** Display label, e.g. `US1`, `EU`, `AP1`. */
  label: string;
  /** Base domain, e.g. `datadoghq.com`, `datadoghq.eu`. Matches the spec's `site` enum values. */
  domain: string;
  /** Sort order for the dropdown (lower = earlier). */
  weight: number;
  /** Additional domains that map to this region (oncall hosts, browser-intake hosts, etc.). */
  exactDomains: string[];
}

interface RawAllowedRegion {
  name: string;
  value: string;
  weight: number;
  domain: string;
  exact_domains?: string[];
}

interface RegionsConfigShape {
  allowedRegions: string[];
  dd_datacenter: Record<string, string>;
  dd_site: Record<string, string>;
  dd_full_site: Record<string, string>;
  [key: string]: unknown;
}

const rc = regionsConfig as RegionsConfigShape;

let _allowedRegions: AllowedRegion[] | null = null;

/** List of supported Datadog regions, sorted by Hugo's `weight` field. */
export function getAllowedRegions(): AllowedRegion[] {
  if (_allowedRegions) return _allowedRegions;

  const parsed = parseYaml(paramsRaw) as { allowedRegions?: RawAllowedRegion[] };
  const list = parsed.allowedRegions ?? [];

  _allowedRegions = list
    .map((r) => ({
      key: r.value,
      label: r.name,
      domain: r.domain,
      weight: r.weight,
      exactDomains: r.exact_domains ?? [],
    }))
    .sort((a, b) => a.weight - b.weight);

  return _allowedRegions;
}

/** Datacenter label for a region key, e.g. `us` → `US1`. */
export function datacenterLabel(key: string): string {
  return rc.dd_datacenter?.[key] ?? key.toUpperCase();
}

/** API-site base domain for a region key, e.g. `us` → `datadoghq.com`. */
export function siteDomain(key: string): string | undefined {
  return rc.dd_site?.[key];
}

/** App host for a region key, e.g. `us` → `app.datadoghq.com`. Used for referrer detection. */
export function appHost(key: string): string | undefined {
  return rc.dd_full_site?.[key];
}

/** Valid set of region keys, for input validation on cookies / query params. */
export function isAllowedRegionKey(key: string | null | undefined): boolean {
  if (!key) return false;
  return getAllowedRegions().some((r) => r.key === key);
}

/** Fallback region when nothing else resolves. Matches Hugo's default. */
export const DEFAULT_REGION_KEY = 'us';
