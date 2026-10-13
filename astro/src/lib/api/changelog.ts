/**
 * API changelog data: loads the per-product changelog YAML, normalizes it,
 * and resolves it against the category views for rendering.
 *
 * Everything except `loadRawChangelogFiles` and `getChangelogView` is a pure
 * function, so tests can drive it with synthetic data.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import { parse as parseYaml } from "yaml";
import { localizedHref, type Locale } from "@lib/i18n/locale";
import {
  Ast,
  bold,
  heading,
  inline,
  link,
  list,
  listItem,
  paragraphFromText,
  plaintext,
} from "@lib/plaintext/helpers";
import { toCategorySlug } from "./categorySlug";
import { getCategoriesView } from "./viewsBuilder";
import { ChangelogFileSchema } from "./schemas/changelog";
import type { ApiCategory, ApiOperationStub } from "./schemas/views";

// TODO: this data lives in the Hugo site. Move it when Hugo is deprecated.
const rawChangelogByPath = import.meta.glob<string>(
  "@hugo-site/data/changelog/*.yml",
  { query: "?raw", import: "default", eager: true },
);

export const CHANGELOG_PAGE_SIZE = 20;

export type ChangelogBucket = "added" | "modified" | "deprecated" | "breaking";

/** The filter tabs. Deprecated entries appear under `all` only, as in Hugo. */
export const CHANGELOG_FILTERS = [
  "all",
  "added",
  "modified",
  "breaking",
] as const;
export type ChangelogFilter = (typeof CHANGELOG_FILTERS)[number];

// TODO: no Hugo i18n keys exist for these strings yet.
export const CHANGELOG_TITLE = "Changelog";
export const CHANGELOG_INTRO =
  "Review recent changes to Datadog API operations, ordered newest first. Entries are maintained by the API product team and collected here in one changelog.";
export const CHANGELOG_EMPTY_MESSAGE =
  "No API changes have been published yet.";
export const CHANGELOG_BUCKET_LABELS: Record<ChangelogBucket, string> = {
  added: "Added",
  modified: "Modified",
  deprecated: "Deprecated",
  breaking: "Breaking",
};

export interface ChangelogEntry {
  productSlug: string;
  date: string;
  bucket: ChangelogBucket;
  title: string;
  operationIds: string[];
}

export interface ResolvedChangelogEntry extends ChangelogEntry {
  product: { name: string; href?: string };
  operations: { operationId: string; href?: string }[];
}

export interface ChangelogPage<Entry extends ChangelogEntry = ChangelogEntry> {
  filter: ChangelogFilter;
  pageNumber: number;
  totalPages: number;
  entries: Entry[];
  /** The `[...path]` route param: `undefined`, `"2"`, `"added"`, `"added/2"`. */
  pathParam: string | undefined;
}

/** One run of a title: plain text, or the inside of a backtick span. */
export interface TitlePart {
  text: string;
  isCode: boolean;
}

export interface ChangelogDateGroup<Entry extends ChangelogEntry> {
  date: string;
  entries: Entry[];
}

/** The parts of a category view the resolver reads. */
type CategoryForChangelog = Pick<ApiCategory, "slug" | "name"> & {
  operations: Pick<ApiOperationStub, "operationId" | "slug">[];
};

const BUCKETS_BY_RAW_TYPE: Record<string, ChangelogBucket> = {
  added: "added",
  addition: "added",
  modified: "modified",
  changed: "modified",
  deprecated: "deprecated",
  deprecation: "deprecated",
  removed: "breaking",
  breaking: "breaking",
};

const DEFAULT_TITLE = "API change";

const resolvedEntriesCache = new Map<Locale, ResolvedChangelogEntry[]>();
let normalizedEntries: ChangelogEntry[] | null = null;

/** Raw YAML text keyed by product slug (the file's basename). */
export function loadRawChangelogFiles(): Record<string, string> {
  const rawFilesBySlug: Record<string, string> = {};
  for (const [filePath, raw] of Object.entries(rawChangelogByPath)) {
    const slug = filePath
      .split("/")
      .pop()!
      .replace(/\.yml$/, "");
    rawFilesBySlug[slug] = raw;
  }
  return rawFilesBySlug;
}

/** The changelog for a locale, newest first. Memoized per locale. */
export async function getChangelogView(
  lang: Locale,
): Promise<ResolvedChangelogEntry[]> {
  const cached = resolvedEntriesCache.get(lang);
  if (cached) return cached;
  normalizedEntries ??= normalizeChangelog(loadRawChangelogFiles());
  const resolved = resolveChangelogEntries(
    normalizedEntries,
    await getCategoriesView(lang),
    lang,
  );
  resolvedEntriesCache.set(lang, resolved);
  return resolved;
}

