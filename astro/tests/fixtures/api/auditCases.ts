/**
 * Shared audit cases used by both the unit snapshot tests
 * (`src/lib/api/viewsBuilder.test.ts`) and the full-spec integration test
 * (`tests/integration/viewsBuilder.full-spec.test.ts`).
 *
 * Keeping a single source means a category or operation slug only has to be
 * added or renamed in one place to update both layers.
 */

export interface CategoryAuditCase {
  slug: string;
  label: string;
}

export interface EndpointAuditCase {
  catSlug: string;
  opSlug: string;
  label: string;
}

export const CATEGORY_AUDIT_CASES: readonly CategoryAuditCase[] = [
  { slug: 'authentication', label: 'smallest, 1 v1 endpoint' },
  { slug: 'dashboards', label: 'v1-only, medium' },
  { slug: 'incidents', label: 'v2-only, large' },
  { slug: 'aws-integration', label: 'mixed v1+v2, deprecated + unstable' },
  { slug: 'monitors', label: 'mixed v1+v2, deprecated + unstable' },
  { slug: 'dashboard-lists', label: 'category-level deprecated, has endpoints' },
  { slug: 'usage-metering', label: 'large, all GET, many deprecated' },
];

/**
 * Categories that no longer exist in the live spec but are preserved in the
 * frozen fixture for shape coverage. The integration test (live spec) skips
 * these; only the unit snapshot tests (frozen fixture) exercise them.
 *
 * `screenboards` was a deprecated empty category (0 endpoints) that upstream
 * has since removed entirely. It's exactly the kind of edge case a frozen
 * fixture is meant to keep stable, so it stays covered at the unit layer.
 */
export const FIXTURE_ONLY_CATEGORY_AUDIT_CASES: readonly CategoryAuditCase[] = [
  { slug: 'screenboards', label: 'empty deprecated category, 0 endpoints (retired upstream)' },
];

export const ENDPOINT_AUDIT_CASES: readonly EndpointAuditCase[] = [
  { catSlug: 'authentication', opSlug: 'validate-api-key', label: 'v1, single endpoint' },
  { catSlug: 'dashboards', opSlug: 'get-a-dashboard', label: 'v1' },
  { catSlug: 'incidents', opSlug: 'create-an-incident', label: 'v2' },
  { catSlug: 'aws-integration', opSlug: 'list-all-aws-integrations', label: 'multi-version (v1 + v2)' },
  { catSlug: 'monitors', opSlug: 'create-a-monitor', label: 'mixed v1+v2 category' },
  { catSlug: 'dashboard-lists', opSlug: 'get-all-dashboard-lists', label: 'inside deprecated category' },
  { catSlug: 'usage-metering', opSlug: 'get-hourly-usage-for-lambda', label: 'deprecated op' },
];
