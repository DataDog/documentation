import { describe, it, expect } from "vitest";
import { buildFilterOptionLinks } from "./filterOptionLinks";
import type { CdocContentFilter } from "./filters";
import { customizationConfig } from "../../../tests/fixtures/cdocsDependentFilters/customizationConfig";

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

describe("buildFilterOptionLinks", () => {
  function buildLinks(
    contentFilters: CdocContentFilter[],
    valsByTraitId: Record<string, string>,
  ) {
    return buildFilterOptionLinks({
      bareUrl: "/guides/setup/",
      contentFilters,
      valsByTraitId,
      customizationConfig,
    });
  }

  const optionUrls = (links: ReturnType<typeof buildLinks>, traitId: string) =>
    Object.fromEntries(
      links
        .find((filter) => filter.traitId === traitId)!
        .options.map((option) => [option.id, option.url]),
    );

  it("links each option to its variant, keeping the other values", () => {
    const links = buildLinks([osFilter, hostFilter], {
      os: "windows",
      host: "aws",
    });

    expect(optionUrls(links, "host")).toEqual({
      aws: "/guides/setup/?host=aws&os=windows",
      azure: "/guides/setup/?host=azure&os=windows",
    });
  });

  it("marks the current value as selected", () => {
    const links = buildLinks([osFilter], { os: "windows" });

    expect(
      links[0].options.map((option) => [option.id, option.isSelected]),
    ).toEqual([
      ["linux", false],
      ["windows", true],
    ]);
  });

  it("resets a dependent value the new option doesn't offer", () => {
    const links = buildLinks([hostFilter, databaseFilter], {
      host: "aws",
      database: "aurora",
    });

    // Aurora isn't an Azure option, so the Azure link uses Azure's default.
    expect(optionUrls(links, "host").azure).toBe(
      "/guides/setup/?database=cosmos_db&host=azure",
    );
  });

  it("keeps a dependent value the new option also offers", () => {
    const links = buildLinks([hostFilter, databaseFilter], {
      host: "aws",
      database: "postgres",
    });

    expect(optionUrls(links, "host").azure).toBe(
      "/guides/setup/?database=postgres&host=azure",
    );
  });

  it("drops a filter the new option hides", () => {
    const azureOnlyOsFilter: CdocContentFilter = {
      ...osFilter,
      show_if: [{ host: ["azure"] }],
    };
    const links = buildLinks([hostFilter, azureOnlyOsFilter], {
      host: "azure",
      os: "windows",
    });

    expect(optionUrls(links, "host")).toEqual({
      aws: "/guides/setup/?host=aws",
      azure: "/guides/setup/?host=azure&os=windows",
    });
  });

  it("lists only shown filters, with the labels of each option's variant", () => {
    const azureOnlyOsFilter: CdocContentFilter = {
      ...osFilter,
      show_if: [{ host: ["azure"] }],
    };
    const links = buildLinks([hostFilter, azureOnlyOsFilter], { host: "aws" });

    expect(links.map((filter) => [filter.traitId, filter.label])).toEqual([
      ["host", "Host"],
    ]);
    expect(links[0].options[1].labels).toEqual([
      {
        traitId: "host",
        traitLabel: "Host",
        optionId: "azure",
        optionLabel: "Azure",
      },
      {
        traitId: "os",
        traitLabel: "Operating system",
        optionId: "linux",
        optionLabel: "Linux",
      },
    ]);
  });
});
