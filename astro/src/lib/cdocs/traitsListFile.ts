/**
 * Where the Cdocs traits list is written, shared by the build integration
 * that writes it and the server that links to it.
 *
 * Alias-free (relative + npm only), because the `astro:build:done`
 * integration runs in Node outside Vite's module graph.
 */
import { createHash } from "node:crypto";

/**
 * The build-time sidecar the `cdocs-traits-index.json` route emits. The
 * `cdocsTraitsList` integration moves it to its hashed path after the build.
 */
export const CDOCS_TRAITS_SIDECAR = "cdocs-traits-index.json";

/**
 * The traits list's path in the client output, named after a hash of its
 * contents so it can be cached indefinitely. Under `_astro/`, which the
 * deployment platform already serves as long-cached static assets.
 */
export function cdocsTraitsListPath(traitsListJson: string): string {
  const hash = createHash("sha256")
    .update(traitsListJson)
    .digest("hex")
    .slice(0, 12);
  return `_astro/cdocs-traits.${hash}.json`;
}
