export type PaginationItem = number | "ellipsis";

/**
 * The page numbers to show: the first, the last, and the pages next to the
 * current one. A gap of more than one page collapses into an ellipsis, so a
 * long range doesn't render hundreds of links.
 */
export function paginationItems(
  currentPage: number,
  totalPages: number,
): PaginationItem[] {
  const shownPages = new Set(
    [1, currentPage - 1, currentPage, currentPage + 1, totalPages].filter(
      (pageNumber) => pageNumber >= 1 && pageNumber <= totalPages,
    ),
  );
  // A gap of exactly one page shows that page rather than an ellipsis.
  for (const pageNumber of [...shownPages]) {
    if (!shownPages.has(pageNumber + 1) && shownPages.has(pageNumber + 2)) {
      shownPages.add(pageNumber + 1);
    }
  }

  const items: PaginationItem[] = [];
  let previousPage = 0;
  for (const pageNumber of [...shownPages].sort((a, b) => a - b)) {
    if (pageNumber - previousPage > 1) items.push("ellipsis");
    items.push(pageNumber);
    previousPage = pageNumber;
  }
  return items;
}
