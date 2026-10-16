/**
 * Uses the prod Hugo HTML to arbitrate between Hugo's `.md` and Astro's
 * (pipeline step 8 in the plan).
 *
 * - `adjudicate` finds the HTML chunk each content finding is about and
 *   records which side it matches as `htmlCheck`. A match on one side only
 *   sets an `auto` verdict: `hugo-md-wrong` when the HTML matches Astro,
 *   `astro-wrong` when it matches the Hugo `.md`.
 * - `checkCoverage` looks for HTML chunks found in neither `.md`, which the
 *   converter hid from the comparison, and reports them as `missing-in-astro`.
 *
 * Texts are compared as lowercase word tokens, so punctuation, Markdown
 * escapes and JSON formatting don't count. Schema rows are compared without
 * their field cell, because the HTML shows the bare field name.
 */
import { wordDiff, type ContentFinding } from "./alignUnits.ts";
import { changeTypesOf } from "./changeTypes.ts";
import type { HtmlChunk } from "./extractHtml.ts";
import type { ContentUnit, OutlineEntry, UnitKind } from "./extractUnits.ts";
import type { Verdict } from "./report.ts";

export type HtmlCheckResult =
  | "matches-astro"
  | "matches-hugo-md"
  | "matches-neither"
  /** Different HTML chunks match different sides. */
  | "ambiguous"
  | "not-found"
  | "not-applicable";

export interface HtmlCheck {
  result: HtmlCheckResult;
  /** The HTML chunk the finding was compared with, truncated. */
  htmlText?: string;
  htmlContext?: string;
}

export type AdjudicatedFinding = ContentFinding & {
  htmlCheck: HtmlCheck;
  verdict?: Verdict;
  auto?: true;
};

export interface CoverageCounts {
  htmlChunks: number;
  inBoth: number;
  inHugoMdOnly: number;
  inAstroOnly: number;
  inNeither: number;
}

/** HTML chunk kinds that can hold each unit kind's text. */
const chunkKindsByUnitKind: Record<UnitKind, HtmlChunk["kind"][]> = {
  heading: ["heading"],
  label: ["heading", "paragraph"],
  prose: ["paragraph", "listItem"],
  tableRow: ["tableRow", "endpoint"],
  code: ["code"],
  link: [],
};

const unitKindByChunkKind: Record<HtmlChunk["kind"], UnitKind> = {
  heading: "heading",
  paragraph: "prose",
  listItem: "prose",
  tableRow: "tableRow",
  endpoint: "tableRow",
  code: "code",
  tab: "label",
};

/** Below this word overlap, the closest chunk isn't the finding's. */
const minimumCandidateSimilarity = 0.5;
const maximumQuotedLength = 300;
const maximumRunGap = 2;

export function adjudicate(
  findings: ContentFinding[],
  chunks: HtmlChunk[],
): AdjudicatedFinding[] {
  const index = indexChunks(chunks);
  return findings.flatMap((finding) => {
    const htmlCheck = checkFinding(finding, index);
    const adjudicated = withVerdict(finding, htmlCheck);
    return isHiddenCodeChange(finding, htmlCheck)
      ? [adjudicated, hiddenCodeChange(finding, htmlCheck)]
      : [adjudicated];
  });
}

function withVerdict(
  finding: ContentFinding,
  htmlCheck: HtmlCheck,
): AdjudicatedFinding {
  const verdict = verdictOf(htmlCheck.result, finding.kind);
  return verdict
    ? { ...finding, htmlCheck, verdict, auto: true }
    : { ...finding, htmlCheck };
}

/**
 * A malformed finding whose code the HTML fences, but not as Astro has it:
 * the code itself differs (or Astro has none), which the malformed finding
 * alone would hide.
 */
function isHiddenCodeChange(
  finding: ContentFinding,
  htmlCheck: HtmlCheck,
): boolean {
  return (
    finding.kind === "hugo-malformed" && htmlCheck.result === "matches-neither"
  );
}

