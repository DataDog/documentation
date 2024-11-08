import { describe, test, expect } from 'vitest';
import { HugoFunctions } from '../../src/helperModules/HugoFunctions';
import { mockHugoGlobalConfig, mockPageConfig } from '../mocks/valid/integrationConfig';
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

  describe('relUrl', () => {
    test('handles all example inputs correctly for a simple base URL', () => {
      const hugoConfigDup = { ...mockHugoGlobalConfig };
      hugoConfigDup.siteConfig = { baseURL: 'https://example.org/' };

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
            hugoConfig: { global: hugoConfigDup, page: mockPageConfig },
            url
          })
        ])
      );

      expect(actualOutputByInput).toEqual(expectedOutputByInput);
    });

    test('handles all example inputs correctly for a base URL with a path', () => {
      const hugoConfigDup = { ...mockHugoGlobalConfig };
      hugoConfigDup.siteConfig = { baseURL: 'https://example.org/foo/bar/' };

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
            hugoConfig: { global: hugoConfigDup, page: mockPageConfig },
            url: input
          })
        ])
      );

      expect(actualOutputByInput).toEqual(expectedOutputByInput);
    });
  });
});
