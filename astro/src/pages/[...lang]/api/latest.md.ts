export const prerender = true;
/**
 * Plaintext rendering of the API Reference landing page.
 *
 * Composes the page from Markdoc nodes — a heading, an intro paragraph, and a
 * bullet list of category links — then emits markdown via `buildMarkdocStr`.
 * Mirrors the HTML landing page in `latest/index.astro`.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import type { APIRoute, GetStaticPaths } from "astro";
import type { ApiCategoryStub } from "@lib/api/schemas/views";
import { getCategoryStubsView } from "@lib/api/viewsBuilder";
import type { Locale } from "@lib/i18n/locale";
import { LOCALES, localizedHref, parseLangParam } from "@lib/i18n/locale";
import {
  buildMarkdocStr,
  heading,
  inline,
  link,
  list,
  listItem,
  paragraphFromText,
} from "@lib/plaintext/helpers";

function apiLandingBody(categories: ApiCategoryStub[], lang: Locale): string {
  const items = categories.map((cat) => {
    const href = localizedHref(lang, `/api/latest/${cat.slug}/`);
    return listItem([inline([link(href, cat.name)])]);
  });

  const contents: MarkdocNode[] = [
    heading(1, "API Reference"),
    paragraphFromText(
      "Welcome to the Datadog API Reference. Select a category to get started.",
    ),
    list("unordered", items),
  ];

  return buildMarkdocStr(contents);
}

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
  const body = apiLandingBody(categories, lang);

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