function hiddenCodeChange(
  finding: ContentFinding,
  htmlCheck: HtmlCheck,
): AdjudicatedFinding {
  const hugoText = finding.hugoText ?? "";
  const astroText = finding.astroText;
  if (astroText === undefined) {
    return withVerdict(
      {
        kind: "missing-in-astro",
        unitKind: "code",
        locationKey: finding.locationKey,
        hugoText,
      },
      { ...htmlCheck, result: "matches-hugo-md" },
    );
  }
  const changed: ContentFinding = {
    kind: "changed",
    unitKind: "code",
    locationKey: finding.locationKey,
    ...(finding.astroLocationKey !== undefined && {
      astroLocationKey: finding.astroLocationKey,
    }),
    hugoText,
    astroText,
    diff: wordDiff(hugoText, astroText),
  };
  return withVerdict(
    { ...changed, changeTypes: changeTypesOf(changed) },
    { ...htmlCheck, result: "matches-hugo-md" },
  );
}

export function checkCoverage(
  chunks: HtmlChunk[],
  hugoUnits: ContentUnit[],
  astroUnits: ContentUnit[],
  {
    hugoOutline = [],
    astroOutline = [],
  }: { hugoOutline?: OutlineEntry[]; astroOutline?: OutlineEntry[] } = {},
): { findings: ContentFinding[]; counts: CoverageCounts } {
  const hugoSide = sideOf(hugoUnits, hugoOutline);
  const astroSide = sideOf(astroUnits, astroOutline);
  const counts: CoverageCounts = {
    htmlChunks: 0,
    inBoth: 0,
    inHugoMdOnly: 0,
    inAstroOnly: 0,
    inNeither: 0,
  };
  const findings: ContentFinding[] = [];

  for (const chunk of chunks) {
    if (chunk.kind === "tab") continue;
    counts.htmlChunks++;
    const inHugo = sideHasChunk(hugoSide, chunk);
    const inAstro = sideHasChunk(astroSide, chunk);
    if (inHugo && inAstro) counts.inBoth++;
    else if (inHugo) counts.inHugoMdOnly++;
    else if (inAstro) counts.inAstroOnly++;
    else {
      counts.inNeither++;
      findings.push(coverageFinding(chunk));
    }
  }
  return { findings, counts };
}

interface ChunkIndex {
  chunksByKind: Map<HtmlChunk["kind"], HtmlChunk[]>;
  rowsByField: Map<string, HtmlChunk[]>;
  rowsByBareField: Map<string, HtmlChunk[]>;
}

function indexChunks(chunks: HtmlChunk[]): ChunkIndex {
  const index: ChunkIndex = {
    chunksByKind: new Map(),
    rowsByField: new Map(),
    rowsByBareField: new Map(),
  };
  for (const chunk of chunks) {
    pushTo(index.chunksByKind, chunk.kind, chunk);
    if (chunk.field === undefined) continue;
    pushTo(index.rowsByField, chunk.field, chunk);
    pushTo(index.rowsByBareField, bareFieldOf(chunk.field), chunk);
  }
  return index;
}

function checkFinding(finding: ContentFinding, index: ChunkIndex): HtmlCheck {
  if (chunkKindsByUnitKind[finding.unitKind].length === 0) {
    return { result: "not-applicable" };
  }
  switch (finding.kind) {
    case "changed":
      return checkChanged(finding, index);
    case "missing-in-astro":
      return checkOneSide(finding, index, finding.hugoText, "matches-hugo-md");
    case "extra-in-astro":
      return checkOneSide(finding, index, finding.astroText, "matches-astro");
    case "paragraph-split":
      return checkParagraphSplit(finding, index);
    case "hugo-malformed":
      return checkMergedOrUnfencedCode(finding, index);
    default:
      return { result: "not-applicable" };
  }
}

/**
 * Whole texts first. Otherwise, the words each side has and the other lacks
 * decide: a side matches the HTML when the HTML has all of its own words and
 * none of the other side's.
 */
