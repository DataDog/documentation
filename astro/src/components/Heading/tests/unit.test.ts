import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Heading from "../Heading.astro";

async function render(props: { id: string; level: number }) {
  const container = await AstroContainer.create();
  return container.renderToString(Heading, {
    props,
    slots: { default: "Increase your rate limit" },
  });
}

describe("Heading", () => {
  for (const level of [2, 3, 4, 5]) {
    it(`wraps an h${level} in a link to its own anchor`, async () => {
      const html = await render({ id: "increase-your-rate-limit", level });

      expect(html).toMatch(
        new RegExp(
          `<h${level}[^>]*id="increase-your-rate-limit"[^>]*>\\s*<a[^>]*href="#increase-your-rate-limit"[^>]*>\\s*Increase your rate limit\\s*</a>\\s*</h${level}>`,
        ),
      );
    });
  }

  // Only h2–h5 are linked, so h1 and h6 stay plain.
  for (const level of [1, 6]) {
    it(`renders an h${level} with its id but no link`, async () => {
      const html = await render({ id: "some-heading", level });

      expect(html).toMatch(new RegExp(`<h${level}[^>]*id="some-heading"`));
      expect(html).not.toContain("<a");
    });
  }
});
