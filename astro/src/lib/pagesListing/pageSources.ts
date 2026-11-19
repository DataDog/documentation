import type { PlaintextPageSource } from "./types";
import { apiPageSource } from "./apiPageSource";
import { cdocsPageSource } from "./cdocsPageSource";
import { isDocTypeSkipped } from "@lib/site/skippedDocTypes";

/**
 * Ordered registry of plaintext page sources that both `pages.json` and
 * `llms.txt` are built from: the API docs, then the Cdocs variants. Other
 * content sources append themselves here later without changing either route.
 * A build that skips the API docs emits none of their `.md` pages, so it lists
 * none of them.
 */
export const pageSources: PlaintextPageSource[] = [
  ...(isDocTypeSkipped("api") ? [] : [apiPageSource]),
  cdocsPageSource,
];
