import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, realpathSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { resolveWebsitesModulesPath } from "./websitesModulesPath";

const ORIGINAL_ENV = { ...process.env };

function resetEnv() {
  for (const key of Object.keys(process.env)) {
    delete process.env[key];
  }
  Object.assign(process.env, ORIGINAL_ENV);
}

describe("resolveWebsitesModulesPath", () => {
  let tmpRoot: string;

  beforeEach(() => {
    resetEnv();
    tmpRoot = mkdtempSync(join(tmpdir(), "websites-modules-test-"));
  });

  afterEach(() => {
    resetEnv();
    rmSync(tmpRoot, { recursive: true, force: true });
  });

  /**
   * A fake astro.config.mjs URL nested deep enough inside `tmpRoot` that both
   * paths `resolveWebsitesModulesPath` derives from it — `../hugo/go.mod` and
   * the six-level-up `../../../../../../dd/websites-modules` sibling checkout —
   * land inside the temp dir instead of escaping to a real location on this
   * machine. Without the nesting, the sibling path resolves to `/var/dd/
   * websites-modules`, and the test would silently depend on that not existing.
   */
  function fakeAstroConfigUrl(): string {
    return pathToFileURL(
      join(tmpRoot, "a", "b", "c", "d", "e", "astro", "astro.config.mjs"),
    ).href;
  }

  /** Point HUGO_CACHEDIR at a nonexistent dir so this machine's real Hugo
   * module cache can't satisfy the lookup and mask the branch under test. */
  function isolateHugoCache() {
    process.env.HUGO_CACHEDIR = join(tmpRoot, "no-such-hugo-cache");
  }

  function seedRequiredFiles(dir: string) {
    for (const relative of [
      "config/_default/menus/menus.en.yaml",
      "data/menu_data/menus.yaml",
      "data/menu_data/product_categories.yaml",
      "data/menu_data/products.yaml",
      "data/language_names.yaml",
    ]) {
      const full = join(dir, relative);
      mkdirSync(join(full, ".."), { recursive: true });
      writeFileSync(full, "");
    }
  }

  it("resolves WEBSITES_MODULES_PATH when it has every required file", () => {
    seedRequiredFiles(tmpRoot);
    process.env.WEBSITES_MODULES_PATH = tmpRoot;
    isolateHugoCache();
    // hugo/go.mod need not exist for this branch to win.
    expect(resolveWebsitesModulesPath(fakeAstroConfigUrl())).toBe(
      realpathSync(tmpRoot),
    );
  });

  it("throws when WEBSITES_MODULES_PATH has none of the required files and no fallback exists", () => {
    process.env.WEBSITES_MODULES_PATH = join(tmpRoot, "incomplete");
    mkdirSync(process.env.WEBSITES_MODULES_PATH, { recursive: true });
    isolateHugoCache();
    expect(() => resolveWebsitesModulesPath(fakeAstroConfigUrl())).toThrow(
      /WEBSITES_MODULES_PATH/,
    );
  });

  it("falls back to a partial WEBSITES_MODULES_PATH match with a warning, rather than throwing", () => {
    seedRequiredFiles(tmpRoot);
    // Remove one of the five so the directory is a real, but incomplete, checkout.
    rmSync(join(tmpRoot, "data", "language_names.yaml"));
    process.env.WEBSITES_MODULES_PATH = tmpRoot;
    isolateHugoCache();
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(resolveWebsitesModulesPath(fakeAstroConfigUrl())).toBe(
      realpathSync(tmpRoot),
    );
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("language_names.yaml"),
    );
    warnSpy.mockRestore();
  });

  it("prefers the Hugo module cache over a partial WEBSITES_MODULES_PATH match", () => {
    // The partial-match fallback is a last resort: a complete cached module
    // must win over an incomplete override. This is the precedence that made
    // the partial-match test above fail when it leaked the real HUGO_CACHEDIR.
    seedRequiredFiles(tmpRoot);
    rmSync(join(tmpRoot, "data", "language_names.yaml"));
    process.env.WEBSITES_MODULES_PATH = tmpRoot;

    const cacheDir = join(tmpRoot, "hugo-cache");
    const cachedModule = join(
      cacheDir,
      "modules/filecache/modules/pkg/mod/github.com/!data!dog",
      "websites-modules@v1.4.317",
    );
    mkdirSync(cachedModule, { recursive: true });
    seedRequiredFiles(cachedModule);
    process.env.HUGO_CACHEDIR = cacheDir;

    expect(resolveWebsitesModulesPath(fakeAstroConfigUrl())).toBe(
      realpathSync(cachedModule),
    );
  });
});
