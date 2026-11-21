import type { SearchResponseHit } from "typesense/lib/Typesense/Documents";
import type { TypesenseEnv } from "@config/typesense";

interface DocSchema {
  title?: string;
  section_header?: string;
  content?: string;
  type?: string;
  relpermalink: string;
  language?: string;
  category?: string;
  subcategory?: string;
}

export type TypesenseHit = SearchResponseHit<DocSchema>;

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
 * Flatten one hit per group.
 */
export function flattenSearchResult(raw: any): TypesenseSearchResult {
  if (!raw) return { found: 0, hits: [] };
  if (Array.isArray(raw.hits) && raw.hits.length > 0) {
    return { found: raw.found ?? raw.hits.length, hits: raw.hits };
  }
  if (Array.isArray(raw.grouped_hits)) {
    const hits: TypesenseHit[] = raw.grouped_hits
      .map((g: any) =>
        Array.isArray(g.hits) && g.hits.length > 0 ? g.hits[0] : null,
      )
      .filter(Boolean);
    return { found: raw.found ?? hits.length, hits };
  }
  return { found: raw.found ?? 0, hits: [] };
}

const HITS_PER_PAGE = 5;

/**
 * Failover policy, matching the `typesense` client defaults that Hugo's
 * instantsearch adapter runs with: a node gets 5 seconds to respond, and a node
 * that failed is skipped for a minute before it is tried again.
 */
const NODE_TIMEOUT_MS = 5_000;
const UNHEALTHY_NODE_COOLDOWN_MS = 60_000;

/** Raised for a response that another node would also return, such as a 4xx. */
class NonRetryableSearchError extends Error {}

/**
 * A Typesense Cloud cluster serves from a load-balanced primary host, with
 * each underlying node reachable at a numbered host. Hugo lists the same four.
 */
function nodeHostsFor(clusterHost: string): string[] {
  return [
    `${clusterHost}.a1.typesense.net`,
    `${clusterHost}-1.a1.typesense.net`,
    `${clusterHost}-2.a1.typesense.net`,
    `${clusterHost}-3.a1.typesense.net`,
  ];
}

/**
 * Returns a `multiSearch` with its own record of which nodes failed recently.
 * The app shares one (`multiSearch`, below), so a node that is down costs one
 * timeout per minute rather than one per keystroke. Tests create a fresh one
 * per case.
 */
export function createMultiSearch() {
  const failedAtByHost = new Map<string, number>();

  /** Healthy nodes in order, or every node if none is healthy. */
  function nodesToTry(env: TypesenseEnv): string[] {
    const allHosts = nodeHostsFor(env.host);
    const healthyHosts = allHosts.filter((host) => {
      const failedAt = failedAtByHost.get(host);
      return (
        failedAt === undefined ||
        Date.now() - failedAt >= UNHEALTHY_NODE_COOLDOWN_MS
      );
    });
    return healthyHosts.length > 0 ? healthyHosts : allHosts;
  }

  return async function multiSearch(
    query: string,
    env: TypesenseEnv,
    signal?: AbortSignal,
  ): Promise<MultiSearchResponse> {
    const body = JSON.stringify(buildMultiSearchBody(query, env));
    let lastError: unknown;

    for (const host of nodesToTry(env)) {
      try {
        const json = await postToNode(host, env.publicKey, body, signal);
        failedAtByHost.delete(host);
        return {
          docs: flattenSearchResult(json.results[0]),
          partners: flattenSearchResult(json.results[1]),
        };
      } catch (error) {
        if (signal?.aborted || error instanceof NonRetryableSearchError) {
          throw error;
        }
        failedAtByHost.set(host, Date.now());
        lastError = error;
      }
    }

    throw lastError;
  };
}

export const multiSearch = createMultiSearch();

/**
 * One request to one node. Rejects on a network error, a 5xx, or no response
 * within `NODE_TIMEOUT_MS`, all of which the next node might not repeat.
 */
async function postToNode(
  host: string,
  publicKey: string,
  body: string,
  callerSignal?: AbortSignal,
): Promise<{ results: any[] }> {
  const controller = new AbortController();
  const abortFromCaller = () => controller.abort(callerSignal?.reason);
  callerSignal?.addEventListener("abort", abortFromCaller);
  const timer = setTimeout(() => controller.abort(), NODE_TIMEOUT_MS);

  try {
    const url = `https://${host}/multi_search?x-typesense-api-key=${encodeURIComponent(publicKey)}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      signal: controller.signal,
    });
    if (!res.ok) {
      const message = `Typesense multi_search failed: ${res.status}`;
      throw res.status >= 500
        ? new Error(message)
        : new NonRetryableSearchError(message);
    }
    return (await res.json()) as { results: any[] };
  } finally {
    clearTimeout(timer);
    callerSignal?.removeEventListener("abort", abortFromCaller);
  }
}

function buildMultiSearchBody(query: string, env: TypesenseEnv) {
  return {
    searches: [
      {
        collection: env.docsIndex,
        preset: "docs_alias_api_view",
        q: query,
        filter_by: "language:=en",
        per_page: HITS_PER_PAGE,
      },
      {
        collection: env.partnersIndex,
        preset: "docs_partners_view",
        q: query,
        // Without this, the partners index returns the same page in every
        // language (es, ja, ko, fr, en) for any English query. Hugo dedupes
        // these via `configure({distinct: 1})`, but the preset doesn't apply
        // it server-side; matching the docs index's language filter is simpler.
        filter_by: "language:=en",
        per_page: HITS_PER_PAGE,
      },
    ],
  };
}
