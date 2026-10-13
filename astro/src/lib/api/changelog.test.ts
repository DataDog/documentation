import { describe, expect, it } from "vitest";
import {
  buildChangelogPages,
  changelogHref,
  changelogMarkdownHref,
  changelogPageTitle,
  formatChangelogDate,
  getChangelogView,
  groupByDate,
  loadRawChangelogFiles,
  normalizeChangelog,
  renderChangelogMarkdown,
  resolveChangelogEntries,
  splitInlineCode,
  toChangelogBucket,
  type ChangelogBucket,
  type ChangelogEntry,
  type ResolvedChangelogEntry,
} from "./changelog";
import { buildMarkdocStr } from "@lib/plaintext/helpers";
import { getCategoriesView, getCategoryStubsView } from "./viewsBuilder";

function makeEntry(overrides: Partial<ChangelogEntry> = {}): ChangelogEntry {
  return {
    productSlug: "dashboards",
    date: "2026-10-08",
    bucket: "modified",
    title: "A change",
    operationIds: [],
    ...overrides,
  };
}

function makeEntries(count: number, bucket: ChangelogBucket): ChangelogEntry[] {
  return Array.from({ length: count }, (_, index) =>
    makeEntry({ bucket, title: `${bucket} ${index}` }),
  );
}

describe("loadRawChangelogFiles", () => {
  it("reads the frozen fixture, not the live Hugo data", () => {
    expect(Object.keys(loadRawChangelogFiles()).sort()).toEqual([
      "ai-impact",
      "dashboards",
      "incidents",
    ]);
  });
});

describe("toChangelogBucket", () => {
  it.each([
    ["added", "added"],
    ["addition", "added"],
    ["modified", "modified"],
    ["changed", "modified"],
    ["deprecated", "deprecated"],
    ["deprecation", "deprecated"],
    ["removed", "breaking"],
    ["breaking", "breaking"],
  ])("maps %s to %s", (rawType, bucket) => {
    expect(toChangelogBucket(rawType)).toBe(bucket);
  });

  it("ignores case and surrounding whitespace", () => {
    expect(toChangelogBucket(" Removed ")).toBe("breaking");
    expect(toChangelogBucket("ADDED")).toBe("added");
  });

  it("maps a missing type to modified", () => {
    expect(toChangelogBucket(undefined)).toBe("modified");
  });

  it("maps an unknown type to modified", () => {
    expect(toChangelogBucket("renamed")).toBe("modified");
  });
});

describe("normalizeChangelog", () => {
  it("sorts by date descending, then product slug, then title", () => {
    const entries = normalizeChangelog({
      zeta: `entries:
  - { change_type: added, date: "2026-10-08", title: "B" }
  - { change_type: added, date: "2026-10-08", title: "A" }`,
      alpha: `entries:
  - { change_type: added, date: "2026-10-06", title: "Old" }
  - { change_type: added, date: "2026-10-08", title: "Z" }`,
    });
    expect(
      entries.map(
        (entry) => `${entry.date} ${entry.productSlug} ${entry.title}`,
      ),
    ).toEqual([
      "2026-10-08 alpha Z",
      "2026-10-08 zeta A",
      "2026-10-08 zeta B",
      "2026-10-06 alpha Old",
    ]);
  });

  it("defaults the title, type and operations, and drops the link", () => {
    const [entry] = normalizeChangelog({
      events: `entries:
  - date: "2026-10-08"
    link: https://example.com/pull/1`,
    });
    expect(entry).toEqual({
      productSlug: "events",
      date: "2026-10-08",
      bucket: "modified",
      title: "API change",
      operationIds: [],
    });
  });

  it("throws, naming the file, when a file doesn't match the schema", () => {
    expect(() =>
      normalizeChangelog({ events: `entries:\n  - title: "No date"` }),
    ).toThrow(/events/);
  });

  it("throws, naming the file, when a file isn't valid YAML", () => {
    expect(() => normalizeChangelog({ events: "entries: [" })).toThrow(
      /events/,
    );
  });

  it("normalizes the fixture", () => {
    const entries = normalizeChangelog(loadRawChangelogFiles());
    expect(
      entries.map((entry) => [entry.date, entry.productSlug, entry.bucket]),
    ).toEqual([
      ["2026-10-08", "ai-impact", "breaking"],
      ["2026-10-08", "dashboards", "modified"],
      ["2026-10-08", "incidents", "added"],
      ["2026-10-07", "incidents", "deprecated"],
      ["2026-10-06", "dashboards", "modified"],
      ["2026-10-02", "ai-impact", "added"],
    ]);
  });
});

