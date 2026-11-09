// @vitest-environment happy-dom
import { describe, it, expect, afterEach, vi } from "vitest";
import { render, cleanup } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { h } from "preact";
import { LanguageSelector, type LocaleOption } from "../LanguageSelector";

const localeOptions: LocaleOption[] = [
  { code: "en", label: "English", href: "/api/latest/metrics/" },
  { code: "fr", label: "Français", href: "/fr/api/latest/metrics/" },
];

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  document.cookie = "lang_pref=; path=/; max-age=0";
});

describe("LanguageSelector — lang_pref cookie", () => {
  it("choosing a language writes its code to the lang_pref cookie", async () => {
    // Stand-in for window.location so the href assignment doesn't navigate.
    vi.stubGlobal("location", { href: "/fr/api/latest/metrics/" });
    document.cookie = "lang_pref=fr; path=/";
    const user = userEvent.setup();
    render(h(LanguageSelector, { options: localeOptions, currentCode: "fr" }));

    await user.click(document.querySelector<HTMLElement>(".select__button")!);
    await user.click(
      document.querySelector<HTMLElement>('.select__option[data-value="en"]')!,
    );

    expect(document.cookie).toContain("lang_pref=en");
    expect(window.location.href).toBe("/api/latest/metrics/");
  });
});
