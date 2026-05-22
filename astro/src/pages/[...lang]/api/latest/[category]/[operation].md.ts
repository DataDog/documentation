// Renders each endpoint page in plaintext.
import type { APIRoute, GetStaticPaths } from "astro";
import { getCategoriesView, getOperationView } from "@lib/api/viewsBuilder";
import { renderApiEndpointMd } from "@components/ApiEndpoint/plaintext/ApiEndpoint";
import { LOCALES, parseLangParam } from "@lib/i18n/locale";

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
  if (!lang) return new Response(null, { status: 404 });

  const catSlug = params.category;
  const opSlug = params.operation;
  if (!catSlug || !opSlug) return new Response(null, { status: 404 });

  const operation = await getOperationView(catSlug, opSlug, lang);
  if (!operation) return new Response(null, { status: 404 });

  // Variants are ordered newest-first. The first variant is "(latest)".
  const blocks: string[] = [`# ${operation.summary}`];
  for (const [i, variant] of operation.variants.entries()) {
    const label = i === 0 ? `${variant.version} (latest)` : variant.version;
    blocks.push(`## ${label}`);
    blocks.push(renderApiEndpointMd(variant));
  }
  const body = blocks.join("\n\n") + "\n";

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
