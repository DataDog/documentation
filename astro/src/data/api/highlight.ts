/**
 * Build-time syntax highlighting for API code examples.
 *
 * Uses Shiki with the Datadog theme to pre-render highlighted HTML
 * that is passed to CodeBlock components as `highlightedCode`.
 */

import { codeToHtml } from 'shiki';
import datadogLight from '../../styles/shiki-datadog';
import datadogDark from '../../styles/shiki-datadog-dark';
import type { EndpointData } from './endpoints';

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

/**
 * Walk all code examples in the given endpoints and populate
 * `highlightedCode` on each entry. Mutates the endpoints in place.
 */
export async function highlightEndpoints(endpoints: EndpointData[]): Promise<void> {
  const jobs: Promise<void>[] = [];

  for (const ep of endpoints) {
    for (const exSet of ep.codeExamples) {
      for (const entry of exSet.entries) {
        jobs.push(
          highlight(entry.code, entry.syntax).then((html) => {
            if (html) entry.highlightedCode = html;
          })
        );
      }
    }

    // Highlight response examples
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

    // Highlight request body examples
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

  await Promise.all(jobs);
}
