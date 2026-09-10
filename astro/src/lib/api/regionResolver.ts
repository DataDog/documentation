/**
 * Region data extraction from OpenAPI spec server definitions.
 *
 * Each operation in the spec may define `servers[0].variables.site.enum` —
 * the list of Datadog sites that operation is available on. We intersect that
 * enum with the region list from `shared/regions.yaml` so endpoints that
 * aren't available on a given region surface a "Not supported" message in the
 * UI.
 *
 * The enum holds one of two things, so matching is two-pass (mirroring Hugo's
 * `layouts/partials/api/get-endpoint.html`):
 *
 *   1. Bare site domains — `datadoghq.com`, `datadoghq.eu`. Nearly every
 *      operation. Matched against each region's `domain`.
 *   2. Fully-qualified per-region hosts — `navy.oncall.datadoghq.com`,
 *      `browser-intake-us3-datadoghq.com`. Matched against each region's
 *      `exact_domains`. Five operations use these: the four on-call paging
 *      calls and `POST /api/v2/prodlytics`.
 */

import type { OpenAPIV3 } from "openapi-types";
import { getAllowedRegions } from "@config/regions";
import type { Region } from "./schemas/region";

let _defaultCache: Region[] | null = null;

/**
 * `exactDomains` per region key, for pass 2 of `getRegions`. Kept beside the
 * `Region[]` cache because `Region` deliberately carries only what the UI
 * renders, and these hosts are a matching detail.
 */
let _exactDomainsCache: Map<string, string[]> | null = null;

function getExactDomains(): Map<string, string[]> {
  if (_exactDomainsCache) return _exactDomainsCache;
  _exactDomainsCache = new Map(
    getAllowedRegions().map((r) => [r.key, r.exactDomains]),
  );
  return _exactDomainsCache;
}

/**
 * Returns the full set of Datadog regions from `shared/regions.yaml`. Used as
 * the source of truth for the dropdown and for rendering a variant per region
 * on every endpoint.
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
 * Extracts the regions supported by a given operation (or, if no operation is
 * passed, by the top-level spec).
 *
 * Reads `servers[0].variables.site.enum` and intersects it with the region
 * list. Bare site domains are matched first; if none match, the enum is
 * treated as fully-qualified per-region hosts and matched against
 * `exact_domains`. Returns regions in region-list (weight) order.
 *
 * Only `servers[0]` is read. An operation can carry more than one server
 * block, but Hugo reads only the first (`index . 0`), and matching further
 * blocks would surface regions the Hugo site does not show.
 *
 * Both arguments are typed as just the server-bearing slice of their OpenAPI
 * parents so callers (and tests) can pass minimal stubs.
 */
export function getRegions(
  spec: Pick<OpenAPIV3.Document, "servers">,
  operation?: Pick<OpenAPIV3.OperationObject, "servers">,
): Region[] {
  const all = getDefaultRegions();

  const servers = operation?.servers ?? spec.servers;
  if (!Array.isArray(servers) || servers.length === 0) return all;

  const siteVar = servers[0]?.variables?.site;
  if (!siteVar?.enum || !Array.isArray(siteVar.enum)) return all;

  const enumSet = new Set<string>(siteVar.enum);

  // Pass 1: bare site domains. Covers all but five operations.
  const matchedRegions = all.filter((r) => enumSet.has(r.site));
  if (matchedRegions.length > 0) return matchedRegions;

  // Pass 2: fully-qualified per-region hosts. Guarded so it runs only when
  // pass 1 found nothing, matching Hugo's `if eq (len regions) 0`.
  //
  // This iterates regions and tests membership rather than building a
  // host-to-region map. A map would be lossy: `navy.oncall.datadoghq.com` is
  // listed by us, gov and gov2, so keying by host keeps only the last and
  // silently drops the other two.
  const exactDomainsByKey = getExactDomains();
  return all.filter((r) =>
    (exactDomainsByKey.get(r.key) ?? []).some((d) => enumSet.has(d)),
  );
}

/**
 * Builds an endpoint URL from a server block (or falls back to `api.{site}{path}`).
 * Resolves the `{subdomain}` and `{site}` variables in the server URL template.
 */
export function buildApiUrlFromServers(
  servers: OpenAPIV3.ServerObject[] | undefined,
  site: string,
  path: string,
): string {
  if (!Array.isArray(servers) || servers.length === 0) {
    return `https://api.${site}${path}`;
  }
  const server = servers[0];
  const template: string = server?.url ?? "https://{subdomain}.{site}";
  const subdomain: string = server?.variables?.subdomain?.default ?? "api";
  const base = template
    .replace("{subdomain}", subdomain)
    .replace("{site}", site);
  return `${base}${path}`;
}

/** Convenience wrapper kept for callers that don't need full server resolution. */
export function buildApiUrl(
  site: string,
  path: string,
  subdomain = "api",
): string {
  return `https://${subdomain}.${site}${path}`;
}
