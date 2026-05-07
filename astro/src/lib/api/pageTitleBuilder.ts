/**
 * Per-locale page titles for the API docs static pages.
 *
 * Mirrors what Hugo's breadcrumb partial does ([layouts/partials/breadcrumbs.html](../../../../layouts/partials/breadcrumbs.html)):
 * deeper crumbs use the page's front-matter `title:` from
 * `content/{lang}/api/latest/{slug}/_index.md`. We read those same files
 * directly so the breadcrumb labels track translator updates without any
 * Astro-side translation source of our own.
 *
 * English (`DEFAULT_LOCALE`) acts as the silent fallback when a non-English
 * `_index.md` is missing or has no `title:`.
 */

import { parse as parseYaml } from 'yaml';
import { DEFAULT_LOCALE, isLocale, type Locale } from '@lib/i18n/locale';

const rawModules: Record<string, string> = import.meta.glob<string>(
  '@hugo-site/content/*/api/latest/**/_index.md',
  { query: '?raw', import: 'default', eager: true },
);

const PATH_RE = /\/content\/([a-z]{2})\/api\/latest\/(.*?)_index\.md$/;
const FRONTMATTER_RE = /^---\s*\n([\s\S]*?)\n---/;

// lang -> slug ('' for the API root) -> title
const titles: Map<Locale, Map<string, string>> = new Map();

for (const [path, raw] of Object.entries(rawModules)) {
  const m = PATH_RE.exec(path);
  if (!m) {
    continue;
  }
  if (!isLocale(m[1])) {
    continue;
  }
  const lang: Locale = m[1];
  const slug = m[2].replace(/\/$/, '');
  const fm = FRONTMATTER_RE.exec(raw);
  if (!fm) {
    continue;
  }
  let parsed: { title?: unknown };
  try {
    parsed = parseYaml(fm[1]);
  } catch {
    continue;
  }
  if (typeof parsed?.title !== 'string') {
    continue;
  }
  if (!titles.has(lang)) {
    titles.set(lang, new Map());
  }
  titles.get(lang)!.set(slug, parsed.title);
}

/**
 * Look up the front-matter `title:` for the API page at `slug` (e.g.
 * `'rate-limits'`, `'scopes'`, or `''` for the API root).
 *
 * Falls back to the English title if the locale is missing the entry.
 * Returns `undefined` only if even English is missing — callers should
 * supply a hardcoded English string in that case.
 */
export function getApiPageTitle(slug: string, lang: Locale = DEFAULT_LOCALE): string | undefined {
  return titles.get(lang)?.get(slug) ?? titles.get(DEFAULT_LOCALE)?.get(slug);
}
