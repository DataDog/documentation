export const prerender = true;
import type { APIRoute } from 'astro';
import { pageSources } from '@lib/pagesListing/pageSources';
import { collectPages } from '@lib/pagesListing/collectPages';
import { renderLlmsTxt } from '@lib/pagesListing/llmsTxtRenderer';

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error('astro.config.mjs `site` must be set for llms.txt to render canonical URLs.');
  }
  const pages = await collectPages(pageSources);
  const body = renderLlmsTxt(pages, site.origin);
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
