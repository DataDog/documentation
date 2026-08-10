import { describe, it, expect } from "vitest";
import { renderLlmsTxt } from "./llmsTxtRenderer";
import type { PlaintextPage } from "./types";

const SITE = "https://docs.datadoghq.com";

function page(
  urlPath: string,
  title: string,
  breadcrumbs: string[],
  extra: Partial<PlaintextPage["metadata"]> = {},
): PlaintextPage {
  return {
    urlPath,
    metadata: { title, description: "", breadcrumbs, isPrivate: false, ...extra },
    buildBody: async () => "",
  };
}

describe("renderLlmsTxt", () => {
  it("groups pages by breadcrumb trail (Docs root dropped), headings sorted", () => {
    const out = renderLlmsTxt(
      [
        page("/api/latest/metrics/get.md", "Get a metric", ["Docs", "API Reference", "Metrics"]),
        page("/api/latest/metrics.md", "Metrics", ["Docs", "API Reference"]),
        page("/api/latest/logs/send.md", "Send logs", ["Docs", "API Reference", "Logs"]),
      ],
      SITE,
    );
    const idxApi = out.indexOf("## API Reference\n");
    const idxLogs = out.indexOf("## API Reference > Logs\n");
    const idxMetrics = out.indexOf("## API Reference > Metrics\n");
    expect(idxApi).toBeGreaterThanOrEqual(0);
    expect(idxLogs).toBeGreaterThanOrEqual(0);
    expect(idxMetrics).toBeGreaterThanOrEqual(0);
    // Sorted: "API Reference" < "API Reference > Logs" < "API Reference > Metrics"
    expect(idxApi).toBeLessThan(idxLogs);
    expect(idxLogs).toBeLessThan(idxMetrics);
  });

  it("emits absolute .md links, with description after a colon when present", () => {
    const out = renderLlmsTxt(
      [
        page("/api/latest/metrics/get.md", "Get a metric", ["Docs", "API Reference", "Metrics"], {
          description: "Fetch a metric's metadata.",
        }),
      ],
      SITE,
    );
    expect(out).toContain(
      "- [Get a metric](https://docs.datadoghq.com/api/latest/metrics/get.md): Fetch a metric's metadata.",
    );
  });

  it("emits a bare link when there is no description", () => {
    const out = renderLlmsTxt(
      [page("/api/latest/metrics/get.md", "Get a metric", ["Docs", "API Reference", "Metrics"])],
      SITE,
    );
    expect(out).toContain(
      "- [Get a metric](https://docs.datadoghq.com/api/latest/metrics/get.md)\n",
    );
    expect(out).not.toContain("get.md):");
  });

  it("places pages with only the Docs breadcrumb under no heading (top of file)", () => {
    const out = renderLlmsTxt(
      [
        page("/api/latest.md", "API Reference", ["Docs"]),
        page("/api/latest/metrics.md", "Metrics", ["Docs", "API Reference"]),
      ],
      SITE,
    );
    const landingIdx = out.indexOf("- [API Reference](https://docs.datadoghq.com/api/latest.md)");
    const headingIdx = out.indexOf("## API Reference\n");
    expect(landingIdx).toBeGreaterThanOrEqual(0);
    expect(headingIdx).toBeGreaterThan(landingIdx); // landing listed before any ## heading
  });

  it("excludes private pages entirely", () => {
    const out = renderLlmsTxt(
      [
        page("/api/latest/metrics/public.md", "Public op", ["Docs", "API Reference", "Metrics"]),
        page("/api/latest/metrics/secret.md", "Secret op", ["Docs", "API Reference", "Metrics"], {
          isPrivate: true,
        }),
      ],
      SITE,
    );
    expect(out).toContain("Public op");
    expect(out).not.toContain("Secret op");
    expect(out).not.toContain("secret.md");
  });

  it("throws when siteOrigin is empty", () => {
    expect(() =>
      renderLlmsTxt([page("/a.md", "A", ["Docs"])], ""),
    ).toThrow(/siteOrigin/);
  });
});
