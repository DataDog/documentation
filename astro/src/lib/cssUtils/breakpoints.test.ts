// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from "vitest";
import { belowTabletMediaQuery, desktopMediaQuery } from "./breakpoints";

const rootStyle = document.documentElement.style;

afterEach(() => {
  rootStyle.removeProperty("--hugo-breakpoint-desktop");
  rootStyle.removeProperty("--hugo-breakpoint-tablet");
});

describe("desktopMediaQuery", () => {
  it("reads the desktop breakpoint token", () => {
    rootStyle.setProperty("--hugo-breakpoint-desktop", "1000px");
    expect(desktopMediaQuery()).toBe("(min-width: 1000px)");
  });

  it("falls back to 992px when the token is missing", () => {
    expect(desktopMediaQuery()).toBe("(min-width: 992px)");
  });
});

describe("belowTabletMediaQuery", () => {
  it("matches just below the tablet breakpoint token", () => {
    rootStyle.setProperty("--hugo-breakpoint-tablet", "800px");
    expect(belowTabletMediaQuery()).toBe("(max-width: calc(800px - 0.02px))");
  });

  it("falls back to just below 768px when the token is missing", () => {
    expect(belowTabletMediaQuery()).toBe("(max-width: calc(768px - 0.02px))");
  });
});
