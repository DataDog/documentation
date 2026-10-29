/**
 * Builds the footer view model from the websites-modules menus YAML at build
 * time. Consumers (Footer.astro) get fully resolved, structured data via
 * `getFooterData(lang)` — no inline assembly in the component template.
 * The locale is passed in because this module has no render context of its own.
 *
 * URL resolution mirrors footer_link.html: absolute URLs pass through;
 * relative URLs are prefixed with the datadoghq.com host (plus an optional
 * lang prefix once non-English pages land).
 */
import { parse as parseYaml } from "yaml";
import { z } from "zod";
import menusRaw from "@websites-modules/config/_default/menus/menus.en.yaml?raw";
import { CORP_ORIGIN } from "@config/origins";
import { useTranslations } from "@lib/i18n/i18n";
import type { Locale } from "@lib/i18n/locale";
import {
  getFooterProductCategories,
  type FooterProductCategory,
} from "@lib/componentUtils/menuData";

// ---------------------------------------------------------------------------
// Raw schema (internal)
// ---------------------------------------------------------------------------

const FooterMenuItemSchema = z.object({
  name: z.string(),
  url: z.string(),
  target: z.literal("_blank").optional(),
  weight: z.number(),
});

const FooterSocialItemSchema = FooterMenuItemSchema.extend({
  pre: z.string(),
});

const MenusFileSchema = z.object({
  footer_resources: z.array(FooterMenuItemSchema),
  footer_about: z.array(FooterMenuItemSchema),
  footer_blog: z.array(FooterMenuItemSchema),
  footer_sub: z.array(FooterMenuItemSchema),
  footer_social: z.array(FooterSocialItemSchema),
});

const menus = MenusFileSchema.parse(parseYaml(menusRaw));

// ---------------------------------------------------------------------------
// Public view-model types
// ---------------------------------------------------------------------------

export type FooterLink = {
  label: string;
  href: string;
  target?: "_blank";
};

export type FooterSocialLink = FooterLink & { pre: string };

/** The three plain-list accordion sections, in the order upstream renders them. */
export type FooterLinkSectionId = "resources" | "blog" | "about";

export type FooterLinkSection = {
  id: FooterLinkSectionId;
  title: string;
  links: FooterLink[];
};

export type FooterData = {
  /** The product column: nested categories, each with its subcategory groups. */
  product: { title: string; categories: FooterProductCategory[] };
  /** Resources / Blog / About, each a flat list of links. */
  linkSections: FooterLinkSection[];
  /** Bottom-row legal links (Privacy, Terms, …). */
  sub: FooterLink[];
  /** Bottom-row social icons. */
  social: FooterSocialLink[];
};

// ---------------------------------------------------------------------------
// Exported utilities (independently tested)
// ---------------------------------------------------------------------------

export function resolveFooterUrl(url: string, langPrefix = ""): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const trimmed = url.replace(/^\/+/, "");
  return `${CORP_ORIGIN}/${langPrefix}${trimmed}`;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

type RawItem = z.infer<typeof FooterMenuItemSchema>;
type RawSocial = z.infer<typeof FooterSocialItemSchema>;

const byWeight = <T extends { weight: number }>(a: T, b: T) =>
  a.weight - b.weight;

function toFooterLink(it: RawItem): FooterLink {
  return { label: it.name, href: resolveFooterUrl(it.url), target: it.target };
}

function sortedLinks(items: RawItem[]): FooterLink[] {
  return [...items].sort(byWeight).map(toFooterLink);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function getFooterData(lang: Locale): FooterData {
  const translate = useTranslations(lang);
  const social: FooterSocialLink[] = [...menus.footer_social]
    .sort(byWeight)
    .map((it: RawSocial) => ({
      ...toFooterLink(it),
      pre: it.pre,
      label: it.name,
    }));

  return {
    product: {
      title: translate("product"),
      categories: getFooterProductCategories(lang),
    },
    linkSections: [
      {
        id: "resources",
        title: translate("resources"),
        links: sortedLinks(menus.footer_resources),
      },
      {
        id: "blog",
        title: translate("blog"),
        links: sortedLinks(menus.footer_blog),
      },
      {
        id: "about",
        title: translate("about"),
        links: sortedLinks(menus.footer_about),
      },
    ],
    sub: sortedLinks(menus.footer_sub),
    social,
  };
}
