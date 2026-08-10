import type {
  PlaintextPage,
  PlaintextPageSource,
  PlaintextSection,
} from "./types";

/**
 * Firm ceiling on any single generated llms.txt file's length, mirroring
 * Hugo's `html-to-mdoc` default. A section detail file that exceeds this is
 * split into numbered `part_N` files.
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
 * llms.txt honors privacy, shared with `pages.json` through the same sources.
 */
export async function buildLlmsTree(
  sources: PlaintextPageSource[],
  siteOrigin: string,
  hardCharLimit: number = DEFAULT_HARD_CHAR_LIMIT,
): Promise<LlmsTree> {
  if (!siteOrigin) {
    throw new Error(
      "buildLlmsTree: siteOrigin is required to emit canonical links.",
    );
  }

  const detailFiles = new Map<string, string>();
  const indexLines: string[] = [INTRO, ""];

  for (const source of sources) {
    const rootPages = (await source.listRootPages()).filter(isVisible);
    const sections = (await source.listSections())
      .map((section) => ({
        ...section,
        pages: section.pages.filter(isVisible),
      }))
      .filter((section) => section.pages.length > 0)
      .sort((a, b) => a.title.localeCompare(b.title));

    if (rootPages.length === 0 && sections.length === 0) continue;

    indexLines.push(`## ${source.title}`, "");
    for (const page of rootPages) {
      indexLines.push(pageLine(page, siteOrigin));
    }
    for (const section of sections) {
      indexLines.push(sectionLink(section, siteOrigin));
    }
    indexLines.push("");

    for (const section of sections) {
      addSectionDetailFiles(section, siteOrigin, hardCharLimit, detailFiles);
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

function pageLine(page: PlaintextPage, siteOrigin: string): string {
  return linkLine(
    page.metadata.title || "Untitled",
    `${siteOrigin}${page.urlPath}`,
    page.metadata.description || "",
  );
}

/** Index link for a section, labeled with its overview (first) page's description. */
function sectionLink(section: PlaintextSection, siteOrigin: string): string {
  return linkLine(
    section.title,
    `${siteOrigin}${section.llmsTxtPath}`,
    section.pages[0]?.metadata.description || "",
  );
}

function detailContents(
  title: string,
  pages: PlaintextPage[],
  siteOrigin: string,
): string {
  const lines = [`# ${title}`, ""];
  for (const page of pages) {
    lines.push(pageLine(page, siteOrigin));
  }
  return lines.join("\n") + "\n";
}

function partPath(llmsTxtPath: string, partNumber: number): string {
  return llmsTxtPath.replace(/\/llms\.txt$/, `/part_${partNumber}/llms.txt`);
}

function addSectionDetailFiles(
  section: PlaintextSection,
  siteOrigin: string,
  hardCharLimit: number,
  detailFiles: Map<string, string>,
): void {
  const full = detailContents(section.title, section.pages, siteOrigin);
  if (full.length <= hardCharLimit) {
    detailFiles.set(section.llmsTxtPath, full);
    return;
  }

  // Too long: split into numbered part files, and turn the section's own file
  // into an index of links to those parts.
  const chunks = chunkPagesToFit(
    section.title,
    section.pages,
    siteOrigin,
    hardCharLimit,
  );
  const indexLines = [`# ${section.title}`, ""];
  chunks.forEach((chunk, i) => {
    const partNumber = i + 1;
    const path = partPath(section.llmsTxtPath, partNumber);
    detailFiles.set(path, detailContents(section.title, chunk, siteOrigin));
    indexLines.push(`- [Part ${partNumber}](${siteOrigin}${path})`);
  });
  detailFiles.set(section.llmsTxtPath, indexLines.join("\n") + "\n");
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
  siteOrigin: string,
  limit: number,
): PlaintextPage[][] {
  const chunks: PlaintextPage[][] = [];
  let current: PlaintextPage[] = [];

  for (const page of pages) {
    const trial = [...current, page];
    if (
      current.length > 0 &&
      detailContents(title, trial, siteOrigin).length > limit
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
