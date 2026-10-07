// @vitest-environment happy-dom
import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import { render, cleanup } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { h } from "preact";
import SearchBar, { type SearchBarLabels } from "../SearchBar";
import SearchResultsPopup from "../SearchResultsPopup";
import { mountAskAi } from "@dd/ask-ai";
import { createAskAiConfig } from "@lib/askAi/askAiConfig";

// The package is mocked rather than loaded: what matters here is that the
// searchbar calls `ask` with the shared config, not what the widget then does.
const { askSpy } = vi.hoisted(() => ({ askSpy: vi.fn() }));
vi.mock("@dd/ask-ai", () => ({
  mountAskAi: vi.fn(() => ({ ask: askSpy, teardown: vi.fn() })),
}));

const labels: SearchBarLabels = {
  Search: "Search",
  "Search documentation": "Search documentation",
  "Search documentation...": "Search documentation...",
  "No results.": "No results.",
};
import basicFixture from "../__fixtures__/typesense_basic.json";
import noHitsFixture from "../__fixtures__/typesense_no_hits.json";
import apiOnlyFixture from "../__fixtures__/typesense_api_only.json";
import {
  flattenSearchResult,
  type MultiSearchResponse,
} from "@lib/search/typesense";
import { HUGO_ORIGIN } from "@config/origins";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  // The searchbar syncs its query to `?s=`, so the URL is shared state between
  // tests: a leftover param would be restored into the next mount's input.
  window.history.replaceState(null, "", "/");
});

const env = {
  host: "test",
  publicKey: "test",
  docsIndex: "docs_alias",
  partnersIndex: "docs_partners_alias",
};

function fixtureToResponse(fixture: { results: any[] }): MultiSearchResponse {
  return {
    docs: flattenSearchResult(fixture.results[0]),
    partners: flattenSearchResult(fixture.results[1]),
  };
}

function makeSearch(fixture: { results: any[] }) {
  return vi.fn().mockResolvedValue(fixtureToResponse(fixture));
}

function mount(
  fixture: { results: any[] } = basicFixture,
  variant?: "default" | "mobile",
) {
  const search = makeSearch(fixture);
  const utils = render(h(SearchBar as any, { env, search, labels, variant }));
  return { ...utils, search };
}

async function typeAndWait(
  user: ReturnType<typeof userEvent.setup>,
  value: string,
) {
  const input = document.querySelector<HTMLInputElement>(".search-bar__input")!;
  await user.click(input);
  await user.type(input, value);
  // Allow the 200ms debounce + microtasks for the resolved promise to flush.
  await new Promise((r) => setTimeout(r, 250));
}

describe("SearchBar — empty state", () => {
  it("renders the input and no popup before typing", () => {
    mount();
    expect(document.querySelector(".search-bar__input")).toBeTruthy();
    expect(document.querySelector(".search-bar__popup")).toBeFalsy();
  });
});

describe("SearchBar — hydration signal", () => {
  // The input is controlled, so a value typed before hydration is discarded
  // when Preact mounts and renders its own empty `value`. Anything driving this
  // component from outside — a test, or a script focusing it — needs a way to
  // know the island is live, so the root advertises it the way the rest of the
  // site's islands do.
  it("marks the root hydrated on mount", () => {
    mount();
    expect(
      document.querySelector(".search-bar")!.getAttribute("data-hydrated"),
    ).toBe("true");
  });
});

describe("SearchBar — query renders results", () => {
  it("opens the popup with grouped categories when query returns hits", async () => {
    const user = userEvent.setup();
    mount();
    await typeAndWait(user, "dashboard");

    expect(document.querySelector(".search-bar__popup")).toBeTruthy();
    expect(document.querySelector(".search-bar__ai-suggestion")).toBeTruthy();

    const labels = Array.from(
      document.querySelectorAll(".search-category__label"),
    ).map((el) => el.textContent);
    // API is pinned first, partners last per the plan.
    expect(labels).toEqual([
      "API",
      "Getting Started",
      "Documentation",
      "Guides",
      "Partners",
    ]);
  });

  it("renders nothing in categories without hits (api-only fixture)", async () => {
    const user = userEvent.setup();
    mount(apiOnlyFixture);
    await typeAndWait(user, "monitor");

    const labels = Array.from(
      document.querySelectorAll(".search-category__label"),
    ).map((el) => el.textContent);
    expect(labels).toEqual(["API"]);
  });
});

