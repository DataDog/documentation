/**
 * The prod Hugo HTML page, which arbitrates between Hugo's lossy `.md` and
 * Astro's (pipeline step 8 in the plan).
 *
 * `stripToContent` runs at fetch time, so the gigantic navs never reach disk:
 * it keeps only `<title>` and the `div.main-api` content area, minus page
 * chrome. `extractHtmlChunks` then splits the stripped page into text chunks
 * (headings, paragraphs, rows, code, endpoints, tab labels), normalized like
 * the `.md`. Text outside any known block, such as bare text in a `div`, is
 * still chunked as a paragraph flagged `loose`, so markup the chunker doesn't
 * know about can't silently hide content.
 */
import * as cheerio from "cheerio";
import type { AnyNode, Element } from "domhandler";
import { normalizeCharacters } from "./normalize.ts";

export interface HtmlChunk {
  kind:
    | "heading"
    | "paragraph"
    | "listItem"
    | "tableRow"
    | "code"
    | "endpoint"
    | "tab";
  text: string;
  /** Enclosing tab-pane ids and code language, joined with ` > `. */
  context: string;
  cells?: string[];
  /** Schema rows only: the field, as `parent.field` when nested, like the `.md`. */
  field?: string;
  /** A paragraph made of text outside any known block element. */
  loose?: true;
}

const contentAreaSelector = "div.main-api";

/** Elements that are page furniture, not content. */
const chromeSelectors = [
  "script",
  "style",
  "noscript",
  "template",
  "svg",
  "picture",
  "img",
  "iframe",
  "nav",
  ".api-toolbar",
  "#page-copy-btn",
  ".expand-all",
  ".js-copy-button",
  // The "Show N more" toggle; the hidden enum values next to it are content.
  ".enum-summary",
];

/** Elements that join loose text into a paragraph rather than end it. */
const inlineTags = new Set(["a", "b", "code", "em", "i", "span", "strong"]);

/** Hugo's `.md` shows the default site's value in code; the HTML has them all. */
const defaultRegion = "us";

export function stripToContent(html: string): string {
  const $ = cheerio.load(html);
  const content = $(contentAreaSelector).first();
  if (content.length === 0) {
    throw new Error(`No ${contentAreaSelector} content area in the page`);
  }
  content.find(chromeSelectors.join(",")).remove();
  const stripped = cheerio.load(
    "<!doctype html><html><head><title></title></head><body></body></html>",
  );
  stripped("title").text($("head > title").first().text());
  stripped("body").append($.html(content));
  return stripped.html() + "\n";
}

export function extractHtmlChunks(strippedHtml: string): HtmlChunk[] {
  const $ = cheerio.load(strippedHtml);
  // Again here, so a cache stripped with an older list still extracts cleanly.
  $(chromeSelectors.join(",")).remove();
  const chunks: HtmlChunk[] = [];
  const addChunks = (newChunks: HtmlChunk[]): void => {
    chunks.push(...newChunks.filter((chunk) => chunk.text !== ""));
  };

  const walk = (parent: Element, context: string[]): void => {
    let looseRun: AnyNode[] = [];
    const endLooseRun = (): void => {
      if (looseRun.length === 0) return;
      const text = looseRun.map(textOf).join("");
      addChunks([
        {
          kind: "paragraph",
          text: cleanText(text),
          context: context.join(" > "),
          loose: true,
        },
      ]);
      looseRun = [];
    };

    for (const child of parent.children) {
      if (child.type === "text" || isInlineElement(child)) {
        looseRun.push(child);
        continue;
      }
      endLooseRun();
      if (child.type !== "tag") continue;
      const childContext = contextWith(child, context);
      const childChunks = chunksOfElement($, child, childContext.join(" > "));
      if (!childChunks) {
        walk(child, childContext);
        continue;
      }
      addChunks(childChunks);
      if (child.tagName === "li") {
        $(child)
          .children("ul, ol")
          .each((_, nestedList) => walk(nestedList, childContext));
      }
    }
    endLooseRun();
  };

  const content = $(contentAreaSelector).get(0);
  if (content) walk(content, []);
  return chunks;
}

