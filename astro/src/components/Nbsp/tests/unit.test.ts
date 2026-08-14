import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Nbsp from "../Nbsp.astro";

describe("Nbsp component", () => {
  it("renders a non-breaking space entity", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Nbsp);

    // set:html decodes the entity to the actual non-breaking space (U+00A0).
    expect(html).toContain(" ");
  });
});
