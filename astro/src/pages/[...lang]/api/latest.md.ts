import type { APIRoute, GetStaticPaths } from "astro";
import { getCategoryStubsView } from "@lib/api/viewsBuilder";
import { LOCALES, parseLangParam, localizedHref } from "@lib/i18n/locale";

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

  const lines: string[] = [
    "# API Reference",
    "",
    "Welcome to the Datadog API Reference. Select a category to get started.",
    "",
  ];
  for (const cat of categories) {
    lines.push(`- [${cat.name}](${localizedHref(lang, `/api/latest/${cat.slug}/`)})`);
  }
  const body = lines.join("\n") + "\n";

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
