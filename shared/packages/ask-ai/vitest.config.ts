import { defineConfig, type Plugin } from "vitest/config";

// Mirror esbuild's `text` loader for `.css`. Without this, Vite would process
// the stylesheet as CSS and the default export would not be the string the
// package injects — so tests would exercise a different artifact than the build
// produces, which is exactly the divergence worth avoiding.
const cssAsTextPlugin: Plugin = {
  name: "css-as-text",
  enforce: "pre",
  transform(code: string, id: string) {
    if (!id.endsWith(".css")) return;
    return { code: `export default ${JSON.stringify(code)};`, map: null };
  },
};

export default defineConfig({
  plugins: [cssAsTextPlugin],
  test: {
    environment: "happy-dom",
    include: ["src/**/*.unit.test.ts"],
    globals: true,
  },
});
