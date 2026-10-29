// @vitest-environment happy-dom
import { describe, it, expect, afterEach, vi } from "vitest";
import { logAskAiSearchSuggestionClick } from "./searchSuggestionLog";

afterEach(() => {
  vi.unstubAllGlobals();
});

function stubTelemetry() {
  const addAction = vi.fn();
  const info = vi.fn();
  vi.stubGlobal("DD_RUM", { addAction });
  vi.stubGlobal("DD_LOGS", { logger: { info } });
  return { addAction, info };
}

describe("logAskAiSearchSuggestionClick", () => {
  it("sends the RUM action Hugo's searchbar sends", () => {
    const { addAction } = stubTelemetry();

    logAskAiSearchSuggestionClick("how do I install the agent");

    expect(addAction).toHaveBeenCalledWith("docs_ai_search_action", {
      docs_ai: true,
      action: "search_suggestion_clicked",
      source: "searchbar_dropdown",
      query: "how do I install the agent",
      query_length: 26,
    });
  });

  it("sends the log under the same key, so both hosts' events group together", () => {
    const { info } = stubTelemetry();

    logAskAiSearchSuggestionClick("dashboards");

    expect(info).toHaveBeenCalledWith(
      "Docs AI Search Suggestion Click",
      expect.objectContaining({
        docs_ai_event: expect.objectContaining({
          docs_ai: true,
          action: "search_suggestion_clicked",
          query: "dashboards",
          query_length: 10,
        }),
      }),
    );
  });

  it("does nothing when neither SDK global exists", () => {
    // The mount script is deferred, so a fast click can land before it runs.
    expect(() => logAskAiSearchSuggestionClick("dashboards")).not.toThrow();
  });
});