describe("resolveChangelogEntries", () => {
  it("names and links a product that has a category page", async () => {
    const [entry] = resolveChangelogEntries(
      [makeEntry({ productSlug: "dashboards" })],
      await getCategoriesView("en"),
      "en",
    );
    expect(entry.product).toEqual({
      name: "Dashboards",
      href: "/api/latest/dashboards/",
    });
  });

  it("localizes a product's name and href", async () => {
    const jaStubs = await getCategoryStubsView("ja");
    const jaName = jaStubs.find((stub) => stub.slug === "dashboards")!.name;
    const [entry] = resolveChangelogEntries(
      [makeEntry({ productSlug: "dashboards" })],
      await getCategoriesView("ja"),
      "ja",
    );
    expect(entry.product).toEqual({
      name: jaName,
      href: "/ja/api/latest/dashboards/",
    });
  });

  it("title-cases the slug of a product with no category page, unlinked", async () => {
    const [entry] = resolveChangelogEntries(
      [makeEntry({ productSlug: "ai-impact" })],
      await getCategoriesView("en"),
      "en",
    );
    expect(entry.product).toEqual({ name: "Ai Impact" });
  });

  it("links known operations and leaves unknown ones unlinked", async () => {
    const [entry] = resolveChangelogEntries(
      [makeEntry({ operationIds: ["ListDashboards", "GetDashboardUsage"] })],
      await getCategoriesView("ja"),
      "ja",
    );
    expect(entry.operations).toEqual([
      {
        operationId: "ListDashboards",
        href: "/ja/api/latest/dashboards/get-all-dashboards/",
      },
      { operationId: "GetDashboardUsage" },
    ]);
  });

  it("finds a product whose category page has an overridden slug", () => {
    const categories = [
      { slug: "cases", name: "Case Management", operations: [] },
    ];
    const [entry] = resolveChangelogEntries(
      [makeEntry({ productSlug: "case-management" })],
      categories,
      "en",
    );
    expect(entry.product).toEqual({
      name: "Case Management",
      href: "/api/latest/cases/",
    });
  });

  it("links an operation ID to the first category that has it", () => {
    const operation = { operationId: "SharedOp", slug: "shared-op" };
    const categories = [
      { slug: "first", name: "First", operations: [operation] },
      { slug: "second", name: "Second", operations: [operation] },
    ];
    const [entry] = resolveChangelogEntries(
      [makeEntry({ operationIds: ["SharedOp"] })],
      categories,
      "en",
    );
    expect(entry.operations[0].href).toBe("/api/latest/first/shared-op/");
  });
});

describe("buildChangelogPages", () => {
  function summarize(pages: ReturnType<typeof buildChangelogPages>) {
    return pages.map((page) => ({
      pathParam: page.pathParam,
      count: page.entries.length,
      totalPages: page.totalPages,
    }));
  }

  it("emits page 1 of every filter when there are no entries", () => {
    expect(summarize(buildChangelogPages([]))).toEqual([
      { pathParam: undefined, count: 0, totalPages: 1 },
      { pathParam: "added", count: 0, totalPages: 1 },
      { pathParam: "modified", count: 0, totalPages: 1 },
      { pathParam: "breaking", count: 0, totalPages: 1 },
    ]);
  });

  it("fits exactly one page size on one page", () => {
    const allPages = buildChangelogPages(makeEntries(20, "added")).filter(
      (page) => page.filter === "all",
    );
    expect(summarize(allPages)).toEqual([
      { pathParam: undefined, count: 20, totalPages: 1 },
    ]);
  });

  it("spills one entry over a page size onto page 2", () => {
    const allPages = buildChangelogPages(makeEntries(21, "added")).filter(
      (page) => page.filter === "all",
    );
    expect(summarize(allPages)).toEqual([
      { pathParam: undefined, count: 20, totalPages: 2 },
      { pathParam: "2", count: 1, totalPages: 2 },
    ]);
  });

  it("paginates each filter separately, keeping deprecated under All only", () => {
    const entries = [
      ...makeEntries(25, "added"),
      ...makeEntries(15, "modified"),
      ...makeEntries(5, "deprecated"),
    ];
    expect(summarize(buildChangelogPages(entries))).toEqual([
      { pathParam: undefined, count: 20, totalPages: 3 },
      { pathParam: "2", count: 20, totalPages: 3 },
      { pathParam: "3", count: 5, totalPages: 3 },
      { pathParam: "added", count: 20, totalPages: 2 },
      { pathParam: "added/2", count: 5, totalPages: 2 },
      { pathParam: "modified", count: 15, totalPages: 1 },
      { pathParam: "breaking", count: 0, totalPages: 1 },
    ]);
  });

  it("keeps entry order within each page", () => {
    const entries = makeEntries(3, "added");
    const [allPage] = buildChangelogPages(entries, 2);
    expect(allPage.entries).toEqual(entries.slice(0, 2));
    expect(allPage.pageNumber).toBe(1);
  });
});

describe("changelogHref", () => {
  it.each([
    ["en", "all", 1, "/api/changelog/"],
    ["en", "all", 2, "/api/changelog/2/"],
    ["en", "added", 1, "/api/changelog/added/"],
    ["en", "breaking", 3, "/api/changelog/breaking/3/"],
    ["ja", "all", 1, "/ja/api/changelog/"],
    ["ja", "modified", 2, "/ja/api/changelog/modified/2/"],
  ] as const)("%s %s page %d → %s", (lang, filter, pageNumber, href) => {
    expect(changelogHref(lang, filter, pageNumber)).toBe(href);
  });
});

