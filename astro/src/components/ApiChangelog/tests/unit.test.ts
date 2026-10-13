import { describe, it, expect } from "vitest";
import { Window } from "happy-dom";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import ApiChangelog from "../ApiChangelog.astro";
import ApiChangelogEmptyState from "../ApiChangelogEmptyState.astro";
import ApiChangelogEntry from "../ApiChangelogEntry.astro";
import ApiChangelogFilterBar from "../ApiChangelogFilterBar.astro";
import ApiChangelogTimeline from "../ApiChangelogTimeline.astro";
import type {
  ChangelogBucket,
  ChangelogPage,
  ResolvedChangelogEntry,
} from "@lib/api/changelog";

// Parsed with a programmatic happy-dom DOMParser, as in MobileNav's unit test,
// because `.astro` imports only compile in the default node environment.
const parserWindow = new Window();

async function render(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any,
  props: Record<string, unknown>,
): Promise<Document> {
  const container = await AstroContainer.create();
  const html = await container.renderToString(component, { props });
  return new parserWindow.DOMParser().parseFromString(
    html,
    "text/html",
  ) as unknown as Document;
}

function makeEntry(
  overrides: Partial<ResolvedChangelogEntry> = {},
): ResolvedChangelogEntry {
  return {
    productSlug: "dashboards",
    date: "2026-10-08",
    bucket: "added",
    title: "Add Heatgrid widget",
    operationIds: [],
    product: { name: "Dashboards", href: "/api/latest/dashboards/" },
    operations: [],
    ...overrides,
  };
}

function makePage(
  overrides: Partial<ChangelogPage<ResolvedChangelogEntry>> = {},
): ChangelogPage<ResolvedChangelogEntry> {
  return {
    filter: "all",
    pageNumber: 1,
    totalPages: 1,
    entries: [makeEntry()],
    pathParam: undefined,
    ...overrides,
  };
}

function text(element: Element | null): string {
  return element?.textContent?.trim() ?? "";
}

describe("ApiChangelogEntry", () => {
  it.each([
    ["added", "Added"],
    ["modified", "Modified"],
    ["deprecated", "Deprecated"],
    ["breaking", "Breaking"],
  ] as const)(
    "gives a %s entry its pill modifier and label",
    async (bucket: ChangelogBucket, label) => {
      const doc = await render(ApiChangelogEntry, {
        entry: makeEntry({ bucket }),
      });
      const pill = doc.querySelector(".api-changelog-entry__pill")!;
      expect(pill.classList).toContain(`api-changelog-entry__pill--${bucket}`);
      expect(text(pill)).toBe(label);
    },
  );

  it("renders the title as a heading", async () => {
    const doc = await render(ApiChangelogEntry, { entry: makeEntry() });
    const title = doc.querySelector("h3.api-changelog-entry__title");
    expect(text(title)).toBe("Add Heatgrid widget");
  });

  it("renders backtick spans in the title as inline code", async () => {
    const doc = await render(ApiChangelogEntry, {
      entry: makeEntry({ title: "Limit tags on `<UpdateDeviceUserTags>`" }),
    });
    const title = doc.querySelector(".api-changelog-entry__title")!;
    const codes = [...title.querySelectorAll("code")].map(text);
    expect(codes).toEqual(["<UpdateDeviceUserTags>"]);
    expect(text(title)).toBe("Limit tags on <UpdateDeviceUserTags>");
  });

  it("links a product that has a page", async () => {
    const doc = await render(ApiChangelogEntry, { entry: makeEntry() });
    const product = doc.querySelector(".api-changelog-entry__product")!;
    expect(product.tagName).toBe("A");
    expect(product.getAttribute("href")).toBe("/api/latest/dashboards/");
    expect(text(product)).toBe("Dashboards");
  });

  it("renders a product with no page as plain text", async () => {
    const doc = await render(ApiChangelogEntry, {
      entry: makeEntry({ product: { name: "Ai Impact" } }),
    });
    const product = doc.querySelector(".api-changelog-entry__product")!;
    expect(product.tagName).toBe("SPAN");
    expect(text(product)).toBe("Ai Impact");
  });

  it("links known operations and leaves unknown ones as code", async () => {
    const doc = await render(ApiChangelogEntry, {
      entry: makeEntry({
        operations: [
          {
            operationId: "ListDashboards",
            href: "/api/latest/dashboards/get-all-dashboards/",
          },
          { operationId: "GetDashboardUsage" },
        ],
      }),
    });
    const operations = [
      ...doc.querySelectorAll(".api-changelog-entry__operation"),
    ];
    expect(
      operations.map((operation) => ({
        tag: operation.tagName,
        href: operation.getAttribute("href"),
        code: text(operation.querySelector("code") ?? operation),
      })),
    ).toEqual([
      {
        tag: "A",
        href: "/api/latest/dashboards/get-all-dashboards/",
        code: "ListDashboards",
      },
      { tag: "CODE", href: null, code: "GetDashboardUsage" },
    ]);
  });

  it("leaves out the operations list when there are none", async () => {
    const doc = await render(ApiChangelogEntry, { entry: makeEntry() });
    expect(doc.querySelector(".api-changelog-entry__operations")).toBeNull();
  });
});

