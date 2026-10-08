/**
 * Mobile accordion behavior for the footer nav. Renders nothing — the markup
 * lives in `FooterNav.astro` (see its header comment for why) and this island
 * only wires up the toggles found through the `data-footer-*` hooks.
 *
 * Ports the Alpine state of websites-modules `layouts/partials/footer.html`:
 * `mobile` (below the tablet breakpoint), one `openSection` at a time, and one
 * `openCategory` at a time inside the Product section. Above the breakpoint the
 * headers are inert (`:disabled="!mobile"`) and CSS forces every panel open, so
 * the controller only has to keep the ARIA state honest.
 */
import { useEffect } from "preact/hooks";
import {
  loadExternalContext,
  type ExternalContext,
} from "@lib/componentUtils/loadExternalContext";
import { belowTabletMediaQuery } from "@lib/cssUtils/breakpoints";

interface Props {
  externalContext: ExternalContext<{ nav: string }>;
  /**
   * Hashed + static BEM class pairs from `cl()`, passed in because the island
   * renders no markup of its own and so has no CSS module scope.
   */
  openClass: string;
  openCategoryClass: string;
  openHeaderClass: string;
  openCategoryHeaderClass: string;
}

/** One header button and the panel it controls. */
type Disclosure = {
  header: HTMLButtonElement;
  panel: HTMLElement;
};

export default function FooterAccordionController({
  externalContext,
  openClass,
  openCategoryClass,
  openHeaderClass,
  openCategoryHeaderClass,
}: Props) {
  useEffect(() => {
    const loaded = loadExternalContext(externalContext);
    if (!loaded) {
      return;
    }
    return attachAccordion(loaded.nav, {
      openClass,
      openCategoryClass,
      openHeaderClass,
      openCategoryHeaderClass,
    });
  }, []);

  return null;
}

type Classes = {
  openClass: string;
  openCategoryClass: string;
  openHeaderClass: string;
  openCategoryHeaderClass: string;
};

function attachAccordion(nav: HTMLElement, classes: Classes): () => void {
  const sections = collectDisclosures(
    nav,
    "[data-footer-section]",
    "[data-footer-section-toggle]",
    "[data-footer-section-panel]",
  );
  const categories = collectDisclosures(
    nav,
    "[data-footer-category]",
    "[data-footer-category-toggle]",
    "[data-footer-category-panel]",
  );

  let openSection: HTMLElement | null = null;
  let openCategory: HTMLElement | null = null;

  const mobileQuery = window.matchMedia(belowTabletMediaQuery());
  let mobile = mobileQuery.matches;

  function render() {
    for (const { header, panel } of sections) {
      setDisclosure(header, panel, {
        // Upstream keeps these two states distinct:
        // `isVisible` = `!mobile || openSection === name`
        // `isOpen`    = `mobile && openSection === name`
        // Above the breakpoint every panel shows, but no header is "open" —
        // the open state is what paints the heading in the accent color, and
        // Hugo renders the desktop headings white.
        isVisible: !mobile || panel === openSection,
        isOpen: mobile && panel === openSection,
        mobile,
        panelOpen: classes.openClass,
        headerOpen: classes.openHeaderClass,
      });
    }
    for (const { header, panel } of categories) {
      setDisclosure(header, panel, {
        isVisible: !mobile || panel === openCategory,
        isOpen: mobile && panel === openCategory,
        mobile,
        panelOpen: classes.openCategoryClass,
        headerOpen: classes.openCategoryHeaderClass,
      });
    }
  }

  function onClick(event: MouseEvent) {
    if (!mobile) {
      return;
    }
    const target = event.target as HTMLElement | null;
    const sectionToggle = target?.closest("[data-footer-section-toggle]");
    const categoryToggle = target?.closest("[data-footer-category-toggle]");

    if (categoryToggle) {
      const panel = panelFor(categories, categoryToggle);
      openCategory = openCategory === panel ? null : panel;
    } else if (sectionToggle) {
      const panel = panelFor(sections, sectionToggle);
      openSection = openSection === panel ? null : panel;
      // Collapsing or switching sections drops whatever category was open
      // inside the one being left, matching upstream's `openCategory = ''`.
      openCategory = null;
    } else {
      return;
    }
    render();
  }

  function onBreakpointChange() {
    mobile = mobileQuery.matches;
    if (!mobile) {
      openSection = null;
      openCategory = null;
    }
    render();
  }

  nav.addEventListener("click", onClick);
  mobileQuery.addEventListener("change", onBreakpointChange);
  render();

  return () => {
    nav.removeEventListener("click", onClick);
    mobileQuery.removeEventListener("change", onBreakpointChange);
  };
}

function collectDisclosures(
  nav: HTMLElement,
  wrapperSelector: string,
  toggleSelector: string,
  panelSelector: string,
): Disclosure[] {
  const disclosures: Disclosure[] = [];
  for (const wrapper of nav.querySelectorAll<HTMLElement>(wrapperSelector)) {
    const header = wrapper.querySelector<HTMLButtonElement>(toggleSelector);
    const panel = wrapper.querySelector<HTMLElement>(panelSelector);
    if (header && panel) {
      disclosures.push({ header, panel });
    }
  }
  return disclosures;
}

function panelFor(
  disclosures: Disclosure[],
  toggle: Element,
): HTMLElement | null {
  return disclosures.find((d) => d.header === toggle)?.panel ?? null;
}

type DisclosureState = {
  /** Panel shown: `!mobile || openX === name`. Also drives `aria-expanded`. */
  isVisible: boolean;
  /** Header marked open (accent color, rotated caret): `mobile && openX === name`. */
  isOpen: boolean;
  mobile: boolean;
  panelOpen: string;
  headerOpen: string;
};

function setDisclosure(
  header: HTMLButtonElement,
  panel: HTMLElement,
  state: DisclosureState,
) {
  toggleClasses(panel, state.panelOpen, state.isVisible);
  toggleClasses(header, state.headerOpen, state.isOpen);
  header.setAttribute("aria-expanded", String(state.isVisible));
  header.disabled = !state.mobile;
}

/**
 * `cl()` returns the hashed and the static BEM class as one space-separated
 * string, and `classList.toggle` rejects a token containing whitespace.
 */
function toggleClasses(el: HTMLElement, classNames: string, on: boolean) {
  for (const name of classNames.split(/\s+/).filter(Boolean)) {
    el.classList.toggle(name, on);
  }
}
