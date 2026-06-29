/**
 * Builds the documentation navigation tree from Hugo's main menu YAML at build
 * time. This is the same source Hugo's mobile nav uses for its accordion
 * (`.Site.Menus.main` → `config/_default/menus/main.{lang}.yaml`).
 *
 * Hugo stores the menu as a flat list where hierarchy is expressed with
 * `identifier` / `parent` and ordering with `weight`. This module rebuilds that
 * flat list into a nested tree, sorted by weight at every level, with URLs
 * resolved to localized, root-relative paths (mirroring Hugo's
 * `(strings.TrimPrefix "/" .URL) | absLangURL`).
 *
 * Consumers (MobileNav.astro) render the tree at build time — it is large, so
 * it must never be serialized into a Preact island prop.
 */
import { parse as parseYaml } from "yaml";
import { z } from "zod";
import { DEFAULT_LOCALE, localizedHref, type Locale } from "@lib/i18n/locale";

// ---------------------------------------------------------------------------
// Raw schema (internal)
// ---------------------------------------------------------------------------

const MenuEntrySchema = z.object({
  name: z.string(),
  // A handful of legacy entries (e.g. top-level "Agents") have no identifier.
  // They can never be a parent, so we synthesize a key when building the tree.
  identifier: z.string().optional(),
  url: z.string().optional(),
  parent: z.string().optional(),
  weight: z.number().optional(),
  // `pre` (an icon name) exists on some entries but Hugo's mobile nav doesn't
  // render it, so we accept and ignore it.
  pre: z.string().optional(),
});

type MenuEntry = z.infer<typeof MenuEntrySchema>;

const MenuFileSchema = z.object({
  menu: z.object({ main: z.array(MenuEntrySchema) }),
});

// Eagerly load every `main.{lang}.yaml` so a missing locale falls back to
// English rather than failing the build.
const menuFilesByPath = import.meta.glob<string>(
  "@hugo-site/config/_default/menus/main.*.yaml",
  { query: "?raw", import: "default", eager: true },
);

const LOCALE_FILE_RE = /\/main\.([a-z]{2})\.yaml$/;

const entriesByLocale = new Map<string, MenuEntry[]>();
for (const [path, raw] of Object.entries(menuFilesByPath)) {
  const match = path.match(LOCALE_FILE_RE);
  if (!match) {
    continue;
  }
  entriesByLocale.set(match[1], MenuFileSchema.parse(parseYaml(raw)).menu.main);
}

// ---------------------------------------------------------------------------
// Public view-model types
// ---------------------------------------------------------------------------

export type DocsNavNode = {
  identifier: string;
  label: string;
  /** Resolved link target, or `null` for heading-only items (e.g. "Essentials"). */
  href: string | null;
  children: DocsNavNode[];
};

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function resolveUrl(url: string | undefined, lang: Locale): string | null {
  if (!url) {
    return null;
  }
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  if (url.startsWith("#")) {
    return url;
  }
  return localizedHref(lang, `/${url.replace(/^\/+/, "")}`);
}

// Hugo treats weight 0 (and missing) as "sort last", not first.
const byWeight = (a: MenuEntry, b: MenuEntry) =>
  (a.weight || Infinity) - (b.weight || Infinity);

function buildTree(entries: MenuEntry[], lang: Locale): DocsNavNode[] {
  const childrenByParent = new Map<string | undefined, MenuEntry[]>();
  for (const entry of entries) {
    const siblings = childrenByParent.get(entry.parent) ?? [];
    siblings.push(entry);
    childrenByParent.set(entry.parent, siblings);
  }

  const toNode = (entry: MenuEntry, index: number): DocsNavNode => {
    const children = entry.identifier
      ? (childrenByParent.get(entry.identifier) ?? []).sort(byWeight).map(toNode)
      : [];
    return {
      identifier: entry.identifier ?? `${entry.name}-${index}`,
      label: entry.name,
      // Childless, link-less items mirror Hugo's fallback to the docs home.
      href: resolveUrl(entry.url, lang) ?? (children.length ? null : localizedHref(lang, "/")),
      children,
    };
  };

  // Top-level entries have no `parent`.
  return (childrenByParent.get(undefined) ?? []).sort(byWeight).map(toNode);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * The documentation menu as a nested, weight-sorted tree for the given locale,
 * falling back to English when that locale's menu file is absent.
 */
export function getDocsNavTree(lang: Locale = DEFAULT_LOCALE): DocsNavNode[] {
  const entries = entriesByLocale.get(lang) ?? entriesByLocale.get(DEFAULT_LOCALE);
  if (!entries) {
    return [];
  }
  return buildTree(entries, lang);
}

/**
 * Length of `href`'s match against `pathname`, or 0 if it doesn't match.
 *
 * A nav item matches the current page when its href equals the page path or is
 * a path-segment prefix of it (so `/api/` matches `/api/latest/foo/`). Trailing
 * slashes are normalized on both sides. The bare root (`/`) is never a match —
 * the docs home belongs to no expandable section, and most leaf items without
 * their own URL fall back to `/`, which must not pull every page into a
 * section. The return value is the normalized prefix length, so callers can
 * rank competing matches by specificity (longest wins).
 */
function matchLength(href: string, pathname: string): number {
  const hrefPrefix = href.endsWith("/") ? href : `${href}/`;
  if (hrefPrefix === "/") {
    return 0;
  }
  const pagePath = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return pagePath.startsWith(hrefPrefix) ? hrefPrefix.length : 0;
}

/** Best match length for `pathname` anywhere in `node`'s subtree (incl. `node`). */
function bestMatchLength(node: DocsNavNode, pathname: string): number {
  let best = node.href ? matchLength(node.href, pathname) : 0;
  for (const child of node.children) {
    best = Math.max(best, bestMatchLength(child, pathname));
  }
  return best;
}

/**
 * Identifier of the top-level section that owns the current page, or `null` if
 * no section's subtree contains a nav item matching `pathname`. Used to expand
 * the active section by default (mirroring Hugo's mobile nav). Matching is by
 * longest path-prefix, so the most specific link wins and the page is
 * attributed to that link's top-level ancestor.
 */
export function findActiveSectionIdentifier(
  tree: DocsNavNode[],
  pathname: string,
): string | null {
  let best: { identifier: string; length: number } | null = null;
  for (const section of tree) {
    const length = bestMatchLength(section, pathname);
    if (length > 0 && (!best || length > best.length)) {
      best = { identifier: section.identifier, length };
    }
  }
  return best?.identifier ?? null;
}
