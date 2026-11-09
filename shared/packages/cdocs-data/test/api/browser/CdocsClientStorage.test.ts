/**
 * @vitest-environment jsdom
 */

import { CdocsClientStorage } from '../../../src';
import { vi, describe, test, expect, beforeEach } from 'vitest';

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('CdocsClientStorage', () => {
  const browserStorage = new CdocsClientStorage({
    topLevelKey: 'cdocs-test',
    maxKeyCount: 3,
  });

  test('has no trait vals initially', () => {
    expect(browserStorage.getTraitVals()).toEqual({});
    expect(localStorageMock.getItem).toHaveBeenCalledTimes(1);
  });

  test('can set and get trait vals', () => {
    const entries = {
      trait1: 'trait1_val',
      trait2: 'trait2_val',
    };

    browserStorage.setTraitVals(entries);
    expect(browserStorage.getTraitVals()).toEqual(entries);
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
  });

  test('can update trait vals', () => {
    // Sleep for 1 second to ensure the timestamp on this trait value
    // is different than in the test above
    const start = Date.now();
    while (Date.now() - start < 1000) {
      // Sleep
    }

    const entries = {
      trait1: 'trait1_val_updated',
    };

    browserStorage.setTraitVals(entries);

    expect(browserStorage.getTraitVals()).toEqual({
      trait1: 'trait1_val_updated',
      trait2: 'trait2_val',
    });

    expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
  });

  test('does not exceed max key count', () => {
    const entries = {
      trait3: 'trait3_val',
      trait4: 'trait4_val',
    };

    browserStorage.setTraitVals(entries);

    expect(Object.keys(browserStorage.getTraitVals())).toHaveLength(3);
    expect(browserStorage.getTraitVals()).toEqual({
      trait1: 'trait1_val_updated',
      trait3: 'trait3_val',
      trait4: 'trait4_val',
    });
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(3);
  });

  test('loads any saved values on initialization', () => {
    const newBrowserStorage = new CdocsClientStorage({
      topLevelKey: 'cdocs-test',
      maxKeyCount: 3,
    });

    expect(newBrowserStorage.getTraitVals()).toEqual({
      trait1: 'trait1_val_updated',
      trait3: 'trait3_val',
      trait4: 'trait4_val',
    });
    expect(localStorageMock.getItem).toHaveBeenCalledTimes(2);
  });

  test('can clear all trait vals', () => {
    browserStorage.clear();

    expect(browserStorage.getTraitVals()).toEqual({});
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(4);
  });

  test('can destroy all stored data', () => {
    browserStorage.destroy();

    expect(browserStorage.getTraitVals()).toEqual({});
    expect(localStorageMock.removeItem).toHaveBeenCalledTimes(1);
  });
});
