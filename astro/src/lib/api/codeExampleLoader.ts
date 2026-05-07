/**
 * SDK code example loading for API documentation.
 *
 * Reads code example metadata from CodeExamples.json and loads the
 * corresponding source files from each operation's resource folder under
 * content/en/api/<version>/<category>/. When an operationId is missing
 * from CodeExamples.json the loader synthesizes a single default entry
 * (no suffix), matching the Hugo template's fallback branch in
 * layouts/partials/api/code-example.html.
 */

import { z } from 'zod';
import API_V1_CODE_EXAMPLES from '@hugo-site/data/api/v1/CodeExamples.json';
import API_V2_CODE_EXAMPLES from '@hugo-site/data/api/v2/CodeExamples.json';
import type {
  CodeExampleEntry,
  CodeExampleSet,
} from './schemas/codeExamples';

const sdkExampleFiles: Record<string, string> = import.meta.glob(
  '@hugo-site/content/en/api/v*/*/*.{go,java,py,pybeta,rb,rbbeta,rs,ts}',
  { eager: true, query: '?raw', import: 'default' },
);

const FILE_KEY_RE = /\/content\/en\/api\/(v1|v2)\/([^/]+)\/([^/]+)$/;

const filesByLocation = new Map<string, string>();
for (const [key, code] of Object.entries(sdkExampleFiles)) {
  const m = FILE_KEY_RE.exec(key);
  if (!m) {
    continue;
  }
  const [, version, categorySlug, filename] = m;
  filesByLocation.set(`${version}/${categorySlug}/${filename}`, code);
}

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

const CODE_EXAMPLES: Record<'v1' | 'v2', Record<string, CodeExampleMeta[]>> = {
  v1: CodeExamplesJsonSchema.parse(API_V1_CODE_EXAMPLES),
  v2: CodeExamplesJsonSchema.parse(API_V2_CODE_EXAMPLES),
};

/**
 * Language configuration. `exts` is tried in order; the first match wins, so
 * the modern beta extension (e.g. `.pybeta`) takes precedence over the legacy
 * one (`.py`) when both happen to exist for an operation.
 */
const LANGUAGES: ReadonlyArray<{
  id: string;
  label: string;
  exts: readonly string[];
  syntax: string;
}> = [
  { id: 'python',     label: 'Python',     exts: ['.pybeta', '.py'], syntax: 'python' },
  { id: 'ruby',       label: 'Ruby',       exts: ['.rbbeta', '.rb'], syntax: 'ruby' },
  { id: 'go',         label: 'Go',         exts: ['.go'],            syntax: 'go' },
  { id: 'java',       label: 'Java',       exts: ['.java'],          syntax: 'java' },
  { id: 'typescript', label: 'TypeScript', exts: ['.ts'],            syntax: 'typescript' },
  { id: 'rust',       label: 'Rust',       exts: ['.rs'],            syntax: 'rust' },
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
  version: 'v1' | 'v2',
  categorySlug: string,
): CodeExampleSet[] {
  const exampleMetas = CODE_EXAMPLES[version][operationId] ?? [
    { group: '', suffix: '', description: '' },
  ];

  const results: CodeExampleSet[] = [];

  for (const lang of LANGUAGES) {
    const entries: CodeExampleEntry[] = [];

    for (const meta of exampleMetas) {
      const code = findExampleCode(operationId, meta.suffix, version, categorySlug, lang.exts);
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

function buildExampleFilename(operationId: string, suffix: string, ext: string): string {
  if (suffix) {
    return `${operationId}_${suffix}${ext}`;
  }
  return `${operationId}${ext}`;
}

function findExampleCode(
  operationId: string,
  suffix: string,
  version: 'v1' | 'v2',
  categorySlug: string,
  exts: readonly string[],
): string | null {
  for (const ext of exts) {
    const filename = buildExampleFilename(operationId, suffix, ext);
    const code = filesByLocation.get(`${version}/${categorySlug}/${filename}`);
    if (code !== undefined) {
      return code;
    }
  }
  return null;
}
