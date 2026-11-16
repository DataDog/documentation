import path from "node:path";
import { fileURLToPath } from "node:url";
import { format as prettierFormat } from "prettier";

const PROJECT_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const ESCAPED_PROJECT_ROOT = PROJECT_ROOT.replace(
  /[.*+?^${}()|[\]\\]/g,
  "\\$&",
);
const SCRIPT_SRC_PROJECT_ROOT = new RegExp(
  `(<script\\b[^>]*?\\ssrc=")[^"]*?${ESCAPED_PROJECT_ROOT}(/[^"]*")`,
  "g",
);

/**
 * Canonicalize build-random tokens so the snapshot tracks semantic content,
 * not non-deterministic per-build identifiers. Each unique token gets replaced
 * with a sequential placeholder (`X1`, `X2`, ...) keyed by first appearance,
 * which preserves cross-references (e.g. `aria-controls` ↔ `id`) so a missing
 * pairing still shows up as a diff.
 *
 * The result is then run through Prettier's HTML parser so each tag lands on
 * its own line. Without that, a single-line minified HTML document produces a
 * unreadable single-line snapshot diff on any change.
 */
export async function normalizeSnapshotHtml(html: string): Promise<string> {
  let out = html.replace(
    /\/_astro\/([A-Za-z0-9_-]+)\.[A-Za-z0-9_-]{8}\.(js|css|woff2?|svg|png|jpg|jpeg|webp|map)/g,
    "/_astro/$1.HASH.$2",
  );

  // Astro unconditionally injects absolute file paths as component-url attributes
  // on astro-island elements (for dev tooling / HMR). Strip them so snapshots
  // are stable across machines.
  out = out.replace(/\s+component-url="[^"]*"/g, "");

  // Bundled component scripts get the same absolute path in their `src`.
  // Keep the path from the project root on, so the snapshot still names the
  // script. Matching the root, not the first `/src/`, keeps this right for a
  // checkout that sits under some other `src/` folder.
  out = out.replace(SCRIPT_SRC_PROJECT_ROOT, "$1$2");

  // Each island also carries a counter over the module graph, so adding or
  // removing an import anywhere renumbers every island in every snapshot. The
  // uid above already identifies an island; this carries no page content.
  out = out.replace(/\s+data-preact-island-id="[^"]*"/g, "");

  const tokenMap = new Map<string, string>();
  const canonicalize = (raw: string): string => {
    let mapped = tokenMap.get(raw);
    if (!mapped) {
      mapped = `X${tokenMap.size + 1}`;
      tokenMap.set(raw, mapped);
    }
    return mapped;
  };

  // Astro-island uids
  out = out.replace(
    /(astro-island\b[^>]*?\buid=")([^"]+)(")/g,
    (_m, before, raw, after) => `${before}${canonicalize(raw)}${after}`,
  );

  // Component-generated IDs that include an 8-hex-char tail
  out = out.replace(/\b[a-f0-9]{8}\b/g, (raw) => canonicalize(raw));

  // CSS-module-hashed class names from Vite
  out = out.replace(
    /\b_([\w-]+?)_[a-z0-9]{5,6}_\d+\b/g,
    (_m, name) => `_${name}_MOD`,
  );

  return await prettierFormat(out, {
    parser: "html",
    printWidth: 120,
  });
}
