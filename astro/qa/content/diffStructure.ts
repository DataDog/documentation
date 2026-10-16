/**
 * Structure diff (pipeline step 5): compares the two sides' outlines, which
 * `extractPage` builds alongside the content units.
 *
 * Every outline difference is reported. A difference that a named mapping
 * explains becomes one `structure` finding per mapping per page; anything else
 * becomes `structure-unmapped`. Mappings only *name* a difference, so a
 * reviewer can confirm it should exist; they never hide one.
 */
import type { OutlineEntry } from "./extractUnits.ts";

export interface StructureMapping {
  name: string;
  description: string;
  /** Matches the element on the side that has it; omitted if that side has none. */
  hugo?: RegExp;
  astro?: RegExp;
  /** Restricts the mapping to entries at matching location keys. */
  location?: RegExp;
}

export interface StructureFinding {
  kind: "structure" | "structure-unmapped";
  mapping?: string;
  /** Unmapped findings only: which side has the element. */
  side?: "hugo" | "astro";
  locationKeys: string[];
  hugoElements: string[];
  astroElements: string[];
}

export const structureMappings: StructureMapping[] = [
  // Page-level presence. These have no patterns: `compare.ts` emits them directly.
  {
    name: "page-absent-in-astro",
    description: "Hugo serves this page's `.md`; Astro's `dist` has none.",
  },
  {
    name: "page-absent-in-hugo",
    description: "Astro has this page's `.md`; prod Hugo does not return one.",
  },
  {
    name: "frontmatter-description",
    description:
      "Hugo's frontmatter description is the site-wide default; Astro's is the page's own.",
    hugo: /^frontmatter description: /,
    astro: /^frontmatter description: /,
  },
  {
    name: "frontmatter-breadcrumbs",
    description:
      "Breadcrumbs differ (Hugo: API Reference > category; Astro: API > page).",
    hugo: /^frontmatter breadcrumbs: /,
    astro: /^frontmatter breadcrumbs: /,
  },
  {
    name: "version-as-heading",
    description:
      "The API version is a tab in Hugo and a `##` heading in Astro.",
    hugo: /^tab "v\d+"$/,
    astro: /^heading h2 "v\d+\b/,
  },
  {
    name: "overview-heading-absent",
    description:
      "Hugo puts the operation description under an Overview heading; Astro has no heading.",
    hugo: /^heading h3 "Overview"$/,
  },
  {
    name: "code-language-tab",
    description:
      "Code example languages are tabs in Astro; Hugo has an empty heading and only the fence's language.",
    hugo: /^heading h5 ""$/,
    astro: /^tab "[^"]+"$/,
    location: /(^|\/)code-example(\/|$)/,
  },
  {
    name: "curl-comment-heading",
    description:
      "Hugo's `.md` breaks some curl blocks at a `#` comment line, which parses as an empty heading.",
    hugo: /^heading h[1-4] ""$/,
    location: /(^|\/)code-example$/,
  },
  {
    name: "request-example-title",
    description:
      "Hugo gives each request example an empty `#####` title (prod's titles are blank too); Astro has none.",
    hugo: /^heading h5 ""$/,
    location: /(^|\/)request\/example$/,
  },
  {
    name: "request-heading-form",
    description:
      "The request section heading is `Request` in Hugo and `Request Body` (with `(required)` when it is) in Astro.",
    hugo: /^heading h3 "Request"$/,
    astro: /^heading h3 "Request Body( \(required\))?"$/,
    location: /(^|\/)request$/,
  },
  {
    name: "label-form",
    description:
      "Labels such as Instructions are `####` headings in Hugo and bold paragraphs in Astro.",
    hugo: /^label heading /,
    astro: /^label bold-paragraph /,
  },
  {
    name: "arguments-table-header",
    description:
      "Hugo's arguments table has Name, Type and Description columns; Astro uses its schema table columns.",
    hugo: /^table Name \| Type \| Description$/,
    astro: /^table Parent field \| Field \| Type \| Description$/,
    location: /(^|\/)arguments$/,
  },
  {
    name: "schema-parent-field-column",
    description: "Astro's schema tables add a Parent field column.",
    hugo: /^table Field \| /,
    astro: /^table Parent field \| Field \| /,
  },
  {
    name: "operation-badge-form",
    description:
      "Operation status badges are trailing words in Hugo (`Name preview`) and parenthesized in Astro (`Name (preview)`).",
    hugo: /^heading h2 ".* (deprecated|preview)"$/i,
    astro: /^heading h2 ".* \((deprecated|preview)\)"$/i,
  },
  {
    name: "endpoint-row-order",
    description: "The endpoint table lists Datadog sites in a different order.",
    hugo: /^endpoint sites /,
    astro: /^endpoint sites /,
    location: /(^|\/)endpoint-table$/,
  },
];

