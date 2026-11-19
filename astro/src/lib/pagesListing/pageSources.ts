import type { PlaintextPageSource } from "./types";
import { apiPageSource } from "./apiPageSource";
import { isDocTypeSkipped } from "@lib/site/skippedDocTypes";

/**
 * Ordered registry of plaintext page sources that both `pages.json` and
 * `llms.txt` are built from. Today it is just the API source; Cdocs and other
 * content sources append themselves here later without changing either route.
 * A build that skips the API docs emits none of their `.md` pages, so it lists
 * none of them.
 */
export const pageSources: PlaintextPageSource[] = isDocTypeSkipped("api")
  ? []
  : [apiPageSource];