/**
 * Maps a raw `change_type` onto a bucket. Missing and unknown types become
 * `modified`, so they stay visible under a filter tab.
 */
export function toChangelogBucket(
  rawType: string | undefined,
): ChangelogBucket {
  if (rawType === undefined) return "modified";
  return BUCKETS_BY_RAW_TYPE[rawType.trim().toLowerCase()] ?? "modified";
}

/**
 * Parses and validates every file, then flattens them into one list sorted
 * by date (newest first), product slug, and title. Throws on a malformed
 * file, naming it: that's a generator bug.
 */
export function normalizeChangelog(
  rawFilesBySlug: Record<string, string>,
): ChangelogEntry[] {
  const entries = Object.entries(rawFilesBySlug).flatMap(([productSlug, raw]) =>
    parseChangelogFile(productSlug, raw),
  );
  return entries.sort(compareEntries);
}

/** Adds product names, product links and operation links for a locale. */
export function resolveChangelogEntries(
  entries: ChangelogEntry[],
  categories: CategoryForChangelog[],
  lang: Locale,
): ResolvedChangelogEntry[] {
  const categoriesBySlug = new Map(
    categories.map((category) => [category.slug, category]),
  );
  const operationHrefsById = buildOperationHrefsById(categories, lang);
  return entries.map((entry) => ({
    ...entry,
    product: resolveProduct(entry.productSlug, categoriesBySlug, lang),
    operations: entry.operationIds.map((operationId) => ({
      operationId,
      ...(operationHrefsById.has(operationId) && {
        href: operationHrefsById.get(operationId),
      }),
    })),
  }));
}

/**
 * Splits the entries into one set of pages per filter. Page 1 of every
 * filter is always emitted, even when empty, so no filter tab 404s.
 */
export function buildChangelogPages<Entry extends ChangelogEntry>(
  entries: Entry[],
  pageSize = CHANGELOG_PAGE_SIZE,
): ChangelogPage<Entry>[] {
  return CHANGELOG_FILTERS.flatMap((filter) =>
    paginate(filterEntries(entries, filter), filter, pageSize),
  );
}

/** The localized URL of one changelog page. */
export function changelogHref(
  lang: Locale,
  filter: ChangelogFilter,
  pageNumber: number,
): string {
  const pathParam = toPathParam(filter, pageNumber);
  const path = pathParam ? `/api/changelog/${pathParam}/` : "/api/changelog/";
  return localizedHref(lang, path);
}

/** The `.md` twin every changelog page's copy button points at. */
export function changelogMarkdownHref(lang: Locale): string {
  return localizedHref(lang, "/api/changelog.md");
}

/**
 * The `<title>` of one changelog page. Filtered pages and pages past the
 * first add a qualifier, so no two pages share a title.
 */
export function changelogPageTitle(
  filter: ChangelogFilter,
  pageNumber: number,
): string {
  // TODO: no Hugo i18n keys exist for these strings yet.
  const pageQualifier = pageNumber > 1 ? `, page ${pageNumber}` : "";
  if (filter === "all") return `API Changelog${pageQualifier}`;
  return `${CHANGELOG_BUCKET_LABELS[filter]} changes${pageQualifier} - API Changelog`;
}

/** Groups consecutive same-date entries, keeping their order. */
export function groupByDate<Entry extends ChangelogEntry>(
  entries: Entry[],
): ChangelogDateGroup<Entry>[] {
  const groups: ChangelogDateGroup<Entry>[] = [];
  for (const entry of entries) {
    const lastGroup = groups.at(-1);
    if (lastGroup?.date === entry.date) {
      lastGroup.entries.push(entry);
    } else {
      groups.push({ date: entry.date, entries: [entry] });
    }
  }
  return groups;
}

/**
 * Splits a title on its markdown backtick spans. An unmatched backtick stays
 * in the text. Nothing is parsed as HTML.
 */
