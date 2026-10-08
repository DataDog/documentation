import { describe, expect, it } from "vitest";
import {
  collectApiCategorySlugs,
  findBannerDrift,
  findKeySetDrift,
  findRegionDrift,
  findUnpathedSlugCollisions,
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
