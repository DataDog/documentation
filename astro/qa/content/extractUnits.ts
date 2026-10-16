/**
 * Markdoc AST → flat list of located content units (pipeline step 3).
 *
 * Headings and tabs are consumed as *location*, not content: a version tab
 * (Hugo) and a version heading (Astro) both set `version`, and so on. The
 * location is canonicalized into a key so the two sides align even though
 * they express the same structure differently. How each side expressed it is
 * the structure diff's job (step 5), not this file's.
 *
 * Input is expected to have been through `normalizeMarkdown` already.
 */
import Markdoc, { type Node } from "@markdoc/markdoc";
import { parse as parseYaml } from "yaml";
import { repairTableRowLineBreaks } from "./repairTableRows.ts";

export type UnitKind =
  "heading" | "label" | "prose" | "tableRow" | "code" | "link";

export interface UnitLocation {
  /** Category pages only: the operation's `##` heading, slugified. */
  operation?: string;
  version?: string;
  section?: string;
  responseCode?: string;
  panel?: "model" | "example";
  language?: string;
  /** A tab label the tool doesn't recognize, kept so its content isn't lost. */
  tab?: string;
}

export interface ContentUnit {
  kind: UnitKind;
  location: UnitLocation;
  locationKey: string;
  text: string;
  /** Schema table rows only: the field path. */
  field?: string;
  /** Labels only: whether the label was a heading or a bold-only paragraph. */
  form?: "heading" | "bold-paragraph";
  /** The text before `applyTextForms` rewrote it; `text` is what's compared. */
  sourceText?: string;
  /** Set when the tool had to repair the source to extract this unit. */
  malformed?: "table-cell-line-break";
}

/**
 * One structural element, such as a heading, tab, table header or label, as a
 * canonical string. The structure diff compares outlines; alignment ignores them.
 */
export interface OutlineEntry {
  locationKey: string;
  element: string;
}

export interface PageExtraction {
  units: ContentUnit[];
  outline: OutlineEntry[];
}

/** Extraction state that the walk needs but the result doesn't expose. */
interface PageBuilder extends PageExtraction {
  repairedRowLines: Set<number>;
  /** Where Hugo's current code example started, so it can be rekeyed. */
  exampleStart?: { unitIndex: number; outlineIndex: number };
  /** Hugo's unfenced code block that a comment-line heading broke, to rejoin. */
  brokenCodeUnit?: ContentUnit;
}

const locationSegmentOrder = [
  "operation",
  "version",
  "section",
  "responseCode",
  "panel",
  "language",
  "tab",
] as const;

export function locationKeyOf(location: UnitLocation): string {
  const segments = locationSegmentOrder
    .filter((segment) => location[segment])
    .map((segment) =>
      segment === "tab" ? `tab:${location.tab}` : location[segment],
    );
  return segments.length > 0 ? segments.join("/") : "page";
}

export function extractUnits(normalizedMarkdown: string): ContentUnit[] {
  return extractPage(normalizedMarkdown).units;
}

export function extractPage(normalizedMarkdown: string): PageExtraction {
  const repaired = repairTableRowLineBreaks(normalizedMarkdown);
  const page: PageBuilder = {
    units: [],
    outline: [],
    repairedRowLines: repaired.repairedRowLines,
  };
  const ast = Markdoc.parse(repaired.markdown);
  emitFrontmatter(String(ast.attributes.frontmatter ?? ""), page);
  walkContainer(ast, {}, page);
  return { units: page.units, outline: page.outline };
}

/** The title is content; other keys are structure (see the plan's open questions). */
function emitFrontmatter(frontmatter: string, page: PageBuilder): void {
  if (frontmatter.trim() === "") return;
  const location = { section: "frontmatter" };
  const fields = parseYaml(frontmatter) as Record<string, unknown>;
  for (const [key, value] of Object.entries(fields ?? {})) {
    const text = collapseWhitespace(String(value));
    if (key === "title") pushUnit(page, "prose", location, text);
    else pushOutline(page, location, `frontmatter ${key}: ${text}`);
  }
}

