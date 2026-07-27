/**
 * AST-based plaintext rendering of the API Reference landing page.
 *
 * Equivalent to `latest.md.ts`, but composes the page from Markdoc nodes:
 * a heading, an intro paragraph, and a bullet list of category links.
 */

import type { APIRoute, GetStaticPaths } from "astro";
import type { Node as MarkdocNode } from "@markdoc/markdoc";
import { getCategoryStubsView } from "@lib/api/viewsBuilder";
import { LOCALES, parseLangParam, localizedHref } from "@lib/i18n/locale";
import {
  buildMarkdocStr,
  heading,
  inline,
  link,
  list,
  listItem,
  paragraphFromText,
} from "@lib/plaintext/helpers";

export const getStaticPaths: GetStaticPaths = () => {
  return LOCALES.map((lang) => ({
    params: { lang: lang === "en" ? undefined : lang },
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
    return listItem([inline([link(href, cat.name)])]);
  });
  const listNode = list("unordered", items);

  const contents: MarkdocNode[] = [
    heading(1, "API Reference"),
    paragraphFromText(
      "Welcome to the Datadog API Reference. Select a category to get started.",
    ),
    listNode,
  ];

  const body = buildMarkdocStr(contents);

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
