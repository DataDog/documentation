import { readdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { extractPageText, extractPageTextNoCode, extractEndpointTexts, extractEndpointTextsNoCode } from './extract.js';
import { similarity, compareEndpoints } from './diff.js';
import { buildPageResult, printConsoleReport, writeJsonReport, type PageResult, type ReportData } from './report.js';

// Resolve paths relative to the repo root (one level above astro/)
const REPO_ROOT = resolve(import.meta.dirname, '..', '..');
const HUGO_DIR = join(REPO_ROOT, 'public', 'api', 'latest');
const ASTRO_DIR = join(REPO_ROOT, 'astro', 'dist', 'api', 'latest');
const QA_DIR = resolve(import.meta.dirname);

interface Options {
  json: boolean;
  page: string | null;
  noCode: boolean;
}

function parseArgs(): Options {
  const args = process.argv.slice(2);
  const opts: Options = { json: false, page: null, noCode: false };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--json') {
      opts.json = true;
    } else if (args[i] === '--page' && args[i + 1]) {
      opts.page = args[++i];
    } else if (args[i] === '--no-code') {
      opts.noCode = true;
    }
  }

  return opts;
}

/**
 * Discover all API page slugs from a built directory.
 * Each slug is a subdirectory under the api/latest/ dir that contains an index.html.
 */
function discoverPages(dir: string): Set<string> {
  if (!existsSync(dir)) {
    return new Set();
  }

  const entries = readdirSync(dir, { withFileTypes: true });
  const slugs = new Set<string>();

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const indexPath = join(dir, entry.name, 'index.html');
      if (existsSync(indexPath)) {
        slugs.add(entry.name);
      }
    }
  }

  return slugs;
}

function findHtmlPath(baseDir: string, slug: string): string {
  return join(baseDir, slug, 'index.html');
}

function main(): void {
  const opts = parseArgs();

  // Validate build directories exist
  if (!existsSync(HUGO_DIR)) {
    console.error(`Hugo build not found at: ${HUGO_DIR}`);
    console.error('Run "yarn run build:hugo" from the repo root first.');
    process.exit(1);
  }
  if (!existsSync(ASTRO_DIR)) {
    console.error(`Astro build not found at: ${ASTRO_DIR}`);
    console.error('Run "npm run build" from the astro/ directory first.');
    process.exit(1);
  }

  // Choose extraction functions based on --no-code flag
  const extractPage = opts.noCode ? extractPageTextNoCode : extractPageText;
  const extractEndpoints = opts.noCode ? extractEndpointTextsNoCode : extractEndpointTexts;

  // Discover pages
  const hugoPages = discoverPages(HUGO_DIR);
  const astroPages = discoverPages(ASTRO_DIR);

  // Filter to single page if requested
  let pagesToCompare: string[];
  if (opts.page) {
    if (!hugoPages.has(opts.page) && !astroPages.has(opts.page)) {
      console.error(`Page "${opts.page}" not found in either Hugo or Astro builds.`);
      process.exit(1);
    }
    pagesToCompare = [opts.page];
  } else {
    // Compare the union of both page sets
    pagesToCompare = [...new Set([...hugoPages, ...astroPages])].sort();
  }

  // Find pages that only exist in one build
  const hugoOnly = pagesToCompare.filter((p) => hugoPages.has(p) && !astroPages.has(p));
  const astroOnly = pagesToCompare.filter((p) => !hugoPages.has(p) && astroPages.has(p));
  const commonPages = pagesToCompare.filter((p) => hugoPages.has(p) && astroPages.has(p));

  // Compare common pages
  const pageResults: PageResult[] = [];
  let matchCount = 0;

  for (const slug of commonPages) {
    const hugoPath = findHtmlPath(HUGO_DIR, slug);
    const astroPath = findHtmlPath(ASTRO_DIR, slug);

    // Page-level comparison
    const hugoText = extractPage(hugoPath, 'hugo');
    const astroText = extractPage(astroPath, 'astro');
    const pageSim = similarity(hugoText, astroText);

    // Endpoint-level comparison
    const hugoEndpoints = extractEndpoints(hugoPath, 'hugo');
    const astroEndpoints = extractEndpoints(astroPath, 'astro');
    const endpointResult = compareEndpoints(hugoEndpoints, astroEndpoints);

    const result = buildPageResult(
      slug,
      pageSim,
      endpointResult.matched,
      endpointResult.hugoOnly,
      endpointResult.astroOnly,
    );

    pageResults.push(result);
    if (result.status === 'match') matchCount++;
  }

  // Sort mismatched pages first (by similarity ascending)
  pageResults.sort((a, b) => {
    if (a.status !== b.status) return a.status === 'mismatch' ? -1 : 1;
    return a.similarity - b.similarity;
  });

  // Build report
  const report: ReportData = {
    timestamp: new Date().toISOString(),
    summary: {
      total: commonPages.length,
      matched: matchCount,
      mismatched: commonPages.length - matchCount,
      hugoOnly,
      astroOnly,
    },
    pages: pageResults,
  };

  // Output
  printConsoleReport(report);

  if (opts.json) {
    writeJsonReport(report, QA_DIR);
  }
}

main();