describe("SearchBar — popup variant", () => {
  it("marks the popup with the mobile modifier under the mobile variant", async () => {
    const user = userEvent.setup();
    mount(basicFixture, "mobile");
    await typeAndWait(user, "dashboard");

    expect(document.querySelector(".search-bar__popup")).toBeTruthy();
    expect(document.querySelector(".search-bar__popup--mobile")).toBeTruthy();
  });

  it("does not add the mobile modifier under the default variant", async () => {
    const user = userEvent.setup();
    mount();
    await typeAndWait(user, "dashboard");

    expect(document.querySelector(".search-bar__popup")).toBeTruthy();
    expect(document.querySelector(".search-bar__popup--mobile")).toBeFalsy();
  });
});

describe("SearchBar — no-hits state", () => {
  it("shows the no-hits message when results are empty", async () => {
    const user = userEvent.setup();
    mount(noHitsFixture);
    await typeAndWait(user, "zzz");
    expect(
      document.querySelector(".search-bar__no-hits")?.textContent,
    ).toContain("No results");
  });
});

describe("SearchBar — URL routing", () => {
  it("keeps API hits same-origin and routes non-API hits to the Astro site origin", async () => {
    const user = userEvent.setup();
    mount();
    await typeAndWait(user, "dashboard");

    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".search-hit__link"),
    );
    const hrefs = links.map((a) => a.getAttribute("href"));

    // API hits resolve relative (same-origin in production).
    expect(hrefs).toContain("/api/latest/dashboards/");
    // Documentation hits go to the Hugo origin.
    expect(hrefs).toContain(`${HUGO_ORIGIN}/dashboards/`);
    // Partner hits also go to the Hugo origin.
    expect(hrefs).toContain(`${HUGO_ORIGIN}/partners/acme-dashboards/`);
  });
});

describe("SearchBar — keyboard navigation", () => {
  it("ArrowDown moves selection through Ask AI then hits", async () => {
    const user = userEvent.setup();
    mount();
    await typeAndWait(user, "dashboard");

    const input =
      document.querySelector<HTMLInputElement>(".search-bar__input")!;
    await user.click(input);

    await user.keyboard("{ArrowDown}");
    expect(
      document.querySelector(".search-bar__ai-suggestion--selected"),
    ).toBeTruthy();

    await user.keyboard("{ArrowDown}");
    const selected = document.querySelectorAll(".search-hit--selected");
    expect(selected.length).toBe(1);
  });

  it("ArrowUp from index 0 returns focus to input", async () => {
    const user = userEvent.setup();
    mount();
    await typeAndWait(user, "dashboard");

    const input =
      document.querySelector<HTMLInputElement>(".search-bar__input")!;
    await user.click(input);
    await user.keyboard("{ArrowDown}"); // Ask AI selected
    await user.keyboard("{ArrowUp}"); // back to input

    expect(
      document.querySelector(".search-bar__ai-suggestion--selected"),
    ).toBeFalsy();
    expect(document.activeElement).toBe(input);
  });
});

describe("SearchBar — Enter routes to Hugo's search page when no hit is selected", () => {
  it("navigates to {HUGO_ORIGIN}/search/?s=<query> when Enter is pressed without a selection", async () => {
    const user = userEvent.setup();
    mount();
    await typeAndWait(user, "monitor");

    // Stub navigation so we can assert without a real reload.
    const hrefs: string[] = [];
    const original = Object.getOwnPropertyDescriptor(window, "location");
    Object.defineProperty(window, "location", {
      configurable: true,
      value: new Proxy({} as any, {
        set(_t, prop, value) {
          if (prop === "href") hrefs.push(value);
          return true;
        },
      }),
    });

    try {
      const input =
        document.querySelector<HTMLInputElement>(".search-bar__input")!;
      await user.click(input);
      await user.keyboard("{Enter}");
    } finally {
      if (original) Object.defineProperty(window, "location", original);
    }

    expect(hrefs).toContain(`${HUGO_ORIGIN}/search/?s=monitor`);
  });
});

