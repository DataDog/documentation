// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { startCdocsPreferences } from "./preferencesClient";
import { readPreferences, writePreferences } from "./preferences";
import { CDOCS_PAGE_STATE_ID, serializeCdocsPageState } from "./pageState";
import type { CdocsTraitsList } from "./pageLists";

const traitsList: CdocsTraitsList = {
  traits: ["api_type", "prog_lang"],
  pages: { "dd_e2e/cdocs/custom_instrumentation": [0, 1] },
};

let stop: () => void;

function renderPage(p: {
  url: string;
  valsByTraitId?: Record<string, string>;
  links?: string[];
}) {
  window.history.replaceState({}, "", p.url);
  const state = serializeCdocsPageState({
    valsByTraitId: p.valsByTraitId ?? {},
    traitsListUrl: "/traits.json",
    pathPrefix: "",
  });
  document.body.innerHTML =
    `<script type="application/json" id="${CDOCS_PAGE_STATE_ID}">${state}</script>` +
    (p.links ?? []).map((href) => `<a href="${href}">link</a>`).join("");
}

/** Start the script with idle callbacks and the traits list fetch resolved right away. */
async function start(
  options: Parameters<typeof startCdocsPreferences>[0] = {},
) {
  stop = startCdocsPreferences({
    scheduleIdle: (callback) => callback(),
    fetchTraitsList: async () => traitsList,
    ...options,
  });
  // Let the traits list promise resolve.
  await new Promise((resolve) => setTimeout(resolve, 0));
}

/**
 * Fire Astro's `astro:before-preparation` for a view-transition navigation to
 * `to`, run its loader, and return the URL the navigation ends up at.
 */
async function navigateTo(
  to: string,
  navigationType: "push" | "replace" | "traverse" = "push",
): Promise<string> {
  const event = Object.assign(new Event("astro:before-preparation"), {
    from: new URL(window.location.href),
    to: new URL(to, window.location.href),
    navigationType,
    formData: undefined,
    loader: async () => {},
  });
  document.dispatchEvent(event);
  await event.loader();
  return event.to.pathname + event.to.search;
}

const link = (index = 0) => document.querySelectorAll("a")[index];
const hover = (element: Element) =>
  element.dispatchEvent(new Event("pointerover", { bubbles: true }));

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  stop?.();
  document.body.innerHTML = "";
});

