/**
 * One-shot equivalence check: `shared/site_support.yaml` must agree with the
 * Hugo config it was generated from.
 *
 * While both sites run, the site-support data lives in two places on purpose —
 * the Hugo phase of this work mounts the shared file as Hugo data and deletes
 * the copy. Until then this test is the guard that the copy stayed faithful.
 *
 * Delete this file when Hugo reads `shared/site_support.yaml` directly. At that
 * point there is only one copy and there is nothing to compare.
 *
 * This lives in `tests/integration/` rather than beside the module it covers.
 * The unit config redirects `@shared/site_support.yaml` to a fixture, so an
 * equivalence test under `src/config/` would compare the fixture against Hugo
 * and pass without checking anything. The integration project has no redirect.
 */
import { parse as parseYaml } from "yaml";
import { describe, expect, it } from "vitest";
import PARAMS_YAML_RAW from "@hugo-site/config/_default/params.yaml?raw";
import SITE_SUPPORT_YAML_RAW from "@shared/site_support.yaml?raw";

interface SharedEntry {
  regions: string[];
  url_paths?: string[];
  description?: string;
}

const shared = parseYaml(SITE_SUPPORT_YAML_RAW) as {
  site_support_ids: Record<string, SharedEntry>;
};
const hugo = parseYaml(PARAMS_YAML_RAW) as {
  unsupported_sites: Record<string, string[]>;
};

const sharedIds = shared.site_support_ids;

describe("shared/site_support.yaml matches Hugo's unsupported_sites", () => {
  it("reads real data, not the unit-test fixture", () => {
    // Guard against this test being moved under a config that redirects the
    // shared file, which would make every assertion below vacuous.
    expect(Object.keys(sharedIds).length).toBeGreaterThan(100);
    expect(Object.keys(sharedIds)).not.toContain("fake_product");
  });

  it("has the same key set", () => {
    expect(Object.keys(sharedIds).sort()).toEqual(
      Object.keys(hugo.unsupported_sites).sort(),
    );
  });

  it("has the same regions for every key", () => {
    const mismatches: string[] = [];
    for (const [id, entry] of Object.entries(sharedIds)) {
      const hugoRegions = hugo.unsupported_sites[id];
      if (!hugoRegions) {
        continue; // key-set test above owns this failure
      }
      const a = [...entry.regions].sort();
      const b = [...hugoRegions].sort();
      if (JSON.stringify(a) !== JSON.stringify(b)) {
        mismatches.push(`${id}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
      }
    }
    expect(mismatches).toEqual([]);
  });

  it("adds url_paths only, never changing regions", () => {
    // `url_paths` and `description` are Astro-side additions; Hugo's copy has
    // neither, so they are deliberately not compared. This test just pins the
    // rule that they are the *only* permitted divergence.
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

describe("the banner string matches Hugo's site params", () => {
  const LOCALES = ["en", "es", "fr", "ja", "ko"] as const;

  const hugoParamsByLocale = Object.fromEntries(
    LOCALES.map((lang) => {
      const raw = import.meta.glob<string>(
        "@hugo-site/config/_default/params.*.yaml",
        { query: "?raw", import: "default", eager: true },
      );
      const key = Object.keys(raw).find((k) =>
        k.endsWith(`params.${lang}.yaml`),
      );
      const parsed = parseYaml(raw[key!]) as { site_support_banner?: string };
      return [lang, parsed.site_support_banner];
    }),
  ) as Record<string, string | undefined>;

  const sharedI18n = Object.fromEntries(
    LOCALES.map((lang) => {
      const raw = import.meta.glob<string>("@shared/i18n/*.json", {
        query: "?raw",
        import: "default",
        eager: true,
      });
      const key = Object.keys(raw).find((k) => k.endsWith(`/${lang}.json`));
      const parsed = JSON.parse(raw[key!]) as Record<
        string,
        { other?: string }
      >;
      return [lang, parsed.site_support_banner?.other];
    }),
  ) as Record<string, string | undefined>;

  it.each(LOCALES)("matches byte for byte in %s", (lang) => {
    // Includes the upstream quirks on purpose: `fr` has a stray space before
    // `</a>`, and `ja` is still the English string. Copying them verbatim means
    // an upstream fix shows up here as a failure rather than as silent drift.
    expect(sharedI18n[lang]).toBe(hugoParamsByLocale[lang]);
  });
});

/**
 * Astro resolves a page's support status from `url_paths` only. Hugo instead
 * walks the page's path segments and matches any segment against a key name,
 * so in Hugo a key called `on-call` implicitly covers `/api/latest/on-call`
 * with no `url_paths` at all.
 *
 * That implicit behavior is what Astro deliberately drops (see the design
 * notes). The risk is a key whose *name* happens to match an API category
 * slug: Hugo would banner that page, Astro would not. This test names the
 * exact set that is allowed to rely on paths, so adding a key that collides
 * with an API slug fails here rather than quietly diverging.
 */
describe("no key name silently covers an API page", () => {
  const KEYS_WITH_PATHS = [
    "agentless-scanning",
    "app_builder_override",
    "on-call",
    "workflow-automation",
  ];

  it("pins the set of keys carrying url_paths", () => {
    const withPaths = Object.entries(sharedIds)
      .filter(([, entry]) => (entry.url_paths?.length ?? 0) > 0)
      .map(([id]) => id)
      .sort();
    expect(withPaths).toEqual([...KEYS_WITH_PATHS].sort());
  });

  it("gives every API-slug-shaped key an explicit url_paths", async () => {
    // Any key whose name matches an API category slug is one Hugo's segment
    // walk would banner implicitly. Astro only matches `url_paths`, so such a
    // key must carry them or that page loses its banner.
    const { getCategoryStubsView } = await import("@lib/api/viewsBuilder");
    const slugs = new Set(
      (await getCategoryStubsView("en")).map((cat) => cat.slug),
    );

    const collidesButHasNoPaths = Object.entries(sharedIds)
      .filter(
        ([id, entry]) => slugs.has(id) && (entry.url_paths?.length ?? 0) === 0,
      )
      .map(([id]) => id);

    expect(collidesButHasNoPaths).toEqual([]);
  }, 30_000); // Builds the category view from the full live API spec.
});
