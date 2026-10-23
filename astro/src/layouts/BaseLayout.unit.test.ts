import { describe, it, expect } from "vitest";
import { Window } from "happy-dom";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
// @ts-ignore — Preact renderer is registered for SSR of islands rendered in the layout.
import preactRenderer from "@astrojs/preact/server.js";
import BaseLayout from "./BaseLayout.astro";

const parserWindow = new Window();

async function renderBaseLayout(): Promise<Document> {
  const container = await AstroContainer.create();
  container.addServerRenderer({
    renderer: preactRenderer,
    name: "@astrojs/preact",
  });
  const html = await container.renderToString(BaseLayout, {
    props: { title: "Test page" },
  });
  return new parserWindow.DOMParser().parseFromString(
    html,
    "text/html",
  ) as unknown as Document;
}

describe("BaseLayout.astro", () => {
  it("renders <html> without a data-commit-ref attribute", async () => {
    // pageTextLoader.ts and other consumers work off Astro.url.pathname, which
    // this design keeps prefix-free by design (the branch prefix lives in
    // `site` and in `pathPrefix()`, never mutated into the page's own DOM).
    // Adding a data-commit-ref attribute here would signal a design change
    // that ripples into those call sites — pin that it doesn't exist.
    const doc = await renderBaseLayout();
    const html = doc.querySelector("html");
    expect(html).not.toBeNull();
    expect(html?.getAttribute("data-commit-ref")).toBeNull();
  });
});
