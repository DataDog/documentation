import type { PageMetadata } from "./schema";

/**
 * One plaintext page that `pages.json` should index. A page source enumerates
 * these; the assembler turns each into a listing entry.
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
 * A source of plaintext pages. Today only the API source exists; Cdocs and
 * other content sources implement the same interface and append themselves to
 * the `pageSources` registry — `pages.json.ts` needs no change to pick them up.
 */
export interface PlaintextPageSource {
  listPages: () => Promise<PlaintextPage[]>;
}
