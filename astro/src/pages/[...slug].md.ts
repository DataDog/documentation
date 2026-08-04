// Catch-all `.md` endpoint: the plaintext twin of the `[...slug].astro` cdoc
// route. A URL like `some/cdoc/path.md?prog_lang=python` resolves the same
// filters as the HTML page (URL param > cookie > default, via the shared
// `resolveCdocRender`), renders the `.mdoc` to plaintext Markdoc, and returns
// it as `text/markdown`. Non-cdoc paths 404.
//
// Filters resolve identically to the HTML page even without query params: the
// HTML route sets the `cdocs_prefs` cookie on load, and this same-origin fetch
// carries it.
export const prerender = false;

import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import { resolveCdocRender } from '@lib/cdocs/resolveCdocRender';
import { COOKIE_NAME } from '@lib/cdocs/cookiePrefs';
import { renderCdocPlaintext } from '@lib/cdocs/plaintext/renderCdocPlaintext';
import { makeBundledPartialResolver } from '@lib/cdocs/plaintext/loadPartial';

const resolvePartial = makeBundledPartialResolver();

export const GET: APIRoute = async ({ params, url, cookies }) => {
  // `[...slug]` yields the path without the `.md` extension, which is exactly a
  // `docs` entry id.
  const slug = params.slug ?? '';

  const entry = await getEntry('docs', slug);
  // Only filterable docs (cdocs) render plaintext here; anything else 404s.
  if (!entry?.data.content_filters) {
    return new Response(null, { status: 404 });
  }

  const { valsByTraitId } = resolveCdocRender({
    contentFilters: entry.data.content_filters,
    searchParams: url.searchParams,
    cookieRaw: cookies.get(COOKIE_NAME)?.value,
    now: Date.now(),
  });

  // The glob content loader exposes the raw `.mdoc` body (frontmatter stripped),
  // so no disk read — or path-traversal guard — is needed: `getEntry` already
  // scoped the lookup to the collection, and this works in the bundled server.
  const body = entry.body ?? '';

  const text = renderCdocPlaintext({
    body,
    variables: valsByTraitId,
    title: entry.data.title,
    resolvePartial,
  });

  return new Response(text, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
