/**
 * Pairs Hugo units with Astro units (pipeline step 4) and turns whatever
 * doesn't pair exactly into content findings.
 *
 * Units only pair within the same location key and unit kind. Within a group:
 * exact text first, then schema rows by field, then by word similarity. Two
 * passes recognize known Hugo `.md` conversion damage and report it as
 * `hugo-malformed` instead of a missing/extra pair.
 *
 * Units that extraction had to repair are reported separately, by
 * `malformedUnitFindings`, and still align like any other unit.
 */
import type { ContentUnit, UnitKind } from "./extractUnits.ts";

export type ContentFindingKind =
  | "missing-in-astro"
  | "extra-in-astro"
  | "changed"
  | "hugo-malformed"
  | "astro-malformed"
  | "paragraph-split";

export type MalformedReason =
  | "code-merged-into-paragraph"
  | "unfenced-code"
  | NonNullable<ContentUnit["malformed"]>;

export interface WordDiffPart {
  op: "equal" | "delete" | "insert";
  text: string;
}

export interface ContentFinding {
  kind: ContentFindingKind;
  unitKind: UnitKind;
  locationKey: string;
  /** Set when the Astro text was found at a different location. */
  astroLocationKey?: string;
  field?: string;
  reason?: MalformedReason;
  hugoText?: string;
  astroText?: string;
  similarity?: number;
  /** Omitted when the texts are too long to diff word by word. */
  diff?: WordDiffPart[];
  /** `changed` only: what kinds of change explain it (see `changeTypes.ts`). */
  changeTypes?: string[];
  /** Set when the finding came from the HTML, not from aligning the `.md`s. */
  foundBy?: "html-coverage";
  /** `html-coverage` only: the HTML text that neither `.md` has. */
  htmlText?: string;
}

const minimumSimilarity = 0.8;
/** The most consecutive Astro paragraphs one Hugo paragraph may pair with. */
const maximumSplitParagraphs = 4;
/** Above this many word-pair comparisons, skip the LCS and the diff. */
const maximumDiffCells = 4_000_000;

export function alignUnits(
  hugoUnits: ContentUnit[],
  astroUnits: ContentUnit[],
): ContentFinding[] {
  const unmatchedHugo = new Set(hugoUnits);
  const unmatchedAstro = new Set(astroUnits);
  const findings: ContentFinding[] = [];

  removeExactMatches(unmatchedHugo, unmatchedAstro);
  findings.push(...pairMergedCode(unmatchedHugo, unmatchedAstro));
  findings.push(...pairByField(unmatchedHugo, unmatchedAstro));
  findings.push(...pairSplitParagraphs(unmatchedHugo, unmatchedAstro));
  findings.push(...pairBySimilarity(unmatchedHugo, unmatchedAstro));
  findings.push(...pairUnfencedCode(unmatchedHugo, unmatchedAstro, hugoUnits));
  findings.push(...[...unmatchedHugo].map(missingFinding));
  findings.push(...[...unmatchedAstro].map(extraFinding));
  return findings;
}

/** One finding per unit that extraction repaired, on the side it came from. */
export function malformedUnitFindings(
  units: ContentUnit[],
  side: "hugo" | "astro",
): ContentFinding[] {
  return units.flatMap((unit) =>
    unit.malformed === undefined
      ? []
      : [
          {
            kind: `${side}-malformed`,
            reason: unit.malformed,
            unitKind: unit.kind,
            locationKey: unit.locationKey,
            ...(unit.field !== undefined && { field: unit.field }),
            [`${side}Text`]: quotedTextOf(unit),
          } as ContentFinding,
        ],
  );
}

function groupKeyOf(unit: ContentUnit): string {
  return `${unit.kind}@${unit.locationKey}`;
}

function removeExactMatches(
  unmatchedHugo: Set<ContentUnit>,
  unmatchedAstro: Set<ContentUnit>,
): void {
  const astroByGroupAndText = new Map<string, ContentUnit[]>();
  for (const astroUnit of unmatchedAstro) {
    const key = `${groupKeyOf(astroUnit)}\n${astroUnit.text}`;
    astroByGroupAndText.set(key, [
      ...(astroByGroupAndText.get(key) ?? []),
      astroUnit,
    ]);
  }
  for (const hugoUnit of unmatchedHugo) {
    const candidates = astroByGroupAndText.get(
      `${groupKeyOf(hugoUnit)}\n${hugoUnit.text}`,
    );
    const astroUnit = candidates?.shift();
    if (!astroUnit) continue;
    unmatchedHugo.delete(hugoUnit);
    unmatchedAstro.delete(astroUnit);
  }
}

