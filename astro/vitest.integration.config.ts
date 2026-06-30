/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

// Integration test config — intentionally omits the frozen-fixture plugin so
// @hugo-site/data/api resolves to the live Hugo spec.
export default getViteConfig({
  test: {
    name: "live",
    include: ["tests/integration/**/*.test.ts"],
  },
});
