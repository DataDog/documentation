import type { APIRoute } from 'astro';
import { getApiCategories } from '../data/api/index';
import { renderLlmsTxt } from '../data/api/renderLlmsTxt';

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    throw new Error('astro.config.mjs `site` must be set for llms.txt to render canonical URLs.');
  }
  const body = renderLlmsTxt(getApiCategories(), site.origin);
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