/**
 * Hugo's converter drops indented code into the preceding paragraph, so Hugo
 * has one prose unit where Astro has a prose unit followed by a code unit.
 */
function pairMergedCode(
  unmatchedHugo: Set<ContentUnit>,
  unmatchedAstro: Set<ContentUnit>,
): ContentFinding[] {
  const findings: ContentFinding[] = [];
  for (const hugoProse of unitsOfKind(unmatchedHugo, "prose")) {
    const astroHere = [...unmatchedAstro].filter(
      (astroUnit) => astroUnit.locationKey === hugoProse.locationKey,
    );
    const pair = astroHere
      .filter((astroUnit) => astroUnit.kind === "prose")
      .flatMap((astroProse) =>
        astroHere
          .filter((astroUnit) => astroUnit.kind === "code")
          .map((astroCode) => ({ astroProse, astroCode })),
      )
      .find(
        ({ astroProse, astroCode }) =>
          `${astroProse.text} ${astroCode.text}` === hugoProse.text,
      );
    if (!pair) continue;
    unmatchedHugo.delete(hugoProse);
    unmatchedAstro.delete(pair.astroProse);
    unmatchedAstro.delete(pair.astroCode);
    findings.push({
      kind: "hugo-malformed",
      reason: "code-merged-into-paragraph",
      unitKind: "prose",
      locationKey: hugoProse.locationKey,
      hugoText: quotedTextOf(hugoProse),
      astroText: `${quotedTextOf(pair.astroProse)} ${quotedTextOf(pair.astroCode)}`,
    });
  }
  return findings;
}

function pairByField(
  unmatchedHugo: Set<ContentUnit>,
  unmatchedAstro: Set<ContentUnit>,
): ContentFinding[] {
  const findings: ContentFinding[] = [];
  for (const hugoRow of unitsOfKind(unmatchedHugo, "tableRow")) {
    if (hugoRow.field === undefined) continue;
    const astroRow = [...unmatchedAstro].find(
      (astroUnit) =>
        groupKeyOf(astroUnit) === groupKeyOf(hugoRow) &&
        astroUnit.field === hugoRow.field,
    );
    if (!astroRow) continue;
    unmatchedHugo.delete(hugoRow);
    unmatchedAstro.delete(astroRow);
    findings.push(changedFinding(hugoRow, astroRow));
  }
  return findings;
}

/**
 * Hugo sometimes has one paragraph where Astro has several. Pair a Hugo
 * paragraph with a run of consecutive Astro paragraphs when their joined text
 * is identical (`paragraph-split`), or is more similar than any single Astro
 * paragraph (`changed`). Runs before the similarity pass, which would
 * otherwise pair the Hugo paragraph with the first Astro one alone.
 */
function pairSplitParagraphs(
  unmatchedHugo: Set<ContentUnit>,
  unmatchedAstro: Set<ContentUnit>,
): ContentFinding[] {
  const findings: ContentFinding[] = [];
  for (const hugoProse of unitsOfKind(unmatchedHugo, "prose")) {
    const astroHere = unitsOfKind(unmatchedAstro, "prose").filter(
      (astroProse) => astroProse.locationKey === hugoProse.locationKey,
    );
    const run = bestParagraphRun(hugoProse, astroHere);
    if (!run) continue;
    unmatchedHugo.delete(hugoProse);
    run.paragraphs.forEach((astroProse) => unmatchedAstro.delete(astroProse));
    const astroText = run.paragraphs.map(quotedTextOf).join("\n\n");
    findings.push(
      run.isExact
        ? {
            kind: "paragraph-split",
            unitKind: "prose",
            locationKey: hugoProse.locationKey,
            hugoText: quotedTextOf(hugoProse),
            astroText,
          }
        : {
            kind: "changed",
            unitKind: "prose",
            locationKey: hugoProse.locationKey,
            hugoText: quotedTextOf(hugoProse),
            astroText,
            ...similarityAndDiff(hugoProse.text, run.joinedText),
          },
    );
  }
  return findings;
}

