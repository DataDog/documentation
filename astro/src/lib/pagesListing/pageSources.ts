import type { PlaintextPageSource } from "./types";
import { apiPageSource } from "./apiPageSource";

/**
 * Ordered registry of plaintext page sources that both `pages.json` and
 * `llms.txt` are built from. Today it is just the API source; Cdocs and other
 * content sources append themselves here later without changing either route.
 */
export const pageSources: PlaintextPageSource[] = [apiPageSource];
