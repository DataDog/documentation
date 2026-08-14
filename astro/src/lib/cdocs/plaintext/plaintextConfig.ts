/**
 * Markdoc config for the cdocs plaintext pipeline.
 *
 * Separate from `markdoc.config.mjs` (whose tag `render` values are Astro
 * component paths, useless to a text renderer). Here we only need the pieces
 * that `if`/`else` evaluation depends on: the resolved filter variables and the
 * functions their conditions call. Markdoc's built-in functions (`equals`,
 * `and`, `or`, `not`) come from `Markdoc.functions`; `includes` mirrors the one
 * declared in `markdoc.config.mjs`.
 */
import Markdoc from '@markdoc/markdoc';
import type { Config } from '@markdoc/markdoc';

// @markdoc/markdoc ships a CJS build whose named exports don't round-trip
// cleanly under Node's ESM loader; pull from the default export (as the API
// docs' plaintext helpers do).
const { functions } = Markdoc;

// includes($trait, ["a", "b"]) -> true when the trait value is in the list.
const includes = {
  transform(parameters: Record<string, unknown>): boolean {
    const value = parameters[0];
    const list = parameters[1];
    return Array.isArray(list) ? list.includes(value) : false;
  },
};

export function buildPlaintextConfig(variables: Record<string, string>): Config {
  return {
    variables,
    functions: { ...functions, includes },
  };
}
