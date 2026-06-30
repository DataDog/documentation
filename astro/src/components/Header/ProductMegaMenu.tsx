import { useEffect, useRef, useState } from 'preact/hooks';
import type { MegaCategory, MegaSubcategory, MegaSection } from "@lib/componentUtils/menuData.ts";
import styles from './Header.module.css';
import { classListFactory } from '@lib/cssUtils/classListFactory';

export type { MegaCategory, MegaSubcategory, MegaSection };

const cl = classListFactory(styles);

export interface ProductMegaMenuLabels {
  trigger: string;
  pricing: string;
  hype: string;
}

export interface ProductMegaMenuHrefs {
  product: string;
  pricing: string;
}

export interface ProductMegaMenuSvgs {
  carrot: string;
}

interface Props {
  labels: ProductMegaMenuLabels;
  hrefs: ProductMegaMenuHrefs;
  /** The resolved, translated list of categories. */
  categories: MegaCategory[];
  svgs: ProductMegaMenuSvgs;
}

/**
 * Product mega-menu. Category hover with a 160ms debounce, resets to
 * "observability" when the dropdown closes. Replaces Hugo's Alpine
 * `x-data` + MutationObserver scheme with local Preact state.
 */
export default function ProductMegaMenu({
  labels,
  hrefs,
  categories,
  svgs,
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
      class={`${cl('header__menu-item', open && 'header__menu-item--open')} dropdown product-dropdown`}
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <a class={`${cl('header__menu-link')} dropdown`} href={hrefs.product}>
        <span class={cl('header__menu-text')}>{labels.trigger}</span>
      </a>
      <div
        class={`${cl('header__dropdown-menu', open && 'header__dropdown-menu--open')} ${cl('product-menu')} dropdown-menu`}
      >
        <div class={cl('product-menu__row')}>
          <div class={cl('product-menu__toggle-column')}>
            <p class={cl('product-menu__hype')}>{labels.hype}</p>
            <ul class={cl('product-menu__category-list')}>
              {categories.map((cat) => (
                <li key={cat.identifier}>
                  <button
                    type="button"
                    class={`${cl('product-menu__category-toggle', openCategory === cat.identifier && 'product-menu__category-toggle--active')} product-menu__category-toggle--${cat.identifier}`}
                    onMouseOver={() => scheduleCategory(cat.identifier)}
                    onMouseOut={clearCategoryTimer}
                  >
                    <span class={cl('product-menu__category-icon')} dangerouslySetInnerHTML={{ __html: cat.iconHtml }} />
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
            <a href={hrefs.pricing} class={cl('product-menu__pricing-link')}>
              {labels.pricing}
              <span class={cl('product-menu__pricing-carrot')} dangerouslySetInnerHTML={{ __html: svgs.carrot }} />
            </a>
          </div>
          <div class={cl('product-menu__detail-column')}>
            {categories.map((cat) => (
              <CategoryDetail
                key={cat.identifier}
                category={cat}
                open={openCategory === cat.identifier}
              />
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

interface CategoryDetailProps {
  category: MegaCategory;
  open: boolean;
}

function CategoryDetail({ category: cat, open }: CategoryDetailProps) {
  return (
    <div
      class={`${cl('product-menu__category', open && 'product-menu__category--active')} product-menu__category--${cat.identifier}`}
      id={`${cat.identifier}-detail`}
    >
      <div
        class={cl('product-menu__category-description')}
        style={{ background: `linear-gradient(90deg, ${cat.gradient[0]} 0%, ${cat.gradient[1]} 100%)` }}
      >
        <span class={cl('product-menu__category-description-icon')} dangerouslySetInnerHTML={{ __html: cat.iconHtml }} />
        <div class={cl('product-menu__info')}>
          <p class={cl('product-menu__category-header')}>{cat.label}</p>
          <p class={cl('product-menu__category-description-text')}>{cat.descriptionLabel}</p>
        </div>
      </div>
      <div class={cl('product-menu__category-details')}>
        {cat.subcategories.map((sub) => (
          <div
            key={sub.identifier}
            class={cl('product-menu__subcategory', sub.related && 'product-menu__subcategory--related')}
          >
            {sub.sections.map((section, idx) => (
              <div key={`${sub.identifier}-${idx}`}>
                <p class={cl('product-menu__subcategory-header')}>{section.label}</p>
                <ul class={cl('product-menu__list')}>
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
  );
}
