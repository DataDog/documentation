/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixture = path.resolve(__dirname, "tests/fixtures/api");

// Redirect the four spec/example files to the frozen fixture so unit tests are
// decoupled from the live Hugo spec. The @hugo-site alias is applied by an
// earlier plugin, so by the time our resolveId fires the ids are already
// absolute paths — we match on those absolute paths, not on the alias strings.
const docRoot = path.resolve(__dirname, "..");
function buildLiveToFixtureMap(): Record<string, string> {
  const raw: Record<string, string> = {
    [path.join(docRoot, "data/api/v1/full_spec.yaml")]: path.join(
      fixture,
      "v1/partial_spec.yaml",
    ),
    [path.join(docRoot, "data/api/v2/full_spec.yaml")]: path.join(
      fixture,
      "v2/partial_spec.yaml",
    ),
    [path.join(docRoot, "data/api/v1/CodeExamples.json")]: path.join(
      fixture,
      "v1/CodeExamples.json",
    ),
    [path.join(docRoot, "data/api/v2/CodeExamples.json")]: path.join(
      fixture,
      "v2/CodeExamples.json",
    ),
  };
  const result: Record<string, string> = {};
  for (const [live, fix] of Object.entries(raw)) {
    result[live] = fix;
    // Also map the double-slash variant the @hugo-site alias can emit
    result[live.replace(docRoot + path.sep, docRoot + path.sep + path.sep)] =
      fix;
  }
  return result;
}
const liveToFixture = buildLiveToFixtureMap();

const frozenApiSpecPlugin: Plugin = {
  name: "frozen-api-spec",
  enforce: "pre",
  resolveId(id: string) {
    const qIdx = id.indexOf("?");
    const bare = path.normalize(qIdx === -1 ? id : id.slice(0, qIdx));
    const query = qIdx === -1 ? "" : id.slice(qIdx);
    const fixturePath = liveToFixture[bare];
    if (fixturePath) return fixturePath + query;
  },
};

export default getViteConfig({
  plugins: [frozenApiSpecPlugin],
  test: {
    name: "unit",
    include: [
      "tests/headless/**/*.test.ts",
      "src/components/**/*.test.ts",
      "src/utils/**/*.test.ts",
      "src/lib/**/*.test.ts",
    ],
  },
});
