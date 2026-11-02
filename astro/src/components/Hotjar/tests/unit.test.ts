import { describe, it, expect, afterEach } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Hotjar from "../Hotjar.astro";

/**
 * Hotjar is resolved server-side from `CI_ENVIRONMENT_NAME`, so each
 * environment is exercised by setting the variable before rendering.
 */

const originalEnv = process.env.CI_ENVIRONMENT_NAME;

async function renderHotjarIn(env: string | undefined): Promise<string> {
  if (env === undefined) delete process.env.CI_ENVIRONMENT_NAME;
  else process.env.CI_ENVIRONMENT_NAME = env;
  const container = await AstroContainer.create();
  return container.renderToString(Hotjar);
}

describe("Hotjar", () => {
  afterEach(() => {
    if (originalEnv === undefined) delete process.env.CI_ENVIRONMENT_NAME;
    else process.env.CI_ENVIRONMENT_NAME = originalEnv;
  });

  it("renders nothing in development", async () => {
    const html = await renderHotjarIn(undefined);
    expect(html.trim()).toBe("");
  });

  it("renders the live site ID on live", async () => {
    const html = await renderHotjarIn("live");
    expect(html).toContain("static.hotjar.com/c/hotjar-");
    expect(html).toContain("1021060");
    expect(html).not.toContain("1022108");
  });

  it("renders the preview site ID on preview", async () => {
    const html = await renderHotjarIn("preview");
    expect(html).toContain("static.hotjar.com/c/hotjar-");
    expect(html).toContain("1022108");
    expect(html).not.toContain("1021060");
  });

  it("preconnects to the Hotjar origin when enabled", async () => {
    const html = await renderHotjarIn("live");
    expect(html).toMatch(
      /<link[^>]*rel="dns-prefetch preconnect"[^>]*href="https:\/\/static\.hotjar\.com"/,
    );
  });
});
