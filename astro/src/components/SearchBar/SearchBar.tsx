import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { createPortal } from "preact/compat";
import styles from "./SearchBar.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import { multiSearch } from "@lib/search/typesense";
import { getTypesenseConfig, type TypesenseEnv } from "@config/typesense";
import { HUGO_ORIGIN } from "@config/origins";
import {
  CATEGORY_ORDER,
  groupHits,
  type NormalizedHit,
} from "@lib/search/normalize";
// Same magnifying-glass shape Hugo's side-nav search uses (Hugo loads it as an
// icomoon font glyph; here we inline it as SVG so the icon scales freely and
// inherits the input-bar text color via `currentColor`).
import searchIconSvg from "../../assets/images/svg-icons/searchbar_search.svg?raw";
import SearchResultsPopup, { type Selection } from "./SearchResultsPopup";
import { useDebouncedSearch, type SearchFn } from "./hooks/useDebouncedSearch";
import { usePopupPosition } from "./hooks/usePopupPosition";
import { useGlobalSearchShortcuts } from "./hooks/useGlobalSearchShortcuts";
import { useOutsideClick } from "./hooks/useOutsideClick";

export interface SearchBarLabels {
  Search: string;
  "Search documentation": string;
  "Search documentation...": string;
  "No results.": string;
}

interface Props {
  /**
   * Override Typesense config in tests. Production usage reads from the
   * baked-in config via `getTypesenseConfig()`.
   */
  env?: TypesenseEnv;
  /**
   * Override the search function. Tests pass a stub that resolves a fixture
   * synchronously instead of hitting the network.
   */
  search?: SearchFn;
  labels: SearchBarLabels;
  /**
   * "default" is the API side-nav placement (50vw popup, owns the global
   * keyboard shortcuts). "mobile" is the mobile-nav placement: a full-width
   * popup and no global `/` / Cmd+K binding, so it can't conflict with the
   * side-nav instance that coexists on the same page.
   */
  variant?: "default" | "mobile";
}

const DEBOUNCE_MS = 200;

const cl = classListFactory(styles);

export default function SearchBar({
  env,
  search,
  labels,
  variant = "default",
}: Props) {
  const config = useMemo(() => env ?? getTypesenseConfig(), [env]);
  const searchFn = search ?? multiSearch;

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<Selection>({ kind: "none" });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const trimmedQuery = query.trim();
  const hits = useDebouncedSearch(trimmedQuery, config, searchFn, DEBOUNCE_MS);
  // Don't show the popup for an empty/whitespace query — no hits to display.
  const popupVisible = open && trimmedQuery.length > 0;
  // Recalculates whenever the form moves (e.g. window resize) so the popup
  // stays anchored directly below the search bar.
  const popupRect = usePopupPosition(formRef, popupVisible);

  // `grouped` is used by SearchResultsPopup to render hits under category
  // headings. `flatHits` is the same hits in CATEGORY_ORDER sequence so that
  // keyboard selection indices map 1-to-1 with what's visible on screen.
  // "partners" is appended last because it falls outside the standard order.
  const { grouped, flatHits } = useMemo(() => {
    if (!hits) {
      return { grouped: null, flatHits: [] as NormalizedHit[] };
    }
    const g = groupHits(hits, trimmedQuery);
    const list: NormalizedHit[] = [];
    for (const cat of CATEGORY_ORDER) {
      list.push(...(g.get(cat.key) ?? []));
    }
    list.push(...(g.get("partners") ?? []));
    return { grouped: g, flatHits: list };
  }, [hits, trimmedQuery]);

  // Reset selection whenever the hit set changes — a stale index could otherwise
  // point past the end of the new flatHits array.
  useEffect(() => {
    setSelection({ kind: "none" });
  }, [hits]);

  useGlobalSearchShortcuts({
    inputRef,
    wrapperRef,
    setOpen,
    setQuery,
    enabled: variant !== "mobile",
  });
  useOutsideClick([wrapperRef, popupRef], () => setOpen(false));

  const totalHits = flatHits.length;
  const selectedHit =
    selection.kind === "hit" ? (flatHits[selection.index] ?? null) : null;

  const navigateToSearchPage = () => {
    if (!trimmedQuery) return;
    // Hugo hosts the canonical search results page at /search. Send the user
    // there with the same `?s=` param Hugo uses; cross-origin since Astro is
    // API-only for now.
    window.location.href = `${HUGO_ORIGIN}/search/?s=${encodeURIComponent(trimmedQuery)}`;
  };

  const followSelectionOrSearch = () => {
    if (selectedHit) {
      window.location.href = selectedHit.url;
    } else {
      navigateToSearchPage();
    }
  };

  const onInputKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelection((s) => nextSelection(s, totalHits));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelection((s) => {
        const prev = previousSelection(s);
        // Arrow-up from the first result returns selection to "none" and
        // refocuses the input so the user can keep typing.
        if (prev.kind === "none") {
          inputRef.current?.focus();
        }
        return prev;
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      followSelectionOrSearch();
      // Enter on the Ask AI placeholder is a no-op for now (Placeholder).
    }
  };

  return (
    <div ref={wrapperRef} class={cl("search-bar")}>
      <form
        ref={formRef}
        class={cl("search-bar__form")}
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          followSelectionOrSearch();
        }}
      >
        <button
          type="submit"
          class={cl("search-bar__submit", variant === "mobile" && "search-bar__submit--mobile")}
          aria-label={labels["Search"]}
          dangerouslySetInnerHTML={{ __html: searchIconSvg }}
        />
        <input
          ref={inputRef}
          type="search"
          class={cl("search-bar__input", variant === "mobile" && "search-bar__input--mobile")}
          placeholder={labels["Search documentation..."]}
          aria-label={labels["Search documentation"]}
          value={query}
          onInput={(e) => {
            setQuery((e.target as HTMLInputElement).value);
            setOpen(true);
          }}
          onFocus={() => {
            if (trimmedQuery) {
              setOpen(true);
            }
          }}
          onKeyDown={onInputKeyDown}
        />
        {/* Visual hint that the user can press `/` to focus the input. Hidden
            on focus and on narrow viewports — matches Hugo's behavior. */}
        <span class={cl("search-bar__shortcut")} aria-hidden="true">
          /
        </span>
      </form>

      {/* Portal renders the popup on document.body so it escapes any
          overflow:hidden ancestor in the page layout. */}
      {popupVisible &&
        createPortal(
          <SearchResultsPopup
            popupRef={popupRef}
            rect={popupRect}
            variant={variant}
            grouped={grouped}
            selectedHit={selectedHit}
            aiSelected={selection.kind === "ai"}
            noResultsLabel={labels["No results."]}
            totalHits={totalHits}
          />,
          document.body,
        )}
    </div>
  );
}

// Selection grid is linear: none → ai → hit 0 → hit 1 → … → hit N-1.
function nextSelection(s: Selection, totalHits: number): Selection {
  if (s.kind === "none") {
    return { kind: "ai" };
  }
  if (s.kind === "ai") {
    return totalHits > 0 ? { kind: "hit", index: 0 } : s;
  }
  return s.index < totalHits - 1 ? { kind: "hit", index: s.index + 1 } : s;
}

function previousSelection(s: Selection): Selection {
  if (s.kind === "none") {
    return s;
  }
  if (s.kind === "ai") {
    return { kind: "none" };
  }
  return s.index === 0 ? { kind: "ai" } : { kind: "hit", index: s.index - 1 };
}
