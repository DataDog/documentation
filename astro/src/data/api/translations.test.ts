/**
 * Smoke tests for the translation overlay loader. These exercise the real
 * mocked overlay files rather than fixtures so the test catches schema drift
 * if a future overlay update changes the expected shape.
 */

import { describe, it, expect } from 'vitest';
import { getOverlay, translateTag, translateAction } from './translations';

describe('translation overlays', () => {
  it('returns an empty bundle for English', () => {
    const overlay = getOverlay('v1', 'en');
    expect(Object.keys(overlay.tags).length).toBe(0);
    expect(Object.keys(overlay.actions).length).toBe(0);
  });

  it('loads the Japanese tag overlay for v1', () => {
    const overlay = getOverlay('v1', 'ja');
    expect(overlay.tags['aws-integration']?.name).toBe('AWS インテグレーション');
  });

  it('loads the Japanese action overlay for v1', () => {
    const overlay = getOverlay('v1', 'ja');
    const op = overlay.actions['ListAPIKeys'];
    expect(op?.summary).toBe('すべての API キーを取得');
  });

  it('returns an empty action overlay when the file is missing (v1 has no ko actions)', () => {
    const overlay = getOverlay('v1', 'ko');
    expect(Object.keys(overlay.actions).length).toBe(0);
    // The ko tags file does exist for v1, so tags should still be populated.
    expect(Object.keys(overlay.tags).length).toBeGreaterThan(0);
  });

  it('translateTag falls back to the spec values when the slug is missing', () => {
    const overlay = getOverlay('v1', 'ja');
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
    const overlay = getOverlay('v1', 'ja');
    expect(translateAction(overlay, 'NoSuchOperation')).toEqual({});
  });

  it('caches per (version, locale)', () => {
    const a = getOverlay('v2', 'fr');
    const b = getOverlay('v2', 'fr');
    expect(a).toBe(b);
  });
});
