import { describe, it, expect } from "vitest";
import { listOnDemandSitemapPaths } from "./onDemandPages";
import { buildCdocsPage } from "@lib/cdocs/pageLists";
import { GET as getOnDemandPagesRoute } from "../../pages/on-demand-pages-index.json";
import { customizationConfig } from "../../../tests/fixtures/cdocsDependentFilters/customizationConfig";

const page = buildCdocsPage({
  id: "guides/setup",
  title: "Setup",
  contentFilters: [
    { trait_id: "host", option_group_id: "host_options" },
    { trait_id: "database", option_group_id: "<HOST>_database_options" },
  ],
  customizationConfig,
});

describe("listOnDemandSitemapPaths", () => {
  it("lists each Cdocs variant's canonical URL, with the bare URL for the default variant", () => {
    expect(listOnDemandSitemapPaths([page])).toEqual([
      "/guides/setup/",
      "/guides/setup/?database=postgres&host=aws",
      "/guides/setup/?database=cosmos_db&host=azure",
      "/guides/setup/?database=postgres&host=azure",
    ]);
  });
});

describe("the on-demand pages intermediate file's route", () => {
  it("lists every Cdocs variant in the content collection", async () => {
    const response = await getOnDemandPagesRoute(
      {} as Parameters<typeof getOnDemandPagesRoute>[0],
    );
    const paths: string[] = JSON.parse(await response.text());
    const customInstrumentationPaths = paths.filter((path) =>
      path.startsWith("/dd_e2e/cdocs/custom_instrumentation/"),
    );

    // Four languages, two APIs.
    expect(customInstrumentationPaths).toHaveLength(8);
    expect(customInstrumentationPaths[0]).toBe(
      "/dd_e2e/cdocs/custom_instrumentation/",
    );
  });
});