describe("groupByDate", () => {
  it("groups consecutive entries by date, keeping order", () => {
    const entries = [
      makeEntry({ date: "2026-10-08", title: "A" }),
      makeEntry({ date: "2026-10-08", title: "B" }),
      makeEntry({ date: "2026-10-06", title: "C" }),
    ];
    expect(
      groupByDate(entries).map((group) => ({
        date: group.date,
        titles: group.entries.map((entry) => entry.title),
      })),
    ).toEqual([
      { date: "2026-10-08", titles: ["A", "B"] },
      { date: "2026-10-06", titles: ["C"] },
    ]);
  });

  it("returns no groups for no entries", () => {
    expect(groupByDate([])).toEqual([]);
  });
});

describe("getChangelogView", () => {
  it("resolves the fixture for a locale", async () => {
    const entries = await getChangelogView("en");
    expect(entries).toHaveLength(6);
    expect(entries[1]).toMatchObject({
      productSlug: "dashboards",
      product: { name: "Dashboards", href: "/api/latest/dashboards/" },
      title: "Add Heatgrid dashboard widget support",
    });
  });

  it("memoizes per locale", async () => {
    expect(await getChangelogView("en")).toBe(await getChangelogView("en"));
  });
});

describe("renderChangelogMarkdown", () => {
  function makeResolvedEntry(
    overrides: Partial<ResolvedChangelogEntry> = {},
  ): ResolvedChangelogEntry {
    return {
      ...makeEntry(),
      product: { name: "Dashboards", href: "/api/latest/dashboards/" },
      operations: [],
      ...overrides,
    };
  }

  it("groups entries under date headings, linking what it can", () => {
    const markdown = buildMarkdocStr(
      renderChangelogMarkdown([
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
          productSlug: "ai-impact",
          product: { name: "Ai Impact" },
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

Review recent additions, modifications, and removals to Datadog API operations.

## 2026-10-08

- **Added**: [Dashboards](/api/latest/dashboards/): Add Heatgrid widget (Operations: [\`ListDashboards\`](/api/latest/dashboards/get-all-dashboards/), \`GetDashboardUsage\`)
- **Breaking**: Ai Impact: Remove an endpoint

## 2026-10-06

- **Deprecated**: [Dashboards](/api/latest/dashboards/): Deprecate an endpoint
`);
  });

  it("renders backtick spans in a title as code nodes", () => {
    const nodes = renderChangelogMarkdown([
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
    expect(buildMarkdocStr(renderChangelogMarkdown([]))).toBe(`# Changelog

Review recent additions, modifications, and removals to Datadog API operations.

No API changes have been published yet.
`);
  });
});

describe("splitInlineCode", () => {
  it("returns one text part when there are no backticks", () => {
    expect(splitInlineCode("Add an endpoint")).toEqual([
      { text: "Add an endpoint", isCode: false },
    ]);
  });

  it("splits out one code span", () => {
    expect(splitInlineCode("Limit tags on `UpdateDeviceUserTags`")).toEqual([
      { text: "Limit tags on ", isCode: false },
      { text: "UpdateDeviceUserTags", isCode: true },
    ]);
  });

  it("splits out several code spans", () => {
    expect(splitInlineCode("`A` and `B` changed")).toEqual([
      { text: "A", isCode: true },
      { text: " and ", isCode: false },
      { text: "B", isCode: true },
      { text: " changed", isCode: false },
    ]);
  });

  it("leaves an unmatched backtick literal", () => {
    expect(splitInlineCode("`A` and a stray ` tick")).toEqual([
      { text: "A", isCode: true },
      { text: " and a stray ` tick", isCode: false },
    ]);
  });

  it("treats markup as text", () => {
    expect(splitInlineCode("Fix `<b>` and <i>")).toEqual([
      { text: "Fix ", isCode: false },
      { text: "<b>", isCode: true },
      { text: " and <i>", isCode: false },
    ]);
  });
});

describe("changelogPageTitle", () => {
  it.each([
    ["all", 1, "API Changelog"],
    ["all", 2, "API Changelog, page 2"],
    ["added", 1, "Added changes - API Changelog"],
    ["breaking", 2, "Breaking changes, page 2 - API Changelog"],
  ] as const)("%s page %d → %s", (filter, pageNumber, title) => {
    expect(changelogPageTitle(filter, pageNumber)).toBe(title);
  });
});

describe("changelogMarkdownHref", () => {
  it("points every page at the one localized .md twin", () => {
    expect(changelogMarkdownHref("en")).toBe("/api/changelog.md");
    expect(changelogMarkdownHref("ja")).toBe("/ja/api/changelog.md");
  });
});

describe("formatChangelogDate", () => {
  it("formats a date for the locale without shifting its day", () => {
    expect(formatChangelogDate("2026-10-08", "en")).toBe("Oct 8, 2026");
    expect(formatChangelogDate("2026-01-01", "en")).toBe("Jan 1, 2026");
  });

  it("localizes the format", () => {
    expect(formatChangelogDate("2026-10-08", "ja")).toBe(
      new Intl.DateTimeFormat("ja", {
        dateStyle: "medium",
        timeZone: "UTC",
      }).format(new Date("2026-10-08T00:00:00Z")),
    );
  });
});
