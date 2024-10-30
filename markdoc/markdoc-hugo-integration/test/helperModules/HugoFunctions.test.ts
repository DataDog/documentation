import { describe, test, expect } from 'vitest';
import { HugoFunctions } from '../../src/helperModules/HugoFunctions';

describe('HugoFunctions.relUrl', () => {
  test('handles all example inputs correctly for a simple base URL', () => {
    const base = 'https://example.org/';
    const expectedOutputByInput = {
      '': '/',
      articles: '/articles',
      'style.css': '/style.css',
      'https://example.org/foo': '/foo',
      '/': '/',
      '/articles': '/articles',
      '/style.css': '/style.css'
    };

    const actualOutputByInput = Object.fromEntries(
      Object.entries(expectedOutputByInput).map(([input]) => [
        input,
        HugoFunctions.relUrl(base, input)
      ])
    );

    expect(expectedOutputByInput).toEqual(actualOutputByInput);
  });

  test('handles all example inputs correctly for a base URL with a path', () => {
    const base = 'https://example.org/foo/bar/';

    const expectedOutputByInput = {
      '': '/foo/bar',
      articles: '/foo/bar/articles',
      'style.css': '/foo/bar/style.css',
      'https://example.org/docs': '/docs',
      '/': '/',
      '/articles': '/articles',
      '/style.css': '/style.css'
    };

    const actualOutputByInput = Object.fromEntries(
      Object.entries(expectedOutputByInput).map(([input]) => [
        input,
        HugoFunctions.relUrl(base, input)
      ])
    );

    expect(expectedOutputByInput).toEqual(actualOutputByInput);
  });
});
