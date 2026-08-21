export interface SizingProps {
  width?: string;
  height?: string;
  widthPercent?: number;
}

/**
 * Full author-facing surface of the `{% img %}` tag, before any resolution
 * (CDN URL building, srcset generation, etc.). The plaintext twin
 * (`plaintext/Img.ts`) derives its input type from this via `Pick`, since
 * it needs a strict subset — layout-only fields don't apply to plaintext.
 */
export interface ImgTagProps extends SizingProps {
  src: string;
  alt?: string;
  caption?: string;
  video?: boolean;
  inline?: boolean;
  popup?: boolean;
}
