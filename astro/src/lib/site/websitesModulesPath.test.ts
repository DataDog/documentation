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
    // hugo/go.mod need not exist for this branch to win.
    const fakeAstroConfigUrl = pathToFileURL(
      join(tmpRoot, "astro", "astro.config.mjs"),
    ).href;
    expect(resolveWebsitesModulesPath(fakeAstroConfigUrl)).toBe(realpathSync(tmpRoot));
  });

  it("throws when WEBSITES_MODULES_PATH has none of the required files and no fallback exists", () => {
    process.env.WEBSITES_MODULES_PATH = join(tmpRoot, "incomplete");
    mkdirSync(process.env.WEBSITES_MODULES_PATH, { recursive: true });
    // Point away from this machine's real Hugo module cache, which may hold
    // its own (possibly partial) checkout that would otherwise mask the case
    // under test.
    process.env.HUGO_CACHEDIR = join(tmpRoot, "no-such-hugo-cache");
    const fakeAstroConfigUrl = pathToFileURL(
      join(tmpRoot, "astro", "astro.config.mjs"),
    ).href;
    expect(() => resolveWebsitesModulesPath(fakeAstroConfigUrl)).toThrow(
      /WEBSITES_MODULES_PATH/,
    );
  });

  it("falls back to a partial WEBSITES_MODULES_PATH match with a warning, rather than throwing", () => {
    seedRequiredFiles(tmpRoot);
    // Remove one of the five so the directory is a real, but incomplete, checkout.
    rmSync(join(tmpRoot, "data", "language_names.yaml"));
    process.env.WEBSITES_MODULES_PATH = tmpRoot;
    const fakeAstroConfigUrl = pathToFileURL(
      join(tmpRoot, "astro", "astro.config.mjs"),
    ).href;
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(resolveWebsitesModulesPath(fakeAstroConfigUrl)).toBe(realpathSync(tmpRoot));
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("language_names.yaml"),
    );
    warnSpy.mockRestore();
  });
});
