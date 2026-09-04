import { describe, expect, it } from "vitest";
import { i18n, useTranslations } from "./i18n";

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

describe("useTranslations", () => {
  it("binds the locale so callers don't repeat it per key", () => {
    const translate = useTranslations("ja");

    expect(translate("overview")).toBe("概要");
    expect(translate("code_example")).toBe("コード例");
  });

  // `Astro.currentLocale` is typed `string | undefined` and is undefined in
  // container tests, so the factory has to absorb both without throwing.
  it("falls back to English for an undefined locale", () => {
    expect(useTranslations(undefined)("overview")).toBe("Overview");
  });

  it("falls back to English for a string that isn't a built locale", () => {
    expect(useTranslations("zz")("overview")).toBe("Overview");
  });

  it("returns an empty string for an undefined key", () => {
    expect(useTranslations("ja")(undefined)).toBe("");
  });
});
