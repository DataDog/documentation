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
 *
 * The Datadog-user lookup is supplied on Datadog's own domain only. It is a
 * credentialed cross-origin request that CORS blocks from anywhere else —
 * `yarn dev` and `yarn preview` included — so off-domain it is a console error
 * and a failed request on every page load, and nothing more. Omitting it makes
 * the package leave the `is_datadog_user` tag off rather than report `false`.
 */
export function createAskAiConfig(
  hostname: string = window.location.hostname,
): AskAiConfig {
  return isDatadogHostname(hostname)
    ? { getIsDatadogUser: fetchDatadogUserStatus }
    : {};
}

function isDatadogHostname(hostname: string): boolean {
  return hostname === "datadoghq.com" || hostname.endsWith(".datadoghq.com");
}
