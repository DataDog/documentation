/**
 * Shape validation against the full live spec.
 *
 * Unlike the snapshot tests in `src/lib/api/viewsBuilder.test.ts` (which run
 * against the frozen 8-category fixture), these walk every category and every
 * operation the real spec exports. This file is picked up by
 * `vitest.integration.config.ts`, which omits the frozen-fixture plugin so
 * `@hugo-site/data/api` resolves to the actual Hugo data directory.
 *
 * Both unit and integration projects run via `npm run test`.
 */

import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { getCategoriesView, getOperationView } from '@lib/api/viewsBuilder';
import { ApiCategorySchema, ApiOperationViewSchema } from '@lib/api/schemas/views';
import {
  CATEGORY_AUDIT_CASES,
  ENDPOINT_AUDIT_CASES,
} from '../fixtures/api/auditCases';

describe('viewsBuilder shape validation across full spec', () => {
  it('every category in getCategoriesView matches ApiCategorySchema', async () => {
    const all = await getCategoriesView();
    z.array(ApiCategorySchema).parse(all);

    expect(all.length).toBeGreaterThan(20);

    const slugs = new Set(all.map((c) => c.slug));
    for (const { slug } of CATEGORY_AUDIT_CASES) {
      expect(slugs, `missing category "${slug}" in getCategoriesView()`).toContain(slug);
    }
  });

  it('every operation across every category returns a valid ApiOperationView', async () => {
    const cats = await getCategoriesView();
    const failures: Array<{ catSlug: string; opSlug: string; issues: unknown }> = [];
    let totalOps = 0;

    for (const cat of cats) {
      for (const op of cat.operations) {
        totalOps++;
        const view = await getOperationView(cat.slug, op.slug);
        if (!view) {
          failures.push({ catSlug: cat.slug, opSlug: op.slug, issues: 'getOperationView returned undefined' });
          continue;
        }
        const result = ApiOperationViewSchema.safeParse(view);
        if (!result.success) {
          failures.push({ catSlug: cat.slug, opSlug: op.slug, issues: result.error.issues });
        }
      }
    }

    if (failures.length > 0) {
      const preview = failures.slice(0, 5);
      throw new Error(
        `${failures.length} operation(s) failed shape validation. First ${preview.length}:\n${JSON.stringify(preview, null, 2)}`,
      );
    }

    expect(totalOps).toBeGreaterThan(100);
  });

  it('every audited endpoint resolves to a valid ApiOperationView', async () => {
    for (const { catSlug, opSlug } of ENDPOINT_AUDIT_CASES) {
      const view = await getOperationView(catSlug, opSlug);
      expect(view, `getOperationView("${catSlug}", "${opSlug}") returned undefined`).toBeDefined();
      ApiOperationViewSchema.parse(view);
    }
  });
});
