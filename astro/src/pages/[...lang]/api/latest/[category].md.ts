import type { APIRoute, GetStaticPaths } from "astro";
import { getCategoryStubsView, getCategoryViewBySlug } from "@lib/api/viewsBuilder";
import { LOCALES, parseLangParam, localizedHref } from "@lib/i18n/locale";

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

  const categoryBaseHref = localizedHref(lang, `/api/latest/${slug}/`);
  const lines: string[] = [`# ${category.name}`, ""];

  if (category.deprecated) {
    lines.push("> **Warning:** This endpoint is deprecated.", "");
  }

  if (category.description) {
    lines.push(category.description.trim(), "");
  }

  if (category.operations.length > 0) {
    lines.push("## Actions", "");
    for (const op of category.operations) {
      lines.push(`- [${op.summary}](${categoryBaseHref}${op.slug}/)`);
    }
  }

  const body = lines.join("\n") + "\n";

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
