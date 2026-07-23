import { useEffect, useRef } from "preact/hooks";
import styles from "./Stepper.module.css";
import { addStyleFactory } from "@lib/cssUtils/addStyleFactory";
import { removeStyleFactory } from "@lib/cssUtils/removeStyleFactory";
import {
  loadExternalContext,
  type ExternalContext,
} from "@lib/componentUtils/loadExternalContext";

const addStyle = addStyleFactory(styles);
const removeStyle = removeStyleFactory(styles);

const STORAGE_PREFIX = "stepper-progress-";
const MAX_STORED_STEPPERS = 10;

interface StepperState {
  stepIndex: number;
  finished: boolean;
  isAllExpanded: boolean;
}

interface StepperControllerProps {
  externalContext: ExternalContext<{ stepperEl: string }>;
}

// Headless island. The full stepper markup is server-rendered by Stepper.astro
// / Step.astro; this component never receives step content. It loads the root
// element by id, then manages active-step state, expand/collapse, and progress
// persistence by toggling BEM modifier classes and `data-hidden` on the
// existing DOM — mirroring the Hugo stepper's client script.
export function StepperController({ externalContext }: StepperControllerProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const loaded = loadExternalContext(externalContext);
    if (!loaded) return;
    const { stepperEl } = loaded;

    const steps = Array.from(
      stepperEl.querySelectorAll<HTMLElement>(".stepper__step"),
    );
    if (!steps.length) return;

    const finishedEl = stepperEl.querySelector<HTMLElement>(
      ".stepper__finished",
    );
    const resetEl = stepperEl.querySelector<HTMLElement>(".stepper__reset");
    const showAllBtn = stepperEl.querySelector<HTMLElement>(
      ".stepper__show-all-btn",
    );
    const collapseBtn = stepperEl.querySelector<HTMLElement>(
      ".stepper__collapse-btn",
    );

    const storageKey = `${STORAGE_PREFIX}${location.pathname}:${stepperEl.id}`;

    let currentIndex = 0;
    let finished = false;
    let isAllExpanded = stepperEl.classList.contains("stepper--open");

    const saved = loadProgress(storageKey);
    if (saved) {
      if (saved.finished) {
        finished = true;
      } else if (saved.stepIndex >= 0 && saved.stepIndex < steps.length) {
        currentIndex = saved.stepIndex;
      }
      if (typeof saved.isAllExpanded === "boolean") {
        isAllExpanded = saved.isAllExpanded;
      }
    }

    const setStepClass = (
      el: HTMLElement,
      className: string,
      on: boolean,
    ): void => {
      if (on) {
        addStyle(el.classList, className);
      } else {
        removeStyle(el.classList, className);
      }
    };

    const persist = (): void => {
      saveProgress(storageKey, {
        stepIndex: currentIndex,
        finished,
        isAllExpanded,
      });
    };

    const render = (): void => {
      setStepClass(stepperEl, "stepper--all-expanded", isAllExpanded);

      setHidden(showAllBtn, isAllExpanded);
      setHidden(collapseBtn, !isAllExpanded);

      steps.forEach((step, i) => {
        const isActive = !finished && i === currentIndex;
        const isCompleted = finished || i < currentIndex;

        setStepClass(step, "stepper__step--active", isActive);
        setStepClass(step, "stepper__step--completed", isCompleted);

        // Titles/circles stay visible; step-body visibility is CSS-driven.
        setHidden(step, false);

        // Nav is shown only for the active step in accordion mode.
        const nav = step.querySelector<HTMLElement>(".stepper__nav");
        setHidden(nav, isAllExpanded || !isActive || finished);
      });

      setHidden(finishedEl, !finished);
      setHidden(resetEl, !finished);
    };

    const goToStep = (index: number): void => {
      finished = false;
      currentIndex = Math.max(0, Math.min(index, steps.length - 1));
      persist();
      render();
    };

    // Clicking a step title in accordion mode activates that step.
    const titleHandlers: Array<() => void> = [];
    steps.forEach((step, i) => {
      const title = step.querySelector<HTMLElement>(".stepper__step-title");
      if (!title) return;
      const handler = (event: Event): void => {
        event.preventDefault();
        if (isAllExpanded) return;
        goToStep(i);
      };
      title.addEventListener("click", handler);
      titleHandlers.push(() => title.removeEventListener("click", handler));
    });

    const handleClick = (event: Event): void => {
      const target = event.target as HTMLElement | null;
      const btn = target?.closest<HTMLElement>(".stepper__btn");
      if (!btn || !stepperEl.contains(btn)) return;

      if (btn.classList.contains("stepper__next-btn")) {
        goToStep(currentIndex + 1);
      } else if (btn.classList.contains("stepper__prev-btn")) {
        goToStep(currentIndex - 1);
      } else if (btn.classList.contains("stepper__finish-btn")) {
        finished = true;
        persist();
        render();
      } else if (btn.classList.contains("stepper__reset-btn")) {
        finished = false;
        currentIndex = 0;
        persist();
        render();
      } else if (btn.classList.contains("stepper__show-all-btn")) {
        isAllExpanded = true;
        persist();
        render();
      } else if (btn.classList.contains("stepper__collapse-btn")) {
        isAllExpanded = false;
        persist();
        render();
      }
    };

    stepperEl.addEventListener("click", handleClick);

    render();
    addStyle(stepperEl.classList, "stepper--initialized");
    stepperEl.setAttribute("data-hydrated", "true");

    return () => {
      stepperEl.removeEventListener("click", handleClick);
      titleHandlers.forEach((remove) => remove());
    };
  }, []);

  return <span ref={ref} hidden aria-hidden="true" />;
}

function setHidden(el: HTMLElement | null, hidden: boolean): void {
  if (!el) return;
  if (hidden) {
    el.setAttribute("data-hidden", "true");
  } else {
    el.removeAttribute("data-hidden");
  }
}

function loadProgress(key: string): StepperState | null {
  try {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as StepperState) : null;
  } catch {
    return null;
  }
}

function saveProgress(key: string, state: StepperState): void {
  try {
    if (!localStorage.getItem(key)) {
      pruneOldEntries();
    }
    localStorage.setItem(key, JSON.stringify({ ...state, timestamp: Date.now() }));
  } catch {
    // Storage unavailable (private mode, quota): the stepper still works
    // without persistence.
  }
}

// Keep at most MAX_STORED_STEPPERS progress entries, evicting the oldest.
function pruneOldEntries(): void {
  try {
    const entries: Array<{ key: string; timestamp: number }> = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) {
        const parsed = JSON.parse(localStorage.getItem(key) ?? "{}");
        entries.push({ key, timestamp: parsed.timestamp || 0 });
      }
    }
    if (entries.length >= MAX_STORED_STEPPERS) {
      entries.sort((a, b) => a.timestamp - b.timestamp);
      const toRemove = entries.length - MAX_STORED_STEPPERS + 1;
      for (let i = 0; i < toRemove; i++) {
        localStorage.removeItem(entries[i].key);
      }
    }
  } catch {
    // Ignore storage errors.
  }
}
