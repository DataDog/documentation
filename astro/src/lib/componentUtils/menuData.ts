/**
 * Builds the header view model from the Hugo menu YAML at build time.
 *
 * Consumers (Header.astro, Footer.astro) get fully translated, URL-resolved,
 * structured data via `getHeaderData()` / `getFooterProductLinks()` — no
 * `find`/`filter` over raw menu arrays in component templates.
 */
import { parse as parseYaml } from "yaml";
import { z } from "zod";
import menusRaw from "@websites-modules/data/menu_data/menus.yaml?raw";
import categoriesRaw from "@websites-modules/data/menu_data/product_categories.yaml?raw";
import productsRaw from "@websites-modules/data/menu_data/products.yaml?raw";
import { i18n } from "@lib/i18n/i18n";

// ---------------------------------------------------------------------------
// Raw schemas (internal)
// ---------------------------------------------------------------------------

const ParamsSchema = z
  .object({ disabled: z.array(z.string()).optional() })
  .optional();

const MenuChildSchema = z.object({
  identifier: z.string().optional(),
  lang_key: z.string(),
  url: z.string().optional(),
  icon: z.string().optional(),
  get children() {
    return z.array(MenuChildSchema).optional();
  },
  params: ParamsSchema,
});

type MenuChild = z.infer<typeof MenuChildSchema>;

const MenuItemSchema = z.object({
  identifier: z.string(),
  lang_key: z.string(),
  url: z.string().optional(),
  icon: z.string().optional(),
  children: z.array(MenuChildSchema).optional(),
  params: ParamsSchema,
});

type MenuItem = z.infer<typeof MenuItemSchema>;

const ProductSectionSchema = z.object({
  lang_key: z.string(),
  products: z.array(z.string()),
});

const ProductSubcategorySchema = z.object({
  identifier: z.string(),
  lang_key: z.string(),
  products: z.array(z.string()).optional(),
  sections: z.array(ProductSectionSchema).optional(),
});

const ProductCategorySchema = z.object({
  identifier: z.string(),
  lang_key: z.string(),
  description_key: z.string().optional(),
  gradient: z.tuple([z.string(), z.string()]).optional(),
  icon: z.string(),
  mobile: z.boolean().optional(),
  mobile_products: z.array(z.string()).optional(),
  children: z.array(ProductSubcategorySchema).optional(),
});

const ProductSchema = z.object({
  identifier: z.string(),
  lang_key: z.string(),
  icon: z.string().optional(),
  url: z.string(),
});

const MenusFileSchema = z.object({
  main_left: z.array(MenuItemSchema),
  main_right: z.array(MenuItemSchema),
});

const menus = MenusFileSchema.parse(parseYaml(menusRaw));
const productCategories = z
  .array(ProductCategorySchema)
  .parse(parseYaml(categoriesRaw));
const products = z.array(ProductSchema).parse(parseYaml(productsRaw));
const productById = new Map(products.map((p) => [p.identifier, p]));

// ---------------------------------------------------------------------------
// Public view-model types
// ---------------------------------------------------------------------------

export type SimpleLink = { label: string; href: string };
export type IdentifiedLink = SimpleLink & { identifier: string };

export type MegaSection = {
  label: string;
  products: { identifier: string; label: string; url: string }[];
};

export type MegaSubcategory = {
  identifier: string;
  label: string;
  /** True for the "related_products" variant that renders with a left border. */
  related: boolean;
  sections: MegaSection[];
};

export type MegaCategory = {
  identifier: string;
  label: string;
  descriptionLabel: string;
  gradient: [string, string];
  iconHtml: string;
  subcategories: MegaSubcategory[];
};

export type SolutionsColumn = {
  label: string;
  items: { label: string; url: string }[];
};

export type MobileNavLink = { identifier?: string; label: string; url: string };

export type MobileCategory = {
  identifier: string;
  label: string;
  products: MobileNavLink[];
};

export type HeaderData = {
  product: {
    label: string;
    href: string;
    megaCategories: MegaCategory[];
    carrotSvg: string;
  } | null;
  solutions: {
    label: string;
    href: string;
    columns: SolutionsColumn[];
  } | null;
  leftLinks: IdentifiedLink[];
  about: (SimpleLink & { children: SimpleLink[] }) | null;
  blog: (SimpleLink & { children: SimpleLink[] }) | null;
  login: SimpleLink | null;
  getStarted: SimpleLink | null;
  mobileItems: MobileNavLink[];
  mobileCategories: MobileCategory[];
};

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const categoryIconMap: Record<string, string> = import.meta.glob<string>(
  "../../mocked-dependencies/websites_modules/static/icons/*.svg",
  { query: "?raw", import: "default", eager: true },
);

export function iconHtml(name: string): string {
  const key = `../../mocked-dependencies/websites_modules/static/icons/${name}.svg`;
  return categoryIconMap[key] ?? "";
}

function isDisabledForDocs(item: {
  params?: { disabled?: string[] };
}): boolean {
  return Boolean(item.params?.disabled?.includes("documentation"));
}

function resolveUrl(url: string | undefined): string {
  if (!url) {
    return "#";
  }
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  if (url.startsWith("#")) {
    return url;
  }
  return `${import.meta.env.SITE}/${url.replace(/^\/+/, "")}`;
}

