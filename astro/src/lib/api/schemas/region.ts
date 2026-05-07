export interface Region {
  /** Region key, e.g. `us`, `eu`, `ap1`. Matches Hugo's `site` cookie value. */
  key: string;
  /** Display label, e.g. `US1`, `EU`. */
  label: string;
  /** API-site domain, e.g. `datadoghq.com`. */
  site: string;
}
