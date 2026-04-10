import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    include: ['tests/headless/**/*.test.ts'],
  },
});
