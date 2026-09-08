/**
 * Region configuration, sourced from `shared/regions.yaml`.
 *
 * That file is the single source of truth for Datadog data centers. One block
 * per region carries its identity (key, label, weight, domain, exact_domains)
 * and every per-region substitution value. Adding a data center means adding
 * one block there — no other file in `astro/src` should need editing.
 *
 * Hugo still reads its own copies (`config/_default/params.yaml` and
 * `assets/scripts/config/regions.config.js`) until the Hugo phase mounts this
 * file as data. The two copies are equivalent; `regions.equivalence.test.ts`
 * checks that.
 *
 * All values are strings, including ports. Hugo interpolates them into prose,
 * so the schema preserves the source type rather than coercing.
 *
 * ⚠️ This module is build-time-only. It pulls in the `yaml` parser and the
 * full region table. Do not import it from client-bundled code (Preact
 * components, anything in the hydration graph). Client code should receive the
 * slim `ClientRegion[]` shape via props — `.astro` islands read the data here
 * in frontmatter and pass it through.
 */

import { parse as parseYaml } from 'yaml';
import { z } from 'zod';
import REGIONS_YAML_RAW from '@shared/regions.yaml?raw';

/**
 * Every value is a string. `.catchall(z.string())` means a new substitution
 * key added to the YAML flows through with no schema edit, while a
 * wrong-typed value (a bare number that lost a leading zero, say) fails the
 * build.
 */
const RegionValuesSchema = z.record(z.string(), z.string());

const RegionSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  weight: z.number(),
  domain: z.string().min(1),
  exact_domains: z.array(z.string()).default([]),
  values: RegionValuesSchema,
});

const RegionsFileSchema = z.object({
  regions: z.array(RegionSchema).min(1),
});

type RawRegion = z.infer<typeof RegionSchema>;

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

const file = RegionsFileSchema.parse(parseYaml(REGIONS_YAML_RAW));

/**
 * Every region must define every substitution key. A gap would render an
 * empty hostname on a live page, so it fails the build instead. The union of
 * all keys is the expected set — that way the check needs no hardcoded list
 * and a genuinely new key just has to be added for all regions at once.
 */
function assertCompleteValues(regions: RawRegion[]): void {
  const allKeys = new Set<string>();
  for (const r of regions) {
    for (const k of Object.keys(r.values)) allKeys.add(k);
  }
  const gaps: string[] = [];
  for (const r of regions) {
    for (const k of allKeys) {
      if (!(k in r.values)) gaps.push(`${r.key}.${k}`);
    }
  }
  if (gaps.length > 0) {
    throw new Error(
      `shared/regions.yaml: missing region values: ${gaps.join(', ')}. ` +
        `Every region must define every key.`,
    );
  }
}

function assertUniqueKeys(regions: RawRegion[]): void {
  const seen = new Set<string>();
  for (const r of regions) {
    if (seen.has(r.key)) {
      throw new Error(`shared/regions.yaml: duplicate region key "${r.key}".`);
    }
    seen.add(r.key);
  }
}

assertUniqueKeys(file.regions);
assertCompleteValues(file.regions);

/** Regions sorted by `weight`, ascending. Sorted once at module load. */
const REGIONS: RawRegion[] = [...file.regions].sort((a, b) => a.weight - b.weight);

const BY_KEY = new Map(REGIONS.map((r) => [r.key, r]));

const ALLOWED_REGIONS: AllowedRegion[] = REGIONS.map((r) => ({
  key: r.key,
  label: r.label,
  domain: r.domain,
  weight: r.weight,
  exactDomains: r.exact_domains,
}));

/** List of supported Datadog regions, sorted by `weight`. */
export function getAllowedRegions(): AllowedRegion[] {
  return ALLOWED_REGIONS;
}

/**
 * Any per-region substitution value by key, e.g.
 * `regionValue('eu', 'api_endpoint')`. Returns undefined for an unknown
 * region or an unknown value key.
 */
export function regionValue(regionKey: string, valueKey: string): string | undefined {
  return BY_KEY.get(regionKey)?.values[valueKey];
}

/** Datacenter label for a region key, e.g. `us` → `US1`. */
export function datacenterLabel(key: string): string {
  return regionValue(key, 'dd_datacenter') ?? key.toUpperCase();
}

/** API-site base domain for a region key, e.g. `us` → `datadoghq.com`. */
export function siteDomain(key: string): string | undefined {
  return regionValue(key, 'dd_site');
}

/** App host for a region key, e.g. `us` → `app.datadoghq.com`. Used for referrer detection. */
export function appHost(key: string): string | undefined {
  return regionValue(key, 'dd_full_site');
}

/** Valid set of region keys, for input validation on cookies / query params. */
export function isAllowedRegionKey(key: string | null | undefined): boolean {
  if (!key) return false;
  return BY_KEY.has(key);
}

/** Fallback region when nothing else resolves. Matches Hugo's default. */
export const DEFAULT_REGION_KEY = 'us';

/**
 * Slim region shape for client code. Contains only what `RegionSelector` and
 * `regionState` need — no OTLP endpoints, AWS PrivateLink service names,
 * Cursor deeplinks, etc. Built in `.astro` frontmatter and passed as a prop
 * so the client bundle never imports this module (or `yaml`) directly.
 */
export interface ClientRegion {
  key: string;
  label: string;
  domain: string;
  /** App host used to detect navigations from a Datadog app subdomain. */
  appHost: string;
}

/** Build the slim client-facing region list from the full build-time data. */
export function buildClientRegions(): ClientRegion[] {
  return getAllowedRegions().map((r) => ({
    key: r.key,
    label: r.label,
    domain: r.domain,
    appHost: appHost(r.key) ?? '',
  }));
}
