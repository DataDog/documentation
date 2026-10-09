// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, cleanup } from "@testing-library/preact";
import { h } from "preact";
import MobileNavLazyOperations from "../MobileNavLazyOperations";
import { _resetMobileNavDataCache } from "../mobileNavDataClient";
import type { MobileNavData } from "@lib/api/mobileNavData";

const DATA_URL = "/api/mobile-nav.json";

const labels = {
  Loading: "Loading",
  "View category page": "View category page",
};

const data: MobileNavData = {
  categories: [
    {
      slug: "dashboards",
      href: "/api/latest/dashboards/",
      operations: [
        { slug: "get-a-dashboard", summary: "Get a dashboard" },
        { slug: "delete-a-dashboard", summary: "Delete a dashboard" },
      ],
    },
    {
      slug: "monitors",
      href: "/api/latest/monitors/",
      operations: [{ slug: "get-a-monitor", summary: "Get a monitor" }],
    },
  ],
};

/** The server-rendered list: one active category, two lazy ones. */
const LIST_HTML = `
  <ul id="mobile-nav-api-list">
    <li>
      <details open>
        <summary data-testid="events">Events</summary>
        <ul><li><a href="/api/latest/events/get-an-event/">Get an event</a></li></ul>
      </details>
    </li>
    <li>
      <details>
        <summary data-testid="dashboards">Dashboards</summary>
        <ul data-category-slug="dashboards" data-category-href="/api/latest/dashboards/"></ul>
      </details>
    </li>
    <li>
      <details>
        <summary data-testid="monitors">Monitors</summary>
        <ul data-category-slug="monitors" data-category-href="/api/latest/monitors/"></ul>
      </details>
    </li>
  </ul>
`;

type Deferred = {
  promise: Promise<Response>;
  resolve: (response: Response) => void;
  reject: (error: unknown) => void;
};

function deferredResponse(): Deferred {
  let resolve!: (response: Response) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<Response>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), { status: 200 });
}

function stubViewport({ isDesktop }: { isDesktop: boolean }) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches: isDesktop,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
}

function stubSaveData(saveData: boolean) {
  Object.defineProperty(navigator, "connection", {
    value: { saveData },
    configurable: true,
  });
}

function mountIsland() {
  render(
    h(MobileNavLazyOperations, {
      dataUrl: DATA_URL,
      labels,
      externalContext: {
        scope: "mobile-nav-api-list",
        entries: { list: "mobile-nav-api-list" },
      },
    }),
  );
}

function summary(testId: string): HTMLElement {
  return document.querySelector(`[data-testid="${testId}"]`)!;
}

function sublist(slug: string): HTMLUListElement {
  return document.querySelector(`ul[data-category-slug="${slug}"]`)!;
}

function linkHrefs(list: HTMLElement): string[] {
  return [...list.querySelectorAll("a")].map((link) =>
    link.getAttribute("href")!,
  );
}

/** Expand a category as a user would: click its summary while it's closed. */
function expand(testId: string) {
  const toggle = summary(testId);
  (toggle.parentElement as HTMLDetailsElement).open = false;
  toggle.click();
}

/** Let pending fetch and JSON promises settle. */
async function settle() {
  for (let i = 0; i < 5; i++) {
    await Promise.resolve();
  }
  await new Promise((resolve) => setTimeout(resolve, 0));
}

beforeEach(() => {
  _resetMobileNavDataCache();
  document.body.innerHTML = LIST_HTML;
  stubViewport({ isDesktop: false });
  stubSaveData(false);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  document.body.innerHTML = "";
});

