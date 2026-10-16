#!/usr/bin/env node
/**
 * Loads both sides of each page under comparison: Astro's plaintext twin from
 * `dist`, and Hugo's from prod. Also loads the prod Hugo HTML page, stripped
 * to its content area before it's cached. Hugo responses are cached under
 * `.cache/` so reruns are offline and stable; pass `--refresh` to refetch.
 *
 * Part of the throwaway content QA tool in `qa/content/`. See
 * `plans/30_api_content_qa_reporting.md`.
 *
 * Runs as TypeScript directly under Node 24's type-stripping.
 *
 * Usage: node qa/content/fetchPages.ts [--refresh] [--page <path>]
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { extractHtmlChunks, stripToContent } from "./extractHtml.ts";

const qaRoot = import.meta.dirname;
const astroRoot = path.resolve(qaRoot, "../..");
const distApiRoot = path.join(astroRoot, "dist/client");
const hugoMarkdownCacheRoot = path.join(qaRoot, ".cache/hugo-md");
const hugoHtmlCacheRoot = path.join(qaRoot, ".cache/hugo-html");
const hugoOrigin = "https://docs.datadoghq.com";

export interface LoadedMarkdown {
  pagePath: string;
  /** Null when the page has no `.md` on this side. */
  text: string | null;
  source: string;
}

export interface HugoFetchMeta {
  status: number;
  fetchedAt: string;
}

export function readPageList(
  listPath = path.join(qaRoot, "pages.txt"),
): string[] {
  return readFileSync(listPath, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "" && !line.startsWith("#"));
}

/** `/api/latest/foo` → `dist/client/api/latest/foo.md`. */
export function astroMarkdownPath(pagePath: string): string {
  return path.join(distApiRoot, `${trimSlashes(pagePath)}.md`);
}

export function loadAstroMarkdown(pagePath: string): LoadedMarkdown {
  const source = astroMarkdownPath(pagePath);
  const text = existsSync(source) ? readFileSync(source, "utf8") : null;
  return { pagePath, text, source };
}

/** When `dist` was last built, from the mtime of the API index twin. */
export function distBuiltAt(): string {
  return statSync(path.join(distApiRoot, "api/latest.md")).mtime.toISOString();
}

export async function loadHugoMarkdown(
  pagePath: string,
  { refresh = false } = {},
): Promise<LoadedMarkdown & HugoFetchMeta> {
  const source = `${hugoOrigin}/${trimSlashes(pagePath)}.md`;
  const cachedTextPath = path.join(
    hugoMarkdownCacheRoot,
    `${trimSlashes(pagePath)}.md`,
  );
  const cachedMetaPath = `${cachedTextPath}.meta.json`;

  if (refresh || !existsSync(cachedMetaPath)) {
    const response = await fetch(source);
    const meta: HugoFetchMeta = {
      status: response.status,
      fetchedAt: new Date().toISOString(),
    };
    mkdirSync(path.dirname(cachedTextPath), { recursive: true });
    if (response.ok) writeFileSync(cachedTextPath, await response.text());
    writeFileSync(cachedMetaPath, JSON.stringify(meta, null, 2) + "\n");
  }

  const meta: HugoFetchMeta = JSON.parse(readFileSync(cachedMetaPath, "utf8"));
  const text =
    meta.status === 200 ? readFileSync(cachedTextPath, "utf8") : null;
  return { pagePath, text, source, ...meta };
}

/**
 * The prod HTML page, stripped to its content area. The raw page is only ever
 * held in memory: its navs are most of its size.
 */
export async function loadHugoHtml(
  pagePath: string,
  { refresh = false } = {},
): Promise<LoadedMarkdown & HugoFetchMeta> {
  const source = `${hugoOrigin}/${trimSlashes(pagePath)}/`;
  const cachedTextPath = path.join(
    hugoHtmlCacheRoot,
    `${trimSlashes(pagePath)}.html`,
  );
  const cachedMetaPath = `${cachedTextPath}.meta.json`;

  if (refresh || !existsSync(cachedMetaPath)) {
    const response = await fetch(source);
    const meta: HugoFetchMeta = {
      status: response.status,
      fetchedAt: new Date().toISOString(),
    };
    mkdirSync(path.dirname(cachedTextPath), { recursive: true });
    if (response.ok) {
      writeFileSync(cachedTextPath, stripToContent(await response.text()));
    }
    writeFileSync(cachedMetaPath, JSON.stringify(meta, null, 2) + "\n");
  }

  const meta: HugoFetchMeta = JSON.parse(readFileSync(cachedMetaPath, "utf8"));
  const text =
    meta.status === 200 ? readFileSync(cachedTextPath, "utf8") : null;
  return { pagePath, text, source, ...meta };
}

function trimSlashes(pagePath: string): string {
  return pagePath.replace(/^\/+|\/+$/g, "");
}

function describeSize(text: string | null): string {
  return text === null ? "absent" : `${text.split("\n").length} lines`;
}

function describeHtml(strippedHtml: string | null): string {
  if (strippedHtml === null) return "absent";
  const chunks = extractHtmlChunks(strippedHtml);
  const looseChunks = chunks.filter((chunk) => chunk.loose);
  const kibibytes = Math.round(strippedHtml.length / 1024);
  const looseSample = looseChunks
    .slice(0, 3)
    .map((chunk) => `\n    loose: ${chunk.text.slice(0, 80)}`)
    .join("");
  return `${kibibytes} KiB, ${chunks.length} chunks, ${looseChunks.length} loose${looseSample}`;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const refresh = args.includes("--refresh");
  const pageFlagIndex = args.indexOf("--page");
  const pagePaths =
    pageFlagIndex === -1 ? readPageList() : [args[pageFlagIndex + 1]];

  console.log(`dist built at ${distBuiltAt()}`);
  for (const pagePath of pagePaths) {
    const astro = loadAstroMarkdown(pagePath);
    const hugo = await loadHugoMarkdown(pagePath, { refresh });
    const hugoHtml = await loadHugoHtml(pagePath, { refresh });
    console.log(
      `${pagePath}\n  astro: ${describeSize(astro.text)}\n  hugo:  ${describeSize(hugo.text)} (HTTP ${hugo.status}, ${hugo.fetchedAt})\n  html:  ${describeHtml(hugoHtml.text)} (HTTP ${hugoHtml.status})`,
    );
  }
}

if (import.meta.main) await main();
