import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  LOCALES,
  DEFAULT_LOCALE,
  isLocale,
  parseLangParam,
  localePrefix,
  localizedHref,
  stripLocalePrefix,
  isLocaleCode,
  resolveUnprefixedSlug,
} from "./locale";

const NON_DEFAULT = LOCALES.filter((l) => l !== DEFAULT_LOCALE);

const ORIGINAL_ENV = { ...process.env };

function resetEnv() {
  for (const key of Object.keys(process.env)) {
    delete process.env[key];
  }
  Object.assign(process.env, ORIGINAL_ENV);
}

describe("locale helpers", () => {
  describe("isLocale", () => {
    it("accepts known locales", () => {
      for (const lang of LOCALES) {
        expect(isLocale(lang)).toBe(true);
      }
    });

    it("rejects unknown values", () => {
      expect(isLocale("pt")).toBe(false);
      expect(isLocale("zh")).toBe(false);
      expect(isLocale("")).toBe(false);
      expect(isLocale(undefined)).toBe(false);
      expect(isLocale(42)).toBe(false);
    });
  });

  describe("parseLangParam", () => {
    it("returns the default locale for an empty/undefined param (English route at root)", () => {
      expect(parseLangParam(undefined)).toBe("en");
      expect(parseLangParam("")).toBe("en");
    });

    it.skipIf(NON_DEFAULT.length === 0)(
      "returns the locale for a valid non-default segment",
      () => {
        for (const lang of NON_DEFAULT) {
          expect(parseLangParam(lang)).toBe(lang);
        }
      },
    );

    it("returns undefined for invalid segments (caller will 404)", () => {
      expect(parseLangParam("zh")).toBeUndefined();
      expect(parseLangParam("xx")).toBeUndefined();
    });

    it("returns undefined for the default locale segment so /en/... is not served", () => {
      expect(parseLangParam("en")).toBeUndefined();
    });
  });

  describe("localePrefix", () => {
    beforeEach(resetEnv);
    afterEach(resetEnv);

    it("returns empty string for the default locale", () => {
      expect(localePrefix(DEFAULT_LOCALE)).toBe("");
    });

    it.skipIf(NON_DEFAULT.length === 0)(
      "returns /<lang> for non-default locales",
      () => {
        for (const lang of NON_DEFAULT) {
          expect(localePrefix(lang)).toBe(`/${lang}`);
        }
      },
    );

    it.skipIf(NON_DEFAULT.length === 0)(
      "is unaffected by the preview branch prefix",
      () => {
        process.env.CI_ENVIRONMENT_NAME = "preview";
        process.env.CI_COMMIT_REF_NAME = "devin.ford/my-cool-thing";
        const lang = NON_DEFAULT[0];
        // Callers that concatenate onto an origin already carrying the branch
        // prefix (e.g. HUGO_ORIGIN) rely on this staying prefix-free.
        expect(localePrefix(lang)).toBe(`/${lang}`);
        expect(localePrefix(DEFAULT_LOCALE)).toBe("");
      },
    );
  });

  describe("localizedHref", () => {
    beforeEach(resetEnv);
    afterEach(resetEnv);

    it("leaves English paths alone outside preview", () => {
      expect(localizedHref("en", "/api/latest/dashboards/")).toBe(
        "/api/latest/dashboards/",
      );
    });

    it.skipIf(NON_DEFAULT.length === 0)(
      "prefixes non-English paths with the locale",
      () => {
        const lang = NON_DEFAULT[0];
        expect(localizedHref(lang, "/api/latest/dashboards/")).toBe(
          `/${lang}/api/latest/dashboards/`,
        );
        expect(localizedHref(lang, "/")).toBe(`/${lang}/`);
      },
    );

    it("also applies the preview branch prefix", () => {
      process.env.CI_ENVIRONMENT_NAME = "preview";
      process.env.CI_COMMIT_REF_NAME = "devin.ford/my-cool-thing";
      expect(localizedHref("en", "/api/latest/dashboards/")).toBe(
        "/devin.ford/my-cool-thing/api/latest/dashboards/",
      );
    });

    it.skipIf(NON_DEFAULT.length === 0)(
      "combines the locale and the branch prefix exactly once, locale innermost",
      () => {
        process.env.CI_ENVIRONMENT_NAME = "preview";
        process.env.CI_COMMIT_REF_NAME = "devin.ford/my-cool-thing";
        const lang = NON_DEFAULT[0];
        expect(localizedHref(lang, "/api/latest/dashboards/")).toBe(
          `/devin.ford/my-cool-thing/${lang}/api/latest/dashboards/`,
        );
      },
    );
  });

  describe("stripLocalePrefix", () => {
    it("returns English + the original path for unprefixed paths", () => {
      expect(stripLocalePrefix("/api/latest/dashboards/")).toEqual({
        lang: "en",
        rest: "/api/latest/dashboards/",
      });
    });

    it.skipIf(NON_DEFAULT.length === 0)("strips a known locale prefix", () => {
      const lang = NON_DEFAULT[0];
      expect(stripLocalePrefix(`/${lang}/api/latest/dashboards/`)).toEqual({
        lang,
        rest: "/api/latest/dashboards/",
      });
    });

    it.skipIf(NON_DEFAULT.length === 0)(
      "returns / when only the locale prefix is present",
      () => {
        const lang = NON_DEFAULT[0];
        expect(stripLocalePrefix(`/${lang}`)).toEqual({ lang, rest: "/" });
        expect(stripLocalePrefix(`/${lang}/`)).toEqual({ lang, rest: "/" });
      },
    );

    it("does not strip prefixes that look like locales but are not registered", () => {
      expect(stripLocalePrefix("/pt/api/latest/")).toEqual({
        lang: "en",
        rest: "/pt/api/latest/",
      });
    });
  });

  describe("isLocaleCode", () => {
    it("accepts every locale the site can have", () => {
      for (const lang of ["en", "fr", "ja", "ko", "es"]) {
        expect(isLocaleCode(lang)).toBe(true);
      }
    });

    it("rejects anything that is not a locale", () => {
      expect(isLocaleCode("pt")).toBe(false);
      expect(isLocaleCode("dd_e2e")).toBe(false);
      expect(isLocaleCode("")).toBe(false);
      expect(isLocaleCode(undefined)).toBe(false);
      expect(isLocaleCode(42)).toBe(false);
    });
  });

  describe("resolveUnprefixedSlug", () => {
    beforeEach(resetEnv);
    afterEach(resetEnv);

    it("returns the slug untouched when no leading segment was captured", () => {
      expect(resolveUnprefixedSlug(undefined, "foo")).toBe("foo");
      expect(resolveUnprefixedSlug("", "foo")).toBe("foo");
      expect(resolveUnprefixedSlug("", "")).toBe("");
    });

    // The reason this helper exists: `[...lang]/[...slug]` is an ambiguous
    // pattern and the optional group is greedy, so the first path segment is
    // always captured as `lang` whenever two or more segments remain.
    it("reassembles a first segment that is not a locale", () => {
      expect(resolveUnprefixedSlug("dd_e2e", "components/tabs")).toBe(
        "dd_e2e/components/tabs",
      );
      expect(resolveUnprefixedSlug("pt", "foo")).toBe("pt/foo");
    });

    it("coerces a non-string capture rather than dropping it", () => {
      expect(resolveUnprefixedSlug(2024, "foo")).toBe("2024/foo");
    });

    it("returns undefined for a real locale prefix", () => {
      expect(resolveUnprefixedSlug("fr", "dd_e2e/components/tabs")).toBe(
        undefined,
      );
      expect(resolveUnprefixedSlug("ja", "foo")).toBe(undefined);
      expect(resolveUnprefixedSlug("ko", "foo")).toBe(undefined);
      expect(resolveUnprefixedSlug("es", "foo")).toBe(undefined);
    });

    // English lives at the root, so `/en/...` is not a second address for it.
    it("returns undefined for an explicit `en` prefix", () => {
      expect(resolveUnprefixedSlug("en", "foo")).toBe(undefined);
    });

    // `LOCALES` shrinks to English in a translations-skipped build, so a
    // check built on `isLocale` would reassemble `/fr/...` into the slug
    // `fr/...` and give dev a different URL space than a full build. Locale
    // detection here has to be build-independent, which is why `isLocaleCode`
    // exists alongside `isLocale`.
    it("rejects a locale prefix in a translations-skipped build too", async () => {
      process.env.SKIP_TRANSLATIONS = "true";
      vi.resetModules();
      const reloaded = await import("./locale");
      try {
        expect(reloaded.LOCALES).toEqual(["en"]);
        expect(reloaded.isLocale("fr")).toBe(false);
        expect(reloaded.isLocaleCode("fr")).toBe(true);
        expect(reloaded.resolveUnprefixedSlug("fr", "foo")).toBe(undefined);
      } finally {
        vi.resetModules();
      }
    });
  });
});
