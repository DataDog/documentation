/** Props `ImageCard.astro` receives from the `card-grid` transform. */
export interface ImageCardProps {
  id: string;
  href: string;
  src?: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  tooltip?: string;
  image_width?: number;
}

/** Props `CardGrid.astro` receives from the `card-grid` transform. */
export interface CardGridProps {
  id: string;
  card_width: number;
  image_width?: number;
  tooltipCardIds: string[];
  tooltipLabelsByCardId: Record<string, string>;
}

/** Applied when a card sets no `image_width` and its grid sets none either. */
export const DEFAULT_IMAGE_WIDTH = 150;
