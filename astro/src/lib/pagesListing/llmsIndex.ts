import type { LlmsIndex, PlaintextPageSource } from "./types";

/**
 * Resolves every page source into the `llms-index.json` sidecar.
 *
 * This is the only step of the llms.txt build that needs the page sources, and
 * so the only step that must run inside Vite: the sources reach the API spec
 * through `import.meta.glob` and yaml imports, which do not resolve in plain
 * Node. Emitting their resolved output as a sidecar lets the `llmsTxt`
 * integration build the whole tree once, after the build, from data alone.
 *
 * Site-free by design — pages keep their `urlPath`, and `site` is applied once
 * when the files are written. That is what keeps the output paths from depending
 * on the deploy origin.
 */
export async function buildLlmsIndex(
  sources: PlaintextPageSource[],
): Promise<LlmsIndex> {
  const index: LlmsIndex = [];
  for (const source of sources) {
    index.push({
      title: source.title,
      rootPages: await source.listRootPages(),
      sections: await source.listSections(),
    });
  }
  return index;
}
