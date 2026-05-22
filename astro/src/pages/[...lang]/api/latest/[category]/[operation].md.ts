/**
 * AST-based plaintext rendering of each endpoint page.
 *
 * Equivalent to `[operation].md.ts`, but builds a Markdoc AST and runs it
 * through `format()` rather than concatenating strings. The output is the
 * same shape — `# Summary` then per-variant `## v{N} (latest?)` sections —
 * but structure (tables, tabs, alerts, fences) is described as nodes.
 */

import type { APIRoute, GetStaticPaths } from "astro";
import type { Node as MarkdocNode } from "@markdoc/markdoc";
import { getCategoriesView, getOperationView } from "@lib/api/viewsBuilder";
import { LOCALES, parseLangParam } from "@lib/i18n/locale";
import { buildMarkdocStr, heading } from "@lib/plaintext/helpers";
import { apiEndpointNodes } from "@components/ApiEndpoint/plaintext/ApiEndpoint";

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

  const contents: MarkdocNode[] = [heading(1, operation.summary)];
  for (const [i, variant] of operation.variants.entries()) {
    const label = i === 0 ? `${variant.version} (latest)` : variant.version;
    contents.push(heading(2, label));
    contents.push(...apiEndpointNodes(variant));
  }

  const body = buildMarkdocStr(contents);

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
