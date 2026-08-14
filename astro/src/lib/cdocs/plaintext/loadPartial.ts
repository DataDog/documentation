/**
 * Partial resolver for the cdocs plaintext pipeline.
 *
 * Turns a `{% partial file="@partials/foo.mdoc" /%}` reference into raw source,
 * mirroring the `@partials` Vite alias (`src/partials/en`). Kept separate
 * from the pure AST filter so tests can inject their own resolver.
 *
 * The partials are inlined at build time with Vite's glob rather than read from
 * disk: `readFileSync` off an `import.meta.url`-relative path breaks in the
 * bundled prod server, where this module lives in `dist/server/chunks/` and the
 * source tree isn't present. The glob resolves in both dev and prod and ships
 * the partials inside the bundle, so resolution no longer depends on where the
 * code runs.
 */
import type { PartialResolver } from './filterMarkdocAst';

const PARTIAL_PREFIX = '@partials/';
const PARTIALS_ROOT_SEGMENT = 'partials/en/';

// Every partial's raw source, keyed by its glob path (e.g.
// '../../../cdocs/partials/en/opentelemetry/traces/java.mdoc').
const partialSourceByGlobKey = import.meta.glob(
  '../../../partials/en/**/*.mdoc',
  { query: '?raw', import: 'default', eager: true },
) as Record<string, string>;

// Re-key by the path relative to `partials/en/`, which is exactly what a
// `@partials/...` reference names once its prefix is stripped.
const partialSourceByRelPath: Record<string, string> = {};
for (const [globKey, source] of Object.entries(partialSourceByGlobKey)) {
  const relPath = globKey.slice(
    globKey.indexOf(PARTIALS_ROOT_SEGMENT) + PARTIALS_ROOT_SEGMENT.length,
  );
  partialSourceByRelPath[relPath] = source;
}

export function makeBundledPartialResolver(): PartialResolver {
  return (file: string) => {
    if (!file.startsWith(PARTIAL_PREFIX)) {
      return null;
    }
    return partialSourceByRelPath[file.slice(PARTIAL_PREFIX.length)] ?? null;
  };
}
