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

const byWeight = (a: MenuEntry, b: MenuEntry) =>
  (a.weight ?? 0) - (b.weight ?? 0);

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