function bestParagraphRun(
  hugoProse: ContentUnit,
  astroParagraphs: ContentUnit[],
): { paragraphs: ContentUnit[]; joinedText: string; isExact: boolean } | null {
  const bestSingleSimilarity = Math.max(
    0,
    ...astroParagraphs.map((astroProse) =>
      wordSimilarity(hugoProse.text, astroProse.text),
    ),
  );
  let best: {
    paragraphs: ContentUnit[];
    joinedText: string;
    similarity: number;
  } | null = null;
  for (let start = 0; start < astroParagraphs.length; start++) {
    for (
      let length = 2;
      length <= maximumSplitParagraphs &&
      start + length <= astroParagraphs.length;
      length++
    ) {
      const paragraphs = astroParagraphs.slice(start, start + length);
      const joinedText = paragraphs
        .map((paragraph) => paragraph.text)
        .join(" ");
      if (joinedText === hugoProse.text) {
        return { paragraphs, joinedText, isExact: true };
      }
      const similarity = wordSimilarity(hugoProse.text, joinedText);
      if (similarity > (best?.similarity ?? 0)) {
        best = { paragraphs, joinedText, similarity };
      }
    }
  }
  if (
    !best ||
    best.similarity < minimumSimilarity ||
    best.similarity <= bestSingleSimilarity
  ) {
    return null;
  }
  return {
    paragraphs: best.paragraphs,
    joinedText: best.joinedText,
    isExact: false,
  };
}

/** Greedy: the most similar remaining pair in each group pairs first. */
function pairBySimilarity(
  unmatchedHugo: Set<ContentUnit>,
  unmatchedAstro: Set<ContentUnit>,
): ContentFinding[] {
  const candidatePairs = [...unmatchedHugo]
    .flatMap((hugoUnit) =>
      [...unmatchedAstro]
        .filter((astroUnit) => groupKeyOf(astroUnit) === groupKeyOf(hugoUnit))
        .map((astroUnit) => ({
          hugoUnit,
          astroUnit,
          similarity: wordSimilarity(hugoUnit.text, astroUnit.text),
        })),
    )
    .filter((pair) => pair.similarity >= minimumSimilarity)
    .sort((left, right) => right.similarity - left.similarity);

  const findings: ContentFinding[] = [];
  for (const { hugoUnit, astroUnit } of candidatePairs) {
    if (!unmatchedHugo.has(hugoUnit) || !unmatchedAstro.has(astroUnit))
      continue;
    unmatchedHugo.delete(hugoUnit);
    unmatchedAstro.delete(astroUnit);
    findings.push(changedFinding(hugoUnit, astroUnit));
  }
  return findings;
}

/**
 * Hugo's converter sometimes loses a code block's fence, leaving languageless
 * prose directly under the code example. Pair it with the most similar Astro
 * example in a language Hugo has no units for, or report it unpaired.
 */
function pairUnfencedCode(
  unmatchedHugo: Set<ContentUnit>,
  unmatchedAstro: Set<ContentUnit>,
  allHugoUnits: ContentUnit[],
): ContentFinding[] {
  const hugoLocationKeys = new Set(
    allHugoUnits.map((unit) => unit.locationKey),
  );
  const findings: ContentFinding[] = [];
  for (const hugoProse of unitsOfKind(unmatchedHugo, "prose")) {
    const { location } = hugoProse;
    if (location.section !== "code-example" || location.language) continue;
    const best = [...unmatchedAstro]
      .filter(
        (astroUnit) =>
          astroUnit.kind === "code" &&
          astroUnit.location.language !== undefined &&
          astroUnit.locationKey.startsWith(`${hugoProse.locationKey}/`) &&
          !hugoLocationKeys.has(astroUnit.locationKey),
      )
      .map((astroUnit) => ({
        astroUnit,
        similarity: wordSimilarity(hugoProse.text, astroUnit.text),
      }))
      .sort((left, right) => right.similarity - left.similarity)[0];
    unmatchedHugo.delete(hugoProse);
    if (!best) {
      findings.push({
        kind: "hugo-malformed",
        reason: "unfenced-code",
        unitKind: "code",
        locationKey: hugoProse.locationKey,
        hugoText: quotedTextOf(hugoProse),
      });
      continue;
    }
    unmatchedAstro.delete(best.astroUnit);
    findings.push({
      kind: "hugo-malformed",
      reason: "unfenced-code",
      unitKind: "code",
      locationKey: hugoProse.locationKey,
      astroLocationKey: best.astroUnit.locationKey,
      hugoText: quotedTextOf(hugoProse),
      astroText: quotedTextOf(best.astroUnit),
      ...similarityAndDiff(hugoProse.text, best.astroUnit.text),
    });
  }
  return findings;
}

function unitsOfKind(units: Set<ContentUnit>, kind: UnitKind): ContentUnit[] {
  return [...units].filter((unit) => unit.kind === kind);
}

function changedFinding(
  hugoUnit: ContentUnit,
  astroUnit: ContentUnit,
): ContentFinding {
  return {
    kind: "changed",
    unitKind: hugoUnit.kind,
    locationKey: hugoUnit.locationKey,
    ...(hugoUnit.field !== undefined && { field: hugoUnit.field }),
    hugoText: quotedTextOf(hugoUnit),
    astroText: quotedTextOf(astroUnit),
    ...similarityAndDiff(hugoUnit.text, astroUnit.text),
  };
}

