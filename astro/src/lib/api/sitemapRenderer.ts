import type { ApiCategoryStub } from './schemas/views';
import { LOCALES, localizedHref, type Locale } from '../i18n/locale';

const STATIC_PAGES = ['', 'using-the-api/', 'scopes/', 'rate-limits/'];

export interface SitemapEntry {
  loc: string;
}

export function buildSitemapEntries(
  categoriesByLocale: Record<Locale, ApiCategoryStub[]>,
  siteUrl: string,
): SitemapEntry[] {
  if (!siteUrl) {
    throw new Error('buildSitemapEntries: siteUrl is required to emit canonical links.');
  }
  const entries: SitemapEntry[] = [];
  for (const lang of LOCALES) {
    for (const page of STATIC_PAGES) {
      entries.push({ loc: `${siteUrl}${localizedHref(lang, `/api/latest/${page}`)}` });
    }
    for (const cat of categoriesByLocale[lang]) {
      entries.push({ loc: `${siteUrl}${localizedHref(lang, `/api/latest/${cat.slug}/`)}` });
    }
  }
  return entries;
}

export function renderSitemapIndex(siteUrl: string, lastmod: string): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <sitemap>',
    `    <loc>${siteUrl}/api/sitemap-0.xml</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    '  </sitemap>',
    '</sitemapindex>',
  ].join('\n');
}

export function renderUrlset(entries: SitemapEntry[], lastmod: string): string {
  const urls = entries
    .map((e) => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
    .join('\n');
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
  ].join('\n');
}
