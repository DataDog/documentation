import { useEffect, useState } from 'preact/hooks';
import styles from './MobileNav.module.css';
import {
  getMainLeft,
  getMobileCategories,
  getProduct,
  isDisabledForDocs,
  resolveUrl,
} from '../../lib/menuData';
import { i18n } from '../../lib/i18n';

interface Props {
  classes: {
    hamburger: string;
    hamburgerOpen: string;
    hamburgerBar: string;
  };
}

/**
 * Mobile nav overlay — hamburger-triggered side panel for docs. Ports
 * ~/dd/websites-modules/layouts/partials/nav/mobile-documentation.html,
 * minus live Algolia search (stubbed input for now, per plan).
 */
export default function MobileNav({ classes }: Props) {
  const [open, setOpen] = useState(false);
  const mainLeft = getMainLeft().filter((m) => !isDisabledForDocs(m));
  const categories = getMobileCategories();

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
          <a href="https://www.datadoghq.com">{i18n('home')}</a>
          <a href="/">{i18n('docs') || 'Docs'}</a>
          <a href="/api/">{i18n('api')}</a>
        </div>

        <div class={styles.searchWrap}>
          <input
            class={styles.searchInput}
            type="search"
            placeholder="Search"
            aria-label="Search"
            data-testid="mobile-nav-search"
          />
        </div>

        <ul class={styles.list}>
          {mainLeft.map((item) => (
            <li key={item.identifier}>
              <a class={styles.itemLink} href={resolveUrl(item.url)}>
                {i18n(item.lang_key)}
              </a>
            </li>
          ))}

          {/* Mobile-only product list — flattened from the categories */}
          <li>
            <div id="product-mobile-menu">
              {categories.map((cat) => (
                <div key={cat.identifier}>
                  <p class={styles.productCategory}>{i18n(cat.lang_key)}</p>
                  <ul class={styles.productSublist}>
                    {(cat.mobile_products ?? []).map((id) => {
                      const p = getProduct(id);
                      if (!p) return null;
                      return (
                        <li key={id}>
                          <a href={resolveUrl(p.url)}>{i18n(p.lang_key)}</a>
                        </li>
                      );
                    })}
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
