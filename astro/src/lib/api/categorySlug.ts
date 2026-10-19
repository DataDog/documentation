/**
 * Turns OpenAPI tag names and operation summaries into URL slugs.
 *
 * This module has no imports on purpose. `scripts/checkSiteSupportDrift.ts`
 * runs under plain Node, which can't resolve the Vite aliases and `?raw`
 * imports the rest of `src/lib/api` uses, so it needs a slug rule it can load
 * directly. Keeping the one rule here means the script and the site can't
 * disagree about a category's slug.
 */

/** Tag slugs whose category page lives at a different slug. */
const SLUG_OVERRIDES: Record<string, string> = {
  "case-management": "cases",
  scorecards: "service-scorecards",
};

export function toSlug(name: string): string {
  return (
    name
      .toLowerCase()
      // Slashes drop out rather than becoming a hyphen, so `CI/CD` slugs as
      // `cicd` and not `ci-cd`.
      .replace(/\//g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  );
}

/**
 * The slug of an operation, from its summary, in the style of GitHub heading
 * IDs: punctuation is dropped, not turned into a hyphen ("Get a monitor's
 * details" is `get-a-monitors-details`).
 */
export function toOperationSlug(summary: string): string {
  return summary
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .replace(/\s/g, "-");
}

/** The slug of the API category page for an OpenAPI tag name. */
export function toCategorySlug(tagName: string): string {
  const rawSlug = toSlug(tagName);
  return SLUG_OVERRIDES[rawSlug] ?? rawSlug;
}