const versionHeading = /^(v\d+)\b/;
const versionTabLabel = /^v\d+$/;
const responseCodeTabLabel = /^\d{3}$/;
const sectionsBySlug: Record<string, string> = {
  overview: "overview",
  arguments: "arguments",
  request: "request",
  "request-body": "request",
  "request-body-required": "request",
  response: "response",
  "code-example": "code-example",
};
const legacyInstallLink = /[?&]code-lang=([\w-]+)-legacy\b/;
const trailingBadge = /\s+\(?(deprecated|preview)\)?$/i;
const languagesByFence: Record<string, string> = {
  bash: "curl",
  sh: "curl",
  shell: "curl",
  console: "curl",
};

/**
 * Headings change the location for the rest of their container; tabs scope a
 * location to their own children. So each container gets its own copy.
 */
function walkContainer(
  container: Node,
  inheritedLocation: UnitLocation,
  page: PageBuilder,
): void {
  let location = { ...inheritedLocation };
  for (const node of container.children) {
    if (node.type === "heading") {
      location = applyHeading(node, location, page);
    } else if (node.type === "tag" && node.tag === "tab") {
      const label = tabLabelOf(node);
      const tabLocation = applyTabLabel(label, location);
      pushOutline(page, tabLocation, `tab "${label}"`);
      walkContainer(node, tabLocation, page);
    } else if (node.type === "fence") {
      location = applyFenceLanguage(node, location);
      pushUnit(page, "code", contentLocation(location), codeTextOf(node));
    } else if (node.type === "table") {
      emitTable(node, location, page);
    } else if (node.type === "paragraph") {
      emitParagraph(node, location, page);
    } else if (node.type === "item") {
      emitListItem(node, location, page);
    } else {
      walkContainer(node, location, page);
    }
  }
}

function applyHeading(
  heading: Node,
  location: UnitLocation,
  page: PageBuilder,
): UnitLocation {
  const text = inlineTextOf(heading);
  const level = heading.attributes.level as number;
  const version = text.match(versionHeading)?.[1];
  const section = sectionsBySlug[slugify(text)];
  const headingElement = `heading h${level} "${text}"`;
  page.brokenCodeUnit = undefined;

  if (version) {
    const versionLocation = { operation: location.operation, version };
    pushOutline(page, versionLocation, headingElement);
    return versionLocation;
  }
  if (section) {
    const sectionLocation = {
      operation: location.operation,
      version: location.version,
      section,
    };
    pushOutline(page, sectionLocation, headingElement);
    return sectionLocation;
  }
  // A `#` comment line in Hugo's unfenced curl block parses as an empty heading.
  if (text === "" && level < 5 && location.section === "code-example") {
    pushOutline(page, location, headingElement);
    page.brokenCodeUnit = unfencedCodeUnitBefore(page, location);
    return location;
  }
  // Hugo starts each code example with an empty `#####`; its fence sets the language.
  if (text === "") {
    const languagelessLocation = { ...location, language: undefined };
    pushOutline(page, languagelessLocation, headingElement);
    page.exampleStart = {
      unitIndex: page.units.length,
      outlineIndex: page.outline.length,
    };
    return languagelessLocation;
  }
  if (level === 2) {
    const { name, badges } = splitBadges(text);
    const operationLocation = { operation: slugify(name) };
    pushOutline(page, operationLocation, headingElement);
    for (const badge of badges) {
      pushOutline(page, operationLocation, `badge "${badge}"`);
    }
    emitHeading(heading, name, operationLocation, page);
    return operationLocation;
  }
  if (level >= 4) {
    emitLabel(page, location, text, "heading");
    return location;
  }
  pushOutline(page, location, headingElement);
  emitHeading(heading, text, location, page);
  return location;
}

/**
 * Operation headings end with status badges: `Name preview` in Hugo,
 * `Name (preview)` in Astro. The name keys the location; the badges go to the
 * outline so a badge one side lacks is still reported.
 */
function splitBadges(text: string): { name: string; badges: string[] } {
  let name = text;
  const badges: string[] = [];
  let match = name.match(trailingBadge);
  while (match) {
    badges.unshift(match[1].toLowerCase());
    name = name.slice(0, match.index);
    match = name.match(trailingBadge);
  }
  return { name, badges };
}

function emitHeading(
  heading: Node,
  text: string,
  location: UnitLocation,
  page: PageBuilder,
): void {
  pushUnit(page, "heading", location, text);
  emitLinks(heading, location, page);
}

