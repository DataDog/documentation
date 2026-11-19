// @vitest-environment happy-dom
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, cleanup } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { h } from "preact";

// `navigate` from astro:transitions/client isn't available under Vitest; stub it
// so we can assert the client-side navigation target a pill click produces.
const navigate = vi.fn();
vi.mock("astro:transitions/client", () => ({
  navigate: (...args: unknown[]) => navigate(...args),
}));

import CdocsFilterBar from "../CdocsFilterBar";
import { pruneManifestForClient } from "cdocs-data";
import type { CdocContentFilter } from "@lib/cdocs/filters";
import { buildPageFiltersManifest } from "@lib/cdocs/pageFiltersManifest";
import { customizationConfig } from "../../../../tests/fixtures/cdocsDependentFilters/customizationConfig";

const BARE_URL = "/guides/setup/";

// The database options depend on the host (`<HOST>_database_options`).
const contentFilters: CdocContentFilter[] = [
  { trait_id: "host", option_group_id: "host_options" },
  { trait_id: "database", option_group_id: "<HOST>_database_options" },
  { trait_id: "os", option_group_id: "os_options" },
];

const valsByTraitId: Record<string, string> = {
  host: "aws",
  database: "aurora",
  os: "linux",
};

const props = {
  bareUrl: BARE_URL,
  contentFilters,
  filtersManifest: pruneManifestForClient(
    buildPageFiltersManifest(contentFilters, customizationConfig),
  ),
  valsByTraitId,
};

const mount = (overrides: Partial<typeof props> = {}) =>
  render(h(CdocsFilterBar, { ...props, ...overrides }));

const pillLabels = () =>
  [
    ...document.querySelectorAll<HTMLButtonElement>(".cdocs-filter-bar__pill"),
  ].map((button) => button.textContent);

const pill = (label: string) =>
  [
    ...document.querySelectorAll<HTMLButtonElement>(".cdocs-filter-bar__pill"),
  ].find((button) => button.textContent === label)!;

const isSelected = (label: string) =>
  pill(label).classList.contains("cdocs-filter-bar__pill--selected");

beforeEach(() => {
  navigate.mockReset();
  window.history.replaceState({}, "", BARE_URL);
});

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

describe("CdocsFilterBar", () => {
  it("renders a labeled radiogroup of pills per filter", () => {
    mount();
    const groups = document.querySelectorAll(".cdocs-filter-bar__pills");
    expect(groups.length).toBe(3);
    expect(groups[0].getAttribute("role")).toBe("radiogroup");

    const labels = [
      ...document.querySelectorAll(".cdocs-filter-bar__label"),
    ].map((el) => el.textContent);
    expect(labels).toEqual(["Host", "Database", "Operating system"]);

    // The group is labelled by its heading for assistive tech.
    const labelId = document.querySelector(".cdocs-filter-bar__label")!.id;
    expect(groups[0].getAttribute("aria-labelledby")).toBe(labelId);
  });

  it("marks the current value as the selected pill", () => {
    mount();
    expect(isSelected("AWS")).toBe(true);
    expect(pill("AWS").getAttribute("aria-checked")).toBe("true");
    expect(pill("Azure").getAttribute("aria-checked")).toBe("false");
    // Each filter's resolved value drives its selection independently.
    expect(isSelected("Aurora")).toBe(true);
    expect(isSelected("Linux")).toBe(true);
    expect(pill("Windows").getAttribute("aria-checked")).toBe("false");
  });

  it("navigates to the clicked option's URL", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", `${BARE_URL}?host=aws&stale=1`);
    mount();
    await user.click(pill("Windows"));
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(
      `${BARE_URL}?database=aurora&host=aws&os=windows`,
    );
  });

  it("selects the clicked pill before the new page arrives", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(pill("Windows"));

    expect(isSelected("Windows")).toBe(true);
    expect(pill("Windows").getAttribute("aria-checked")).toBe("true");
    expect(isSelected("Linux")).toBe(false);
    expect(pill("Linux").getAttribute("aria-checked")).toBe("false");
    // Other filters keep their selection.
    expect(isSelected("AWS")).toBe(true);
  });

  it("keeps earlier clicks when another filter is clicked before the new page arrives", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(pill("Windows"));
    await user.click(pill("Postgres"));

    expect(navigate).toHaveBeenLastCalledWith(
      `${BARE_URL}?database=postgres&host=aws&os=windows`,
    );
    expect(isSelected("Windows")).toBe(true);
    expect(isSelected("Postgres")).toBe(true);
  });

  it("shows a dependent filter's new options before the new page arrives", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(pill("Azure"));

    expect(navigate).toHaveBeenLastCalledWith(
      `${BARE_URL}?database=cosmos_db&host=azure&os=linux`,
    );
    expect(pillLabels()).toEqual([
      "AWS",
      "Azure",
      "Cosmos DB",
      "Postgres",
      "Linux",
      "Windows",
    ]);
    expect(isSelected("Cosmos DB")).toBe(true);

    await user.click(pill("Postgres"));
    expect(navigate).toHaveBeenLastCalledWith(
      `${BARE_URL}?database=postgres&host=azure&os=linux`,
    );
  });

  it("renders nothing when there are no filters", () => {
    mount({
      contentFilters: [],
      filtersManifest: pruneManifestForClient(
        buildPageFiltersManifest([], customizationConfig),
      ),
      valsByTraitId: {},
    });
    expect(document.querySelector(".cdocs-filter-bar")).toBeNull();
  });
});
