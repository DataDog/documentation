import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
// @ts-ignore — Preact renderer is registered for SSR of nested islands (CopyButton, etc.).
import preactRenderer from "@astrojs/preact/server.js";
import ApiCodeExample from "../ApiCodeExample.astro";
import type { CodeExampleSet } from "@lib/api/schemas/codeExamples";

const examples = [
  {
    language: "curl",
    label: "cURL",
    entries: [
      {
        description: "Basic call",
        code: "curl https://api.example.com",
        syntax: "shell",
      },
    ],
  },
  {
    language: "python",
    label: "Python",
    entries: [
      { description: "First", code: 'print("hi")', syntax: "python" },
      { description: "Second", code: 'print("bye")', syntax: "python" },
    ],
  },
];

async function createContainer() {
  const container = await AstroContainer.create();
  container.addServerRenderer({
    renderer: preactRenderer,
    name: "@astrojs/preact",
  });
  return container;
}

async function renderComponent(props: { examples: CodeExampleSet[] }) {
  const container = await createContainer();
  return container.renderToString(ApiCodeExample, { props });
}

describe("ApiCodeExample (astro)", () => {
  it("renders nothing when examples is empty", async () => {
    const html = await renderComponent({ examples: [] });
    expect(html).not.toContain("api-code-example__heading");
    expect(html).not.toContain('role="tablist"');
  });

  it("renders a language tab for each example set", async () => {
    const html = await renderComponent({ examples });
    expect(html).toMatch(/data-tab-index="0"[^>]*>cURL</);
    expect(html).toMatch(/data-tab-index="1"[^>]*>Python</);
  });

  it("inlines a single-entry language tab (no accordion)", async () => {
    const html = await renderComponent({ examples: [examples[0]] });
    expect(html).toContain("code-block");
    expect(html).not.toContain("api-code-example__accordion");
  });

  it("titles a single-entry language tab with a static label bar", async () => {
    const html = await renderComponent({ examples: [examples[0]] });
    expect(html).toMatch(/api-code-example__label[^>]*>Basic call</);
  });

  it("renders no label bar for a multi-entry language tab", async () => {
    const html = await renderComponent({ examples: [examples[1]] });
    expect(html).not.toContain("api-code-example__label");
  });

  it("renders an accordion <details> per entry when a language has multiple entries", async () => {
    const html = await renderComponent({ examples: [examples[1]] });
    const detailsMatches =
      html.match(/<details[^>]*api-code-example__accordion/g) ?? [];
    expect(detailsMatches.length).toBe(2);
    expect(html).toMatch(/<span[^>]*>First<\/span>/);
    expect(html).toMatch(/<span[^>]*>Second<\/span>/);
  });

  it("expands only the first accordion entry by default", async () => {
    const html = await renderComponent({ examples: [examples[1]] });
    // First <details> has open, second does not.
    const details = [...html.matchAll(/<details([^>]*)>/g)].map((m) => m[1]);
    expect(details[0]).toMatch(/\bopen\b/);
    expect(details[1]).not.toMatch(/\bopen\b/);
  });

  it("renders run instructions when a set has them", async () => {
    const html = await renderComponent({
      examples: [
        {
          language: "go",
          label: "Go",
          entries: [{ description: "Get", code: "package main", syntax: "go" }],
          instructions: {
            exampleFile: "main.go",
            runCommandByRegion: {
              us: 'DD_SITE="datadoghq.com" go run "main.go"',
              eu: 'DD_SITE="datadoghq.eu" go run "main.go"',
            },
          },
        },
      ],
    });

    expect(html).toContain("api-code-instructions");
  });

  it("omits run instructions when a set has none", async () => {
    const html = await renderComponent({ examples });
    expect(html).not.toContain("api-code-instructions");
  });
});
