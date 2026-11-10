export const prerender = true;
/**
 * Every API category's operation links, for the mobile nav to render on the
 * client when a non-active category is expanded. See `mobileNavData.ts`.
 * Excluded from the sitemap.
 */

import type { APIRoute, GetStaticPaths } from "astro";
import { getCategoriesView } from "@lib/api/viewsBuilder";
import { buildMobileNavData } from "@lib/api/mobileNavData";
import { LOCALES, parseLangParam } from "@lib/i18n/locale";

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

  const data = buildMobileNavData(await getCategoriesView(lang), lang);
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
