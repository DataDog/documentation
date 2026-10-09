/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

// Integration test config — intentionally omits the frozen-fixture plugin so
// @api-spec resolves to the live spec staged by `yarn fetch:spec`.
export default getViteConfig({
  test: {
    name: "live",
    include: ["tests/integration/**/*.test.ts"],
  },
});
