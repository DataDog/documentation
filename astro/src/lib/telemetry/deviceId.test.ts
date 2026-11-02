import { describe, it, expect, beforeEach } from "vitest";
import {
  generateRumDeviceId,
  readRumDeviceId,
  cookieDomain,
  buildDeviceIdCookie,
  ensureRumDeviceId,
} from "./deviceId";

describe("generateRumDeviceId", () => {
  it("produces a base-36 string", () => {
    // Readers match the cookie with /_dd_device_id=(\w+)/, so anything outside
    // [A-Za-z0-9_] would be truncated on read.
    for (let attempt = 0; attempt < 50; attempt++) {
      expect(generateRumDeviceId()).toMatch(/^[0-9a-z]+$/);
    }
  });

  it("does not repeat across calls", () => {
    const ids = new Set(
      Array.from({ length: 20 }, () => generateRumDeviceId()),
    );
    expect(ids.size).toBeGreaterThan(1);
  });
});

describe("readRumDeviceId", () => {
  it("returns null when no cookie is present", () => {
    expect(readRumDeviceId("")).toBeNull();
    expect(readRumDeviceId("site=us; other=1")).toBeNull();
  });

  it("returns the existing value when one is present", () => {
    expect(readRumDeviceId("_dd_device_id=abc123")).toBe("abc123");
    expect(readRumDeviceId("site=us; _dd_device_id=abc123; other=1")).toBe(
      "abc123",
    );
  });
});

describe("cookieDomain", () => {
  it("keeps the last two hostname labels", () => {
    expect(cookieDomain("docs.datadoghq.com")).toBe("datadoghq.com");
    expect(cookieDomain("docs-staging.datadoghq.com")).toBe("datadoghq.com");
    expect(cookieDomain("datadoghq.com")).toBe("datadoghq.com");
    expect(cookieDomain("localhost")).toBe("localhost");
  });
});

describe("buildDeviceIdCookie", () => {
  it("writes the full attribute set", () => {
    const cookie = buildDeviceIdCookie("abc123", "docs.datadoghq.com");
    expect(cookie).toBe(
      "_dd_device_id=abc123; Domain=.datadoghq.com; Max-Age=31536000; Path=/; SameSite=None; Secure; Partitioned",
    );
  });

  it("uses a one-year Max-Age", () => {
    expect(buildDeviceIdCookie("abc123", "docs.datadoghq.com")).toContain(
      `Max-Age=${60 * 60 * 24 * 365}`,
    );
  });
});

describe("ensureRumDeviceId", () => {
  let cookieJar: string;
  const documentStub = {
    get cookie() {
      return cookieJar;
    },
    set cookie(value: string) {
      cookieJar = value;
    },
  };

  beforeEach(() => {
    cookieJar = "";
  });

  it("generates and writes an ID when no cookie exists", () => {
    const id = ensureRumDeviceId(documentStub, "docs.datadoghq.com");
    expect(id).toMatch(/^[0-9a-z]+$/);
    expect(cookieJar).toContain(`_dd_device_id=${id}`);
  });

  it("reuses the existing ID, so it is idempotent across the domain", () => {
    // The cookie is shared with every other site on datadoghq.com. Overwriting
    // an ID one of them set would make a user crossing between them look like
    // two devices.
    cookieJar = "_dd_device_id=existing1";
    const id = ensureRumDeviceId(documentStub, "docs.datadoghq.com");
    expect(id).toBe("existing1");
  });

  it("refreshes the cookie's expiry even when reusing an ID", () => {
    cookieJar = "_dd_device_id=existing1";
    ensureRumDeviceId(documentStub, "docs.datadoghq.com");
    expect(cookieJar).toContain("Max-Age=31536000");
  });
});
