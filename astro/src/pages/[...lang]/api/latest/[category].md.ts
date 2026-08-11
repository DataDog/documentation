export const prerender = true;
/**
 * Plaintext rendering of each category summary page.
 *
 * Builds the page as Markdoc nodes — heading, optional deprecation alert,
 * description paragraph, and one summary block per endpoint (heading linking
 * to the endpoint page, plus its method + URL) — then emits markdown via
 * `buildMarkdocStr`. Mirrors the HTML category page in `[category].astro`.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import type { APIRoute, GetStaticPaths } from "astro";
import type { ApiCategory, ApiOperationStub } from "@lib/api/schemas/views";
import {
  getCategoryStubsView,
  getCategoryViewBySlug,
} from "@lib/api/viewsBuilder";
import type { Locale } from "@lib/i18n/locale";
import { LOCALES, localizedHref, parseLangParam } from "@lib/i18n/locale";
import { alertNode } from "@components/Alert/plaintext/Alert";
import { apiEndpointSummaryNodes } from "@components/ApiEndpointSummary/plaintext/ApiEndpointSummary";
import { buildMarkdocStr, heading, nodesFromMd } from "@lib/plaintext/helpers";

function apiCategoryBody(category: ApiCategory, lang: Locale): string {
  const categoryBaseHref = localizedHref(lang, `/api/latest/${category.slug}/`);

  const contents: MarkdocNode[] = [heading(1, category.name)];

  if (category.deprecated) {
    contents.push(
      alertNode("warning", nodesFromMd("This endpoint is deprecated.")),
    );
  }

  if (category.description) {
    contents.push(...nodesFromMd(category.description.trim()));
  }

  for (const operation of category.operations) {
    contents.push(...endpointSummaryNodes(operation, categoryBaseHref));
  }

  return buildMarkdocStr(contents);
}

function endpointSummaryNodes(
  operation: ApiOperationStub,
  baseHref: string,
): MarkdocNode[] {
  return apiEndpointSummaryNodes(operation, `${baseHref}${operation.slug}/`);
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: ReturnType<GetStaticPaths> = [];
  for (const lang of LOCALES) {
    for (const cat of await getCategoryStubsView(lang)) {
      paths.push({
        params: {
          lang: lang === "en" ? undefined : lang,
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

  const body = apiCategoryBody(category, lang);

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
