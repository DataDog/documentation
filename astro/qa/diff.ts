export interface WordDiff {
  missingWords: string[];  // in Hugo but not Astro
  extraWords: string[];    // in Astro but not Hugo
}

export interface EndpointComparison {
  heading: string;
  similarity: number;
  missingWords: string[];
  extraWords: string[];
}

/**
 * Split text into words (lowercased, non-empty).
 */
function toWords(text: string): string[] {
  return text.toLowerCase().split(/\s+/).filter(Boolean);
}

/**
 * Build a word frequency map.
 */
function wordFrequency(words: string[]): Map<string, number> {
  const freq = new Map<string, number>();
  for (const w of words) {
    freq.set(w, (freq.get(w) ?? 0) + 1);
  }
  return freq;
}

/**
 * Compute similarity score between two texts as shared-word-count / total-word-count.
 * Returns a value between 0 and 1.
 */
export function similarity(textA: string, textB: string): number {
  const wordsA = toWords(textA);
  const wordsB = toWords(textB);

  if (wordsA.length === 0 && wordsB.length === 0) return 1;
  if (wordsA.length === 0 || wordsB.length === 0) return 0;

  const freqA = wordFrequency(wordsA);
  const freqB = wordFrequency(wordsB);

  let shared = 0;
  for (const [word, countA] of freqA) {
    const countB = freqB.get(word) ?? 0;
    shared += Math.min(countA, countB);
  }

  const total = Math.max(wordsA.length, wordsB.length);
  return shared / total;
}

/**
 * Find words present in textA but missing from textB, and vice versa.
 * Returns unique words only (deduped), limited to the first `limit` entries.
 */
export function wordDiff(hugoText: string, astroText: string, limit = 20): WordDiff {
  const hugoFreq = wordFrequency(toWords(hugoText));
  const astroFreq = wordFrequency(toWords(astroText));

  const missingWords: string[] = [];
  const extraWords: string[] = [];

  // Words in Hugo but not in Astro (or fewer occurrences)
  for (const [word, hugoCount] of hugoFreq) {
    const astroCount = astroFreq.get(word) ?? 0;
    if (hugoCount > astroCount) {
      missingWords.push(word);
    }
  }

  // Words in Astro but not in Hugo (or more occurrences)
  for (const [word, astroCount] of astroFreq) {
    const hugoCount = hugoFreq.get(word) ?? 0;
    if (astroCount > hugoCount) {
      extraWords.push(word);
    }
  }

  return {
    missingWords: missingWords.slice(0, limit),
    extraWords: extraWords.slice(0, limit),
  };
}

/**
 * Compare matched endpoint pairs and return per-endpoint results.
 */
export function compareEndpoints(
  hugoEndpoints: Map<string, string>,
  astroEndpoints: Map<string, string>,
): {
  matched: EndpointComparison[];
  hugoOnly: string[];
  astroOnly: string[];
} {
  const matched: EndpointComparison[] = [];
  const hugoOnly: string[] = [];
  const astroOnly: string[] = [];

  for (const heading of hugoEndpoints.keys()) {
    if (!astroEndpoints.has(heading)) {
      hugoOnly.push(heading);
    }
  }

  for (const heading of astroEndpoints.keys()) {
    if (!hugoEndpoints.has(heading)) {
      astroOnly.push(heading);
    }
  }

  for (const [heading, hugoText] of hugoEndpoints) {
    const astroText = astroEndpoints.get(heading);
    if (astroText === undefined) continue;

    const sim = similarity(hugoText, astroText);
    const diff = wordDiff(hugoText, astroText, 10);

    matched.push({
      heading,
      similarity: sim,
      missingWords: diff.missingWords,
      extraWords: diff.extraWords,
    });
  }

  return { matched, hugoOnly, astroOnly };
}
