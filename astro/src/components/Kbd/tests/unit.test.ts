import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Kbd from "../Kbd.astro";

describe("Kbd component", () => {
  it("wraps its slot content in a kbd element", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Kbd, {
      slots: { default: "Ctrl" },
    });

    expect(html).toContain("<kbd");
    expect(html).toContain("Ctrl");
    expect(html).toContain("</kbd>");
  });
});
