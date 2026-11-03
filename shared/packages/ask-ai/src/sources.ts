import { chevronRightIcon } from "./icons";
import { STRINGS } from "./strings";
import type { Source } from "./types";

/**
 * Gives every `[N]` chip in `container` a tooltip linking to its source.
 * Chips whose number has no matching source are left alone.
 */
export function attachTooltips(
  container: HTMLElement,
  sourcesByNumber: Map<number, Source>,
): void {
  const chips = container.querySelectorAll<HTMLButtonElement>(
    ".conv-search-source-ref-btn[data-source-number]",
  );

  chips.forEach((chip) => {
    const number = Number.parseInt(chip.dataset["sourceNumber"] ?? "", 10);
    const source = sourcesByNumber.get(number);
    if (!source) return;

    chip.setAttribute("aria-label", `Source ${number}: ${source.label}`);
    chip.setAttribute("aria-expanded", "false");

    const tooltip = document.createElement("span");
    tooltip.className = "conv-search-source-tooltip";

    // `label` comes from model output, so it is set as text rather than markup.
    const link = document.createElement("a");
    link.href = source.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = source.label;
    tooltip.appendChild(link);

    chip.parentNode?.appendChild(tooltip);
  });
}

/** The "Sources" card list appended below an answer. */
export function buildSourceCards(sources: Source[]): HTMLElement {
  const section = document.createElement("div");
  section.className = "conv-search-sources";

  const title = document.createElement("p");
  title.className = "conv-search-sources-title";
  title.textContent = STRINGS.sourcesTitle;
  section.appendChild(title);

  const cards = document.createElement("div");
  cards.className = "conv-search-sources-cards";

  for (const source of sources) {
    cards.appendChild(buildSourceCard(source));
  }

  section.appendChild(cards);
  return section;
}

function buildSourceCard(source: Source): HTMLElement {
  const card = document.createElement("article");
  card.className = "conv-search-source-card";

  const badge = document.createElement("span");
  badge.className = "conv-search-source-card-number";
  badge.textContent = String(source.number);

  const link = document.createElement("a");
  link.href = source.href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = source.label;

  const arrow = document.createElement("span");
  arrow.className = "conv-search-source-card-arrow";
  arrow.innerHTML = chevronRightIcon({ size: 16 });

  card.append(badge, link, arrow);
  return card;
}

export function showSourceTooltip(chip: HTMLElement): void {
  const wrap = chip.closest(".conv-search-source-ref-wrap");
  const tooltip = wrap?.querySelector(".conv-search-source-tooltip");
  if (!tooltip) return;

  tooltip.classList.add("open");
  chip.setAttribute("aria-expanded", "true");
}

export function closeAllSourceTooltips(messagesContainer: HTMLElement): void {
  messagesContainer
    .querySelectorAll(".conv-search-source-tooltip.open")
    .forEach((tooltip) => {
      tooltip.classList.remove("open");
      tooltip.removeAttribute("style");
    });

  messagesContainer
    .querySelectorAll('.conv-search-source-ref-btn[aria-expanded="true"]')
    .forEach((chip) => chip.setAttribute("aria-expanded", "false"));
}

/** Nudges a tooltip back inside the panel when it would overflow either edge. */
export function repositionTooltip(
  tooltip: HTMLElement,
  panel: HTMLElement,
): void {
  const panelRect = panel.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();

  if (tooltipRect.left < panelRect.left + 8) {
    tooltip.style.left = "0";
    tooltip.style.transform = "none";
  } else if (tooltipRect.right > panelRect.right - 8) {
    tooltip.style.left = "auto";
    tooltip.style.right = "0";
    tooltip.style.transform = "none";
  }
}
