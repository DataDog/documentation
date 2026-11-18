import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { loadCustomizationConfig } from "cdocs-data/loadCustomizationConfig";
import {
  buildCdocsPage,
  buildCdocsTraitsList,
  getCdocsPages,
  getCdocsTraitsListJson,
  getCdocsTraitsListUrl,
  type CdocsPage,
} from "./cdocsPages";
import {
  CDOCS_TRAITS_INTERMEDIATE_FILE,
  cdocsTraitsListPath,
} from "./traitsListFile";
import { GET as getTraitsListRoute } from "../../pages/cdocs-traits-index.json";
import type { CdocContentFilter } from "./filters";

const configDir = fileURLToPath(
  new URL(
    "../../../tests/fixtures/cdocsPages/customization_config",
    import.meta.url,
  ),
);
const customizationConfig = loadCustomizationConfig({
  configDir,
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
const osFilter: CdocContentFilter = {
  trait_id: "os",
  option_group_id: "os_options",
};

function buildPage(contentFilters: CdocContentFilter[]): CdocsPage {
  return buildCdocsPage({
    id: "guides/setup",
    title: "Setup",
    contentFilters,
    customizationConfig,
  });
}

const variantUrls = (page: CdocsPage) =>
  page.variants.map((variant) => variant.url);

describe("buildCdocsPage", () => {
  it("returns the bare URL and the traits the page accepts, alphabetically", () => {
    const page = buildPage([hostFilter, databaseFilter, osFilter]);

    expect(page.id).toBe("guides/setup");
    expect(page.title).toBe("Setup");
    expect(page.bareUrl).toBe("/guides/setup/");
    expect(page.traitIds).toEqual(["database", "host", "os"]);
  });

  it("lists one variant per option for a single filter", () => {
    expect(variantUrls(buildPage([osFilter]))).toEqual([
      "/guides/setup/?os=linux",
      "/guides/setup/?os=windows",
    ]);
  });

  it("lists only the options each dependent filter offers", () => {
    // Aurora is an AWS option and Cosmos DB is an Azure option, so neither
    // appears with the other host.
    expect(variantUrls(buildPage([hostFilter, databaseFilter]))).toEqual([
      "/guides/setup/?database=aurora&host=aws",
      "/guides/setup/?database=postgres&host=aws",
      "/guides/setup/?database=cosmos_db&host=azure",
      "/guides/setup/?database=postgres&host=azure",
    ]);
  });

  it("orders params alphabetically by trait, whatever the frontmatter order", () => {
    const urls = variantUrls(buildPage([osFilter, hostFilter]));

    expect(urls).toContain("/guides/setup/?host=azure&os=windows");
    for (const url of urls) {
      const traitIds = [...new URL(url, "https://x").searchParams.keys()];
      expect(traitIds).toEqual([...traitIds].sort());
    }
  });

  it("leaves a hidden filter out of the variants it's hidden on", () => {
    const azureOnlyOsFilter: CdocContentFilter = {
      ...osFilter,
      show_if: [{ host: ["azure"] }],
    };

    expect(variantUrls(buildPage([hostFilter, azureOnlyOsFilter]))).toEqual([
      "/guides/setup/?host=aws",
      "/guides/setup/?host=azure&os=linux",
      "/guides/setup/?host=azure&os=windows",
    ]);
  });

  it("finds every variant when a filter depends on a later filter", () => {
    // The OS filter is listed first but shown only for Azure, so it can't be
    // decided until the host is known.
    const azureOnlyOsFilter: CdocContentFilter = {
      ...osFilter,
      show_if: [{ host: ["azure"] }],
    };

    expect(
      variantUrls(buildPage([azureOnlyOsFilter, hostFilter])).sort(),
    ).toEqual([
      "/guides/setup/?host=aws",
      "/guides/setup/?host=azure&os=linux",
      "/guides/setup/?host=azure&os=windows",
    ]);
  });

  it("gives each variant its values and labels, in frontmatter order", () => {
    const page = buildPage([{ ...hostFilter, label: "Cloud" }, databaseFilter]);
    const variant = page.variants.find(
      (candidate) =>
        candidate.url === "/guides/setup/?database=cosmos_db&host=azure",
    );

    expect(variant?.valsByTraitId).toEqual({
      host: "azure",
      database: "cosmos_db",
    });
    expect(variant?.labels).toEqual([
      {
        traitId: "host",
        traitLabel: "Cloud",
        optionId: "azure",
        optionLabel: "Azure",
      },
      {
        traitId: "database",
        traitLabel: "Database",
        optionId: "cosmos_db",
        optionLabel: "Cosmos DB",
      },
    ]);
  });
});

describe("buildCdocsTraitsList", () => {
  it("lists every trait once, and each page's traits by index", () => {
    const pages = [
      { ...buildPage([hostFilter, databaseFilter]), id: "guides/setup" },
      { ...buildPage([osFilter]), id: "guides/install" },
    ];

    expect(buildCdocsTraitsList(pages)).toEqual({
      traits: ["database", "host", "os"],
      pages: {
        "guides/setup": [0, 1],
        "guides/install": [2],
      },
    });
  });

  it("is the same whatever order the pages come in", () => {
    const setupPage = buildPage([hostFilter, databaseFilter]);
    const installPage = { ...buildPage([osFilter]), id: "guides/install" };

    expect(JSON.stringify(buildCdocsTraitsList([setupPage, installPage]))).toBe(
      JSON.stringify(buildCdocsTraitsList([installPage, setupPage])),
    );
  });
});

describe("getCdocsPages", () => {
  it("returns every cdocs page in the content collection", async () => {
    const pages = await getCdocsPages();
    const customInstrumentation = pages.find(
      (page) => page.id === "dd_e2e/cdocs/custom_instrumentation",
    );

    expect(pages.map((page) => page.id)).toEqual([
      "dd_e2e/cdocs/api_support",
      "dd_e2e/cdocs/custom_instrumentation",
    ]);
    expect(customInstrumentation?.traitIds).toEqual(["api_type", "prog_lang"]);
    // Four languages, two APIs.
    expect(customInstrumentation?.variants).toHaveLength(8);
    expect(customInstrumentation?.variants[0].url).toBe(
      "/dd_e2e/cdocs/custom_instrumentation/?api_type=otel_api&prog_lang=java",
    );
  });
});

describe("the traits list file", () => {
  it("covers every cdocs page and the traits it accepts", async () => {
    expect(JSON.parse(await getCdocsTraitsListJson())).toEqual({
      traits: ["api_type", "platform", "prog_lang"],
      pages: {
        "dd_e2e/cdocs/api_support": [1, 2],
        "dd_e2e/cdocs/custom_instrumentation": [0, 2],
      },
    });
  });

  it("is what the intermediate file's route serves, byte for byte", async () => {
    // The server names the file from this JSON, and the build names it from
    // the intermediate file, so the two must match exactly.
    const response = await getTraitsListRoute(
      {} as Parameters<typeof getTraitsListRoute>[0],
    );

    expect(await response.text()).toBe(await getCdocsTraitsListJson());
  });

  it("is served from the intermediate file's route in dev, and the hashed file otherwise", async () => {
    const json = await getCdocsTraitsListJson();

    expect(await getCdocsTraitsListUrl({ isDev: true })).toBe(
      `/${CDOCS_TRAITS_INTERMEDIATE_FILE}`,
    );
    expect(await getCdocsTraitsListUrl({ isDev: false })).toBe(
      `/${cdocsTraitsListPath(json)}`,
    );
  });
});
