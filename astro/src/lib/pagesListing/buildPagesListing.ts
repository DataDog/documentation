import { createHash } from "node:crypto";
import { PagesListingSchema, type PagesListing } from "./schema";
import type { PlaintextPageSource } from "./types";

function md5Hex(input: string): string {
  return createHash("md5").update(input, "utf8").digest("hex");
}

/**
 * Assembles the `pages.json` listing from a set of page sources.
 *
 * For every page every source lists, computes `key = siteOrigin + urlPath` and
 * `mdocHash = md5(buildBody())`, then emits `{ metadata, mdocHash, source }`.
 * Private pages are included with their `isPrivate` flag preserved (Hugo
 * parity — only llms.txt drops them). Keys are sorted for stable, diff-friendly
 * output. Throws on duplicate keys (two sources claiming one URL) and on an
 * empty `siteOrigin`, so bugs fail the build rather than shipping.
 */
export async function buildPagesListing(
  sources: PlaintextPageSource[],
  siteOrigin: string,
): Promise<PagesListing> {
  if (!siteOrigin) {
    throw new Error(
      "buildPagesListing: siteOrigin is required to emit canonical page keys.",
    );
  }

  const entries: PagesListing = {};
  for (const source of sources) {
    for (const page of await source.listPages()) {
      const key = `${siteOrigin}${page.urlPath}`;
      if (key in entries) {
        throw new Error(`buildPagesListing: duplicate page URL "${key}".`);
      }
      entries[key] = {
        metadata: page.metadata,
        mdocHash: md5Hex(await page.buildBody()),
        source: "astro",
      };
    }
  }

  const sorted: PagesListing = {};
  for (const key of Object.keys(entries).sort()) {
    sorted[key] = entries[key];
  }

  return PagesListingSchema.parse(sorted);
}
