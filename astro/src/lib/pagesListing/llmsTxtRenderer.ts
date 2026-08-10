import type { PlaintextPage } from "./types";

/**
 * Renders `llms.txt` from the plaintext pages the site owns.
 *
 * Pages are grouped by their breadcrumb trail (the "Docs" root crumb dropped),
 * mirroring Hugo's `generatePlaintextPageListing`. Group headings are sorted;
 * within a group, pages are sorted by URL for stable output. Private pages are
 * dropped entirely — this is the single place llms.txt honors privacy, shared
 * with `pages.json` through the same `PlaintextPageSource` registry.
 */
export function renderLlmsTxt(
  pages: PlaintextPage[],
  siteOrigin: string,
): string {
  if (!siteOrigin) {
    throw new Error(
      "renderLlmsTxt: siteOrigin is required to emit canonical links.",
    );
  }

  const pagesByGroup = new Map<string, PlaintextPage[]>();
  for (const page of pages) {
    if (page.metadata.isPrivate) continue;
    const group = groupKey(page.metadata.breadcrumbs);
    const bucket = pagesByGroup.get(group);
    if (bucket) {
      bucket.push(page);
    } else {
      pagesByGroup.set(group, [page]);
    }
  }

  const lines: string[] = ["# Datadog Documentation", ""];
  for (const group of [...pagesByGroup.keys()].sort()) {
    if (group.length > 0) {
      lines.push(`## ${group}`, "");
    }
    const pagesInGroup = pagesByGroup
      .get(group)!
      .slice()
      .sort((a, b) => a.urlPath.localeCompare(b.urlPath));
    for (const page of pagesInGroup) {
      lines.push(pageLine(page, siteOrigin));
    }
    lines.push("");
  }

  return lines.join("\n").trimEnd() + "\n";
}

/** Breadcrumb trail as a heading, with the "Docs" root crumb dropped. */
function groupKey(breadcrumbs: string[]): string {
  return breadcrumbs.slice(1).join(" > ").trim();
}

function pageLine(page: PlaintextPage, siteOrigin: string): string {
  const url = `${siteOrigin}${page.urlPath}`;
  const title = page.metadata.title || "Untitled";
  const description = (page.metadata.description || "").trim();
  return description
    ? `- [${title}](${url}): ${description}`
    : `- [${title}](${url})`;
}
