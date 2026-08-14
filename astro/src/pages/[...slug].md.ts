// Catch-all `.md` endpoint: the plaintext twin of the `[...slug].astro` route.
// Serves a plaintext version of every `content/en` page. Cdocs (pages with
// `content_filters`) resolve their filters — URL param > cookie > default, via
// the shared `resolveCdocRender` — and render through the cdocs plaintext
// pipeline; every other page renders through the component plaintext twins.
// Either way the frontmatter title is prepended as an H1, mirroring the HTML
// page. A path with no matching entry 404s.
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
import { renderMdocWithTwins } from '@lib/plaintext/twinTransform';

const resolvePartial = makeBundledPartialResolver();

export const GET: APIRoute = async ({ params, url, cookies }) => {
  // `[...slug]` yields the path without the `.md` extension, which is exactly an
  // `en` entry id.
  const slug = params.slug ?? '';

  // dd_e2e/* are test pages; hidden in the live build like the HTML route.
  if (slug.startsWith('dd_e2e/') && __CI_ENV__ === 'live') {
    return new Response(null, { status: 404 });
  }

  const entry = await getEntry('en', slug);
  if (!entry) {
    return new Response(null, { status: 404 });
  }

  // The glob content loader exposes the raw `.mdoc` body (frontmatter stripped),
  // so no disk read — or path-traversal guard — is needed: `getEntry` already
  // scoped the lookup to the collection, and this works in the bundled server.
  const body = entry.body ?? '';
  const { title, content_filters: contentFilters } = entry.data;

  let text: string;
  if (contentFilters) {
    // Cdoc: resolve filters and render through the cdocs plaintext pipeline,
    // which prepends the title itself.
    const { valsByTraitId } = resolveCdocRender({
      contentFilters,
      searchParams: url.searchParams,
      cookieRaw: cookies.get(COOKIE_NAME)?.value,
      now: Date.now(),
    });
    text = renderCdocPlaintext({
      body,
      variables: valsByTraitId,
      title,
      resolvePartial,
    });
  } else {
    // Non-cdoc: render component plaintext twins and prepend the title as an H1
    // to mirror the HTML page.
    text = `# ${title}\n\n${renderMdocWithTwins(body)}`;
  }

  return new Response(text, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
