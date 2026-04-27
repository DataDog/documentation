import { describe, it, expect } from 'vitest';
import { renderApiMethodBadgeMd } from './ApiMethodBadge.md';

describe('renderApiMethodBadgeMd', () => {
  it('uppercases and bolds the method name', () => {
    expect(renderApiMethodBadgeMd('get')).toBe('**GET**');
    expect(renderApiMethodBadgeMd('POST')).toBe('**POST**');
    expect(renderApiMethodBadgeMd('Patch')).toBe('**PATCH**');
  });
});