describe("startCdocsPreferences", () => {
  it("doesn't store the values in the page's URL", async () => {
    renderPage({
      url: "/dd_e2e/cdocs/custom_instrumentation/?prog_lang=python",
      valsByTraitId: { prog_lang: "python", api_type: "otel_api" },
    });
    await start();

    // Only the filter bar stores values, when the reader picks one.
    expect(readPreferences()).toEqual({});
  });

  it("keeps a stored preference that the URL differs from", async () => {
    writePreferences({ prog_lang: "python" });
    renderPage({
      url: "/dd_e2e/cdocs/custom_instrumentation/?prog_lang=java",
      valsByTraitId: { prog_lang: "java", api_type: "otel_api" },
    });
    await start();
    renderPage({
      url: "/dd_e2e/cdocs/custom_instrumentation/?api_type=dd_api&prog_lang=cpp",
      valsByTraitId: { prog_lang: "cpp", api_type: "dd_api" },
    });
    document.dispatchEvent(new Event("astro:page-load"));

    expect(readPreferences()).toEqual({ prog_lang: "python" });
  });

  it("adds stored preferences to a Cdocs link on hover", async () => {
    writePreferences({ prog_lang: "go", api_type: "dd_api" });
    renderPage({
      url: "/guides/other/",
      links: ["/dd_e2e/cdocs/custom_instrumentation/"],
    });
    await start();
    hover(link());

    expect(link().getAttribute("href")).toBe(
      "/dd_e2e/cdocs/custom_instrumentation/?api_type=dd_api&prog_lang=go",
    );
  });

  it("adds them on touch and focus too", async () => {
    writePreferences({ prog_lang: "go" });
    renderPage({
      url: "/guides/other/",
      links: [
        "/dd_e2e/cdocs/custom_instrumentation/",
        "/dd_e2e/cdocs/custom_instrumentation/#top",
      ],
    });
    await start();
    link(0).dispatchEvent(new Event("touchstart", { bubbles: true }));
    link(1).dispatchEvent(new FocusEvent("focusin", { bubbles: true }));

    expect(link(0).getAttribute("href")).toContain("prog_lang=go");
    expect(link(1).getAttribute("href")).toContain("prog_lang=go");
  });

  it("adds them on pointer down, for a click without a hover first", async () => {
    writePreferences({ prog_lang: "go" });
    renderPage({
      url: "/guides/other/",
      links: ["/dd_e2e/cdocs/custom_instrumentation/"],
    });
    await start();
    link(0).dispatchEvent(new Event("pointerdown", { bubbles: true }));

    expect(link(0).getAttribute("href")).toContain("prog_lang=go");
  });

  it("prefers the current URL's params to stored ones", async () => {
    writePreferences({ prog_lang: "go" });
    renderPage({
      url: "/guides/other/?prog_lang=python",
      links: ["/dd_e2e/cdocs/custom_instrumentation/"],
    });
    await start();
    hover(link());

    expect(link().getAttribute("href")).toBe(
      "/dd_e2e/cdocs/custom_instrumentation/?prog_lang=python",
    );
  });

  it("leaves links to other pages alone", async () => {
    writePreferences({ prog_lang: "go" });
    renderPage({ url: "/guides/other/", links: ["/guides/install/"] });
    await start();
    hover(link());

    expect(link().getAttribute("href")).toBe("/guides/install/");
  });

  it("does nothing on a page without Cdocs page state", async () => {
    writePreferences({ prog_lang: "go" });
    window.history.replaceState({}, "", "/api/latest/");
    document.body.innerHTML = `<a href="/dd_e2e/cdocs/custom_instrumentation/">link</a>`;
    await start();
    hover(link());

    expect(link().getAttribute("href")).toBe(
      "/dd_e2e/cdocs/custom_instrumentation/",
    );
  });

  it("adds every resolved value to the URL, in alphabetical order", async () => {
    renderPage({
      url: "/dd_e2e/cdocs/custom_instrumentation/?utm=x&prog_lang=python#setup",
      valsByTraitId: { prog_lang: "python", api_type: "otel_api" },
    });
    window.history.replaceState({ index: 3 }, "", window.location.href);
    await start();

    expect(window.location.pathname + window.location.search).toBe(
      "/dd_e2e/cdocs/custom_instrumentation/?api_type=otel_api&prog_lang=python&utm=x",
    );
    expect(window.location.hash).toBe("#setup");
    // Astro's router keeps its own data in the history state.
    expect(window.history.state).toEqual({ index: 3 });
  });

  it("replaces a URL value the page didn't use with the resolved one", async () => {
    renderPage({
      url: "/dd_e2e/cdocs/custom_instrumentation/?prog_lang=cobol",
      valsByTraitId: { prog_lang: "java", api_type: "otel_api" },
    });
    await start();

    expect(window.location.search).toBe("?api_type=otel_api&prog_lang=java");
  });

  it("syncs the URL again after a view-transition navigation", async () => {
    renderPage({ url: "/guides/other/" });
    await start();
    renderPage({
      url: "/dd_e2e/cdocs/custom_instrumentation/",
      valsByTraitId: { prog_lang: "java", api_type: "otel_api" },
    });
    document.dispatchEvent(new Event("astro:page-load"));

    expect(window.location.search).toBe("?api_type=otel_api&prog_lang=java");
  });

  it("leaves the URL of a page without filters alone", async () => {
    renderPage({ url: "/guides/other/?b=2&a=1" });
    await start();

    expect(window.location.search).toBe("?b=2&a=1");
  });

  it("adds stored preferences to a view-transition navigation to a Cdocs page", async () => {
    writePreferences({ prog_lang: "go" });
    renderPage({ url: "/guides/other/" });
    await start();

    expect(await navigateTo("/dd_e2e/cdocs/custom_instrumentation/")).toBe(
      "/dd_e2e/cdocs/custom_instrumentation/?prog_lang=go",
    );
  });

  it("uses preferences stored since the page loaded", async () => {
    renderPage({ url: "/guides/other/" });
    await start();
    writePreferences({ prog_lang: "go" });

    expect(await navigateTo("/dd_e2e/cdocs/custom_instrumentation/")).toBe(
      "/dd_e2e/cdocs/custom_instrumentation/?prog_lang=go",
    );
  });

  it("waits for the traits list when it hasn't loaded yet", async () => {
    writePreferences({ prog_lang: "go" });
    renderPage({ url: "/guides/other/" });
    const fetchTraitsList = vi.fn(async () => traitsList);
    // The page never goes idle, so nothing loads the traits list.
    await start({ scheduleIdle: () => {}, fetchTraitsList });

    expect(await navigateTo("/dd_e2e/cdocs/custom_instrumentation/")).toBe(
      "/dd_e2e/cdocs/custom_instrumentation/?prog_lang=go",
    );
    expect(fetchTraitsList).toHaveBeenCalledTimes(1);
  });

  it("doesn't wait long for the traits list, and navigates without preferences", async () => {
    writePreferences({ prog_lang: "go" });
    renderPage({ url: "/guides/other/" });
    await start({
      scheduleIdle: () => {},
      // The traits list never arrives.
      fetchTraitsList: () => new Promise(() => {}),
      traitsListWaitMs: 10,
    });

    expect(await navigateTo("/dd_e2e/cdocs/custom_instrumentation/")).toBe(
      "/dd_e2e/cdocs/custom_instrumentation/",
    );
  });

  it("leaves navigations within the same page alone, like filter bar changes", async () => {
    writePreferences({ prog_lang: "go", api_type: "dd_api" });
    renderPage({
      url: "/dd_e2e/cdocs/custom_instrumentation/?api_type=otel_api&prog_lang=java",
      valsByTraitId: { prog_lang: "java", api_type: "otel_api" },
    });
    await start();

    expect(
      await navigateTo(
        "/dd_e2e/cdocs/custom_instrumentation/?prog_lang=python",
      ),
    ).toBe("/dd_e2e/cdocs/custom_instrumentation/?prog_lang=python");
  });

  it("leaves back and forward navigations alone", async () => {
    writePreferences({ prog_lang: "go" });
    renderPage({ url: "/guides/other/" });
    await start();

    expect(
      await navigateTo("/dd_e2e/cdocs/custom_instrumentation/", "traverse"),
    ).toBe("/dd_e2e/cdocs/custom_instrumentation/");
  });
});
