/** One crumb in a `Breadcrumbs.astro` trail. The last crumb is the current page. */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}
