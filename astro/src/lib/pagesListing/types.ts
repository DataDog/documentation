import type { PageMetadata } from "./schema";

/**
 * One plaintext page. Both `pages.json` and `llms.txt` are built from these.
 */
export interface PlaintextPage {
  /** Path portion of the URL, ending in `.md`, e.g. "/api/latest/metrics/get-a-metric.md". */
  urlPath: string;
  metadata: PageMetadata;
  /**
   * Returns the exact plaintext served at `urlPath`. Used only for hashing, so
   * it must produce byte-identical output to the corresponding `.md` route.
   */
  buildBody: () => Promise<string>;
}

/**
 * A group of pages a source chooses as one unit for llms.txt: it becomes an
 * entry in the top-level index and gets its own detail `llms.txt` file (split
 * into numbered parts if it exceeds the hard character limit). The source
 * decides what a section is — the API source uses one section per category.
 * `pages.json` ignores sections and lists every page flat.
 */
export interface PlaintextSection {
  /** Display name, e.g. the category name. Used as the index link + detail `# heading`. */
  title: string;
  /** URL path of this section's detail file, ending in "/llms.txt", e.g. "/api/latest/metrics/llms.txt". */
  llmsTxtPath: string;
  /** Pages in this section. The first is treated as the section's overview (its description labels the index link). */
  pages: PlaintextPage[];
}

/**
 * A source of plaintext content. Provides pages that sit directly under the
 * source's heading in the index (`listRootPages` — e.g. the landing and static
 * pages) plus chunkable `listSections`. Cdocs and other content sources
 * implement the same interface and append to the `pageSources` registry.
 */
export interface PlaintextPageSource {
  /** Heading for this source's area in the top-level llms.txt index, e.g. "API Reference". */
  title: string;
  /** Pages listed directly under the source heading (no detail file of their own). */
  listRootPages: () => Promise<PlaintextPage[]>;
  /** Chunkable sections, each rendered to its own detail `llms.txt`. */
  listSections: () => Promise<PlaintextSection[]>;
}
