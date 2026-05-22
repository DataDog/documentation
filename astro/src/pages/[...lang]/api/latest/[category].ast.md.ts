/**
 * AST-based plaintext rendering of each category summary page.
 *
 * Equivalent to `[category].md.ts`, but builds the page as Markdoc nodes
 * — heading, optional deprecation alert, description paragraph, and an
 * Actions section with a bullet list of operation links — then runs the
 * result through `format()`.
 */

import type { APIRoute, GetStaticPaths } from 'astro';
import type { Node as MarkdocNode } from '@markdoc/markdoc';
import {
  getCategoryStubsView,
  getCategoryViewBySlug,
} from '@lib/api/viewsBuilder';
import { LOCALES, parseLangParam, localizedHref } from '@lib/i18n/locale';
import {
  Ast,
  documentNode,
  format,
  headingNode,
  inlineNode,
  nodesFromMd,
  tagNode,
  textNode,
} from '@lib/ast/helpers';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: ReturnType<GetStaticPaths> = [];
  for (const lang of LOCALES) {
    for (const cat of await getCategoryStubsView(lang)) {
      paths.push({
        params: {
          lang: lang === 'en' ? undefined : lang,
          category: cat.slug,
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

  const slug = params.category;
  if (!slug) {
    return new Response(null, { status: 404 });
  }

  const category = await getCategoryViewBySlug(slug, lang);
  if (!category) {
    return new Response(null, { status: 404 });
  }

  const categoryBaseHref = localizedHref(lang, `/api/latest/${slug}/`);

  const nodes: MarkdocNode[] = [headingNode(1, category.name)];

  if (category.deprecated) {
    nodes.push(
      tagNode('alert', { level: 'warning' }, nodesFromMd('This endpoint is deprecated.')),
    );
  }

  if (category.description) {
    nodes.push(...nodesFromMd(category.description.trim()));
  }

  if (category.operations.length > 0) {
    nodes.push(headingNode(2, 'Actions'));
    nodes.push(operationsList(category.operations, categoryBaseHref));
  }

  const body = format(documentNode(nodes)).trim() + '\n';

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};

function operationsList(
  operations: { summary: string; slug: string }[],
  baseHref: string,
): MarkdocNode {
  const items = operations.map((op) => {
    const link = new Ast.Node(
      'link',
      { href: `${baseHref}${op.slug}/` },
      [textNode(op.summary)],
    );
    return new Ast.Node('item', {}, [inlineNode([link])]);
  });
  return new Ast.Node('list', { ordered: false }, items);
}
