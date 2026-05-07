/**
 * Snapshot tests covering the README's 12 audit categories. Static pages
 * (#1-4) are skipped because they are not driven by these view functions.
 *
 * Snapshots are written to `__snapshots__/*.json` via `toMatchFileSnapshot`
 * so each one is human-readable on its own. To regenerate after an
 * intentional change, run `npm test -- -u`.
 */

import { describe, it, expect } from 'vitest';
import {
  getCategoriesView,
  getCategoryViewBySlug,
  getEndpointView,
} from './viewsBuilder';

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
      await expect(JSON.stringify(result, null, 2)).toMatchFileSnapshot(
        './__snapshots__/getCategoriesView/en.json',
      );
    });
  });

  describe('getCategoryViewBySlug', () => {
    for (const { slug, label } of CATEGORY_AUDIT_CASES) {
      it(`${slug} (${label})`, async () => {
        const result = await getCategoryViewBySlug(slug);
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
        await expect(JSON.stringify(result, null, 2)).toMatchFileSnapshot(
          `./__snapshots__/getEndpointView/${catSlug}.${opSlug}.json`,
        );
      });
    }
  });
});