describe("SearchBar — the Ask AI row", () => {
  beforeEach(() => {
    askSpy.mockClear();
    vi.mocked(mountAskAi).mockClear();
  });

  // The click and Enter handlers `await import("@dd/ask-ai")`, so the call
  // lands a microtask after the event.
  const flushLazyImport = () => new Promise((r) => setTimeout(r, 0));

  it("labels the row with the query the user typed", async () => {
    const user = userEvent.setup();
    mount();
    await typeAndWait(user, "dashboard");

    const row = document.querySelector(".search-bar__ai-suggestion");
    expect(row?.textContent).toContain("Ask AI about");
    expect(
      document.querySelector(".search-bar__ai-suggestion-query")?.textContent,
    ).toBe('"dashboard"');
  });

  it("labels the row generically when there is no query", () => {
    // Rendered directly: the popup only opens on a non-empty query, so this
    // branch is unreachable through the search bar itself.
    render(
      h(SearchResultsPopup, {
        popupRef: { current: null },
        rect: null,
        variant: "default",
        grouped: null,
        selectedHit: null,
        aiSelected: false,
        noResultsLabel: "No results.",
        totalHits: 0,
        query: "",
        onAskAi: () => {},
      }),
    );

    expect(
      document.querySelector(".search-bar__ai-suggestion")?.textContent,
    ).toContain("Ask AI anything");
    expect(
      document.querySelector(".search-bar__ai-suggestion-query"),
    ).toBeFalsy();
  });

  it("clicking the row opens Ask AI with the query", async () => {
    const user = userEvent.setup();
    mount();
    await typeAndWait(user, "dashboard");

    await user.click(
      document.querySelector<HTMLElement>(".search-bar__ai-suggestion")!,
    );
    await flushLazyImport();

    expect(askSpy).toHaveBeenCalledWith("dashboard", {
      source: "search_suggestion",
    });
  });

  it("mounts with the shared config, so its capabilities are not dropped", async () => {
    const user = userEvent.setup();
    mount();
    await typeAndWait(user, "dashboard");

    await user.click(
      document.querySelector<HTMLElement>(".search-bar__ai-suggestion")!,
    );
    await flushLazyImport();

    // A config-less mount would win the idempotency race on any page load
    // where the searchbar hydrates before the mount script runs, and the
    // symptom — telemetry missing `is_datadog_user` on some loads and not
    // others — is invisible without this assertion.
    expect(vi.mocked(mountAskAi)).toHaveBeenCalledWith(createAskAiConfig());
  });

  it("Enter on the selected row opens Ask AI instead of navigating", async () => {
    const user = userEvent.setup();
    mount();
    await typeAndWait(user, "monitor");

    const hrefs: string[] = [];
    const original = Object.getOwnPropertyDescriptor(window, "location");
    Object.defineProperty(window, "location", {
      configurable: true,
      value: new Proxy({} as Partial<Location>, {
        set(_t, prop, value) {
          if (prop === "href") hrefs.push(value);
          return true;
        },
      }),
    });

    try {
      const input =
        document.querySelector<HTMLInputElement>(".search-bar__input")!;
      await user.click(input);
      await user.keyboard("{ArrowDown}"); // Ask AI row selected
      await user.keyboard("{Enter}");
      await flushLazyImport();
    } finally {
      if (original) Object.defineProperty(window, "location", original);
    }

    expect(askSpy).toHaveBeenCalledWith("monitor", {
      source: "search_suggestion",
    });
    expect(hrefs).toEqual([]);
  });
});

