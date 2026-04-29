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

describe('locale helpers', () => {
  describe('LOCALES', () => {
    it('contains the Hugo-supported locales', () => {
      expect([...LOCALES]).toEqual(['en', 'fr', 'ja', 'ko', 'es']);
    });
  });

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

    it('returns the locale for a valid non-default segment', () => {
      expect(parseLangParam('ja')).toBe('ja');
      expect(parseLangParam('fr')).toBe('fr');
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

    it('returns /<lang> for non-default locales', () => {
      expect(localePrefix('ja')).toBe('/ja');
      expect(localePrefix('fr')).toBe('/fr');
    });
  });

  describe('localizedHref', () => {
    it('leaves English paths alone', () => {
      expect(localizedHref('en', '/api/latest/dashboards/')).toBe('/api/latest/dashboards/');
    });

    it('prefixes non-English paths with the locale', () => {
      expect(localizedHref('ja', '/api/latest/dashboards/')).toBe('/ja/api/latest/dashboards/');
      expect(localizedHref('fr', '/')).toBe('/fr/');
    });
  });

  describe('stripLocalePrefix', () => {
    it('returns English + the original path for unprefixed paths', () => {
      expect(stripLocalePrefix('/api/latest/dashboards/')).toEqual({
        lang: 'en',
        rest: '/api/latest/dashboards/',
      });
    });

    it('strips a known locale prefix', () => {
      expect(stripLocalePrefix('/ja/api/latest/dashboards/')).toEqual({
        lang: 'ja',
        rest: '/api/latest/dashboards/',
      });
    });

    it('returns / when only the locale prefix is present', () => {
      expect(stripLocalePrefix('/ja')).toEqual({ lang: 'ja', rest: '/' });
      expect(stripLocalePrefix('/ja/')).toEqual({ lang: 'ja', rest: '/' });
    });

    it('does not strip prefixes that look like locales but are not registered', () => {
      expect(stripLocalePrefix('/pt/api/latest/')).toEqual({
        lang: 'en',
        rest: '/pt/api/latest/',
      });
    });
  });
});
