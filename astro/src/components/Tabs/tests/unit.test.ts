// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, waitFor } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { h } from "preact";
import { TabsNav } from "../TabsNav";

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

// TabsNav renders the nav + buttons; panels live in the Astro shell. Tests
// mirror production ordering: the .tabs root with panels exists before the
// nav mounts, so loadContext can resolve scope and panel IDs during the mount
// effect. Rendering happens into a dedicated child container (not the .tabs
// root itself) so the panels aren't wiped.
const mountNav = (
  groupId: string,
  labels: string[],
  options: { disabled?: boolean[] } = {},
) => {
  const root = document.createElement("div");
  root.id = groupId;
  root.className = "tabs";
  document.body.appendChild(root);

  const panelIds = labels.map((_, i) => `${groupId}-panel-${i}`);
  panelIds.forEach((id, i) => {
    const panel = document.createElement("div");
    panel.id = id;
    panel.setAttribute("role", "tabpanel");
    panel.className =
      i === 0 ? "tabs__panel tabs__panel--active" : "tabs__panel";
    panel.hidden = i !== 0;
    panel.textContent = `Panel ${i}`;
    root.appendChild(panel);
  });

  const navContainer = document.createElement("div");
  root.prepend(navContainer);
  render(
    h(TabsNav, {
      labels,
      externalContext: {
        scope: groupId,
        entries: { tabsEl: groupId, tabPanelEls: panelIds },
      },
      disabled: options.disabled,
    }),
    { container: navContainer },
  );

  return { root, panelIds };
};

describe("TabsNav", () => {
  it("marks its own nav element as hydrated on mount", () => {
    const { root } = mountNav("g1", ["A", "B"]);
    const nav = root.querySelector<HTMLElement>('[role="tablist"]');
    expect(nav?.getAttribute("data-hydrated")).toBe("true");
  });

  it("clicking a button activates that tab: BEM class + aria + panel visibility", async () => {
    const user = userEvent.setup();
    const { root, panelIds } = mountNav("g2", ["A", "B", "C"]);

    const buttons = root.querySelectorAll<HTMLButtonElement>(
      '[data-tab-index][role="tab"]',
    );
    const panels = panelIds.map(
      (id) => root.querySelector<HTMLElement>(`#${id}`)!,
    );

    await user.click(buttons[1]);

    expect(buttons[0].classList.contains("tabs__button--active")).toBe(false);
    expect(buttons[0].getAttribute("aria-selected")).toBe("false");
    expect(buttons[1].classList.contains("tabs__button--active")).toBe(true);
    expect(buttons[1].getAttribute("aria-selected")).toBe("true");
    expect(panels[0].hidden).toBe(true);
    expect(panels[1].hidden).toBe(false);
    expect(panels[1].classList.contains("tabs__panel--active")).toBe(true);
    expect(panels[0].classList.contains("tabs__panel--active")).toBe(false);
  });

  it("clicking back to the first tab restores original visibility", async () => {
    const user = userEvent.setup();
    const { root, panelIds } = mountNav("g3", ["A", "B"]);

    const buttons = root.querySelectorAll<HTMLButtonElement>(
      '[data-tab-index][role="tab"]',
    );
    const panels = panelIds.map(
      (id) => root.querySelector<HTMLElement>(`#${id}`)!,
    );

    await user.click(buttons[1]);
    await user.click(buttons[0]);

    expect(buttons[0].classList.contains("tabs__button--active")).toBe(true);
    expect(panels[0].hidden).toBe(false);
    expect(panels[1].hidden).toBe(true);
  });

  it("buttons reference their panels via aria-controls", () => {
    const { root, panelIds } = mountNav("g4", ["A", "B"]);

    const buttons = root.querySelectorAll<HTMLButtonElement>(
      '[data-tab-index][role="tab"]',
    );
    expect(buttons[0].getAttribute("aria-controls")).toBe(panelIds[0]);
    expect(buttons[1].getAttribute("aria-controls")).toBe(panelIds[1]);
  });

  it("disabled buttons stay non-interactive and ignore clicks", async () => {
    const user = userEvent.setup();
    const { root, panelIds } = mountNav("g5", ["Only"], {
      disabled: [true],
    });

    const button = root.querySelector<HTMLButtonElement>(
      '[data-tab-index][role="tab"]',
    )!;
    const panel = root.querySelector<HTMLElement>(`#${panelIds[0]}`)!;

    expect(button.disabled).toBe(true);
    expect(button.getAttribute("aria-disabled")).toBe("true");

    // Active state still applies to the first tab even when disabled.
    expect(button.classList.contains("tabs__button--active")).toBe(true);
    expect(panel.hidden).toBe(false);

    await user.click(button);

    // Click is a no-op: nothing about the active state changes.
    expect(button.classList.contains("tabs__button--active")).toBe(true);
    expect(panel.hidden).toBe(false);
  });

  it("activates the tab named by the URL hash on mount", () => {
    window.history.replaceState(null, "", "/#g6-panel-1");
    try {
      const { root, panelIds } = mountNav("g6", ["A", "B", "C"]);

      const buttons = root.querySelectorAll<HTMLButtonElement>(
        '[data-tab-index][role="tab"]',
      );
      const panels = panelIds.map(
        (id) => root.querySelector<HTMLElement>(`#${id}`)!,
      );

      expect(buttons[1].classList.contains("tabs__button--active")).toBe(true);
      expect(panels[1].hidden).toBe(false);
      expect(panels[1].classList.contains("tabs__panel--active")).toBe(true);
      expect(panels[0].hidden).toBe(true);
    } finally {
      window.history.replaceState(null, "", "/");
    }
  });

  it("responds to hashchange by switching tabs", async () => {
    const { root, panelIds } = mountNav("g7", ["A", "B"]);

    const panels = panelIds.map(
      (id) => root.querySelector<HTMLElement>(`#${id}`)!,
    );

    window.history.replaceState(null, "", "/#g7-panel-1");
    window.dispatchEvent(new Event("hashchange"));

    // Panel visibility flips synchronously inside the handler; the button's
    // active class is applied by Preact's next render. Wait for both.
    await waitFor(() => {
      const buttons = root.querySelectorAll<HTMLButtonElement>(
        '[data-tab-index][role="tab"]',
      );
      expect(buttons[1].classList.contains("tabs__button--active")).toBe(true);
    });
    expect(panels[1].hidden).toBe(false);

    window.history.replaceState(null, "", "/");
  });
});
