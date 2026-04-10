import { parse as parseYaml } from 'yaml';
import { z } from 'astro/zod';

// Import spec files as raw strings so Vite bundles them correctly
// @ts-ignore — Vite raw import
import v1Raw from './v1/full_spec.yaml?raw';
// @ts-ignore — Vite raw import
import v2Raw from './v2/full_spec.yaml?raw';

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

/* ------------------------------------------------------------------ */
/*  Parse + merge                                                     */
/* ------------------------------------------------------------------ */

const specRaw = { v1: v1Raw, v2: v2Raw };

function loadSpec(version: 'v1' | 'v2') {
  const parsed = parseYaml(specRaw[version]);
  return SpecSchema.parse(parsed);
}

let _cache: ApiCategory[] | null = null;

export function getApiCategories(): ApiCategory[] {
  if (_cache) return _cache;

  const v1 = loadSpec('v1');
  const v2 = loadSpec('v2');

  // Build a map of tag name → category metadata
  const categoryMap = new Map<string, { name: string; slug: string; deprecated: boolean }>();

  for (const tag of [...v1.tags, ...v2.tags]) {
    const slug = toSlug(tag.name);
    if (!categoryMap.has(slug)) {
      categoryMap.set(slug, {
        name: tag.name,
        slug,
        deprecated: tag['x-deprecated'] === true,
      });
    }
  }

  // Collect operations per category slug
  const opsMap = new Map<string, ApiOperation[]>();

  function collectOps(spec: z.infer<typeof SpecSchema>, version: 'v1' | 'v2') {
    for (const operations of Object.values(spec.paths)) {
      for (const op of operations) {
        const tagName = op.tags[0];
        const slug = toSlug(tagName);
        if (!opsMap.has(slug)) opsMap.set(slug, []);

        // Ensure the tag is in categoryMap even if it wasn't in the tags list
        if (!categoryMap.has(slug)) {
          categoryMap.set(slug, { name: tagName, slug, deprecated: false });
        }

        opsMap.get(slug)!.push({
          operationId: op.operationId,
          summary: op.summary,
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

  _cache = categories;
  return categories;
}

export function getCategoryBySlug(slug: string): ApiCategory | undefined {
  return getApiCategories().find((c) => c.slug === slug);
}
