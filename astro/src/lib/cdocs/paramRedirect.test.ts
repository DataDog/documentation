import { describe, it, expect } from "vitest";
import { findParamRedirect } from "./paramRedirect";
import { resolvePageFilterValues, type CdocContentFilter } from "./filters";
import { buildPageFiltersManifest } from "./pageFiltersManifest";
import { customizationConfig as dependentFiltersConfig } from "../../../tests/fixtures/cdocsDependentFilters/customizationConfig";

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

// `os` is shown only for Cosmos DB, which only the Azure host offers.
const dependentFilters: CdocContentFilter[] = [
  { trait_id: "host", option_group_id: "host_options" },
  { trait_id: "database", option_group_id: "<HOST>_database_options" },
  {
    trait_id: "os",
    option_group_id: "os_options",
    show_if: [{ database: ["cosmos_db"] }],
  },
];

function redirectFor(
  query: string,
  contentFilters = languageFilters,
  customizationConfig?: Parameters<typeof buildPageFiltersManifest>[1],
) {
  const filtersManifest = buildPageFiltersManifest(
    contentFilters,
    customizationConfig,
  );
  const searchParams = new URLSearchParams(query);
  return findParamRedirect({
    contentFilters,
    filtersManifest,
    searchParams,
    valsByTraitId: resolvePageFilterValues({
      contentFilters,
      filtersManifest,
      searchParams,
    }),
  });
}

const dependentRedirectFor = (query: string) =>
  redirectFor(query, dependentFilters, dependentFiltersConfig);

describe("findParamRedirect", () => {
  it("doesn't redirect a URL with only valid params, in any order", () => {
    expect(redirectFor("prog_lang=python&api_type=dd_api")).toBeNull();
  });

  it("doesn't redirect a bare URL, or one missing a filter", () => {
    expect(redirectFor("")).toBeNull();
    expect(redirectFor("prog_lang=python")).toBeNull();
  });

  it("keeps a default value that's in the URL", () => {
    expect(redirectFor("prog_lang=java")).toBeNull();
  });

  it("leaves params that aren't filters alone", () => {
    expect(redirectFor("utm_source=x&prog_lang=python&foo=1")).toBeNull();
  });

  it("replaces a value the page doesn't offer with the one it shows", () => {
    expect(redirectFor("prog_lang=cobol")).toBe("?prog_lang=java");
  });

  it("puts the params in alphabetical order, keeping params that aren't filters", () => {
    expect(redirectFor("utm_source=x&prog_lang=cobol&api_type=dd_api")).toBe(
      "?api_type=dd_api&prog_lang=java&utm_source=x",
    );
  });

  it("doesn't add filters the URL is missing", () => {
    // The head script adds the reader's stored preferences for those.
    expect(redirectFor("api_type=nope")).toBe("?api_type=otel_api");
  });

  it("replaces an empty value", () => {
    expect(redirectFor("prog_lang=")).toBe("?prog_lang=java");
  });

  it("keeps one copy of a repeated filter", () => {
    expect(redirectFor("prog_lang=python&prog_lang=go")).toBe(
      "?prog_lang=python",
    );
  });

  it("replaces a dependent value that the other filters don't offer", () => {
    expect(dependentRedirectFor("host=azure&database=aurora")).toBe(
      "?database=cosmos_db&host=azure",
    );
  });

  it("keeps a valid value for a filter that's hidden", () => {
    // Dropping it would loop: the head script would add a stored value back.
    expect(
      dependentRedirectFor("host=aws&database=aurora&os=windows"),
    ).toBeNull();
  });

  it("replaces an invalid value for a filter that's hidden with its default", () => {
    expect(dependentRedirectFor("host=aws&database=aurora&os=beos")).toBe(
      "?database=aurora&host=aws&os=linux",
    );
  });
});
