// The stylesheet is bundled as a string, not as a stylesheet: esbuild's `text`
// loader in `esbuild.config.mjs`, and a matching plugin in `vitest.config.ts`.
// The package injects it into a <style> element at mount time, because Hugo's
// `js.Build` cannot process a CSS import inside a JS bundle.
declare module "*.css" {
  const content: string;
  export default content;
}
