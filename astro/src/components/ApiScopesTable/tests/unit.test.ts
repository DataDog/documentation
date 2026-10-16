import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import ApiScopesTable from "../ApiScopesTable.astro";
import type { ScopeGroup } from "@lib/api/scopesBuilder";
import { getScopeGroupsView } from "@lib/api/scopesBuilder";

// The container has no i18n manifest, so `Astro.currentLocale` is undefined and
// links render unprefixed (English).

const syntheticGroups: ScopeGroup[] = [
  {
    heading: "CI Visibility GitHub Accounts, Monitors",
    anchors: [
      "ci-visibility-github-accounts",
      "ci-visibility-git-hub-accounts",
      "monitors",
    ],
    scopes: [
      {
        name: "monitors_read",
        description: "View monitors.",
        endpoints: [
          {
            summary: "Get a monitor",
            href: "/api/latest/monitors/#get-a-monitor",
          },
          {
            summary: "Get all monitors",
            href: "/api/latest/monitors/#get-all-monitors",
          },
        ],
      },
    ],
  },
  {
    heading: "Monitors, Synthetics",
    anchors: [],
    scopes: [
      {
        name: "synthetics_read",
        description: "",
        endpoints: [
          { summary: "Get a test", href: "/api/latest/synthetics/#get-a-test" },
        ],
      },
    ],
  },
];

const renderTable = async (groups?: ScopeGroup[]) => {
  const container = await AstroContainer.create();
  return container.renderToString(ApiScopesTable, {
    props: groups ? { groups } : {},
  });
};

const countOf = (html: string, pattern: RegExp) =>
  [...html.matchAll(new RegExp(pattern, "g"))].length;

describe("ApiScopesTable", () => {
  it("renders one h3 heading and one table per group", async () => {
    const html = await renderTable(syntheticGroups);

    expect(countOf(html, /<h3[^>]*class="[^"]*api-scopes-table__heading/)).toBe(
      2,
    );
    expect(
      countOf(html, /<table[^>]*class="[^"]*api-scopes-table__table/),
    ).toBe(2);
    expect(html).toMatch(/>CI Visibility GitHub Accounts, Monitors<\/h3>/);
    expect(html).toMatch(/>Monitors, Synthetics<\/h3>/);
  });

  it("renders the three column headers", async () => {
    const html = await renderTable(syntheticGroups);

    expect(html).toMatch(
      /<th[^>]*>Scope name<\/th>\s*<th[^>]*>Description<\/th>\s*<th[^>]*>Endpoints that require this scope<\/th>/,
    );
  });

  it("renders every anchor, including aliases, before its heading", async () => {
    const html = await renderTable(syntheticGroups);
    const firstHeadingIndex = html.indexOf("<h3");

    for (const anchor of syntheticGroups[0].anchors) {
      const anchorIndex = html.indexOf(`id="${anchor}"`);
      expect(anchorIndex, anchor).toBeGreaterThan(-1);
      expect(anchorIndex, anchor).toBeLessThan(firstHeadingIndex);
    }
    expect(countOf(html, /class="[^"]*api-scopes-table__anchor/)).toBe(3);
  });

  it("renders a row per scope with its name, description, and endpoint links", async () => {
    const html = await renderTable(syntheticGroups);

    expect(html).toMatch(
      /<code[^>]*class="[^"]*api-scopes-table__scope-name[^"]*"[^>]*>monitors_read<\/code>/,
    );
    expect(html).toContain("View monitors.");
    expect(html).toMatch(
      /<a[^>]*href="\/api\/latest\/monitors\/#get-a-monitor"[^>]*>Get a monitor<\/a>/,
    );
    expect(html).toMatch(
      /<a[^>]*href="\/api\/latest\/monitors\/#get-all-monitors"[^>]*>Get all monitors<\/a>/,
    );
    expect(countOf(html, /class="[^"]*\bapi-scopes-table__endpoint\b/)).toBe(3);
  });

  it("defaults to the scope groups built from the spec", async () => {
    const html = await renderTable();
    const groups = getScopeGroupsView();

    expect(groups.length).toBeGreaterThan(0);
    expect(countOf(html, /<h3/)).toBe(groups.length);
  });
});
