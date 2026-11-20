import path from "node:path";
import type { Plugin } from "vite";

const PREFIX = "chunk-url:";
const RESOLVED_PREFIX = `\0${PREFIX}`;
const PLACEHOLDER_PATTERN = /__CHUNK_URL_([\w$-]+)__/g;

/**
 * `import url from "chunk-url:<specifier>"` gives the built URL of the chunk
 * that `import("<specifier>")` loads, relative to the importing chunk. Resolve
 * it against `import.meta.url` before use.
 *
 * Exists so a dynamic import can be warmed by a `<link rel="modulepreload">`
 * the caller controls — chiefly to set `fetchpriority="low"`, since `import()`
 * itself always fetches at high priority and offers no way to say otherwise.
 *
 * `null` under the dev server and in SSR builds, where there is no client chunk
 * to name. Callers fall back to a plain `import()`.
 */
export function chunkUrlPlugin(): Plugin {
  let isBuild = false;

  return {
    name: "chunk-url",

    configResolved(config) {
      isBuild = config.command === "build";
    },

    async resolveId(source, importer) {
      if (!source.startsWith(PREFIX)) return null;

      const target = await this.resolve(source.slice(PREFIX.length), importer);
      if (!target) {
        this.error(`chunk-url: cannot resolve "${source}"`);
      }
      return `${RESOLVED_PREFIX}${target.id}`;
    },

    load(id) {
      if (!id.startsWith(RESOLVED_PREFIX)) return null;

      if (!isBuild || this.environment.config.consumer !== "client") {
        return "export default null;";
      }

      // Emitting a module that is also dynamically imported does not copy it:
      // the bundler gives both the same chunk, so the name it reports here is
      // the file the `import()` requests.
      const referenceId = this.emitFile({
        type: "chunk",
        id: id.slice(RESOLVED_PREFIX.length),
      });
      return `export default "__CHUNK_URL_${referenceId}__";`;
    },

    // Chunk names are hashed only once the bundle is final, so the URL is
    // written in here rather than at load time.
    renderChunk(code, chunk) {
      if (!code.includes("__CHUNK_URL_")) return null;

      return code.replace(PLACEHOLDER_PATTERN, (_, referenceId: string) => {
        const relativePath = path.posix.relative(
          path.posix.dirname(chunk.fileName),
          this.getFileName(referenceId),
        );
        return relativePath.startsWith(".")
          ? relativePath
          : `./${relativePath}`;
      });
    },
  };
}
