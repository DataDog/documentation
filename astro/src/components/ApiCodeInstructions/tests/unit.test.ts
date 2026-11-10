import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
// @ts-ignore — Preact renderer is registered for SSR of nested islands (CopyButton, etc.).
import preactRenderer from "@astrojs/preact/server.js";
import ApiCodeInstructions from "../ApiCodeInstructions.astro";

async function renderComponent() {
  const container = await AstroContainer.create();
  container.addServerRenderer({
    renderer: preactRenderer,
    name: "@astrojs/preact",
  });
  return container.renderToString(ApiCodeInstructions, {
    props: {
      language: "go",
      exampleFile: "main.go",
      runCommandByRegion: {
        us: 'DD_SITE="datadoghq.com" go run "main.go"',
        eu: 'DD_SITE="datadoghq.eu" go run "main.go"',
      },
    },
  });
}

describe("ApiCodeInstructions (astro)", () => {
  it("renders the heading", async () => {
    const html = await renderComponent();
    expect(html).toMatch(
      /api-code-instructions__heading[^>]*>\s*Instructions\s*</,
    );
  });

  it("links to the install instructions for the language", async () => {
    const html = await renderComponent();
    expect(html).toContain('href="/api/latest/?code-lang=go"');
  });

  it("names the example file", async () => {
    const html = await renderComponent();
    expect(html).toContain("<code>main.go</code>");
  });

  it("renders one run command per region", async () => {
    const html = await renderComponent();
    expect(html).toMatch(/data-region="us"[\s\S]*datadoghq\.com/);
    expect(html).toMatch(/data-region="eu"[\s\S]*datadoghq\.eu/);
  });
});
