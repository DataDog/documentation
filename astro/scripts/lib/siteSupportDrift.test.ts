import { describe, expect, it } from "vitest";
import {
  collectApiCategorySlugs,
  collectCascadeSiteSupport,
  findBannerDrift,
  findCascadeDrift,
  findKeySetDrift,
  findRegionDrift,
  findUnpathedSlugCollisions,
  runCheck,
} from "./siteSupportDrift.ts";

describe("findKeySetDrift", () => {
  it("reports nothing when the key sets match", () => {
    expect(
      findKeySetDrift({ a: { regions: ["gov"] } }, { a: ["gov"] }),
    ).toEqual([]);
  });

  it("reports keys missing from either side", () => {
    expect(
      findKeySetDrift(
        { a: { regions: ["gov"] }, astroOnly: { regions: ["gov"] } },
        { a: ["gov"], hugoOnly: ["gov"] },
      ),
    ).toEqual([
      "hugoOnly: in Hugo's unsupported_sites but not in shared/site_support.yaml",
      "astroOnly: in shared/site_support.yaml but not in Hugo's unsupported_sites",
    ]);
  });
});

describe("findRegionDrift", () => {
  it("ignores region order", () => {
    expect(
      findRegionDrift(
        { a: { regions: ["gov", "gov2"] } },
        { a: ["gov2", "gov"] },
      ),
    ).toEqual([]);
  });

  it("reports keys whose regions differ", () => {
    expect(
      findRegionDrift({ a: { regions: ["gov"] } }, { a: ["gov", "gov2"] }),
    ).toEqual(['a: shared has ["gov"], Hugo has ["gov","gov2"]']);
  });

  it("skips keys missing from Hugo, which findKeySetDrift reports", () => {
    expect(findRegionDrift({ a: { regions: ["gov"] } }, {})).toEqual([]);
  });
});

describe("findBannerDrift", () => {
  it("reports locales whose banner strings differ", () => {
    expect(
      findBannerDrift({
        en: { hugo: "Same", shared: "Same" },
        fr: { hugo: "Nouveau", shared: "Ancien" },
      }),
    ).toEqual(['fr: shared has "Ancien", Hugo has "Nouveau"']);
  });

  it("reports a banner missing on one side", () => {
    expect(findBannerDrift({ ko: { hugo: "Text" } })).toEqual([
      'ko: shared has undefined, Hugo has "Text"',
    ]);
  });
});

describe("findUnpathedSlugCollisions", () => {
  it("reports keys named like an API category that have no url_paths", () => {
    expect(
      findUnpathedSlugCollisions(
        {
          experiments: { regions: ["gov"] },
          "on-call": { regions: ["gov2"], url_paths: ["/api/latest/on-call"] },
          unrelated: { regions: ["gov"] },
        },
        new Set(["experiments", "on-call"]),
      ),
    ).toEqual([
      "experiments: matches the API category slug but has no url_paths, " +
        "so Hugo shows a banner on /api/latest/experiments and Astro does not",
    ]);
  });
});

describe("collectApiCategorySlugs", () => {
  it("collects slugs from tags[] and from each operation's first tag", () => {
    const spec = {
      tags: [{ name: "Case Management" }],
      paths: {
        "/api/v2/experiments": {
          parameters: [],
          get: {
            operationId: "ListExperiments",
            tags: ["Experiments", "Ignored Secondary Tag"],
          },
          post: { tags: ["No Operation Id"] },
        },
      },
    };
    expect([...collectApiCategorySlugs([spec])].sort()).toEqual([
      "cases",
      "experiments",
    ]);
  });
});

describe("collectCascadeSiteSupport", () => {
  it("returns each cascade target that sets a site_support_id", () => {
    const markdown = [
      "---",
      "title: API Reference",
      "cascade:",
      "- _target:",
      "    path: /api/latest/downtimes",
      "  aliases:",
      "    - /api/latest/downtimes/s",
      "- _target:",
      "    path: /api/latest/app-builder/**",
      "    lang: en",
      "  site_support_id: app_builder_override",
      "---",
      "",
      "Body text.",
    ].join("\n");
    expect(collectCascadeSiteSupport(markdown)).toEqual([
      {
        path: "/api/latest/app-builder/**",
        siteSupportId: "app_builder_override",
      },
    ]);
  });

  it("accepts a single cascade map as well as a list", () => {
    const markdown = [
      "---",
      "cascade:",
      "  _target:",
      "    path: /api/latest/on-call",
      "  site_support_id: on-call",
      "---",
    ].join("\n");
    expect(collectCascadeSiteSupport(markdown)).toEqual([
      { path: "/api/latest/on-call", siteSupportId: "on-call" },
    ]);
  });

  it("returns nothing when there is no frontmatter cascade", () => {
    expect(collectCascadeSiteSupport("---\ntitle: x\n---\n")).toEqual([]);
    expect(collectCascadeSiteSupport("No frontmatter")).toEqual([]);
  });
});

describe("findCascadeDrift", () => {
  const sharedIds = {
    app_builder_override: {
      regions: ["gov2"],
      url_paths: ["/api/latest/app-builder", "/api/latest/app-builder/**"],
    },
    no_paths: { regions: ["gov"] },
  };

  it("reports nothing when every cascade path is in the key's url_paths", () => {
    expect(
      findCascadeDrift(sharedIds, [
        {
          path: "/api/latest/app-builder/**",
          siteSupportId: "app_builder_override",
        },
      ]),
    ).toEqual([]);
  });

  it("reports a cascade path missing from the key's url_paths", () => {
    expect(
      findCascadeDrift(sharedIds, [
        { path: "/api/latest/monitors", siteSupportId: "no_paths" },
      ]),
    ).toEqual([
      "no_paths: Hugo's API cascade covers /api/latest/monitors, " +
        "but the key's url_paths in shared/site_support.yaml don't include it",
    ]);
  });

  it("reports a cascade key missing from shared/site_support.yaml", () => {
    expect(
      findCascadeDrift(sharedIds, [
        { path: "/api/latest/monitors", siteSupportId: "missing_key" },
      ]),
    ).toEqual([
      "missing_key: Hugo's API cascade uses this key for " +
        "/api/latest/monitors, but it isn't in shared/site_support.yaml",
    ]);
  });
});

describe("runCheck", () => {
  it("returns the check's findings", () => {
    expect(runCheck("Title", () => ["a drift"])).toEqual({
      title: "Title",
      findings: ["a drift"],
    });
  });

  it("turns an error into a finding instead of throwing", () => {
    expect(
      runCheck("Title", () => {
        throw new Error("Map keys must be unique");
      }),
    ).toEqual({
      title: "Title",
      findings: ["Couldn't run this check: Map keys must be unique"],
    });
  });
});
