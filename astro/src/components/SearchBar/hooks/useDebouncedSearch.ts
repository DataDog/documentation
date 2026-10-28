import { useEffect, useState } from "preact/hooks";
import type { MultiSearchResponse } from "@lib/search/typesense";
import type { TypesenseEnv } from "@config/typesense";

export type SearchFn = (
  query: string,
  env: TypesenseEnv,
  signal?: AbortSignal,
) => Promise<MultiSearchResponse>;

const EMPTY_RESPONSE: MultiSearchResponse = {
  docs: { found: 0, hits: [] },
  partners: { found: 0, hits: [] },
};

export function useDebouncedSearch(
  query: string,
  env: TypesenseEnv,
  searchFn: SearchFn,
  delayMs: number,
): MultiSearchResponse | null {
  const [hits, setHits] = useState<MultiSearchResponse | null>(null);

  useEffect(() => {
    if (!query) {
      setHits(null);
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      searchFn(query, env, controller.signal)
        .then((response) => {
          if (!controller.signal.aborted) {
            setHits(response);
          }
        })
        .catch((err) => {
          if (err?.name !== "AbortError") {
            setHits(EMPTY_RESPONSE);
          }
        });
    }, delayMs);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [query, env, searchFn, delayMs]);

  return hits;
}
