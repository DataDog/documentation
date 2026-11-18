/**
 * The Cdocs state the server renders into each product docs page, for
 * client-side scripts to read: the page's resolved filter values, and what
 * the link-preferences script needs to find Cdocs links.
 *
 * Rendered as a JSON script tag rather than island props, so any script can
 * read it without hydrating a component.
 */

export const CDOCS_PAGE_STATE_ID = "cdocs-page-state";

export interface CdocsPageState {
  /** The resolved value of every shown filter. Empty on pages without filters. */
  valsByTraitId: Record<string, string>;
  /** Where to fetch the traits list, with the path prefix applied. */
  traitsListUrl: string;
  /** The deploy path prefix, such as "/my-branch", or "". */
  pathPrefix: string;
}

/**
 * JSON that's safe inside `<script type="application/json">`. Escaping `<`
 * keeps any value from closing the tag early.
 */
export function serializeCdocsPageState(state: CdocsPageState): string {
  return JSON.stringify(state).replace(/</g, "\\u003c");
}

export function readCdocsPageState(doc: Document): CdocsPageState | null {
  const stateTag = doc.getElementById(CDOCS_PAGE_STATE_ID);
  if (!stateTag?.textContent) return null;
  try {
    return JSON.parse(stateTag.textContent) as CdocsPageState;
  } catch {
    return null;
  }
}
