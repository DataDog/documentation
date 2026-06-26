// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, screen } from "@testing-library/preact";
import { h } from "preact";
import userEvent from "@testing-library/user-event";
import MobileNavToggle from "../MobileNavToggle";

afterEach(cleanup);

/**
 * Renders the toggle alongside the build-time DOM it manipulates: a scope
 * element containing the overlay and backdrop it references by id.
 */
function renderWithOverlay() {
  return render(
    h("div", { id: "mobile-nav-root" }, [
      h(MobileNavToggle, {
        key: "toggle",
        labels: { "Toggle navigation": "Toggle navigation" },
        externalContext: {
          scope: "mobile-nav-root",
          entries: { overlay: "mobile-nav", backdrop: "mobile-nav-bg" },
        },
      }),
      h("div", { key: "bg", id: "mobile-nav-bg" }),
      h("div", { key: "overlay", id: "mobile-nav" }),
    ]),
  );
}

describe("MobileNavToggle", () => {
  it("starts closed", () => {
    renderWithOverlay();
    const toggle = screen.getByRole("button", { name: "Toggle navigation" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(document.getElementById("mobile-nav")?.classList.contains("mobile-nav__panel--open")).toBe(false);
    expect(document.getElementById("mobile-nav-bg")?.classList.contains("mobile-nav__backdrop--open")).toBe(false);
  });

  it("opens the overlay and backdrop on click", async () => {
    const user = userEvent.setup();
    renderWithOverlay();
    const toggle = screen.getByRole("button", { name: "Toggle navigation" });

    await user.click(toggle);

    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(toggle.classList.contains("open")).toBe(true);
    expect(document.getElementById("mobile-nav")?.classList.contains("mobile-nav__panel--open")).toBe(true);
    expect(document.getElementById("mobile-nav-bg")?.classList.contains("mobile-nav__backdrop--open")).toBe(true);
    expect(document.documentElement.style.overflow).toBe("hidden");
  });

  it("closes again on a second click", async () => {
    const user = userEvent.setup();
    renderWithOverlay();
    const toggle = screen.getByRole("button", { name: "Toggle navigation" });

    await user.click(toggle);
    await user.click(toggle);

    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(document.getElementById("mobile-nav")?.classList.contains("mobile-nav__panel--open")).toBe(false);
    expect(document.documentElement.style.overflow).toBe("");
  });

  it("closes when the backdrop is clicked", async () => {
    const user = userEvent.setup();
    renderWithOverlay();
    const toggle = screen.getByRole("button", { name: "Toggle navigation" });

    await user.click(toggle);
    expect(document.getElementById("mobile-nav")?.classList.contains("mobile-nav__panel--open")).toBe(true);

    await user.click(document.getElementById("mobile-nav-bg")!);
    expect(document.getElementById("mobile-nav")?.classList.contains("mobile-nav__panel--open")).toBe(false);
  });
});
