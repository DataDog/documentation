import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { access, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { onDemandSitemapPages } from "./onDemandSitemapPages";
import { ON_DEMAND_PAGES_INTERMEDIATE_FILE } from "../lib/sitemap/sitemapFiles";

let clientDir: URL;
let tmpRoot: string;

/** Runs both hooks the way Astro does, against the temp output dir. */
async function runBuild(site: string): Promise<string[]> {
  const onDemandUrls: string[] = [];
  const integration = onDemandSitemapPages(onDemandUrls);
  const hooks = integration.hooks as Record<
    string,
    (arg: unknown) => void | Promise<void>
  >;
  await hooks["astro:config:done"]({
    config: { build: { client: clientDir }, site },
  });
  await hooks["astro:build:done"]({ logger: { info: () => {} } });
  return onDemandUrls;
}

const intermediateFileExists = () =>
  access(new URL(ON_DEMAND_PAGES_INTERMEDIATE_FILE, clientDir)).then(
    () => true,
    () => false,
  );

beforeEach(async () => {
  tmpRoot = await mkdtemp(join(tmpdir(), "on-demand-pages-"));
  clientDir = pathToFileURL(join(tmpRoot, "client") + "/");
  await mkdir(clientDir, { recursive: true });
  await writeFile(
    new URL(ON_DEMAND_PAGES_INTERMEDIATE_FILE, clientDir),
    JSON.stringify(["/guides/setup/", "/guides/setup/?os=windows"]),
    "utf8",
  );
});

afterEach(async () => {
  await rm(tmpRoot, { recursive: true, force: true });
});

describe("onDemandSitemapPages integration", () => {
  it("adds each on-demand page's absolute URL for the sitemap", async () => {
    expect(await runBuild("https://docs.datadoghq.com")).toEqual([
      "https://docs.datadoghq.com/guides/setup/",
      "https://docs.datadoghq.com/guides/setup/?os=windows",
    ]);
  });

  it("keeps the site's base path", async () => {
    expect(
      (await runBuild("https://docs-staging.datadoghq.com/my-branch"))[0],
    ).toBe("https://docs-staging.datadoghq.com/my-branch/guides/setup/");
  });

  it("removes the intermediate file", async () => {
    await runBuild("https://docs.datadoghq.com");

    expect(await intermediateFileExists()).toBe(false);
  });

  it("adds nothing when there's no intermediate file", async () => {
    await rm(new URL(ON_DEMAND_PAGES_INTERMEDIATE_FILE, clientDir));

    expect(await runBuild("https://docs.datadoghq.com")).toEqual([]);
  });
});
