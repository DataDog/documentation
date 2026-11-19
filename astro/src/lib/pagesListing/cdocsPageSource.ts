/**
 * The Cdocs plaintext page source.
 *
 * Each combination of filter values on a Cdocs page has its own content, so
 * every variant is its own page, listed by its canonical URL as a `.md` URL:
 * the bare URL for the default variant, and the URL with every value as a
 * param for any other. The variants come from the shared Cdocs page lists,
 * which the sitemap reads too, so the listings agree.
 *
 * Each variant's description ends with its filter values, such as "Language:
 * Python", to tell the variants apart.
 *
 * Cdocs plaintext renders on the server, so there's no `.md` file to hash.
 * Every variant of a page carries a hash of the page's sources instead (see
 * `hashCdocsSource`).
 *
 * Every variant is a root page. A section would get its own `llms.txt` file
 * next to the page, outside `api/`, where the build doesn't emit files yet.
 */

import type { PlaintextPage, PlaintextPageSource } from "./types";
import { getCdocsEntries, getCdocsPages } from "@lib/cdocs/pageLists";
import type { CdocsPage } from "@lib/cdocs/pageLists";
import { buildPageFiltersManifest } from "@lib/cdocs/pageFiltersManifest";
import { makeBundledPartialResolver } from "@lib/cdocs/plaintext/loadPartial";
import { hashCdocsSource } from "@lib/cdocs/sourceHash";

const DOCS_CRUMBS = ["Docs"];

const resolvePartial = makeBundledPartialResolver();

async function listRootPages(): Promise<PlaintextPage[]> {
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
  return page.variants.map((variant) => ({
    urlPath: plaintextUrlPath(variant.canonicalUrl),
    metadata: {
      title: page.title,
      description: variant.description,
      breadcrumbs: [...DOCS_CRUMBS],
      isPrivate,
    },
    mdocHash,
  }));
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
  listSections: async () => [],
};
