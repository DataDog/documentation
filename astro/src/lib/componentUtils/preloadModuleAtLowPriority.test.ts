// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from "vitest";
import { preloadModuleAtLowPriority } from "./preloadModuleAtLowPriority";

const URL = "https://example.com/_astro/widget.abc123.js";

function findPreloadLink(): HTMLLinkElement | null {
  return document.head.querySelector('link[rel="modulepreload"]');
}

afterEach(() => {
  document.head.innerHTML = "";
});

describe("preloadModuleAtLowPriority", () => {
  it("adds a low-priority module preload for the URL", () => {
    void preloadModuleAtLowPriority(URL);

    const link = findPreloadLink();
    expect(link).not.toBeNull();
    expect(link!.href).toBe(URL);
    // Lowercase attribute, read back as written: the property form
    // (`fetchPriority`) is not reflected by every DOM implementation.
    expect(link!.getAttribute("fetchpriority")).toBe("low");
  });

  it("settles once the module has loaded", async () => {
    const preloaded = preloadModuleAtLowPriority(URL);
    findPreloadLink()!.dispatchEvent(new Event("load"));

    await expect(preloaded).resolves.toBeUndefined();
  });

  it("settles rather than rejects when the preload fails", async () => {
    // A failed preload must not stop the `import()` that follows it, which
    // fetches again on its own and reports the real error if there is one.
    const preloaded = preloadModuleAtLowPriority(URL);
    findPreloadLink()!.dispatchEvent(new Event("error"));

    await expect(preloaded).resolves.toBeUndefined();
  });
});
