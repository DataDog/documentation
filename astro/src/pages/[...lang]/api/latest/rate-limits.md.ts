export const prerender = true;
/**
 * AST-based plaintext rendering of the rate-limits page.
 *
 * The static source markdown lives in `apiPageBodies`, where it is parsed into a
 * Markdoc AST and re-emitted via `format()` as `rateLimitsBody`.
 */

import type { APIRoute, GetStaticPaths } from 'astro';
import { LOCALES, parseLangParam } from '@lib/i18n/locale';
import { rateLimitsBody } from '@lib/plaintext/pages/apiPageBodies';

export const getStaticPaths: GetStaticPaths = () => {
  return LOCALES.map((lang) => ({
    params: { lang: lang === 'en' ? undefined : lang },
  }));
};

export const GET: APIRoute = ({ params }) => {
  const lang = parseLangParam(params.lang);
  if (!lang) {
    return new Response(null, { status: 404 });
  }
  return new Response(rateLimitsBody, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
