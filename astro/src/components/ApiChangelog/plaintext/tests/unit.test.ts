import { describe, it, expect } from "vitest";
import { apiChangelogNodes } from "../ApiChangelog";
import { buildMarkdocStr } from "@lib/plaintext/helpers";
import type { ResolvedChangelogEntry } from "@lib/api/changelog";

function makeResolvedEntry(
  overrides: Partial<ResolvedChangelogEntry> = {},
): ResolvedChangelogEntry {
  return {
    productSlug: "dashboards",
    date: "2026-10-08",
    bucket: "modified",
    title: "A change",
    operationIds: [],
    product: { name: "Dashboards", href: "/api/latest/dashboards/" },
    operations: [],
    ...overrides,
  };
}

describe("apiChangelogNodes", () => {
  it("groups entries under date headings, linking what it can", () => {
    const markdown = buildMarkdocStr(
      apiChangelogNodes([
        makeResolvedEntry({
          bucket: "added",
          title: "Add Heatgrid widget",
          operations: [
            {
              operationId: "ListDashboards",
              href: "/api/latest/dashboards/get-all-dashboards/",
            },
            { operationId: "GetDashboardUsage" },
          ],
        }),
        makeResolvedEntry({
          productSlug: "deployment-gates",
          product: { name: "Deployment Gates" },
          bucket: "breaking",
          title: "Remove an endpoint",
        }),
        makeResolvedEntry({
          date: "2026-10-06",
          bucket: "deprecated",
          title: "Deprecate an endpoint",
        }),
      ]),
    );
    expect(markdown).toBe(`# Changelog

Review recent changes to Datadog API operations, ordered newest first. Entries are maintained by the API product team and collected here in one changelog.

## 2026-10-08

- **Added**: [Dashboards](/api/latest/dashboards/): Add Heatgrid widget (Operations: [\`ListDashboards\`](/api/latest/dashboards/get-all-dashboards/), \`GetDashboardUsage\`)
- **Breaking**: Deployment Gates: Remove an endpoint

## 2026-10-06

- **Deprecated**: [Dashboards](/api/latest/dashboards/): Deprecate an endpoint
`);
  });

  it("renders backtick spans in a title as code nodes", () => {
    const nodes = apiChangelogNodes([
      makeResolvedEntry({
        title: "Limit tags on `UpdateDeviceUserTags` and `GetDevice`",
      }),
    ]);
    const codeContents = [...nodes.at(-1)!.walk()]
      .filter((node) => node.type === "code")
      .map((node) => node.attributes.content);
    expect(codeContents).toEqual(["UpdateDeviceUserTags", "GetDevice"]);
    expect(buildMarkdocStr(nodes)).toContain(
      "Limit tags on `UpdateDeviceUserTags` and `GetDevice`\n",
    );
  });

  it("says so when there are no entries", () => {
    expect(buildMarkdocStr(apiChangelogNodes([]))).toBe(`# Changelog

Review recent changes to Datadog API operations, ordered newest first. Entries are maintained by the API product team and collected here in one changelog.

No API changes have been published yet.
`);
  });
});
