/**
 * Fetches a module at low priority, so a later `import()` of the same URL finds
 * it already in the module map. Settles when the fetch finishes, either way.
 *
 * `import()` always fetches at high priority, which tells the browser — and
 * Lighthouse, which counts every high-priority script in its network dependency
 * tree regardless of when it was requested — that the module is critical. For a
 * module loaded after the page is done, that is untrue.
 *
 * The URL must be the exact one the `import()` resolves to; any other URL is a
 * second download. `chunk-url:` imports provide it.
 */
export function preloadModuleAtLowPriority(url: string): Promise<void> {
  return new Promise((resolve) => {
    const link = document.createElement("link");
    link.rel = "modulepreload";
    link.setAttribute("fetchpriority", "low");
    link.href = url;
    // Resolved on error too: the `import()` that follows refetches and reports
    // the failure itself, so the preload has nothing useful to add.
    link.addEventListener("load", () => resolve(), { once: true });
    link.addEventListener("error", () => resolve(), { once: true });
    document.head.append(link);
  });
}
