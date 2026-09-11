/**
 * The path transforms that map a source file — in an SDK clone or in Hugo's git
 * index — onto its place in the staged tree, or onto null if it does not belong
 * there. Computing the target path rather than renaming in place leaves the
 * source untouched.
 */

/** The two API versions the staged tree — and the loader's key space — allow. */
const API_VERSIONS = ["v1", "v2"];

export const LEGACY_INDEX_PREFIX = "content/en/api/";

/**
 * Maps a path relative to a clone's `examples/` directory onto its path
 * relative to the staged tree, or null if it should not be staged at all.
 *
 * Carries all three transforms: the beta rename, the flat-Rust nesting, and the
 * `examples/v*` copy scope.
 */
export function stagedRelativePathFor(
  exampleRelativePath: string,
): string | null {
  const segments = exampleRelativePath.split("/");

  // Rust ships its examples flat, so a top-level `.rs` is a path to be built,
  // not a path to be filtered out.
  if (segments.length === 1) {
    return segments[0].endsWith(".rs")
      ? resolveNestedRustPath(segments[0])
      : null;
  }

  // Everything else must already be `v1|v2/<category>/<file>`. That shape is
  // the loader's key space, so anything else — `examples/datadog/` in the go
  // and python repos, a deeper nesting we have not seen — has nowhere to go.
  if (segments.length !== 3 || !API_VERSIONS.includes(segments[0])) {
    return null;
  }

  const [version, categorySlug, filename] = segments;
  return `${version}/${categorySlug}/${applyBetaExtensionRename(filename)}`;
}

/**
 * `v1_aws-integration_CreateAWSAccount.rs` -> `v1/aws-integration/CreateAWSAccount.rs`
 *
 * Splits on the **first two underscores only**, which leaves suffixed names
 * like `v1_usage-metering_GetUsageNetworkHosts_1249907835.rs` intact. Category
 * slugs use hyphens and never underscores, so two splits is always right.
 */
export function resolveNestedRustPath(flatFilename: string): string | null {
  const match = /^(v\d+)_([^_]+)_(.+)$/.exec(flatFilename);
  if (!match) {
    return null;
  }
  const [, version, categorySlug, remainder] = match;
  return `${version}/${categorySlug}/${remainder}`;
}

/**
 * `.py` -> `.pybeta`, `.rb` -> `.rbbeta`, everything else unchanged.
 *
 * The rename exists so fresh SDK output lands *beside* Hugo's committed legacy
 * files rather than over them — Hugo treats `py` and `pybeta` as two distinct
 * languages. Astro collapses the pair into one Python entry with `.pybeta`
 * preferred (`src/lib/api/codeExampleLoader.ts`), so the rename's value here is
 * keeping those legacy files reachable.
 */
export function applyBetaExtensionRename(filename: string): string {
  if (filename.endsWith(".py") || filename.endsWith(".rb")) {
    return `${filename}beta`;
  }
  return filename;
}

/**
 * `content/en/api/v1/monitors/MuteMonitor.py` -> `v1/monitors/MuteMonitor.py`
 *
 * No rename here, deliberately. These files exist precisely to be reachable at
 * the legacy extension; renaming them to `.pybeta` would shadow SDK output.
 */
export function stripHugoApiContentPrefix(indexPath: string): string | null {
  if (!indexPath.startsWith(LEGACY_INDEX_PREFIX)) {
    return null;
  }
  const relativePath = indexPath.slice(LEGACY_INDEX_PREFIX.length);
  const segments = relativePath.split("/");
  if (segments.length !== 3 || !API_VERSIONS.includes(segments[0])) {
    return null;
  }
  return relativePath;
}
