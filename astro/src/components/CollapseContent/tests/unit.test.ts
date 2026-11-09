import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
// @ts-ignore — Preact renderer is registered for SSR of the controller island.
import preactRenderer from "@astrojs/preact/server.js";
import CollapseContent from "../CollapseContent.astro";

async function render(options: {
  props?: Record<string, unknown>;
  slots?: Record<string, string>;
}) {
  const container = await AstroContainer.create();
  container.addServerRenderer({
    renderer: preactRenderer,
    name: "@astrojs/preact",
  });
  return container.renderToString(CollapseContent as never, options);
}

describe("CollapseContent component", () => {
  it("renders a details/summary with the title and body", async () => {
    const html = await render({
      props: { title: "Advanced options" },
      slots: { default: "<p>Hidden details</p>" },
    });

    expect(html).toContain("collapse-content");
    expect(html).toContain("collapse-content__header");
    expect(html).toContain("collapse-content__title");
    expect(html).toContain("collapse-content__body");
    expect(html).toContain("<details");
    expect(html).toContain("<summary");
    expect(html).toContain("Advanced options");
    expect(html).toContain("<p>Hidden details</p>");
  });

  it("defaults the title heading to h3", async () => {
    const html = await render({
      props: { title: "Default level" },
      slots: { default: "body" },
    });

    expect(html).toMatch(/<h3[^>]*collapse-content__title/);
  });

  it("renders the title at the requested heading level", async () => {
    const html = await render({
      props: { title: "Custom level", level: "h2" },
      slots: { default: "body" },
    });

    expect(html).toMatch(/<h2[^>]*collapse-content__title/);
    expect(html).not.toMatch(/<h3[^>]*collapse-content__title/);
  });

  it("is closed by default (no open attribute)", async () => {
    const html = await render({
      props: { title: "Closed" },
      slots: { default: "body" },
    });

    expect(html).not.toMatch(/<details[^>]*\sopen/);
  });

  it("adds the open attribute when expanded is true", async () => {
    const html = await render({
      props: { title: "Open", expanded: true },
      slots: { default: "body" },
    });

    expect(html).toMatch(/<details[^>]*\sopen/);
  });

  it("sets the id on the details element when provided", async () => {
    const html = await render({
      props: { title: "With id", id: "my-section" },
      slots: { default: "body" },
    });

    expect(html).toMatch(/<details[^>]*id="my-section"/);
  });

  it("generates a stable id when none is provided (controller scope)", async () => {
    const html = await render({
      props: { title: "No id" },
      slots: { default: "body" },
    });

    // The controller needs a root id to scope to, so one is generated.
    expect(html).toMatch(/<details[^>]*id="collapse-content-[0-9a-f]+"/);
  });

  it("renders the chevron icon", async () => {
    const html = await render({
      props: { title: "Icon" },
      slots: { default: "body" },
    });

    expect(html).toContain("collapse-content__icon");
    expect(html).toContain("<svg");
  });
});
