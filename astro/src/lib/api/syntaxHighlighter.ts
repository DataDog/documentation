/**
 * Build-time syntax highlighting for API code examples.
 *
 * Uses Shiki with the Datadog theme to pre-render highlighted HTML
 * that is passed to CodeBlock components as `highlightedCode`.
 */

import { codeToHtml } from 'shiki';
import datadogLight from '../../styles/shiki-light';
import datadogDark from '../../styles/shiki-dark';
import type { EndpointData } from './schemas/views';

/**
 * Walk all code examples in a single endpoint and populate `highlightedCode`
 * on each entry. Mutates the endpoint in place.
 */
export async function highlightEndpoint(endpoint: EndpointData): Promise<void> {
  const jobs: Promise<void>[] = [];
  collectHighlightJobs(endpoint, jobs);
  await Promise.all(jobs);
}

/**
 * Highlight a single code string. Returns the highlighted HTML,
 * or undefined if highlighting fails.
 */
async function highlight(code: string, lang: string): Promise<string | undefined> {
  try {
    return await codeToHtml(code, {
      lang,
      themes: {
        light: datadogLight,
        dark: datadogDark,
      },
      defaultColor: 'light',
    });
  } catch {
    return undefined;
  }
}

function collectHighlightJobs(ep: EndpointData, jobs: Promise<void>[]): void {
  for (const exSet of ep.codeExamples) {
    for (const entry of exSet.entries) {
      jobs.push(
        highlight(entry.code, entry.syntax).then((html) => {
          if (html) entry.highlightedCode = html;
        })
      );

      if (entry.regionVariants) {
        for (const variant of Object.values(entry.regionVariants)) {
          jobs.push(
            highlight(variant.code, entry.syntax).then((html) => {
              if (html) variant.highlightedCode = html;
            })
          );
        }
      }
    }
  }

  for (const resp of ep.responses) {
    if (resp.examples) {
      for (const ex of resp.examples) {
        jobs.push(
          highlight(ex.value, 'json').then((html) => {
            if (html) ex.highlightedValue = html;
          })
        );
      }
    }
  }

  if (ep.requestBody) {
    for (const ex of ep.requestBody.examples) {
      jobs.push(
        highlight(ex.value, 'json').then((html) => {
          if (html) ex.highlightedValue = html;
        })
      );
    }
  }
}
