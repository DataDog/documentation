/**
 * Rejoins table rows that a raw line break split across lines.
 *
 * A line break inside a cell ends a Markdown table, so every row after it
 * parses as a paragraph. Without the repair the content compare would report
 * the rest of the table as missing. The repair is not silent:
 * `extractPage` marks each repaired row `malformed`, and alignment reports it.
 *
 * A row is repaired only when it starts with `|`, follows another table line,
 * does not end with `|`, and a later line (before the next row) does.
 */

export interface RepairedMarkdown {
  markdown: string;
  /** 0-based line numbers of repaired rows, in the repaired markdown. */
  repairedRowLines: Set<number>;
}

export function repairTableRowLineBreaks(markdown: string): RepairedMarkdown {
  const lines = markdown.split("\n");
  const outputLines: string[] = [];
  const repairedRowLines = new Set<number>();
  let isInFence = false;

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    if (isFenceDelimiter(line)) isInFence = !isInFence;
    const closingIndex = isInFence
      ? -1
      : closingLineIndexOf(lines, index, outputLines.at(-1));
    if (closingIndex === -1) {
      outputLines.push(line);
      continue;
    }
    repairedRowLines.add(outputLines.length);
    outputLines.push(
      lines
        .slice(index, closingIndex + 1)
        .map((part) => part.trim())
        .filter((part) => part !== "")
        .join(" "),
    );
    index = closingIndex;
  }
  return { markdown: outputLines.join("\n"), repairedRowLines };
}

/** The index of the line that closes an unterminated row, or -1. */
function closingLineIndexOf(
  lines: string[],
  rowIndex: number,
  previousLine: string | undefined,
): number {
  const row = lines[rowIndex];
  const isUnterminatedRow =
    isTableLine(row) &&
    previousLine !== undefined &&
    isTableLine(previousLine) &&
    !row.trimEnd().endsWith("|");
  if (!isUnterminatedRow) return -1;

  for (let index = rowIndex + 1; index < lines.length; index++) {
    const line = lines[index];
    if (isTableLine(line) || isFenceDelimiter(line)) return -1;
    if (line.trimEnd().endsWith("|")) return index;
  }
  return -1;
}

function isTableLine(line: string): boolean {
  return line.trimStart().startsWith("|");
}

function isFenceDelimiter(line: string): boolean {
  return line.trimStart().startsWith("```");
}
