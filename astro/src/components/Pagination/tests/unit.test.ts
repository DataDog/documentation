import { describe, it, expect } from "vitest";
import { Window } from "happy-dom";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Pagination from "../Pagination.astro";
import { paginationItems } from "../paginationItems";

// Parsed with a programmatic happy-dom DOMParser, as in MobileNav's unit test,
// because `.astro` imports only compile in the default node environment.
const parserWindow = new Window();

const labels = {
  navLabel: "Pagination",
  previous: "Previous",
  next: "Next",
};

async function renderPagination(
  currentPage: number,
  totalPages: number,
): Promise<Document> {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Pagination, {
    props: {
      currentPage,
      totalPages,
      hrefForPage: (pageNumber: number) => `/things/${pageNumber}/#list`,
      labels,
    },
  });
  return new parserWindow.DOMParser().parseFromString(
    html,
    "text/html",
  ) as unknown as Document;
}

function pageLabels(doc: Document): string[] {
  return [...doc.querySelectorAll(".pagination__item")].map(
    (item) => item.textContent?.trim() ?? "",
  );
}

describe("paginationItems", () => {
  it("lists every page when there are few", () => {
    expect(paginationItems(2, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("windows around the current page with ellipses", () => {
    expect(paginationItems(15, 30)).toEqual([
      1,
      "ellipsis",
      14,
      15,
      16,
      "ellipsis",
      30,
    ]);
  });

  it("shows a single skipped page instead of an ellipsis", () => {
    expect(paginationItems(4, 30)).toEqual([1, 2, 3, 4, 5, "ellipsis", 30]);
  });

  it("keeps the window inside the range at either end", () => {
    expect(paginationItems(1, 30)).toEqual([1, 2, "ellipsis", 30]);
    expect(paginationItems(30, 30)).toEqual([1, "ellipsis", 29, 30]);
  });
});

describe("Pagination", () => {
  it("renders nothing for a single page", async () => {
    const doc = await renderPagination(1, 1);
    expect(doc.querySelector(".pagination")).toBeNull();
  });

  it("labels the nav landmark", async () => {
    const doc = await renderPagination(1, 3);
    const nav = doc.querySelector("nav.pagination");
    expect(nav?.getAttribute("aria-label")).toBe("Pagination");
  });

  it("disables Previous on the first page", async () => {
    const doc = await renderPagination(1, 3);
    const previous = doc.querySelector(".pagination__previous")!;
    expect(previous.tagName).toBe("SPAN");
    expect(previous.getAttribute("aria-disabled")).toBe("true");
    expect(previous.classList).toContain("pagination__previous--disabled");

    const next = doc.querySelector(".pagination__next")!;
    expect(next.tagName).toBe("A");
    expect(next.getAttribute("rel")).toBe("next");
    expect(next.getAttribute("href")).toBe("/things/2/#list");
  });

  it("disables Next on the last page", async () => {
    const doc = await renderPagination(3, 3);
    const next = doc.querySelector(".pagination__next")!;
    expect(next.tagName).toBe("SPAN");
    expect(next.getAttribute("aria-disabled")).toBe("true");

    const previous = doc.querySelector(".pagination__previous")!;
    expect(previous.tagName).toBe("A");
    expect(previous.getAttribute("rel")).toBe("prev");
    expect(previous.getAttribute("href")).toBe("/things/2/#list");
  });

  it("marks the current page and links the others", async () => {
    const doc = await renderPagination(2, 3);
    const current = doc.querySelector(".pagination__page--current")!;
    expect(current.tagName).toBe("SPAN");
    expect(current.getAttribute("aria-current")).toBe("page");
    expect(current.textContent?.trim()).toBe("2");

    const links = [...doc.querySelectorAll("a.pagination__page")];
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/things/1/#list",
      "/things/3/#list",
    ]);
  });

  it("renders ellipses for a long range", async () => {
    const doc = await renderPagination(15, 30);
    expect(pageLabels(doc)).toEqual(["1", "…", "14", "15", "16", "…", "30"]);
    const ellipsis = doc.querySelector(".pagination__ellipsis")!;
    expect(ellipsis.getAttribute("aria-hidden")).toBe("true");
  });
});
