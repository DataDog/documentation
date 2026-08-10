export const prerender = true;
/**
 * AST-based plaintext rendering of the OAuth scopes page.
 *
 * The static source markdown is parsed into a Markdoc AST and re-emitted via
 * `format()`. The body is built by the shared `scopesBody` so the served
 * plaintext and the pages.json hash come from one place.
 */

import type { APIRoute, GetStaticPaths } from 'astro';
import { LOCALES, parseLangParam } from '@lib/i18n/locale';
import { scopesBody } from '@lib/plaintext/pages/apiPageBodies';

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
  return new Response(scopesBody, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
