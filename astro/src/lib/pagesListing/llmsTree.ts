import type { LlmsIndex, PlaintextPage, PlaintextSection } from "./types";
// Relative, not `@lib/...`: this module is imported by the `llmsTxt` integration,
// which runs in Node during build orchestration where Vite aliases do not resolve.
import { absoluteUrl } from "../site/siteUrl";

/**
 * Firm ceiling on any single generated llms.txt file's length, matching the
 * `html-to-mdoc` default. A section detail file that exceeds this is split by
 * subfolder, then into numbered `part_N` files (see `addFolderFiles`).
 */
export const DEFAULT_HARD_CHAR_LIMIT = 50_000;

const INTRO = [
  "# Datadog documentation",
  "",
  "> Plaintext documentation index for LLMs and programmatic clients.",
].join("\n");

export interface LlmsTree {
  /** Contents of the top-level `/llms.txt` index. */
  index: string;
  /** Detail files keyed by URL path (starts with "/", ends with "/llms.txt"). */
  detailFiles: Map<string, string>;
}

/**
 * Builds the llms.txt tree: a top-level index plus one detail file per section
 * (split into numbered parts when a section exceeds `hardCharLimit`). Private
 * pages are dropped everywhere, and sections left empty by that filter are
 * omitted from both the index and the detail files. This is the single place
 * llms.txt honors privacy.
 *
 * Takes the resolved `llms-index.json` intermediate file rather than the page
 * sources, so the whole tree — every file's path and its contents — is produced
 * by one call in the `llmsTxt` integration after the build. There is no
 * separate path enumeration step that has to agree with this one about where
 * the size-driven split boundaries fall.
 */
export function buildLlmsTree(
  llmsIndex: LlmsIndex,
  site: string | URL,
  hardCharLimit: number = DEFAULT_HARD_CHAR_LIMIT,
): LlmsTree {
  if (!site) {
    throw new Error("buildLlmsTree: site is required to emit canonical links.");
  }

  const detailFiles = new Map<string, string>();
  const indexLines: string[] = [INTRO, ""];

  for (const source of llmsIndex) {
    const rootPages = source.rootPages.filter(isVisible);
    const sections = source.sections
      .map((section) => ({
        ...section,
        pages: section.pages.filter(isVisible),
      }))
      .filter((section) => section.pages.length > 0)
      .sort((a, b) => a.title.localeCompare(b.title));

    if (rootPages.length === 0 && sections.length === 0) continue;

    indexLines.push(`## ${source.title}`, "");
    for (const page of rootPages) {
      indexLines.push(pageLine(page, site));
    }
    for (const section of sections) {
      indexLines.push(sectionLink(section, site));
    }
    indexLines.push("");

    for (const section of sections) {
      addFolderFiles(section, site, hardCharLimit, detailFiles);
    }
  }

  return { index: indexLines.join("\n").trimEnd() + "\n", detailFiles };
}

function isVisible(page: PlaintextPage): boolean {
  return !page.metadata.isPrivate;
}

function linkLine(title: string, url: string, description: string): string {
  const desc = description.trim();
  return desc ? `- [${title}](${url}): ${desc}` : `- [${title}](${url})`;
}

function pageLine(page: PlaintextPage, site: string | URL): string {
  return linkLine(
    page.metadata.title || "Untitled",
    absoluteUrl(page.urlPath, site),
    page.metadata.description || "",
  );
}

/** Index link for a section, labeled with its overview (first) page's description. */
function sectionLink(section: PlaintextSection, site: string | URL): string {
  return linkLine(
    section.title,
    absoluteUrl(section.llmsTxtPath, site),
    section.pages[0]?.metadata.description || "",
  );
}

function detailContents(
  title: string,
  pages: PlaintextPage[],
  site: string | URL,
): string {
  const lines = [`# ${title}`, ""];
  for (const page of pages) {
    lines.push(pageLine(page, site));
  }
  return lines.join("\n") + "\n";
}

function partPath(llmsTxtPath: string, partNumber: number): string {
  return llmsTxtPath.replace(/\/llms\.txt$/, `/part_${partNumber}/llms.txt`);
}

/** The pages listed in one detail file, and the file's path. */
interface FolderListing {
  title: string;
  llmsTxtPath: string;
  pages: PlaintextPage[];
}

/**
 * Writes a folder's detail file, splitting it when it's too long, the same way
 * as `html-to-mdoc`.
 *
 * Splitting is folder-first: pages in a subfolder of the file's folder move to
 * that subfolder's own detail file, which splits the same way. The folder's
 * file keeps its own pages and links to each subfolder's file. When there's no
 * subfolder left to split on, or the folder's file is still too long, its own
 * pages move to numbered `part_N` files instead.
 */
