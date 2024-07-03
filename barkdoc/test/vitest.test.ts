import { test, expect } from 'vitest';

test('should pass', () => {
  expect(true).toBe(true);
});

test('should fail', () => {
  expect(true).toBe(false);
});
