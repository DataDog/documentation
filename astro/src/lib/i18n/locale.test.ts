import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  LOCALES,
  DEFAULT_LOCALE,
  isLocale,
  parseLangParam,
  localePrefix,
  localizedHref,
  stripLocalePrefix,
} from './locale';

const NON_DEFAULT = LOCALES.filter((l) => l !== DEFAULT_LOCALE);

const ORIGINAL_ENV = { ...process.env };

function resetEnv() {
  for (const key of Object.keys(process.env)) {
    delete process.env[key];
  }
  Object.assign(process.env, ORIGINAL_ENV);
}

describe('locale helpers', () => {
  describe('isLocale', () => {
    it('accepts known locales', () => {
      for (const lang of LOCALES) {
        expect(isLocale(lang)).toBe(true);
      }
    });

    it('rejects unknown values', () => {
      expect(isLocale('pt')).toBe(false);
      expect(isLocale('zh')).toBe(false);
      expect(isLocale('')).toBe(false);
      expect(isLocale(undefined)).toBe(false);
      expect(isLocale(42)).toBe(false);
    });
  });

  describe('parseLangParam', () => {
    it('returns the default locale for an empty/undefined param (English route at root)', () => {
      expect(parseLangParam(undefined)).toBe('en');
      expect(parseLangParam('')).toBe('en');
    });

    it.skipIf(NON_DEFAULT.length === 0)('returns the locale for a valid non-default segment', () => {
      for (const lang of NON_DEFAULT) {
        expect(parseLangParam(lang)).toBe(lang);
      }
    });

    it('returns undefined for invalid segments (caller will 404)', () => {
      expect(parseLangParam('zh')).toBeUndefined();
      expect(parseLangParam('xx')).toBeUndefined();
    });

    it('returns undefined for the default locale segment so /en/... is not served', () => {
      expect(parseLangParam('en')).toBeUndefined();
    });
  });

  describe('localePrefix', () => {
    beforeEach(resetEnv);
    afterEach(resetEnv);

    it('returns empty string for the default locale', () => {
      expect(localePrefix(DEFAULT_LOCALE)).toBe('');
    });

    it.skipIf(NON_DEFAULT.length === 0)('returns /<lang> for non-default locales', () => {
      for (const lang of NON_DEFAULT) {
        expect(localePrefix(lang)).toBe(`/${lang}`);
      }
    });

    it.skipIf(NON_DEFAULT.length === 0)('is unaffected by the preview branch prefix', () => {
      process.env.CI_ENVIRONMENT_NAME = 'preview';
      process.env.CI_COMMIT_REF_NAME = 'devin.ford/my-cool-thing';
      const lang = NON_DEFAULT[0];
      // Callers that concatenate onto an origin already carrying the branch
      // prefix (e.g. HUGO_ORIGIN) rely on this staying prefix-free.
      expect(localePrefix(lang)).toBe(`/${lang}`);
      expect(localePrefix(DEFAULT_LOCALE)).toBe('');
    });
  });

  describe('localizedHref', () => {
    beforeEach(resetEnv);
    afterEach(resetEnv);

    it('leaves English paths alone outside preview', () => {
      expect(localizedHref('en', '/api/latest/dashboards/')).toBe('/api/latest/dashboards/');
    });

    it.skipIf(NON_DEFAULT.length === 0)('prefixes non-English paths with the locale', () => {
      const lang = NON_DEFAULT[0];
      expect(localizedHref(lang, '/api/latest/dashboards/')).toBe(`/${lang}/api/latest/dashboards/`);
      expect(localizedHref(lang, '/')).toBe(`/${lang}/`);
    });

    it('also applies the preview branch prefix', () => {
      process.env.CI_ENVIRONMENT_NAME = 'preview';
      process.env.CI_COMMIT_REF_NAME = 'devin.ford/my-cool-thing';
      expect(localizedHref('en', '/api/latest/dashboards/')).toBe(
        '/devin.ford/my-cool-thing/api/latest/dashboards/',
      );
    });

    it.skipIf(NON_DEFAULT.length === 0)(
      'combines the locale and the branch prefix exactly once, locale innermost',
      () => {
        process.env.CI_ENVIRONMENT_NAME = 'preview';
        process.env.CI_COMMIT_REF_NAME = 'devin.ford/my-cool-thing';
        const lang = NON_DEFAULT[0];
        expect(localizedHref(lang, '/api/latest/dashboards/')).toBe(
          `/devin.ford/my-cool-thing/${lang}/api/latest/dashboards/`,
        );
      },
    );
  });

  describe('stripLocalePrefix', () => {
    it('returns English + the original path for unprefixed paths', () => {
      expect(stripLocalePrefix('/api/latest/dashboards/')).toEqual({
        lang: 'en',
        rest: '/api/latest/dashboards/',
      });
    });

    it.skipIf(NON_DEFAULT.length === 0)('strips a known locale prefix', () => {
      const lang = NON_DEFAULT[0];
      expect(stripLocalePrefix(`/${lang}/api/latest/dashboards/`)).toEqual({
        lang,
        rest: '/api/latest/dashboards/',
      });
    });

    it.skipIf(NON_DEFAULT.length === 0)('returns / when only the locale prefix is present', () => {
      const lang = NON_DEFAULT[0];
      expect(stripLocalePrefix(`/${lang}`)).toEqual({ lang, rest: '/' });
      expect(stripLocalePrefix(`/${lang}/`)).toEqual({ lang, rest: '/' });
    });

    it('does not strip prefixes that look like locales but are not registered', () => {
      expect(stripLocalePrefix('/pt/api/latest/')).toEqual({
        lang: 'en',
        rest: '/pt/api/latest/',
      });
    });
  });
});
