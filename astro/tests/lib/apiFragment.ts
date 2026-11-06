import * as cheerio from "cheerio";
import type { Cheerio, CheerioAPI } from "cheerio";
import type { AnyNode, Element } from "domhandler";

/**
 * The parts of an operation's `.api-endpoint` a fragment can hold.
 *
 * - `overview`: everything that isn't another section — status alerts, the
 *   Overview heading, the description, permissions and OAuth scopes.
 * - `endpoint-url`: the method badge and every region's host.
 * - `arguments` and `request`: the `data-api-section` blocks in ApiEndpoint.
 * - `response`: ApiResponse, every status code.
 * - `curl`: the curl tab of ApiCodeExample, `us` region only. The other
 *   regions differ only by host, which `endpoint-url` covers.
 * - `code-tabs`: ApiCodeExample's language tabs, without their panels.
 * - `heading`: the page title and the endpoint's version tab, which sit
 *   outside `.api-endpoint`.
 */
export type ApiSection =
  | "overview"
  | "endpoint-url"
  | "arguments"
  | "request"
  | "response"
  | "curl"
  | "code-tabs"
  | "heading";

export interface FragmentSelector {
  /** Sections to extract, in the order they appear in the fragment. */
  sections: ApiSection[];
  /** Narrows `arguments`, `request` and `response` to the first row with this field name, plus its nested rows. */
  field?: string;
  /** Narrows `response` to one status code's panel. */
  responseCode?: string;
  /** Picks the endpoint on a multi-version page. */
  version?: "v1" | "v2";
  /**
   * Sections that must not render. For classes whose behavior is a missing
   * section, which a fragment can't show.
   */
  absent?: ApiSection[];
}

const SCHEMA_SECTIONS = new Set<ApiSection>([
  "arguments",
  "request",
  "response",
]);

/** Selectors for the direct children of `.api-endpoint` that aren't part of the overview. */
const NON_OVERVIEW_CHILDREN = [
  ".api-endpoint__url-line",
  "[data-api-section]",
  ".api-response",
  ".api-code-example",
].join(", ");

const CURL_REGION = "us";

/**
 * Pulls one operation's sections out of a rendered operation page, as raw
 * HTML ready for `normalizeSnapshotHtml`. Throws when anything the selector
 * names is missing, so a case that no longer shows its class fails loudly.
 */
export function extractApiFragment(
  pageHtml: string,
  selector: FragmentSelector,
): string {
  const $ = cheerio.load(pageHtml);
  const endpoint = findEndpoint($, selector.version);
  for (const section of selector.absent ?? [])
    if (findSection($, endpoint, section).length > 0)
      throw new Error(`Unexpected section: ${section}`);
  return selector.sections
    .map((section) => {
      let parts = sectionParts($, endpoint, section);
      if (section === "response" && selector.responseCode)
        parts = narrowToResponseCode(parts, selector.responseCode);
      if (SCHEMA_SECTIONS.has(section) && selector.field)
        parts = narrowToField($, parts, selector.field);
      return parts
        .map((_, node) => $.html(node))
        .get()
        .join("");
    })
    .join("\n");
}

function findEndpoint(
  $: CheerioAPI,
  version: FragmentSelector["version"],
): Cheerio<Element> {
  const endpoints = $(".api-endpoint");
  if (version) {
    const match = endpoints.filter(
      (_, element) =>
        $(element)
          .closest('[role="tabpanel"]')
          .attr("id")
          ?.endsWith(`-${version}`) ?? false,
    );
    if (match.length !== 1)
      throw new Error(`No .api-endpoint for version ${version}`);
    return match;
  }
  if (endpoints.length !== 1)
    throw new Error(
      `Found ${endpoints.length} .api-endpoint elements; pass a version`,
    );
  return endpoints;
}

function sectionParts(
  $: CheerioAPI,
  endpoint: Cheerio<Element>,
  section: ApiSection,
): Cheerio<AnyNode> {
  const parts = findSection($, endpoint, section);
  if (parts.length === 0) throw new Error(`Missing section: ${section}`);
  return parts;
}

function findSection(
  $: CheerioAPI,
  endpoint: Cheerio<Element>,
  section: ApiSection,
): Cheerio<AnyNode> {
  switch (section) {
    case "overview":
      return overviewNodes($, endpoint);
    case "endpoint-url":
      return endpoint.children(".api-endpoint__url-line");
    case "arguments":
    case "request":
      return endpoint.children(`[data-api-section="${section}"]`);
    case "response":
      return endpoint.children(".api-response");
    case "curl":
      return curlPanel($, endpoint);
    case "code-tabs":
      return endpoint.find(".api-code-example [data-sync-key]");
    case "heading":
      return headingNodes($, endpoint);
  }
}

