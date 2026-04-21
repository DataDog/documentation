/**
 * Region data extraction from OpenAPI spec server definitions.
 *
 * Each operation in the spec may define `servers[0].variables.site.enum` —
 * the list of Datadog sites that operation is available on. We intersect
 * that enum with the `allowedRegions` list from the Hugo config snapshot so
 * endpoints that aren't available on a given region surface a "Not supported"
 * message in the UI.
 */

import { getAllowedRegions } from './regionConfig';

export interface Region {
  /** Region key, e.g. `us`, `eu`, `ap1`. Matches Hugo's `site` cookie value. */
  key: string;
  /** Display label, e.g. `US1`, `EU`. */
  label: string;
  /** API-site domain, e.g. `datadoghq.com`. */
  site: string;
}

let _defaultCache: Region[] | null = null;

/**
 * Returns the full set of Datadog regions defined in the Hugo config snapshot.
 * Used as the source of truth for the dropdown and for rendering a variant per
 * region on every endpoint.
 */
export function getDefaultRegions(): Region[] {
  if (_defaultCache) return _defaultCache;
  _defaultCache = getAllowedRegions().map((r) => ({
    key: r.key,
    label: r.label,
    site: r.domain,
  }));
  return _defaultCache;
}

/**
 * Extracts the regions supported by a given operation (or, if no operation
 * is passed, by the top-level spec).
 *
 * Reads `servers[0].variables.site.enum` and intersects with `allowedRegions`.
 * Returns regions in allowedRegions order.
 */
export function getRegions(spec: any, operation?: any): Region[] {
  const all = getDefaultRegions();

  const servers = operation?.servers ?? spec?.servers;
  if (!Array.isArray(servers) || servers.length === 0) return all;

  const siteVar = servers[0]?.variables?.site;
  if (!siteVar?.enum || !Array.isArray(siteVar.enum)) return all;

  const enumSet = new Set<string>(siteVar.enum);
  return all.filter((r) => enumSet.has(r.site));
}

/**
 * Builds an endpoint URL from a server block (or falls back to `api.{site}{path}`).
 * Resolves the `{subdomain}` and `{site}` variables in the server URL template.
 */
export function buildApiUrlFromServers(servers: any, site: string, path: string): string {
  if (!Array.isArray(servers) || servers.length === 0) {
    return `https://api.${site}${path}`;
  }
  const server = servers[0];
  const template: string = server?.url ?? 'https://{subdomain}.{site}';
  const subdomain: string = server?.variables?.subdomain?.default ?? 'api';
  const base = template.replace('{subdomain}', subdomain).replace('{site}', site);
  return `${base}${path}`;
}

/** Convenience wrapper kept for callers that don't need full server resolution. */
export function buildApiUrl(site: string, path: string, subdomain = 'api'): string {
  return `https://${subdomain}.${site}${path}`;
}
