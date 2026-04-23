import { useEffect, useState } from 'preact/hooks';
import styles from './MobileNav.module.css';

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

interface Props {
  classes: {
    hamburger: string;
    hamburgerOpen: string;
    hamburgerBar: string;
  };
  quicknav: { home: string; docs: string; api: string };
  search: { placeholder: string; ariaLabel: string };
  items: NavLink[];
  categories: MobileCategory[];
}

export default function MobileNav({ classes, quicknav, search, items, categories }: Props) {
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
        class={`${classes.hamburger} ${open ? classes.hamburgerOpen : ''} navbar-toggler`}
        aria-expanded={open}
        aria-label="Toggle navigation"
        onClick={() => setOpen((o) => !o)}
        data-testid="mobile-nav-toggle"
      >
        <span class={classes.hamburgerBar}></span>
        <span class={classes.hamburgerBar}></span>
        <span class={classes.hamburgerBar}></span>
        <span class={classes.hamburgerBar}></span>
      </button>

      <div
        id="mobile-nav-bg"
        class={`${styles.bg} ${open ? styles['bg--open'] : ''}`}
        onClick={() => setOpen(false)}
        data-testid="mobile-nav-bg"
      />

      <div
        id="mobile-nav"
        class={`${styles.mobileNav} ${open ? styles['mobileNav--open'] : ''}`}
        data-testid="mobile-nav"
      >
        <div class={styles.quicknav}>
          <a href="https://www.datadoghq.com">{quicknav.home}</a>
          <a href="/">{quicknav.docs}</a>
          <a href="/api/">{quicknav.api}</a>
        </div>

        <div class={styles.searchWrap}>
          <input
            class={styles.searchInput}
            type="search"
            placeholder={search.placeholder}
            aria-label={search.ariaLabel}
            data-testid="mobile-nav-search"
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