/** The page title, then the version tab that controls this endpoint's panel. */
function headingNodes(
  $: CheerioAPI,
  endpoint: Cheerio<Element>,
): Cheerio<AnyNode> {
  const panelId = endpoint.closest('[role="tabpanel"]').attr("id");
  const versionTab = panelId
    ? $(`[role="tab"][aria-controls="${panelId}"]`)
    : $([]);
  return $(".api-page-header__title").add(versionTab);
}

/** Every element or non-blank text node directly under `.api-endpoint` that isn't another section. */
function overviewNodes(
  $: CheerioAPI,
  endpoint: Cheerio<Element>,
): Cheerio<AnyNode> {
  return endpoint.contents().filter((_, node) => {
    if (node.type === "text") return $(node).text().trim() !== "";
    return node.type === "tag" && !$(node).is(NON_OVERVIEW_CHILDREN);
  });
}

function curlPanel(
  $: CheerioAPI,
  endpoint: Cheerio<Element>,
): Cheerio<AnyNode> {
  const panelId = endpoint
    .find('.api-code-example [data-sync-key="curl"]')
    .attr("aria-controls");
  if (!panelId) return $([]);
  const panel = endpoint.find(`[id="${panelId}"]`).clone();
  panel.find(`[data-region]:not([data-region="${CURL_REGION}"])`).remove();
  return panel;
}

function narrowToResponseCode(
  parts: Cheerio<AnyNode>,
  responseCode: string,
): Cheerio<AnyNode> {
  const panel = parts.find(`.api-response__panel--${responseCode}`);
  if (panel.length === 0)
    throw new Error(`Missing response code: ${responseCode}`);
  return panel;
}

/** The first row named `field`, plus the `.schema-table__children` block that holds its nested rows. */
function narrowToField(
  $: CheerioAPI,
  parts: Cheerio<AnyNode>,
  field: string,
): Cheerio<AnyNode> {
  const fieldRow = parts
    .find(`.schema-table__row[data-field-name="${field}"]`)
    .first();
  if (fieldRow.length === 0) throw new Error(`Missing field: ${field}`);
  const nestedRows = fieldRow.next(".schema-table__children");
  return $([fieldRow.get(0)!, ...nestedRows.get()]);
}

/** The `###` headings ApiEndpoint's plaintext twin emits, keyed by section. */
const PLAINTEXT_HEADINGS: Partial<Record<ApiSection, string>> = {
  overview: "### Overview",
  arguments: "### Arguments",
  request: "### Request",
  response: "### Response",
  curl: "### Code Example",
  "code-tabs": "### Code Example",
};
const SECTION_HEADINGS = new Set(Object.values(PLAINTEXT_HEADINGS));
const VARIANT_HEADING = /^## v\d/;

/**
 * Plaintext twin of `extractApiFragment`: the same sections, cut from the
 * page's `.md`. Headings only count outside code fences, and only the fixed
 * section headings split sections, so a heading inside a description stays
 * in the overview.
 */
export function extractPlaintextFragment(
  pageMd: string,
  selector: FragmentSelector,
): string {
  const pageLines = pageMd.split("\n");
  const [variantHeading, ...variant] = findVariant(pageLines, selector.version);
  for (const section of selector.absent ?? [])
    if (hasPlaintextSection(variant, section))
      throw new Error(`Unexpected plaintext section: ${section}`);
  return selector.sections
    .map((section) => {
      if (section === "heading")
        return [pageTitle(pageLines), "", variantHeading].join("\n");
      let lines = plaintextSectionLines(variant, section);
      if (section === "response" && selector.responseCode)
        lines = tabBlock(lines, selector.responseCode, `response code`);
      if (section === "curl") lines = tabBlock(lines, "Curl", "curl tab");
      if (section === "code-tabs") lines = lines.filter(isTabOpening);
      if (SCHEMA_SECTIONS.has(section) && selector.field)
        lines = narrowTableToField(lines, selector.field);
      return trimBlankLines(lines).join("\n");
    })
    .join("\n\n");
}

function isTabOpening(line: string): boolean {
  return line.startsWith("{% tab label=");
}

/** Marks each line as inside a code fence or not, counting the fence lines themselves as inside. */
function fenceFlags(lines: string[]): boolean[] {
  let inFence = false;
  return lines.map((line) => {
    if (line.startsWith("```")) {
      inFence = !inFence;
      return true;
    }
    return inFence;
  });
}

function pageTitle(lines: string[]): string {
  const inFence = fenceFlags(lines);
  const title = lines.find(
    (line, index) => !inFence[index] && line.startsWith("# "),
  );
  if (!title) throw new Error("Missing plaintext section: heading");
  return title;
}

