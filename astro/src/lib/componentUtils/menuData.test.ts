/**
 * Guards the header/footer view model against the upstream `product_categories.yaml`
 * shape. In websites-modules v1.4.319 the `products` lists changed from plain
 * identifier strings to objects (`{ identifier, secondary? }`), which broke the
 * module's top-level Zod parse outright.
 *
 * These tests read the real `@websites-modules` data rather than a fixture — the
 * module parses it at import time, so there is no seam to inject through. To stay
 * stable as upstream adds and removes products, the expectations are *derived*
 * from the same raw YAML instead of hardcoding identifiers: the invariant under
 * test is the relationship between `secondary` and the two consumers, not any
 * particular product's membership.
 */
import { describe, expect, it } from "vitest";
import { parse as parseYaml } from "yaml";
import categoriesRaw from "@websites-modules/data/menu_data/product_categories.yaml?raw";
import productsRaw from "@websites-modules/data/menu_data/products.yaml?raw";
import { getFooterProductCategories, getHeaderData } from "./menuData";

type RawProductRef = { identifier: string; secondary?: boolean };
type RawSubcategory = {
  identifier: string;
  lang_key?: string;
  products?: RawProductRef[];
  sections?: { lang_key?: string; products?: RawProductRef[] }[];
};
type RawCategory = {
  identifier: string;
  mobile?: boolean;
  children?: RawSubcategory[];
};

const rawCategories = parseYaml(categoriesRaw) as RawCategory[];
const rawProducts = parseYaml(productsRaw) as { identifier: string }[];
const knownProductIds = new Set(rawProducts.map((p) => p.identifier));

/** Every product reference in the category tree, flattened. */
function allProductRefs(categories: RawCategory[]): RawProductRef[] {
  return categories.flatMap((category) =>
    (category.children ?? []).flatMap((sub) => [
      ...(sub.products ?? []),
      ...(sub.sections ?? []).flatMap((section) => section.products ?? []),
    ]),
  );
}

const refs = allProductRefs(rawCategories);

/**
 * Identifiers that are `secondary` at *every* appearance — only those are
 * absent from the footer. A product can be secondary in one category and
 * primary in another (`agent-observability` is secondary under Observability
 * but primary under AI), in which case the primary appearance carries it into
 * the footer. Restricted to ids resolvable in `products.yaml`, since an unknown
 * id is dropped for an unrelated reason.
 */
const alwaysSecondaryIds = [
  ...new Set(
    refs
      .filter((ref) => ref.secondary && knownProductIds.has(ref.identifier))
      .map((ref) => ref.identifier),
  ),
].filter((identifier) =>
  refs
    .filter((ref) => ref.identifier === identifier)
    .every((ref) => ref.secondary),
);

/** Identifiers that are primary at least once, so they must reach the footer. */
const everPrimaryIds = new Set(
  refs
    .filter((ref) => !ref.secondary && knownProductIds.has(ref.identifier))
    .map((ref) => ref.identifier),
);

const rawProductById = new Map(
  (rawProducts as { identifier: string; url: string }[]).map((p) => [
    p.identifier,
    p,
  ]),
);

/** Mirrors `resolveUrl` in menuData.ts. */
function expectedHref(url: string): string {
  if (/^https?:\/\//.test(url) || url.startsWith("#")) {
    return url;
  }
  return `${import.meta.env.SITE}/${url.replace(/^\/+/, "")}`;
}

/** Every footer product link, flattened out of the nested category model. */
function footerHrefs(): string[] {
  return getFooterProductCategories("en").flatMap((category) =>
    category.groups.flatMap((group) => group.products.map((p) => p.href)),
  );
}

/**
 * The footer links the code should produce: every product reference in the
 * category tree in order, skipping `secondary` ones and identifiers with no
 * `products.yaml` entry.
 *
 * Unlike the old flat column this is *not* deduped — upstream renders each
 * category's own list, so a product that is primary in two categories appears
 * in both. Nothing is deduped by URL either: two distinct products can
 * legitimately share one (`product/ai/mcp-server/` is used twice upstream).
 */
function expectedFooterHrefs(): string[] {
  const hrefs: string[] = [];
  for (const category of rawCategories) {
    if (!(category.children ?? []).length) {
      continue;
    }
    for (const sub of category.children ?? []) {
      for (const section of sub.sections ?? [sub]) {
        for (const ref of section.products ?? []) {
          if (ref.secondary) {
            continue;
          }
          const product = rawProductById.get(ref.identifier);
          if (product) {
            hrefs.push(expectedHref(product.url));
          }
        }
      }
    }
  }
  return hrefs;
}

function footerIncludes(identifier: string): boolean {
  const product = rawProductById.get(identifier);
  if (!product) {
    throw new Error(`no products.yaml entry for ${identifier}`);
  }
  return footerHrefs().includes(expectedHref(product.url));
}

function megaMenuIdentifiers(): string[] {
  const product = getHeaderData("en").product;
  if (!product) {
    throw new Error("header data has no product menu");
  }
  return product.megaCategories.flatMap((category) =>
    category.subcategories.flatMap((sub) =>
      sub.sections.flatMap((section) =>
        section.products.map((p) => p.identifier),
      ),
    ),
  );
}

