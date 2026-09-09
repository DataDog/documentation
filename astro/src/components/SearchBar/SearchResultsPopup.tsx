import styles from "./SearchBar.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import { CATEGORY_ORDER, type NormalizedHit } from "@lib/search/normalize";
import SearchHit from "./SearchHit";
import type { PopupRect } from "./hooks/usePopupPosition";
// The same spark Hugo puts on its Ask AI row (and the one the widget's own
// floating button carries), inlined as SVG so it takes the row's `currentColor`
// instead of Hugo's filter-based recolor of an <img>.
//
// This is a second copy of the path data in `@dd/ask-ai`'s `sparkAiIcon`, and
// the two can drift. Importing that one instead would pull the package into
// this island's static bundle — the thing the dynamic `import()` in `askAi()`
// avoids — and it renders to an HTML string rather than the `?raw` markup this
// row wants. TODO: once Hugo is deprecated, Ask AI no longer needs to be a
// separate package, and the icon can move into this site's own asset set with
// one copy.
import sparkAiIconSvg from "../../assets/images/svg-icons/spark-ai.svg?raw";

const cl = classListFactory(styles);

const ALL_CATEGORIES: Array<{ label: string; key: string }> = [
  ...CATEGORY_ORDER,
  { label: "Partners", key: "partners" },
];

export type Selection =
  { kind: "none" } | { kind: "ai" } | { kind: "hit"; index: number };

interface Props {
  popupRef: { current: HTMLDivElement | null };
  rect: PopupRect | null;
  variant: "default" | "mobile";
  grouped: Map<string, NormalizedHit[]> | null;
  selectedHit: NormalizedHit | null;
  aiSelected: boolean;
  noResultsLabel: string;
  totalHits: number;
  /** The trimmed query, shown in the Ask AI row's label. */
  query: string;
  /** Opens Ask AI with the current query. */
  onAskAi: () => void;
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
  query,
  onAskAi,
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
      class={cl("search-bar__popup", isMobile && "search-bar__popup--mobile")}
      role="listbox"
      style={style}
    >
      <AskAiRow query={query} selected={aiSelected} onAsk={onAskAi} />

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

interface AskAiRowProps {
  query: string;
  selected: boolean;
  onAsk: () => void;
}

/**
 * The searchbar's entry point into Ask AI. Its label tracks the query, matching
 * `setAskAISuggestionContent` in Hugo's `searchbarHits.js`.
 *
 * TODO: hardcoded English, as in Hugo. Localize once `shared/i18n` carries the
 * keys — they cannot be added from this side of the repo.
 */
function AskAiRow({ query, selected, onAsk }: AskAiRowProps) {
  return (
    <button
      type="button"
      class={cl(
        "search-bar__ai-suggestion",
        selected && "search-bar__ai-suggestion--selected",
      )}
      onClick={onAsk}
    >
      <span
        class={cl("search-bar__ai-suggestion-icon")}
        dangerouslySetInnerHTML={{ __html: sparkAiIconSvg }}
      />
      <span class={cl("search-bar__ai-suggestion-label")}>
        {query ? (
          <>
            {"Ask AI about "}
            <span class={cl("search-bar__ai-suggestion-query")}>
              {`"${query}"`}
            </span>
          </>
        ) : (
          "Ask AI anything"
        )}
      </span>
    </button>
  );
}
