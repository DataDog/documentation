/**
 * Rules that the real `shared/site_support.yaml` must follow.
 *
 * Drift between this file and Hugo's copy of the data is not checked here. It
 * is reported by `yarn check:site-support-drift` instead, which warns rather
 * than fails, so upstream changes don't block unrelated work.
 *
 * This lives in `tests/integration/` rather than beside the module it covers.
 * The unit config redirects `@shared/site_support.yaml` to a fixture, so a
 * test under `src/config/` would check the fixture instead of the real file.
 * The integration project has no redirect.
 */
import { parse as parseYaml } from "yaml";
import { describe, expect, it } from "vitest";
import SITE_SUPPORT_YAML_RAW from "@shared/site_support.yaml?raw";

interface SharedEntry {
  regions: string[];
  url_paths?: string[];
  description?: string;
}

const shared = parseYaml(SITE_SUPPORT_YAML_RAW) as {
  site_support_ids: Record<string, SharedEntry>;
};

const sharedIds = shared.site_support_ids;

describe("shared/site_support.yaml", () => {
  it("reads real data, not the unit-test fixture", () => {
    // Guard against this test being moved under a config that redirects the
    // shared file, which would make every assertion below vacuous.
    expect(Object.keys(sharedIds).length).toBeGreaterThan(100);
    expect(Object.keys(sharedIds)).not.toContain("fake_product");
  });

  it("adds url_paths and description only, never other fields", () => {
    // `url_paths` and `description` are Astro-side additions; Hugo's copy has
    // neither. This pins the rule that they are the *only* permitted
    // divergence from Hugo's shape.
    const extraFields: string[] = [];
    for (const [id, entry] of Object.entries(sharedIds)) {
      for (const field of Object.keys(entry)) {
        if (!["regions", "url_paths", "description"].includes(field)) {
          extraFields.push(`${id}.${field}`);
        }
      }
    }
    expect(extraFields).toEqual([]);
  });

  it("pins the set of keys carrying url_paths", () => {
    // Astro resolves a page's support status from `url_paths` only, so adding
    // or removing them changes which pages show a banner. Naming the exact set
    // makes that change deliberate.
    const KEYS_WITH_PATHS = [
      "agentless-scanning",
      "app_builder_override",
      "experiments",
      "on-call",
      "workflow-automation",
    ];
    const withPaths = Object.entries(sharedIds)
      .filter(([, entry]) => (entry.url_paths?.length ?? 0) > 0)
      .map(([id]) => id)
      .sort();
    expect(withPaths).toEqual([...KEYS_WITH_PATHS].sort());
  });
});
