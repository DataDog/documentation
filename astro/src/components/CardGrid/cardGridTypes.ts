/** Props `ImageCard.astro` receives from the `card-grid` transform. */
export interface ImageCardProps {
  /** Per-card element id, assigned by the transform and scoped to the grid. */
  id: string;
  href: string;
  src?: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  tooltip?: string;
  /** Already resolved by the transform: child value, else the grid's. */
  image_width?: number;
}

/** Props `CardGrid.astro` receives from the `card-grid` transform. */
export interface CardGridProps {
  id: string;
  card_width: number;
  image_width?: number;
  /** Ids of the cards that have a tooltip. Empty means: do not hydrate. */
  tooltipCardIds: string[];
  /** Tooltip text per card id. Keyed so a label cannot drift off its card. */
  tooltipLabelsByCardId: Record<string, string>;
}

/** Applied when a card sets no `image_width` and its grid sets none either. */
export const DEFAULT_IMAGE_WIDTH = 150;
