import type { APIRoute, GetStaticPaths } from 'astro';
import { getCategoriesView, getCategoryViewBySlug, getEndpointsView } from '../../../../data/api/views';
import { renderCategoryMd } from '../../../../data/api/renderCategoryMd';
import { LOCALES, parseLangParam } from '../../../../lib/i18n/locale';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: ReturnType<GetStaticPaths> = [];
  for (const lang of LOCALES) {
    for (const cat of await getCategoriesView(lang)) {
      paths.push({
        params: {
          lang: lang === 'en' ? undefined : lang,
          category: cat.slug,
        },
      });
    }
  }
  return paths;
};

export const GET: APIRoute = async ({ params }) => {
  const lang = parseLangParam(params.lang);
  if (!lang) return new Response(null, { status: 404 });

  const slug = params.category;
  if (!slug) return new Response(null, { status: 404 });

  const category = await getCategoryViewBySlug(slug, lang);
  if (!category) return new Response(null, { status: 404 });

  const endpoints = await getEndpointsView(slug, lang);
  const body = renderCategoryMd(category, endpoints);

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
