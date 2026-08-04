import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
// @ts-ignore — Preact renderer is registered for SSR of the StepperController island.
import preactRenderer from "@astrojs/preact/server.js";
import Stepper from "../Stepper.astro";
import Step from "../Step.astro";
import StepperFinished from "../StepperFinished.astro";

async function render(
  Component: unknown,
  options: { props?: Record<string, unknown>; slots?: Record<string, string> },
) {
  const container = await AstroContainer.create();
  container.addServerRenderer({
    renderer: preactRenderer,
    name: "@astrojs/preact",
  });
  return container.renderToString(Component as never, options);
}

describe("Stepper.astro", () => {
  it("renders a labelled region with a steps list and a reset control", async () => {
    const html = await render(Stepper, {
      props: { id: "stepper-x" },
      slots: { default: "<p>steps go here</p>" },
    });

    expect(html).toContain('role="region"');
    expect(html).toContain('aria-label="Step-by-step guide"');
    expect(html).toContain('id="stepper-x"');
    expect(html).toContain("stepper__steps");
    expect(html).toContain('id="stepper-x-steps"');
    expect(html).toContain('role="list"');
    expect(html).toContain("stepper__reset-btn");
    expect(html).toContain("Start over");
    expect(html).toContain("steps go here");
  });

  it("defaults to the collapsed modifier", async () => {
    const html = await render(Stepper, { props: { id: "s1" } });
    expect(html).toContain("stepper--collapsed");
    expect(html).not.toContain("stepper--open");
  });

  it("uses the open modifier and marks the root when open", async () => {
    const html = await render(Stepper, { props: { id: "s2", open: true } });
    expect(html).toContain("stepper--open");
    expect(html).toContain('data-step-open="true"');
  });
});

describe("Step.astro", () => {
  const base = {
    title: "Do the thing",
    stepperId: "stepper-1",
    open: false,
  };

  it("renders title, step number, and list semantics", async () => {
    const html = await render(Step, {
      props: { ...base, stepIndex: 0, isLastStep: false },
      slots: { default: "<p>body</p>" },
    });

    expect(html).toContain("Do the thing");
    expect(html).toContain('data-step-number="1"');
    expect(html).toContain('data-step-index="0"');
    expect(html).toContain('role="listitem"');
    expect(html).toContain('id="stepper-1-step-1"');
    expect(html).toContain('aria-labelledby="stepper-1-step-1-title"');
    expect(html).toContain("body");
  });

  it("honors the configured heading level", async () => {
    const html = await render(Step, {
      props: { ...base, stepIndex: 0, isLastStep: false, level: "h2" },
    });
    expect(html).toMatch(/<h2[^>]*stepper__step-title/);
  });

  it("gives the first step viz controls and only a Next button", async () => {
    const html = await render(Step, {
      props: { ...base, stepIndex: 0, isLastStep: false },
    });
    expect(html).toContain("stepper__step--first");
    expect(html).toContain("stepper__viz-controls");
    expect(html).toContain("stepper__show-all-btn");
    expect(html).toContain("stepper__collapse-btn");
    expect(html).toContain("stepper__next-btn");
    expect(html).not.toContain("stepper__prev-btn");
    expect(html).not.toContain("stepper__finish-btn");
  });

  it("gives a middle step Previous and Next, no viz controls", async () => {
    const html = await render(Step, {
      props: { ...base, stepIndex: 1, isLastStep: false },
    });
    expect(html).not.toContain("stepper__step--first");
    expect(html).not.toContain("stepper__viz-controls");
    expect(html).toContain("stepper__prev-btn");
    expect(html).toContain("stepper__next-btn");
    expect(html).not.toContain("stepper__finish-btn");
  });

  it("gives the last step Previous and Finish", async () => {
    const html = await render(Step, {
      props: { ...base, stepIndex: 2, isLastStep: true },
    });
    expect(html).toContain("stepper__step--last");
    expect(html).toContain("stepper__prev-btn");
    expect(html).toContain("stepper__finish-btn");
    expect(html).not.toContain("stepper__next-btn");
  });

  it("marks a single step as both first and last with just a Finish button", async () => {
    const html = await render(Step, {
      props: { ...base, stepIndex: 0, isLastStep: true },
    });
    expect(html).toContain("stepper__step--first");
    expect(html).toContain("stepper__step--last");
    expect(html).toContain("stepper__finish-btn");
    expect(html).not.toContain("stepper__prev-btn");
    expect(html).not.toContain("stepper__next-btn");
  });

  it("hides non-first steps of a collapsed stepper before hydration", async () => {
    const html = await render(Step, {
      props: { ...base, stepIndex: 1, isLastStep: false, open: false },
    });
    expect(html).toContain('data-hidden="true"');
  });

  it("does not pre-hide steps of an open stepper", async () => {
    const html = await render(Step, {
      props: { ...base, stepIndex: 1, isLastStep: false, open: true },
    });
    expect(html).not.toContain('data-hidden="true"');
  });
});

describe("StepperFinished.astro", () => {
  it("renders a polite status region hidden by default", async () => {
    const html = await render(StepperFinished, {
      props: { stepperId: "stepper-1" },
      slots: { default: "<p>nice work</p>" },
    });
    expect(html).toContain("stepper__finished");
    expect(html).toContain('id="stepper-1-finished"');
    expect(html).toContain('role="status"');
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain('data-hidden="true"');
    expect(html).toContain("nice work");
  });
});
