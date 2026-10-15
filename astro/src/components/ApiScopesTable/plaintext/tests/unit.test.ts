import { describe, it, expect } from "vitest";
import { apiScopesTableNodes } from "../ApiScopesTable";
import { buildMarkdocStr } from "@lib/plaintext/helpers";
import type { ScopeGroup } from "@lib/api/scopesBuilder";

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

function renderGroups(
  groups: ScopeGroup[],
  options?: Parameters<typeof apiScopesTableNodes>[1],
): string {
  return buildMarkdocStr(apiScopesTableNodes(groups, options));
}

/** The table row that starts with the given scope name, padding collapsed. */
function rowFor(md: string, scopeName: string): string {
  const row = md
    .split("\n")
    .find((line) => line.startsWith(`| \`${scopeName}\``));
  return (row ?? "").replace(/ {2,}/g, " ");
}

describe("apiScopesTableNodes", () => {
  it("emits an h3 per group, in order", () => {
    const md = renderGroups(syntheticGroups);
    const headings = md.split("\n").filter((line) => line.startsWith("#"));

    expect(headings).toEqual([
      "### CI Visibility GitHub Accounts, Monitors",
      "### Monitors, Synthetics",
    ]);
  });

  it("emits the HTML table's column headers", () => {
    const md = renderGroups(syntheticGroups);

    expect(md.replace(/ {2,}/g, " ")).toContain(
      "| Scope name | Description | Endpoints that require this scope |",
    );
  });

  it("emits a row per scope with its code-formatted name and description", () => {
    const row = rowFor(renderGroups(syntheticGroups), "monitors_read");

    expect(row).toMatch(/^\| `monitors_read` \| View monitors\. \| /);
  });

  it("joins a scope's endpoint links with <br>, pointed at the .md twin", () => {
    const row = rowFor(renderGroups(syntheticGroups), "monitors_read");

    expect(row).toContain(
      "[Get a monitor](/api/latest/monitors.md#get-a-monitor)<br>[Get all monitors](/api/latest/monitors.md#get-all-monitors)",
    );
  });

  it("keeps a row whose description is empty", () => {
    const row = rowFor(renderGroups(syntheticGroups), "synthetics_read");

    expect(row).toMatch(/^\| `synthetics_read` \| \| \[Get a test\]/);
  });

  it("resolves endpoint links against site when one is given", () => {
    const md = renderGroups(syntheticGroups, {
      site: "https://docs.datadoghq.com",
    });

    expect(md).toContain(
      "(https://docs.datadoghq.com/api/latest/monitors.md#get-a-monitor)",
    );
  });

  it("prefixes endpoint links with a non-default locale", () => {
    const md = renderGroups(syntheticGroups, { lang: "ja" });

    expect(md).toContain("(/ja/api/latest/monitors.md#get-a-monitor)");
  });

  it("keeps a summary with balanced brackets as one link", () => {
    const md = renderGroups([
      {
        heading: "Monitors",
        anchors: ["monitors"],
        scopes: [
          {
            name: "monitors_read",
            description: "View monitors.",
            endpoints: [
              { summary: "Get [beta]", href: "/api/latest/monitors/#get" },
            ],
          },
        ],
      },
    ]);

    expect(md).toContain("[Get [beta]](/api/latest/monitors.md#get)");
  });

  it("leaves out the anchors, which plaintext has no way to carry", () => {
    const md = renderGroups(syntheticGroups);

    expect(md).not.toContain("ci-visibility-git-hub-accounts");
  });
});
