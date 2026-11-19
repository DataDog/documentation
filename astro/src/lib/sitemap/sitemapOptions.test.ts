import { describe, it, expect } from "vitest";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import sitemap from "@astrojs/sitemap";
import { sitemapOptions } from "./sitemapOptions";

/** Runs `@astrojs/sitemap` the way Astro does, adding on-demand URLs between its hooks. */
async function writeSitemap(builtPathnames: string[], onDemandPaths: string[]) {
  const site = "https://docs.datadoghq.com";
  const onDemandUrls: string[] = [];
  const hooks = sitemap(sitemapOptions(onDemandUrls)).hooks as Record<
    string,
    (arg: unknown) => void | Promise<void>
  >;
  const outDir = await mkdtemp(join(tmpdir(), "sitemap-"));
  try {
    await hooks["astro:routes:resolved"]({ routes: [] });
    await hooks["astro:config:done"]({
      config: {
        site,
        base: "/",
        trailingSlash: "ignore",
        build: { format: "directory" },
      },
    });
    // What the `onDemandSitemapPages` integration does, earlier in the same hook.
    onDemandUrls.push(...onDemandPaths.map((path) => `${site}${path}`));
    await hooks["astro:build:done"]({
      dir: pathToFileURL(`${outDir}/`),
      pages: builtPathnames.map((pathname) => ({ pathname })),
      logger: { warn: () => {}, error: () => {}, info: () => {} },
    });

    const files = (await readdir(outDir)).sort();
    const chunk = await readFile(join(outDir, "sitemap-0.xml"), "utf8");
    const locs = [...chunk.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, loc]) =>
      loc.replaceAll("&amp;", "&"),
    );
    return { files, locs };
  } finally {
    await rm(outDir, { recursive: true, force: true });
  }
}

describe("sitemapOptions", () => {
  it("writes the sitemap at the root", () => {
    expect(sitemapOptions([]).filenameBase).toBe("sitemap");
  });

  it("lists the on-demand pages added after the options are made", () => {
    const onDemandUrls: string[] = [];
    const options = sitemapOptions(onDemandUrls);
    // The integration that reads them runs in `astro:build:done`.
    onDemandUrls.push("https://docs.datadoghq.com/dd_e2e/cdocs/setup/");

    expect(options.customPages).toBe(onDemandUrls);
    expect(
      options.filter("https://docs.datadoghq.com/dd_e2e/cdocs/setup/"),
    ).toBe(true);
  });

  it("filters built pages the same way as before", () => {
    const options = sitemapOptions([]);

    expect(
      options.filter("https://docs.datadoghq.com/api/latest/metrics/"),
    ).toBe(true);
    expect(
      options.filter("https://docs.datadoghq.com/dd_e2e/components/alert/"),
    ).toBe(false);
  });
});

describe("the sitemap @astrojs/sitemap writes with these options", () => {
  it("is at the root, and lists built pages and on-demand pages together", async () => {
    const { files, locs } = await writeSitemap(
      ["api/latest/metrics/", "dd_e2e/components/alert/"],
      ["/dd_e2e/cdocs/setup/", "/dd_e2e/cdocs/setup/?os=windows"],
    );

    expect(files).toEqual(["sitemap-0.xml", "sitemap-index.xml"]);
    expect(locs.sort()).toEqual([
      "https://docs.datadoghq.com/api/latest/metrics/",
      "https://docs.datadoghq.com/dd_e2e/cdocs/setup/",
      "https://docs.datadoghq.com/dd_e2e/cdocs/setup/?os=windows",
    ]);
  });
});
