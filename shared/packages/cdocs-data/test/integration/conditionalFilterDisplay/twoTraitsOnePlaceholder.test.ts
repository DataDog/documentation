import { describe, test, expect } from 'vitest';
import { Frontmatter, buildFiltersManifest } from '../../../src';
import { buildAndResolve, customizationConfig } from './helpers';

// =====================================================================
// Two traits, one placeholder (dynamic options)
// =====================================================================

describe('Two traits, one placeholder — show_if', () => {
  const frontmatter: Frontmatter = {
    title: 'Test',
    content_filters: [
      { label: 'OS', trait_id: 'os', option_group_id: 'os_options' },
      { label: 'Programming Language', trait_id: 'prog_lang', option_group_id: 'prog_lang_options' },
      {
        label: 'Runtime',
        trait_id: 'runtime',
        option_group_id: '<PROG_LANG>_runtime_options',
        show_if: [{ os: ['linux', 'mac_os'], prog_lang: ['java', 'python'] }],
      },
    ],
  };

  test('manifest has no errors', () => {
    const manifest = buildFiltersManifest({ frontmatter, customizationConfig });
    expect(manifest.errors).toEqual([]);
  });

  test('runtime displays when os is linux and prog_lang is java', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'java' });
    expect(resolved.runtime.isShown).toBe(true);
    expect(resolved.runtime.currentValue).toBe('jvm');
  });

  test('runtime displays when os is mac_os and prog_lang is python', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'mac_os', prog_lang: 'python' });
    expect(resolved.runtime.isShown).toBe(true);
    expect(resolved.runtime.currentValue).toBe('cpython');
  });

  test('runtime hidden when os does not match', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'windows', prog_lang: 'java' });
    expect(resolved.runtime.isShown).toBe(false);
  });

  test('runtime hidden when prog_lang does not match', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'ruby' });
    expect(resolved.runtime.isShown).toBe(false);
  });
});

describe('Two traits, one placeholder — hide_if', () => {
  const frontmatter: Frontmatter = {
    title: 'Test',
    content_filters: [
      { label: 'OS', trait_id: 'os', option_group_id: 'os_options' },
      { label: 'Programming Language', trait_id: 'prog_lang', option_group_id: 'prog_lang_options' },
      {
        label: 'Runtime',
        trait_id: 'runtime',
        option_group_id: '<PROG_LANG>_runtime_options',
        hide_if: [{ os: ['windows'], prog_lang: ['ruby'] }],
      },
    ],
  };

  test('manifest has no errors', () => {
    const manifest = buildFiltersManifest({ frontmatter, customizationConfig });
    expect(manifest.errors).toEqual([]);
  });

  test('runtime displays when os is linux and prog_lang is java', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'java' });
    expect(resolved.runtime.isShown).toBe(true);
    expect(resolved.runtime.currentValue).toBe('jvm');
  });

  test('runtime hidden when both conditions match', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'windows', prog_lang: 'ruby' });
    expect(resolved.runtime.isShown).toBe(false);
  });

  test('runtime displays when only os matches', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'windows', prog_lang: 'java' });
    expect(resolved.runtime.isShown).toBe(true);
    expect(resolved.runtime.currentValue).toBe('jvm');
  });
});
