export const prerender = true;
import type { APIRoute } from 'astro';
import { renderSitemapIndex } from '@lib/api/sitemapRenderer';

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error('astro.config.mjs `site` must be set for the sitemap to render canonical URLs.');
  }
  const lastmod = new Date().toISOString();
  const body = renderSitemapIndex(site.origin, lastmod);
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
