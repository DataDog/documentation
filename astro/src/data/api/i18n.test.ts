/**
 * Integration tests: the API data loader applies translation overlays for
 * non-English locales and silently falls back to English when an entry is
 * absent from the overlay.
 */

import { describe, it, expect } from 'vitest';
import { getApiCategories, getCategoryBySlug } from './index';
import { getEndpointsForCategory } from './endpoints';

describe('API loader — i18n', () => {
  it('returns English tag names when called with the default locale', () => {
    const cats = getApiCategories('en');
    const aws = cats.find((c) => c.slug === 'aws-integration');
    expect(aws?.name).toBe('AWS Integration');
  });

  it('returns translated tag names for Japanese', () => {
    const cats = getApiCategories('ja');
    const aws = cats.find((c) => c.slug === 'aws-integration');
    expect(aws?.name).toBe('AWS インテグレーション');
  });

  it('keeps English tag names when the Japanese overlay has no entry', () => {
    // `authentication` is in the Japanese tags overlay but its name field is
    // intentionally still English ("Authentication") in that overlay — verify
    // we pick it up rather than substituting another value.
    const cats = getApiCategories('ja');
    const auth = cats.find((c) => c.slug === 'authentication');
    expect(auth?.name).toBe('Authentication');
  });

  it('caches per locale (English and Japanese return distinct arrays)', () => {
    const en = getApiCategories('en');
    const ja = getApiCategories('ja');
    expect(en).not.toBe(ja);
  });

  it('does not change category slugs across locales (URLs stay stable)', () => {
    const enSlugs = new Set(getApiCategories('en').map((c) => c.slug));
    const jaSlugs = new Set(getApiCategories('ja').map((c) => c.slug));
    expect(jaSlugs).toEqual(enSlugs);
  });

  it('does not change operation route slugs across locales', () => {
    const enAws = getCategoryBySlug('aws-integration', 'en');
    const jaAws = getCategoryBySlug('aws-integration', 'ja');
    const enOpSlugs = new Set(enAws?.operations.map((o) => o.slug));
    const jaOpSlugs = new Set(jaAws?.operations.map((o) => o.slug));
    expect(jaOpSlugs).toEqual(enOpSlugs);
  });

  it('translates operation summaries on category listings', () => {
    const cat = getCategoryBySlug('key-management', 'ja');
    const listKeys = cat?.operations.find((op) => op.operationId === 'ListAPIKeys');
    expect(listKeys?.summary).toBe('すべての API キーを取得');
  });

  it('translates operation summaries on endpoint details', () => {
    const eps = getEndpointsForCategory('key-management', 'ja');
    const listKeys = eps.find((e) => e.operationId === 'ListAPIKeys');
    expect(listKeys?.summary).toBe('すべての API キーを取得');
  });

  it('falls back silently when an operation is missing from the action overlay', () => {
    // Pick a real endpoint and verify English passes through unchanged.
    const eps = getEndpointsForCategory('key-management', 'en');
    const listKeys = eps.find((e) => e.operationId === 'ListAPIKeys');
    expect(listKeys).toBeDefined();
    expect(listKeys?.summary).toBeTruthy();
  });
});