function findItem(list: MenuItem[], identifier: string): MenuItem | undefined {
  return list.find((m) => m.identifier === identifier);
}

function asLink(item: MenuItem | MenuChild | undefined): SimpleLink | null {
  if (!item) {
    return null;
  }
  return { label: i18n(item.lang_key), href: resolveUrl(item.url) };
}

function childLinks(item: MenuItem | undefined): SimpleLink[] {
  return (item?.children ?? []).map((c) => ({
    label: i18n(c.lang_key),
    href: resolveUrl(c.url),
  }));
}

function resolveProductList(
  ids: string[],
): { identifier: string; label: string; url: string }[] {
  const out: { identifier: string; label: string; url: string }[] = [];
  for (const id of ids) {
    const p = productById.get(id);
    if (p) {
      out.push({
        identifier: p.identifier,
        label: i18n(p.lang_key),
        url: resolveUrl(p.url),
      });
    }
  }
  return out;
}

function buildMegaCategories(): MegaCategory[] {
  return productCategories
    .filter((c) => !c.mobile)
    .map((cat) => {
      const subcategories: MegaSubcategory[] = (cat.children ?? []).map(
        (sub) => {
          const sections: MegaSection[] = sub.sections
            ? sub.sections.map((section) => ({
                label: i18n(section.lang_key),
                products: resolveProductList(section.products),
              }))
            : sub.products
              ? [
                  {
                    label: i18n(sub.lang_key),
                    products: resolveProductList(sub.products),
                  },
                ]
              : [];

          return {
            identifier: sub.identifier,
            label: i18n(sub.lang_key),
            related: sub.identifier.includes("related"),
            sections,
          };
        },
      );

      return {
        identifier: cat.identifier,
        label: i18n(cat.lang_key),
        descriptionLabel: i18n(cat.description_key ?? ""),
        gradient: cat.gradient ?? ["#000000", "#333333"],
        iconHtml: iconHtml(cat.icon),
        subcategories,
      };
    });
}

function buildSolutionsColumns(item: MenuItem | undefined): SolutionsColumn[] {
  return (item?.children ?? []).map((col) => ({
    label: i18n(col.lang_key),
    items: (col.children ?? []).map((child) => ({
      label: i18n(child.lang_key),
      url: resolveUrl(child.url),
    })),
  }));
}

function buildMobileCategories(): MobileCategory[] {
  return productCategories
    .filter((c) => c.mobile || c.mobile_products)
    .map((cat) => ({
      identifier: cat.identifier,
      label: i18n(cat.lang_key),
      products: resolveProductList(cat.mobile_products ?? []),
    }));
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function getHeaderData(): HeaderData {
  const left = menus.main_left;
  const right = menus.main_right;

  const productItem = findItem(left, "product");
  const solutionsItem = findItem(left, "solutions");
  const aboutItem = findItem(right, "about");
  const blogItem = findItem(right, "blog");
  const loginItem = findItem(right, "login");
  const getStartedItem = findItem(right, "get_started");

  return {
    product: productItem
      ? {
          label: i18n(productItem.lang_key),
          href: resolveUrl(productItem.url),
          megaCategories: buildMegaCategories(),
          carrotSvg: iconHtml("right-carrot-normal-2"),
        }
      : null,
    solutions: solutionsItem
      ? {
          label: i18n(solutionsItem.lang_key),
          href: resolveUrl(solutionsItem.url),
          columns: buildSolutionsColumns(solutionsItem),
        }
      : null,
    leftLinks: left
      .filter(
        (m) =>
          m.identifier !== "product" &&
          m.identifier !== "solutions" &&
          m.identifier !== "search" &&
          !isDisabledForDocs(m),
      )
      .map((m) => ({
        identifier: m.identifier,
        label: i18n(m.lang_key),
        href: resolveUrl(m.url),
      })),
    about: aboutItem
      ? { ...asLink(aboutItem)!, children: childLinks(aboutItem) }
      : null,
    blog: blogItem
      ? { ...asLink(blogItem)!, children: childLinks(blogItem) }
      : null,
    login:
      loginItem && !isDisabledForDocs(loginItem) ? asLink(loginItem) : null,
    getStarted: asLink(getStartedItem),
    mobileItems: left
      .filter((m) => !isDisabledForDocs(m))
      .map((m) => ({
        identifier: m.identifier,
        label: i18n(m.lang_key),
        url: resolveUrl(m.url),
      })),
    mobileCategories: buildMobileCategories(),
  };
}

/**
 * Flat, deduped list of all products that appear in the desktop mega menu.
 * The footer's product column consumes this — Hugo's `$datadir.menu_data.products`
 * equivalent, ordered by first appearance in the category tree.
 */
export function getFooterProductLinks(): SimpleLink[] {
  const seen = new Set<string>();
  const out: SimpleLink[] = [];
  for (const cat of productCategories) {
    for (const sub of cat.children ?? []) {
      const ids =
        sub.products ?? (sub.sections ?? []).flatMap((s) => s.products);
      for (const id of ids) {
        if (seen.has(id)) {
          continue;
        }
        seen.add(id);
        const p = productById.get(id);
        if (p) {
          out.push({ label: i18n(p.lang_key), href: resolveUrl(p.url) });
        }
      }
    }
  }
  return out;
}
