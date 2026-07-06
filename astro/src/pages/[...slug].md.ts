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
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { resolveCdocRender } from '@lib/cdocs/resolveCdocRender';
import { COOKIE_NAME } from '@lib/cdocs/cookiePrefs';
import { renderCdocPlaintext } from '@lib/cdocs/plaintext/renderCdocPlaintext';
import { makeDiskPartialResolver } from '@lib/cdocs/plaintext/loadPartial';

// Resolved once at module load. `import.meta.url` is this file under src/pages.
// `path.resolve` drops the trailing slash so the traversal guard below can
// compare against `DOCS_DIR + path.sep` without a doubled separator.
const DOCS_DIR = path.resolve(
  fileURLToPath(new URL('../content/docs/', import.meta.url)),
);
const PARTIALS_DIR = fileURLToPath(
  new URL('../cdocs/partials/en/', import.meta.url),
);
const resolvePartial = makeDiskPartialResolver(PARTIALS_DIR);

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

  // Read the source from disk (parse ignores frontmatter). Guard against a
  // slug that escapes the docs root.
  const docPath = path.resolve(DOCS_DIR, `${slug}.mdoc`);
  if (docPath !== DOCS_DIR && !docPath.startsWith(DOCS_DIR + path.sep)) {
    return new Response(null, { status: 404 });
  }
  const body = readFileSync(docPath, 'utf8');

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
