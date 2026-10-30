// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/preact";
import { h } from "preact";
import MobileNavOperationItems from "../MobileNavOperationItems";

afterEach(cleanup);

const operations = [
  { slug: "list-metrics", summary: "List metrics" },
  { slug: "submit-metrics", summary: "Submit metrics" },
];

function renderItems(activeOperationSlug?: string) {
  const { container } = render(
    h(
      "ul",
      null,
      h(MobileNavOperationItems, {
        categoryHref: "/api/latest/metrics/",
        operations,
        activeOperationSlug,
      }),
    ),
  );
  return [...container.querySelectorAll("li > a")] as HTMLAnchorElement[];
}

describe("MobileNavOperationItems", () => {
  it("renders one link per operation, in order", () => {
    const links = renderItems();
    expect(links.map((link) => link.textContent)).toEqual([
      "List metrics",
      "Submit metrics",
    ]);
  });

  it("builds each href from the category href and the operation slug", () => {
    const links = renderItems();
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/api/latest/metrics/list-metrics/",
      "/api/latest/metrics/submit-metrics/",
    ]);
  });

  it("uses the compact level-1 link classes", () => {
    for (const link of renderItems()) {
      expect(link.classList.contains("mobile-nav__link")).toBe(true);
      expect(link.classList.contains("mobile-nav__link--compact")).toBe(true);
      expect(link.getAttribute("data-level")).toBe("1");
      expect(link.style.getPropertyValue("--depth")).toBe("1");
    }
  });

  it("marks nothing active without an active operation", () => {
    for (const link of renderItems()) {
      expect(link.classList.contains("mobile-nav__link--active")).toBe(false);
      expect(link.hasAttribute("aria-current")).toBe(false);
    }
  });

  it("marks the active operation as the current page", () => {
    const [listLink, submitLink] = renderItems("submit-metrics");
    expect(submitLink.classList.contains("mobile-nav__link--active")).toBe(
      true,
    );
    expect(submitLink.getAttribute("aria-current")).toBe("page");
    expect(listLink.classList.contains("mobile-nav__link--active")).toBe(false);
    expect(listLink.hasAttribute("aria-current")).toBe(false);
  });
});