describe("SearchBar — global keyboard shortcuts", () => {
  it("Cmd+K focuses the input from anywhere", async () => {
    const user = userEvent.setup();
    mount();

    document.body.focus();
    await user.keyboard("{Meta>}k{/Meta}");

    const input =
      document.querySelector<HTMLInputElement>(".search-bar__input")!;
    expect(document.activeElement).toBe(input);
  });

  it("forward-slash focuses the input when not editing text elsewhere", async () => {
    const user = userEvent.setup();
    mount();

    document.body.focus();
    await user.keyboard("/");

    const input =
      document.querySelector<HTMLInputElement>(".search-bar__input")!;
    expect(document.activeElement).toBe(input);
  });

  it("the mobile variant ignores the global forward-slash shortcut", async () => {
    const user = userEvent.setup();
    // Two SearchBars coexist on every page (API side nav + mobile nav). The
    // mobile one must NOT grab `/` so it can't steal focus from the side-nav
    // bar or focus its own (often hidden) input.
    mount(basicFixture, "mobile");

    document.body.focus();
    await user.keyboard("/");

    const input =
      document.querySelector<HTMLInputElement>(".search-bar__input")!;
    expect(document.activeElement).not.toBe(input);
  });

  it("the mobile variant ignores the global Cmd+K shortcut", async () => {
    const user = userEvent.setup();
    mount(basicFixture, "mobile");

    document.body.focus();
    await user.keyboard("{Meta>}k{/Meta}");

    const input =
      document.querySelector<HTMLInputElement>(".search-bar__input")!;
    expect(document.activeElement).not.toBe(input);
  });

  it("Escape clears the query and blurs the input", async () => {
    const user = userEvent.setup();
    mount();
    await typeAndWait(user, "dashboard");

    expect(document.querySelector(".search-bar__popup")).toBeTruthy();

    const input =
      document.querySelector<HTMLInputElement>(".search-bar__input")!;
    await user.click(input);
    await user.keyboard("{Escape}");

    // Wait a tick for state to flush.
    await new Promise((r) => setTimeout(r, 10));

    expect(input.value).toBe("");
    expect(document.querySelector(".search-bar__popup")).toBeFalsy();
  });
});

// --- `?s=` URL sync -------------------------------------------------------
//
// Both SearchBar islands are mounted at every width, so the query is shared
// state: whichever one the user types into writes `?s=`, and the other mirrors
// the text. See `plans/27_search_url_sync.md`.

const DEBOUNCE_MS = 200;

/** Let the shared debounce fire and the resolved search promise flush. */
const flushDebounce = () => new Promise((r) => setTimeout(r, DEBOUNCE_MS + 50));

function mountBoth(fixture: { results: any[] } = basicFixture) {
  const search = makeSearch(fixture);
  const sideNav = render(
    h(SearchBar as any, { env, search, labels, variant: "default" }),
  );
  const mobile = render(
    h(SearchBar as any, { env, search, labels, variant: "mobile" }),
  );
  return { sideNav, mobile, search };
}

const sideNavInput = () =>
  Array.from(
    document.querySelectorAll<HTMLInputElement>(".search-bar__input"),
  ).find((el) => !el.classList.contains("search-bar__input--mobile"))!;

const mobileInput = () =>
  document.querySelector<HTMLInputElement>(".search-bar__input--mobile")!;

async function typeInto(
  user: ReturnType<typeof userEvent.setup>,
  input: HTMLInputElement,
  value: string,
) {
  await user.click(input);
  await user.type(input, value);
  await flushDebounce();
}

describe("SearchBar — `?s=` URL sync, one instance", () => {
  afterEach(async () => {
    await flushDebounce();
    window.history.replaceState(null, "", "/");
  });

  it("restores the query from `?s=` on load, with results displayed", async () => {
    window.history.replaceState(null, "", "/api/?s=dashboard");
    mount();
    await flushDebounce();

    expect(sideNavInput().value).toBe("dashboard");
    expect(document.querySelector(".search-bar__popup")).toBeTruthy();
    expect(document.querySelector(".search-hit")).toBeTruthy();
  });

  it("leaves the URL alone when there is nothing to restore", async () => {
    window.history.replaceState(null, "", "/api/");
    mount();
    await flushDebounce();

    expect(document.querySelector(".search-bar__popup")).toBeFalsy();
    expect(window.location.search).toBe("");
  });

  it("does not steal focus when it restores", async () => {
    window.history.replaceState(null, "", "/api/?s=dashboard");
    mount();
    await flushDebounce();

    expect(document.activeElement).not.toBe(sideNavInput());
  });

  it("writes the typed query to `?s=` after the debounce", async () => {
    window.history.replaceState(null, "", "/api/");
    const user = userEvent.setup();
    mount();
    await typeInto(user, sideNavInput(), "dashboard");

    expect(window.location.search).toBe("?s=dashboard");
  });

  it("drops the param when the input is cleared, leaving no bare `?`", async () => {
    window.history.replaceState(null, "", "/api/");
    const user = userEvent.setup();
    mount();
    await typeInto(user, sideNavInput(), "dashboard");
    await user.clear(sideNavInput());
    await flushDebounce();

    expect(window.location.search).toBe("");
  });

  it("clears the input, the popup, and the param together on Escape", async () => {
    window.history.replaceState(null, "", "/api/");
    const user = userEvent.setup();
    mount();
    await typeInto(user, sideNavInput(), "dashboard");

    await user.click(sideNavInput());
    await user.keyboard("{Escape}");
    await flushDebounce();

    expect(sideNavInput().value).toBe("");
    expect(document.querySelector(".search-bar__popup")).toBeFalsy();
    expect(window.location.search).toBe("");
  });

  it("preserves `?site=` while syncing the query", async () => {
    window.history.replaceState(null, "", "/api/?site=eu");
    const user = userEvent.setup();
    mount();
    await typeInto(user, sideNavInput(), "dashboard");

    expect(window.location.search).toContain("site=eu");
    expect(window.location.search).toContain("s=dashboard");
  });

  it("syncs from the mobile instance too — ownership follows the typing", async () => {
    window.history.replaceState(null, "", "/api/");
    const user = userEvent.setup();
    mount(basicFixture, "mobile");
    await typeInto(user, mobileInput(), "dashboard");

    expect(window.location.search).toBe("?s=dashboard");
  });
});

