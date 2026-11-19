import { describe, it, expect } from "vitest";
import { resolvePageFilters, type CdocContentFilter } from "./filters";
import { buildPageFiltersManifest } from "./pageFiltersManifest";
import { customizationConfig as dependentFiltersConfig } from "../../../tests/fixtures/cdocsDependentFilters/customizationConfig";

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
  resolvePageFilters({
    contentFilters,
    filtersManifest: buildPageFiltersManifest(contentFilters),
    urlVals,
  });

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
    const overriddenFilters: CdocContentFilter[] = [
      {
        trait_id: "prog_lang",
        option_group_id: "custom_instrumentation_language_options",
        default_value: "python",
      },
    ];
    const { valsByTraitId } = resolvePageFilters({
      urlVals: {},
      contentFilters: overriddenFilters,
      filtersManifest: buildPageFiltersManifest(overriddenFilters),
    });
    expect(valsByTraitId.prog_lang).toBe("python");
  });

  it("settles a reset that changes whether an earlier filter is shown", () => {
    // `os` is checked first, while `database` is still aurora. Then the Azure
    // host resets `database` to Cosmos DB, which shows `os` after all.
    const chainedFilters: CdocContentFilter[] = [
      {
        trait_id: "os",
        option_group_id: "os_options",
        show_if: [{ database: ["cosmos_db"] }],
      },
      { trait_id: "host", option_group_id: "host_options" },
      { trait_id: "database", option_group_id: "<HOST>_database_options" },
    ];
    const { valsByTraitId, resolvedFilters } = resolvePageFilters({
      urlVals: { host: "azure", database: "aurora" },
      contentFilters: chainedFilters,
      filtersManifest: buildPageFiltersManifest(
        chainedFilters,
        dependentFiltersConfig,
      ),
    });

    expect(valsByTraitId).toEqual({
      os: "linux",
      host: "azure",
      database: "cosmos_db",
    });
    expect(resolvedFilters.map((filter) => filter.traitId)).toEqual([
      "os",
      "host",
      "database",
    ]);
  });
});
