/**
 * The hand-written API pages -- the ones that live in the `en` content
 * collection (src/content/en/api/latest/*.mdoc) rather than being generated
 * from the OpenAPI spec.
 *
 * The list is explicit, not "any .mdoc in that folder", so these slugs stay
 * reserved and a stray content file can't quietly add a route.
 *
 * This lives in its own module rather than in the route frontmatter because
 * Astro extracts `getStaticPaths` into a separate module context, where
 * component-scope consts are not in scope.
 */

/** Every hand-written page, including the API root (`index`). */
export const HAND_WRITTEN_PAGE_SLUGS = ['index', 'rate-limits', 'scopes', 'using-the-api'] as const;

export type HandWrittenPageSlug = (typeof HAND_WRITTEN_PAGE_SLUGS)[number];

/**
 * The subset with a `.md` plaintext twin. The API root never had one, so it is
 * excluded.
 */
export const HAND_WRITTEN_PLAINTEXT_PAGE_SLUGS = HAND_WRITTEN_PAGE_SLUGS.filter(
  (slug) => slug !== 'index',
);

/** Where the hand-written pages live, relative to the collection root. */
export const HAND_WRITTEN_PAGE_DIR = 'api/latest';

/**
 * The `en` collection entry id for a hand-written page slug.
 *
 * Astro's glob loader strips a trailing `/index` when deriving entry ids, so
 * `api/latest/index.mdoc` is stored as `api/latest` -- not `api/latest/index`.
 */
export function handWrittenPageEntryId(pageSlug: string): string {
  return pageSlug === 'index' ? HAND_WRITTEN_PAGE_DIR : `${HAND_WRITTEN_PAGE_DIR}/${pageSlug}`;
}