describe("SearchBar — `?s=` URL sync, both instances mounted", () => {
  afterEach(async () => {
    await flushDebounce();
    window.history.replaceState(null, "", "/");
  });

  it("mirrors text typed in the side nav into the mobile input", async () => {
    window.history.replaceState(null, "", "/api/");
    const user = userEvent.setup();
    mountBoth();
    await typeInto(user, sideNavInput(), "dashboard");

    // This is what makes shrinking past 992px work with no resize handling:
    // the mobile input already holds the query before it becomes visible.
    expect(mobileInput().value).toBe("dashboard");
  });

  it("does not open the mirrored instance's popup", async () => {
    window.history.replaceState(null, "", "/api/");
    const user = userEvent.setup();
    mountBoth();
    await typeInto(user, sideNavInput(), "dashboard");

    expect(document.querySelector(".search-bar__popup")).toBeTruthy();
    expect(document.querySelector(".search-bar__popup--mobile")).toBeFalsy();
  });

  it("mirrors in the other direction too", async () => {
    window.history.replaceState(null, "", "/api/");
    const user = userEvent.setup();
    mountBoth();
    await typeInto(user, mobileInput(), "dashboard");

    expect(sideNavInput().value).toBe("dashboard");
    expect(document.querySelector(".search-bar__popup--mobile")).toBeTruthy();
  });

  it("writes `?s=` once for input interleaved across both instances", async () => {
    window.history.replaceState(null, "", "/api/");
    const user = userEvent.setup();
    mountBoth();
    const replaceState = vi.spyOn(window.history, "replaceState");

    await user.click(sideNavInput());
    await user.type(sideNavInput(), "dash");
    await user.click(mobileInput());
    await user.type(mobileInput(), "board");
    await flushDebounce();

    expect(replaceState).toHaveBeenCalledTimes(1);
    expect(window.location.search).toBe("?s=dashboard");
    replaceState.mockRestore();
  });

  it("clearing one instance clears the other and drops the param", async () => {
    window.history.replaceState(null, "", "/api/");
    const user = userEvent.setup();
    mountBoth();
    await typeInto(user, sideNavInput(), "dashboard");
    await user.clear(sideNavInput());
    await flushDebounce();

    expect(mobileInput().value).toBe("");
    expect(window.location.search).toBe("");
  });

  it("restores both inputs from the same param, with no ordering dependency", async () => {
    window.history.replaceState(null, "", "/api/?s=dashboard");
    mountBoth();
    await flushDebounce();

    expect(sideNavInput().value).toBe("dashboard");
    expect(mobileInput().value).toBe("dashboard");
  });

  it("adopts the query from Back/forward in every instance", async () => {
    window.history.replaceState(null, "", "/api/");
    mountBoth();
    await flushDebounce();

    window.history.replaceState(null, "", "/api/?s=logs");
    window.dispatchEvent(new PopStateEvent("popstate"));
    await flushDebounce();

    expect(sideNavInput().value).toBe("logs");
    expect(mobileInput().value).toBe("logs");
  });
});
