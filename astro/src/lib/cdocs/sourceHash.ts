/**
 * The pages.json hash for a Cdocs page.
 *
 * Cdocs plaintext renders on the server, so the build has no `.md` file to
 * hash, and rendering every variant just to hash it would be slow. Instead,
 * the hash covers everything that goes into the page: its frontmatter and
 * body, every partial it includes (followed recursively), and its filters
 * manifest, which holds the filter config the page uses.
 *
 * Every variant of a page shares this hash, so a change to any of these
 * refetches all of them.
 */
import { createHash } from "node:crypto";
import Markdoc from "@markdoc/markdoc";
import type { Node } from "@markdoc/markdoc";
import type { PartialResolver } from "./plaintext/filterMarkdocAst";
import { compareCodeUnits } from "./variants";

export interface HashCdocsSourceInput {
  /** The page's parsed frontmatter. */
  frontmatter: unknown;
  /** The page's Markdoc source, without its frontmatter. */
  body: string;
  /** The page's filters manifest. */
  filtersManifest: unknown;
  resolvePartial: PartialResolver;
}

/** An md5 of the page's sources, hex, 32 chars. */
export function hashCdocsSource(input: HashCdocsSourceInput): string {
  const { frontmatter, body, filtersManifest, resolvePartial } = input;
  const sourceByPartialFile = collectPartials(body, resolvePartial);
  const partials = [...sourceByPartialFile.entries()].sort(([fileA], [fileB]) =>
    compareCodeUnits(fileA, fileB),
  );

  return createHash("md5")
    .update(JSON.stringify({ frontmatter, body, partials, filtersManifest }))
    .digest("hex");
}

// Private functions ------------------------------------------------

/**
 * Every partial the source includes, directly or through another partial,
 * keyed by its `file` reference. A missing partial has no source to hash, so
 * it's left out, and each partial is read once, so a cycle stops.
 */
function collectPartials(
  source: string,
  resolvePartial: PartialResolver,
): Map<string, string> {
  const sourceByPartialFile = new Map<string, string>();
  const pendingSources = [source];

  while (pendingSources.length > 0) {
    const pendingSource = pendingSources.pop()!;
    for (const file of findPartialFiles(Markdoc.parse(pendingSource))) {
      if (sourceByPartialFile.has(file)) continue;
      const partialSource = resolvePartial(file);
      if (partialSource == null) continue;
      sourceByPartialFile.set(file, partialSource);
      pendingSources.push(partialSource);
    }
  }

  return sourceByPartialFile;
}

/** The `file` of every `{% partial %}` tag in the AST, including in conditionals. */
function findPartialFiles(ast: Node): string[] {
  const files: string[] = [];
  for (const node of ast.walk()) {
    if (node.type !== "tag" || node.tag !== "partial") continue;
    const file = node.attributes?.file;
    if (typeof file === "string") files.push(file);
  }
  return files;
}
