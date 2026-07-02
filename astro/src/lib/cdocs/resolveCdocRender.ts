/**
 * Per-request cdoc render resolution, shared by the catch-all cdoc route.
 *
 * Given a doc's `content_filters` and the raw request primitives (URL query and
 * the prefs cookie), it resolves each filter's active value with the precedence
 * URL param > cookie > option-group default (via `resolvePageFilters`), and
 * returns both the UI-ready filters and the new cookie value to persist.
 *
 * Kept free of `astro:content` and Astro globals so it stays unit-testable; the
 * route supplies `searchParams`/`cookieRaw`/`now` and handles the actual entry
 * lookup, cookie write, and rendering.
 */
import { resolvePageFilters, type CdocContentFilter } from './filters';
import { readPrefs, writePrefs } from './cookiePrefs';
import type { ResolvedFilter } from './types';

export interface ResolveCdocRenderInput {
  /** The doc's `content_filters` frontmatter. */
  contentFilters: CdocContentFilter[];
  /** The request URL's query string. */
  searchParams: URLSearchParams;
  /** The raw `cdocs_prefs` cookie value, if any. */
  cookieRaw: string | undefined;
  /** Timestamp stamped onto cookie entries written this request. */
  now: number;
}

export interface ResolveCdocRenderResult {
  /** UI-ready filters (only those shown), in frontmatter order. */
  resolvedFilters: ResolvedFilter[];
  /** Active value per trait id — passed to Markdoc as variables. */
  valsByTraitId: Record<string, string>;
  /** New raw cookie value to persist (resolved selections, oldest evicted). */
  cookieValue: string;
}

export function resolveCdocRender(
  input: ResolveCdocRenderInput,
): ResolveCdocRenderResult {
  const { contentFilters, searchParams, cookieRaw, now } = input;

  // Collect the filter values expressed in the URL query string.
  const urlVals: Record<string, string> = {};
  for (const filter of contentFilters) {
    const value = searchParams.get(filter.trait_id);
    if (value) urlVals[filter.trait_id] = value;
  }

  const cookieVals = readPrefs(cookieRaw);

  const { resolvedFilters, valsByTraitId } = resolvePageFilters({
    contentFilters,
    urlVals,
    cookieVals,
  });

  const cookieValue = writePrefs(cookieRaw, valsByTraitId, now);

  return { resolvedFilters, valsByTraitId, cookieValue };
}
