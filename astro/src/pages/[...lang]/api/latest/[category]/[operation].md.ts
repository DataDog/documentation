export const prerender = true;
/**
 * AST-based plaintext rendering of each endpoint page.
 *
 * Equivalent to `[operation].md.ts`, but builds a Markdoc AST and runs it
 * through `format()` rather than concatenating strings. The output is the
 * same shape — `# Summary` then per-variant `## v{N} (latest?)` sections —
 * but structure (tables, tabs, alerts, fences) is described as nodes.
 */

import type { APIRoute, GetStaticPaths } from "astro";
import { getCategoriesView, getOperationView } from "@lib/api/viewsBuilder";
import { LOCALES, parseLangParam } from "@lib/i18n/locale";
import { apiOperationBody } from "@lib/plaintext/pages/apiPageBodies";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: ReturnType<GetStaticPaths> = [];
  for (const lang of LOCALES) {
    for (const cat of await getCategoriesView(lang)) {
      for (const op of cat.operations) {
        paths.push({
          params: {
            lang: lang === "en" ? undefined : lang,
            category: cat.slug,
            operation: op.slug,
          },
        });
      }
    }
  }
  return paths;
};

export const GET: APIRoute = async ({ params }) => {
  const lang = parseLangParam(params.lang);
  if (!lang) {
    return new Response(null, { status: 404 });
  }

  const catSlug = params.category;
  const opSlug = params.operation;
  if (!catSlug || !opSlug) {
    return new Response(null, { status: 404 });
  }

  const operation = await getOperationView(catSlug, opSlug, lang);
  if (!operation) {
    return new Response(null, { status: 404 });
  }

  const body = apiOperationBody(operation);

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
