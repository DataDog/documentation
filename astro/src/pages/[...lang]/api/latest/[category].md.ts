// Renders each category summary page in plaintext.
import type { APIRoute, GetStaticPaths } from "astro";
import {
  getCategoryStubsView,
  getCategoryViewBySlug,
} from "@lib/api/viewsBuilder";
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

  const deprecationInfo = category.deprecated
    ? `> **Warning:** This endpoint is deprecated.\n\n`
    : "";

  const categoryDescription = category.description
    ? `${category.description.trim()}\n\n`
    : "";

  const actionsList =
    category.operations.length > 0
      ? `## Actions\n\n${category.operations
          .map((op) => `- [${op.summary}](${categoryBaseHref}${op.slug}/)`)
          .join("\n")}\n`
      : "";

  const body = `# ${category.name}\n\n${deprecationInfo}${categoryDescription}${actionsList}`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
