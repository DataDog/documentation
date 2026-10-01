/**
 * SDK code example loading for API documentation.
 *
 * Reads code example metadata from CodeExamples.json and loads the
 * corresponding source files from each operation's resource folder under
 * <version>/<category>/. When an operationId is missing from
 * CodeExamples.json the loader synthesizes a single default entry
 * (no suffix), matching the Hugo template's fallback branch in
 * layouts/partials/api/code-example.html.
 *
 * The two inputs have different provenance, which is why only one of them
 * moved off Hugo. The example sources are build artifacts, now staged into
 * `astro/api-code-examples/` by `yarn fetch:examples`. CodeExamples.json is
 * committed spec-repo automation output, present on a fresh clone with no
 * network, so it is still imported from `hugo/data/`.
 */

import { z } from "zod";
import API_V1_CODE_EXAMPLES from "@hugo-site/data/api/v1/CodeExamples.json";
import API_V2_CODE_EXAMPLES from "@hugo-site/data/api/v2/CodeExamples.json";
import type { CodeExampleEntry, CodeExampleSet } from "./schemas/codeExamples";

const sdkExampleFiles: Record<string, string> = import.meta.glob(
  "@api-examples/v*/*/*.{go,java,py,pybeta,rb,rbbeta,rs,ts}",
  { eager: true, query: "?raw", import: "default" },
);

/**
 * Deliberately anchored on the last three path segments rather than on the
 * staging directory's name. `vitest.unit.config.ts` repoints the
 * `@api-examples` alias at the frozen fixture, and both roots end in the same
 * `<version>/<category>/<file>` shape. Naming either one here would silently
 * yield zero examples under the other.
 */
const FILE_KEY_RE = /\/(v1|v2)\/([^/]+)\/([^/]+)$/;

const filesByLocation = new Map<string, string>();
for (const [key, code] of Object.entries(sdkExampleFiles)) {
  const m = FILE_KEY_RE.exec(key);
  if (!m) {
    continue;
  }
  const [, version, categorySlug, filename] = m;
  filesByLocation.set(`${version}/${categorySlug}/${filename}`, code);
}

/**
 * Throws when a production build has nothing staged to render.
 *
 * The glob above is the only source of example code, and an empty match is
 * indistinguishable from a corpus where no operation has examples: every API
 * page renders its Curl tab and nothing else, and the build succeeds. That is
 * silent enough to reach production. `yarn fetch:examples` is chained into
 * every build script (`deps` in `package.json`), so zero files here means the
 * staging step was skipped or failed rather than that the corpus is empty.
 *
 * Only a production build fails. `yarn dev` stages with `--best-effort`, which
 * downgrades an unreachable network to a warning so the dev server still
 * starts; failing here would make the site undevelopable offline.
 */
export function assertStagedExamplesPresent(
  fileCount: number,
  isProductionBuild: boolean,
): void {
  if (fileCount > 0 || !isProductionBuild) {
    return;
  }
  throw new Error(
    "No API code examples were found, so every endpoint page would render " +
      "Curl as its only tab. Run `yarn fetch:examples` to stage them — " +
      "`yarn build` already does this via `yarn deps`, so this usually means " +
      "that step failed or `api-code-examples/` was removed after it ran.",
  );
}

assertStagedExamplesPresent(filesByLocation.size, import.meta.env.PROD);

/** Shape of each entry in CodeExamples.json, keyed by operationId */
const CodeExampleMetaSchema = z
  .object({
    group: z.string(),
    suffix: z.string(),
    description: z.string(),
  })
  .strict();

const CodeExamplesJsonSchema = z.record(
  z.string(),
  z.array(CodeExampleMetaSchema),
);

type CodeExampleMeta = z.infer<typeof CodeExampleMetaSchema>;

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CODE_EXAMPLES: Record<"v1" | "v2", Record<string, CodeExampleMeta[]>> = {
  v1: CodeExamplesJsonSchema.parse(API_V1_CODE_EXAMPLES),
  v2: CodeExamplesJsonSchema.parse(API_V2_CODE_EXAMPLES),
};

/**
 * Language configuration, one entry per extension.
 *
 * `.py`/`.pybeta` and `.rb`/`.rbbeta` are four languages, not two — the legacy
 * pair predates the generated SDK clients and gets its own tab, exactly as in
 * Hugo's `code_languages` map (`hugo/config/_default/params.yaml`). Folding
 * each pair into one language with a preferred extension would hide the legacy
 * file on every operation that has both, which is almost all of them.
 *
 * Order is the tab order. It mirrors Hugo's — alphabetical, with every legacy
 * language pushed to the end (`layouts/partials/code-lang-tabs.html`) — after
 * `viewsBuilder` prepends the Curl tab.
 */
const LANGUAGES: ReadonlyArray<{
  id: string;
  label: string;
  ext: string;
  syntax: string;
}> = [
  { id: "go", label: "Go", ext: ".go", syntax: "go" },
  { id: "java", label: "Java", ext: ".java", syntax: "java" },
  { id: "python", label: "Python", ext: ".pybeta", syntax: "python" },
  { id: "ruby", label: "Ruby", ext: ".rbbeta", syntax: "ruby" },
  { id: "rust", label: "Rust", ext: ".rs", syntax: "rust" },
  { id: "typescript", label: "TypeScript", ext: ".ts", syntax: "typescript" },
  {
    id: "python-legacy",
    label: "Python [legacy]",
    ext: ".py",
    syntax: "python",
  },
  { id: "ruby-legacy", label: "Ruby [legacy]", ext: ".rb", syntax: "ruby" },
];

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

/**
 * Load all SDK code examples for a given API operation.
 *
 * Looks up CodeExamples.json for the per-language file metadata. When the
 * operationId has no entry there, synthesizes a single default entry so the
 * resource folder is still scanned for `<OperationId>.<ext>` files.
 *
 * @param operationId   The OpenAPI operationId (e.g. 'GetActionConnection')
 * @param version       The API version ('v1' or 'v2')
 * @param categorySlug  Slugified primary tag (e.g. 'action-connection')
 * @returns An array of CodeExampleSets, one per language that has at least one example
 */
export function getCodeExamplesForOperation(
  operationId: string,
  version: "v1" | "v2",
  categorySlug: string,
): CodeExampleSet[] {
  const exampleMetas = CODE_EXAMPLES[version][operationId] ?? [
    { group: "", suffix: "", description: "" },
  ];

  const results: CodeExampleSet[] = [];

  for (const lang of LANGUAGES) {
    const entries: CodeExampleEntry[] = [];

    for (const meta of exampleMetas) {
      const code = findExampleCode(
        operationId,
        meta.suffix,
        version,
        categorySlug,
        lang.ext,
      );
      if (code !== null) {
        entries.push({
          description: meta.description,
          code,
          syntax: lang.syntax,
        });
      }
    }

    if (entries.length > 0) {
      results.push({
        language: lang.id,
        label: lang.label,
        entries,
      });
    }
  }

  return results;
}

/* ------------------------------------------------------------------ */
/*  Internal helpers                                                   */
/* ------------------------------------------------------------------ */

function buildExampleFilename(
  operationId: string,
  suffix: string,
  ext: string,
): string {
  if (suffix) {
    return `${operationId}_${suffix}${ext}`;
  }
  return `${operationId}${ext}`;
}

function findExampleCode(
  operationId: string,
  suffix: string,
  version: "v1" | "v2",
  categorySlug: string,
  ext: string,
): string | null {
  const filename = buildExampleFilename(operationId, suffix, ext);
  return filesByLocation.get(`${version}/${categorySlug}/${filename}`) ?? null;
}
