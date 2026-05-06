import type { TypesenseEnv } from '../config/typesense';

export interface TypesenseHit {
  document: {
    title?: string;
    section_header?: string;
    content?: string;
    type?: string;
    relpermalink: string;
    language?: string;
    category?: string;
    subcategory?: string;
  };
  highlights?: Array<{
    field: string;
    snippet?: string;
    value?: string;
  }>;
}

export interface TypesenseSearchResult {
  found: number;
  hits: TypesenseHit[];
}

export interface MultiSearchResponse {
  docs: TypesenseSearchResult;
  partners: TypesenseSearchResult;
}

/**
 * Typesense returns `grouped_hits[]` instead of `hits[]` when the search uses
 * `group_by` (which the `docs_alias_*` presets do for distinct results).
 * Flatten one hit per group — equivalent to Hugo's `distinct: 1`.
 */
export function flattenResult(raw: any): TypesenseSearchResult {
  if (!raw) return { found: 0, hits: [] };
  if (Array.isArray(raw.hits) && raw.hits.length > 0) {
    return { found: raw.found ?? raw.hits.length, hits: raw.hits };
  }
  if (Array.isArray(raw.grouped_hits)) {
    const hits: TypesenseHit[] = raw.grouped_hits
      .map((g: any) => (Array.isArray(g.hits) && g.hits.length > 0 ? g.hits[0] : null))
      .filter(Boolean);
    return { found: raw.found ?? hits.length, hits };
  }
  return { found: raw.found ?? 0, hits: [] };
}

const HITS_PER_PAGE = 5;

export async function multiSearch(
  query: string,
  env: TypesenseEnv,
  signal?: AbortSignal,
): Promise<MultiSearchResponse> {
  const url = `https://${env.host}.a1.typesense.net/multi_search?x-typesense-api-key=${encodeURIComponent(env.publicKey)}`;

  const body = {
    searches: [
      {
        collection: env.docsIndex,
        preset: 'docs_alias_api_view',
        q: query,
        filter_by: 'language:=en',
        per_page: HITS_PER_PAGE,
      },
      {
        collection: env.partnersIndex,
        preset: 'docs_partners_view',
        q: query,
        // Without this, the partners index returns the same page in every
        // language (es, ja, ko, fr, en) for any English query. Hugo dedupes
        // these via `configure({distinct: 1})`, but the preset doesn't apply
        // it server-side; matching the docs index's language filter is simpler.
        filter_by: 'language:=en',
        per_page: HITS_PER_PAGE,
      },
    ],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok) {
    throw new Error(`Typesense multi_search failed: ${res.status}`);
  }

  const json = (await res.json()) as { results: any[] };
  return {
    docs: flattenResult(json.results[0]),
    partners: flattenResult(json.results[1]),
  };
}