describe("MobileNavLazyOperations", () => {
  it("marks the list as hydrated on mount", () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(data)));
    mountIsland();
    expect(
      document
        .getElementById("mobile-nav-api-list")
        ?.getAttribute("data-hydrated"),
    ).toBe("true");
  });

  describe("prefetching on mount", () => {
    it("fetches the data at mobile widths", () => {
      const fetchMock = vi.fn().mockResolvedValue(jsonResponse(data));
      vi.stubGlobal("fetch", fetchMock);
      mountIsland();
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock.mock.calls[0][0]).toBe(DATA_URL);
    });

    it("does not fetch at desktop widths", () => {
      stubViewport({ isDesktop: true });
      const fetchMock = vi.fn().mockResolvedValue(jsonResponse(data));
      vi.stubGlobal("fetch", fetchMock);
      mountIsland();
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("does not fetch when save-data is on", () => {
      stubSaveData(true);
      const fetchMock = vi.fn().mockResolvedValue(jsonResponse(data));
      vi.stubGlobal("fetch", fetchMock);
      mountIsland();
      expect(fetchMock).not.toHaveBeenCalled();
    });
  });

  it("fills an expanded category synchronously once the data has loaded", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(data)));
    mountIsland();
    await settle();

    expand("dashboards");

    const list = sublist("dashboards");
    expect(linkHrefs(list)).toEqual([
      "/api/latest/dashboards/get-a-dashboard/",
      "/api/latest/dashboards/delete-a-dashboard/",
    ]);
    const firstLink = list.querySelector("a")!;
    expect(firstLink.textContent).toBe("Get a dashboard");
    expect(firstLink.classList.contains("mobile-nav__link")).toBe(true);
    expect(firstLink.classList.contains("mobile-nav__link--compact")).toBe(
      true,
    );
    expect(list.hasAttribute("aria-busy")).toBe(false);
  });

  it("shows a loading row while the data is pending, then fills every expanded category", async () => {
    const pending = deferredResponse();
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(pending.promise));
    mountIsland();

    expand("dashboards");
    expand("monitors");

    for (const slug of ["dashboards", "monitors"]) {
      const list = sublist(slug);
      expect(list.getAttribute("aria-busy")).toBe("true");
      expect(list.textContent).toContain("Loading");
      expect(list.querySelector("a")).toBeNull();
    }

    pending.resolve(jsonResponse(data));
    await settle();

    expect(linkHrefs(sublist("dashboards"))).toHaveLength(2);
    expect(linkHrefs(sublist("monitors"))).toEqual([
      "/api/latest/monitors/get-a-monitor/",
    ]);
    expect(sublist("dashboards").hasAttribute("aria-busy")).toBe(false);
    expect(sublist("dashboards").textContent).not.toContain("Loading");
  });

  it("fetches on expand when nothing was prefetched", async () => {
    stubViewport({ isDesktop: true });
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(data));
    vi.stubGlobal("fetch", fetchMock);
    mountIsland();

    expand("monitors");
    await settle();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(linkHrefs(sublist("monitors"))).toEqual([
      "/api/latest/monitors/get-a-monitor/",
    ]);
  });

  it("shows a link to the category page when the request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("offline")));
    mountIsland();
    await settle();

    expand("dashboards");
    await settle();

    const list = sublist("dashboards");
    expect(linkHrefs(list)).toEqual(["/api/latest/dashboards/"]);
    expect(list.textContent).toContain("View category page");
    expect(list.hasAttribute("aria-busy")).toBe(false);
  });

  it("retries on the next expand after a failure", async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new TypeError("offline"))
      .mockRejectedValueOnce(new TypeError("offline"))
      .mockResolvedValue(jsonResponse(data));
    vi.stubGlobal("fetch", fetchMock);
    mountIsland();
    await settle();

    expand("dashboards");
    await settle();
    expect(linkHrefs(sublist("dashboards"))).toEqual([
      "/api/latest/dashboards/",
    ]);

    expand("dashboards");
    await settle();
    expect(linkHrefs(sublist("dashboards"))).toHaveLength(2);
  });

  it("leaves the server-rendered active category alone", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(data));
    vi.stubGlobal("fetch", fetchMock);
    mountIsland();
    await settle();
    const activeList = summary("events").nextElementSibling!;
    const activeHtml = activeList.innerHTML;

    expand("events");
    await settle();

    expect(activeList.innerHTML).toBe(activeHtml);
  });

  it("does not re-render a category that is already filled", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(data)));
    mountIsland();
    await settle();

    expand("dashboards");
    const firstLink = sublist("dashboards").querySelector("a");
    expand("dashboards");

    expect(sublist("dashboards").querySelector("a")).toBe(firstLink);
  });

  it("does nothing when a category is collapsed", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(data)));
    mountIsland();
    await settle();
    const toggle = summary("dashboards");
    (toggle.parentElement as HTMLDetailsElement).open = true;

    toggle.click();

    expect(sublist("dashboards").children).toHaveLength(0);
  });
});
