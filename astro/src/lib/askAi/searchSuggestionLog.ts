/**
 * Telemetry for the searchbar's Ask AI row.
 *
 * Host-side rather than in the package: the row is host-owned UI, and the event
 * belongs to the searchbar's funnel — it fires whether or not the widget then
 * mounts. Hugo emits the identical payload from
 * `hugo/assets/scripts/components/instantsearch/searchbarHits.js`, under the
 * same RUM action name and log key, so both sites' rows aggregate as one.
 */

const RUM_ACTION_NAME = "docs_ai_search_action";
const LOG_MESSAGE = "Docs AI Search Suggestion Click";

/** `query` is the trimmed query the row was labeled with. */
export function logAskAiSearchSuggestionClick(query: string): void {
  const event = {
    docs_ai: true,
    action: "search_suggestion_clicked",
    source: "searchbar_dropdown",
    query,
    query_length: query.length,
  };

  // Optional because the telemetry script is deferred: a click landing before
  // it runs goes unreported rather than throwing.
  window.DD_LOGS?.logger.info(LOG_MESSAGE, { docs_ai_event: event });
  window.DD_RUM?.addAction(RUM_ACTION_NAME, event);
}
