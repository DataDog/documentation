import { useEffect, useRef, useState } from 'preact/hooks';

export type MegaCategory = {
  identifier: string;
  label: string;
  descriptionLabel: string;
  gradient: [string, string];
  iconHtml: string;
  subcategories: MegaSubcategory[];
};

export type MegaSubcategory = {
  identifier: string;
  label: string;
  /** True for the "related_products" variant that renders with a left border. */
  related: boolean;
  sections: MegaSection[];
};

export type MegaSection = {
  label: string;
  products: { identifier: string; label: string; url: string }[];
};

interface Props {
  /** Nav-bar trigger label (already translated). */
  label: string;
  /** Trigger href. */
  href: string;
  /** The resolved, translated list of categories. */
  categories: MegaCategory[];
  /** Pricing link label + href (translated/resolved). */
  pricingLabel: string;
  pricingHref: string;
  /** "Product hype" string. */
  hype: string;
  /** Carrot SVG raw string for the pricing link. */
  carrotSvg: string;
  classes: {
    menuItem: string;
    menuItemOpen: string;
    menuLink: string;
    dropdownMenu: string;
    dropdownMenuOpen: string;
  };
}

/**
 * Product mega-menu. Category hover with a 160ms debounce, resets to
 * "observability" when the dropdown closes. Replaces Hugo's Alpine
 * `x-data` + MutationObserver scheme with local Preact state.
 */
export default function ProductMegaMenu({
  label,
  href,
  categories,
  pricingLabel,
  pricingHref,
  hype,
  carrotSvg,
  classes,
}: Props) {
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string>(categories[0]?.identifier ?? 'observability');
  const closeTimeoutRef = useRef<number | null>(null);
  const categoryTimeoutRef = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimeoutRef.current = window.setTimeout(() => setOpen(false), 150);
  };

  const clearCategoryTimer = () => {
    if (categoryTimeoutRef.current !== null) {
      window.clearTimeout(categoryTimeoutRef.current);
      categoryTimeoutRef.current = null;
    }
  };

  const scheduleCategory = (id: string) => {
    clearCategoryTimer();
    categoryTimeoutRef.current = window.setTimeout(() => setOpenCategory(id), 160);
  };

  useEffect(() => {
    // Matches Hugo's MutationObserver: when the dropdown closes, reset to the default.
    if (!open) setOpenCategory(categories[0]?.identifier ?? 'observability');
  }, [open, categories]);

  useEffect(() => () => {
    cancelClose();
    clearCategoryTimer();
  }, []);

  return (
    <li
      class={`${classes.menuItem} ${open ? classes.menuItemOpen : ''} dropdown product-dropdown`}
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      data-testid="nav-dropdown-product"
    >
      <a class={`${classes.menuLink} dropdown`} href={href}>
        <span class="menu-text">{label}</span>
      </a>
      <div
        class={`${classes.dropdownMenu} ${open ? classes.dropdownMenuOpen : ''} product-menu dropdown-menu`}
        data-testid="product-mega-menu"
      >
        <div class="product-menu__row">
          <div class="product-menu__toggleColumn">
            <p class="product-hype">{hype}</p>
            <ul class="category-toggle-list">
              {categories.map((cat) => (
                <li key={cat.identifier}>
                  <button
                    type="button"
                    class={openCategory === cat.identifier ? 'text-primary' : ''}
                    onMouseOver={() => scheduleCategory(cat.identifier)}
                    onMouseOut={clearCategoryTimer}
                    data-testid={`product-category-toggle-${cat.identifier}`}
                  >
                    <span class="category-icon" dangerouslySetInnerHTML={{ __html: cat.iconHtml }} />
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
            <a href={pricingHref} class="pricing-link">
              {pricingLabel}
              <span class="pricing-carrot" dangerouslySetInnerHTML={{ __html: carrotSvg }} />
            </a>
          </div>
          <div class="product-menu__detailColumn">
            {categories.map((cat) => (
              <div
                key={cat.identifier}
                class="product-category"
                id={`${cat.identifier}-detail`}
                style={{ display: openCategory === cat.identifier ? 'flex' : 'none' }}
                data-testid={`product-category-detail-${cat.identifier}`}
              >
                <div
                  class="category-description"
                  style={{
                    background: `linear-gradient(90deg, ${cat.gradient[0]} 0%, ${cat.gradient[1]} 100%)`,
                  }}
                >
                  <span class="category-description__icon" dangerouslySetInnerHTML={{ __html: cat.iconHtml }} />
                  <div class="info">
                    <p class="category-header">{cat.label}</p>
                    <p class="category-description-text">{cat.descriptionLabel}</p>
                  </div>
                </div>
                <div class="category-details">
                  {cat.subcategories.map((sub) => (
                    <div
                      key={sub.identifier}
                      class={`product-subcategory${sub.related ? ' related' : ''}`}
                    >
                      {sub.sections.map((section, idx) => (
                        <div key={`${sub.identifier}-${idx}`}>
                          <p class="subcategory-header">{section.label}</p>
                          <ul class="product-list">
                            {section.products.map((p) => (
                              <li key={p.identifier}>
                                <a href={p.url}>{p.label}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}
