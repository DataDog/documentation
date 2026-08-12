/**
 * AST twin of the `{% img %}` component (`Img.astro`).
 *
 * Mirrors the authored `{% img %}` tag shape rather than a plain Markdown
 * image, since `src` here is the resolved full-size CDN URL, not the
 * content-relative path authors write. Layout-only attributes (`width`,
 * `height`, `style`, `popup`, `inline`) are dropped: none of them affect a
 * plaintext consumer.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import { tag } from "@lib/plaintext/helpers";

export interface ImgNodeInput {
  src: string;
  alt?: string;
  caption?: string;
  video?: boolean;
}

export function imgNode({
  src,
  alt,
  caption,
  video,
}: ImgNodeInput): MarkdocNode {
  const attributes: Record<string, unknown> = { src };
  if (alt) attributes.alt = alt;
  if (video) attributes.video = true;
  if (caption) attributes.caption = caption;

  return tag("img", attributes);
}