function checkChanged(finding: ContentFinding, index: ChunkIndex): HtmlCheck {
  const hugoTokens = comparableTokensOf(finding.hugoText ?? "", finding);
  const astroTokens = comparableTokensOf(finding.astroText ?? "", finding);
  const runs = finding.diff ? changedRuns(finding) : null;
  return judgeCandidates(
    candidateChunks(finding, index, finding.hugoText, finding.astroText),
    (chunkTokens) => {
      let hugoMatches = sameTokens(hugoTokens, chunkTokens);
      let astroMatches = sameTokens(astroTokens, chunkTokens);
      if (!hugoMatches && !astroMatches && runs) {
        // Biased toward flagging Astro: its runs must appear exactly, while
        // Hugo's may have gaps (they're in the text forms' rewritten phrasing).
        const hasHugoRun = (run: string[]) =>
          containsLooseRun(chunkTokens, run);
        const hasAstroRun = (run: string[]) => containsRun(chunkTokens, run);
        hugoMatches =
          runs.hugoOnly.every(hasHugoRun) && !runs.astroOnly.some(hasAstroRun);
        astroMatches =
          runs.astroOnly.every(hasAstroRun) && !runs.hugoOnly.some(hasHugoRun);
      }
      return resultOf(hugoMatches, astroMatches);
    },
  );
}

/**
 * Missing or extra: only the presence of the one side's text counts. Hugo's
 * text may sit inside a longer chunk, which flags Astro; Astro's must equal a
 * chunk to clear it.
 */
function checkOneSide(
  finding: ContentFinding,
  index: ChunkIndex,
  text: string | undefined,
  resultWhenFound: HtmlCheckResult,
): HtmlCheck {
  const textTokens = comparableTokensOf(text ?? "", finding);
  const isFound =
    resultWhenFound === "matches-astro"
      ? (chunkTokens: string[]) =>
          textTokens.length > 0 && sameTokens(textTokens, chunkTokens)
      : (chunkTokens: string[]) => sameOrContained(textTokens, chunkTokens);
  return judgeCandidates(
    candidateChunks(finding, index, text),
    (chunkTokens) =>
      isFound(chunkTokens) ? resultWhenFound : "matches-neither",
  );
}

/**
 * Judges every candidate, so the verdict doesn't depend on which of several
 * same-field rows happened to be closest. Candidates that match opposite sides
 * make the result `ambiguous`.
 */
function judgeCandidates(
  candidates: HtmlChunk[],
  judge: (chunkTokens: string[]) => HtmlCheckResult,
): HtmlCheck {
  if (candidates.length === 0) return { result: "not-found" };
  const judged = candidates.map((chunk) => ({
    chunk,
    result: judge(comparableTokensOfChunk(chunk)),
  }));
  const firstWith = (result: HtmlCheckResult) =>
    judged.find((judgement) => judgement.result === result)?.chunk;
  const matchesHugo = firstWith("matches-hugo-md");
  const matchesAstro = firstWith("matches-astro");
  if (matchesHugo && matchesAstro) {
    return withEvidence("ambiguous", candidates[0]);
  }
  if (matchesHugo) return withEvidence("matches-hugo-md", matchesHugo);
  if (matchesAstro) return withEvidence("matches-astro", matchesAstro);
  return withEvidence("matches-neither", candidates[0]);
}

/** Astro's paragraphs are joined with blank lines; the HTML decides which is right. */
function checkParagraphSplit(
  finding: ContentFinding,
  index: ChunkIndex,
): HtmlCheck {
  const paragraphs = chunksOfKinds(index, ["paragraph", "listItem"]);
  const findParagraph = (text: string) =>
    paragraphs.find((chunk) =>
      sameTokens(tokensOf(text), tokensOf(chunk.text)),
    );
  const whole = findParagraph(finding.hugoText ?? "");
  if (whole) return withEvidence("matches-hugo-md", whole);
  const parts = (finding.astroText ?? "").split("\n\n").map(findParagraph);
  if (parts.every(Boolean)) return withEvidence("matches-astro", parts[0]!);
  return { result: "not-found" };
}

/**
 * Hugo's `.md` lost a code fence, so its prose ends with (or is) the code.
 * The HTML matches Astro when it has that code as a code block and Astro's
 * text ends with the same code. Unfenced code can also have lost words, such
 * as a curl URL, so it falls back to the most similar code block.
 */