function addFolderFiles(
  folder: FolderListing,
  site: string | URL,
  hardCharLimit: number,
  detailFiles: Map<string, string>,
): void {
  const full = detailContents(folder.title, folder.pages, site);
  if (full.length <= hardCharLimit) {
    detailFiles.set(folder.llmsTxtPath, full);
    return;
  }

  const { ownPages, pagesBySubfolder } = groupBySubfolder(folder);
  const subfolders = [...pagesBySubfolder.keys()].sort();
  const canSplitByFolder =
    subfolders.length > 1 || (subfolders.length === 1 && ownPages.length > 0);
  if (!canSplitByFolder) {
    addPartFiles(folder, folder.pages, [], site, hardCharLimit, detailFiles);
    return;
  }

  const folderPath = folderOf(folder.llmsTxtPath);
  const subfolderLines: string[] = [];
  for (const subfolder of subfolders) {
    const llmsTxtPath = `${folderPath}${subfolder}/llms.txt`;
    addFolderFiles(
      {
        title: subfolder,
        llmsTxtPath,
        pages: pagesBySubfolder.get(subfolder)!,
      },
      site,
      hardCharLimit,
      detailFiles,
    );
    subfolderLines.push(
      `## ${subfolder}`,
      "",
      `- [Detailed page listing](${absoluteUrl(llmsTxtPath, site)})`,
      "",
    );
  }

  const index = listingContents(
    folder.title,
    ownPages.map((page) => pageLine(page, site)),
    subfolderLines,
  );
  if (index.length <= hardCharLimit) {
    detailFiles.set(folder.llmsTxtPath, index);
    return;
  }
  addPartFiles(
    folder,
    ownPages,
    subfolderLines,
    site,
    hardCharLimit,
    detailFiles,
  );
}

/**
 * Splits pages into numbered part files, and turns the folder's own file into
 * an index of links to those parts, followed by `trailingLines`.
 */
function addPartFiles(
  folder: FolderListing,
  pages: PlaintextPage[],
  trailingLines: string[],
  site: string | URL,
  hardCharLimit: number,
  detailFiles: Map<string, string>,
): void {
  const chunks = chunkPagesToFit(folder.title, pages, site, hardCharLimit);
  const partLines = chunks.map((chunk, i) => {
    const partNumber = i + 1;
    const path = partPath(folder.llmsTxtPath, partNumber);
    detailFiles.set(path, detailContents(folder.title, chunk, site));
    return `- [Part ${partNumber}](${absoluteUrl(path, site)})`;
  });
  detailFiles.set(
    folder.llmsTxtPath,
    listingContents(folder.title, partLines, trailingLines),
  );
}

/** A heading, its link lines, then any trailing lines after a blank line. */
function listingContents(
  title: string,
  linkLines: string[],
  trailingLines: string[],
): string {
  const lines = [`# ${title}`, "", ...linkLines];
  if (trailingLines.length > 0) {
    if (linkLines.length > 0) lines.push("");
    lines.push(...trailingLines);
  }
  return lines.join("\n").trimEnd() + "\n";
}

/**
 * Splits a folder's pages into the ones in a subfolder of it, keyed by the
 * subfolder's name, and the rest.
 */
function groupBySubfolder(folder: FolderListing): {
  ownPages: PlaintextPage[];
  pagesBySubfolder: Map<string, PlaintextPage[]>;
} {
  const folderPath = folderOf(folder.llmsTxtPath);
  const ownPages: PlaintextPage[] = [];
  const pagesBySubfolder = new Map<string, PlaintextPage[]>();

  for (const page of folder.pages) {
    const pageFolder = folderOf(page.urlPath.split("?")[0]);
    const subfolder = pageFolder.startsWith(folderPath)
      ? pageFolder.slice(folderPath.length).split("/")[0]
      : "";
    if (!subfolder) {
      ownPages.push(page);
      continue;
    }
    const subfolderPages = pagesBySubfolder.get(subfolder) ?? [];
    subfolderPages.push(page);
    pagesBySubfolder.set(subfolder, subfolderPages);
  }

  return { ownPages, pagesBySubfolder };
}

/** "/guides/setup/llms.txt" becomes "/guides/setup/". */
function folderOf(urlPath: string): string {
  return urlPath.slice(0, urlPath.lastIndexOf("/") + 1);
}

/**
 * Greedily packs pages into chunks whose rendered detail file fits within the
 * limit. A single page that alone exceeds the limit gets its own chunk, which
 * guarantees termination (a link line is small enough that this does not happen
 * in practice).
 */
function chunkPagesToFit(
  title: string,
  pages: PlaintextPage[],
  site: string | URL,
  limit: number,
): PlaintextPage[][] {
  const chunks: PlaintextPage[][] = [];
  let current: PlaintextPage[] = [];

  for (const page of pages) {
    const trial = [...current, page];
    if (
      current.length > 0 &&
      detailContents(title, trial, site).length > limit
    ) {
      chunks.push(current);
      current = [page];
    } else {
      current = trial;
    }
  }
  if (current.length > 0) chunks.push(current);

  return chunks;
}
