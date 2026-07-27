import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Ui from "../Ui.astro";

describe("Ui component", () => {
  it("wraps its slot content in a span with the ui class", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Ui, {
      slots: { default: "Save" },
    });

    expect(html).toContain("<span");
    expect(html).toContain("ui");
    expect(html).toContain("Save");
  });
});
