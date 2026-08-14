import { describe, it, expect } from "vitest";
import { buildLlmsIndex } from "./llmsIndex";
import {
  LlmsIndexSchema,
  type PlaintextPage,
  type PlaintextPageSource,
} from "./types";

function stubPage(urlPath: string, title: string): PlaintextPage {
  return {
    urlPath,
    metadata: {
      title,
      description: "",
      breadcrumbs: ["Docs"],
      isPrivate: false,
    },
  };
}

const apiSource: PlaintextPageSource = {
  title: "API Reference",
  listRootPages: async () => [stubPage("/api/latest.md", "API Reference")],
  listSections: async () => [
    {
      title: "Metrics",
      llmsTxtPath: "/api/latest/metrics/llms.txt",
      pages: [
        stubPage("/api/latest/metrics.md", "Metrics"),
        stubPage("/api/latest/metrics/get-a-metric.md", "Get a metric"),
      ],
    },
  ],
};

const cdocsSource: PlaintextPageSource = {
  title: "Cdocs",
  listRootPages: async () => [stubPage("/agent.md", "Agent")],
  listSections: async () => [],
};

describe("buildLlmsIndex", () => {
  it("emits one entry per source, in registry order", async () => {
    const index = await buildLlmsIndex([apiSource, cdocsSource]);
    expect(index.map((source) => source.title)).toEqual([
      "API Reference",
      "Cdocs",
    ]);
  });

  it("carries each source's root pages and sections verbatim", async () => {
    const [api] = await buildLlmsIndex([apiSource]);
    expect(api.rootPages).toEqual([stubPage("/api/latest.md", "API Reference")]);
    expect(api.sections).toHaveLength(1);
    expect(api.sections[0].llmsTxtPath).toBe("/api/latest/metrics/llms.txt");
  });

  it("preserves section page order so the overview page stays first", async () => {
    const [api] = await buildLlmsIndex([apiSource]);
    expect(api.sections[0].pages.map((page) => page.urlPath)).toEqual([
      "/api/latest/metrics.md",
      "/api/latest/metrics/get-a-metric.md",
    ]);
  });

  it("produces a sidecar that validates against LlmsIndexSchema", async () => {
    const index = await buildLlmsIndex([apiSource, cdocsSource]);
    expect(() => LlmsIndexSchema.parse(index)).not.toThrow();
  });

  it("bakes in no site URL, so the sidecar is origin-independent", async () => {
    const index = await buildLlmsIndex([apiSource, cdocsSource]);
    expect(JSON.stringify(index)).not.toMatch(/https?:/);
  });
});
