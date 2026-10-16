#!/usr/bin/env node
/**
 * Compares Astro API pages against their prod Hugo counterparts on content
 * and writes JSON reports to `qa/content/out/`. See
 * `plans/30_api_content_qa_reporting.md`.
 *
 * Runs as TypeScript directly under Node 24's type-stripping.
 *
 * Usage: node qa/content/compare.ts [--refresh] [--page <path>]
 *
 * A full run replaces `out/`. A `--page` run writes only that page's report
 * and prints its counts, for calibration.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { adjudicate, checkCoverage } from "./adjudicateHtml.ts";
import {
  alignUnits,
  malformedUnitFindings,
  type ContentFinding,
} from "./alignUnits.ts";
import { diffStructure, type StructureFinding } from "./diffStructure.ts";
import { extractHtmlChunks } from "./extractHtml.ts";
import { extractPage } from "./extractUnits.ts";
import {
  distBuiltAt,
  loadAstroMarkdown,
  loadHugoHtml,
  loadHugoMarkdown,
  readPageList,
} from "./fetchPages.ts";
import { normalizeMarkdown } from "./normalize.ts";
import { buildPageReport, writeReports, type PageReport } from "./report.ts";
import { withChangeTypes } from "./changeTypes.ts";
import { applyTextForms } from "./textForms.ts";

const qaRoot = import.meta.dirname;
const outDir = path.join(qaRoot, "out");
const specStampPath = path.resolve(qaRoot, "../../api-spec/.stamp.json");

async function comparePage(
  pagePath: string,
  { refresh }: { refresh: boolean },
): Promise<PageReport> {
  const astro = loadAstroMarkdown(pagePath);
  const hugo = await loadHugoMarkdown(pagePath, { refresh });
  const sides = {
    astro: { source: astro.source, present: astro.text !== null },
    hugo: {
      source: hugo.source,
      status: hugo.status,
      fetchedAt: hugo.fetchedAt,
    },
  };

  if (astro.text === null || hugo.text === null) {
    return buildPageReport(
      pagePath,
      sides,
      [],
      [pagePresenceFinding(astro.text === null ? "astro" : "hugo")],
    );
  }

  const hugoPage = extractPage(normalizeMarkdown(hugo.text));
  const astroPage = extractPage(normalizeMarkdown(astro.text));
  const phrased = applyTextForms(hugoPage.units, astroPage.units);
  const contentFindings: ContentFinding[] = [
    ...malformedUnitFindings(hugoPage.units, "hugo"),
    ...malformedUnitFindings(astroPage.units, "astro"),
    ...withChangeTypes(alignUnits(phrased.hugoUnits, phrased.astroUnits)),
  ];

  const html = await loadHugoHtml(pagePath, { refresh });
  const htmlChunks = html.text === null ? null : extractHtmlChunks(html.text);
  const coverage =
    htmlChunks &&
    checkCoverage(htmlChunks, hugoPage.units, astroPage.units, {
      hugoOutline: hugoPage.outline,
      astroOutline: astroPage.outline,
    });
  return buildPageReport(
    pagePath,
    {
      ...sides,
      hugoHtml: {
        source: html.source,
        status: html.status,
        fetchedAt: html.fetchedAt,
        coverage: coverage?.counts ?? null,
      },
    },
    htmlChunks
      ? [...adjudicate(contentFindings, htmlChunks), ...coverage!.findings]
      : contentFindings,
    [
      ...diffStructure(hugoPage.outline, astroPage.outline),
      ...phrased.findings,
    ],
  );
}

function pagePresenceFinding(absentSide: "astro" | "hugo"): StructureFinding {
  return {
    kind: "structure",
    mapping: `page-absent-in-${absentSide}`,
    locationKeys: ["page"],
    hugoElements: absentSide === "hugo" ? [] : ["page"],
    astroElements: absentSide === "astro" ? [] : ["page"],
  };
}

function readSpecStamp(): unknown {
  try {
    return JSON.parse(readFileSync(specStampPath, "utf8"));
  } catch {
    return null;
  }
}

function printCounts(report: PageReport): void {
  const describe = (counted: Record<string, number>) =>
    Object.entries(counted)
      .map(([key, count]) => `${key}: ${count}`)
      .join(", ");
  console.log(
    `${report.pagePath}\n  ${describe(report.counts.byKind) || "no findings"}`,
  );
  if (Object.keys(report.counts.byHtmlCheck).length === 0) return;
  console.log(`  html: ${describe(report.counts.byHtmlCheck)}`);
  console.log(`  verdicts: ${describe(report.counts.byVerdict)}`);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const refresh = args.includes("--refresh");
  const pageFlagIndex = args.indexOf("--page");
  const fullRun = pageFlagIndex === -1;
  const pagePaths = fullRun ? readPageList() : [args[pageFlagIndex + 1]];

  const pageReports: PageReport[] = [];
  for (const pagePath of pagePaths) {
    pageReports.push(await comparePage(pagePath, { refresh }));
  }

  writeReports(
    outDir,
    pageReports,
    {
      generatedAt: new Date().toISOString(),
      distBuiltAt: distBuiltAt(),
      specBundle: readSpecStamp(),
    },
    { fullRun },
  );
  pageReports.forEach(printCounts);
  console.log(`\nReports written to ${path.relative(process.cwd(), outDir)}/`);
}

if (import.meta.main) await main();
