import { useEffect } from "preact/hooks";
import type { Dispatch, StateUpdater } from "preact/hooks";

interface Args {
  inputRef: { current: HTMLInputElement | null };
  wrapperRef: { current: HTMLElement | null };
  setOpen: Dispatch<StateUpdater<boolean>>;
  setQuery: Dispatch<StateUpdater<string>>;
  /**
   * When false, the page-wide listener is not attached. Used by the mobile-nav
   * SearchBar: it shares the page with the API side-nav SearchBar, and only one
   * instance may own the global `/` and Cmd/Ctrl+K shortcuts. Defaults to true.
   */
  enabled?: boolean;
}

/**
 * Wires page-wide keyboard shortcuts: `/` and Cmd/Ctrl+K focus the search
 * input; Escape clears it (only when focus is inside the search bar). Skips
 * `/` and Cmd/Ctrl+K when the user is already typing in another field.
 */
export function useGlobalSearchShortcuts({
  inputRef,
  wrapperRef,
  setOpen,
  setQuery,
  enabled = true,
}: Args) {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase() ?? "";
      const inEditable =
        tag === "input" || tag === "textarea" || target?.isContentEditable;

      const isSlash = e.key === "/";
      const isCmdK =
        e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey);

      if ((isSlash || isCmdK) && !inEditable) {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
        return;
      }

      if (e.key === "Escape") {
        const active = document.activeElement;
        const focusInsideBar =
          active === inputRef.current ||
          wrapperRef.current?.contains(active);
        if (focusInsideBar) {
          setQuery("");
          setOpen(false);
          inputRef.current?.blur();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [inputRef, wrapperRef, setOpen, setQuery, enabled]);
}