function tabLabelOf(tab: Node): string {
  return String(tab.attributes.label ?? tab.attributes.title ?? "");
}

function applyTabLabel(label: string, location: UnitLocation): UnitLocation {
  const lowerLabel = label.toLowerCase();
  if (versionTabLabel.test(label))
    return { operation: location.operation, version: label };
  if (responseCodeTabLabel.test(label))
    return { ...location, responseCode: label };
  if (lowerLabel === "model" || lowerLabel === "example") {
    return { ...location, panel: lowerLabel as "model" | "example" };
  }
  if (location.section === "code-example")
    return { ...location, language: lowerLabel };
  return { ...location, tab: lowerLabel };
}

function applyFenceLanguage(fence: Node, location: UnitLocation): UnitLocation {
  if (location.section !== "code-example" || location.language) return location;
  const fenceLanguage = String(fence.attributes.language ?? "").toLowerCase();
  if (!fenceLanguage) return location;
  return {
    ...location,
    language: languagesByFence[fenceLanguage] ?? fenceLanguage,
  };
}

/** Content directly under a version or operation, before any section, is its overview. */
function contentLocation(location: UnitLocation): UnitLocation {
  const isUnderOperation = location.version || location.operation;
  if (isUnderOperation && !location.section && !location.tab) {
    return { ...location, section: "overview" };
  }
  return location;
}

function emitParagraph(
  paragraph: Node,
  location: UnitLocation,
  page: PageBuilder,
): void {
  const text = inlineTextOf(paragraph);
  if (text === "") return;
  if (isBoldOnly(paragraph)) {
    emitLabel(page, location, text, "bold-paragraph");
    return;
  }
  const located = contentLocation(location);
  const brokenCodeUnit = page.brokenCodeUnit;
  if (brokenCodeUnit?.locationKey === locationKeyOf(located)) {
    brokenCodeUnit.text = `${brokenCodeUnit.text} ${text}`;
    page.brokenCodeUnit = undefined;
  } else {
    pushUnit(page, "prose", located, text);
  }
  emitLinks(paragraph, located, page);
}

function unfencedCodeUnitBefore(
  page: PageBuilder,
  location: UnitLocation,
): ContentUnit | undefined {
  const lastUnit = page.units.at(-1);
  const isUnfencedCode =
    lastUnit?.kind === "prose" &&
    lastUnit.locationKey === locationKeyOf(definedFieldsOf(location));
  return isUnfencedCode ? lastUnit : undefined;
}

/** An item's own text is one unit; its nested lists are walked for theirs. */
function emitListItem(
  item: Node,
  location: UnitLocation,
  page: PageBuilder,
): void {
  const isList = (child: Node) => child.type === "list";
  emitParagraph(
    new Markdoc.Ast.Node(
      "item",
      item.attributes,
      item.children.filter((child) => !isList(child)),
    ),
    location,
    page,
  );
  for (const nestedList of item.children.filter(isList)) {
    walkContainer(nestedList, location, page);
  }
}

function emitLabel(
  page: PageBuilder,
  location: UnitLocation,
  text: string,
  form: "heading" | "bold-paragraph",
): void {
  const located = contentLocation(location);
  pushUnit(page, "label", located, text, { form });
  pushOutline(page, located, `label ${form} "${text}"`);
}

function isBoldOnly(paragraph: Node): boolean {
  const inline = paragraph.children[0];
  if (paragraph.children.length !== 1 || inline?.type !== "inline")
    return false;
  return inline.children.length === 1 && inline.children[0].type === "strong";
}

