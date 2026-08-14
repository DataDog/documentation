// @vitest-environment happy-dom
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { render, cleanup } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { h } from "preact";
import { StepperController } from "../StepperController";

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
  localStorage.clear();
});

beforeEach(() => {
  localStorage.clear();
  window.history.replaceState(null, "", "/guide/");
});

// Builds server-equivalent stepper markup (plain BEM classes, as emitted by
// classListFactory) and mounts the headless controller into a child container,
// mirroring production where the DOM exists before the island hydrates.
function mountStepper(
  id: string,
  stepCount: number,
  options: { open?: boolean; withFinished?: boolean } = {},
) {
  const { open = false, withFinished = false } = options;

  const root = document.createElement("div");
  root.id = id;
  root.className = open ? "stepper stepper--open" : "stepper stepper--collapsed";

  const stepsEl = document.createElement("div");
  stepsEl.className = "stepper__steps";
  root.appendChild(stepsEl);

  for (let i = 0; i < stepCount; i++) {
    const isFirst = i === 0;
    const isLast = i === stepCount - 1;

    const step = document.createElement("div");
    step.className = "stepper__step";
    if (isFirst) step.classList.add("stepper__step--first");
    if (isLast) step.classList.add("stepper__step--last");
    step.dataset.stepIndex = String(i);
    step.dataset.stepNumber = String(i + 1);
    if (!open && !isFirst) step.setAttribute("data-hidden", "true");

    const title = document.createElement("h3");
    title.className = "stepper__step-title";
    title.textContent = `Step ${i + 1}`;
    step.appendChild(title);

    if (isFirst) {
      const showAll = document.createElement("button");
      showAll.className = "stepper__btn stepper__show-all-btn";
      if (open) showAll.setAttribute("data-hidden", "true");
      step.appendChild(showAll);

      const collapse = document.createElement("button");
      collapse.className = "stepper__btn stepper__collapse-btn";
      if (!open) collapse.setAttribute("data-hidden", "true");
      step.appendChild(collapse);
    }

    const content = document.createElement("div");
    content.className = "stepper__step-content";
    content.textContent = `Body ${i + 1}`;
    step.appendChild(content);

    const nav = document.createElement("div");
    nav.className = "stepper__nav";
    if (!isFirst) {
      const prev = document.createElement("button");
      prev.className = "stepper__btn stepper__prev-btn";
      nav.appendChild(prev);
    }
    const advance = document.createElement("button");
    advance.className = isLast
      ? "stepper__btn stepper__finish-btn"
      : "stepper__btn stepper__next-btn";
    nav.appendChild(advance);
    step.appendChild(nav);

    stepsEl.appendChild(step);
  }

  if (withFinished) {
    const finished = document.createElement("div");
    finished.className = "stepper__finished";
    finished.setAttribute("data-hidden", "true");
    root.appendChild(finished);
  }

  const reset = document.createElement("div");
  reset.className = "stepper__reset";
  const resetBtn = document.createElement("button");
  resetBtn.className = "stepper__btn stepper__reset-btn";
  reset.appendChild(resetBtn);
  root.appendChild(reset);

  document.body.appendChild(root);

  const island = document.createElement("div");
  root.appendChild(island);
  render(
    h(StepperController, {
      externalContext: { scope: id, entries: { stepperEl: id } },
    }),
    { container: island },
  );

  const steps = Array.from(
    root.querySelectorAll<HTMLElement>(".stepper__step"),
  );
  return {
    root,
    steps,
    finishedEl: root.querySelector<HTMLElement>(".stepper__finished"),
    resetEl: root.querySelector<HTMLElement>(".stepper__reset"),
    resetBtn,
    showAllBtn: root.querySelector<HTMLElement>(".stepper__show-all-btn"),
    collapseBtn: root.querySelector<HTMLElement>(".stepper__collapse-btn"),
  };
}

const isHidden = (el: HTMLElement | null) =>
  el?.getAttribute("data-hidden") === "true";
const navOf = (step: HTMLElement) =>
  step.querySelector<HTMLElement>(".stepper__nav")!;

describe("StepperController — initialization", () => {
  it("marks the root hydrated and initialized on mount", () => {
    const { root } = mountStepper("hydrate", 3);
    expect(root.getAttribute("data-hydrated")).toBe("true");
    expect(root.classList.contains("stepper--initialized")).toBe(true);
  });

  it("activates the first step and reveals all step titles", () => {
    const { steps } = mountStepper("init", 3);
    expect(steps[0].classList.contains("stepper__step--active")).toBe(true);
    // Every step shell is un-hidden (titles/circles always visible).
    steps.forEach((step) => expect(isHidden(step)).toBe(false));
    // Only the active step's nav is shown.
    expect(isHidden(navOf(steps[0]))).toBe(false);
    expect(isHidden(navOf(steps[1]))).toBe(true);
  });
});

