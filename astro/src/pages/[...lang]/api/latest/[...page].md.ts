export const prerender = true;
/** Plaintext twin of `[...page].astro`. The API root has never had one. */

import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, getEntry } from 'astro:content';
import { LOCALES, parseLangParam } from '@lib/i18n/locale';
import { format, parse } from '@lib/plaintext/helpers';
import { API_CONTENT_DIR, isApiSubPage } from '@lib/api/overviewPages';

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection('en', (entry) => isApiSubPage(entry.id));
  const paths: ReturnType<GetStaticPaths> = [];
  for (const lang of LOCALES) {
    for (const entry of entries) {
      paths.push({
        params: {
          lang: lang === 'en' ? undefined : lang,
          page: entry.id.slice(`${API_CONTENT_DIR}/`.length),
        },
      });
    }
  }
  return paths;
};

export const GET: APIRoute = async ({ params }) => {
  const lang = parseLangParam(params.lang);
  if (!lang) {
    return new Response(null, { status: 404 });
  }

  const pageSlug = params.page;
  if (!pageSlug) {
    return new Response(null, { status: 404 });
  }

  const entry = await getEntry('en', `${API_CONTENT_DIR}/${pageSlug}`);
  if (!entry) {
    return new Response(null, { status: 404 });
  }

  const body = format(parse(entry.body ?? '')).trim() + '\n';

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
