/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    include: ['tests/headless/**/*.test.ts', 'src/components/**/*.test.ts', 'src/utils/**/*.test.ts'],
  },
});
