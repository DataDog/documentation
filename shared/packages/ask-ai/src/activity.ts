/**
 * The research timeline above an answer, built from the chat API's streamed
 * `thinking` events. Search queries are never shown, and parallel searches
 * share one step.
 *
 * Ported from Hugo's `activity.js`. The reducer is pure, so the copy and the
 * step rules are testable without a DOM; `ActivityTimeline` renders its state.
 */

import type { ActivityPage } from "./client";
import { activityStepIcon, chevronDownIcon } from "./icons";
import { ACTIVITY_STRINGS as S } from "./strings";

const DOCS_ORIGIN = "https://docs.datadoghq.com";
const MAX_VISIBLE_PAGES = 4;

export const SERVER_STAGES: Record<string, StageKind> = {
  "Rewriting query...": "understand",
  "Searching documentation...": "search",
  "Reviewing relevant pages": "review",
  "Generating answer...": "write",
};

type StageKind = "understand" | "search" | "review" | "write";

export type StepKind =
  "understand" | "search" | "read" | "more" | "write" | "note";
export type StepStatus = "active" | "done" | "failed" | "cancelled";
export type ActivityPhase =
  "thinking" | "researching" | "writing" | "done" | "error" | "stopped";

export interface Page {
  title: string;
  url: string;
}

export interface Step {
  id: number;
  kind: StepKind;
  status: StepStatus;
  pages: Page[];
  /** Pages a `read` step opened. */
  count: number;
  /** Searches a `search` step is still waiting on. */
  pending?: number;
  /** A search step whose results arrived. */
  resolved?: boolean;
  /** A search after the first, which reads "more pages". */
  followUp?: boolean;
  /** A `note` step's server text. */
  label?: string;
}

export interface ActivityState {
  phase: ActivityPhase;
  steps: Step[];
  /** Every page found, across searches. */
  pages: Page[];
  searches: number;
  reads: number;
  startedAt: number;
  researchEndedAt: number | null;
  /** Answer text has arrived, so research can no longer reopen. */
  answering: boolean;
  nextId: number;
}

export type ActivityAction =
  | {
      type: "thinking";
      content: string;
      retrieved_pages?: ActivityPage[] | undefined;
      page?: ActivityPage | undefined;
    }
  /** The first answer token. */
  | { type: "answer" }
  | { type: "done" }
  | { type: "error" }
  | { type: "stopped" };

/** Reported with `response_received` and `response_stopped`. */
export interface ActivitySummary {
  research_ms: number;
  searches: number;
  pages_found: number;
  pages_read: number;
}

export function createActivityState(now = Date.now()): ActivityState {
  return {
    phase: "thinking",
    steps: [],
    pages: [],
    searches: 0,
    reads: 0,
    startedAt: now,
    researchEndedAt: null,
    answering: false,
    nextId: 1,
  };
}

// -- Pages --------------------------------------------------------------------

