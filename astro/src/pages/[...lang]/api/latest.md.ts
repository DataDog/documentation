export const prerender = true;
/**
 * Plaintext rendering of the API Reference landing page.
 *
 * Composes the page from Markdoc nodes — a heading, an intro paragraph, and a
 * bullet list of category links — then emits markdown via `buildPlaintextPage`.
 * Mirrors the HTML landing page in `latest/index.astro`.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import type { APIRoute, GetStaticPaths } from "astro";
import { getEntry } from "astro:content";
import type { ApiCategoryStub } from "@lib/api/schemas/views";
import { getCategoryStubsView } from "@lib/api/viewsBuilder";
import { API_CONTENT_DIR } from "@lib/api/overviewPages";
import { apiBreadcrumbs } from "@lib/api/pageMeta";
import type { Locale } from "@lib/i18n/locale";
import { LOCALES, localizedHref, parseLangParam } from "@lib/i18n/locale";
import { siteSupportNoteNodes } from "@lib/plaintext/siteSupportNote";
import { buildPlaintextPage } from "@lib/plaintext/preamble";
import {
  heading,
  inline,
  link,
  list,
  listItem,
  paragraphFromText,
} from "@lib/plaintext/helpers";

function apiLandingBody(
  categories: ApiCategoryStub[],
  lang: Locale,
  pathname: string,
): MarkdocNode[] {
  const items = categories.map((cat) => {
    const href = localizedHref(lang, `/api/latest/${cat.slug}/`);
    return listItem([inline([link(href, cat.name)])]);
  });

  const contents: MarkdocNode[] = [
    heading(1, "API Reference"),
    ...siteSupportNoteNodes(pathname, lang),
    paragraphFromText(
      "Welcome to the Datadog API Reference. Select a category to get started.",
    ),
    list("unordered", items),
  ];

  return contents;
}

export const getStaticPaths: GetStaticPaths = () => {
  return LOCALES.map((lang) => ({
    params: { lang: lang === "en" ? undefined : lang },
  }));
};

export const GET: APIRoute = async ({ params, url, site }) => {
  const lang = parseLangParam(params.lang);
  if (!lang) {
    return new Response(null, { status: 404 });
  }

  const rootEntry = await getEntry("en", API_CONTENT_DIR);
  if (!rootEntry) {
    return new Response(null, { status: 404 });
  }

  const categories = await getCategoryStubsView(lang);
  const body = buildPlaintextPage(
    apiLandingBody(categories, lang, url.pathname),
    {
      title: rootEntry.data.title,
      description: rootEntry.data.description ?? "",
      breadcrumbs: apiBreadcrumbs(lang),
      site,
    },
  );

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
