/**
 * Snapshot tests covering a curated set of audit categories and operations
 * (defined in `tests/fixtures/api/auditCases.ts`). Each snapshot is preceded
 * by a Zod parse check so a shape regression surfaces as a schema error
 * (with field path) rather than just a snapshot diff.
 *
 * These tests run against the frozen 8-category fixture in
 * `tests/fixtures/api/` (wired by `vitest.unit.config.ts`). Comprehensive
 * shape validation across the *live* spec lives in
 * `tests/integration/viewsBuilder.full-spec.test.ts`.
 *
 * Snapshots are written to `__snapshots__/*.json` via `toMatchFileSnapshot`
 * so each one is human-readable on its own. To regenerate after an
 * intentional change, run `npm test -- -u`.
 */

import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  getCategoriesView,
  getCategoryStubsView,
  getCategoryViewBySlug,
  getOperationView,
} from './viewsBuilder';
import {
  ApiCategorySchema,
  ApiCategoryStubSchema,
  ApiOperationViewSchema,
} from './schemas/views';
import {
  CATEGORY_AUDIT_CASES,
  FIXTURE_ONLY_CATEGORY_AUDIT_CASES,
  ENDPOINT_AUDIT_CASES,
} from '../../../tests/fixtures/api/auditCases';

// The frozen fixture also covers categories retired from the live spec
// (e.g. screenboards); the integration test skips those, the unit layer keeps them.
const ALL_CATEGORY_AUDIT_CASES = [
  ...CATEGORY_AUDIT_CASES,
  ...FIXTURE_ONLY_CATEGORY_AUDIT_CASES,
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

  describe('getCategoryStubsView', () => {
    it('returns the same categories as getCategoriesView, minus operations', async () => {
      const stubs = await getCategoryStubsView();
      z.array(ApiCategoryStubSchema).parse(stubs);

      const full = await getCategoriesView();
      expect(stubs.length).toBe(full.length);
      for (let i = 0; i < stubs.length; i++) {
        expect(stubs[i]).not.toHaveProperty('operations');
        expect(stubs[i].slug).toBe(full[i].slug);
        expect(stubs[i].name).toBe(full[i].name);
        expect(stubs[i].description).toBe(full[i].description);
        expect(stubs[i].deprecated).toBe(full[i].deprecated);
      }
    });
  });

  describe('getCategoryViewBySlug', () => {
    for (const { slug, label } of ALL_CATEGORY_AUDIT_CASES) {
      it(`${slug} (${label})`, async () => {
        const result = await getCategoryViewBySlug(slug);
        ApiCategorySchema.parse(result);
        await expect(JSON.stringify(result, null, 2)).toMatchFileSnapshot(
          `./__snapshots__/getCategoryViewBySlug/${slug}.json`,
        );
      });
    }
  });

  describe('getOperationView', () => {
    for (const { catSlug, opSlug, label } of ENDPOINT_AUDIT_CASES) {
      it(`${catSlug}/${opSlug} (${label})`, async () => {
        const result = await getOperationView(catSlug, opSlug);
        ApiOperationViewSchema.parse(result);
        await expect(JSON.stringify(result, null, 2)).toMatchFileSnapshot(
          `./__snapshots__/getOperationView/${catSlug}.${opSlug}.json`,
        );
      });
    }
  });
});

