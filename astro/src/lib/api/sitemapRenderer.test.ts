import { describe, it, expect } from 'vitest';
import { buildSitemapEntries, renderSitemapIndex, renderUrlset } from './sitemapRenderer';
import type { ApiCategoryStub } from './schemas/views';
import type { Locale } from '../i18n/locale';

function stub(name: string, slug: string): ApiCategoryStub {
  return { name, slug, description: '', deprecated: false };
}

function categoriesByLocale(overrides: Partial<Record<Locale, ApiCategoryStub[]>>): Record<Locale, ApiCategoryStub[]> {
  return { en: [], fr: [], ja: [], ko: [], es: [], ...overrides };
}

const SITE = 'https://docs.datadoghq.com';
const LASTMOD = '2026-07-24T10:30:00.000Z';

describe('buildSitemapEntries', () => {
  it('emits the static API pages plus one entry per category, for the default locale', () => {
    const entries = buildSitemapEntries(categoriesByLocale({ en: [stub('Metrics', 'metrics')] }), SITE);
    const enEntries = entries.filter((e) => !/\/(fr|ja|ko|es)\//.test(e.loc));
    expect(enEntries.map((e) => e.loc)).toEqual([
      'https://docs.datadoghq.com/api/latest/',
      'https://docs.datadoghq.com/api/latest/using-the-api/',
      'https://docs.datadoghq.com/api/latest/scopes/',
      'https://docs.datadoghq.com/api/latest/rate-limits/',
      'https://docs.datadoghq.com/api/latest/metrics/',
    ]);
  });

  it('prefixes non-default locales with the locale segment', () => {
    const entries = buildSitemapEntries(
      categoriesByLocale({ fr: [stub('Métriques', 'metriques')] }),
      SITE,
    );
    const frEntries = entries.filter((e) => e.loc.includes('/fr/'));
    expect(frEntries.map((e) => e.loc)).toEqual([
      'https://docs.datadoghq.com/fr/api/latest/',
      'https://docs.datadoghq.com/fr/api/latest/using-the-api/',
      'https://docs.datadoghq.com/fr/api/latest/scopes/',
      'https://docs.datadoghq.com/fr/api/latest/rate-limits/',
      'https://docs.datadoghq.com/fr/api/latest/metriques/',
    ]);
  });

  it('throws when siteUrl is empty', () => {
    expect(() => buildSitemapEntries(categoriesByLocale({}), '')).toThrow(/siteUrl/);
  });
});

describe('renderSitemapIndex', () => {
  it('emits a sitemapindex pointing at sitemap-0.xml with the given lastmod', () => {
    const out = renderSitemapIndex(SITE, LASTMOD);
    expect(out).toBe(
      [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        '  <sitemap>',
        '    <loc>https://docs.datadoghq.com/api/sitemap-0.xml</loc>',
        `    <lastmod>${LASTMOD}</lastmod>`,
        '  </sitemap>',
        '</sitemapindex>',
      ].join('\n'),
    );
  });
});

describe('renderUrlset', () => {
  it('emits one url block per entry, sharing the given lastmod', () => {
    const out = renderUrlset(
      [{ loc: 'https://docs.datadoghq.com/api/latest/metrics/' }, { loc: 'https://docs.datadoghq.com/api/latest/logs/' }],
      LASTMOD,
    );
    expect(out).toBe(
      [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        '  <url>',
        '    <loc>https://docs.datadoghq.com/api/latest/metrics/</loc>',
        `    <lastmod>${LASTMOD}</lastmod>`,
        '  </url>',
        '  <url>',
        '    <loc>https://docs.datadoghq.com/api/latest/logs/</loc>',
        `    <lastmod>${LASTMOD}</lastmod>`,
        '  </url>',
        '</urlset>',
      ].join('\n'),
    );
  });

  it('emits an empty urlset when given no entries', () => {
    const out = renderUrlset([], LASTMOD);
    expect(out).toBe(
      [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        '',
        '</urlset>',
      ].join('\n'),
    );
  });
});
