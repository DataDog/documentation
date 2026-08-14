import { useEffect, useRef } from "preact/hooks";

type NodeRef = { current: Node | null };

/**
 * Calls `onOutside` when the user mousedowns anywhere that is not inside
 * any of the provided refs. The popup is portaled into document.body, so
 * callers must pass both the wrapper ref and the popup ref — otherwise
 * clicking a search hit would close the popup before navigation fires.
 *
 * Uses refs internally so the document listener is attached exactly once,
 * regardless of how often the caller's `refs`/`onOutside` identities change.
 */
export function useOutsideClick(
  refs: NodeRef[],
  onOutside: () => void,
) {
  const refsRef = useRef(refs);
  refsRef.current = refs;
  const onOutsideRef = useRef(onOutside);
  onOutsideRef.current = onOutside;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      for (const ref of refsRef.current) {
        if (ref.current?.contains(target)) return;
      }
      onOutsideRef.current();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
}
