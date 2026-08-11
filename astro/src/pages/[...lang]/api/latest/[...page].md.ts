export const prerender = true;
/**
 * AST-based plaintext rendering of the hand-written API pages.
 *
 * Equivalent to `[...page].astro`. Reads the same content-collection entry's
 * raw Markdoc body and round-trips it through parse/format, mirroring how the
 * spec-driven `[category].md.ts` twin works. The API root has no plaintext
 * twin (it never did), so `index` is excluded here.
 */

import type { APIRoute, GetStaticPaths } from 'astro';
import { getEntry } from 'astro:content';
import { LOCALES, parseLangParam } from '@lib/i18n/locale';
import { format, parse } from '@lib/plaintext/helpers';
import { HAND_WRITTEN_PLAINTEXT_PAGE_SLUGS, handWrittenPageEntryId } from '@lib/api/handWrittenPages';

export const getStaticPaths: GetStaticPaths = () => {
  const paths: ReturnType<GetStaticPaths> = [];
  for (const lang of LOCALES) {
    for (const pageSlug of HAND_WRITTEN_PLAINTEXT_PAGE_SLUGS) {
      paths.push({
        params: { lang: lang === 'en' ? undefined : lang, page: pageSlug },
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

  const entry = await getEntry('en', handWrittenPageEntryId(pageSlug));
  if (!entry) {
    return new Response(null, { status: 404 });
  }

  const body = format(parse(entry.body ?? '')).trim() + '\n';

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
