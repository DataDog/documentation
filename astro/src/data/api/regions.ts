/**
 * Region data extraction from OpenAPI spec server definitions.
 *
 * The spec's `servers` block defines URL templates with a `site` variable
 * whose enum lists all supported Datadog sites (regions).
 */

export interface Region {
  key: string;   // e.g. 'us1', 'eu', 'ap1'
  label: string; // e.g. 'US1', 'EU', 'AP1'
  site: string;  // e.g. 'datadoghq.com', 'datadoghq.eu'
}

/** Maps site domain → region key and label. */
const SITE_TO_REGION: Record<string, { key: string; label: string }> = {
  'datadoghq.com':     { key: 'us1', label: 'US1' },
  'us3.datadoghq.com': { key: 'us3', label: 'US3' },
  'us5.datadoghq.com': { key: 'us5', label: 'US5' },
  'ap1.datadoghq.com': { key: 'ap1', label: 'AP1' },
  'ap2.datadoghq.com': { key: 'ap2', label: 'AP2' },
  'datadoghq.eu':      { key: 'eu',  label: 'EU' },
  'ddog-gov.com':      { key: 'gov', label: 'GOV' },
};

let _cache: Region[] | null = null;

/**
 * Extracts the list of available regions from a parsed OpenAPI spec.
 * Reads `servers[0].variables.site.enum` to discover all sites.
 */
export function getRegions(spec: any): Region[] {
  if (_cache) return _cache;

  const servers = spec?.servers;
  if (!Array.isArray(servers) || servers.length === 0) {
    _cache = [{ key: 'us1', label: 'US1', site: 'datadoghq.com' }];
    return _cache;
  }

  const siteVar = servers[0]?.variables?.site;
  if (!siteVar?.enum || !Array.isArray(siteVar.enum)) {
    _cache = [{ key: 'us1', label: 'US1', site: 'datadoghq.com' }];
    return _cache;
  }

  const regions: Region[] = [];
  for (const site of siteVar.enum as string[]) {
    const mapping = SITE_TO_REGION[site];
    if (mapping) {
      regions.push({ key: mapping.key, label: mapping.label, site });
    } else {
      // Unknown site — derive key from domain
      const key = site.replace(/\..*/, '');
      regions.push({ key, label: key.toUpperCase(), site });
    }
  }

  _cache = regions;
  return regions;
}

/**
 * Builds the full API URL for a given path, site, and subdomain.
 * Uses the server URL template pattern from the spec:
 *   https://{subdomain}.{site}{path}
 */
export function buildApiUrl(site: string, path: string, subdomain = 'api'): string {
  return `https://${subdomain}.${site}${path}`;
}

/**
 * Returns the default set of Datadog regions from the static mapping.
 * Use this when you need regions without parsing a spec file.
 */
export function getDefaultRegions(): Region[] {
  return Object.entries(SITE_TO_REGION).map(([site, { key, label }]) => ({
    key,
    label,
    site,
  }));
}