function contextWith(element: Element, context: string[]): string[] {
  const classes = element.attribs.class?.split(/\s+/) ?? [];
  if (classes.includes("tab-pane") && element.attribs.id) {
    return [...context, element.attribs.id];
  }
  const codeLanguage = element.attribs["data-code-lang-block"];
  return codeLanguage ? [...context, codeLanguage] : context;
}

/** The chunks an element becomes, or null to keep walking into it. */
function chunksOfElement(
  $: cheerio.CheerioAPI,
  element: Element,
  context: string,
): HtmlChunk[] | null {
  const $element = $(element);
  const chunk = (kind: HtmlChunk["kind"], text: string): HtmlChunk => ({
    kind,
    text: cleanText(text),
    context,
  });

  if (/^h[1-6]$/.test(element.tagName)) {
    const heading = $element.clone();
    heading.find(".badge").remove();
    return [chunk("heading", textOf(heading.get(0)!))];
  }
  if ($element.is("p.api-url-info")) return endpointChunks($, element);
  if ($element.hasClass("table-header")) return [];
  if ($element.hasClass("table-row")) {
    return [
      {
        ...rowChunk($element.children(".column").toArray(), context),
        field: schemaFieldOf($, element),
      },
    ];
  }
  if (element.tagName === "tr") {
    return [rowChunk($element.children("td, th").toArray(), context)];
  }
  if (element.tagName === "pre") {
    const code = $element.clone();
    code.find(`[data-region]:not([data-region="${defaultRegion}"])`).remove();
    return [chunk("code", textOf(code.get(0)!))];
  }
  if ($element.is("ul.nav")) {
    return $element
      .find("a")
      .toArray()
      .map((link) => chunk("tab", $(link).text()));
  }
  if (element.tagName === "li") {
    const item = $element.clone();
    item.children("ul, ol").remove();
    return [chunk("listItem", textOf(item.get(0)!))];
  }
  if (element.tagName === "p") return [chunk("paragraph", textOf(element))];
  return null;
}

function endpointChunks($: cheerio.CheerioAPI, element: Element): HtmlChunk[] {
  const method = cleanText($(element).find(".api-method").text());
  return $(element)
    .find("[data-region]")
    .toArray()
    .map((regionSpan) => ({
      kind: "endpoint",
      text: cleanText(`${method} ${$(regionSpan).text()}`),
      context: regionSpan.attribs["data-region"],
    }));
}

function rowChunk(cellElements: Element[], context: string): HtmlChunk {
  const cells = cellElements.map((cell) => cleanText(textOf(cell)));
  return { kind: "tableRow", text: cells.join(" | "), cells, context };
}

/**
 * A nested row sits in a `.isNested` block next to its parent row, so the
 * parent's field is the first-column row of the nearest `.hasChildData`.
 */
function schemaFieldOf($: cheerio.CheerioAPI, row: Element): string {
  const fieldOfRow = (element: Element): string =>
    cleanText(textOf($(element).children(".column").get(0) ?? element));
  const field = fieldOfRow(row);
  const parentRow = $(row)
    .closest(".isNested")
    .parent()
    .children(".table-row")
    .get(0);
  if (!parentRow) return field;
  const parentField = fieldOfRow(parentRow).replace(/\s*\[required\]$/, "");
  return `${parentField}.${field}`;
}

/** Text with a space between block elements, which `.text()` runs together. */
function textOf(node: AnyNode): string {
  if (node.type === "text") return node.data;
  if (node.type !== "tag") return "";
  const text = node.children.map(textOf).join("");
  return isInlineElement(node) ? text : ` ${text} `;
}

function isInlineElement(node: AnyNode): boolean {
  return node.type === "tag" && inlineTags.has(node.tagName);
}

function cleanText(text: string): string {
  return normalizeCharacters(text).replace(/\s+/g, " ").trim();
}
