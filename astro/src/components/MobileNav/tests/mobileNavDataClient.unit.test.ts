import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  loadMobileNavData,
  getLoadedMobileNavData,
  _resetMobileNavDataCache,
} from "../mobileNavDataClient";
import type { MobileNavData } from "@lib/api/mobileNavData";

const URL = "/api/mobile-nav.json";

const data: MobileNavData = {
  categories: [
    {
      slug: "dashboards",
      href: "/api/latest/dashboards/",
      operations: [{ slug: "get-a-dashboard", summary: "Get a dashboard" }],
    },
  ],
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status });
}

beforeEach(() => {
  _resetMobileNavDataCache();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("loadMobileNavData", () => {
  it("fetches the given URL at low priority", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(data));
    vi.stubGlobal("fetch", fetchMock);

    await expect(loadMobileNavData(URL)).resolves.toEqual(data);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      URL,
      expect.objectContaining({ priority: "low" }),
    );
  });

  it("shares one request between concurrent callers", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(data));
    vi.stubGlobal("fetch", fetchMock);

    const [first, second] = await Promise.all([
      loadMobileNavData(URL),
      loadMobileNavData(URL),
    ]);
    expect(first).toEqual(data);
    expect(second).toBe(first);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("does not refetch after a successful load", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(data));
    vi.stubGlobal("fetch", fetchMock);

    await loadMobileNavData(URL);
    await loadMobileNavData(URL);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("clears the cache after a network failure, so a later call retries", async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new TypeError("network down"))
      .mockResolvedValueOnce(jsonResponse(data));
    vi.stubGlobal("fetch", fetchMock);

    await expect(loadMobileNavData(URL)).rejects.toThrow();
    await expect(loadMobileNavData(URL)).resolves.toEqual(data);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("treats a non-OK response as a failure", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({}, 404))
      .mockResolvedValueOnce(jsonResponse(data));
    vi.stubGlobal("fetch", fetchMock);

    await expect(loadMobileNavData(URL)).rejects.toThrow();
    expect(getLoadedMobileNavData(URL)).toBeUndefined();
    await expect(loadMobileNavData(URL)).resolves.toEqual(data);
  });
});

describe("getLoadedMobileNavData", () => {
  it("returns nothing until the request resolves, then the data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(data)));

    expect(getLoadedMobileNavData(URL)).toBeUndefined();
    const pending = loadMobileNavData(URL);
    expect(getLoadedMobileNavData(URL)).toBeUndefined();
    await pending;
    expect(getLoadedMobileNavData(URL)).toEqual(data);
  });
});
