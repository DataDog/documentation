import { SUGGESTED_QUESTIONS } from "./strings";

const QUESTIONS_SHOWN = 3;

/** Three distinct questions, redrawn each time the empty state is rendered. */
export function pickQuestions(): string[] {
  const indexes = new Set<number>();

  while (indexes.size < QUESTIONS_SHOWN) {
    indexes.add(Math.floor(Math.random() * SUGGESTED_QUESTIONS.length));
  }

  return [...indexes].map((index) => SUGGESTED_QUESTIONS[index] ?? "");
}
