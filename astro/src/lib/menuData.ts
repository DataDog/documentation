/**
 * Typed loader for the Hugo nav data. Parses the copied-verbatim YAML at build
 * time and exposes the `main_left`, `main_right`, product categories, and
 * product lookup as strongly-typed shapes.
 */
import { parse as parseYaml } from 'yaml';
// @ts-ignore — Vite raw import
import menusRaw from '../mocked_dependencies/websites_modules/data/menu_data/menus.yaml?raw';
// @ts-ignore — Vite raw import
import categoriesRaw from '../mocked_dependencies/websites_modules/data/menu_data/product_categories.yaml?raw';
// @ts-ignore — Vite raw import
import productsRaw from '../mocked_dependencies/websites_modules/data/menu_data/products.yaml?raw';

export type MenuChild = {
  identifier?: string;
  lang_key: string;
  url?: string;
  icon?: string;
  children?: MenuChild[];
  params?: { disabled?: string[] };
};

export type MenuItem = {
  identifier: string;
  lang_key: string;
  url?: string;
  icon?: string;
  children?: MenuChild[];
  params?: { disabled?: string[] };
};

export type ProductSection = {
  lang_key: string;
  products: string[];
};

export type ProductSubcategory = {
  identifier: string;
  lang_key: string;
  products?: string[];
  sections?: ProductSection[];
};

export type ProductCategory = {
  identifier: string;
  lang_key: string;
  description_key?: string;
  gradient?: [string, string];
  icon: string;
  mobile?: boolean;
  mobile_products?: string[];
  children?: ProductSubcategory[];
};

export type Product = {
  identifier: string;
  lang_key: string;
  icon?: string;
  url: string;
};

type MenusFile = {
  main_left: MenuItem[];
  main_right: MenuItem[];
};

const menus = parseYaml(menusRaw) as MenusFile;
const productCategories = parseYaml(categoriesRaw) as ProductCategory[];
const products = parseYaml(productsRaw) as Product[];

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
 * only serves docs content for now.
 */
export function isDisabledForDocs(item: { params?: { disabled?: string[] } }): boolean {
  return Boolean(item.params?.disabled?.includes('documentation'));
}

/**
 * Resolve a menu entry's URL to an absolute href. Hugo normalizes with
 * `absLangURL`; the Astro port assumes the datadoghq.com host for external
 * links and "/" for relative ones so the header behaves identically when
 * mounted under a docs subpath.
 */
export function resolveUrl(url: string | undefined): string {
  if (!url) return '#';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('#')) return url;
  return `https://www.datadoghq.com/${url.replace(/^\/+/, '')}`;
}
