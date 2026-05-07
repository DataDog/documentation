/**
 * Two layers of test coverage:
 *
 * 1. Snapshot tests covering the README's 12 audit categories. Each snapshot
 *    is preceded by a Zod parse check so a shape regression surfaces as a
 *    schema error (with field path) rather than just a snapshot diff.
 *
 * 2. A comprehensive shape-validation block that walks every category and
 *    every operation in the loaded spec, validating each return value
 *    against the Zod schemas. This catches drift the audit cases miss.
 *
 * Snapshots are written to `__snapshots__/*.json` via `toMatchFileSnapshot`
 * so each one is human-readable on its own. To regenerate after an
 * intentional change, run `npm test -- -u`.
 */

import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  getCategoriesView,
  getCategoryViewBySlug,
  getEndpointView,
} from './viewsBuilder';
import {
  ApiCategorySchema,
  EndpointDataSchema,
} from './schemas/views';

const CATEGORY_AUDIT_CASES: Array<{ slug: string; label: string }> = [
  { slug: 'authentication', label: 'smallest, 1 v1 endpoint' },
  { slug: 'dashboards', label: 'v1-only, medium' },
  { slug: 'incidents', label: 'v2-only, large' },
  { slug: 'aws-integration', label: 'mixed v1+v2, deprecated + unstable' },
  { slug: 'monitors', label: 'mixed v1+v2, deprecated + unstable' },
  { slug: 'dashboard-lists', label: 'category-level deprecated, has endpoints' },
  { slug: 'screenboards', label: 'empty deprecated category, 0 endpoints' },
  { slug: 'usage-metering', label: 'large, all GET, many deprecated' },
];

const ENDPOINT_AUDIT_CASES: Array<{
  catSlug: string;
  opSlug: string;
  label: string;
}> = [
  { catSlug: 'authentication', opSlug: 'validate-api-key', label: 'v1, single endpoint' },
  { catSlug: 'dashboards', opSlug: 'get-a-dashboard', label: 'v1' },
  { catSlug: 'incidents', opSlug: 'create-an-incident', label: 'v2' },
  { catSlug: 'aws-integration', opSlug: 'list-all-aws-integrations-v1', label: 'v1, slug collision suffix' },
  { catSlug: 'aws-integration', opSlug: 'list-all-aws-integrations-v2', label: 'v2, slug collision suffix' },
  { catSlug: 'monitors', opSlug: 'create-a-monitor', label: 'mixed v1+v2 category' },
  { catSlug: 'dashboard-lists', opSlug: 'get-all-dashboard-lists', label: 'inside deprecated category' },
  { catSlug: 'usage-metering', opSlug: 'get-hourly-usage-for-lambda', label: 'deprecated op' },
];

describe('viewsBuilder snapshots', () => {
  describe('getCategoriesView', () => {
    it('returns the full category list for the default locale', async () => {
      const result = await getCategoriesView();
      z.array(ApiCategorySchema).parse(result);
      await expect(JSON.stringify(result, null, 2)).toMatchFileSnapshot(
        './__snapshots__/getCategoriesView/en.json',
      );
    });
  });

  describe('getCategoryViewBySlug', () => {
    for (const { slug, label } of CATEGORY_AUDIT_CASES) {
      it(`${slug} (${label})`, async () => {
        const result = await getCategoryViewBySlug(slug);
        ApiCategorySchema.parse(result);
        await expect(JSON.stringify(result, null, 2)).toMatchFileSnapshot(
          `./__snapshots__/getCategoryViewBySlug/${slug}.json`,
        );
      });
    }
  });

  describe('getEndpointView', () => {
    for (const { catSlug, opSlug, label } of ENDPOINT_AUDIT_CASES) {
      it(`${catSlug}/${opSlug} (${label})`, async () => {
        const result = await getEndpointView(catSlug, opSlug);
        EndpointDataSchema.parse(result);
        await expect(JSON.stringify(result, null, 2)).toMatchFileSnapshot(
          `./__snapshots__/getEndpointView/${catSlug}.${opSlug}.json`,
        );
      });
    }
  });
});

describe('viewsBuilder shape validation across full spec', () => {
  it('every category in getCategoriesView matches ApiCategorySchema', async () => {
    const all = await getCategoriesView();
    z.array(ApiCategorySchema).parse(all);

    // Sanity: the spec defines many categories. Guard against an empty
    // result with a soft floor; tighten if the spec genuinely shrinks.
    expect(all.length).toBeGreaterThan(20);

    // Sanity: every known audit-case category must be present. These are
    // long-stable category slugs from the README's audit table — if any of
    // them disappear we want to know.
    const slugs = new Set(all.map((c) => c.slug));
    for (const { slug } of CATEGORY_AUDIT_CASES) {
      expect(slugs, `missing category "${slug}" in getCategoriesView()`).toContain(slug);
    }
  });

  it('every operation across every category returns a valid EndpointData', async () => {
    const cats = await getCategoriesView();
    const failures: Array<{ catSlug: string; opSlug: string; issues: unknown }> = [];
    let totalOps = 0;

    for (const cat of cats) {
      for (const op of cat.operations) {
        totalOps++;
        const ep = await getEndpointView(cat.slug, op.slug);
        if (!ep) {
          failures.push({ catSlug: cat.slug, opSlug: op.slug, issues: 'getEndpointView returned undefined' });
          continue;
        }
        const result = EndpointDataSchema.safeParse(ep);
        if (!result.success) {
          failures.push({ catSlug: cat.slug, opSlug: op.slug, issues: result.error.issues });
        }
      }
    }

    if (failures.length > 0) {
      const preview = failures.slice(0, 5);
      throw new Error(
        `${failures.length} endpoint(s) failed shape validation. First ${preview.length}:\n${JSON.stringify(preview, null, 2)}`,
      );
    }

    // Sanity: the spec defines hundreds of operations. Guard against an
    // empty walk silently passing.
    expect(totalOps).toBeGreaterThan(100);

    // Sanity: every known audit-case endpoint must resolve. Catches cases
    // where the spec keeps the slug but the builder fails to surface it.
    for (const { catSlug, opSlug } of ENDPOINT_AUDIT_CASES) {
      const ep = await getEndpointView(catSlug, opSlug);
      expect(ep, `getEndpointView("${catSlug}", "${opSlug}") returned undefined`).toBeDefined();
    }
  });
});
