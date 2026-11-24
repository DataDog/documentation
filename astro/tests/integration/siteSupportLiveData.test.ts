/**
 * Rules that the real `shared/site_support.yaml` must follow. Hugo and Astro
 * both read this file, so these rules cover both sites.
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

  it("uses only regions, url_paths and description", () => {
    // Zod and Hugo both ignore unknown fields without an error, so a
    // misspelled field (for example, `url_path`) would be silently ignored.
    // This test catches it.
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
});
