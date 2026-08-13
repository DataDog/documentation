/**
 * The hand-written pages under the API root, shared by the desktop side nav and
 * the mobile nav so both trees list the same pages and agree on which one is
 * current.
 */

import { getCollection } from "astro:content";

export interface OverviewPage {
  title: string;
  slug: string;
}

export interface OverviewState {
  isOverviewSection: boolean;
  activeOverviewPageSlug?: string;
}

// Astro's glob loader strips a trailing `/index`, so the API root is the entry
// with id exactly `api/latest` and the hand-written pages are its descendants.
const API_CONTENT_DIR = "api/latest";
const API_ROOT_PATH = `/${API_CONTENT_DIR}/`;

export async function getOverviewPages(): Promise<OverviewPage[]> {
  const entries = await getCollection("en", (entry) =>
    entry.id.startsWith(`${API_CONTENT_DIR}/`),
  );

  return entries
    .map((entry) => ({
      title: entry.data.title,
      slug: entry.id.slice(`${API_CONTENT_DIR}/`.length),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Resolves which overview page a locale-stripped path is on. The API root
 * counts as the section itself, with no sub page active.
 */
export function resolveOverviewState(
  overviewPages: OverviewPage[],
  unprefixedPath: string,
): OverviewState {
  if (!unprefixedPath.startsWith(API_ROOT_PATH)) {
    return { isOverviewSection: false };
  }

  const pathWithinApiRoot = unprefixedPath
    .slice(API_ROOT_PATH.length)
    .replace(/\/$/, "");
  if (pathWithinApiRoot === "") return { isOverviewSection: true };

  const activePage = overviewPages.find(
    (page) => page.slug === pathWithinApiRoot,
  );
  return activePage
    ? { isOverviewSection: true, activeOverviewPageSlug: activePage.slug }
    : { isOverviewSection: false };
}
