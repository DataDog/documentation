import { describe, it, expect } from "vitest";
import { resolvePageFilters, type CdocContentFilter } from "./filters";

// Exercises the real cdocs-data pipeline (buildFiltersManifest ->
// resolveFilters) against the checked-in customization_config YAML, which
// `cdocsConfigPlugin` loads into `virtual:cdocs-config`.
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

const resolve = (urlVals: Record<string, string> = {}) =>
  resolvePageFilters({ contentFilters, urlVals });

describe("resolvePageFilters (backed by cdocs-data)", () => {
  it("falls back to option-group defaults when nothing is set", () => {
    expect(resolve().valsByTraitId).toEqual({
      prog_lang: "java",
      api_type: "otel_api",
    });
  });

  it("applies a URL param", () => {
    expect(
      resolve({ prog_lang: "python", api_type: "dd_api" }).valsByTraitId,
    ).toEqual({ prog_lang: "python", api_type: "dd_api" });
  });

  it("ignores an invalid URL value and falls back to the default", () => {
    expect(resolve({ prog_lang: "cobol" }).valsByTraitId.prog_lang).toBe(
      "java",
    );
  });

  it("exposes options with glossary labels and the resolved current value", () => {
    const langFilter = resolve({ prog_lang: "python" }).resolvedFilters.find(
      (f) => f.traitId === "prog_lang",
    )!;
    expect(langFilter.label).toBe("Language");
    expect(langFilter.currentValue).toBe("python");
    expect(langFilter.defaultValue).toBe("java");
    expect(langFilter.options).toEqual([
      { id: "java", label: "Java" },
      { id: "python", label: "Python" },
      { id: "cpp", label: "C++" },
      { id: "elixir", label: "Elixir" },
    ]);
  });

  it("honors a frontmatter default_value override", () => {
    const { valsByTraitId } = resolvePageFilters({
      urlVals: {},
      contentFilters: [
        {
          trait_id: "prog_lang",
          option_group_id: "custom_instrumentation_language_options",
          default_value: "python",
        },
      ],
    });
    expect(valsByTraitId.prog_lang).toBe("python");
  });
});
