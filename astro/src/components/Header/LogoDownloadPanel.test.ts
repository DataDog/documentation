// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, act } from "@testing-library/preact";
import { h } from "preact";
import {
  LogoDownloadPanel,
  type LogoDownloadPanelLabels,
  type LogoDownloadPanelSvgs,
} from "./LogoDownloadPanel";

const labels: LogoDownloadPanelLabels = {
  eyebrow: "Looking for Datadog logos?",
  body: "You can find the logo assets on our press page.",
  cta: "Download Media Assets",
};
const svgs: LogoDownloadPanelSvgs = { arrow: "<svg data-arrow></svg>" };

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

const setupTrigger = (triggerId: string) => {
  const trigger = document.createElement("a");
  trigger.id = triggerId;
  trigger.href = "/";
  document.body.appendChild(trigger);
  return trigger;
};

const mountPanel = (triggerId: string) =>
  render(
    h(LogoDownloadPanel, {
      externalContext: { scope: triggerId, entries: { trigger: triggerId } },
      labels,
      svgs,
    }),
  );

const dispatchClick = (el: EventTarget) => {
  const event = new MouseEvent("click", { bubbles: true, cancelable: true });
  el.dispatchEvent(event);
  return event;
};

const panel = () =>
  document.querySelector(".logo-download") as HTMLDivElement | null;

describe("LogoDownloadPanel", () => {
  it("renders the panel with provided labels, svg, and cta href", () => {
    setupTrigger("t0");
    mountPanel("t0");

    const p = panel()!;
    expect(p).toBeTruthy();
    expect(p.textContent).toContain("Looking for Datadog logos?");
    expect(p.textContent).toContain("You can find the logo assets");
    const cta = p.querySelector(".logo-download__btn") as HTMLAnchorElement;
    expect(cta.textContent).toBe("Download Media Assets");
    expect(cta.href).toBe("https://www.datadoghq.com/about/resources/");
    expect(p.querySelector(".logo-download__arrow svg")).toBeTruthy();
  });

  it("is closed by default — no --open modifier on the panel", () => {
    setupTrigger("t1");
    mountPanel("t1");
    expect(panel()!.classList.contains("logo-download--open")).toBe(false);
  });

  it("opens the panel on first trigger click and prevents navigation", () => {
    const trigger = setupTrigger("t2");
    mountPanel("t2");

    let event: MouseEvent;
    act(() => {
      event = dispatchClick(trigger);
    });

    expect(panel()!.classList.contains("logo-download--open")).toBe(true);
    expect(event!.defaultPrevented).toBe(true);
  });

  it("closes on second trigger click and allows navigation", () => {
    const trigger = setupTrigger("t3");
    mountPanel("t3");

    let second: MouseEvent;
    act(() => {
      dispatchClick(trigger);
      second = dispatchClick(trigger);
    });

    expect(panel()!.classList.contains("logo-download--open")).toBe(false);
    expect(second!.defaultPrevented).toBe(false);
  });

  it("closes when a click lands outside the trigger and panel", () => {
    setupTrigger("t4");
    const outside = document.createElement("div");
    document.body.appendChild(outside);
    mountPanel("t4");

    act(() => {
      dispatchClick(document.getElementById("t4")!);
    });
    expect(panel()!.classList.contains("logo-download--open")).toBe(true);

    act(() => {
      dispatchClick(outside);
    });
    expect(panel()!.classList.contains("logo-download--open")).toBe(false);
  });

  it("does not close (via the document handler) when the click lands inside the panel", () => {
    setupTrigger("t5");
    mountPanel("t5");

    act(() => {
      dispatchClick(document.getElementById("t5")!);
    });
    const cta = panel()!.querySelector(".logo-download__btn")!;

    act(() => {
      dispatchClick(cta);
    });

    expect(panel()!.classList.contains("logo-download--open")).toBe(true);
  });

  it("marks the panel with data-hydrated on mount", () => {
    setupTrigger("t6");
    mountPanel("t6");
    expect(panel()!.getAttribute("data-hydrated")).toBe("true");
  });

  it("removes its listeners on unmount", () => {
    const trigger = setupTrigger("t7");
    const { unmount } = mountPanel("t7");
    const snapshot = panel()!;

    unmount();
    act(() => {
      dispatchClick(trigger);
    });

    expect(snapshot.classList.contains("logo-download--open")).toBe(false);
  });
});
