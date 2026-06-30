import type { APIRoute } from 'astro';
import { getCategoriesView } from '@lib/api/viewsBuilder';
import { renderLlmsTxt } from '@lib/api/llmsTxtRenderer';

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error('astro.config.mjs `site` must be set for llms.txt to render canonical URLs.');
  }
  const body = renderLlmsTxt(await getCategoriesView(), site.origin);
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
