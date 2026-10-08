// @vitest-environment happy-dom
import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import {
  SEARCH_QUERY_CHANGE_EVENT,
  EXTERNAL_ORIGIN_ID,
  publishSearchQuery,
  subscribeToSearchQuery,
  type SearchQueryChangeDetail,
} from "../searchQueryStore";

const DEBOUNCE_MS = 200;

let unsubscribes: Array<() => void> = [];

function collect() {
  const received: SearchQueryChangeDetail[] = [];
  unsubscribes.push(subscribeToSearchQuery((detail) => received.push(detail)));
  return received;
}

beforeEach(() => {
  vi.useFakeTimers();
  window.history.replaceState(null, "", "/api/");
});

afterEach(() => {
  for (const unsubscribe of unsubscribes) unsubscribe();
  unsubscribes = [];
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
  window.history.replaceState(null, "", "/");
});

describe("publishSearchQuery", () => {
  it("broadcasts synchronously, so a mirrored input never lags a keystroke", () => {
    const received = collect();
    publishSearchQuery("RUM", "island-a", DEBOUNCE_MS);
    expect(received).toEqual([{ query: "RUM", originId: "island-a" }]);
  });

  it("writes the param only after the debounce elapses", () => {
    publishSearchQuery("RUM", "island-a", DEBOUNCE_MS);
    expect(window.location.search).toBe("");
    vi.advanceTimersByTime(DEBOUNCE_MS);
    expect(window.location.search).toBe("?s=RUM");
  });

  it("collapses two publishes inside the window into one write of the later value", () => {
    const replaceState = vi.spyOn(window.history, "replaceState");
    publishSearchQuery("RU", "island-a", DEBOUNCE_MS);
    vi.advanceTimersByTime(DEBOUNCE_MS / 2);
    publishSearchQuery("RUM", "island-a", DEBOUNCE_MS);
    vi.advanceTimersByTime(DEBOUNCE_MS);

    expect(replaceState).toHaveBeenCalledTimes(1);
    expect(window.location.search).toBe("?s=RUM");
    replaceState.mockRestore();
  });

  it("shares the one timer across islands, so interleaved typing writes once", () => {
    const replaceState = vi.spyOn(window.history, "replaceState");
    publishSearchQuery("RU", "island-a", DEBOUNCE_MS);
    vi.advanceTimersByTime(DEBOUNCE_MS / 2);
    publishSearchQuery("RUM", "island-b", DEBOUNCE_MS);
    vi.advanceTimersByTime(DEBOUNCE_MS);

    expect(replaceState).toHaveBeenCalledTimes(1);
    expect(window.location.search).toBe("?s=RUM");
    replaceState.mockRestore();
  });

  it("drops the param when the query is cleared", () => {
    window.history.replaceState(null, "", "/api/?s=RUM");
    publishSearchQuery("", "island-a", DEBOUNCE_MS);
    vi.advanceTimersByTime(DEBOUNCE_MS);
    expect(window.location.search).toBe("");
  });

  it("preserves unrelated params", () => {
    window.history.replaceState(null, "", "/api/?site=eu");
    publishSearchQuery("RUM", "island-a", DEBOUNCE_MS);
    vi.advanceTimersByTime(DEBOUNCE_MS);
    expect(window.location.search).toContain("site=eu");
    expect(window.location.search).toContain("s=RUM");
  });

  it("cancels a pending write when the page is swapped, so `?s=` stays off the next page", () => {
    const replaceState = vi.spyOn(window.history, "replaceState");
    publishSearchQuery("RUM", "island-a", DEBOUNCE_MS);
    document.dispatchEvent(new Event("astro:before-swap"));
    vi.advanceTimersByTime(DEBOUNCE_MS);

    expect(replaceState).not.toHaveBeenCalled();
    expect(window.location.search).toBe("");
    replaceState.mockRestore();
  });

  it("tags the broadcast with the publisher's id, so it can ignore its own echo", () => {
    const received = collect();
    publishSearchQuery("RUM", "island-b", DEBOUNCE_MS);
    expect(received[0].originId).toBe("island-b");
  });
});

describe("subscribeToSearchQuery", () => {
  it("delivers to every subscriber", () => {
    const first = collect();
    const second = collect();
    publishSearchQuery("RUM", "island-a", DEBOUNCE_MS);
    expect(first).toHaveLength(1);
    expect(second).toHaveLength(1);
  });

  it("detaches on unsubscribe", () => {
    const received: SearchQueryChangeDetail[] = [];
    const unsubscribe = subscribeToSearchQuery((d) => received.push(d));
    unsubscribe();
    publishSearchQuery("RUM", "island-a", DEBOUNCE_MS);
    expect(received).toEqual([]);
  });

  it("broadcasts the param on popstate, under an id no island matches", () => {
    const received = collect();
    window.history.replaceState(null, "", "/api/?s=logs");
    window.dispatchEvent(new PopStateEvent("popstate"));

    expect(received).toEqual([{ query: "logs", originId: EXTERNAL_ORIGIN_ID }]);
  });

  it("broadcasts an empty query when Back lands on a URL without the param", () => {
    const received = collect();
    window.history.replaceState(null, "", "/api/");
    window.dispatchEvent(new PopStateEvent("popstate"));
    expect(received).toEqual([{ query: "", originId: EXTERNAL_ORIGIN_ID }]);
  });

  it("stops listening for popstate once the last subscriber leaves", () => {
    const received: SearchQueryChangeDetail[] = [];
    const unsubscribe = subscribeToSearchQuery((d) => received.push(d));
    unsubscribe();
    window.history.replaceState(null, "", "/api/?s=logs");
    window.dispatchEvent(new PopStateEvent("popstate"));
    expect(received).toEqual([]);
  });
});

describe("the broadcast channel", () => {
  it("dispatches each change on `document` under SEARCH_QUERY_CHANGE_EVENT", () => {
    const seen: string[] = [];
    const listener = (e: Event) =>
      seen.push((e as CustomEvent<SearchQueryChangeDetail>).detail.query);
    document.addEventListener(SEARCH_QUERY_CHANGE_EVENT, listener);
    publishSearchQuery("RUM", "island-a", DEBOUNCE_MS);
    document.removeEventListener(SEARCH_QUERY_CHANGE_EVENT, listener);
    expect(seen).toEqual(["RUM"]);
  });
});
