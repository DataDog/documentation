import { IMAGES_URL } from "@config/images";

export interface BuiltImageUrls {
  /** The bare CDN URL for the image, with no transform params. */
  imageUrl: string;
  /** 1x/2x srcset, capped at 850px wide. */
  srcset: string;
  /** Full-size URL, used as the lightbox target. */
  popupHref: string;
}

/**
 * Build the CDN URLs for a content-relative image path (e.g. "logos/aws.svg").
 *
 * Shared by `Img.astro` and `ImageCard.astro` — the one genuine cross-boundary
 * contract between them. The components do not otherwise share markup: a card
 * is already an `<a>`, so it cannot reuse `Img`'s figure/lightbox wrapper.
 */
export function buildImageUrl(src: string): BuiltImageUrls {
  const imageUrl = `${IMAGES_URL}/images/${src}`;
  return {
    imageUrl,
    srcset:
      `${imageUrl}?auto=format&fit=max&w=850 1x, ` +
      `${imageUrl}?auto=format&fit=max&w=850&dpr=2 2x`,
    popupHref: `${imageUrl}?fit=max&auto=format`,
  };
}
