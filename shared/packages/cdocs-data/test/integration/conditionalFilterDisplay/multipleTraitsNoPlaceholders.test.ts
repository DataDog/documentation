import { describe, test, expect } from 'vitest';
import { Frontmatter } from '../../../src';
import { buildAndResolve } from './helpers';

// =====================================================================
// Multiple traits, no dynamic options/placeholders
// =====================================================================

describe('Multiple traits, no dynamic options — hide_if', () => {
  const frontmatter: Frontmatter = {
    title: 'Test',
    content_filters: [
      { label: 'OS', trait_id: 'os', option_group_id: 'os_options' },
      { label: 'Programming Language', trait_id: 'prog_lang', option_group_id: 'prog_lang_options' },
      {
        label: 'Runtime',
        trait_id: 'runtime',
        option_group_id: 'java_runtime_options',
        hide_if: [{ os: ['windows'], prog_lang: ['python', 'ruby'] }],
      },
    ],
  };

  test('manifest has no errors', () => {
    const { manifest } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'java' });
    expect(manifest.errors).toEqual([]);
  });

  test('runtime displays when os is linux and prog_lang is java', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'java' });
    expect(resolved.runtime.isShown).toBe(true);
    expect(resolved.runtime.currentValue).toBe('jvm');
  });

  test('runtime hidden when both conditions match (os windows, prog_lang python)', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'windows', prog_lang: 'python' });
    expect(resolved.runtime.isShown).toBe(false);
  });

  test('runtime displays when only os matches (os windows, prog_lang java)', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'windows', prog_lang: 'java' });
    expect(resolved.runtime.isShown).toBe(true);
    expect(resolved.runtime.currentValue).toBe('jvm');
  });

  test('runtime displays when only prog_lang matches (os linux, prog_lang ruby)', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'ruby' });
    expect(resolved.runtime.isShown).toBe(true);
    expect(resolved.runtime.currentValue).toBe('jvm');
  });
});

describe('Multiple traits, no dynamic options — show_if', () => {
  const frontmatter: Frontmatter = {
    title: 'Test',
    content_filters: [
      { label: 'OS', trait_id: 'os', option_group_id: 'os_options' },
      { label: 'Programming Language', trait_id: 'prog_lang', option_group_id: 'prog_lang_options' },
      {
        label: 'Runtime',
        trait_id: 'runtime',
        option_group_id: 'java_runtime_options',
        show_if: [{ os: ['linux', 'mac_os'], prog_lang: ['java'] }],
      },
    ],
  };

  test('manifest has no errors', () => {
    const { manifest } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'java' });
    expect(manifest.errors).toEqual([]);
  });

  test('runtime displays when os is linux and prog_lang is java', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'java' });
    expect(resolved.runtime.isShown).toBe(true);
    expect(resolved.runtime.currentValue).toBe('jvm');
  });

  test('runtime displays when os is mac_os and prog_lang is java', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'mac_os', prog_lang: 'java' });
    expect(resolved.runtime.isShown).toBe(true);
    expect(resolved.runtime.currentValue).toBe('jvm');
  });

  test('runtime hidden when os does not match (os windows, prog_lang java)', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'windows', prog_lang: 'java' });
    expect(resolved.runtime.isShown).toBe(false);
  });

  test('runtime hidden when prog_lang does not match (os linux, prog_lang python)', () => {
    const { resolved } = buildAndResolve(frontmatter, { os: 'linux', prog_lang: 'python' });
    expect(resolved.runtime.isShown).toBe(false);
  });
});
