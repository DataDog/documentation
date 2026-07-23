import styles from "./SearchBar.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import { CATEGORY_ORDER, type NormalizedHit } from "@lib/search/normalize";
import SearchHit from "./SearchHit";
import type { PopupRect } from "./hooks/usePopupPosition";

const cl = classListFactory(styles);

const ALL_CATEGORIES: Array<{ label: string; key: string }> = [
  ...CATEGORY_ORDER,
  { label: "Partners", key: "partners" },
];

export type Selection =
  | { kind: "none" }
  | { kind: "ai" }
  | { kind: "hit"; index: number };

interface Props {
  popupRef: { current: HTMLDivElement | null };
  rect: PopupRect | null;
  variant: "default" | "mobile";
  grouped: Map<string, NormalizedHit[]> | null;
  selectedHit: NormalizedHit | null;
  aiSelected: boolean;
  noResultsLabel: string;
  totalHits: number;
}

export default function SearchResultsPopup({
  popupRef,
  rect,
  variant,
  grouped,
  selectedHit,
  aiSelected,
  noResultsLabel,
  totalHits,
}: Props) {
  const isMobile = variant === "mobile";
  // The default (side-nav) popup is a fixed 50vw set in CSS. The mobile popup
  // instead matches the search bar's own width so it sits flush beneath the
  // full-width mobile input.
  const style = rect
    ? {
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        ...(isMobile ? { width: `${rect.width}px` } : {}),
      }
    : undefined;
  return (
    <div
      ref={popupRef}
      class={cl(
        "search-bar__popup",
        isMobile && "search-bar__popup--mobile",
      )}
      role="listbox"
      style={style}
    >
      <div
        class={cl(
          "search-bar__ai-suggestion",
          "placeholder",
          aiSelected && "search-bar__ai-suggestion--selected",
        )}
        data-placeholder-name={'"Ask AI" Button Goes Here'}
      >
        <span>{'"Ask AI" Button Goes Here'}</span>
      </div>

      {totalHits === 0 ? (
        <div class={cl("search-bar__no-hits")}>{noResultsLabel}</div>
      ) : (
        ALL_CATEGORIES.map((cat) => {
          const list = grouped?.get(cat.key) ?? [];
          if (list.length === 0) return null;
          return (
            <div class={cl("search-category")} key={cat.key}>
              <p class={cl("search-category__label")}>{cat.label}</p>
              <ol class={cl("search-category__list")}>
                {list.map((hit) => (
                  <SearchHit
                    key={hit.url}
                    hit={hit}
                    selected={hit === selectedHit}
                  />
                ))}
              </ol>
            </div>
          );
        })
      )}
    </div>
  );
}
