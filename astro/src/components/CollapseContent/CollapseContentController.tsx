import { useEffect, useRef } from "preact/hooks";
import {
  loadExternalContext,
  type ExternalContext,
} from "@lib/componentUtils/loadExternalContext";

interface CollapseContentControllerProps {
  externalContext: ExternalContext<{ detailsEl: string }>;
}

// Headless island. CollapseContent.astro server-renders the full
// details/summary markup; this component never receives its content. It loads
// the root <details> by id, then progressively enhances the native disclosure:
// it keeps aria-expanded in sync with the open state and supports deep-linking
// to a section by its id (mirroring Hugo's accordion-auto-open.js). The
// open/close toggle itself stays native — no JS needed for the core behavior.
export function CollapseContentController({
  externalContext,
}: CollapseContentControllerProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const loaded = loadExternalContext(externalContext);
    if (!loaded) return;
    const { detailsEl } = loaded;
    if (!(detailsEl instanceof HTMLDetailsElement)) return;

    const summary = detailsEl.querySelector<HTMLElement>(
      ".collapse-content__header",
    );

    const syncAria = (): void => {
      summary?.setAttribute("aria-expanded", String(detailsEl.open));
    };

    const handleToggle = (): void => {
      syncAria();
      if (!detailsEl.id) return;
      if (detailsEl.open) {
        history.replaceState(null, "", `#${detailsEl.id}`);
      } else if (location.hash.slice(1) === detailsEl.id) {
        history.replaceState(null, "", location.pathname + location.search);
      }
    };

    const openFromHash = (): void => {
      if (detailsEl.id && location.hash.slice(1) === detailsEl.id) {
        detailsEl.open = true;
      }
    };

    detailsEl.addEventListener("toggle", handleToggle);
    window.addEventListener("hashchange", openFromHash);

    openFromHash();
    syncAria();
    detailsEl.setAttribute("data-hydrated", "true");

    return () => {
      detailsEl.removeEventListener("toggle", handleToggle);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, []);

  return <span ref={ref} hidden aria-hidden="true" />;
}
