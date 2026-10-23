/**
 * Request examples from Hugo's request files.
 *
 * Prod's Example tab under Request shows `request.<operationId><suffix>.json`
 * from the operation's content folder, one per CodeExamples.json entry
 * (layouts/partials/api/request-body.html). These files are hand-picked
 * request bodies, so they differ from the spec's examples.
 */

import { getCodeExampleMetas } from "./codeExampleLoader";

// TODO(WEB-10413): these files live in the Hugo site. Move them when Hugo is
// deprecated.
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

/**
 * The operation's request files, each named by its CodeExamples.json
 * description. As in Hugo, only the first 3 entries are read, and an entry
 * without a file is skipped rather than replaced by a later one.
 */
export function getRequestFileExamples(
  operationId: string,
  version: "v1" | "v2",
  categorySlug: string,
): Array<{ name: string; value: string }> {
  return getCodeExampleMetas(operationId, version)
    .slice(0, MAX_REQUEST_EXAMPLES)
    .flatMap((meta) => {
      const content = requestFilesByLocation.get(
        `${version}/${categorySlug}/request.${operationId}${meta.suffix}.json`,
      );
      return content === undefined
        ? []
        : [{ name: meta.description, value: content }];
    });
}