function emitTable(
  table: Node,
  location: UnitLocation,
  page: PageBuilder,
): void {
  const [headerRow, ...bodyRows] = [...table.walk()].filter(
    (node) => node.type === "tr",
  );
  const headers = cellTextsOf(headerRow);
  const isEndpointTable = headers[0] === "Datadog site";
  const fieldColumn = headers.indexOf("Field");
  const parentFieldColumn = headers.indexOf("Parent field");
  const tableLocation = isEndpointTable
    ? { ...location, section: "endpoint-table" }
    : contentLocation(location);
  pushOutline(page, tableLocation, `table ${headers.join(" | ")}`);
  if (isEndpointTable) {
    const sites = bodyRows.map((row) => cellTextsOf(row)[0]);
    pushOutline(page, tableLocation, `endpoint sites ${sites.join(", ")}`);
  }

  for (const row of bodyRows) {
    const cells = cellTextsOf(row);
    const malformed = page.repairedRowLines.has(row.lines[0])
      ? "table-cell-line-break"
      : undefined;
    if (fieldColumn === -1) {
      pushUnit(page, "tableRow", tableLocation, cells.join(" | "), {
        malformed,
      });
    } else {
      const parentField =
        parentFieldColumn === -1 ? "" : cells[parentFieldColumn];
      const field = parentField
        ? `${parentField}.${cells[fieldColumn]}`
        : cells[fieldColumn];
      const otherCells = cells.filter(
        (_cell, column) =>
          column !== fieldColumn && column !== parentFieldColumn,
      );
      pushUnit(
        page,
        "tableRow",
        tableLocation,
        [field, ...otherCells].join(" | "),
        { field, malformed },
      );
    }
    emitLinks(row, tableLocation, page);
  }
}

function cellTextsOf(row: Node): string[] {
  return row.children.map((cell) => inlineTextOf(cell));
}

function emitLinks(
  node: Node,
  location: UnitLocation,
  page: PageBuilder,
): void {
  for (const descendant of node.walk()) {
    if (descendant.type === "link") {
      const href = String(descendant.attributes.href);
      pushUnit(page, "link", location, href);
      rekeyLegacyExample(page, location, href);
    }
  }
}

/**
 * Hugo files legacy examples under the fence's language. Their install link
 * names the legacy client, so the example is moved to Astro's legacy tab key.
 */
function rekeyLegacyExample(
  page: PageBuilder,
  location: UnitLocation,
  href: string,
): void {
  const legacyLanguage = href.match(legacyInstallLink)?.[1];
  if (
    !page.exampleStart ||
    location.section !== "code-example" ||
    location.language !== legacyLanguage
  ) {
    return;
  }
  const legacyLocation = { language: `${legacyLanguage} [legacy]` };
  for (const unit of page.units.slice(page.exampleStart.unitIndex)) {
    if (unit.location.language !== legacyLanguage) continue;
    unit.location = { ...unit.location, ...legacyLocation };
    unit.locationKey = locationKeyOf(unit.location);
  }
  const languageSuffix = `/${legacyLanguage}`;
  for (const entry of page.outline.slice(page.exampleStart.outlineIndex)) {
    if (!entry.locationKey.endsWith(languageSuffix)) continue;
    entry.locationKey =
      entry.locationKey.slice(0, -languageSuffix.length) +
      `/${legacyLocation.language}`;
  }
}

function codeTextOf(fence: Node): string {
  const content = String(fence.attributes.content);
  if (fence.attributes.language === "json") {
    try {
      return JSON.stringify(JSON.parse(content));
    } catch {
      // Not valid JSON: fall through to whitespace normalization.
    }
  }
  return collapseWhitespace(content);
}

/** Visible text of a node's inline content, with formatting stripped. */
function inlineTextOf(node: Node): string {
  const parts: string[] = [];
  for (const descendant of node.walk()) {
    if (descendant.type === "text" || descendant.type === "code") {
      parts.push(String(descendant.attributes.content));
    } else if (
      descendant.type === "softbreak" ||
      descendant.type === "hardbreak"
    ) {
      parts.push(" ");
    }
  }
  return collapseWhitespace(parts.join(""));
}

function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function pushUnit(
  page: PageBuilder,
  kind: UnitKind,
  location: UnitLocation,
  text: string,
  extra: Pick<ContentUnit, "field" | "form" | "malformed"> = {},
): void {
  const definedLocation = definedFieldsOf(location);
  page.brokenCodeUnit = undefined;
  page.units.push({
    kind,
    location: definedLocation,
    locationKey: locationKeyOf(definedLocation),
    text,
    ...definedFieldsOf(extra),
  });
}

function pushOutline(
  page: PageBuilder,
  location: UnitLocation,
  element: string,
): void {
  page.outline.push({
    locationKey: locationKeyOf(definedFieldsOf(location)),
    element,
  });
}

function definedFieldsOf<Fields extends object>(fields: Fields): Fields {
  return Object.fromEntries(
    Object.entries(fields).filter(([, value]) => value !== undefined),
  ) as Fields;
}
