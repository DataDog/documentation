import type { ImageMetadata } from "astro";

// TODO: make this environment-dependent (e.g. a staging CDN for preview builds)
export const IMAGES_URL = "https://imgix.datadoghq.com";

const CONTENT_IMAGES_ROOT = "/src/images/content/";

const contentImageImports = import.meta.glob<{ default: ImageMetadata }>(
  "/src/images/content/**/*.{png,jpg,jpeg,gif}",
);

// astro:assets only processes images; video goes through Vite's plain
// ?url asset handling instead, which resolves to a bare URL string.
const contentVideoImports = import.meta.glob<{ default: string }>(
  "/src/images/content/**/*.mp4",
  { query: "?url" },
);

export async function resolveLocalContentImage(
  relativePath: string,
): Promise<ImageMetadata | null> {
  const importFile =
    contentImageImports[`${CONTENT_IMAGES_ROOT}${relativePath}`];
  if (!importFile) return null;

  const module = await importFile();
  return module.default;
}

export async function resolveLocalContentVideo(
  relativePath: string,
): Promise<string | null> {
  const importFile =
    contentVideoImports[`${CONTENT_IMAGES_ROOT}${relativePath}`];
  if (!importFile) return null;

  const module = await importFile();
  return module.default;
}
