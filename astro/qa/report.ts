import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { EndpointComparison } from './diff.js';

export interface PageResult {
  slug: string;
  similarity: number;
  status: 'match' | 'mismatch';
  endpoints: EndpointComparison[];
  hugoOnlyEndpoints: string[];
  astroOnlyEndpoints: string[];
}

export interface ReportData {
  timestamp: string;
  summary: {
    total: number;
    matched: number;
    mismatched: number;
    hugoOnly: string[];
    astroOnly: string[];
  };
  pages: PageResult[];
}

const MATCH_THRESHOLD = 1.0;

/**
 * Print the console summary report.
 */
export function printConsoleReport(data: ReportData): void {
  const { summary, pages } = data;

  console.log('');
  console.log('API Docs QA Report');
  console.log('==================');
  console.log('');
  console.log(`Pages compared: ${summary.total}`);

  if (summary.hugoOnly.length > 0) {
    const preview = summary.hugoOnly.slice(0, 5).join(', ');
    const more = summary.hugoOnly.length > 5 ? `, ... (+${summary.hugoOnly.length - 5} more)` : '';
    console.log(`Pages only in Hugo: ${summary.hugoOnly.length}  (${preview}${more})`);
  }

  if (summary.astroOnly.length > 0) {
    const preview = summary.astroOnly.slice(0, 5).join(', ');
    const more = summary.astroOnly.length > 5 ? `, ... (+${summary.astroOnly.length - 5} more)` : '';
    console.log(`Pages only in Astro: ${summary.astroOnly.length}  (${preview}${more})`);
  }

  console.log('');
  console.log(`Matching pages: ${summary.matched} / ${summary.total} (${((summary.matched / summary.total) * 100).toFixed(1)}%)`);
  console.log('');

  const mismatched = pages.filter((p) => p.status === 'mismatch');
  if (mismatched.length > 0) {
    console.log('Mismatched pages:');
    for (const page of mismatched) {
      console.log(`  ${page.slug} (${(page.similarity * 100).toFixed(1)}% similar)`);

      if (page.hugoOnlyEndpoints.length > 0) {
        console.log(`    Hugo-only endpoints: ${page.hugoOnlyEndpoints.join(', ')}`);
      }
      if (page.astroOnlyEndpoints.length > 0) {
        console.log(`    Astro-only endpoints: ${page.astroOnlyEndpoints.join(', ')}`);
      }

      const badEndpoints = page.endpoints.filter((e) => e.similarity < MATCH_THRESHOLD);
      for (const ep of badEndpoints.slice(0, 5)) {
        const parts: string[] = [];
        if (ep.missingWords.length > 0) {
          parts.push(`Missing: ${ep.missingWords.slice(0, 5).map((w) => `"${w}"`).join(', ')}`);
        }
        if (ep.extraWords.length > 0) {
          parts.push(`Extra: ${ep.extraWords.slice(0, 5).map((w) => `"${w}"`).join(', ')}`);
        }
        console.log(`    - "${ep.heading}" (${(ep.similarity * 100).toFixed(1)}%): ${parts.join(' | ')}`);
      }
      if (badEndpoints.length > 5) {
        console.log(`    ... and ${badEndpoints.length - 5} more endpoints`);
      }
    }
  } else {
    console.log('All pages match!');
  }

  console.log('');
}

/**
 * Write the full JSON report to disk.
 */
export function writeJsonReport(data: ReportData, outputDir: string): string {
  const outPath = resolve(outputDir, 'report.json');
  writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`Full details written to: ${outPath}`);
  return outPath;
}

/**
 * Build a PageResult from comparison data.
 */
export function buildPageResult(
  slug: string,
  pageSimilarity: number,
  endpoints: EndpointComparison[],
  hugoOnlyEndpoints: string[],
  astroOnlyEndpoints: string[],
): PageResult {
  const status = pageSimilarity >= MATCH_THRESHOLD &&
    hugoOnlyEndpoints.length === 0 &&
    astroOnlyEndpoints.length === 0
    ? 'match'
    : 'mismatch';

  return {
    slug,
    similarity: pageSimilarity,
    status,
    endpoints,
    hugoOnlyEndpoints,
    astroOnlyEndpoints,
  };
}
