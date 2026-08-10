export const prerender = true;
/**
 * AST-based plaintext rendering of the API Reference landing page.
 *
 * Equivalent to `latest.md.ts`, but composes the page from Markdoc nodes:
 * a heading, an intro paragraph, and a bullet list of category links.
 */

import type { APIRoute, GetStaticPaths } from "astro";
import { getCategoryStubsView } from "@lib/api/viewsBuilder";
import { LOCALES, parseLangParam } from "@lib/i18n/locale";
import { apiLandingBody } from "@lib/plaintext/pages/apiPageBodies";

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
