/**
 * Per-request cdoc render resolution, shared by the catch-all cdoc route and
 * its plaintext twin.
 *
 * Given a doc's `content_filters` and the request URL's query, it resolves each
 * filter's active value with the precedence URL param > option-group default
 * (via `resolvePageFilters`). Nothing else about the request is read, so the
 * same URL always renders the same content. The reader's stored preferences
 * are applied in the browser instead, by adding them to the URL.
 *
 * Kept free of `astro:content` and Astro globals so it stays unit-testable; the
 * route supplies `searchParams` and handles the entry lookup and rendering.
 */
import { resolvePageFilters, type CdocContentFilter } from "./filters";
import type { ResolvedFilter } from "./types";

export interface ResolveCdocRenderInput {
  /** The doc's `content_filters` frontmatter. */
  contentFilters: CdocContentFilter[];
  /** The request URL's query string. */
  searchParams: URLSearchParams;
}

export interface ResolveCdocRenderResult {
  /** UI-ready filters (only those shown), in frontmatter order. */
  resolvedFilters: ResolvedFilter[];
  /** Active value per trait id — passed to Markdoc as variables. */
  valsByTraitId: Record<string, string>;
}

export function resolveCdocRender(
  input: ResolveCdocRenderInput,
): ResolveCdocRenderResult {
  const { contentFilters, searchParams } = input;

  // Collect the filter values expressed in the URL query string.
  const urlVals: Record<string, string> = {};
  for (const filter of contentFilters) {
    const value = searchParams.get(filter.trait_id);
    if (value) urlVals[filter.trait_id] = value;
  }

  return resolvePageFilters({ contentFilters, urlVals });
}
