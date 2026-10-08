/**
 * Page metadata shared by each API page and its `.md` plaintext twin, so the
 * twin's frontmatter cannot drift from what the HTML page shows.
 */

import type { BreadcrumbItem } from "@components/Breadcrumbs/breadcrumbsTypes";
import type { ApiCategoryStub, EndpointData } from "@lib/api/schemas/views";
import { useTranslations } from "@lib/i18n/i18n";
import { localizedHref, type Locale } from "@lib/i18n/locale";
import { mdToMetaDescription } from "@lib/seo";

/**
 * The API breadcrumb trail. Omit `pageTitle` on the API root, where the trail
 * ends at "API"; everywhere else it links "API" and ends at the page title.
 */
export function apiBreadcrumbs(
  lang: Locale,
  pageTitle?: string,
): BreadcrumbItem[] {
  const translate = useTranslations(lang);
  const docsCrumb = {
    label: translate("docs"),
    href: localizedHref(lang, "/"),
  };
  if (pageTitle === undefined) {
    return [docsCrumb, { label: translate("api") }];
  }
  return [
    docsCrumb,
    { label: translate("api"), href: localizedHref(lang, "/api/latest/") },
    { label: pageTitle },
  ];
}

export function categoryMetaDescription(
  category: Pick<ApiCategoryStub, "name" | "description">,
): string {
  return (
    mdToMetaDescription(category.description) ||
    `${category.name} endpoints in the Datadog API.`
  );
}

/** Describes the operation by its latest variant, the one its page shows first. */
export function operationMetaDescription(operation: {
  summary: string;
  variants: Pick<EndpointData, "description">[];
}): string {
  return (
    mdToMetaDescription(operation.variants[0]?.description) ||
    `${operation.summary} endpoint in the Datadog API.`
  );
}