function checkMergedOrUnfencedCode(
  finding: ContentFinding,
  index: ChunkIndex,
): HtmlCheck {
  const hugoTokens = tokensOf(finding.hugoText ?? "");
  const fencedCode =
    (index.chunksByKind.get("code") ?? [])
      .filter((chunk) => endsWithRun(hugoTokens, tokensOf(chunk.text)))
      .sort((left, right) => right.text.length - left.text.length)[0] ??
    (finding.reason === "unfenced-code"
      ? candidateChunks(finding, index, finding.hugoText)[0]
      : undefined);
  if (!fencedCode) return { result: "not-found" };
  const astroMatches = endsWithRun(
    tokensOf(finding.astroText ?? ""),
    tokensOf(fencedCode.text),
  );
  return withEvidence(
    astroMatches ? "matches-astro" : "matches-neither",
    fencedCode,
  );
}

/**
 * Schema rows by field, falling back to the bare field when the `.md` names
 * the parent differently, and never by description alone. Everything else by
 * word overlap with either text. Closest first.
 */
function candidateChunks(
  finding: ContentFinding,
  index: ChunkIndex,
  ...texts: (string | undefined)[]
): HtmlChunk[] {
  const fieldRows =
    finding.field === undefined
      ? undefined
      : (index.rowsByField.get(finding.field) ??
        index.rowsByBareField.get(bareFieldOf(finding.field)) ??
        []);
  const textTokens = texts
    .filter((text) => text !== undefined)
    .map((text) => new Set(comparableTokensOf(text, finding)));
  const similarityTo = (chunk: HtmlChunk) => {
    const chunkTokens = new Set(comparableTokensOfChunk(chunk));
    return Math.max(
      ...textTokens.map((tokens) => setDice(tokens, chunkTokens)),
    );
  };
  return (
    fieldRows ?? chunksOfKinds(index, chunkKindsByUnitKind[finding.unitKind])
  )
    .map((chunk) => ({ chunk, similarity: similarityTo(chunk) }))
    .filter(
      ({ similarity }) => fieldRows || similarity >= minimumCandidateSimilarity,
    )
    .sort((left, right) => right.similarity - left.similarity)
    .map(({ chunk }) => chunk);
}

/**
 * Ambiguous results flag Astro: a false alarm is cheaper than a miss. So does
 * Astro-only text the HTML lacks exactly, since the HTML agrees with Hugo's
 * `.md` in lacking it.
 */
function verdictOf(
  result: HtmlCheckResult,
  findingKind: ContentFinding["kind"],
): Verdict | undefined {
  if (result === "matches-astro") return "hugo-md-wrong";
  if (result === "matches-hugo-md" || result === "ambiguous") {
    return "astro-wrong";
  }
  if (findingKind === "extra-in-astro" && result !== "not-applicable") {
    return "astro-wrong";
  }
  return undefined;
}

function resultOf(
  hugoMatches: boolean,
  astroMatches: boolean,
): HtmlCheckResult {
  if (hugoMatches === astroMatches) return "matches-neither";
  return hugoMatches ? "matches-hugo-md" : "matches-astro";
}

function withEvidence(result: HtmlCheckResult, chunk: HtmlChunk): HtmlCheck {
  return {
    result,
    htmlText: truncate(chunk.text),
    htmlContext: chunk.context,
  };
}

/**
 * The runs of tokens that one side has and the other lacks. The texts are the
 * ones the stored diff was built from (after text forms), re-diffed as tokens
 * so that `min.` and `min,` are the same word.
 */
function changedRuns(finding: ContentFinding): {
  hugoOnly: string[][];
  astroOnly: string[][];
} {
  const sideText = (excludedOp: "insert" | "delete") =>
    comparableTokensOf(
      (finding.diff ?? [])
        .filter((part) => part.op !== excludedOp)
        .map((part) => part.text)
        .join(" "),
      finding,
    ).join(" ");
  const tokenDiff = wordDiff(sideText("insert"), sideText("delete"));
  const runsOf = (op: "delete" | "insert") =>
    tokenDiff
      .filter((part) => part.op === op)
      .map((part) => part.text.split(" ").filter(Boolean));
  return { hugoOnly: runsOf("delete"), astroOnly: runsOf("insert") };
}

interface Side {
  fields: Set<string>;
  /** Every unit's tokens, space-joined and space-padded, for run lookups. */
  joinedTokens: string;
}