/** Pages opened from a link, not a search, arrive with their path as the title. */
function titleFromPath(path: string): string {
  const slug =
    (path.split(/[?#]/)[0] ?? "").split("/").filter(Boolean).pop() ?? "";
  const words = slug
    .replace(/\.(md|html)$/, "")
    .replace(/[-_]+/g, " ")
    .trim();
  return words && (words[0] ?? "").toUpperCase() + words.slice(1);
}

function normalizePage(raw: unknown): Page | null {
  if (!raw || typeof raw !== "object") return null;
  const page = raw as Record<string, unknown>;

  const path = String(page["distinct_base_url"] || page["url"] || "").trim();
  let url = "";
  if (path.startsWith("/")) url = `${DOCS_ORIGIN}${path}`;
  else if (/^https?:\/\//.test(path)) url = path;

  const given = String(page["title"] || "").trim();
  const title = (given && given !== path ? given : titleFromPath(path)) || path;
  if (!title) return null;
  return { title, url };
}

const pageKey = (page: Page): string => page.url || page.title;

function normalizePages(pages: readonly unknown[] | undefined): Page[] {
  const seen = new Set<string>();
  const result: Page[] = [];
  (pages ?? []).forEach((raw) => {
    const page = normalizePage(raw);
    if (!page) return;
    const key = pageKey(page);
    if (seen.has(key)) return;
    seen.add(key);
    result.push(page);
  });
  return result;
}

function mergePages(existing: Page[], added: Page[]): Page[] {
  return normalizePages([...existing, ...added]);
}

// -- Steps --------------------------------------------------------------------

const isPendingSearch = (step: Step): boolean =>
  step.kind === "search" && !step.resolved;

function settle(
  steps: Step[],
  status: StepStatus = "done",
  keep: (step: Step) => boolean = () => false,
): Step[] {
  return steps.map((step) =>
    step.status === "active" && !keep(step) ? { ...step, status } : step,
  );
}

/** A new step settles the previous ones, except searches still waiting. */
function settleForNewStep(steps: Step[]): Step[] {
  return settle(steps, "done", isPendingSearch);
}

function addStep(
  state: ActivityState,
  step: Partial<Step> & Pick<Step, "kind">,
): ActivityState {
  return {
    ...state,
    steps: [
      ...state.steps,
      { id: state.nextId, status: "active", pages: [], count: 0, ...step },
    ],
    nextId: state.nextId + 1,
  };
}

function endResearch(state: ActivityState, now: number): ActivityState {
  return state.researchEndedAt ? state : { ...state, researchEndedAt: now };
}

function startWriting(state: ActivityState, now: number): ActivityState {
  if (state.steps.some((step) => step.kind === "write")) {
    return { ...endResearch(state, now), phase: "writing" };
  }
  const settled = { ...state, steps: settle(state.steps) };
  return {
    ...addStep(endResearch(settled, now), { kind: "write" }),
    phase: "writing",
  };
}

/**
 * "Generating answer..." can precede more research when the text was only
 * narration; until answer text arrives, a new search or read reopens research.
 */
function resumeResearch(state: ActivityState): ActivityState {
  if (state.phase !== "writing" || state.answering) return state;
  return {
    ...state,
    phase: "researching",
    researchEndedAt: null,
    steps: state.steps.filter((step) => step.kind !== "write"),
  };
}

function startSearch(state: ActivityState): ActivityState {
  const searches = state.searches + 1;
  const running = state.steps.findIndex(isPendingSearch);
  if (running !== -1) {
    const steps = [...state.steps];
    const step = steps[running] as Step;
    steps[running] = { ...step, pending: (step.pending ?? 0) + 1 };
    return { ...state, steps, searches, phase: "researching" };
  }
  const followUp = state.steps.some((step) => step.kind === "search");
  const next = { ...state, steps: settleForNewStep(state.steps), searches };
  return {
    ...addStep(next, { kind: "search", pending: 1, followUp }),
    phase: "researching",
  };
}

function applyResults(
  state: ActivityState,
  pages: readonly unknown[],
): ActivityState {
  const normalized = normalizePages(pages);
  // A step lists only the pages earlier searches didn't find.
  const known = new Set(state.pages.map(pageKey));
  const fresh = normalized.filter((page) => !known.has(pageKey(page)));
  const next = { ...state, pages: mergePages(state.pages, normalized) };

  const index = state.steps.findIndex(isPendingSearch);
  if (index === -1) {
    // Older backends send results without a search event.
    const followUp = state.steps.some((step) => step.kind === "search");
    const withSearch = addStep(
      {
        ...next,
        steps: settleForNewStep(next.steps),
        searches: next.searches + 1,
      },
      { kind: "search", pending: 0, followUp },
    );
    const last = withSearch.steps.length - 1;
    withSearch.steps[last] = {
      ...(withSearch.steps[last] as Step),
      status: "done",
      resolved: true,
      pages: fresh,
    };
    return { ...withSearch, phase: "researching" };
  }

  const steps = [...state.steps];
  const step = steps[index] as Step;
  const pending = (step.pending ?? 0) - 1;
  steps[index] = {
    ...step,
    pending,
    resolved: pending <= 0,
    status: pending <= 0 ? "done" : step.status,
    pages: mergePages(step.pages, fresh),
  };
  return { ...next, steps, phase: "researching" };
}

function applyRead(
  state: ActivityState,
  page: ActivityPage | undefined,
): ActivityState {
  const last = state.steps[state.steps.length - 1];
  const opened = normalizePages(page ? [page] : []);
  const key = opened[0] ? pageKey(opened[0]) : null;
  const alreadyRead =
    key !== null &&
    state.steps.some(
      (step) =>
        step.kind === "read" && step.pages.some((p) => pageKey(p) === key),
    );

  if (alreadyRead) {
    // Reading further into a long page gets its own step, but it is still one
    // page checked.
    if (
      last?.kind === "more" &&
      last.status === "active" &&
      last.pages[0] &&
      pageKey(last.pages[0]) === key
    ) {
      return { ...state, phase: "researching" };
    }
    const next = {
      ...state,
      steps: settleForNewStep(state.steps),
      phase: "researching" as const,
    };
    return addStep(next, { kind: "more", pages: opened });
  }

  const next = {
    ...state,
    reads: state.reads + 1,
    phase: "researching" as const,
  };
  if (last?.kind === "read" && last.status === "active") {
    const steps = [...next.steps];
    steps[steps.length - 1] = {
      ...last,
      count: last.count + 1,
      pages: mergePages(last.pages, opened),
    };
    return { ...next, steps };
  }
  return addStep(
    { ...next, steps: settleForNewStep(next.steps) },
    { kind: "read", count: 1, pages: opened },
  );
}

export function reduceActivity(
  state: ActivityState,
  action: ActivityAction,
  now = Date.now(),
): ActivityState {
  switch (action.type) {
    case "thinking": {
      const stage = SERVER_STAGES[action.content];
      if (stage === "search") return startSearch(resumeResearch(state));
      if (stage === "review") {
        return Array.isArray(action.retrieved_pages)
          ? applyResults(resumeResearch(state), action.retrieved_pages)
          : applyRead(resumeResearch(state), action.page);
      }
      if (stage === "write") return startWriting(state, now);
      if (stage === "understand") {
        const next = { ...state, steps: settleForNewStep(state.steps) };
        return {
          ...addStep(next, { kind: "understand" }),
          phase: "researching",
        };
      }
      if (typeof action.content === "string" && action.content.trim()) {
        // An unknown stage from a newer backend: surface its text rather than
        // hiding progress.
        const next = { ...state, steps: settleForNewStep(state.steps) };
        return {
          ...addStep(next, { kind: "note", label: action.content.trim() }),
          phase: "researching",
        };
      }
      return state;
    }
    case "answer": {
      const writing =
        state.phase === "writing" ? state : startWriting(state, now);
      return { ...writing, answering: true };
    }
    case "done":
      return {
        ...endResearch(state, now),
        phase: "done",
        steps: settle(state.steps),
      };
    case "error":
      return {
        ...endResearch(state, now),
        phase: "error",
        steps: settle(state.steps, "failed"),
      };
    case "stopped":
      return {
        ...endResearch(state, now),
        phase: "stopped",
        steps: settle(state.steps, "cancelled"),
      };
    default:
      return state;
  }
}

// -- Copy ---------------------------------------------------------------------

const plural = (n: number, one: string, many: string): string =>
  `${n} ${n === 1 ? one : many}`;

/** Steps cut short by an error or by the reader stopping the answer. */
function describeInterruptedStep(step: Step): string {
  const failed = step.status === "failed";
  switch (step.kind) {
    case "search":
      return failed ? S.searchFailed : S.searchStopped;
    case "read":
    case "more":
      return failed ? S.readFailed : S.readStopped;
    case "write":
      return failed ? S.writeFailed : S.writeStopped;
    case "understand":
      return failed ? S.understandFailed : S.stopped;
    default:
      return step.label ?? "";
  }
}

/** A running step ends with "...", which drops once it finishes. */
export function describeStep(step: Step): string {
  const label = stepLabel(step);
  return step.status === "active" && label && !label.endsWith("...")
    ? `${label}...`
    : label;
}

function stepLabel(step: Step): string {
  if (
    (step.status === "failed" || step.status === "cancelled") &&
    !step.resolved
  ) {
    return describeInterruptedStep(step);
  }
  const active = step.status === "active";
  switch (step.kind) {
    case "understand":
      return active ? S.understanding : S.understood;
    case "search": {
      const found = step.pages.length;
      if (step.followUp) {
        if (active) return S.findingMore;
        if (!step.resolved) return S.lookedForMore;
        return found
          ? `Found ${plural(found, "more page", "more pages")}`
          : S.noNewPages;
      }
      if (active) return S.finding;
      if (!step.resolved) return S.lookedFor;
      return found
        ? `Found ${plural(found, "relevant page", "relevant pages")}`
        : S.noRelevantPages;
    }
    case "read":
      return active
        ? `Checking ${step.count === 1 ? "a page" : plural(step.count, "page", "pages")}`
        : `Checked ${plural(step.count, "page", "pages")}`;
    case "more":
      return active ? S.checkingMore : S.checkedMore;
    case "write":
      return active ? S.writing : S.wrote;
    default:
      return step.label ?? "";
  }
}

const activeStep = (state: ActivityState): Step | undefined =>
  [...state.steps].reverse().find((step) => step.status === "active");

const hasResearched = (state: ActivityState): boolean =>
  state.steps.some((step) => step.kind === "search" || step.kind === "read");

export function researchSeconds(
  state: ActivityState,
  now = Date.now(),
): number {
  const end = state.researchEndedAt || now;
  return Math.max(1, Math.round((end - state.startedAt) / 1000));
}

export function summarizeActivity(state: ActivityState): string {
  const parts: string[] = [];
  // Searches the backend ran, even when parallel ones share a step.
  if (state.searches) parts.push(plural(state.searches, "search", "searches"));
  if (state.reads)
    parts.push(`${plural(state.reads, "page", "pages")} checked`);
  else if (state.pages.length) {
    parts.push(`${plural(state.pages.length, "page", "pages")} found`);
  }
  return parts.join(" · ");
}

export function describeHeadline(
  state: ActivityState,
  now = Date.now(),
): string {
  switch (state.phase) {
    case "error":
      return S.headlineError;
    case "stopped":
      return S.stopped;
    case "writing":
    case "done": {
      const seconds = researchSeconds(state, now);
      return hasResearched(state)
        ? `Reviewed the documentation · ${seconds}s`
        : `Answered in ${seconds}s`;
    }
    default: {
      if (hasResearched(state)) return S.reviewing;
      const active = activeStep(state);
      return active ? describeStep(active) : S.starting;
    }
  }
}

// -- View ---------------------------------------------------------------------

const SETTLED_PHASES: readonly ActivityPhase[] = ["done", "error", "stopped"];

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

let timelineCount = 0;

export interface ActivityTimelineOptions {
  /** Called when the reader opens or closes the timeline. */
  onToggle?: (expanded: boolean) => void;
}

export class ActivityTimeline {
  readonly root: HTMLDivElement;

  private state: ActivityState = createActivityState();
  private readonly onToggle: ((expanded: boolean) => void) | undefined;
  private expanded = true;
  private userToggled = false;
  private readonly stepNodes = new Map<number, HTMLLIElement>();
  private lastAnnounced = "";
  private announcedThinking = false;
  private tick: ReturnType<typeof setInterval> | null;

  private readonly header: HTMLButtonElement;
  private readonly headline: HTMLSpanElement;
  private readonly meta: HTMLSpanElement;
  private readonly timer: HTMLSpanElement;
  private readonly body: HTMLDivElement;
  private readonly list: HTMLOListElement;
  private readonly live: HTMLSpanElement;

  constructor({ onToggle }: ActivityTimelineOptions = {}) {
    this.onToggle = onToggle;

    timelineCount += 1;
    const bodyId = `conv-search-activity-${timelineCount}`;

    this.root = el("div", "conv-search-activity is-working");
    this.header = el("button", "conv-search-activity-header");
    this.header.type = "button";
    this.header.setAttribute("aria-expanded", "true");
    this.header.setAttribute("aria-controls", bodyId);

    const status = el("span", "conv-search-activity-status");
    status.setAttribute("aria-hidden", "true");
    this.headline = el("span", "conv-search-activity-headline", S.starting);
    this.meta = el("span", "conv-search-activity-meta");
    this.timer = el("span", "conv-search-activity-timer");
    this.timer.setAttribute("aria-hidden", "true");
    const chevron = el("span", "conv-search-activity-chevron");
    chevron.innerHTML = chevronDownIcon({ size: 14 });
    this.header.append(status, this.headline, this.meta, this.timer, chevron);

    this.body = el("div", "conv-search-activity-body");
    this.body.id = bodyId;
    const inner = el("div", "conv-search-activity-body-inner");
    this.list = el("ol", "conv-search-activity-steps");
    inner.appendChild(this.list);
    this.body.appendChild(inner);

    this.live = el("span", "conv-search-sr-only");
    this.live.setAttribute("aria-live", "polite");

    this.root.append(this.header, this.body, this.live);

    this.header.addEventListener("click", () => {
      this.userToggled = true;
      this.setExpanded(!this.expanded);
      this.onToggle?.(this.expanded);
    });

    this.render();
    this.tick = setInterval(() => this.renderHeader(), 1000);
  }

  dispatch(action: ActivityAction): void {
    this.state = reduceActivity(this.state, action);
    if (action.type === "answer" && !this.userToggled) this.setExpanded(false);
    if (
      action.type === "done" ||
      action.type === "error" ||
      action.type === "stopped"
    ) {
      this.stopTimer();
    }
    this.render();
  }

  summary(): ActivitySummary {
    return {
      research_ms:
        (this.state.researchEndedAt || Date.now()) - this.state.startedAt,
      searches: this.state.searches,
      pages_found: this.state.pages.length,
      pages_read: this.state.reads,
    };
  }

  destroy(): void {
    this.stopTimer();
  }

  private stopTimer(): void {
    if (this.tick) clearInterval(this.tick);
    this.tick = null;
  }

  private setExpanded(expanded: boolean): void {
    this.expanded = expanded;
    this.root.classList.toggle("is-collapsed", !expanded);
    this.header.setAttribute("aria-expanded", String(expanded));
    // Keeps the collapsed page links out of the tab order and the
    // accessibility tree.
    if (expanded) {
      this.body.removeAttribute("inert");
      this.body.removeAttribute("aria-hidden");
    } else {
      this.body.setAttribute("inert", "");
      this.body.setAttribute("aria-hidden", "true");
    }
  }

  private render(): void {
    const { phase } = this.state;
    this.root.dataset["phase"] = phase;
    this.root.classList.toggle(
      "is-working",
      phase === "thinking" || phase === "researching",
    );
    this.root.classList.toggle("is-writing", phase === "writing");
    this.root.classList.toggle("is-settled", SETTLED_PHASES.includes(phase));
    this.root.classList.toggle("is-empty", this.state.steps.length === 0);
    this.state.steps.forEach((step, index) => this.renderStep(step, index));
    this.renderHeader();
  }

  private renderHeader(): void {
    const { phase } = this.state;
    const headline = describeHeadline(this.state);
    if (this.headline.textContent !== headline) {
      this.headline.textContent = headline;
    }

    const researching = phase === "thinking" || phase === "researching";
    this.timer.textContent = researching
      ? `${researchSeconds(this.state)}s`
      : "";
    this.meta.textContent =
      researching || phase === "error" ? "" : summarizeActivity(this.state);

    const announcement = this.announcement(headline);
    if (announcement && announcement !== this.lastAnnounced) {
      this.live.textContent = announcement;
      this.lastAnnounced = announcement;
    }
  }

  /** Each step is announced once; errors announce through `role="alert"`. */
  private announcement(headline: string): string {
    switch (this.state.phase) {
      case "writing":
        return S.writing;
      case "done":
        return S.answerReady;
      case "stopped":
        return S.stopped;
      case "error":
        return "";
      default: {
        const active = activeStep(this.state);
        if (active) return describeStep(active);
        if (this.announcedThinking) return "";
        this.announcedThinking = true;
        return headline;
      }
    }
  }

  private renderStep(step: Step, index: number): void {
    let node = this.stepNodes.get(step.id);
    if (!node) {
      node = el("li", "conv-search-activity-step");
      node.dataset["kind"] = step.kind;
      const marker = el("span", "conv-search-activity-step-icon");
      marker.innerHTML = activityStepIcon(step.kind);
      const body = el("div", "conv-search-activity-step-body");
      body.appendChild(el("span", "conv-search-activity-step-label"));
      node.append(marker, body);
      node.style.setProperty("--conv-step-index", String(index));
      this.list.appendChild(node);
      this.stepNodes.set(step.id, node);
    }
    node.dataset["status"] = step.status;

    const label = node.querySelector(".conv-search-activity-step-label");
    const text = describeStep(step);
    if (label && label.textContent !== text) label.textContent = text;

    if (step.kind !== "read" && step.kind !== "more") return;
    const body = node.querySelector(".conv-search-activity-step-body");
    const rendered = Number(node.dataset["pages"] ?? 0);
    if (body && step.pages.length !== rendered) {
      body.querySelector(".conv-search-activity-pages")?.remove();
      if (step.pages.length) body.appendChild(renderPages(step.pages));
      node.dataset["pages"] = String(step.pages.length);
    }
  }
}

function renderPages(pages: Page[]): HTMLDivElement {
  const wrap = el("div", "conv-search-activity-pages");
  pages.forEach((page, index) => {
    const chip = page.url
      ? Object.assign(el("a", "conv-search-activity-page"), {
          href: page.url,
          target: "_blank",
          rel: "noopener noreferrer",
        })
      : el("span", "conv-search-activity-page");
    chip.title = page.title;
    chip.appendChild(el("span", "conv-search-activity-page-title", page.title));
    if (index >= MAX_VISIBLE_PAGES) chip.classList.add("is-overflow");
    wrap.appendChild(chip);
  });

  const hidden = pages.length - MAX_VISIBLE_PAGES;
  if (hidden > 0) {
    const more = el("button", "conv-search-activity-more", `+${hidden} more`);
    more.type = "button";
    more.addEventListener("click", () => {
      wrap.classList.add("is-expanded");
      more.remove();
    });
    wrap.appendChild(more);
  }
  return wrap;
}
