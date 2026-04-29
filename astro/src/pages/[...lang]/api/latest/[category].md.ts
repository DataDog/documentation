import type { APIRoute, GetStaticPaths } from 'astro';
import { getApiCategories, getCategoryBySlug } from '../../../../data/api/index';
import { getEndpointsForCategory } from '../../../../data/api/endpoints';
import { renderCategoryMd } from '../../../../data/api/renderCategoryMd';
import { LOCALES, parseLangParam } from '../../../../lib/locale';

export const getStaticPaths: GetStaticPaths = () => {
  const paths: ReturnType<GetStaticPaths> = [];
  for (const lang of LOCALES) {
    for (const cat of getApiCategories(lang)) {
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

export const GET: APIRoute = ({ params }) => {
  const lang = parseLangParam(params.lang);
  if (!lang) return new Response(null, { status: 404 });

  const slug = params.category;
  if (!slug) return new Response(null, { status: 404 });

  const category = getCategoryBySlug(slug, lang);
  if (!category) return new Response(null, { status: 404 });

  const endpoints = getEndpointsForCategory(slug, lang);
  const body = renderCategoryMd(category, endpoints);

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
