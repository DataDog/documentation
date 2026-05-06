/**
 * SDK code example loading for API documentation.
 *
 * Reads code example metadata from CodeExamples.json and loads the
 * corresponding source files from data/api via the @hugo-site alias.
 * Currently only curl examples render because no SDK source files exist
 * in data/api yet.
 */

import API_V1_CODE_EXAMPLES from '@hugo-site/data/api/v1/CodeExamples.json';
import API_V2_CODE_EXAMPLES from '@hugo-site/data/api/v2/CodeExamples.json';

const sdkExampleFiles: Record<string, string> = import.meta.glob(
  '@hugo-site/data/api/v*/examples/*',
  { eager: true, query: '?raw', import: 'default' },
);

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface CodeExampleEntry {
  /** Human-readable description of this example */
  description: string;
  /** The raw source code */
  code: string;
  /** Syntax highlighting language identifier */
  syntax: string;
  /** Pre-rendered highlighted HTML (populated at build time) */
  highlightedCode?: string;
  /**
   * Optional per-region variants of this entry. When present, the UI renders
   * one wrapper per region with `data-region="<key>"` so the visible variant
   * updates reactively with the site selector. `code` above is the fallback
   * used when no region is active. Currently used for curl.
   */
  regionVariants?: Record<string, { code: string; highlightedCode?: string }>;
}

export interface CodeExampleSet {
  /** Language identifier (e.g. 'python', 'ruby') */
  language: string;
  /** Display label (e.g. 'Python', 'Ruby') */
  label: string;
  /** One or more code examples for this language */
  entries: CodeExampleEntry[];
}

/** Shape of each entry in CodeExamples.json, keyed by operationId */
interface CodeExampleMeta {
  group: string;
  suffix: string;
  description: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CODE_EXAMPLES: Record<'v1' | 'v2', Record<string, CodeExampleMeta[]>> = {
  v1: API_V1_CODE_EXAMPLES as Record<string, CodeExampleMeta[]>,
  v2: API_V2_CODE_EXAMPLES as Record<string, CodeExampleMeta[]>,
};

/** Language configuration: file extensions and display metadata */
const LANGUAGES = [
  { id: 'python',     label: 'Python',     ext: '.py',   syntax: 'python' },
  { id: 'ruby',       label: 'Ruby',       ext: '.rb',   syntax: 'ruby' },
  { id: 'go',         label: 'Go',         ext: '.go',   syntax: 'go' },
  { id: 'java',       label: 'Java',       ext: '.java', syntax: 'java' },
  { id: 'typescript', label: 'TypeScript', ext: '.ts',   syntax: 'typescript' },
] as const;

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

/**
 * Load all SDK code examples for a given API operation.
 *
 * Reads CodeExamples.json to discover which examples exist, then loads
 * the actual code files from the examples directory for each supported
 * language.
 *
 * @param operationId  The OpenAPI operationId (e.g. 'CreateDashboard')
 * @param version      The API version ('v1' or 'v2')
 * @param _tag         The category/tag name (reserved for future use)
 * @returns An array of CodeExampleSets, one per language that has at least one example
 */
export function getCodeExamplesForOperation(
  operationId: string,
  version: 'v1' | 'v2',
  _tag: string
): CodeExampleSet[] {
  const metadata = CODE_EXAMPLES[version];
  const exampleMetas = metadata[operationId];

  if (!exampleMetas || exampleMetas.length === 0) {
    return [];
  }

  const results: CodeExampleSet[] = [];

  for (const lang of LANGUAGES) {
    const entries: CodeExampleEntry[] = [];

    for (const meta of exampleMetas) {
      const filename = buildExampleFilename(operationId, meta.suffix, lang.ext);
      const code = readExampleFile(version, filename);

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

function readExampleFile(version: 'v1' | 'v2', filename: string): string | null {
  return sdkExampleFiles[`../../data/api/${version}/examples/${filename}`] ?? null;
}
