// @vitest-environment happy-dom
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { render, cleanup, fireEvent } from "@testing-library/preact";
import { h } from "preact";
import ApiChangelogFilterBar from "../ApiChangelogFilterBar";
import type { ChangelogFilter } from "@lib/api/changelog";

const tabs = [
  { filter: "all", label: "All", href: "/ja/api/changelog/" },
  { filter: "added", label: "Added", href: "/ja/api/changelog/added/" },
  {
    filter: "modified",
    label: "Modified",
    href: "/ja/api/changelog/modified/",
  },
  {
    filter: "breaking",
    label: "Breaking",
    href: "/ja/api/changelog/breaking/",
  },
] as const;

function mount(activeFilter: ChangelogFilter = "breaking") {
  return render(
    h(ApiChangelogFilterBar, {
      tabs: [...tabs],
      activeFilter,
      labels: { nav: "Filter by change type" },
    }),
  );
}

function tab(label: string): HTMLAnchorElement {
  return [
    ...document.querySelectorAll<HTMLAnchorElement>(
      ".api-changelog-filter-bar__tab",
    ),
  ].find((anchor) => anchor.textContent === label)!;
}

function activeLabels(): string[] {
  return [
    ...document.querySelectorAll(".api-changelog-filter-bar__tab--active"),
  ].map((anchor) => anchor.textContent ?? "");
}

// Keeps happy-dom from navigating on tab clicks. Registered on the document,
// so it runs after the tab's own click handler.
function preventNavigation(event: Event) {
  event.preventDefault();
}

beforeEach(() => {
  document.addEventListener("click", preventNavigation);
});

afterEach(() => {
  document.removeEventListener("click", preventNavigation);
  cleanup();
  document.body.innerHTML = "";
});

describe("ApiChangelogFilterBar", () => {
  it("links every filter tab, marking the active one", () => {
    mount();
    const nav = document.querySelector("nav.api-changelog-filter-bar")!;
    expect(nav.getAttribute("aria-label")).toBe("Filter by change type");

    const renderedTabs = [
      ...document.querySelectorAll(".api-changelog-filter-bar__tab"),
    ];
    expect(
      renderedTabs.map((anchor) => ({
        label: anchor.textContent,
        href: anchor.getAttribute("href"),
        active: anchor.classList.contains(
          "api-changelog-filter-bar__tab--active",
        ),
        current: anchor.getAttribute("aria-current"),
      })),
    ).toEqual([
      {
        label: "All",
        href: "/ja/api/changelog/",
        active: false,
        current: null,
      },
      {
        label: "Added",
        href: "/ja/api/changelog/added/",
        active: false,
        current: null,
      },
      {
        label: "Modified",
        href: "/ja/api/changelog/modified/",
        active: false,
        current: null,
      },
      {
        label: "Breaking",
        href: "/ja/api/changelog/breaking/",
        active: true,
        current: "page",
      },
    ]);
  });

  it("marks itself hydrated", () => {
    mount();
    expect(
      document
        .querySelector(".api-changelog-filter-bar")
        ?.getAttribute("data-hydrated"),
    ).toBe("true");
  });

  it("marks a clicked tab active before its page loads", () => {
    mount();
    fireEvent.click(tab("Added"));
    expect(activeLabels()).toEqual(["Added"]);
    expect(tab("Added").getAttribute("aria-current")).toBe("page");
    expect(tab("Breaking").getAttribute("aria-current")).toBeNull();
  });

  it.each([
    ["Cmd", { metaKey: true }],
    ["Ctrl", { ctrlKey: true }],
    ["Shift", { shiftKey: true }],
    ["Alt", { altKey: true }],
  ])(
    "leaves the active tab alone on a %s-click, which opens elsewhere",
    (_, modifiers) => {
      mount();
      fireEvent.click(tab("Added"), modifiers);
      expect(activeLabels()).toEqual(["Breaking"]);
    },
  );

  it("leaves the active tab alone on a middle click", () => {
    mount();
    fireEvent.click(tab("Added"), { button: 1 });
    expect(activeLabels()).toEqual(["Breaking"]);
  });

  it("restores the page's own active tab when the page comes back from the back-forward cache", () => {
    mount();
    fireEvent.click(tab("Added"));
    const pageShow = new Event("pageshow") as PageTransitionEvent;
    Object.defineProperty(pageShow, "persisted", { value: true });
    fireEvent(window, pageShow);
    expect(activeLabels()).toEqual(["Breaking"]);
  });
});
