// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { startCdocsPreferences } from "./preferencesClient";
import { readPreferences, writePreferences } from "./preferences";
import { CDOCS_PAGE_STATE_ID, serializeCdocsPageState } from "./pageState";
import type { CdocsTraitsList } from "./cdocsPages";

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
async function start() {
  stop = startCdocsPreferences({
    scheduleIdle: (callback) => callback(),
    fetchTraitsList: async () => traitsList,
  });
  // Let the traits list promise resolve.
  await new Promise((resolve) => setTimeout(resolve, 0));
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
  it("stores the values set by the page's URL params", async () => {
    renderPage({
      url: "/dd_e2e/cdocs/custom_instrumentation/?prog_lang=python",
      valsByTraitId: { prog_lang: "python", api_type: "otel_api" },
    });
    await start();

    // The default API value isn't in the URL, so it isn't stored.
    expect(readPreferences()).toEqual({ prog_lang: "python" });
  });

  it("doesn't store a URL value the page didn't use", async () => {
    renderPage({
      url: "/dd_e2e/cdocs/custom_instrumentation/?prog_lang=cobol",
      valsByTraitId: { prog_lang: "java", api_type: "otel_api" },
    });
    await start();

    expect(readPreferences()).toEqual({});
  });

  it("stores the URL params again after a view-transition navigation", async () => {
    renderPage({ url: "/dd_e2e/cdocs/custom_instrumentation/" });
    await start();
    renderPage({
      url: "/dd_e2e/cdocs/custom_instrumentation/?api_type=dd_api",
      valsByTraitId: { prog_lang: "java", api_type: "dd_api" },
    });
    document.dispatchEvent(new Event("astro:page-load"));

    expect(readPreferences()).toEqual({ api_type: "dd_api" });
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
});
