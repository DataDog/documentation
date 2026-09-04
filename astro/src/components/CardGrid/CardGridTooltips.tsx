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
  // Marks the point where the card listeners below are actually attached.
  // Until then a hover lands on a card with no listener and is lost, so tests
  // (and anything else timing an interaction) need this to be observable.
  const [hydrated, setHydrated] = useState(false);

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
        top: rect.top,
        left: rect.left + rect.width / 2,
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

    // Set last: every listener above is attached by this point, so the flag
    // never advertises readiness the component cannot yet honor.
    setHydrated(true);

    return () => {
      for (const teardown of teardowns) teardown();
      setHydrated(false);
    };
  }, [externalContext, tooltipLabelsByCardId]);

  // One bubble per grid, reused by every card, so only one can ever be visible.
  //
  // aria-hidden is deliberate, and so is the absence of role="tooltip" and
  // aria-describedby. The bubble is purely a visual affordance for sighted
  // pointer users; the text always reaches assistive tech by another route:
  //
  //   - untitled card: the anchor carries aria-label with this exact text
  //     (ImageCard.astro), so describing it here would announce it twice.
  //   - titled card: the visible title is the accessible name, and the
  //     anchor has NO aria-label — overriding a visible name would fail
  //     WCAG 2.5.3. The tooltip is supplementary, not the card's name.
  //
  // Do not add tooltip semantics here without re-checking both branches.
  return (
    <div
      class={cl("card-grid__tooltip", tooltip && "card-grid__tooltip--visible")}
      aria-hidden="true"
      data-hydrated={hydrated ? "true" : undefined}
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
