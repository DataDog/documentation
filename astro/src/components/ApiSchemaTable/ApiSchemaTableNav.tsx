import { useEffect, useRef } from "preact/hooks";
import styles from "./ApiSchemaTable.module.css";
import { addStyleFactory } from "@lib/cssUtils/addStyleFactory";
import { removeStyleFactory } from "@lib/cssUtils/removeStyleFactory";
import {
  loadExternalContext,
  type ExternalContext,
} from "@lib/componentUtils/loadExternalContext";

const addStyle = addStyleFactory(styles);
const removeStyle = removeStyleFactory(styles);

interface ApiSchemaTableNavProps {
  externalContext: ExternalContext<{
    tableEl: string;
    expandAllEl?: string;
  }>;
}

// Tiny island that wires up expand/collapse on a server-rendered schema
// table. The full row tree is rendered statically by ApiSchemaTable.astro;
// this component never receives the schema data — it just toggles BEM
// modifier classes and the `hidden` attribute on the existing DOM.
export function ApiSchemaTableNav({ externalContext }: ApiSchemaTableNavProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const loaded = loadExternalContext(externalContext);
    if (!loaded) return;
    const { tableEl, expandAllEl } = loaded;

    const setRowExpanded = (
      toggleBtn: HTMLElement,
      expanded: boolean,
    ): void => {
      const row = toggleBtn.closest<HTMLElement>(".schema-table__row");
      const childrenEl = row?.nextElementSibling as HTMLElement | null;
      if (!childrenEl?.classList.contains("schema-table__children")) return;
      if (expanded) {
        addStyle(toggleBtn.classList, "schema-table__toggle--expanded");
      } else {
        removeStyle(toggleBtn.classList, "schema-table__toggle--expanded");
      }
      toggleBtn.setAttribute("aria-expanded", String(expanded));
      childrenEl.hidden = !expanded;
    };

    const setExpandAllLabel = (allExpanded: boolean): void => {
      if (!expandAllEl) return;
      const expandLabel = expandAllEl.querySelector<HTMLElement>(
        ".schema-table__expand-all-label--expand",
      );
      const collapseLabel = expandAllEl.querySelector<HTMLElement>(
        ".schema-table__expand-all-label--collapse",
      );
      if (expandLabel) expandLabel.hidden = allExpanded;
      if (collapseLabel) collapseLabel.hidden = !allExpanded;
    };

    const allToggles = (): HTMLElement[] =>
      Array.from(
        tableEl.querySelectorAll<HTMLElement>(".schema-table__toggle"),
      );

    const allExpanded = (): boolean => {
      const toggles = allToggles();
      return (
        toggles.length > 0 &&
        toggles.every((t) =>
          t.classList.contains("schema-table__toggle--expanded"),
        )
      );
    };

    const handleClick = (event: Event): void => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const toggleBtn = target.closest<HTMLElement>(".schema-table__toggle");
      if (toggleBtn && tableEl.contains(toggleBtn)) {
        const wasExpanded = toggleBtn.classList.contains(
          "schema-table__toggle--expanded",
        );
        setRowExpanded(toggleBtn, !wasExpanded);
        setExpandAllLabel(allExpanded());
        return;
      }

      const expandAllBtn = target.closest<HTMLElement>(
        ".schema-table__expand-all",
      );
      if (expandAllBtn && expandAllBtn === expandAllEl) {
        const expandNext = !allExpanded();
        for (const t of allToggles()) {
          setRowExpanded(t, expandNext);
        }
        setExpandAllLabel(expandNext);
      }
    };

    tableEl.addEventListener("click", handleClick);
    tableEl.setAttribute("data-hydrated", "true");

    return () => {
      tableEl.removeEventListener("click", handleClick);
    };
  }, []);

  return <span ref={ref} hidden aria-hidden="true" />;
}
