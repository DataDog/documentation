import { describe, test, expect } from 'vitest';
import { HugoFunctions } from '../../src/helperModules/HugoFunctions';
import { mockHugoConfig } from '../config/mocks/valid/hugoConfig';
import { VALID_SITE_DIR } from '../config/constants';

describe('HugoFunctions', () => {
  describe('getFileContentsHash', () => {
    test('returns the correct hash for an image file', () => {
      const expectedHash = '60abd3d42408607da509794034239f28';
      const testImagePath = VALID_SITE_DIR + '/static/images/api-key.png';
      const actualHash = HugoFunctions.getFileContentsHash(testImagePath);

      expect(actualHash).toEqual(expectedHash);
    });
  });

  test('anchorize', () => {
    const expectedOutputByInput = {
      'A B C': 'a-b-c',
      'a b   c': 'a-b---c',
      '< a, b, & c >': '-a-b--c-',
      'main.go': 'maingo',
      Hugö: 'hugö'
    };

    const actualOutputByInput = Object.fromEntries(
      Object.entries(expectedOutputByInput).map(([input]) => [
        input,
        HugoFunctions.anchorize(input)
      ])
    );

    expect(actualOutputByInput).toEqual(expectedOutputByInput);
  });

  describe('absLangUrl', () => {
    test('handles all example inputs correctly for a simple base URL', () => {
      const hugoConfigDup = { ...mockHugoConfig };
      hugoConfigDup.global.siteConfig = { baseURL: 'https://example.org/' };

      const expectedOutputByInput = {
        // without leading slash
        '': 'https://example.org/en/',
        articles: 'https://example.org/en/articles',
        'articles#somehash': 'https://example.org/en/articles#somehash',
        'style.css': 'https://example.org/en/style.css',
        // with leading slash
        '/': 'https://example.org/en/',
        '/articles': 'https://example.org/en/articles',
        '/articles#somehash': 'https://example.org/en/articles#somehash',
        '/style.css': 'https://example.org/en/style.css'
      };

      const actualOutputByInput = Object.fromEntries(
        Object.entries(expectedOutputByInput).map(([url]) => [
          url,
          HugoFunctions.absLangUrl({
            hugoConfig: hugoConfigDup,
            url
          })
        ])
      );

      expect(actualOutputByInput).toEqual(expectedOutputByInput);
    });

    test('handles all example inputs correctly for a base URL with a path', () => {
      const hugoConfigDup = { ...mockHugoConfig };
      hugoConfigDup.global.siteConfig = { baseURL: 'https://example.org/docs/' };

      const expectedOutputByInput = {
        // without leading slash
        '': 'https://example.org/docs/en/',
        articles: 'https://example.org/docs/en/articles',
        'articles#somehash': 'https://example.org/docs/en/articles#somehash',
        'style.css': 'https://example.org/docs/en/style.css',
        // with leading slash
        '/': 'https://example.org/en/',
        '/articles': 'https://example.org/en/articles',
        '/articles#somehash': 'https://example.org/en/articles#somehash',
        '/style.css': 'https://example.org/en/style.css'
      };

      const actualOutputByInput = Object.fromEntries(
        Object.entries(expectedOutputByInput).map(([input]) => [
          input,
          HugoFunctions.absLangUrl({
            hugoConfig: hugoConfigDup,
            url: input
          })
        ])
      );

      expect(actualOutputByInput).toEqual(expectedOutputByInput);
    });
  });

  describe('relUrl', () => {
    test('handles all example inputs correctly for a simple base URL', () => {
      const hugoConfigDup = { ...mockHugoConfig };
      hugoConfigDup.global.siteConfig = { baseURL: 'https://example.org/' };

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
        Object.entries(expectedOutputByInput).map(([url]) => [
          url,
          HugoFunctions.relUrl({
            hugoConfig: hugoConfigDup,
            url
          })
        ])
      );

      expect(actualOutputByInput).toEqual(expectedOutputByInput);
    });

    test('handles all example inputs correctly for a base URL with a path', () => {
      const hugoConfigDup = { ...mockHugoConfig };
      hugoConfigDup.global.siteConfig = { baseURL: 'https://example.org/foo/bar/' };

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
          HugoFunctions.relUrl({
            hugoConfig: hugoConfigDup,
            url: input
          })
        ])
      );

      expect(actualOutputByInput).toEqual(expectedOutputByInput);
    });
  });
});
