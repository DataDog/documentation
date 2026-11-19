/**
 * Doc types a build can skip, for a faster build when you're not checking
 * them. For example, `yarn build:en-product` sets `SKIP_DOC_TYPES=api`: product
 * docs render on demand, so the API docs' prerendering is nearly the whole
 * build.
 *
 * `SKIP_DOC_TYPES` is a comma-separated list of `DocType`s. Nothing is skipped
 * by default, so production builds can't accidentally omit docs.
 *
 * Imports must stay alias-free: `astro.config.mjs` reads this too, outside
 * Vite's module graph.
 */

/** Add a doc type here, then gate its routes with `docTypeStaticPaths`. */
const DOC_TYPES = ["api"] as const;
export type DocType = (typeof DOC_TYPES)[number];

export function skippedDocTypes(): DocType[] {
  const requested = (process.env.SKIP_DOC_TYPES ?? "")
    .split(",")
    .map((docType) => docType.trim())
    .filter(Boolean);
  const unknown = requested.filter(
    (docType) => !(DOC_TYPES as readonly string[]).includes(docType),
  );
  if (unknown.length > 0) {
    throw new Error(
      `SKIP_DOC_TYPES has unknown doc type(s): ${unknown.join(", ")}. ` +
        `Known doc types: ${DOC_TYPES.join(", ")}.`,
    );
  }
  return requested as DocType[];
}

export function isDocTypeSkipped(docType: DocType): boolean {
  return skippedDocTypes().includes(docType);
}

/**
 * Wraps a route's `getStaticPaths`, so the route emits no pages when its doc
 * type is skipped.
 */
export function docTypeStaticPaths<Args extends unknown[], Path>(
  docType: DocType,
  getStaticPaths: (...args: Args) => Path[] | Promise<Path[]>,
): (...args: Args) => Promise<Path[]> {
  return async (...args) =>
    isDocTypeSkipped(docType) ? [] : getStaticPaths(...args);
}
