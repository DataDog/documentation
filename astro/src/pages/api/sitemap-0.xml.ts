export const prerender = true;
import type { APIRoute } from 'astro';
import { LOCALES, type Locale } from '@lib/i18n/locale';
import { getCategoryStubsView } from '@lib/api/viewsBuilder';
import type { ApiCategoryStub } from '@lib/api/schemas/views';
import { buildSitemapEntries, renderUrlset } from '@lib/api/sitemapRenderer';

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error('astro.config.mjs `site` must be set for the sitemap to render canonical URLs.');
  }
  const stubsByLocale = await Promise.all(
    LOCALES.map(async (lang) => [lang, await getCategoryStubsView(lang)] as const),
  );
  const categoriesByLocale = Object.fromEntries(stubsByLocale) as Record<Locale, ApiCategoryStub[]>;
  const entries = buildSitemapEntries(categoriesByLocale, site.origin);
  const lastmod = new Date().toISOString();
  const body = renderUrlset(entries, lastmod);
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
