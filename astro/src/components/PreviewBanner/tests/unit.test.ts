import { describe, it, expect, afterEach } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import PreviewBanner from "../PreviewBanner.astro";

/**
 * The banner is resolved server-side from `CI_ENVIRONMENT_NAME` and
 * `CI_COMMIT_REF_NAME`, so each case sets them before rendering.
 */

const originalEnv = process.env.CI_ENVIRONMENT_NAME;
const originalRef = process.env.CI_COMMIT_REF_NAME;

function restore(name: string, value: string | undefined) {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

async function renderPreviewBannerIn(
  env: string | undefined,
  ref: string | undefined,
): Promise<string> {
  restore("CI_ENVIRONMENT_NAME", env);
  restore("CI_COMMIT_REF_NAME", ref);
  const container = await AstroContainer.create();
  return container.renderToString(PreviewBanner);
}

describe("PreviewBanner", () => {
  afterEach(() => {
    restore("CI_ENVIRONMENT_NAME", originalEnv);
    restore("CI_COMMIT_REF_NAME", originalRef);
  });

  it("renders nothing in development", async () => {
    const html = await renderPreviewBannerIn(undefined, "jen.gilbert/foo");
    expect(html.trim()).toBe("");
  });

  it("renders nothing on live", async () => {
    const html = await renderPreviewBannerIn("live", "master");
    expect(html.trim()).toBe("");
  });

  it("renders the branch name on preview, linked like Hugo", async () => {
    const html = await renderPreviewBannerIn("preview", "jen.gilbert/foo");
    expect(html).toContain('class="preview-banner');
    expect(html).toContain("PREVIEWING:");
    expect(html).toMatch(
      /<a[^>]*href="https:\/\/github\.com\/DataDog\/documentation\/pull\/jen\.gilbert\/foo"[^>]*>\s*jen\.gilbert\/foo\s*<\/a>/,
    );
  });
});
