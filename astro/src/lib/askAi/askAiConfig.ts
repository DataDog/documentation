import type { AskAiConfig } from "@dd/ask-ai";
import { fetchDatadogUserStatus } from "@lib/telemetry/datadogUserStatus";

/**
 * The config every Ask AI mount site passes.
 *
 * `mountAskAi` is idempotent, and this site has two callers: the mount script
 * in `AskAi.astro` and the searchbar's Ask AI row, which cannot be handed the
 * script's handle because the two live in separate bundles. Whichever runs
 * first mounts the widget, and hydration order is not fixed — so both must pass
 * the same capabilities, or the loser's config is silently discarded.
 *
 * `isEnabled` is deliberately absent; see the TODO at the mount site.
 */
export function createAskAiConfig(): AskAiConfig {
  return { getIsDatadogUser: fetchDatadogUserStatus };
}
