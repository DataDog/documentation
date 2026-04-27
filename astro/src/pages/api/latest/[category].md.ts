import type { APIRoute, GetStaticPaths } from 'astro';
import { getApiCategories, getCategoryBySlug } from '../../../data/api/index';
import { getEndpointsForCategory } from '../../../data/api/endpoints';
import { renderCategoryMd } from '../../../data/api/renderCategoryMd';

export const getStaticPaths: GetStaticPaths = () => {
  return getApiCategories().map((cat) => ({ params: { category: cat.slug } }));
};

export const GET: APIRoute = ({ params }) => {
  const slug = params.category;
  if (!slug) return new Response(null, { status: 404 });

  const category = getCategoryBySlug(slug);
  if (!category) return new Response(null, { status: 404 });

  const endpoints = getEndpointsForCategory(slug);
  const body = renderCategoryMd(category, endpoints);

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
