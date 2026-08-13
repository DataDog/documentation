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
