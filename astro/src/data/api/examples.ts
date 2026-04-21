/**
 * SDK code example loading for API documentation.
 *
 * Reads code example metadata from CodeExamples.json and loads the
 * corresponding source files (Python, Ruby, Go, Java, TypeScript) from
 * the examples directory. Runs at build time using synchronous fs reads.
 *
 * Data currently sourced from src/mocked_dependencies/hugo_site/data/api/. The mocked
 * inventory includes CodeExamples.json but not the SDK source files, so
 * only curl examples render until a live feed is wired up.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Root of the mocked_dependencies API data (relative to this module). */
const MOCKED_API_ROOT = path.resolve(__dirname, '../../mocked_dependencies/hugo_site/data/api');

/** Language configuration: file extensions and display metadata */
const LANGUAGES = [
  { id: 'python',     label: 'Python',     ext: '.py',   syntax: 'python' },
  { id: 'ruby',       label: 'Ruby',       ext: '.rb',   syntax: 'ruby' },
  { id: 'go',         label: 'Go',         ext: '.go',   syntax: 'go' },
  { id: 'java',       label: 'Java',       ext: '.java', syntax: 'java' },
  { id: 'typescript', label: 'TypeScript', ext: '.ts',   syntax: 'typescript' },
] as const;

/* ------------------------------------------------------------------ */
/*  Caches                                                             */
/* ------------------------------------------------------------------ */

const metadataCache = new Map<string, Record<string, CodeExampleMeta[]>>();

/* ------------------------------------------------------------------ */
/*  Internal helpers                                                   */
/* ------------------------------------------------------------------ */

/**
 * Load and cache the CodeExamples.json metadata for a given API version.
 * Returns a record mapping operationId to its array of example metadata entries.
 */
function loadCodeExamplesMetadata(version: 'v1' | 'v2'): Record<string, CodeExampleMeta[]> {
  if (metadataCache.has(version)) {
    return metadataCache.get(version)!;
  }

  const filePath = path.resolve(MOCKED_API_ROOT, version, 'CodeExamples.json');
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw) as Record<string, CodeExampleMeta[]>;
    metadataCache.set(version, parsed);
    return parsed;
  } catch {
    // File doesn't exist or is invalid — return empty
    metadataCache.set(version, {});
    return {};
  }
}

/**
 * Build the filename for a code example.
 *
 * Naming convention:
 * - Default example (no suffix): `{OperationId}.{ext}`
 * - Numbered variant:            `{OperationId}_{suffix}.{ext}`
 */
function buildExampleFilename(operationId: string, suffix: string, ext: string): string {
  if (suffix) {
    return `${operationId}_${suffix}${ext}`;
  }
  return `${operationId}${ext}`;
}

/**
 * Try to read a code example file. Returns the file content, or null
 * if the file doesn't exist.
 */
function readExampleFile(version: 'v1' | 'v2', filename: string): string | null {
  const filePath = path.resolve(MOCKED_API_ROOT, version, 'examples', filename);
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

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
  const metadata = loadCodeExamplesMetadata(version);
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
