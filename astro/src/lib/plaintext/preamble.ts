/**
 * The preamble every plaintext (`.md`) page opens with: YAML frontmatter, then a
 * banner pointing at the top-level `llms.txt`. Mirrors the output of Hugo's
 * `html-to-mdoc` converter, so both sites' `.md` pages read the same way.
 */

import { stringify as stringifyYaml } from "yaml";
import type { BreadcrumbItem } from "@components/Breadcrumbs/Breadcrumbs.astro";
import { absoluteUrl } from "@lib/site/siteUrl";
import {
  Ast,
  buildMarkdocStr,
  inline,
  link,
  paragraph,
  plaintext,
} from "@lib/plaintext/helpers";

export interface PreambleData {
  title: string;
  /** Left out of the frontmatter when empty. */
  description: string;
  /** The page's own breadcrumb trail, current page included. */
  breadcrumbs: BreadcrumbItem[];
  /** The route's `site`, so the banner link carries any preview base path. */
  site: string | URL | undefined;
}

export function prependPreamble(body: string, data: PreambleData): string {
  return `${frontmatter(data)}\n${llmsTxtBanner(data.site)}\n${body}`;
}

function frontmatter({
  title,
  description,
  breadcrumbs,
}: PreambleData): string {
  const fields = {
    title,
    ...(description ? { description } : {}),
    breadcrumbs: breadcrumbs.map((crumb) => crumb.label).join(" > "),
  };
  return `---\n${stringifyYaml(fields, { lineWidth: 0 })}---\n`;
}

function llmsTxtBanner(site: string | URL | undefined): string {
  if (!site) {
    throw new Error(
      "astro.config.mjs `site` must be set for the llms.txt banner to link canonically.",
    );
  }
  const blockquote = new Ast.Node("blockquote", {}, [
    paragraph([
      inline([
        plaintext("For the complete documentation index, see "),
        link(absoluteUrl("/llms.txt", site), "llms.txt"),
        plaintext("."),
      ]),
    ]),
  ]);
  return buildMarkdocStr([blockquote]);
}