function missingFinding(hugoUnit: ContentUnit): ContentFinding {
  return {
    kind: "missing-in-astro",
    unitKind: hugoUnit.kind,
    locationKey: hugoUnit.locationKey,
    ...(hugoUnit.field !== undefined && { field: hugoUnit.field }),
    hugoText: quotedTextOf(hugoUnit),
  };
}

function extraFinding(astroUnit: ContentUnit): ContentFinding {
  return {
    kind: "extra-in-astro",
    unitKind: astroUnit.kind,
    locationKey: astroUnit.locationKey,
    ...(astroUnit.field !== undefined && { field: astroUnit.field }),
    astroText: quotedTextOf(astroUnit),
  };
}

/** Findings quote the unit's source text, not its rewritten form. */
function quotedTextOf(unit: ContentUnit): string {
  return unit.sourceText ?? unit.text;
}

function similarityAndDiff(
  hugoText: string,
  astroText: string,
): Pick<ContentFinding, "similarity" | "diff"> {
  const similarity =
    Math.round(wordSimilarity(hugoText, astroText) * 100) / 100;
  const diff = wordDiff(hugoText, astroText);
  return diff.length > 0 ? { similarity, diff } : { similarity };
}

function wordsOf(text: string): string[] {
  return text.split(" ").filter((word) => word !== "");
}

/** Dice coefficient over the longest common word subsequence. */
export function wordSimilarity(left: string, right: string): number {
  const leftWords = wordsOf(left);
  const rightWords = wordsOf(right);
  const totalWords = leftWords.length + rightWords.length;
  if (totalWords === 0) return 1;
  if (leftWords.length * rightWords.length > maximumDiffCells) {
    return sharedWordCount(leftWords, rightWords) * (2 / totalWords);
  }
  const table = lcsTable(leftWords, rightWords);
  return (2 * table[0][0]) / totalWords;
}

/** Word-level diff from Hugo (`delete`) to Astro (`insert`). Empty when too long. */
export function wordDiff(hugoText: string, astroText: string): WordDiffPart[] {
  const hugoWords = wordsOf(hugoText);
  const astroWords = wordsOf(astroText);
  if (hugoWords.length * astroWords.length > maximumDiffCells) return [];
  const table = lcsTable(hugoWords, astroWords);
  const parts: WordDiffPart[] = [];
  let hugoIndex = 0;
  let astroIndex = 0;
  while (hugoIndex < hugoWords.length || astroIndex < astroWords.length) {
    if (
      hugoIndex < hugoWords.length &&
      astroIndex < astroWords.length &&
      hugoWords[hugoIndex] === astroWords[astroIndex]
    ) {
      appendPart(parts, "equal", hugoWords[hugoIndex]);
      hugoIndex++;
      astroIndex++;
    } else if (
      astroIndex === astroWords.length ||
      (hugoIndex < hugoWords.length &&
        table[hugoIndex + 1][astroIndex] >= table[hugoIndex][astroIndex + 1])
    ) {
      appendPart(parts, "delete", hugoWords[hugoIndex]);
      hugoIndex++;
    } else {
      appendPart(parts, "insert", astroWords[astroIndex]);
      astroIndex++;
    }
  }
  return parts;
}

function appendPart(
  parts: WordDiffPart[],
  op: WordDiffPart["op"],
  word: string,
): void {
  const last = parts.at(-1);
  if (last?.op === op) last.text += ` ${word}`;
  else parts.push({ op, text: word });
}

/** `table[i][j]` is the LCS length of `left[i..]` and `right[j..]`. */
function lcsTable(left: string[], right: string[]): number[][] {
  const table = Array.from({ length: left.length + 1 }, () =>
    new Array<number>(right.length + 1).fill(0),
  );
  for (let leftIndex = left.length - 1; leftIndex >= 0; leftIndex--) {
    for (let rightIndex = right.length - 1; rightIndex >= 0; rightIndex--) {
      table[leftIndex][rightIndex] =
        left[leftIndex] === right[rightIndex]
          ? table[leftIndex + 1][rightIndex + 1] + 1
          : Math.max(
              table[leftIndex + 1][rightIndex],
              table[leftIndex][rightIndex + 1],
            );
    }
  }
  return table;
}

function sharedWordCount(left: string[], right: string[]): number {
  const rightCounts = new Map<string, number>();
  for (const word of right)
    rightCounts.set(word, (rightCounts.get(word) ?? 0) + 1);
  let shared = 0;
  for (const word of left) {
    const count = rightCounts.get(word) ?? 0;
    if (count === 0) continue;
    shared++;
    rightCounts.set(word, count - 1);
  }
  return shared;
}
