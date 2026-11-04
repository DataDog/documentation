/**
 * Request examples from Hugo's request files.
 *
 * Prod's Example tab under Request shows `request.<operationId><suffix>.json`
 * from the operation's content folder, one per CodeExamples.json entry
 * (layouts/partials/api/request-body.html). These files are hand-picked
 * request bodies, so they differ from the spec's examples.
 */

import { getCodeExampleMetas } from "./codeExampleLoader";

const requestFiles: Record<string, string> = import.meta.glob(
  "@hugo-site/content/en/api/v*/*/request.*.json",
  { query: "?raw", import: "default", eager: true },
);

/**
 * Anchored on the last three path segments, for the same reason as the SDK
 * examples' key in `codeExampleLoader.ts`: `vitest.unit.config.ts` repoints the
 * alias at a fixture folder with the same `<version>/<tag>/<file>` shape.
 */
const FILE_KEY_RE = /\/(v1|v2)\/([^/]+)\/([^/]+)$/;

const requestFilesByLocation = new Map<string, string>();
for (const [key, content] of Object.entries(requestFiles)) {
  const match = FILE_KEY_RE.exec(key);
  if (match) {
    const [, version, categorySlug, filename] = match;
    requestFilesByLocation.set(
      `${version}/${categorySlug}/${filename}`,
      content,
    );
  }
}

/** `first 3` in request-body.html. */
const MAX_REQUEST_EXAMPLES = 3;

export interface RequestFileExamples {
  examples: Array<{ name: string; value: string }>;
  /**
   * True when the operation has more than one CodeExamples.json entry,
   * counting every entry, not only those with a file.
   */
  showTitles: boolean;
  /**
   * The examples are `request.<operationId>.json`, used when no CodeExamples
   * entry has a file. The curl is then titled with the operation summary.
   */
  isFallbackFile: boolean;
}

/**
 * The operation's request files, each named by its CodeExamples.json
 * description. Only the first 3 entries are read, and an entry without a
 * file is skipped rather than replaced by a later one. When none of them has
 * a file, `request.<operationId>.json` is shown, untitled.
 *
 * Hugo's fallback check compares the missing files among the first 3 entries
 * with the count of all entries, so an operation with more than 3 entries and
 * no file among the first 3 shows nothing. No operation hits that, and it
 * looks unintended, so this falls back regardless.
 */
export function getRequestFileExamples(
  operationId: string,
  version: "v1" | "v2",
  categorySlug: string,
): RequestFileExamples {
  const codeExampleMetas = getCodeExampleMetas(operationId, version);
  const examples = codeExampleMetas
    .slice(0, MAX_REQUEST_EXAMPLES)
    .flatMap((meta) => {
      const content = requestFilesByLocation.get(
        `${version}/${categorySlug}/request.${operationId}${meta.suffix}.json`,
      );
      return content === undefined
        ? []
        : [{ name: meta.description, value: content }];
    });
  if (examples.length > 0) {
    return {
      examples,
      showTitles: codeExampleMetas.length > 1,
      isFallbackFile: false,
    };
  }
  const fallback = requestFilesByLocation.get(
    `${version}/${categorySlug}/request.${operationId}.json`,
  );
  return {
    examples:
      fallback === undefined ? [] : [{ name: "Example", value: fallback }],
    showTitles: false,
    isFallbackFile: true,
  };
}