describe("ApiChangelogTimeline", () => {
  it("groups entries into a section per date, in order", async () => {
    const doc = await render(ApiChangelogTimeline, {
      lang: "en",
      entries: [
        makeEntry({ title: "A" }),
        makeEntry({ title: "B" }),
        makeEntry({ date: "2026-10-06", title: "C" }),
      ],
    });
    const sections = [
      ...doc.querySelectorAll(".api-changelog-timeline__section"),
    ];
    expect(
      sections.map((section) => ({
        datetime: section.querySelector("time")?.getAttribute("datetime"),
        date: text(section.querySelector(".api-changelog-timeline__date")),
        titles: [
          ...section.querySelectorAll(".api-changelog-entry__title"),
        ].map(text),
      })),
    ).toEqual([
      { datetime: "2026-10-08", date: "Oct 8, 2026", titles: ["A", "B"] },
      { datetime: "2026-10-06", date: "Oct 6, 2026", titles: ["C"] },
    ]);
  });

  it("carries the anchor pagination links jump to", async () => {
    const doc = await render(ApiChangelogTimeline, {
      lang: "en",
      entries: [makeEntry()],
    });
    expect(doc.getElementById("changelog-timeline")).not.toBeNull();
  });
});

describe("ApiChangelogFilterBar", () => {
  it("links every filter tab, marking the active one", async () => {
    const doc = await render(ApiChangelogFilterBar, {
      lang: "ja",
      activeFilter: "breaking",
    });
    const nav = doc.querySelector("nav.api-changelog-filter-bar")!;
    expect(nav.getAttribute("aria-label")).toBe("Filter by change type");

    const tabs = [...doc.querySelectorAll(".api-changelog-filter-bar__tab")];
    expect(
      tabs.map((tab) => ({
        label: text(tab),
        href: tab.getAttribute("href"),
        active: tab.classList.contains("api-changelog-filter-bar__tab--active"),
        current: tab.getAttribute("aria-current"),
      })),
    ).toEqual([
      expect.objectContaining({
        href: "/ja/api/changelog/",
        active: false,
        current: null,
      }),
      expect.objectContaining({
        label: "Added",
        href: "/ja/api/changelog/added/",
        active: false,
      }),
      expect.objectContaining({
        label: "Modified",
        href: "/ja/api/changelog/modified/",
        active: false,
      }),
      {
        label: "Breaking",
        href: "/ja/api/changelog/breaking/",
        active: true,
        current: "page",
      },
    ]);
  });
});

describe("ApiChangelogEmptyState", () => {
  it("says no changes have been published, under All", async () => {
    const doc = await render(ApiChangelogEmptyState, {
      lang: "en",
      filter: "all",
    });
    expect(text(doc.querySelector(".api-changelog-empty-state"))).toBe(
      "No API changes have been published yet.",
    );
    expect(doc.querySelector("a")).toBeNull();
  });

  it("names the filter and links back to All, under a filter", async () => {
    const doc = await render(ApiChangelogEmptyState, {
      lang: "ja",
      filter: "breaking",
    });
    expect(text(doc.querySelector(".api-changelog-empty-state__message"))).toBe(
      "No breaking changes yet.",
    );
    const link = doc.querySelector(".api-changelog-empty-state__link")!;
    expect(link.getAttribute("href")).toBe("/ja/api/changelog/");
  });
});

describe("ApiChangelog", () => {
  it("renders the timeline and no empty state when there are entries", async () => {
    const doc = await render(ApiChangelog, { lang: "en", page: makePage() });
    expect(doc.querySelector(".api-changelog-timeline")).not.toBeNull();
    expect(doc.querySelector(".api-changelog-empty-state")).toBeNull();
  });

  it("renders the empty state and no timeline when there are none", async () => {
    const doc = await render(ApiChangelog, {
      lang: "en",
      page: makePage({ entries: [] }),
    });
    expect(doc.querySelector(".api-changelog-timeline")).toBeNull();
    expect(doc.querySelector(".api-changelog-empty-state")).not.toBeNull();
  });

  it("paginates within the filter, jumping to the timeline", async () => {
    const doc = await render(ApiChangelog, {
      lang: "en",
      page: makePage({ filter: "added", pageNumber: 2, totalPages: 3 }),
    });
    const previous = doc.querySelector(".pagination__previous")!;
    const next = doc.querySelector(".pagination__next")!;
    expect(previous.getAttribute("href")).toBe(
      "/api/changelog/added/#changelog-timeline",
    );
    expect(next.getAttribute("href")).toBe(
      "/api/changelog/added/3/#changelog-timeline",
    );
  });
});
