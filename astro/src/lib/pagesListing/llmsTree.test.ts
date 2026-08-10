import { describe, it, expect } from "vitest";
import { buildLlmsTree, DEFAULT_HARD_CHAR_LIMIT } from "./llmsTree";
import type { PlaintextPage, PlaintextPageSource, PlaintextSection } from "./types";

const SITE = "https://docs.datadoghq.com";

function page(
  urlPath: string,
  title: string,
  extra: Partial<PlaintextPage["metadata"]> = {},
): PlaintextPage {
  return {
    urlPath,
    metadata: { title, description: "", breadcrumbs: ["Docs"], isPrivate: false, ...extra },
    buildBody: async () => "",
  };
}

function section(title: string, slug: string, pages: PlaintextPage[]): PlaintextSection {
  return { title, llmsTxtPath: `/api/latest/${slug}/llms.txt`, pages };
}

function source(
  title: string,
  rootPages: PlaintextPage[],
  sections: PlaintextSection[],
): PlaintextPageSource {
  return {
    title,
    listRootPages: async () => rootPages,
    listSections: async () => sections,
  };
}

const apiLike = () =>
  source(
    "API Reference",
    [page("/api/latest.md", "API Reference", { description: "Reference docs." })],
    [
      section("Metrics", "metrics", [
        page("/api/latest/metrics.md", "Metrics", { description: "Metric endpoints." }),
        page("/api/latest/metrics/get-a-metric.md", "Get a metric"),
      ]),
      section("Logs", "logs", [
        page("/api/latest/logs.md", "Logs"),
        page("/api/latest/logs/send-logs.md", "Send logs"),
      ]),
    ],
  );

describe("buildLlmsTree", () => {
  it("builds an index with the source heading, root pages, and section links", async () => {
    const { index } = await buildLlmsTree([apiLike()], SITE);
    expect(index).toContain("## API Reference\n");
    // Root page linked directly to its .md
    expect(index).toContain(`- [API Reference](${SITE}/api/latest.md): Reference docs.`);
    // Sections linked to their detail llms.txt, with overview description
    expect(index).toContain(`- [Metrics](${SITE}/api/latest/metrics/llms.txt): Metric endpoints.`);
    expect(index).toContain(`- [Logs](${SITE}/api/latest/logs/llms.txt)`);
  });

  it("sorts section links alphabetically", async () => {
    const { index } = await buildLlmsTree([apiLike()], SITE);
    expect(index.indexOf("/logs/llms.txt")).toBeLessThan(index.indexOf("/metrics/llms.txt"));
  });

  it("emits one detail file per section listing its pages", async () => {
    const { detailFiles } = await buildLlmsTree([apiLike()], SITE);
    const metrics = detailFiles.get("/api/latest/metrics/llms.txt");
    expect(metrics).toBeDefined();
    expect(metrics!.startsWith("# Metrics\n")).toBe(true);
    expect(metrics).toContain(`- [Metrics](${SITE}/api/latest/metrics.md)`);
    expect(metrics).toContain(`- [Get a metric](${SITE}/api/latest/metrics/get-a-metric.md)`);
  });

  it("excludes private pages and omits sections left empty", async () => {
    const src = source(
      "API Reference",
      [page("/api/latest.md", "API Reference")],
      [
        section("Secret", "secret", [
          page("/api/latest/secret.md", "Secret", { isPrivate: true }),
        ]),
        section("Metrics", "metrics", [
          page("/api/latest/metrics.md", "Metrics"),
          page("/api/latest/metrics/hidden.md", "Hidden op", { isPrivate: true }),
        ]),
      ],
    );
    const { index, detailFiles } = await buildLlmsTree([src], SITE);
    // Empty section dropped entirely
    expect(index).not.toContain("Secret");
    expect(detailFiles.has("/api/latest/secret/llms.txt")).toBe(false);
    // Private page inside a surviving section dropped
    const metrics = detailFiles.get("/api/latest/metrics/llms.txt");
    expect(metrics).toBeDefined();
    expect(metrics).not.toContain("Hidden op");
  });

  it("splits an oversized section into numbered part files", async () => {
    const manyPages = Array.from({ length: 20 }, (_, i) =>
      page(`/api/latest/big/op-${i}.md`, `Operation number ${i} with a longish title`),
    );
    const src = source("API Reference", [], [section("Big", "big", manyPages)]);

    // Tiny limit forces splitting.
    const { detailFiles } = await buildLlmsTree([src], SITE, 400);

    const indexFile = detailFiles.get("/api/latest/big/llms.txt");
    expect(indexFile).toBeDefined();
    expect(indexFile).toContain("- [Part 1](" + SITE + "/api/latest/big/part_1/llms.txt)");
    expect(detailFiles.has("/api/latest/big/part_1/llms.txt")).toBe(true);
    expect(detailFiles.has("/api/latest/big/part_2/llms.txt")).toBe(true);

    // Every generated file respects the limit.
    for (const contents of detailFiles.values()) {
      expect(contents.length).toBeLessThanOrEqual(400);
    }
  });

  it("does not split when sections fit (default limit)", async () => {
    const { detailFiles } = await buildLlmsTree([apiLike()], DEFAULT_HARD_CHAR_LIMIT ? SITE : SITE);
    expect([...detailFiles.keys()].some((k) => k.includes("/part_"))).toBe(false);
  });

  it("throws when siteOrigin is empty", async () => {
    await expect(buildLlmsTree([apiLike()], "")).rejects.toThrow(/siteOrigin/);
  });
});
