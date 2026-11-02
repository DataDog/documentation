import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Sup from "../Sup.astro";

describe("Sup component", () => {
  it("wraps its slot content in a sup element", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Sup, {
      slots: { default: "2" },
    });

    expect(html).toContain("<sup");
    expect(html).toContain("2");
    expect(html).toContain("</sup>");
  });
});
