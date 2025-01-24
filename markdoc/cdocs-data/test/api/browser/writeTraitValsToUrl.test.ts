import { writeTraitValsToUrl } from '../../../src';
import { describe, test, expect } from 'vitest';

describe('writeTraitValsToUrl', () => {
  test('should write the trait values to the URL', () => {
    const url = new URL('http://example.com/');
    const traitValsById = { trait1: 'val1', trait2: 'val2' };

    const result = writeTraitValsToUrl({ url, traitValsById });
    expect(result.search).toBe('?trait1=val1&trait2=val2');
  });

  test('should sort the trait values into alphabetical order', () => {
    const url = new URL('http://example.com/');
    const traitValsById = { z: 'zVal', a: 'aVal' };

    const result = writeTraitValsToUrl({ url, traitValsById });
    expect(result.search).toBe('?a=aVal&z=zVal');
  });

  test('should forward any non-trait params while preserving alphabetical order', () => {
    const url = new URL('http://example.com/?other=param');
    const traitValsById = { z: 'zVal', a: 'aVal' };

    const result = writeTraitValsToUrl({ url, traitValsById });
    expect(result.search).toBe('?a=aVal&other=param&z=zVal');
  });

  test('should overwrite existing trait values with new values', () => {
    const url = new URL('http://example.com/?trait1=val1');
    const traitValsById = { trait1: 'newVal' };

    const result = writeTraitValsToUrl({ url, traitValsById });
    expect(result.search).toBe('?trait1=newVal');
  });

  test('should work correctly with a path', () => {
    const url = new URL('http://example.com/path/to/page?trait1=val1');
    const traitValsById = { trait1: 'newVal' };

    const result = writeTraitValsToUrl({ url, traitValsById });

    expect(result.origin).toBe('http://example.com');
    expect(result.pathname).toBe('/path/to/page');
    expect(result.search).toBe('?trait1=newVal');
  });
});
