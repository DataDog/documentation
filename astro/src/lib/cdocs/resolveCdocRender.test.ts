import { describe, it, expect } from "vitest";
import { resolveCdocRender } from "./resolveCdocRender";
import type { CdocContentFilter } from "./filters";

// The catch-all cdoc route's per-request resolution: pull filter values from the
// request URL (URL query > default), and produce the UI filters. Backed by the
// real cdocs-data pipeline and the checked-in customization_config YAML.
const contentFilters: CdocContentFilter[] = [
  {
    trait_id: "prog_lang",
    option_group_id: "custom_instrumentation_language_options",
    label: "Language",
  },
  {
    trait_id: "api_type",
    option_group_id: "custom_instrumentation_api_options",
    label: "API",
  },
];

const render = (query = "") =>
  resolveCdocRender({
    contentFilters,
    searchParams: new URLSearchParams(query),
  });

describe("resolveCdocRender", () => {
  it("resolves option-group defaults when the request carries no filters", () => {
    expect(render().valsByTraitId).toEqual({
      prog_lang: "java",
      api_type: "otel_api",
    });
  });

  it("reads filter values from the URL query string", () => {
    expect(render("prog_lang=python&api_type=dd_api").valsByTraitId).toEqual({
      prog_lang: "python",
      api_type: "dd_api",
    });
  });

  it("uses the default for a filter the URL omits", () => {
    expect(render("api_type=dd_api").valsByTraitId).toEqual({
      prog_lang: "java",
      api_type: "dd_api",
    });
  });

  it("returns UI-ready filters in frontmatter order", () => {
    expect(render().resolvedFilters.map((filter) => filter.traitId)).toEqual([
      "prog_lang",
      "api_type",
    ]);
  });
});
