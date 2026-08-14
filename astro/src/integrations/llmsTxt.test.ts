import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { llmsTxt } from "./llmsTxt";
import type { LlmsIndex } from "../lib/pagesListing/types";

const SITE = "https://docs.datadoghq.com";
const PREVIEW_SITE = "https://docs-staging.datadoghq.com/my-branch";
const SIDECAR = "llms-index.json";

function page(urlPath: string, title: string, isPrivate = false) {
  return {
    urlPath,
    metadata: { title, description: "", breadcrumbs: ["Docs"], isPrivate },
  };
}

const sidecar: LlmsIndex = [
  {
    title: "API Reference",
    rootPages: [page("/api/latest.md", "API Reference")],
    sections: [
      {
        title: "Metrics",
        llmsTxtPath: "/api/latest/metrics/llms.txt",
        pages: [
          page("/api/latest/metrics.md", "Metrics"),
          page("/api/latest/metrics/get-a-metric.md", "Get a metric"),
          page("/api/latest/metrics/secret.md", "Secret op", true),
        ],
      },
    ],
  },
];

let clientDir: URL;
let tmpRoot: string;

/**
 * Runs both hooks the way Astro does, against the temp output dir. `site` is
 * required rather than defaulted so the unset case is actually testable.
 */
async function runBuild(site: string | undefined): Promise<void> {
  const integration = llmsTxt();
  const hooks = integration.hooks as Record<
    string,
    (arg: unknown) => void | Promise<void>
  >;
  await hooks["astro:config:done"]({ config: { build: { client: clientDir }, site } });
  await hooks["astro:build:done"]({ logger: { info: () => {} } });
}

const readOutput = (file: string) =>
  readFile(new URL(file, clientDir), "utf8");

beforeEach(async () => {
  tmpRoot = await mkdtemp(join(tmpdir(), "llms-txt-"));
  // Trailing slash so `new URL(relative, clientDir)` resolves inside the dir,
  // matching Astro's `config.build.client`.
  clientDir = pathToFileURL(join(tmpRoot, "client") + "/");
  await mkdir(clientDir, { recursive: true });
  await writeFile(new URL(SIDECAR, clientDir), JSON.stringify(sidecar), "utf8");
});

afterEach(async () => {
  await rm(tmpRoot, { recursive: true, force: true });
});

describe("llmsTxt integration", () => {
  it("writes the top-level llms.txt index", async () => {
    await runBuild(SITE);
    const index = await readOutput("llms.txt");
    expect(index.startsWith("# Datadog documentation\n")).toBe(true);
    expect(index).toContain("## API Reference");
    expect(index).toContain(
      `- [Metrics](${SITE}/api/latest/metrics/llms.txt)`,
    );
  });

  it("writes each section detail file into its nested directory", async () => {
    await runBuild(SITE);
    const metrics = await readOutput("api/latest/metrics/llms.txt");
    expect(metrics.startsWith("# Metrics\n")).toBe(true);
    expect(metrics).toContain(`- [Metrics](${SITE}/api/latest/metrics.md)`);
    expect(metrics).toContain(
      `- [Get a metric](${SITE}/api/latest/metrics/get-a-metric.md)`,
    );
  });

  it("honors privacy, dropping private pages from the written files", async () => {
    await runBuild(SITE);
    const metrics = await readOutput("api/latest/metrics/llms.txt");
    expect(metrics).not.toContain("Secret op");
    expect(metrics).not.toContain("secret.md");
  });

  it("removes the sidecar so it never reaches a deploy", async () => {
    await runBuild(SITE);
    await expect(readOutput(SIDECAR)).rejects.toThrow();
  });

  it("keeps the preview base path in links but not in disk paths", async () => {
    await runBuild(PREVIEW_SITE);
    // Written at the output root, with no branch segment in the path...
    const metrics = await readOutput("api/latest/metrics/llms.txt");
    // ...while the links inside it carry the branch prefix.
    expect(metrics).toContain(`${PREVIEW_SITE}/api/latest/metrics.md`);
    await expect(readOutput("my-branch/api/latest/metrics/llms.txt")).rejects.toThrow();
  });

  it("fails the build when site is not configured", async () => {
    await expect(runBuild(undefined)).rejects.toThrow(/site/);
  });
});
