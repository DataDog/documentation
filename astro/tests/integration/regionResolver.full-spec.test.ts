/**
 * Region resolution against the full live spec.
 *
 * The unit tests in `src/lib/api/regionResolver.test.ts` use hand-written
 * server stubs. This file walks every operation in the real spec, so it
 * catches a spec that changes shape — a new enum style, or an operation that
 * stops matching any region.
 *
 * Picked up by `vitest.integration.config.ts`, which omits the frozen-fixture
 * plugin so `@hugo-site/data/api` resolves to the actual Hugo data directory.
 */

import { describe, it, expect } from 'vitest';
import { parse as parseYaml } from 'yaml';
import V1_SPEC_RAW from '@hugo-site/data/api/v1/full_spec.yaml?raw';
import V2_SPEC_RAW from '@hugo-site/data/api/v2/full_spec.yaml?raw';
import { getRegions, getDefaultRegions } from '@lib/api/regionResolver';

import type { OpenAPIV3 } from 'openapi-types';

/**
 * Only the slice of the spec this test reads. `getRegions` takes the same
 * server-bearing shape, so typing `servers` as `ServerObject[]` keeps the
 * calls below type-checked rather than cast.
 */
interface MinimalOperation {
  operationId?: string;
  servers?: OpenAPIV3.ServerObject[];
}

interface MinimalSpec {
  servers?: OpenAPIV3.ServerObject[];
  paths?: Record<string, Record<string, MinimalOperation>>;
}

const HTTP_METHODS = new Set([
  'get',
  'put',
  'post',
  'delete',
  'patch',
  'options',
  'head',
  'trace',
]);

function operations(raw: string) {
  const spec = parseYaml(raw) as MinimalSpec;
  const out: Array<{ id: string; spec: MinimalSpec; operation: MinimalOperation }> = [];
  for (const [path, item] of Object.entries(spec.paths ?? {})) {
    for (const [method, op] of Object.entries(item)) {
      if (!HTTP_METHODS.has(method) || !op?.operationId) continue;
      out.push({ id: `${method.toUpperCase()} ${path}`, spec, operation: op });
    }
  }
  return out;
}

const ALL_OPERATIONS = [...operations(V1_SPEC_RAW), ...operations(V2_SPEC_RAW)];

/**
 * The five operations whose `site` enum lists fully-qualified per-region hosts
 * instead of bare site domains. Before the `exact_domains` fallback existed,
 * every one of these resolved to zero regions and rendered no endpoint URL.
 */
const FULLY_QUALIFIED_HOST_OPERATIONS = [
  'POST /api/v2/on-call/pages',
  'POST /api/v2/on-call/pages/{page_id}/acknowledge',
  'POST /api/v2/on-call/pages/{page_id}/escalate',
  'POST /api/v2/on-call/pages/{page_id}/resolve',
  'POST /api/v2/prodlytics',
];

describe('getRegions across the full spec', () => {
  it('finds every operation', () => {
    expect(ALL_OPERATIONS.length).toBeGreaterThan(1500);
  });

  it('resolves at least one region for every operation', () => {
    const empty = ALL_OPERATIONS.filter(
      ({ spec, operation }) => getRegions(spec, operation).length === 0,
    ).map(({ id }) => id);

    expect(empty).toEqual([]);
  });

  it('resolves only known region keys', () => {
    const known = new Set(getDefaultRegions().map((r) => r.key));
    const unknown = new Set<string>();
    for (const { spec, operation } of ALL_OPERATIONS) {
      for (const r of getRegions(spec, operation)) {
        if (!known.has(r.key)) unknown.add(r.key);
      }
    }
    expect([...unknown]).toEqual([]);
  });

  it('resolves the on-call paging operations to all nine regions', () => {
    const allKeys = getDefaultRegions().map((r) => r.key);
    for (const id of FULLY_QUALIFIED_HOST_OPERATIONS.filter((i) =>
      i.includes('on-call'),
    )) {
      const found = ALL_OPERATIONS.find((o) => o.id === id);
      expect(found, `${id} missing from the spec`).toBeTruthy();
      expect(
        getRegions(found!.spec, found!.operation).map((r) => r.key),
        id,
      ).toEqual(allKeys);
    }
  });

  it('resolves prodlytics to the six regions with a browser-intake host', () => {
    const found = ALL_OPERATIONS.find((o) => o.id === 'POST /api/v2/prodlytics');
    expect(found, 'POST /api/v2/prodlytics missing from the spec').toBeTruthy();
    // uk1 has a browser-intake host defined in shared/regions.yaml but the
    // spec enum omits it; gov and gov2 have no browser-intake host at all.
    expect(getRegions(found!.spec, found!.operation).map((r) => r.key)).toEqual([
      'us',
      'us3',
      'us5',
      'eu',
      'ap1',
      'ap2',
    ]);
  });

  it('needs the fallback for exactly the operations listed above', () => {
    // Every other operation must match on bare site domains. If the spec adds
    // another fully-qualified-host operation this fails, so the list above
    // stays honest rather than silently going stale.
    const siteDomains = new Set(getDefaultRegions().map((r) => r.site));
    const needsFallback = ALL_OPERATIONS.filter(({ spec, operation }) => {
      const servers = operation.servers ?? spec.servers;
      const en = servers?.[0]?.variables?.site?.enum;
      if (!Array.isArray(en)) return false;
      return !en.some((d) => siteDomains.has(d));
    }).map(({ id }) => id);

    expect(needsFallback.sort()).toEqual([...FULLY_QUALIFIED_HOST_OPERATIONS].sort());
  });
});
