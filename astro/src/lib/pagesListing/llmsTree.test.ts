import { describe, it, expect } from "vitest";
import { buildLlmsTree, DEFAULT_HARD_CHAR_LIMIT } from "./llmsTree";
import type {
  LlmsIndexSource,
  PlaintextPage,
  PlaintextSection,
} from "./types";

const SITE = "https://docs.datadoghq.com";
const PREVIEW_SITE = "https://docs-staging.datadoghq.com/my-branch";

function stubPage(
  urlPath: string,
  title: string,
  extra: Partial<PlaintextPage["metadata"]> = {},
): PlaintextPage {
  return {
    urlPath,
    metadata: { title, description: "", breadcrumbs: ["Docs"], isPrivate: false, ...extra },
  };
}

function stubSection(title: string, slug: string, pages: PlaintextPage[]): PlaintextSection {
  return { title, llmsTxtPath: `/api/latest/${slug}/llms.txt`, pages };
}

function stubSource(
  title: string,
  rootPages: PlaintextPage[],
  sections: PlaintextSection[],
): LlmsIndexSource {
  return { title, rootPages, sections };
}

/** A source shaped like the real API source: a landing page plus two categories. */
const stubApiSource = () =>
  stubSource(
    "API Reference",
    [stubPage("/api/latest.md", "API Reference", { description: "Reference docs." })],
    [
      stubSection("Metrics", "metrics", [
        stubPage("/api/latest/metrics.md", "Metrics", { description: "Metric endpoints." }),
        stubPage("/api/latest/metrics/get-a-metric.md", "Get a metric"),
      ]),
      stubSection("Logs", "logs", [
        stubPage("/api/latest/logs.md", "Logs"),
        stubPage("/api/latest/logs/send-logs.md", "Send logs"),
      ]),
    ],
  );

describe("buildLlmsTree", () => {
  it("builds an index with the source heading, root pages, and section links", () => {
    const { index } = buildLlmsTree([stubApiSource()], SITE);
    expect(index).toContain("## API Reference\n");
    // Root page linked directly to its .md
    expect(index).toContain(`- [API Reference](${SITE}/api/latest.md): Reference docs.`);
    // Sections linked to their detail llms.txt, with overview description
    expect(index).toContain(`- [Metrics](${SITE}/api/latest/metrics/llms.txt): Metric endpoints.`);
    expect(index).toContain(`- [Logs](${SITE}/api/latest/logs/llms.txt)`);
  });

  it("sorts section links alphabetically", () => {
    const { index } = buildLlmsTree([stubApiSource()], SITE);
    expect(index.indexOf("/logs/llms.txt")).toBeLessThan(index.indexOf("/metrics/llms.txt"));
  });

  it("emits one detail file per section listing its pages", () => {
    const { detailFiles } = buildLlmsTree([stubApiSource()], SITE);
    const metrics = detailFiles.get("/api/latest/metrics/llms.txt");
    expect(metrics).toBeDefined();
    expect(metrics!.startsWith("# Metrics\n")).toBe(true);
    expect(metrics).toContain(`- [Metrics](${SITE}/api/latest/metrics.md)`);
    expect(metrics).toContain(`- [Get a metric](${SITE}/api/latest/metrics/get-a-metric.md)`);
  });

  it("keeps the site's base path in links but not in detail-file keys", () => {
    const { index, detailFiles } = buildLlmsTree([stubApiSource()], PREVIEW_SITE);
    expect(index).toContain(`${PREVIEW_SITE}/api/latest.md`);
    expect(index).toContain(`${PREVIEW_SITE}/api/latest/metrics/llms.txt`);
    // Keys stay site-relative: they become the output file paths on disk.
    expect(detailFiles.has("/api/latest/metrics/llms.txt")).toBe(true);
    expect(detailFiles.get("/api/latest/metrics/llms.txt")).toContain(
      `${PREVIEW_SITE}/api/latest/metrics.md`,
    );
  });

  it("accepts a URL as well as a string, matching Astro's `site`", () => {
    const { index } = buildLlmsTree([stubApiSource()], new URL(PREVIEW_SITE));
    expect(index).toContain(`${PREVIEW_SITE}/api/latest.md`);
  });

  it("excludes private pages and omits sections left empty", () => {
    const source = stubSource(
      "API Reference",
      [stubPage("/api/latest.md", "API Reference")],
      [
        stubSection("Secret", "secret", [
          stubPage("/api/latest/secret.md", "Secret", { isPrivate: true }),
        ]),
        stubSection("Metrics", "metrics", [
          stubPage("/api/latest/metrics.md", "Metrics"),
          stubPage("/api/latest/metrics/hidden.md", "Hidden op", { isPrivate: true }),
        ]),
      ],
    );
    const { index, detailFiles } = buildLlmsTree([source], SITE);
    // Empty section dropped entirely
    expect(index).not.toContain("Secret");
    expect(detailFiles.has("/api/latest/secret/llms.txt")).toBe(false);
    // Private page inside a surviving section dropped
    const metrics = detailFiles.get("/api/latest/metrics/llms.txt");
    expect(metrics).toBeDefined();
    expect(metrics).not.toContain("Hidden op");
  });

  it("drops a private root page from the index", () => {
    const source = stubSource(
      "API Reference",
      [
        stubPage("/api/latest.md", "API Reference"),
        stubPage("/api/latest/internal.md", "Internal notes", { isPrivate: true }),
      ],
      [],
    );
    const { index } = buildLlmsTree([source], SITE);
    expect(index).not.toContain("Internal notes");
  });

  it("splits an oversized section into numbered part files", () => {
    const manyPages = Array.from({ length: 20 }, (_, i) =>
      stubPage(`/api/latest/big/op-${i}.md`, `Operation number ${i} with a longish title`),
    );
    const source = stubSource("API Reference", [], [stubSection("Big", "big", manyPages)]);

    // Tiny limit forces splitting.
    const { detailFiles } = buildLlmsTree([source], SITE, 400);

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

  it("does not split when sections fit the default limit", () => {
    const { detailFiles } = buildLlmsTree([stubApiSource()], SITE);
    for (const contents of detailFiles.values()) {
      expect(contents.length).toBeLessThanOrEqual(DEFAULT_HARD_CHAR_LIMIT);
    }
    expect([...detailFiles.keys()].some((path) => path.includes("/part_"))).toBe(false);
  });

  it("throws when site is empty", () => {
    expect(() => buildLlmsTree([stubApiSource()], "")).toThrow(/site/);
  });
});
