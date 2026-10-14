export const prerender = true;
/**
 * Plaintext rendering of the API Reference landing page.
 *
 * Mirrors the HTML landing page (`latest/[...page].astro` for the root entry):
 * the title, then the hand-written `index.mdoc` content (getting started,
 * client libraries). A bullet list of category links follows, because the HTML
 * page lists them in its side nav and agents use this page to find them.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import type { CollectionEntry } from "astro:content";
import type { APIRoute, GetStaticPaths } from "astro";
import { getEntry } from "astro:content";
import type { ApiCategoryStub } from "@lib/api/schemas/views";
import { getCategoryStubsView } from "@lib/api/viewsBuilder";
import { API_CONTENT_DIR } from "@lib/api/overviewPages";
import { apiBreadcrumbs } from "@lib/api/pageMeta";
import type { Locale } from "@lib/i18n/locale";
import { LOCALES, localizedHref, parseLangParam } from "@lib/i18n/locale";
import { siteSupportNoteNodes } from "@lib/plaintext/siteSupportNote";
import { resolveFenceVariables } from "@lib/plaintext/resolveFenceVariables";
import { SDK_VERSIONS } from "@lib/site/sdkVersions";
import {
  buildPlaintextPage,
  heading,
  inline,
  link,
  list,
  listItem,
  parse,
} from "@lib/plaintext/helpers";

function apiLandingBody(
  rootEntry: CollectionEntry<"en">,
  categories: ApiCategoryStub[],
  lang: Locale,
  pathname: string,
): MarkdocNode[] {
  return [
    heading(1, rootEntry.data.title),
    ...siteSupportNoteNodes(pathname, lang, rootEntry.data.site_support_id),
    ...overviewContentNodes(rootEntry),
    // TODO: localize once Hugo's i18n bundle has a key for this heading.
    heading(2, "API categories"),
    categoryList(categories, lang),
  ];
}

function overviewContentNodes(rootEntry: CollectionEntry<"en">): MarkdocNode[] {
  const nodes = parse(rootEntry.body ?? "").children;
  resolveFenceVariables(nodes, { sdkVersions: SDK_VERSIONS });
  return nodes;
}

function categoryList(
  categories: ApiCategoryStub[],
  lang: Locale,
): MarkdocNode {
  const items = categories.map((category) => {
    const href = localizedHref(lang, `/api/latest/${category.slug}/`);
    return listItem([inline([link(href, category.name)])]);
  });
  return list("unordered", items);
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
    apiLandingBody(rootEntry, categories, lang, url.pathname),
    {
      title: rootEntry.data.title,
      description: rootEntry.data.description ?? "",
      breadcrumbs: apiBreadcrumbs(lang),
    },
    site,
  );

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
