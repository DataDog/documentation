/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import { FIXTURE_SDK_VERSIONS } from "./tests/fixtures/api/sdkVersions";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixture = path.resolve(__dirname, "tests/fixtures/api");
const siteSupportFixture = path.resolve(
  __dirname,
  "tests/fixtures/siteSupport",
);

// Redirect the four spec/example files to the frozen fixture so unit tests are
// decoupled from the live spec staged in api-spec/. The @api-spec alias is
// applied by an earlier plugin, so by the time our resolveId fires the ids are
// already absolute paths — we match on those absolute paths, not on the alias
// strings.
//
// `shared/site_support.yaml` is redirected the same way, and for the same
// reason: resolver tests assert on matching behavior, so they must not depend
// on which real products are unsupported. The fixture's keys are invented.
const apiSpecRoot = path.resolve(__dirname, "api-spec");
const sharedRoot = path.resolve(__dirname, "../shared");
function buildLiveToFixtureMap(): Record<string, string> {
  const raw: Record<string, string> = {
    [path.join(apiSpecRoot, "v1/full_spec.yaml")]: path.join(
      fixture,
      "v1/partial_spec.yaml",
    ),
    [path.join(apiSpecRoot, "v2/full_spec.yaml")]: path.join(
      fixture,
      "v2/partial_spec.yaml",
    ),
    [path.join(apiSpecRoot, "v1/CodeExamples.json")]: path.join(
      fixture,
      "v1/CodeExamples.json",
    ),
    [path.join(apiSpecRoot, "v2/CodeExamples.json")]: path.join(
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
    // Also map the double-slash variant the @api-spec / @shared aliases can emit
    for (const root of [apiSpecRoot, sharedRoot]) {
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
  //
  // The changelog's glob in `changelog.ts` and the request files' glob in
  // `requestFileLoader.ts` read through `@hugo-site` for the same reason, so
  // each is redirected with a narrower key. These aliases are merged ahead of
  // `astro.config.mjs`'s, so these keys match before `@hugo-site` does.
  //
  // The translation overlays' glob in `translationsLoader.ts` lives under
  // `@api-spec` beside the spec itself, so no key prefix can pick it out
  // without also catching `full_spec.yaml`. A regex on the `translate_`
  // filename does, and it rewrites the glob pattern itself, `v*` included.
  resolve: {
    alias: [
      { find: "@api-examples", replacement: path.resolve(fixture, "examples") },
      {
        find: "@hugo-site/data/changelog",
        replacement: path.resolve(fixture, "changelog"),
      },
      {
        find: "@hugo-site/content/en/api",
        replacement: path.resolve(fixture, "request-files"),
      },
      {
        find: /^@api-spec\/(v[^/]*)\/translate_/,
        replacement: `${fixture}/$1/translate_`,
      },
    ],
  },
  // `astro.config.mjs` reads the live `api-code-examples/` stamp into this
  // define. Override it with frozen versions so `{% $sdkVersions.<client> %}`
  // renders the same value on every run, and on a fresh clone with no stamp.
  define: {
    __SDK_VERSIONS__: JSON.stringify(FIXTURE_SDK_VERSIONS),
  },
  test: {
    name: "fixture",
    include: [
      "tests/headless/**/*.test.ts",
      "tests/lib/**/*.test.ts",
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
