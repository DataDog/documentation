/**
 * Report building (pipeline step 7). The JSON files are the deliverable;
 * `summary.md` is a derived, human-readable view of them.
 *
 * - `out/index.json`: run metadata and per-page counts.
 * - `out/pages/<slug>.json`: every finding for one page.
 * - `out/structure.json`: each structural mapping across all pages.
 * - `out/changeTypes.json`: `changed` findings grouped by their change types.
 */
import { createHash } from "node:crypto";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import type {
  AdjudicatedFinding,
  CoverageCounts,
  HtmlCheck,
} from "./adjudicateHtml.ts";
import type { ContentFinding } from "./alignUnits.ts";
import { changeTypes, otherChangeType } from "./changeTypes.ts";
import { structureMappings, type StructureFinding } from "./diffStructure.ts";
import { textForms } from "./textForms.ts";

export type Verdict =
  | "unreviewed"
  | "astro-wrong"
  | "hugo-wrong"
  | "hugo-md-wrong"
  | "both-ok"
  | "drift";

export type ReportFinding = (ContentFinding | StructureFinding) & {
  id: string;
  verdict: Verdict;
  /** Set when the tool derived the verdict rather than a reviewer. */
  auto?: true;
  htmlCheck?: HtmlCheck;
};

export interface PageSides {
  astro: { source: string; present: boolean };
  hugo: { source: string; status: number; fetchedAt: string };
  /** Absent when the HTML stage didn't run, such as for a missing page. */
  hugoHtml?: {
    source: string;
    status: number;
    fetchedAt: string;
    coverage: CoverageCounts | null;
  };
}

export interface FindingCounts {
  byKind: Record<string, number>;
  byVerdict: Record<string, number>;
  byHtmlCheck: Record<string, number>;
}

export interface PageReport extends PageSides {
  pagePath: string;
  slug: string;
  counts: FindingCounts;
  findings: ReportFinding[];
}

export interface RunMetadata {
  generatedAt: string;
  distBuiltAt: string;
  specBundle: unknown;
}

