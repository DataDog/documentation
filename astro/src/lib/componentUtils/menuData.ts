/**
 * Typed loader for the Hugo nav data. Parses the copied-verbatim YAML at build
 * time and exposes the `main_left`, `main_right`, product categories, and
 * product lookup as strongly-typed shapes.
 */
import { parse as parseYaml } from "yaml";
import { z } from "zod";
// @ts-ignore — Vite raw import
import menusRaw from "@websites-modules/data/menu_data/menus.yaml?raw";
// @ts-ignore — Vite raw import
import categoriesRaw from "@websites-modules/data/menu_data/product_categories.yaml?raw";
// @ts-ignore — Vite raw import
import productsRaw from "@websites-modules/data/menu_data/products.yaml?raw";

const ParamsSchema = z
  .object({ disabled: z.array(z.string()).optional() })
  .optional();

// Getter syntax lets the property resolve after MenuChildSchema is fully
// defined, handling self-reference without z.lazy.
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

export type MenuChild = z.infer<typeof MenuChildSchema>;

const MenuItemSchema = z.object({
  identifier: z.string(),
  lang_key: z.string(),
  url: z.string().optional(),
  icon: z.string().optional(),
  children: z.array(MenuChildSchema).optional(),
  params: ParamsSchema,
});

export type MenuItem = z.infer<typeof MenuItemSchema>;

const ProductSectionSchema = z.object({
  lang_key: z.string(),
  products: z.array(z.string()),
});

export type ProductSection = z.infer<typeof ProductSectionSchema>;

const ProductSubcategorySchema = z.object({
  identifier: z.string(),
  lang_key: z.string(),
  products: z.array(z.string()).optional(),
  sections: z.array(ProductSectionSchema).optional(),
});

export type ProductSubcategory = z.infer<typeof ProductSubcategorySchema>;

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

export type ProductCategory = z.infer<typeof ProductCategorySchema>;

const ProductSchema = z.object({
  identifier: z.string(),
  lang_key: z.string(),
  icon: z.string().optional(),
  url: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

const MenusFileSchema = z.object({
  main_left: z.array(MenuItemSchema),
  main_right: z.array(MenuItemSchema),
});

const menus = MenusFileSchema.parse(parseYaml(menusRaw));
const productCategories = z.array(ProductCategorySchema).parse(parseYaml(categoriesRaw));
const products = z.array(ProductSchema).parse(parseYaml(productsRaw));

const productById = new Map(products.map((p) => [p.identifier, p]));

export function getMainLeft(): MenuItem[] {
  return menus.main_left;
}

export function getMainRight(): MenuItem[] {
  return menus.main_right;
}

export function getProductCategories(): ProductCategory[] {
  return productCategories;
}

/** Desktop mega-menu only shows non-mobile categories. */
export function getDesktopCategories(): ProductCategory[] {
  return productCategories.filter((c) => !c.mobile);
}

/** Mobile nav only shows mobile-flagged categories. */
export function getMobileCategories(): ProductCategory[] {
  return productCategories.filter((c) => c.mobile || c.mobile_products);
}

export function getProduct(identifier: string): Product | undefined {
  return productById.get(identifier);
}

/**
 * Mirrors Hugo's behavior: an item is hidden on docs when `params.disabled`
 * contains the repo name. We hard-code "documentation" since the Astro site
 * only serves docs content.
 */
export function isDisabledForDocs(item: {
  params?: { disabled?: string[] };
}): boolean {
  return Boolean(item.params?.disabled?.includes("documentation"));
}

/**
 * Resolve a menu entry's URL to an absolute href. Hugo normalizes with
 * `absLangURL`; the Astro port mirrors that by resolving relative paths
 * against the configured site origin so the header behaves identically
 * across dev, staging, and production.
 */
export function resolveUrl(url: string | undefined): string {
  if (!url) return "#";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("#")) return url;
  return `${import.meta.env.SITE}/${url.replace(/^\/+/, "")}`;
}
