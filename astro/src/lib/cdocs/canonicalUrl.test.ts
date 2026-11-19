import { describe, it, expect } from "vitest";
import { buildCanonicalPath } from "./canonicalUrl";
import type { CdocContentFilter } from "./filters";
import { buildPageFiltersManifest } from "./pageFiltersManifest";
import { customizationConfig as dependentFiltersConfig } from "../../../tests/fixtures/cdocsDependentFilters/customizationConfig";

const BARE_URL = "/dd_e2e/cdocs/custom_instrumentation/";

const languageFilters: CdocContentFilter[] = [
  {
    trait_id: "prog_lang",
    option_group_id: "custom_instrumentation_language_options",
  },
  {
    trait_id: "api_type",
    option_group_id: "custom_instrumentation_api_options",
  },
];

const dependentFilters: CdocContentFilter[] = [
  { trait_id: "host", option_group_id: "host_options" },
  { trait_id: "database", option_group_id: "<HOST>_database_options" },
];

const canonicalFor = (valsByTraitId: Record<string, string>) =>
  buildCanonicalPath({
    bareUrl: BARE_URL,
    contentFilters: languageFilters,
    filtersManifest: buildPageFiltersManifest(languageFilters),
    valsByTraitId,
  });

describe("buildCanonicalPath", () => {
  it("is the bare URL for the default variant", () => {
    expect(canonicalFor({ prog_lang: "java", api_type: "otel_api" })).toBe(
      BARE_URL,
    );
  });

  it("has every value as a param, in alphabetical order, for other variants", () => {
    expect(canonicalFor({ prog_lang: "python", api_type: "otel_api" })).toBe(
      `${BARE_URL}?api_type=otel_api&prog_lang=python`,
    );
  });

  it("compares against the default variant, not each filter's own default", () => {
    // Cosmos DB is the default database for Azure, but Azure isn't the default host.
    expect(
      buildCanonicalPath({
        bareUrl: BARE_URL,
        contentFilters: dependentFilters,
        filtersManifest: buildPageFiltersManifest(
          dependentFilters,
          dependentFiltersConfig,
        ),
        valsByTraitId: { host: "azure", database: "cosmos_db" },
      }),
    ).toBe(`${BARE_URL}?database=cosmos_db&host=azure`);
  });
});
