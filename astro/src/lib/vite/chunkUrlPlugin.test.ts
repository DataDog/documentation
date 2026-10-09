import { describe, it, expect } from "vitest";
import { build, type Rolldown } from "vite";
import { fileURLToPath } from "node:url";
import { chunkUrlPlugin } from "./chunkUrlPlugin";

const fixtureDir = fileURLToPath(
  new URL("../../../tests/fixtures/chunkUrl/", import.meta.url),
);

/**
 * A real build of a two-file fixture, not the site: the claim under test is
 * about how the bundler assigns chunks, which no mock can stand in for.
 */
async function buildFixture(): Promise<Rolldown.OutputChunk[]> {
  const result = await build({
    root: fixtureDir,
    configFile: false,
    logLevel: "silent",
    plugins: [chunkUrlPlugin()],
    build: {
      write: false,
      minify: false,
      modulePreload: false,
      rollupOptions: { input: { main: `${fixtureDir}main.js` } },
    },
  });
  const outputs = Array.isArray(result) ? result : [result];
  return (outputs as Rolldown.RolldownOutput[])
    .flatMap((output) => output.output)
    .filter((item): item is Rolldown.OutputChunk => item.type === "chunk");
}

describe("chunkUrlPlugin", () => {
  it("resolves to the very chunk the dynamic import loads", async () => {
    const chunks = await buildFixture();

    // One chunk, not two: if emitting the URL produced its own copy, a preload
    // of that URL would warm a file the dynamic import never requests.
    const lazyChunks = chunks.filter((chunk) =>
      // `\0` excludes the plugin's own virtual module, whose id also ends in
      // `lazy.js` and which lives in the importing chunk.
      chunk.moduleIds.some(
        (id) => !id.startsWith("\0") && id.endsWith("lazy.js"),
      ),
    );
    expect(lazyChunks).toHaveLength(1);
    const lazyFileName = lazyChunks[0].fileName;

    const mainChunk = chunks.find((chunk) => chunk.name === "main");
    expect(mainChunk).toBeDefined();
    expect(mainChunk!.dynamicImports).toEqual([lazyFileName]);

    // Relative to the importing chunk, so the caller resolves it against its
    // own `import.meta.url` and inherits whatever base the site is served at.
    const lazyBaseName = lazyFileName.split("/").at(-1);
    expect(mainChunk!.code).toContain(`"./${lazyBaseName}"`);
  });
});
