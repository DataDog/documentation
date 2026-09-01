import { describe, expect, it } from "vitest";
import { i18n } from "./i18n";

describe("i18n", () => {
  // Guards the shared/i18n glob: if the path breaks, the bundle silently
  // empties and this is the only thing that notices.
  it("resolves a key from the shared glossary", () => {
    expect(i18n("overview", "ja")).toBe("概要");
    expect(i18n("code_example", "ja")).toBe("コード例");
  });

  it("falls back to English for a locale that lacks the key", () => {
    expect(i18n("overview", "en")).toBe("Overview");
  });

  it("falls back to the key itself when it is unknown", () => {
    expect(i18n("not_a_real_key", "ja")).toBe("not_a_real_key");
  });

  it("returns an empty string for an undefined key", () => {
    expect(i18n(undefined, "ja")).toBe("");
  });
});