describe("StepperController — navigation", () => {
  it("advances with Next, marking prior steps completed", async () => {
    const user = userEvent.setup();
    const { steps } = mountStepper("nav", 3);

    await user.click(steps[0].querySelector(".stepper__next-btn")!);

    expect(steps[1].classList.contains("stepper__step--active")).toBe(true);
    expect(steps[0].classList.contains("stepper__step--completed")).toBe(true);
    expect(isHidden(navOf(steps[1]))).toBe(false);
    expect(isHidden(navOf(steps[0]))).toBe(true);
  });

  it("goes back with Previous", async () => {
    const user = userEvent.setup();
    const { steps } = mountStepper("nav-back", 3);

    await user.click(steps[0].querySelector(".stepper__next-btn")!);
    await user.click(steps[1].querySelector(".stepper__prev-btn")!);

    expect(steps[0].classList.contains("stepper__step--active")).toBe(true);
    expect(steps[0].classList.contains("stepper__step--completed")).toBe(false);
  });

  it("activates a step when its title is clicked in accordion mode", async () => {
    const user = userEvent.setup();
    const { steps } = mountStepper("title-click", 3);

    await user.click(steps[2].querySelector(".stepper__step-title")!);

    expect(steps[2].classList.contains("stepper__step--active")).toBe(true);
    expect(steps[0].classList.contains("stepper__step--completed")).toBe(true);
    expect(steps[1].classList.contains("stepper__step--completed")).toBe(true);
  });
});

describe("StepperController — finish and reset", () => {
  it("finishing marks all steps completed and reveals the finished + reset regions", async () => {
    const user = userEvent.setup();
    const { steps, finishedEl, resetEl } = mountStepper("finish", 2, {
      withFinished: true,
    });

    await user.click(steps[0].querySelector(".stepper__next-btn")!);
    await user.click(steps[1].querySelector(".stepper__finish-btn")!);

    steps.forEach((step) =>
      expect(step.classList.contains("stepper__step--completed")).toBe(true),
    );
    steps.forEach((step) => expect(step.classList.contains("stepper__step--active")).toBe(false));
    expect(isHidden(finishedEl)).toBe(false);
    expect(isHidden(resetEl)).toBe(false);
    // Navs hidden once finished.
    steps.forEach((step) => expect(isHidden(navOf(step))).toBe(true));
  });

  it("start over returns to the first step and hides the finished region", async () => {
    const user = userEvent.setup();
    const { steps, finishedEl, resetEl, resetBtn } = mountStepper(
      "reset",
      2,
      { withFinished: true },
    );

    await user.click(steps[0].querySelector(".stepper__next-btn")!);
    await user.click(steps[1].querySelector(".stepper__finish-btn")!);
    await user.click(resetBtn);

    expect(steps[0].classList.contains("stepper__step--active")).toBe(true);
    expect(isHidden(finishedEl)).toBe(true);
    expect(isHidden(resetEl)).toBe(true);
  });
});

describe("StepperController — expand/collapse all", () => {
  it("expand all adds the modifier and swaps the viz-control buttons", async () => {
    const user = userEvent.setup();
    const { root, showAllBtn, collapseBtn } = mountStepper("expand", 3);

    await user.click(showAllBtn!);

    expect(root.classList.contains("stepper--all-expanded")).toBe(true);
    expect(isHidden(showAllBtn)).toBe(true);
    expect(isHidden(collapseBtn)).toBe(false);
  });

  it("collapse all removes the modifier", async () => {
    const user = userEvent.setup();
    const { root, showAllBtn, collapseBtn } = mountStepper("collapse", 3);

    await user.click(showAllBtn!);
    await user.click(collapseBtn!);

    expect(root.classList.contains("stepper--all-expanded")).toBe(false);
    expect(isHidden(showAllBtn)).toBe(false);
    expect(isHidden(collapseBtn)).toBe(true);
  });

  it("title clicks are ignored while expanded", async () => {
    const user = userEvent.setup();
    const { root, steps, showAllBtn } = mountStepper("expanded-noclick", 3);

    await user.click(showAllBtn!);
    await user.click(steps[2].querySelector(".stepper__step-title")!);

    // No single active step in expanded mode; the click did nothing.
    expect(root.classList.contains("stepper--all-expanded")).toBe(true);
    expect(steps[2].classList.contains("stepper__step--active")).toBe(false);
  });

  it("an open stepper starts expanded", () => {
    const { root } = mountStepper("open-expanded", 3, { open: true });
    expect(root.classList.contains("stepper--all-expanded")).toBe(true);
  });
});

describe("StepperController — persistence", () => {
  it("restores the saved active step on remount", () => {
    const key = "stepper-progress-/guide/:persist";
    localStorage.setItem(
      key,
      JSON.stringify({
        stepIndex: 2,
        finished: false,
        isAllExpanded: false,
        timestamp: 1,
      }),
    );

    const { steps } = mountStepper("persist", 3);
    expect(steps[2].classList.contains("stepper__step--active")).toBe(true);
  });

  it("restores a finished stepper on remount", () => {
    const key = "stepper-progress-/guide/:persist-finished";
    localStorage.setItem(
      key,
      JSON.stringify({
        stepIndex: 0,
        finished: true,
        isAllExpanded: false,
        timestamp: 1,
      }),
    );

    const { steps, finishedEl } = mountStepper("persist-finished", 3, {
      withFinished: true,
    });
    steps.forEach((step) =>
      expect(step.classList.contains("stepper__step--completed")).toBe(true),
    );
    expect(isHidden(finishedEl)).toBe(false);
  });

  it("persists progress after navigating", async () => {
    const user = userEvent.setup();
    const { steps } = mountStepper("persist-write", 3);

    await user.click(steps[0].querySelector(".stepper__next-btn")!);

    const saved = JSON.parse(
      localStorage.getItem("stepper-progress-/guide/:persist-write")!,
    );
    expect(saved.stepIndex).toBe(1);
  });
});
