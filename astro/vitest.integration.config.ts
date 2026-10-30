/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

// Integration test config — intentionally omits the frozen-fixture plugin so
// @api-spec resolves to the live spec staged by `yarn fetch:spec`.
export default getViteConfig({
  test: {
    name: "live",
    include: ["tests/integration/**/*.test.ts"],
    // The first test in each file pays to parse the full spec, which takes
    // over Vitest's 5s default on CI's shared runners.
    testTimeout: 30_000,
  },
});
