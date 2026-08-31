import { useEffect, useState } from "preact/hooks";
import styles from "./CardGridTooltips.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import {
  loadExternalContext,
  type ExternalContext,
} from "@lib/componentUtils/loadExternalContext";

const cl = classListFactory(styles);

interface Props {
  externalContext: ExternalContext<{ cardEls: string[] }>;
  tooltipLabelsByCardId: Record<string, string>;
}

interface TooltipState {
  label: string;
  /** Viewport coordinates of the card's top-center edge. */
  top: number;
  left: number;
}

export default function CardGridTooltips({
  externalContext,
  tooltipLabelsByCardId,
}: Props) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  useEffect(() => {
    const loaded = loadExternalContext(externalContext);
    if (!loaded) return;

    const hide = () => setTooltip(null);

    // Measured on show rather than tracked, so an idle grid does no layout work.
    const showFor = (card: HTMLElement) => {
      const label = tooltipLabelsByCardId[card.id];
      if (!label) return;
      const rect = card.getBoundingClientRect();
      setTooltip({
        label,
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX + rect.width / 2,
      });
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") hide();
    };

    const teardowns: Array<() => void> = [];
    for (const card of loaded.cardEls) {
      const show = () => showFor(card);
      card.addEventListener("mouseenter", show);
      card.addEventListener("mouseleave", hide);
      card.addEventListener("focus", show);
      card.addEventListener("blur", hide);
      teardowns.push(() => {
        card.removeEventListener("mouseenter", show);
        card.removeEventListener("mouseleave", hide);
        card.removeEventListener("focus", show);
        card.removeEventListener("blur", hide);
      });
    }

    document.addEventListener("keydown", onEscape);
    teardowns.push(() => document.removeEventListener("keydown", onEscape));

    return () => {
      for (const teardown of teardowns) teardown();
    };
  }, [externalContext, tooltipLabelsByCardId]);

  // One bubble per grid, reused by every card, so only one can ever be visible.
  //
  // aria-hidden is deliberate, and so is the absence of role="tooltip" and
  // aria-describedby. Each card anchor already carries aria-label with this
  // exact text (ImageCard.astro), so a described-by relationship would make a
  // screen reader announce the same string twice. The bubble is purely a
  // visual affordance for sighted pointer users. Do not "fix" this by adding
  // tooltip semantics without also removing the aria-label.
  return (
    <div
      class={cl("card-grid__tooltip", tooltip && "card-grid__tooltip--visible")}
      aria-hidden="true"
      style={
        tooltip
          ? { top: `${tooltip.top}px`, left: `${tooltip.left}px` }
          : undefined
      }
    >
      {tooltip?.label ?? ""}
    </div>
  );
}
