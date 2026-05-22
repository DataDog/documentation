/**
 * AST-based plaintext rendering of the API Reference landing page.
 *
 * Equivalent to `latest.md.ts`, but composes the page from Markdoc nodes:
 * a heading, an intro paragraph, and a bullet list of category links.
 */

import type { APIRoute, GetStaticPaths } from 'astro';
import type { Node as MarkdocNode } from '@markdoc/markdoc';
import { getCategoryStubsView } from '@lib/api/viewsBuilder';
import { LOCALES, parseLangParam, localizedHref } from '@lib/i18n/locale';
import {
  Ast,
  documentNode,
  format,
  headingNode,
  inlineNode,
  paragraphFromText,
  textNode,
} from '@lib/ast/helpers';

export const getStaticPaths: GetStaticPaths = () => {
  return LOCALES.map((lang) => ({
    params: { lang: lang === 'en' ? undefined : lang },
  }));
};

export const GET: APIRoute = async ({ params }) => {
  const lang = parseLangParam(params.lang);
  if (!lang) {
    return new Response(null, { status: 404 });
  }

  const categories = await getCategoryStubsView(lang);

  const items = categories.map((cat) => {
    const href = localizedHref(lang, `/api/latest/${cat.slug}/`);
    const link = new Ast.Node('link', { href }, [textNode(cat.name)]);
    return new Ast.Node('item', {}, [inlineNode([link])]);
  });
  const list = new Ast.Node('list', { ordered: false }, items);

  const nodes: MarkdocNode[] = [
    headingNode(1, 'API Reference'),
    paragraphFromText(
      'Welcome to the Datadog API Reference. Select a category to get started.',
    ),
    list,
  ];

  const body = format(documentNode(nodes)).trim() + '\n';

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
