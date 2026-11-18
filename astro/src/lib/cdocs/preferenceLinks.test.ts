import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { loadCustomizationConfig } from "cdocs-data/loadCustomizationConfig";
import {
  addOfferedParamsToHref,
  addPreferencesToHref,
} from "./preferenceLinks";
import { buildCdocsLinkTarget, type CdocsTraitsList } from "./cdocsPages";
import type { CdocContentFilter } from "./filters";

const traitsList: CdocsTraitsList = {
  traits: ["api_type", "os", "prog_lang"],
  pages: {
    "tracing/setup": [1, 2],
    "tracing/api": [0],
  },
};

const pageUrl = "https://docs.example.com/guides/current/";

function addPreferences(
  href: string,
  preferences: Record<string, string> = { os: "linux", prog_lang: "python" },
  pathPrefix = "",
) {
  return addPreferencesToHref({
    href,
    pageUrl,
    traitsList,
    preferences,
    pathPrefix,
  });
}

describe("addPreferencesToHref", () => {
  it("adds the stored preferences a bare Cdocs link accepts, alphabetically", () => {
    expect(addPreferences("/tracing/setup/")).toBe(
      "/tracing/setup/?os=linux&prog_lang=python",
    );
  });

  it("leaves out preferences the page doesn't accept", () => {
    expect(
      addPreferences("/tracing/api/", { os: "linux", api_type: "dd_api" }),
    ).toBe("/tracing/api/?api_type=dd_api");
  });

  it("doesn't change params already on the link", () => {
    expect(addPreferences("/tracing/setup/?os=windows")).toBe(
      "/tracing/setup/?os=windows&prog_lang=python",
    );
  });

  it("keeps params that aren't traits, and the fragment", () => {
    expect(addPreferences("/tracing/setup/?tab=1#install")).toBe(
      "/tracing/setup/?os=linux&prog_lang=python&tab=1#install",
    );
  });

  it("matches the page with or without a trailing slash", () => {
    expect(addPreferences("/tracing/setup")).toBe(
      "/tracing/setup?os=linux&prog_lang=python",
    );
  });

  it("resolves relative links against the page URL", () => {
    expect(addPreferences("../../tracing/setup/")).toBe(
      "/tracing/setup/?os=linux&prog_lang=python",
    );
  });

  it("matches pages under the deploy path prefix", () => {
    expect(
      addPreferences("/my-branch/tracing/setup/", undefined, "/my-branch"),
    ).toBe("/my-branch/tracing/setup/?os=linux&prog_lang=python");
  });

  it("leaves links to pages that aren't Cdocs pages alone", () => {
    expect(addPreferences("/tracing/other/")).toBeNull();
  });

  it("leaves links to other sites alone", () => {
    expect(addPreferences("https://example.org/tracing/setup/")).toBeNull();
  });

  it("leaves the link alone when there's nothing to add", () => {
    expect(addPreferences("/tracing/setup/", {})).toBeNull();
    expect(
      addPreferences("/tracing/setup/?os=windows&prog_lang=go"),
    ).toBeNull();
  });

  it("leaves links that aren't web URLs alone", () => {
    expect(addPreferences("mailto:docs@example.com")).toBeNull();
    expect(addPreferences("#install")).toBeNull();
  });
});

describe("addOfferedParamsToHref", () => {
  const customizationConfig = loadCustomizationConfig({
    configDir: fileURLToPath(
      new URL(
        "../../../tests/fixtures/cdocsPages/customization_config",
        import.meta.url,
      ),
    ),
    langs: ["en"],
  }).customizationConfigByLang.en;

  const hostFilter: CdocContentFilter = {
    trait_id: "host",
    option_group_id: "host_options",
  };
  const databaseFilter: CdocContentFilter = {
    trait_id: "database",
    option_group_id: "<HOST>_database_options",
  };
  // Listed before the host filter it depends on.
  const azureOnlyOsFilter: CdocContentFilter = {
    trait_id: "os",
    option_group_id: "os_options",
    show_if: [{ host: ["azure"] }],
  };

  const linkTargetsById = new Map([
    [
      "guides/database",
      buildCdocsLinkTarget({
        contentFilters: [hostFilter, databaseFilter],
        customizationConfig,
      }),
    ],
    [
      "guides/os",
      buildCdocsLinkTarget({
        contentFilters: [azureOnlyOsFilter, hostFilter],
        customizationConfig,
      }),
    ],
  ]);

  function addParams(href: string, params: Record<string, string>) {
    return addOfferedParamsToHref({ href, pageUrl, linkTargetsById, params });
  }

  it("adds the params whose values the page offers, alphabetically", () => {
    expect(
      addParams("/guides/database/", { host: "azure", database: "cosmos_db" }),
    ).toBe("/guides/database/?database=cosmos_db&host=azure");
  });

  it("leaves out a value the page doesn't offer", () => {
    expect(
      addParams("/guides/database/", { host: "gcp", database: "postgres" }),
    ).toBe("/guides/database/?database=postgres");
  });

  it("leaves out a value another value rules out", () => {
    // Cosmos DB is an Azure option.
    expect(
      addParams("/guides/database/", { host: "aws", database: "cosmos_db" }),
    ).toBe("/guides/database/?host=aws");
    expect(
      addParams("/guides/database/?host=aws", { database: "cosmos_db" }),
    ).toBeNull();
  });

  it("leaves out a value the default of a missing param rules out", () => {
    // Without a host, the page shows AWS, which doesn't offer Cosmos DB.
    expect(
      addParams("/guides/database/", { database: "cosmos_db" }),
    ).toBeNull();
  });

  it("adds a value whose filter is shown by another added value", () => {
    expect(addParams("/guides/os/", { host: "azure", os: "windows" })).toBe(
      "/guides/os/?host=azure&os=windows",
    );
  });

  it("leaves out a value for a filter that's hidden", () => {
    expect(addParams("/guides/os/", { host: "aws", os: "windows" })).toBe(
      "/guides/os/?host=aws",
    );
  });

  it("doesn't change params already on the link", () => {
    expect(
      addParams("/guides/database/?host=aws", { host: "azure" }),
    ).toBeNull();
  });

  it("ignores the link's own params when they don't hold", () => {
    expect(addParams("/guides/database/?host=gcp", { database: "aurora" })).toBe(
      "/guides/database/?database=aurora&host=gcp",
    );
  });

  it("leaves links to pages that aren't Cdocs pages alone", () => {
    expect(addParams("/guides/other/", { host: "aws" })).toBeNull();
  });
});
