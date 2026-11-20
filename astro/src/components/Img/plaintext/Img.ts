/**
 * AST twin of the `{% img %}` component (`Img.astro`).
 *
 * Mirrors the authored `{% img %}` tag shape rather than a plain Markdown
 * image, since `src` here is the resolved full-size CDN URL, not the
 * content-relative path authors write.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import { tag } from "@lib/plaintext/helpers";
import type { ImgTagProps } from "../imgTypes";

export function imgNode({
  src,
  alt,
  caption,
  video,
  inline,
}: ImgTagProps): MarkdocNode {
  const attributes: Record<string, unknown> = { src };
  if (alt) attributes.alt = alt;
  if (video) attributes.video = true;
  if (caption) attributes.caption = caption;
  if (inline) attributes.inline = true;
  return tag("img", attributes);
}
