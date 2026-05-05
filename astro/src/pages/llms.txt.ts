import type { APIRoute } from 'astro';
import { getCategoriesView } from '../data/api/views';
import { renderLlmsTxt } from '../data/api/renderLlmsTxt';

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error('astro.config.mjs `site` must be set for llms.txt to render canonical URLs.');
  }
  const body = renderLlmsTxt(await getCategoriesView(), site.origin);
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