/** Outline elements count too: the `.md`s keep section headings there. */
function sideOf(units: ContentUnit[], outline: OutlineEntry[]): Side {
  const texts = [
    ...units.flatMap((unit) =>
      unit.sourceText === undefined
        ? [unit.text]
        : [unit.text, unit.sourceText],
    ),
    ...outline.map((entry) => entry.element),
  ];
  return {
    fields: new Set(
      units.flatMap((unit) => (unit.field === undefined ? [] : [unit.field])),
    ),
    // `|` never appears in a token, so a run can't span two units.
    joinedTokens: ` ${texts.map((text) => tokensOf(text).join(" ")).join(" | ")} `,
  };
}

/** A schema row counts by field; its text differences are `changed` findings. */
function sideHasChunk(side: Side, chunk: HtmlChunk): boolean {
  if (chunk.field !== undefined && side.fields.has(chunk.field)) return true;
  const chunkTokens = tokensOf(chunk.text);
  return (
    chunkTokens.length > 0 &&
    side.joinedTokens.includes(` ${chunkTokens.join(" ")} `)
  );
}

function coverageFinding(chunk: HtmlChunk): ContentFinding {
  return {
    kind: "missing-in-astro",
    foundBy: "html-coverage",
    unitKind: unitKindByChunkKind[chunk.kind],
    locationKey: `html:${chunk.context}`,
    ...(chunk.field !== undefined && { field: chunk.field }),
    htmlText: chunk.text,
  };
}

function comparableTokensOf(text: string, finding: ContentFinding): string[] {
  return tokensOf(finding.field === undefined ? text : withoutFirstCell(text));
}

function comparableTokensOfChunk(chunk: HtmlChunk): string[] {
  return tokensOf(
    chunk.field === undefined ? chunk.text : withoutFirstCell(chunk.text),
  );
}

function withoutFirstCell(rowText: string): string {
  return rowText.split(" | ").slice(1).join(" | ");
}

function tokensOf(text: string): string[] {
  return text.toLowerCase().match(/[\p{L}\p{N}_]+/gu) ?? [];
}

function sameTokens(left: string[], right: string[]): boolean {
  return (
    left.length === right.length && left.every((token, i) => token === right[i])
  );
}

function sameOrContained(needle: string[], haystack: string[]): boolean {
  return needle.length > 0 && containsRun(haystack, needle);
}

function containsRun(haystack: string[], run: string[]): boolean {
  return ` ${haystack.join(" ")} `.includes(` ${run.join(" ")} `);
}

/**
 * The run's tokens in order, with at most `maximumRunGap` other tokens between
 * neighbors. Text forms rewrite Hugo's phrasing (`Allowed enum values` →
 * `Allowed values`) but the HTML keeps it.
 */
function containsLooseRun(haystack: string[], run: string[]): boolean {
  for (let start = 0; start < haystack.length; start++) {
    if (haystack[start] !== run[0]) continue;
    let position = start;
    let matched = 1;
    while (matched < run.length) {
      const next = haystack.indexOf(run[matched], position + 1);
      if (next === -1 || next - position - 1 > maximumRunGap) break;
      position = next;
      matched++;
    }
    if (matched === run.length) return true;
  }
  return false;
}

function endsWithRun(tokens: string[], run: string[]): boolean {
  return (
    run.length > 0 &&
    run.length <= tokens.length &&
    sameTokens(tokens.slice(tokens.length - run.length), run)
  );
}

function setDice(left: Set<string>, right: Set<string>): number {
  if (left.size === 0 && right.size === 0) return 1;
  let shared = 0;
  for (const token of left) if (right.has(token)) shared++;
  return (2 * shared) / (left.size + right.size);
}

function chunksOfKinds(
  index: ChunkIndex,
  kinds: HtmlChunk["kind"][],
): HtmlChunk[] {
  return kinds.flatMap((kind) => index.chunksByKind.get(kind) ?? []);
}

function bareFieldOf(field: string): string {
  return field.slice(field.lastIndexOf(".") + 1);
}

function truncate(text: string): string {
  return text.length > maximumQuotedLength
    ? `${text.slice(0, maximumQuotedLength)}…`
    : text;
}

function pushTo<Key, Value>(map: Map<Key, Value[]>, key: Key, value: Value) {
  const values = map.get(key);
  if (values) values.push(value);
  else map.set(key, [value]);
}