/** `/api/latest/a/b` → `a__b`. */
export function pageSlugOf(pagePath: string): string {
  return pagePath
    .replace(/^\/+|\/+$/g, "")
    .replace(/^api\/latest\//, "")
    .replaceAll("/", "__");
}

/**
 * Stable across runs: page, kind, location, plus an anchor that identifies the
 * finding within its location (field, mapping, element or text).
 */
export function findingId(
  pagePath: string,
  finding: ContentFinding | StructureFinding,
): string {
  const identity = [pagePath, finding.kind, ...identityOf(finding)].join("\n");
  return createHash("sha1").update(identity).digest("hex").slice(0, 12);
}

function identityOf(finding: ContentFinding | StructureFinding): string[] {
  if ("locationKeys" in finding) {
    return finding.mapping !== undefined
      ? [finding.mapping]
      : [finding.side ?? "", ...finding.hugoElements, ...finding.astroElements];
  }
  const anchor =
    finding.field ?? finding.hugoText ?? finding.astroText ?? finding.htmlText;
  return [finding.locationKey, finding.unitKind, anchor ?? ""];
}

export function buildPageReport(
  pagePath: string,
  sides: PageSides,
  contentFindings: (ContentFinding | AdjudicatedFinding)[],
  structureFindings: StructureFinding[],
): PageReport {
  const findings = withUniqueIds(pagePath, [
    ...contentFindings,
    ...structureFindings,
  ]);
  return {
    pagePath,
    slug: pageSlugOf(pagePath),
    ...sides,
    counts: countFindings(findings),
    findings,
  };
}

/** Identical findings (such as duplicate rows) get `-2`, `-3`… in page order. */
function withUniqueIds(
  pagePath: string,
  findings: (ContentFinding | AdjudicatedFinding | StructureFinding)[],
): ReportFinding[] {
  const timesSeenById = new Map<string, number>();
  return findings.map((finding) => {
    const baseId = findingId(pagePath, finding);
    const timesSeen = (timesSeenById.get(baseId) ?? 0) + 1;
    timesSeenById.set(baseId, timesSeen);
    const id = timesSeen === 1 ? baseId : `${baseId}-${timesSeen}`;
    return { id, verdict: "unreviewed", ...finding };
  });
}

function countFindings(findings: ReportFinding[]): FindingCounts {
  const counts: FindingCounts = { byKind: {}, byVerdict: {}, byHtmlCheck: {} };
  const increment = (counted: Record<string, number>, key: string) => {
    counted[key] = (counted[key] ?? 0) + 1;
  };
  for (const finding of findings) {
    increment(counts.byKind, finding.kind);
    increment(counts.byVerdict, finding.verdict);
    if (finding.htmlCheck)
      increment(counts.byHtmlCheck, finding.htmlCheck.result);
  }
  return counts;
}

export function buildIndex(pageReports: PageReport[], run: RunMetadata) {
  const fetchTimesOf = (fetchedAts: (string | undefined)[]) => {
    const sorted = fetchedAts.filter((time) => time !== undefined).sort();
    return { earliest: sorted[0] ?? null, latest: sorted.at(-1) ?? null };
  };
  return {
    ...run,
    hugoMarkdownFetchedAt: fetchTimesOf(
      pageReports.map((report) => report.hugo.fetchedAt),
    ),
    hugoHtmlFetchedAt: fetchTimesOf(
      pageReports.map((report) => report.hugoHtml?.fetchedAt),
    ),
    pages: pageReports.map((report) => ({
      pagePath: report.pagePath,
      report: `pages/${report.slug}.json`,
      astroPresent: report.astro.present,
      hugoStatus: report.hugo.status,
      hugoHtmlStatus: report.hugoHtml?.status ?? null,
      counts: report.counts,
      coverage: report.hugoHtml?.coverage ?? null,
    })),
  };
}

export function buildStructureReport(pageReports: PageReport[]) {
  const structureFindings = pageReports.flatMap((report) =>
    report.findings
      .filter((finding) => "locationKeys" in finding)
      .map((finding) => ({
        pagePath: report.pagePath,
        finding: finding as ReportFinding & StructureFinding,
      })),
  );
  const mapped = [...structureMappings, ...textForms]
    .map((mapping) => {
      const covered = structureFindings.filter(
        ({ finding }) => finding.mapping === mapping.name,
      );
      const [first] = covered;
      return {
        mapping: mapping.name,
        description: mapping.description,
        pageCount: covered.length,
        examplePages: covered.slice(0, 3).map(({ pagePath }) => pagePath),
        hugoExample: first?.finding.hugoElements[0] ?? null,
        astroExample: first?.finding.astroElements[0] ?? null,
        findingIds: covered.map(({ finding }) => finding.id),
      };
    })
    .filter((entry) => entry.pageCount > 0);
  const unmapped = structureFindings
    .filter(({ finding }) => finding.kind === "structure-unmapped")
    .map(({ pagePath, finding }) => ({
      pagePath,
      id: finding.id,
      side: finding.side,
      elements: [...finding.hugoElements, ...finding.astroElements],
      locationKeys: finding.locationKeys,
    }));
  return { mapped, unmapped };
}

/**
 * One group per combination of change types, largest first. A combination's
 * description joins its types' descriptions.
 */
export function buildChangeTypeReport(pageReports: PageReport[]) {
  const groupsByKey = new Map<
    string,
    {
      changeTypes: string[];
      description: string;
      count: number;
      pages: string[];
      example: Pick<ContentFinding, "field" | "hugoText" | "astroText"> & {
        pagePath: string;
        locationKey: string;
      };
      findingIds: string[];
    }
  >();
  for (const report of pageReports) {
    for (const finding of report.findings) {
      if (!("changeTypes" in finding) || !finding.changeTypes) continue;
      const key = finding.changeTypes.join("+");
      const group = groupsByKey.get(key) ?? {
        changeTypes: finding.changeTypes,
        description: describeChangeTypes(finding.changeTypes),
        count: 0,
        pages: [],
        example: {
          pagePath: report.pagePath,
          locationKey: finding.locationKey,
          field: finding.field,
          hugoText: finding.hugoText,
          astroText: finding.astroText,
        },
        findingIds: [],
      };
      group.count += 1;
      if (!group.pages.includes(report.pagePath))
        group.pages.push(report.pagePath);
      group.findingIds.push(finding.id);
      groupsByKey.set(key, group);
    }
  }
  return [...groupsByKey.values()].sort(
    (left, right) => right.count - left.count,
  );
}

function describeChangeTypes(names: string[]): string {
  return names
    .map(
      (name) =>
        changeTypes.find((changeType) => changeType.name === name)
          ?.description ??
        (name === otherChangeType ? "Something else differs too." : name),
    )
    .join(" ");
}

/** Beyond this, the summary defers to `structure.json`. */
const maximumUnmappedInSummary = 50;

/** A short calibration view. The JSON is authoritative. */
export function renderSummary(pageReports: PageReport[]): string {
  const structure = buildStructureReport(pageReports);
  const countOf = (report: PageReport, kind: string) =>
    report.counts.byKind[kind] ?? 0;
  const ranked = [...pageReports].sort(
    (left, right) =>
      countOf(right, "missing-in-astro") +
      countOf(right, "changed") -
      (countOf(left, "missing-in-astro") + countOf(left, "changed")),
  );
  const pageLabel = (report: PageReport) =>
    report.pagePath.replace(/^\/api\/latest\//, "");

  return [
    "# API content QA summary",
    "",
    "Generated from the JSON reports in this folder. The JSON is authoritative.",
    "",
    "## Pages",
    "",
    "| Page | Missing in Astro | Changed | Hugo malformed | Astro malformed | Extra in Astro | Structure | Unmapped |",
    "|---|---|---|---|---|---|---|---|",
    ...ranked.map((report) =>
      [
        pageLabel(report) + (report.astro.present ? "" : " (absent in Astro)"),
        countOf(report, "missing-in-astro"),
        countOf(report, "changed"),
        countOf(report, "hugo-malformed"),
        countOf(report, "astro-malformed"),
        countOf(report, "extra-in-astro"),
        countOf(report, "structure"),
        countOf(report, "structure-unmapped"),
      ]
        .join(" | ")
        .replace(/^/, "| ")
        .concat(" |"),
    ),
    "",
    "## HTML check",
    "",
    'Auto verdicts from the prod HTML, and HTML text that the `.md` comparison can\'t see. "In neither `.md`" chunks are `missing-in-astro` findings; "Only in Astro" chunks are converter omissions, counted only.',
    "",
    "| Page | Astro wrong (auto) | Hugo .md wrong (auto) | In neither .md | Only in Astro |",
    "|---|---|---|---|---|",
    ...ranked.map((report) =>
      [
        pageLabel(report),
        report.counts.byVerdict["astro-wrong"] ?? 0,
        report.counts.byVerdict["hugo-md-wrong"] ?? 0,
        report.hugoHtml?.coverage?.inNeither ?? "",
        report.hugoHtml?.coverage?.inAstroOnly ?? "",
      ]
        .join(" | ")
        .replace(/^/, "| ")
        .concat(" |"),
    ),
    "",
    "## Change types",
    "",
    "Each `changed` finding, grouped by what explains it. `other` means something else differs too.",
    "",
    "| Change types | Findings | Pages |",
    "|---|---|---|",
    ...buildChangeTypeReport(pageReports).map(
      (group) =>
        `| ${group.changeTypes.join(" + ")} | ${group.count} | ${group.pages.length} |`,
    ),
    "",
    "## Structural mappings",
    "",
    "| Mapping | Pages | Hugo | Astro |",
    "|---|---|---|---|",
    ...structure.mapped.map(
      (entry) =>
        `| ${entry.mapping} | ${entry.pageCount} | ${tableCode(entry.hugoExample)} | ${tableCode(entry.astroExample)} |`,
    ),
    "",
    `## Unmapped structure (${structure.unmapped.length})`,
    "",
    ...structure.unmapped
      .slice(0, maximumUnmappedInSummary)
      .map(
        (entry) =>
          `- ${pageLabel({ pagePath: entry.pagePath } as PageReport)}, ${entry.side} only: ${tableCode(entry.elements[0])} at ${entry.locationKeys.slice(0, 3).join(", ")}${entry.locationKeys.length > 3 ? ", …" : ""}`,
      ),
    ...(structure.unmapped.length > maximumUnmappedInSummary
      ? [
          `- …and ${structure.unmapped.length - maximumUnmappedInSummary} more in \`structure.json\`.`,
        ]
      : []),
    "",
  ].join("\n");
}

function tableCode(text: string | null | undefined): string {
  if (!text) return "";
  const shortened = text.length > 60 ? `${text.slice(0, 57)}...` : text;
  return `\`${shortened.replaceAll("|", "\\|")}\``;
}

/**
 * Writes all reports. A full run replaces `out/`; a `--page` run only rewrites
 * that page's file and leaves the index and summary to the next full run.
 */
export function writeReports(
  outDir: string,
  pageReports: PageReport[],
  run: RunMetadata,
  { fullRun }: { fullRun: boolean },
): void {
  if (fullRun) rmSync(outDir, { recursive: true, force: true });
  mkdirSync(path.join(outDir, "pages"), { recursive: true });
  for (const report of pageReports) {
    writeJson(path.join(outDir, "pages", `${report.slug}.json`), report);
  }
  if (!fullRun) return;
  writeJson(path.join(outDir, "index.json"), buildIndex(pageReports, run));
  writeJson(
    path.join(outDir, "structure.json"),
    buildStructureReport(pageReports),
  );
  writeJson(
    path.join(outDir, "changeTypes.json"),
    buildChangeTypeReport(pageReports),
  );
  writeFileSync(path.join(outDir, "summary.md"), renderSummary(pageReports));
}

function writeJson(filePath: string, value: unknown): void {
  writeFileSync(filePath, JSON.stringify(value, null, 2) + "\n");
}
