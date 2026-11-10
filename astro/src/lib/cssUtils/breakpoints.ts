/**
 * Media queries for `matchMedia`, built from the `--hugo-breakpoint-*` tokens
 * in `styles/tokens/hugo.css` so scripts and stylesheets share one source.
 * Each fallback mirrors its token, for when the stylesheet hasn't loaded.
 */

/** Matches desktop widths, where the side nav replaces the mobile nav. */
export function desktopMediaQuery(): string {
  const desktop = readBreakpointToken("--hugo-breakpoint-desktop", "992px");
  return `(min-width: ${desktop})`;
}

/**
 * Matches widths below the tablet breakpoint. The 0.02px offset keeps the
 * query from overlapping a `min-width` rule at the breakpoint itself.
 */
export function belowTabletMediaQuery(): string {
  const tablet = readBreakpointToken("--hugo-breakpoint-tablet", "768px");
  return `(max-width: calc(${tablet} - 0.02px))`;
}

function readBreakpointToken(tokenName: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(tokenName)
    .trim();
  return value || fallback;
}
