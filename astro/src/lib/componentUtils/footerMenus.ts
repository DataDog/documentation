/**
 * Builds the footer view model from the websites-modules menus YAML at build
 * time. Consumers (Footer.astro) get fully resolved, split-into-columns data
 * via `getFooterData()` — no inline assembly in the component template.
 *
 * URL resolution mirrors footer_link.html: absolute URLs pass through;
 * relative URLs are prefixed with the datadoghq.com host (plus an optional
 * lang prefix once non-English pages land).
 */
import { parse as parseYaml } from "yaml";
import { z } from "zod";
import menusRaw from "@websites-modules/config/_default/menus/menus.en.yaml?raw";
import { CORP_ORIGIN } from "@config/typesense";
import { i18n } from "@lib/i18n/i18n";
import { getFooterProductLinks } from "@lib/componentUtils/menuData";

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

export type AccordionSectionId = "product" | "resources" | "about" | "blog";

export type FooterSection = {
  id: AccordionSectionId;
  title: string;
  firstColumn: FooterLink[];
  secondColumn: FooterLink[];
  /** Whether sub-columns stack vertically at ≥992px (true for Resources/About/Blog). */
  stackOnDesktop: boolean;
};

export type FooterData = {
  /** Four accordion columns ready to pass to FooterAccordion. */
  accordionSections: FooterSection[];
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

/** Split a list in half; the first half gets the extra item when the count is odd. */
export function splitHalves<T>(items: T[]): { first: T[]; second: T[] } {
  const len = items.length;
  const secondLen = Math.floor(len / 2);
  const firstLen = len - secondLen;
  return { first: items.slice(0, firstLen), second: items.slice(firstLen) };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

type RawItem = z.infer<typeof FooterMenuItemSchema>;
type RawSocial = z.infer<typeof FooterSocialItemSchema>;

const byWeight = <T extends { weight: number }>(a: T, b: T) => a.weight - b.weight;

function toFooterLink(it: RawItem): FooterLink {
  return { label: it.name, href: resolveFooterUrl(it.url), target: it.target };
}

function toSection(
  id: AccordionSectionId,
  title: string,
  links: FooterLink[],
  stackOnDesktop: boolean,
): FooterSection {
  const { first, second } = splitHalves(links);
  return { id, title, firstColumn: first, secondColumn: second, stackOnDesktop };
}

function sortedLinks(items: RawItem[]): FooterLink[] {
  return [...items].sort(byWeight).map(toFooterLink);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function getFooterData(): FooterData {
  const social: FooterSocialLink[] = [...menus.footer_social]
    .sort(byWeight)
    .map((it: RawSocial) => ({ ...toFooterLink(it), pre: it.pre, label: it.name }));

  return {
    accordionSections: [
      toSection("product", i18n("product"), getFooterProductLinks(), false),
      toSection("resources", i18n("resources"), sortedLinks(menus.footer_resources), true),
      toSection("about", i18n("about"), sortedLinks(menus.footer_about), true),
      toSection("blog", i18n("blog"), sortedLinks(menus.footer_blog), true),
    ],
    sub: sortedLinks(menus.footer_sub),
    social,
  };
}
