/**
 * Smoke tests for the translation overlay loader. These exercise the real
 * mocked overlay files rather than fixtures so the test catches schema drift
 * if a future overlay update changes the expected shape.
 */

import { describe, it, expect } from 'vitest';
import { getTranslationOverlay, translateTag, translateAction } from './translationsLoader';

describe('translation overlays', () => {
  it('returns an empty bundle for English', () => {
    const overlay = getTranslationOverlay('v1', 'en');
    expect(Object.keys(overlay.tags).length).toBe(0);
    expect(Object.keys(overlay.actions).length).toBe(0);
  });

  it('loads the Japanese tag overlay for v1', () => {
    const overlay = getTranslationOverlay('v1', 'ja');
    expect(overlay.tags['aws-integration']?.name).toBe('AWS インテグレーション');
  });

  it('loads the Japanese action overlay for v1', () => {
    const overlay = getTranslationOverlay('v1', 'ja');
    const op = overlay.actions['ListAPIKeys'];
    expect(op?.summary).toBe('すべての API キーを取得');
  });

  // `zz` is reserved for private use in ISO 3166 and is never a real content
  // locale, so no upstream translation drop can ever add these files. Do not
  // swap in a real locale that merely happens to lack an overlay today: this
  // test previously used v1/ko and broke the moment translators shipped
  // `translate_actions.ko.json`.
  it('returns empty overlays when no file exists for the locale', () => {
    const overlay = getTranslationOverlay('v1', 'zz');
    expect(Object.keys(overlay.actions).length).toBe(0);
    expect(Object.keys(overlay.tags).length).toBe(0);
  });

  it('populates tags independently of actions, so one missing file does not blank the other', () => {
    // Guards the per-file resolution in getTranslationOverlay: `tags` and
    // `actions` are matched in separate loops, so a locale with only one of
    // the two files must still return the file it has.
    const tagsOnly = {
      tags: { 'aws-integration': { name: 'Translated' } },
      actions: {},
    };
    expect(translateTag(tagsOnly, 'aws-integration', { name: 'Spec' }).name).toBe(
      'Translated',
    );
    expect(translateAction(tagsOnly, 'ListAPIKeys')).toEqual({});
  });

  it('translateTag falls back to the spec values when the slug is missing', () => {
    const overlay = getTranslationOverlay('v1', 'ja');
    const result = translateTag(overlay, 'this-slug-does-not-exist', {
      name: 'Some Spec Name',
      description: 'Some spec description',
    });
    expect(result).toEqual({
      name: 'Some Spec Name',
      description: 'Some spec description',
    });
  });

  it('translateTag merges translated and fallback values per-field', () => {
    // Build a synthetic overlay where description is missing — should fall back.
    const partialOverlay = {
      tags: { 'foo': { name: 'Translated Name' } },
      actions: {},
    };
    const result = translateTag(partialOverlay, 'foo', {
      name: 'Spec Name',
      description: 'Spec Description',
    });
    expect(result.name).toBe('Translated Name');
    expect(result.description).toBe('Spec Description');
  });

  it('translateAction returns an empty object for unknown operation IDs', () => {
    const overlay = getTranslationOverlay('v1', 'ja');
    expect(translateAction(overlay, 'NoSuchOperation')).toEqual({});
  });

  it('caches per (version, locale)', () => {
    const a = getTranslationOverlay('v2', 'fr');
    const b = getTranslationOverlay('v2', 'fr');
    expect(a).toBe(b);
  });
});
