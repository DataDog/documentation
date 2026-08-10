export const prerender = true;
import type { APIRoute } from 'astro';
import { pageSources } from '@lib/pagesListing/pageSources';
import { buildLlmsTree } from '@lib/pagesListing/llmsTree';

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error('astro.config.mjs `site` must be set for llms.txt to render canonical URLs.');
  }
  const { index } = await buildLlmsTree(pageSources, site.origin);
  return new Response(index, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
