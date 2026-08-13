import { getCollection } from 'astro:content';

/**
 * A hand-written API overview page (e.g. "Using the API", "Rate Limits"),
 * as listed in the API sidenav's Overview section.
 */
export interface OverviewPage {
  title: string;
  slug: string;
}

// Astro's glob loader strips a trailing `/index`, so `api/latest/index.mdoc`
// is stored with id `api/latest` (the API root) and its sub pages are the
// descendants under `api/latest/`.
export const API_CONTENT_DIR = 'api/latest';

/**
 * Whether a content-collection entry id belongs to the hand-written API
 * section: the root (`api/latest`) or anything beneath `api/latest/`. The
 * explicit root check avoids the trap where a bare `startsWith('api/latest')`
 * would also match unrelated ids like `api/latest-guide`.
 */
export function isApiContentId(id: string): boolean {
  return id === API_CONTENT_DIR || id.startsWith(`${API_CONTENT_DIR}/`);
}

/**
 * The hand-written overview sub pages, sorted by title. The API root
 * (`api/latest`) is excluded — it's the Overview section's landing page, not
 * a sub page. English-only for now; the collection has no localized entries.
 */
export async function getOverviewPagesView(): Promise<OverviewPage[]> {
  const entries = await getCollection('en', (entry) =>
    entry.id.startsWith(`${API_CONTENT_DIR}/`),
  );
  return entries
    .map((entry) => ({
      title: entry.data.title,
      slug: entry.id.slice(`${API_CONTENT_DIR}/`.length),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}
