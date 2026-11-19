/**
 * The Cdocs plaintext page source.
 *
 * Each combination of filter values on a Cdocs page has its own content, so
 * every variant is its own page, listed by its canonical URL as a `.md` URL:
 * the bare URL for the default variant, and the URL with every value as a
 * param for any other. The variants come from the shared Cdocs page lists,
 * which the sitemap reads too, so the listings agree.
 *
 * Each variant's title ends with its filter values, such as "(Language:
 * Python)", to tell the variants apart, and its description says it's a
 * version of the page for those values.
 *
 * Cdocs plaintext renders on the server, so there's no `.md` file to hash.
 * Every variant of a page carries a hash of the page's sources instead (see
 * `hashCdocsSource`).
 *
 * Each top folder in the content collection, such as `tracing/`, is a
 * section, with its own `llms.txt` file in that folder. A page with no folder
 * is a root page.
 */

import type {
  PlaintextPage,
  PlaintextPageSource,
  PlaintextSection,
} from "./types";
import { getCdocsEntries, getCdocsPages } from "@lib/cdocs/pageLists";
import type { CdocsPage } from "@lib/cdocs/pageLists";
import { buildPageFiltersManifest } from "@lib/cdocs/pageFiltersManifest";
import { makeBundledPartialResolver } from "@lib/cdocs/plaintext/loadPartial";
import { hashCdocsSource } from "@lib/cdocs/sourceHash";

const DOCS_CRUMBS = ["Docs"];

const resolvePartial = makeBundledPartialResolver();

async function listRootPages(): Promise<PlaintextPage[]> {
  const pagesByTopFolder = await listPagesByTopFolder();
  return pagesByTopFolder.get("") ?? [];
}

async function listSections(): Promise<PlaintextSection[]> {
  const pagesByTopFolder = await listPagesByTopFolder();
  return [...pagesByTopFolder.keys()]
    .filter(Boolean)
    .sort()
    .map((topFolder) => ({
      // TODO: use the folder's title from the nav YAML once it exists. Until
      // then, a section is titled with its folder name, such as "dd_e2e".
      title: topFolder,
      llmsTxtPath: `/${topFolder}/llms.txt`,
      pages: pagesByTopFolder.get(topFolder)!,
    }));
}

/** Every variant's page, keyed by its page's top folder, or "" for none. */
async function listPagesByTopFolder(): Promise<Map<string, PlaintextPage[]>> {
  const pagesByTopFolder = new Map<string, PlaintextPage[]>();
  for (const page of await listVariantPages()) {
    const pathSegments = page.urlPath.split("?")[0].split("/").slice(1);
    const topFolder = pathSegments.length > 1 ? pathSegments[0] : "";
    const topFolderPages = pagesByTopFolder.get(topFolder) ?? [];
    topFolderPages.push(page);
    pagesByTopFolder.set(topFolder, topFolderPages);
  }
  return pagesByTopFolder;
}

async function listVariantPages(): Promise<PlaintextPage[]> {
  const entries = await getCdocsEntries();
  const entriesById = new Map(entries.map((entry) => [entry.id, entry]));

  return (await getCdocsPages()).flatMap((page) => {
    const entry = entriesById.get(page.id)!;
    const mdocHash = hashCdocsSource({
      frontmatter: entry.data,
      body: entry.body ?? "",
      filtersManifest: buildPageFiltersManifest(entry.data.content_filters!),
      resolvePartial,
    });
    return variantPages(page, mdocHash, entry.data.private ?? false);
  });
}

function variantPages(
  page: CdocsPage,
  mdocHash: string,
  isPrivate: boolean,
): PlaintextPage[] {
  const breadcrumbs = folderBreadcrumbs(page.id);
  return page.variants.map((variant) => ({
    urlPath: plaintextUrlPath(variant.canonicalUrl),
    metadata: {
      title: variant.title,
      description: variant.description,
      breadcrumbs: [...breadcrumbs],
      isPrivate,
    },
    mdocHash,
  }));
}

/**
 * "Docs", then each folder the page is in: "tracing/setup/java" becomes
 * ["Docs", "tracing", "setup"]. `html-to-mdoc` groups pages by their second
 * breadcrumb, so every page in a folder has one.
 *
 * TODO: use each folder's title from the nav YAML once it exists. Until then,
 * each breadcrumb is a folder name.
 */
function folderBreadcrumbs(pageId: string): string[] {
  return [...DOCS_CRUMBS, ...pageId.split("/").slice(0, -1)];
}

/** "/guides/setup/?os=linux" becomes "/guides/setup.md?os=linux". */
function plaintextUrlPath(htmlUrl: string): string {
  const [path, query] = htmlUrl.split("?");
  const mdPath = `${path.replace(/\/$/, "")}.md`;
  return query ? `${mdPath}?${query}` : mdPath;
}

export const cdocsPageSource: PlaintextPageSource = {
  title: "Docs",
  listRootPages,
  listSections,
};