describe("product_categories.yaml schema", () => {
  it("parses the object form of `products` entries", () => {
    // A string-typed schema throws at import; reaching an assertion at all
    // means the parse succeeded.
    expect(refs.length).toBeGreaterThan(0);
    for (const ref of refs) {
      expect(typeof ref.identifier).toBe("string");
    }
  });

  it("still builds a non-empty mega menu", () => {
    expect(megaMenuIdentifiers().length).toBeGreaterThan(0);
  });
});

describe("getFooterProductCategories", () => {
  it("omits categories with no children, as the footer partial does", () => {
    const withChildren = rawCategories.filter(
      (category) => (category.children ?? []).length > 0,
    );
    expect(withChildren.length).toBeLessThan(rawCategories.length);
    expect(getFooterProductCategories("en").map((c) => c.identifier)).toEqual(
      withChildren.map((category) => category.identifier),
    );
  });

  it("labels every category and gives it an inline icon", () => {
    for (const category of getFooterProductCategories("en")) {
      expect(
        category.label,
        `${category.identifier} has no label`,
      ).toBeTruthy();
      expect(category.iconHtml).toContain("<svg");
    }
  });

  it("folds an unlabelled continuation group into the one before it", () => {
    // Upstream: a child with no `lang_key` continues the previous subcategory,
    // so the footer renders one list rather than a second, headingless one.
    const categories = getFooterProductCategories("en");
    const continuationsExist = rawCategories
      .filter((category) => (category.children ?? []).length > 0)
      .flatMap((category) => category.children ?? [])
      .some((sub) => !sub.lang_key);
    expect(continuationsExist).toBe(true);

    for (const category of categories) {
      const unlabelled = category.groups.filter((group) => !group.label);
      // Only a leading group may lack a label; any later one would have been
      // folded into its predecessor.
      for (const group of unlabelled) {
        expect(category.groups.indexOf(group)).toBe(0);
      }
    }
  });

  it("would omit a product that is `secondary` everywhere", () => {
    // Mirrors websites-modules `layouts/partials/footer.html`:
    //   {{/* `secondary` products stay in the main nav but are omitted here */}}
    //   {{ if not .secondary }}
    //
    // No product is currently secondary at every appearance — upstream uses the
    // flag only to mark a *repeat* listing — so this asserts the data shape the
    // filter is written against rather than a live exclusion.
    expect(alwaysSecondaryIds).toEqual([]);
    for (const identifier of alwaysSecondaryIds) {
      expect(
        footerIncludes(identifier),
        `${identifier} is secondary everywhere and must not appear in the footer`,
      ).toBe(false);
    }
  });

  it("keeps products that are primary at least once", () => {
    expect(everPrimaryIds.size).toBeGreaterThan(0);
    for (const identifier of everPrimaryIds) {
      expect(
        footerIncludes(identifier),
        `${identifier} is primary somewhere and must appear in the footer`,
      ).toBe(true);
    }
  });

  it("matches the expected links exactly, in order", () => {
    expect(footerHrefs()).toEqual(expectedFooterHrefs());
  });
});

describe("continuation columns", () => {
  const continuationIds = rawCategories
    .flatMap((category) => category.children ?? [])
    .filter((sub) => !sub.lang_key)
    .map((sub) => sub.identifier);

  it("are present in the upstream data", () => {
    expect(continuationIds.length).toBeGreaterThan(0);
  });

  it("produce a section with no label, so the renderer emits a spacer", () => {
    const product = getHeaderData("en").product;
    const subsById = new Map(
      (product?.megaCategories ?? [])
        .flatMap((category) => category.subcategories)
        .map((sub) => [sub.identifier, sub]),
    );

    for (const identifier of continuationIds) {
      const sub = subsById.get(identifier);
      expect(sub, `${identifier} missing from the mega menu`).toBeDefined();
      expect(sub?.label).toBeUndefined();
      // The products still render; only the heading is suppressed.
      expect(sub?.sections).toHaveLength(1);
      expect(sub?.sections[0].label).toBeUndefined();
      expect(sub?.sections[0].products.length).toBeGreaterThan(0);
    }
  });

  it("labels every non-continuation subcategory", () => {
    const labelledIds = new Set(
      rawCategories
        .flatMap((category) => category.children ?? [])
        .filter((sub) => sub.lang_key)
        .map((sub) => sub.identifier),
    );
    const subs = (getHeaderData("en").product?.megaCategories ?? []).flatMap(
      (category) => category.subcategories,
    );

    for (const sub of subs.filter((s) => labelledIds.has(s.identifier))) {
      expect(sub.label, `${sub.identifier} should have a label`).toBeTruthy();
    }
  });
});

describe("mega menu", () => {
  it("keeps `secondary` products in the main nav", () => {
    const inMenu = new Set(megaMenuIdentifiers());
    const secondaryIds = [
      ...new Set(
        refs
          .filter((ref) => ref.secondary && knownProductIds.has(ref.identifier))
          .map((ref) => ref.identifier),
      ),
    ];
    expect(secondaryIds.length).toBeGreaterThan(0);
    for (const identifier of secondaryIds) {
      expect(
        inMenu.has(identifier),
        `${identifier} is secondary but should still be in the mega menu`,
      ).toBe(true);
    }
  });
});
