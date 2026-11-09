import { describe, test, expect } from 'vitest';
import { Frontmatter } from '../../../src';
import { buildAndResolve } from './helpers';

// =====================================================================
// Single trait, no dynamic options/placeholders
// =====================================================================

describe('Single trait, no dynamic options — hide_if', () => {
  const frontmatter: Frontmatter = {
    title: 'Test',
    content_filters: [
      { label: 'OS', trait_id: 'os', option_group_id: 'os_options' },
      { label: 'Programming Language', trait_id: 'prog_lang', option_group_id: 'prog_lang_options' },
      {
        label: 'Runtime',
        trait_id: 'runtime',
        option_group_id: 'java_runtime_options',
        hide_if: [{ prog_lang: ['python', 'ruby'] }],
      },
    ],
  };

  test('manifest has no errors', () => {
    const { manifest } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'java' });
    expect(manifest.errors).toEqual([]);
  });

  test('runtime displays when prog_lang is java', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'java' });
    expect(resolved.runtime.isShown).toBe(true);
    expect(resolved.runtime.currentValue).toBe('jvm');
  });

  test('runtime hidden when prog_lang is python', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'python' });
    expect(resolved.runtime.isShown).toBe(false);
    expect(resolved.runtime.currentValue).toBe('cdocs_noop');
  });

  test('runtime hidden when prog_lang is ruby', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'ruby' });
    expect(resolved.runtime.isShown).toBe(false);
  });
});

describe('Single trait, no dynamic options — show_if', () => {
  const frontmatter: Frontmatter = {
    title: 'Test',
    content_filters: [
      { label: 'OS', trait_id: 'os', option_group_id: 'os_options' },
      { label: 'Programming Language', trait_id: 'prog_lang', option_group_id: 'prog_lang_options' },
      {
        label: 'Runtime',
        trait_id: 'runtime',
        option_group_id: 'java_runtime_options',
        show_if: [{ prog_lang: ['java'] }],
      },
    ],
  };

  test('manifest has no errors', () => {
    const { manifest } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'java' });
    expect(manifest.errors).toEqual([]);
  });

  test('runtime displays when prog_lang is java', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'java' });
    expect(resolved.runtime.isShown).toBe(true);
    expect(resolved.runtime.currentValue).toBe('jvm');
  });

  test('runtime hidden when prog_lang is python', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'python' });
    expect(resolved.runtime.isShown).toBe(false);
  });
});
