import { describe, it, expect, afterEach, vi } from "vitest";
import basicFixture from "../../components/SearchBar/__fixtures__/typesense_basic.json";
import { createMultiSearch } from "./typesense";

const env = {
  host: "cluster",
  publicKey: "key",
  docsIndex: "docs_alias",
  partnersIndex: "docs_partners_alias",
};

const PRIMARY = "cluster.a1.typesense.net";
const FALLBACK_1 = "cluster-1.a1.typesense.net";
const FALLBACK_2 = "cluster-2.a1.typesense.net";
const FALLBACK_3 = "cluster-3.a1.typesense.net";

type NodeBehavior = "ok" | "network-error" | "hang" | number;

/**
 * Stub `fetch` so each Typesense node behaves as listed: "ok" serves the
 * fixture, a number is an HTTP error status, "network-error" rejects, and
 * "hang" never settles until the request's signal aborts. Unlisted nodes
 * serve the fixture.
 */
function stubNodes(behaviorsByHost: Record<string, NodeBehavior>) {
  const fetchMock = vi.fn((url: string, init: RequestInit) => {
    const behavior = behaviorsByHost[new URL(url).host] ?? "ok";
    if (behavior === "ok") {
      return Promise.resolve(
        new Response(JSON.stringify(basicFixture), { status: 200 }),
      );
    }
    if (behavior === "network-error") {
      return Promise.reject(new TypeError("Failed to fetch"));
    }
    if (behavior === "hang") {
      return new Promise<Response>((_, reject) => {
        init.signal?.addEventListener("abort", () =>
          reject(new DOMException("Aborted", "AbortError")),
        );
      });
    }
    return Promise.resolve(new Response("", { status: behavior }));
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function requestedHosts(fetchMock: ReturnType<typeof stubNodes>) {
  return fetchMock.mock.calls.map(([url]) => new URL(url).host);
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("multiSearch", () => {
  it("queries the primary node and returns its results", async () => {
    const fetchMock = stubNodes({});
    const result = await createMultiSearch()("logs", env);

    expect(requestedHosts(fetchMock)).toEqual([PRIMARY]);
    expect(fetchMock.mock.calls[0][0]).toBe(
      `https://${PRIMARY}/multi_search?x-typesense-api-key=key`,
    );
    expect(result.docs.hits.length).toBeGreaterThan(0);
  });

  it("fails over to the next node on a network error", async () => {
    const fetchMock = stubNodes({ [PRIMARY]: "network-error" });
    const result = await createMultiSearch()("logs", env);

    expect(requestedHosts(fetchMock)).toEqual([PRIMARY, FALLBACK_1]);
    expect(result.docs.hits.length).toBeGreaterThan(0);
  });

  it("fails over to the next node on a server error", async () => {
    const fetchMock = stubNodes({ [PRIMARY]: 503, [FALLBACK_1]: 500 });
    await createMultiSearch()("logs", env);

    expect(requestedHosts(fetchMock)).toEqual([
      PRIMARY,
      FALLBACK_1,
      FALLBACK_2,
    ]);
  });

  it("fails over when a node does not respond in time", async () => {
    vi.useFakeTimers();
    const fetchMock = stubNodes({ [PRIMARY]: "hang" });
    const pending = createMultiSearch()("logs", env);
    await vi.advanceTimersByTimeAsync(5000);
    await pending;

    expect(requestedHosts(fetchMock)).toEqual([PRIMARY, FALLBACK_1]);
  });

  it("does not fail over on a client error, which every node would repeat", async () => {
    const fetchMock = stubNodes({ [PRIMARY]: 401 });

    await expect(createMultiSearch()("logs", env)).rejects.toThrow("401");
    expect(requestedHosts(fetchMock)).toEqual([PRIMARY]);
  });

  it("throws after every node fails", async () => {
    const fetchMock = stubNodes({
      [PRIMARY]: 503,
      [FALLBACK_1]: "network-error",
      [FALLBACK_2]: 502,
      [FALLBACK_3]: 503,
    });

    await expect(createMultiSearch()("logs", env)).rejects.toThrow();
    expect(requestedHosts(fetchMock)).toEqual([
      PRIMARY,
      FALLBACK_1,
      FALLBACK_2,
      FALLBACK_3,
    ]);
  });

  it("stops without failing over when the caller aborts", async () => {
    const fetchMock = stubNodes({ [PRIMARY]: "hang" });
    const controller = new AbortController();
    const pending = createMultiSearch()("logs", env, controller.signal);
    controller.abort();

    await expect(pending).rejects.toMatchObject({ name: "AbortError" });
    expect(requestedHosts(fetchMock)).toEqual([PRIMARY]);
  });

  it("skips a recently failed node on later searches, then retries it after a minute", async () => {
    vi.useFakeTimers();
    const fetchMock = stubNodes({ [PRIMARY]: 503 });
    const multiSearch = createMultiSearch();

    await multiSearch("first", env);
    await multiSearch("second", env);
    expect(requestedHosts(fetchMock)).toEqual([
      PRIMARY,
      FALLBACK_1,
      FALLBACK_1,
    ]);

    fetchMock.mockClear();
    vi.advanceTimersByTime(60_000);
    await multiSearch("third", env);
    expect(requestedHosts(fetchMock)).toEqual([PRIMARY, FALLBACK_1]);
  });

  it("tries every node when all of them failed recently", async () => {
    const fetchMock = stubNodes({
      [PRIMARY]: 503,
      [FALLBACK_1]: 503,
      [FALLBACK_2]: 503,
      [FALLBACK_3]: 503,
    });
    const multiSearch = createMultiSearch();
    await expect(multiSearch("first", env)).rejects.toThrow();

    fetchMock.mockClear();
    await expect(multiSearch("second", env)).rejects.toThrow();
    expect(requestedHosts(fetchMock)).toEqual([
      PRIMARY,
      FALLBACK_1,
      FALLBACK_2,
      FALLBACK_3,
    ]);
  });
});