export function splitInlineCode(title: string): TitlePart[] {
  const parts: TitlePart[] = [];
  let lastIndex = 0;
  for (const match of title.matchAll(/`([^`]+)`/g)) {
    if (match.index > lastIndex) {
      parts.push({ text: title.slice(lastIndex, match.index), isCode: false });
    }
    parts.push({ text: match[1], isCode: true });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < title.length || parts.length === 0) {
    parts.push({ text: title.slice(lastIndex), isCode: false });
  }
  return parts;
}

/**
 * The body of the plaintext twin: the whole, unpaginated changelog as
 * Markdoc nodes, grouped by date.
 */
export function renderChangelogMarkdown(
  entries: ResolvedChangelogEntry[],
): MarkdocNode[] {
  const intro = [
    heading(1, CHANGELOG_TITLE),
    paragraphFromText(CHANGELOG_INTRO),
  ];
  if (entries.length === 0) {
    return [...intro, paragraphFromText(CHANGELOG_EMPTY_MESSAGE)];
  }
  const dateSections = groupByDate(entries).flatMap((group) => [
    heading(2, group.date),
    list("unordered", group.entries.map(entryListItem)),
  ]);
  return [...intro, ...dateSections];
}

function entryListItem(entry: ResolvedChangelogEntry): MarkdocNode {
  const productNode = entry.product.href
    ? link(entry.product.href, entry.product.name)
    : plaintext(entry.product.name);
  const children = [
    bold([plaintext(CHANGELOG_BUCKET_LABELS[entry.bucket])]),
    plaintext(": "),
    productNode,
    plaintext(": "),
    ...titleNodes(entry.title),
    ...operationsNodes(entry.operations),
  ];
  return listItem([inline(children)]);
}

function titleNodes(title: string): MarkdocNode[] {
  return splitInlineCode(title).map((part) =>
    part.isCode
      ? new Ast.Node("code", { content: part.text })
      : plaintext(part.text),
  );
}

function operationsNodes(
  operations: ResolvedChangelogEntry["operations"],
): MarkdocNode[] {
  if (operations.length === 0) return [];
  const operationNodes = operations.flatMap((operation, index) => {
    const code = new Ast.Node("code", { content: operation.operationId });
    const operationNode = operation.href
      ? new Ast.Node("link", { href: operation.href }, [code])
      : code;
    return index === 0 ? [operationNode] : [plaintext(", "), operationNode];
  });
  return [plaintext(" (Operations: "), ...operationNodes, plaintext(")")];
}

function parseChangelogFile(
  productSlug: string,
  raw: string,
): ChangelogEntry[] {
  let parsed: unknown;
  try {
    parsed = parseYaml(raw);
  } catch (error) {
    throw new Error(`Changelog file "${productSlug}.yml" isn't valid YAML`, {
      cause: error,
    });
  }
  const result = ChangelogFileSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error(
      `Changelog file "${productSlug}.yml" doesn't match the schema: ${result.error.message}`,
    );
  }
  return result.data.entries.map((rawEntry) => ({
    productSlug,
    date: rawEntry.date,
    bucket: toChangelogBucket(rawEntry.change_type),
    title: rawEntry.title || DEFAULT_TITLE,
    operationIds: rawEntry.operations ?? [],
  }));
}

function compareEntries(a: ChangelogEntry, b: ChangelogEntry): number {
  return (
    b.date.localeCompare(a.date) ||
    a.productSlug.localeCompare(b.productSlug) ||
    a.title.localeCompare(b.title)
  );
}

function resolveProduct(
  productSlug: string,
  categoriesBySlug: Map<string, CategoryForChangelog>,
  lang: Locale,
): ResolvedChangelogEntry["product"] {
  const category = categoriesBySlug.get(toCategorySlug(productSlug));
  if (!category) return { name: titleCaseSlug(productSlug) };
  return {
    name: category.name,
    href: localizedHref(lang, `/api/latest/${category.slug}/`),
  };
}

/** `ai-impact` → `Ai Impact`, matching Hugo's `humanize | title`. */
function titleCaseSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** The first category to list an operation ID wins. */
function buildOperationHrefsById(
  categories: CategoryForChangelog[],
  lang: Locale,
): Map<string, string> {
  const operationHrefsById = new Map<string, string>();
  for (const category of categories) {
    for (const operation of category.operations) {
      if (operationHrefsById.has(operation.operationId)) continue;
      operationHrefsById.set(
        operation.operationId,
        localizedHref(lang, `/api/latest/${category.slug}/${operation.slug}/`),
      );
    }
  }
  return operationHrefsById;
}

function filterEntries<Entry extends ChangelogEntry>(
  entries: Entry[],
  filter: ChangelogFilter,
): Entry[] {
  if (filter === "all") return entries;
  return entries.filter((entry) => entry.bucket === filter);
}

function paginate<Entry extends ChangelogEntry>(
  entries: Entry[],
  filter: ChangelogFilter,
  pageSize: number,
): ChangelogPage<Entry>[] {
  const totalPages = Math.max(1, Math.ceil(entries.length / pageSize));
  return Array.from({ length: totalPages }, (_, index) => {
    const pageNumber = index + 1;
    return {
      filter,
      pageNumber,
      totalPages,
      entries: entries.slice(index * pageSize, pageNumber * pageSize),
      pathParam: toPathParam(filter, pageNumber),
    };
  });
}

function toPathParam(
  filter: ChangelogFilter,
  pageNumber: number,
): string | undefined {
  const segments = [
    filter === "all" ? undefined : filter,
    pageNumber === 1 ? undefined : String(pageNumber),
  ].filter((segment) => segment !== undefined);
  return segments.length > 0 ? segments.join("/") : undefined;
}
