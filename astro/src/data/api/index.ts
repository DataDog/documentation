import { parse as parseYaml } from 'yaml';
import { z } from 'astro/zod';
import { renderMarkdown } from './markdown';
import { DEFAULT_LOCALE, type Locale } from '../../lib/locale';
import { getOverlay, translateAction, translateTag } from './translations';

// Import spec files as raw strings so Vite bundles them correctly.
// Sourced from mocked_dependencies until the live spec feed is wired up.
// @ts-ignore — Vite raw import
import v1Raw from '../../mocked_dependencies/hugo_site/data/api/v1/full_spec.yaml?raw';
// @ts-ignore — Vite raw import
import v2Raw from '../../mocked_dependencies/hugo_site/data/api/v2/full_spec.yaml?raw';

/* ------------------------------------------------------------------ */
/*  Zod schemas — only the subset of OpenAPI fields we actually need  */
/* ------------------------------------------------------------------ */

const TagSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  'x-deprecated': z.boolean().optional(),
});

const OperationSchema = z.object({
  operationId: z.string(),
  summary: z.string(),
  tags: z.array(z.string()).min(1),
  'x-menu-order': z.number().optional(),
});

const PathMethodsSchema = z
  .record(z.union([OperationSchema, z.unknown()]))
  .transform((methods) => {
    // Only keep HTTP method entries that match our OperationSchema
    const ops: z.infer<typeof OperationSchema>[] = [];
    for (const [key, value] of Object.entries(methods)) {
      if (['get', 'post', 'put', 'patch', 'delete', 'head', 'options'].includes(key)) {
        const parsed = OperationSchema.safeParse(value);
        if (parsed.success) {
          ops.push(parsed.data);
        }
      }
    }
    return ops;
  });

const SpecSchema = z.object({
  tags: z.array(TagSchema),
  paths: z.record(PathMethodsSchema),
});

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface ApiOperation {
  operationId: string;
  summary: string;
  slug: string;
  menuOrder: number;
  version: 'v1' | 'v2';
}

export interface ApiCategory {
  name: string;
  slug: string;
  /** HTML rendered from the OpenAPI tag description (Markdown). */
  description: string;
  operations: ApiOperation[];
  deprecated: boolean;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function operationSlug(summary: string): string {
  return toSlug(summary);
}

/**
 * Override map: spec tag slug → Hugo-expected slug.
 * Handles cases where Hugo uses a different URL slug than the spec tag name.
 */
const SLUG_OVERRIDES: Record<string, string> = {
  'case-management': 'cases',
  'scorecards': 'service-scorecards',
};

/* ------------------------------------------------------------------ */
/*  Parse + merge                                                     */
/* ------------------------------------------------------------------ */

const specRaw = { v1: v1Raw, v2: v2Raw };

function loadSpec(version: 'v1' | 'v2') {
  const parsed = parseYaml(specRaw[version]);
  return SpecSchema.parse(parsed);
}

const _cache = new Map<Locale, ApiCategory[]>();

export function getApiCategories(lang: Locale = DEFAULT_LOCALE): ApiCategory[] {
  const cached = _cache.get(lang);
  if (cached) {
    return cached;
  }

  const v1 = loadSpec('v1');
  const v2 = loadSpec('v2');

  const v1Overlay = getOverlay('v1', lang);
  const v2Overlay = getOverlay('v2', lang);

  // Build a map of tag name → category metadata
  const categoryMap = new Map<string, { name: string; slug: string; description: string; deprecated: boolean }>();

  for (const [tags, overlay] of [[v1.tags, v1Overlay], [v2.tags, v2Overlay]] as const) {
    for (const tag of tags) {
      const rawSlug = toSlug(tag.name);
      const slug = SLUG_OVERRIDES[rawSlug] ?? rawSlug;
      if (categoryMap.has(slug)) {
        continue;
      }
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
  }

  // Collect operations per category slug
  const opsMap = new Map<string, ApiOperation[]>();

  function collectOps(spec: z.infer<typeof SpecSchema>, version: 'v1' | 'v2') {
    const overlay = version === 'v1' ? v1Overlay : v2Overlay;
    for (const operations of Object.values(spec.paths)) {
      for (const op of operations) {
        const tagName = op.tags[0];
        const rawSlug = toSlug(tagName);
        const slug = SLUG_OVERRIDES[rawSlug] ?? rawSlug;
        if (!opsMap.has(slug)) opsMap.set(slug, []);

        // Ensure the tag is in categoryMap even if it wasn't in the tags list
        if (!categoryMap.has(slug)) {
          const translated = translateTag(overlay, slug, { name: tagName });
          categoryMap.set(slug, { name: translated.name, slug, description: '', deprecated: false });
        }

        // Anchor stays English (matching Hugo) — slug is derived from the
        // untranslated summary so deep links survive locale switches.
        const action = translateAction(overlay, op.operationId);
        opsMap.get(slug)!.push({
          operationId: op.operationId,
          summary: action.summary ?? op.summary,
          slug: operationSlug(op.summary),
          menuOrder: op['x-menu-order'] ?? 999,
          version,
        });
      }
    }
  }

  collectOps(v1, 'v1');
  collectOps(v2, 'v2');

  // Assemble categories, sort alphabetically; sort operations by menu order
  const categories: ApiCategory[] = [];
  for (const meta of categoryMap.values()) {
    const ops = opsMap.get(meta.slug) ?? [];
    ops.sort((a, b) => a.menuOrder - b.menuOrder || a.summary.localeCompare(b.summary));
    categories.push({ ...meta, operations: ops });
  }

  categories.sort((a, b) => a.name.localeCompare(b.name));

  _cache.set(lang, categories);
  return categories;
}

export function getCategoryBySlug(slug: string, lang: Locale = DEFAULT_LOCALE): ApiCategory | undefined {
  return getApiCategories(lang).find((c) => c.slug === slug);
}
