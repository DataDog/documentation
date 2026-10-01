// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, waitFor } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { h } from "preact";
import { TabsNav } from "../TabsNav";
import { readSyncCookie, type TabSync } from "../tabSync";

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
  window.history.replaceState(null, "", "/");
  document.cookie = "code-lang=; path=/; max-age=0";
  document.cookie = "tab=; path=/; max-age=0";
});

// TabsNav renders the nav + buttons; panels live in the Astro shell. Tests
// mirror production ordering: the .tabs root with panels exists before the
// nav mounts, so loadContext can resolve scope and panel IDs during the mount
// effect. Rendering happens into a dedicated child container (not the .tabs
// root itself) so the panels aren't wiped.
const mountNav = (
  groupId: string,
  labels: string[],
  options: { disabled?: boolean[]; sync?: TabSync } = {},
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
  const { unmount } = render(
    h(TabsNav, {
      labels,
      externalContext: {
        scope: groupId,
        entries: { tabsEl: groupId, tabPanelEls: panelIds },
      },
      disabled: options.disabled,
      sync: options.sync,
    }),
    { container: navContainer },
  );

  return { root, panelIds, unmount };
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
    const panels = panelIds.map((id) =>
      root.querySelector<HTMLElement>(`#${id}`)!,
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
    const panels = panelIds.map((id) =>
      root.querySelector<HTMLElement>(`#${id}`)!,
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
      const panels = panelIds.map((id) =>
        root.querySelector<HTMLElement>(`#${id}`)!,
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

    const panels = panelIds.map((id) =>
      root.querySelector<HTMLElement>(`#${id}`)!,
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

describe("TabsNav sync", () => {
  const codeLang = (keys: string[]): TabSync => ({ group: "code-lang", keys });
  const buttonsOf = (root: HTMLElement) =>
    root.querySelectorAll<HTMLButtonElement>('[data-tab-index][role="tab"]');
  const activeIndexOf = (root: HTMLElement) =>
    [...buttonsOf(root)].findIndex((button) =>
      button.classList.contains("tabs__button--active"),
    );

  it("renders data-sync attributes only when sync is passed", () => {
    const { root: synced } = mountNav("s1", ["Curl", "Python"], {
      sync: codeLang(["curl", "python"]),
    });
    const { root: plain } = mountNav("s2", ["A", "B"]);

    expect(buttonsOf(synced)[1].dataset.syncGroup).toBe("code-lang");
    expect(buttonsOf(synced)[1].dataset.syncKey).toBe("python");
    expect(buttonsOf(plain)[1].hasAttribute("data-sync-group")).toBe(false);
  });

  it("starts on the first tab and writes no cookie when nothing is stored", () => {
    const { root } = mountNav("s3", ["Curl", "Python"], {
      sync: codeLang(["curl", "python"]),
    });

    expect(activeIndexOf(root)).toBe(0);
    // happy-dom keeps an emptied cookie after `max-age=0`, so check the value.
    expect(readSyncCookie("code-lang", document.cookie)).toBeUndefined();
  });

  it("starts on the query key and stores it in the cookie", async () => {
    window.history.replaceState(null, "", "/?code-lang=python");
    const { root } = mountNav("s4", ["Curl", "Python"], {
      sync: codeLang(["curl", "python"]),
    });

    await waitFor(() => expect(activeIndexOf(root)).toBe(1));
    expect(document.cookie).toContain("code-lang=python");
  });

  it("starts on the cookie key", async () => {
    document.cookie = "code-lang=python; path=/";
    const { root } = mountNav("s5", ["Curl", "Python"], {
      sync: codeLang(["curl", "python"]),
    });

    await waitFor(() => expect(activeIndexOf(root)).toBe(1));
  });

  it("lets a matching URL hash win over the stored key", async () => {
    document.cookie = "code-lang=python; path=/";
    window.history.replaceState(null, "", "/#s6-panel-2");
    const { root } = mountNav("s6", ["Curl", "Python", "Go"], {
      sync: codeLang(["curl", "python", "go"]),
    });

    await waitFor(() => expect(activeIndexOf(root)).toBe(2));
  });

  it("a click switches other groups with the same name only", async () => {
    const user = userEvent.setup();
    const { root: clicked } = mountNav("s7", ["Curl", "Python"], {
      sync: codeLang(["curl", "python"]),
    });
    const { root: sameGroup } = mountNav("s8", ["Curl", "Python"], {
      sync: codeLang(["curl", "python"]),
    });
    const { root: otherGroup } = mountNav("s9", ["Curl", "Python"], {
      sync: { group: "tab", keys: ["curl", "python"] },
    });
    const { root: unsynced } = mountNav("s10", ["Curl", "Python"]);

    await user.click(buttonsOf(clicked)[1]);

    await waitFor(() => expect(activeIndexOf(sameGroup)).toBe(1));
    expect(activeIndexOf(otherGroup)).toBe(0);
    expect(activeIndexOf(unsynced)).toBe(0);
  });

  it("a click does not change a group that lacks the key", async () => {
    const user = userEvent.setup();
    const { root: clicked } = mountNav("s11", ["Curl", "Python", "Go"], {
      sync: codeLang(["curl", "python", "go"]),
    });
    const { root: lacksGo } = mountNav("s12", ["Curl", "Python"], {
      sync: codeLang(["curl", "python"]),
    });

    await user.click(buttonsOf(lacksGo)[1]);
    await waitFor(() => expect(activeIndexOf(clicked)).toBe(1));

    await user.click(buttonsOf(clicked)[2]);

    await waitFor(() => expect(activeIndexOf(clicked)).toBe(2));
    expect(activeIndexOf(lacksGo)).toBe(1);
  });

  it("a click stores the key in the cookie and the URL, keeping hash and state", async () => {
    const user = userEvent.setup();
    const routerState = { index: 3 };
    window.history.replaceState(routerState, "", "/api/?site=eu#op-v1");
    const { root } = mountNav("s13", ["Curl", "Python"], {
      sync: codeLang(["curl", "python"]),
    });

    await user.click(buttonsOf(root)[1]);

    expect(document.cookie).toContain("code-lang=python");
    expect(window.location.search).toBe("?site=eu&code-lang=python");
    expect(window.location.hash).toBe("#op-v1");
    expect(window.history.state).toEqual(routerState);
  });

  it("an unmounted group stops following clicks", async () => {
    const user = userEvent.setup();
    const { root: clicked } = mountNav("s14", ["Curl", "Python"], {
      sync: codeLang(["curl", "python"]),
    });
    const { root: removed, unmount } = mountNav("s15", ["Curl", "Python"], {
      sync: codeLang(["curl", "python"]),
    });
    const removedPanel = removed.querySelector<HTMLElement>("#s15-panel-1")!;
    unmount();

    await user.click(buttonsOf(clicked)[1]);

    expect(removedPanel.hidden).toBe(true);
  });
});
