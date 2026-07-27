import { describe, it, expect } from 'vitest';
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
    it('returns empty string for the default locale', () => {
      expect(localePrefix(DEFAULT_LOCALE)).toBe('');
    });

    it.skipIf(NON_DEFAULT.length === 0)('returns /<lang> for non-default locales', () => {
      for (const lang of NON_DEFAULT) {
        expect(localePrefix(lang)).toBe(`/${lang}`);
      }
    });
  });

  describe('localizedHref', () => {
    it('leaves English paths alone', () => {
      expect(localizedHref('en', '/api/latest/dashboards/')).toBe('/api/latest/dashboards/');
    });

    it.skipIf(NON_DEFAULT.length === 0)('prefixes non-English paths with the locale', () => {
      const lang = NON_DEFAULT[0];
      expect(localizedHref(lang, '/api/latest/dashboards/')).toBe(`/${lang}/api/latest/dashboards/`);
      expect(localizedHref(lang, '/')).toBe(`/${lang}/`);
    });
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