type Side = "hugo" | "astro";

interface SidedEntry extends OutlineEntry {
  side: Side;
}

export function diffStructure(
  hugoOutline: OutlineEntry[],
  astroOutline: OutlineEntry[],
): StructureFinding[] {
  const differences = outlineDifferences(hugoOutline, astroOutline);
  const findings: StructureFinding[] = [];
  const unmapped: SidedEntry[] = [];

  const entriesByMapping = new Map<string, SidedEntry[]>();
  for (const difference of differences) {
    const mapping = structureMappings.find((candidate) =>
      mappingExplains(candidate, difference),
    );
    if (!mapping) {
      unmapped.push(difference);
      continue;
    }
    entriesByMapping.set(mapping.name, [
      ...(entriesByMapping.get(mapping.name) ?? []),
      difference,
    ]);
  }

  for (const mapping of structureMappings) {
    const entries = entriesByMapping.get(mapping.name);
    if (entries) {
      findings.push({
        kind: "structure",
        mapping: mapping.name,
        ...summarize(entries),
      });
    }
  }
  for (const entries of groupBy(
    unmapped,
    (entry) => `${entry.side}\n${entry.element}`,
  )) {
    findings.push({
      kind: "structure-unmapped",
      side: entries[0].side,
      ...summarize(entries),
    });
  }
  return findings;
}

/** Entries present on one side only, as a multiset difference per location. */
function outlineDifferences(
  hugoOutline: OutlineEntry[],
  astroOutline: OutlineEntry[],
): SidedEntry[] {
  const keyOf = (entry: OutlineEntry) =>
    `${entry.locationKey}\n${entry.element}`;
  const unmatchedAstroCounts = new Map<string, number>();
  for (const entry of astroOutline) {
    unmatchedAstroCounts.set(
      keyOf(entry),
      (unmatchedAstroCounts.get(keyOf(entry)) ?? 0) + 1,
    );
  }
  const hugoOnly: SidedEntry[] = [];
  for (const entry of hugoOutline) {
    const count = unmatchedAstroCounts.get(keyOf(entry)) ?? 0;
    if (count > 0) unmatchedAstroCounts.set(keyOf(entry), count - 1);
    else hugoOnly.push({ ...entry, side: "hugo" });
  }
  const astroOnly: SidedEntry[] = [];
  for (const entry of astroOutline) {
    const count = unmatchedAstroCounts.get(keyOf(entry)) ?? 0;
    if (count === 0) continue;
    unmatchedAstroCounts.set(keyOf(entry), count - 1);
    astroOnly.push({ ...entry, side: "astro" });
  }
  return [...hugoOnly, ...astroOnly];
}

function mappingExplains(
  mapping: StructureMapping,
  entry: SidedEntry,
): boolean {
  const pattern = mapping[entry.side];
  if (!pattern?.test(entry.element)) return false;
  return mapping.location?.test(entry.locationKey) ?? true;
}

function summarize(
  entries: SidedEntry[],
): Pick<StructureFinding, "locationKeys" | "hugoElements" | "astroElements"> {
  const elementsOf = (side: Side) =>
    distinct(
      entries
        .filter((entry) => entry.side === side)
        .map((entry) => entry.element),
    );
  return {
    locationKeys: distinct(entries.map((entry) => entry.locationKey)).sort(),
    hugoElements: elementsOf("hugo"),
    astroElements: elementsOf("astro"),
  };
}

function distinct(values: string[]): string[] {
  return [...new Set(values)];
}

function groupBy<Item>(items: Item[], keyOf: (item: Item) => string): Item[][] {
  const groups = new Map<string, Item[]>();
  for (const item of items) {
    groups.set(keyOf(item), [...(groups.get(keyOf(item)) ?? []), item]);
  }
  return [...groups.values()];
}
