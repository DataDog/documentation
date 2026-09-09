import { build } from "esbuild";

// One ESM bundle, and only one. Both consumers resolve ESM imports natively:
// Astro's Vite, and Hugo's `js.Build`, which is esbuild and reads ESM
// regardless of the format it emits. Hugo emits IIFE, so the IIFE Hugo needs is
// one Hugo's own bundler already produces — a second output here would be dead
// weight. Adding one later is a two-line change.
await build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/ask-ai.js",
  bundle: true,
  format: "esm",
  platform: "browser",
  // Node 20 is the floor for the toolchain; ES2020 is the floor for the output,
  // matching `tsconfig.json`'s target.
  target: ["es2020"],

  // A *linked* sourcemap: the `.map` file plus the `//# sourceMappingURL=`
  // comment that points at it. `external` would omit the comment, and a
  // re-bundling Vite or esbuild would then treat this artifact as map-less and
  // resolve widget stack frames into `dist/ask-ai.js` instead of into `src/`.
  // `sourcesContent` so that chaining needs no filesystem lookup at host build
  // time, when this package is reached through a `portal:` symlink.
  sourcemap: true,
  sourcesContent: true,

  // Both hosts minify their own output. Minifying here would only make the
  // sourcemap chain pass through an extra transform for no payload win.
  minify: false,

  loader: { ".css": "text" },
  logLevel: "info",
});
