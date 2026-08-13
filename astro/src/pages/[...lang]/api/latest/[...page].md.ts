export const prerender = true;
/** Plaintext twin of `[...page].astro`. The API root has never had one. */

import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, getEntry } from 'astro:content';
import { LOCALES } from '@lib/i18n/locale';
import { API_CONTENT_DIR } from '@lib/api/overviewPages';
import { format, parse } from '@lib/plaintext/helpers';

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection('en', (entry) => entry.id.startsWith(`${API_CONTENT_DIR}/`));
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
  // getStaticPaths only emits valid page slugs, so these are build-time
  // invariants: a failure means the params contract is broken.
  const pageSlug = params.page;
  if (!pageSlug) throw new Error('Missing page param for API plaintext route');

  const entryId = `${API_CONTENT_DIR}/${pageSlug}`;
  const entry = await getEntry('en', entryId);
  if (!entry) throw new Error(`Missing API content entry: ${entryId}`);

  const body = format(parse(entry.body ?? '')).trim() + '\n';

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
