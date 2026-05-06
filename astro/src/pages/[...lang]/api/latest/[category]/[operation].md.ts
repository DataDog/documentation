import type { APIRoute, GetStaticPaths } from 'astro';
import { getCategoriesView, getEndpointView } from '../../../../../data/api/views';
import { renderApiEndpointMd } from '../../../../../components/ApiEndpoint/plaintext/ApiEndpoint.md';
import { LOCALES, parseLangParam } from '../../../../../lib/i18n/locale';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: ReturnType<GetStaticPaths> = [];
  for (const lang of LOCALES) {
    for (const cat of await getCategoriesView(lang)) {
      for (const op of cat.operations) {
        paths.push({
          params: {
            lang: lang === 'en' ? undefined : lang,
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

  const endpoint = await getEndpointView(catSlug, opSlug, lang);
  if (!endpoint) return new Response(null, { status: 404 });

  const body = renderApiEndpointMd(endpoint, { headingLevel: 1 }) + '\n';

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
