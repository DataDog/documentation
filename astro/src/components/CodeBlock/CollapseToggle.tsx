import { useEffect, useRef, useState } from "preact/hooks";
import styles from "./CodeBlock.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import { markSelfAsHydrated } from "@lib/componentUtils/markSelfAsHydrated";
import {
  loadExternalContext,
  type ExternalContext,
} from "@lib/componentUtils/loadExternalContext";

const cl = classListFactory(styles);

export interface CollapseToggleLabels {
  "Expand code": string;
  "Collapse code": string;
}

interface CollapseToggleProps {
  externalContext: ExternalContext<{ contentEl: string }>;
  labels: CollapseToggleLabels;
}

export function CollapseToggle({
  externalContext,
  labels,
}: CollapseToggleProps) {
  const [collapsed, setCollapsed] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const targetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const loaded = loadExternalContext(externalContext);
    if (!loaded) return;
    targetRef.current = loaded.contentEl;
    markSelfAsHydrated(ref);
  }, []);

  // Collapse state lives in this island, but the hidden content lives in
  // the Astro shell — toggle the BEM class and its CSS-module hash on the
  // shell's content wrapper imperatively so component styles still apply.
  const applyCollapsed = (next: boolean) => {
    const target = targetRef.current;
    if (!target) return;
    target.classList.toggle("code-block__content--hidden", next);
    const hashed = styles["code-block__content--hidden"];
    if (hashed) target.classList.toggle(hashed, next);
  };

  const handleToggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    applyCollapsed(next);
  };

  const chevronClass = collapsed
    ? cl("code-block__chevron", "code-block__chevron--down")
    : cl("code-block__chevron", "code-block__chevron--up");

  return (
    <button
      ref={ref}
      class={cl("code-block__toggle")}
      onClick={handleToggle}
      aria-expanded={!collapsed}
      aria-label={collapsed ? labels["Expand code"] : labels["Collapse code"]}
    >
      <span class={chevronClass} />
    </button>
  );
}
