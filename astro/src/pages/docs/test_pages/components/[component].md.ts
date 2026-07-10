/**
 * Plaintext (`.md`) twin of each Markdoc component test page.
 *
 * The authored `.mdoc` body is routed through each component's plaintext twin
 * (see `@lib/plaintext/twinTransform`), so the `.md` is a faithful preview of
 * what the twins emit — the same code path the API pages use, exercised here on
 * the free-form test-page source.
 *
 * Only the Markdoc component pages (`test_pages/components/*.mdoc`) get a twin;
 * the standalone Astro component pages are ignored. Like the pages themselves,
 * these URLs 404 on the live build.
 */

import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderMdocWithTwins } from '@lib/plaintext/twinTransform';

const COMPONENTS_PREFIX = 'test_pages/components/';

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = await getCollection('docs');
  return docs
    .filter((entry) => entry.id.startsWith(COMPONENTS_PREFIX))
    .map((entry) => ({
      params: { component: entry.id.slice(COMPONENTS_PREFIX.length) },
      props: { body: entry.body ?? '' },
    }));
};

export const GET: APIRoute = ({ props }) => {
  if (__CI_ENV__ === 'live') {
    return new Response(null, { status: 404 });
  }

  const { body } = props as { body: string };
  const plaintext = renderMdocWithTwins(body);

  return new Response(plaintext, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
