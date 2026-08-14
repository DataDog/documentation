export const prerender = true;
/**
 * Plaintext rendering of each endpoint page.
 *
 * Builds the page as Markdoc nodes — `# Summary`, then a `## v{N} (latest?)`
 * section per variant — and emits markdown via `buildMarkdocStr`. Structure
 * (tables, tabs, alerts, fences) is described as nodes rather than concatenated
 * strings. Mirrors the HTML endpoint page in `[operation].astro`.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import type { APIRoute, GetStaticPaths } from "astro";
import type { ApiOperationView } from "@lib/api/schemas/views";
import { getCategoriesView, getOperationView } from "@lib/api/viewsBuilder";
import { LOCALES, parseLangParam } from "@lib/i18n/locale";
import { apiEndpointNodes } from "@components/ApiEndpoint/plaintext/ApiEndpoint";
import { buildMarkdocStr, heading } from "@lib/plaintext/helpers";

function apiOperationBody(operation: ApiOperationView): string {
  const contents: MarkdocNode[] = [heading(1, operation.summary)];
  for (const [i, variant] of operation.variants.entries()) {
    const label = i === 0 ? `${variant.version} (latest)` : variant.version;
    contents.push(heading(2, label));
    contents.push(...apiEndpointNodes(variant));
  }
  return buildMarkdocStr(contents);
}

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
