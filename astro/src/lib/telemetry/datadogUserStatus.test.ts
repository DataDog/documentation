import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  fetchDatadogUserStatus,
  resetDatadogUserStatusCache,
  DATADOG_LOCATE_URL,
} from "./datadogUserStatus";

describe("fetchDatadogUserStatus", () => {
  beforeEach(() => {
    resetDatadogUserStatusCache();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function stubFetch(implementation: () => Promise<unknown>) {
    const fetchSpy = vi.fn(implementation);
    vi.stubGlobal("fetch", fetchSpy);
    return fetchSpy;
  }

  it("requests the locate endpoint with credentials, so the app session cookie is sent", () => {
    const fetchSpy = stubFetch(async () => ({
      json: async () => ({ user_status: "active" }),
    }));

    fetchDatadogUserStatus();

    expect(fetchSpy).toHaveBeenCalledWith(DATADOG_LOCATE_URL, {
      credentials: "include",
    });
    expect(DATADOG_LOCATE_URL).toBe("https://www.datadoghq.com/locate");
  });

  it("returns true for a truthy user_status", async () => {
    stubFetch(async () => ({ json: async () => ({ user_status: "active" }) }));
    await expect(fetchDatadogUserStatus()).resolves.toBe(true);
  });

  it("returns false for a falsy or absent user_status", async () => {
    stubFetch(async () => ({ json: async () => ({ user_status: null }) }));
    await expect(fetchDatadogUserStatus()).resolves.toBe(false);

    resetDatadogUserStatusCache();
    stubFetch(async () => ({ json: async () => ({}) }));
    await expect(fetchDatadogUserStatus()).resolves.toBe(false);
  });

  it("resolves false on network failure rather than rejecting", async () => {
    stubFetch(async () => {
      throw new Error("offline");
    });
    await expect(fetchDatadogUserStatus()).resolves.toBe(false);
  });

  it("memoizes, so repeated callers share one request", async () => {
    const fetchSpy = stubFetch(async () => ({
      json: async () => ({ user_status: "active" }),
    }));

    const results = await Promise.all([
      fetchDatadogUserStatus(),
      fetchDatadogUserStatus(),
      fetchDatadogUserStatus(),
    ]);

    expect(results).toEqual([true, true, true]);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("memoizes failures too, rather than retrying on every call", async () => {
    const fetchSpy = stubFetch(async () => {
      throw new Error("offline");
    });

    await fetchDatadogUserStatus();
    await fetchDatadogUserStatus();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
