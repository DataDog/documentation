import { describe, test, expect } from 'vitest';
import { Frontmatter, buildFiltersManifest } from '../../../src';
import { buildAndResolve, customizationConfig } from './helpers';

// =====================================================================
// Single trait, one placeholder (dynamic options)
// =====================================================================

describe('Single trait, one placeholder — show_if', () => {
  const frontmatter: Frontmatter = {
    title: 'Test',
    content_filters: [
      { label: 'OS', trait_id: 'os', option_group_id: 'os_options' },
      { label: 'Programming Language', trait_id: 'prog_lang', option_group_id: 'prog_lang_options' },
      {
        label: 'Runtime',
        trait_id: 'runtime',
        option_group_id: '<PROG_LANG>_runtime_options',
        show_if: [{ prog_lang: ['java', 'python'] }],
      },
    ],
  };

  test('manifest has no errors (ruby_runtime_options not required)', () => {
    const manifest = buildFiltersManifest({ frontmatter, customizationConfig });
    expect(manifest.errors).toEqual([]);
  });

  test('runtime displays with correct value when prog_lang is java', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'java' });
    expect(resolved.runtime.isShown).toBe(true);
    expect(resolved.runtime.currentValue).toBe('jvm');
  });

  test('runtime displays with correct value when prog_lang is python', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'python' });
    expect(resolved.runtime.isShown).toBe(true);
    expect(resolved.runtime.currentValue).toBe('cpython');
  });

  test('runtime hidden when prog_lang is ruby', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'ruby' });
    expect(resolved.runtime.isShown).toBe(false);
  });
});

describe('Single trait, one placeholder — hide_if', () => {
  const frontmatter: Frontmatter = {
    title: 'Test',
    content_filters: [
      { label: 'OS', trait_id: 'os', option_group_id: 'os_options' },
      { label: 'Programming Language', trait_id: 'prog_lang', option_group_id: 'prog_lang_options' },
      {
        label: 'Runtime',
        trait_id: 'runtime',
        option_group_id: '<PROG_LANG>_runtime_options',
        hide_if: [{ prog_lang: ['ruby'] }],
      },
    ],
  };

  test('manifest has no errors (ruby_runtime_options not required)', () => {
    const manifest = buildFiltersManifest({ frontmatter, customizationConfig });
    expect(manifest.errors).toEqual([]);
  });

  test('runtime displays when prog_lang is java', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'java' });
    expect(resolved.runtime.isShown).toBe(true);
    expect(resolved.runtime.currentValue).toBe('jvm');
  });

  test('runtime displays when prog_lang is python', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'python' });
    expect(resolved.runtime.isShown).toBe(true);
    expect(resolved.runtime.currentValue).toBe('cpython');
  });

  test('runtime hidden when prog_lang is ruby', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'ruby' });
    expect(resolved.runtime.isShown).toBe(false);
  });
});
