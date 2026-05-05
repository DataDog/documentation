/**
 * `apiCategories` collection loader.
 *
 * Emits one entry per `(lang, categorySlug)`. Categories are derived from
 * spec tags (with the same slug overrides Hugo applies) and translated via
 * the `translate_tags.{lang}.json` overlays. Operations belonging to a
 * category are queried directly from `apiOperations` filtered on
 * `categorySlug`; we don't denormalize that list here.
 */

import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';
import { API_VERSIONS, getSpec } from '../spec';
import { LOCALES, type Locale } from '../../../lib/i18n/locale';
import { renderMarkdown } from '../markdown';
import { getOverlay, translateTag } from '../translations';

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'] as const;

const SLUG_OVERRIDES: Record<string, string> = {
  'case-management': 'cases',
  'scorecards': 'service-scorecards',
};

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const apiCategoriesSchema = z.object({
  lang: z.enum(LOCALES),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  deprecated: z.boolean(),
});

interface CategoryMeta {
  name: string;
  slug: string;
  description: string;
  deprecated: boolean;
}

export function apiCategoriesLoader(): Loader {
  return {
    name: 'api-categories',
    load: async ({ store, parseData, logger }) => {
      store.clear();
      let count = 0;

      for (const lang of LOCALES) {
        const categoryMap = new Map<string, CategoryMeta>();

        for (const version of API_VERSIONS) {
          const spec = getSpec(version);
          const overlay = getOverlay(version, lang as Locale);

          for (const tag of spec?.tags ?? []) {
            const rawSlug = toSlug(tag.name);
            const slug = SLUG_OVERRIDES[rawSlug] ?? rawSlug;
            if (categoryMap.has(slug)) continue;

            const translated = translateTag(overlay, slug, {
              name: tag.name,
              description: tag.description,
            });
            categoryMap.set(slug, {
              name: translated.name,
              slug,
              description: translated.description ? renderMarkdown(translated.description) : '',
              deprecated: tag['x-deprecated'] === true,
            });
          }

          // A handful of operations reference tags that aren't declared in
          // `tags:`. Add those tags as categories too, mirroring the existing
          // behavior in index.ts.
          const paths = spec?.paths;
          if (!paths || typeof paths !== 'object') continue;

          for (const pathItem of Object.values(paths) as any[]) {
            if (!pathItem || typeof pathItem !== 'object') continue;
            for (const method of HTTP_METHODS) {
              const operation = pathItem[method];
              if (!operation || typeof operation !== 'object') continue;
              const tags: string[] = operation.tags;
              if (!tags || !Array.isArray(tags) || tags.length === 0) continue;

              const tagName = tags[0];
              const rawSlug = toSlug(tagName);
              const slug = SLUG_OVERRIDES[rawSlug] ?? rawSlug;

              if (!categoryMap.has(slug)) {
                const translated = translateTag(overlay, slug, { name: tagName });
                categoryMap.set(slug, {
                  name: translated.name,
                  slug,
                  description: '',
                  deprecated: false,
                });
              }
            }
          }
        }

        for (const meta of categoryMap.values()) {
          const id = `${lang}/${meta.slug}`;
          const data = await parseData({
            id,
            data: {
              lang,
              slug: meta.slug,
              name: meta.name,
              description: meta.description,
              deprecated: meta.deprecated,
            },
          });
          store.set({ id, data });
          count++;
        }
      }

      logger.info(`Loaded ${count} API category entries`);
    },
  };
}
