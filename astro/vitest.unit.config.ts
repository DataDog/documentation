/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixture = path.resolve(__dirname, "tests/fixtures/api");
const siteSupportFixture = path.resolve(
  __dirname,
  "tests/fixtures/siteSupport",
);

// Redirect the four spec/example files to the frozen fixture so unit tests are
// decoupled from the live Hugo spec. The @hugo-site alias is applied by an
// earlier plugin, so by the time our resolveId fires the ids are already
// absolute paths — we match on those absolute paths, not on the alias strings.
//
// `shared/site_support.yaml` is redirected the same way, and for the same
// reason: resolver tests assert on matching behavior, so they must not depend
// on which real products are unsupported. The fixture's keys are invented.
const docRoot = path.resolve(__dirname, "../hugo");
const sharedRoot = path.resolve(__dirname, "../shared");
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
  raw[path.join(sharedRoot, "site_support.yaml")] = path.join(
    siteSupportFixture,
    "site_support.yaml",
  );
  const result: Record<string, string> = {};
  for (const [live, fix] of Object.entries(raw)) {
    result[live] = fix;
    // Also map the double-slash variant the @hugo-site / @shared aliases can emit
    for (const root of [docRoot, sharedRoot]) {
      result[live.replace(root + path.sep, root + path.sep + path.sep)] = fix;
    }
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
  // Closes a hole that predates the staged-examples work: the `import.meta.glob`
  // in `codeExampleLoader.ts` was never redirected, so unit tests read live SDK
  // output — on a fresh clone the seven getOperationView snapshots failed as
  // opaque diffs rather than as "you have not staged the examples".
  //
  // One alias override rather than another `resolveId` interception, which is
  // why the loader's glob is aliased at all. Contrast the four absolute paths
  // and their double-slash variants above.
  resolve: {
    alias: {
      "@api-examples": path.resolve(fixture, "examples"),
    },
  },
  test: {
    name: "fixture",
    include: [
      "tests/headless/**/*.test.ts",
      "src/components/**/tests/unit.test.ts",
      "src/components/**/tests/*.unit.test.ts",
      "src/lib/**/*.test.ts",
      "src/config/**/*.test.ts",
      "src/layouts/**/*.test.ts",
      "src/integrations/**/*.test.ts",
      "scripts/**/*.test.ts",
    ],
  },
});
