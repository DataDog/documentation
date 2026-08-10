export const prerender = true;
/**
 * AST-based plaintext rendering of each category summary page.
 *
 * Builds the page as Markdoc nodes — heading, optional deprecation alert,
 * description paragraph, and one summary block per endpoint (heading linking
 * to the endpoint page, plus its method + URL) — then runs the result through
 * `format()`. Mirrors the HTML category page in `[category].astro`.
 */

import type { APIRoute, GetStaticPaths } from "astro";
import {
  getCategoryStubsView,
  getCategoryViewBySlug,
} from "@lib/api/viewsBuilder";
import { LOCALES, parseLangParam } from "@lib/i18n/locale";
import { apiCategoryBody } from "@lib/plaintext/pages/apiPageBodies";

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
