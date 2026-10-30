import { IMAGES_URL } from "@config/images";

export interface ImageUrlAttrs {
  imageUrl: string;
  srcset: string;
  popupHref: string;
}

/**
 * Build the CDN URLs for a content-relative image path (e.g. "logos/aws.svg").
 *
 * Shared by `Img.astro` and `ImageCard.astro`.
 */
export function buildImageUrl(src: string): ImageUrlAttrs {
  const imageUrl = `${IMAGES_URL}/images/${src}`;
  return {
    imageUrl,
    srcset:
      `${imageUrl}?auto=format&fit=max&w=850 1x, ` +
      `${imageUrl}?auto=format&fit=max&w=850&dpr=2 2x`,
    popupHref: `${imageUrl}?fit=max&auto=format`,
  };
}
