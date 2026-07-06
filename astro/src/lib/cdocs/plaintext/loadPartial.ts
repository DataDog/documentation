/**
 * Disk-backed partial resolver for the cdocs plaintext pipeline.
 *
 * Turns a `{% partial file="@partials/foo.mdoc" /%}` reference into raw source
 * read from the partials directory, mirroring the `@partials` Vite alias
 * (`src/cdocs/partials/en`). Kept separate from the pure AST filter so tests can
 * inject their own resolver without touching disk.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { PartialResolver } from './filterMarkdocAst';

const PARTIAL_PREFIX = '@partials/';

export function makeDiskPartialResolver(partialsDir: string): PartialResolver {
  const root = path.resolve(partialsDir);
  return (file: string) => {
    if (!file.startsWith(PARTIAL_PREFIX)) {
      return null;
    }
    const abs = path.resolve(root, file.slice(PARTIAL_PREFIX.length));
    // Refuse anything that escapes the partials root (path traversal guard).
    if (abs !== root && !abs.startsWith(root + path.sep)) {
      return null;
    }
    try {
      return readFileSync(abs, 'utf8');
    } catch {
      return null;
    }
  };
}
