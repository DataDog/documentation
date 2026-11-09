import { afterEach, describe, expect, it, vi } from "vitest";
import { SUGGESTED_QUESTIONS } from "./strings";
import { pickQuestions } from "./suggestedQuestions";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("pickQuestions", () => {
  it("returns three distinct questions from the list", () => {
    const questions = pickQuestions();

    expect(questions).toHaveLength(3);
    expect(new Set(questions).size).toBe(3);
    for (const question of questions) {
      expect(SUGGESTED_QUESTIONS).toContain(question);
    }
  });

  it("keeps drawing until it has three, even when the source repeats", () => {
    // Two identical draws, then three distinct ones.
    const draws = [0, 0, 0.5, 0.9, 0.2];
    let index = 0;
    vi.spyOn(Math, "random").mockImplementation(() => draws[index++] ?? 0);

    expect(new Set(pickQuestions()).size).toBe(3);
  });
});
