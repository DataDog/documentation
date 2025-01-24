import { getTraitValsFromUrl } from '../../../src';
import { describe, test, expect } from 'vitest';

describe('getTraitValsFromUrl', () => {
  test('should return the selected trait values from the URL', () => {
    const url = new URL('http://example.com/?trait1=val1&trait2=val2');
    const traitIds = ['trait1', 'trait2'];

    const result = getTraitValsFromUrl({ url, traitIds });

    expect(result).toEqual({ trait1: 'val1', trait2: 'val2' });
  });

  test('should ignore trait values not in the traitIds list', () => {
    const url = new URL('http://example.com/?trait1=val1&trait2=val2');
    const traitIds = ['trait1'];

    const result = getTraitValsFromUrl({ url, traitIds });

    expect(result).toEqual({ trait1: 'val1' });
  });

  test('should return an empty object if no trait values are found', () => {
    const url = new URL('http://example.com/');
    const traitIds = ['trait1'];

    const result = getTraitValsFromUrl({ url, traitIds });

    expect(result).toEqual({});
  });
});
