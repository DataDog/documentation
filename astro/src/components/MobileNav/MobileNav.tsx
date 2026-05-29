import { useEffect, useState } from 'preact/hooks';
import styles from './MobileNav.module.css';
import { classListFactory } from '@lib/cssUtils/classListFactory';

const cl = classListFactory(styles);

interface NavLink {
  identifier?: string;
  label: string;
  url: string;
}

interface MobileCategory {
  identifier: string;
  label: string;
  products: NavLink[];
}

export interface MobileNavLabels {
  "Toggle navigation": string;
  home: string;
  docs: string;
  api: string;
}

interface Props {
  search: { placeholder: string; ariaLabel: string };
  items: NavLink[];
  categories: MobileCategory[];
  labels: MobileNavLabels;
}

export default function MobileNav({ search, items, categories, labels }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.documentElement.style.overflow = 'hidden';
    else document.documentElement.style.overflow = '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        class={`${cl('mobile-nav__hamburger')} ${open ? cl('mobile-nav__hamburger--open') : ''} navbar-toggler`}
        aria-expanded={open}
        aria-label={labels["Toggle navigation"]}
        onClick={() => setOpen((o) => !o)}
      >
        <span class={cl('mobile-nav__hamburger-bar')}></span>
        <span class={cl('mobile-nav__hamburger-bar')}></span>
        <span class={cl('mobile-nav__hamburger-bar')}></span>
        <span class={cl('mobile-nav__hamburger-bar')}></span>
      </button>

      <div
        id="mobile-nav-bg"
        class={`${styles.bg} ${open ? styles['bg--open'] : ''}`}
        onClick={() => setOpen(false)}
      />

      <div
        id="mobile-nav"
        class={`${styles.mobileNav} ${open ? styles['mobileNav--open'] : ''}`}
      >
        <div class={styles.quicknav}>
          <a href="https://www.datadoghq.com">{labels.home}</a>
          <a href="/">{labels.docs}</a>
          <a href="/api/">{labels.api}</a>
        </div>

        <div class={styles.searchWrap}>
          <input
            class={`${styles.searchInput} mobile-nav__search`}
            type="search"
            placeholder={search.placeholder}
            aria-label={search.ariaLabel}
          />
        </div>

        <ul class={styles.list}>
          {items.map((item) => (
            <li key={item.identifier ?? item.url}>
              <a class={styles.itemLink} href={item.url}>
                {item.label}
              </a>
            </li>
          ))}

          {/* Mobile-only product list — flattened from the categories */}
          <li>
            <div id="product-mobile-menu">
              {categories.map((cat) => (
                <div key={cat.identifier}>
                  <p class={styles.productCategory}>{cat.label}</p>
                  <ul class={styles.productSublist}>
                    {cat.products.map((p) => (
                      <li key={p.identifier ?? p.url}>
                        <a href={p.url}>{p.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
