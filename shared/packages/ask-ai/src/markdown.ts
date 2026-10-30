import { marked } from "marked";
import { markedHighlight } from "marked-highlight";

import { highlightCode } from "./highlight";
import { attachTooltips, buildSourceCards } from "./sources";
import type { Source } from "./types";

let markedConfigured = false;

function ensureMarkedConfigured(): void {
  if (markedConfigured) return;
  markedConfigured = true;

  marked.use(
    markedHighlight({
      // These two keep the ported stylesheet's `.hljs` selectors matching.
      emptyLangClass: "hljs",
      langPrefix: "hljs language-",
      highlight: (code: string, lang: string) => highlightCode(code, lang),
    }),
    { breaks: true, gfm: true },
  );

  marked.use({
    renderer: {
      link({ href, title, text }) {
        const titleAttribute = title ? ` title="${title}"` : "";
        return (
          `<a class="conv-search-md-link" href="${href}"${titleAttribute}` +
          ` target="_blank" rel="noopener noreferrer">${text}</a>`
        );
      },
    },
  });
}

export function parseMarkdown(text: string): string {
  ensureMarkedConfigured();
  return marked.parse(text, { async: false });
}

/** Turns `[N]` tokens into numbered chips, leaving code blocks untouched. */
export function inlineRefChips(html: string): string {
  return html.replace(
    /(<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>)|(\[(\d{1,3})\])/gi,
    (_match, codeBlock: string | undefined, _token, num: string) => {
      if (codeBlock) return codeBlock;
      return (
        '<span class="conv-search-source-ref-wrap">' +
        `<button type="button" class="conv-search-source-ref-btn" data-source-number="${num}">` +
        `<span class="conv-search-source-ref-number">${num}</span>` +
        "</button></span>"
      );
    },
  );
}

/** Renders a finished answer: markdown, chips, tooltips, and source cards. */
export function renderMessageWithSources(markdownText: string): string {
  const { displayMarkdown, sources } = extractSources(markdownText);
  const container = document.createElement("div");
  container.innerHTML = inlineRefChips(parseMarkdown(displayMarkdown));

  if (sources.length > 0) {
    const byNumber = new Map(sources.map((source) => [source.number, source]));
    attachTooltips(container, byNumber);
    container.appendChild(buildSourceCards(sources));
  }

  return container.innerHTML;
}

const LEGACY_JSON_FENCE_RE =
  /```(?:sources|docs-sources|sources-json|json)\s*([\s\S]*?)```/gi;

const SOURCES_MARKER = "[sources]";

/**
 * Splits an answer into the prose to display and the citations to render.
 *
 * Two formats, because the backend has emitted both: a pipe-delimited
 * `[sources]` block, and a legacy fenced-JSON block.
 */
export function extractSources(markdownText: string): {
  displayMarkdown: string;
  sources: Source[];
} {
  const markerIndex = markdownText.indexOf(SOURCES_MARKER);
  if (markerIndex !== -1) {
    return {
      displayMarkdown: markdownText.slice(0, markerIndex).trim(),
      sources: parseSourceLines(
        markdownText.slice(markerIndex + SOURCES_MARKER.length),
      ),
    };
  }

  let displayMarkdown = markdownText;
  let sources: Source[] = [];

  for (const match of markdownText.matchAll(LEGACY_JSON_FENCE_RE)) {
    const parsed = parseJsonSources(match[1] ?? "");
    if (parsed.length > 0) sources = parsed;
    displayMarkdown = displayMarkdown.replace(match[0], "");
  }

  // A stream cut off mid-block leaves a partial fence or marker behind.
  displayMarkdown = displayMarkdown
    .replace(/```(?:sources|docs-sources|sources-json|json)[\s\S]*$/gi, "")
    .replace(/\[sources?\]?\s*$/i, "");

  sources.forEach((source, index) => {
    if (!source.number) source.number = index + 1;
  });

  return { displayMarkdown: displayMarkdown.trim(), sources };
}

/** `1 | Title | https://…`, one per line. */
function parseSourceLines(text: string): Source[] {
  const lineRe = /^(\d+)\s*\|\s*(.+?)\s*\|\s*(\S+)\s*$/;
  const sources: Source[] = [];

  for (const rawLine of text.split("\n")) {
    const match = rawLine.trim().match(lineRe);
    if (!match) continue;

    const href = normalizeHref(match[3]);
    if (!href) continue;

    sources.push({
      number: Number.parseInt(match[1] ?? "", 10),
      href,
      label: (match[2] ?? "").trim(),
    });
  }

  return sources;
}

function parseJsonSources(jsonText: string): Source[] {
  try {
    // The legacy block is not reliably valid JSON: it has appeared with
    // unquoted keys, single quotes, and trailing commas.
    const relaxed = jsonText
      .trim()
      .replace(/^\s*\{\s*sources\s*:/i, '{"sources":')
      .replace(/([{,]\s*)([a-zA-Z_]\w*)\s*:/g, '$1"$2":')
      .replace(/'/g, '"')
      .replace(/,\s*([}\]])/g, "$1");

    const parsed: unknown = JSON.parse(relaxed);
    const list = Array.isArray(parsed)
      ? parsed
      : (parsed as { sources?: unknown })?.sources;
    if (!Array.isArray(list)) return [];

    const sources: Source[] = [];
    const seenHrefs = new Set<string>();

    list.forEach((rawItem: unknown, index) => {
      const item = (rawItem ?? {}) as Record<string, unknown>;
      const href = normalizeHref(
        typeof item["url"] === "string"
          ? item["url"]
          : typeof item["href"] === "string"
            ? item["href"]
            : "",
      );
      if (!href || seenHrefs.has(href)) return;
      seenHrefs.add(href);

      const rawLabel = item["title"] ?? item["label"] ?? href;
      sources.push({
        number: typeof item["number"] === "number" ? item["number"] : index + 1,
        href,
        label: String(rawLabel).trim(),
      });
    });

    return sources;
  } catch {
    return [];
  }
}

/**
 * Resolves a source URL, rejecting anything that is not http or https. This is
 * what keeps a `javascript:` or `data:` URL out of a rendered link.
 */
export function normalizeHref(rawHref: string | undefined): string {
  const href = (rawHref ?? "").trim();
  if (!href) return "";

  try {
    const url = new URL(href, window.location.origin);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    return url.href;
  } catch {
    return "";
  }
}