/** The lines of one `## vN` variant, starting with its heading. */
function findVariant(
  lines: string[],
  version: FragmentSelector["version"],
): string[] {
  const inFence = fenceFlags(lines);
  const starts = lines
    .map((_, index) => index)
    .filter((index) => !inFence[index] && VARIANT_HEADING.test(lines[index]));
  const variants = starts.map((start, i) =>
    lines.slice(start, starts[i + 1] ?? lines.length),
  );
  if (version) {
    const match = variants.find((variant) =>
      variant[0].startsWith(`## ${version}`),
    );
    if (!match) throw new Error(`No plaintext variant for version ${version}`);
    return match;
  }
  if (variants.length !== 1)
    throw new Error(
      `Found ${variants.length} plaintext variants; pass a version`,
    );
  return variants[0];
}

/** Splits a variant into its preamble (status alert and region table) and its `###` sections. */
function splitVariant(variant: string[]): {
  preamble: string[];
  sections: Map<string, string[]>;
} {
  const inFence = fenceFlags(variant);
  const sections = new Map<string, string[]>();
  const preamble: string[] = [];
  let current = preamble;
  variant.forEach((line, index) => {
    if (!inFence[index] && SECTION_HEADINGS.has(line)) {
      current = [line];
      sections.set(line, current);
    } else current.push(line);
  });
  return { preamble, sections };
}

function plaintextSectionLines(
  variant: string[],
  section: ApiSection,
): string[] {
  const { preamble, sections } = splitVariant(variant);
  const isRegionRow = (line: string) => line.startsWith("|");
  let lines: string[] | undefined;
  if (section === "endpoint-url") lines = preamble.filter(isRegionRow);
  else if (section === "overview") {
    const statusLines = preamble.filter((line) => !isRegionRow(line));
    const overview = sections.get(PLAINTEXT_HEADINGS.overview!) ?? [];
    lines = [...statusLines, ...overview];
  } else lines = sections.get(PLAINTEXT_HEADINGS[section]!);
  if (!lines || trimBlankLines(lines).length === 0)
    throw new Error(`Missing plaintext section: ${section}`);
  return lines;
}

function hasPlaintextSection(variant: string[], section: ApiSection): boolean {
  try {
    plaintextSectionLines(variant, section);
    return true;
  } catch {
    return false;
  }
}

/** The `{% tab label="…" %}` block with this label, from its opening tag to its matching close. */
function tabBlock(lines: string[], label: string, what: string): string[] {
  const inFence = fenceFlags(lines);
  const start = lines.findIndex(
    (line, index) => !inFence[index] && line === `{% tab label="${label}" %}`,
  );
  if (start === -1) throw new Error(`Missing ${what}: ${label}`);
  let depth = 0;
  for (let index = start; index < lines.length; index++) {
    if (inFence[index]) continue;
    if (lines[index].startsWith("{% tab ")) depth++;
    if (lines[index] === "{% /tab %}") depth--;
    if (depth === 0) return lines.slice(start, index + 1);
  }
  throw new Error(`Unclosed ${what}: ${label}`);
}

function tableCells(line: string): string[] {
  return line
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());
}

/** The `Parent field` cell of a map's `<any-key>` row (Hugo parity). */
const ANY_KEY_PARENT = "additionalProperties";

/** The field's name in a schema table cell, without the required marker. */
function cellFieldName(cell: string): string {
  return cell.replace(/\s*\[\*required\*\]$/, "");
}

/**
 * The first table row for `field`, plus the run of rows after it whose
 * `Parent field` is that field or one of its descendants. Rows are in
 * depth-first order, so the descendants are contiguous. A map's `<any-key>`
 * row names `additionalProperties` as its parent, so inside the run it counts
 * as a descendant too. Keeps the table's header and divider.
 */
function narrowTableToField(lines: string[], field: string): string[] {
  for (let index = 0; index < lines.length; index++) {
    if (!lines[index].startsWith("|")) continue;
    const header = tableCells(lines[index]);
    const fieldColumn = header.indexOf("Field");
    const parentColumn = header.indexOf("Parent field");
    const tableStart = index;
    while (index < lines.length && lines[index].startsWith("|")) index++;
    const rows = lines.slice(tableStart + 2, index);
    const matchIndex = rows.findIndex(
      (row) => cellFieldName(tableCells(row)[fieldColumn]) === field,
    );
    if (matchIndex === -1) continue;
    const kept = [rows[matchIndex]];
    const ancestors = new Set([field]);
    if (parentColumn !== -1) {
      for (const row of rows.slice(matchIndex + 1)) {
        const cells = tableCells(row);
        const parent = cells[parentColumn];
        if (!ancestors.has(parent) && parent !== ANY_KEY_PARENT) break;
        ancestors.add(cellFieldName(cells[fieldColumn]));
        kept.push(row);
      }
    }
    return [lines[tableStart], lines[tableStart + 1], ...kept];
  }
  throw new Error(`Missing plaintext field: ${field}`);
}

function trimBlankLines(lines: string[]): string[] {
  let start = 0;
  let end = lines.length;
  while (start < end && lines[start].trim() === "") start++;
  while (end > start && lines[end - 1].trim() === "") end--;
  return lines.slice(start, end);
}
