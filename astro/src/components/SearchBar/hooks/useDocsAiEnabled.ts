import { useEffect, useState } from "preact/hooks";
import { isDocsAiEnabled } from "@lib/featureFlags/featureFlags";

/**
 * Whether the searchbar offers its Ask AI row, per the `docs-ai-enabled` kill
 * switch.
 *
 * Optimistic, as Hugo's searchbar is: true until the flag says otherwise, so
 * the row is there on the popup's first paint in the normal case. The flag is
 * not read until `shouldResolve` first turns true — the popup opening — so a
 * page where nobody searches never loads the flag SDKs on this island's
 * account. `AskAi.astro`'s mount has usually resolved it by then, and the client
 * is memoized, so the answer is typically a microtask away.
 */
export function useDocsAiEnabled(shouldResolve: boolean): boolean {
  const [enabled, setEnabled] = useState(true);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    if (shouldResolve && !requested) setRequested(true);
  }, [shouldResolve, requested]);

  useEffect(() => {
    if (!requested) return;
    let cancelled = false;
    void isDocsAiEnabled().then((value) => {
      if (!cancelled) setEnabled(value);
    });
    return () => {
      cancelled = true;
    };
  }, [requested]);

  return enabled;
}
