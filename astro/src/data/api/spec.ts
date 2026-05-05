/**
 * Shared OpenAPI spec parsing.
 *
 * Loads the v1 and v2 spec YAML once per build via Vite raw imports.
 * Used by all content collection loaders and any remaining runtime helpers.
 */

import { parse as parseYaml } from 'yaml';

// @ts-ignore — Vite raw import
import v1Raw from '@hugo-site/data/api/v1/full_spec.yaml?raw';
// @ts-ignore — Vite raw import
import v2Raw from '@hugo-site/data/api/v2/full_spec.yaml?raw';

export type ApiVersion = 'v1' | 'v2';
export const API_VERSIONS: readonly ApiVersion[] = ['v1', 'v2'] as const;

const specRaw: Record<ApiVersion, string> = { v1: v1Raw, v2: v2Raw };
const specCache = new Map<ApiVersion, any>();

export function getSpec(version: ApiVersion): any {
  const cached = specCache.get(version);
  if (cached) {
    return cached;
  }
  const parsed = parseYaml(specRaw[version]);
  specCache.set(version, parsed);
  return parsed;
}
