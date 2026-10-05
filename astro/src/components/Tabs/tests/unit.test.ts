// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, waitFor } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { h } from "preact";
import { TabsNav } from "../TabsNav";
import { readSyncCookie, syncKeyFromLabel, type TabSync } from "../tabSync";

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
  options: {
    disabled?: boolean[];
    sync?: TabSync;
    /** IDs of elements to place inside panels, keyed by panel index. */
    anchorsByPanel?: Record<number, string>;
  } = {},
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
    const anchorId = options.anchorsByPanel?.[i];
    if (anchorId) {
      const anchor = document.createElement("h4");
      anchor.id = anchorId;
      panel.appendChild(anchor);
    }
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

  it("with fallbackToFirstTab, a click sends a group that lacks the key to its first tab", async () => {
    const user = userEvent.setup();
    const sync = (keys: string[]): TabSync => ({
      group: "code-lang",
      keys,
      fallbackToFirstTab: true,
    });
    const { root: clicked } = mountNav("s19", ["Curl", "Python", "Go"], {
      sync: sync(["curl", "python", "go"]),
    });
    const { root: lacksGo } = mountNav("s20", ["Curl", "Python"], {
      sync: sync(["curl", "python"]),
    });

    await user.click(buttonsOf(lacksGo)[1]);
    await waitFor(() => expect(activeIndexOf(clicked)).toBe(1));

    await user.click(buttonsOf(clicked)[2]);

    await waitFor(() => expect(activeIndexOf(lacksGo)).toBe(0));
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

  it("a click activates the clicked tab when two labels share a key", async () => {
    const user = userEvent.setup();
    const labels = ["C", "C++"];
    const { root } = mountNav("s16", labels, {
      sync: { group: "tab", keys: labels.map(syncKeyFromLabel) },
    });

    await user.click(buttonsOf(root)[1]);

    await waitFor(() => expect(activeIndexOf(root)).toBe(1));
  });

  it("a click on a tab with an empty key stores nothing", async () => {
    const user = userEvent.setup();
    const labels = ["+", "-"];
    const { root } = mountNav("s17", labels, {
      sync: { group: "tab", keys: labels.map(syncKeyFromLabel) },
    });

    await user.click(buttonsOf(root)[1]);

    expect(window.location.search).toBe("");
    expect(readSyncCookie("tab", document.cookie)).toBeUndefined();
  });

  it("stores a query value in the cookie as Hugo wrote it", () => {
    window.history.replaceState(null, "", "/?code-lang=python-legacy");
    mountNav("s18", ["Curl", "Python"], {
      sync: codeLang(["curl", "python"]),
    });

    expect(readSyncCookie("code-lang", document.cookie)).toBe("python-legacy");
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

describe("TabsNav anchors inside panels", () => {
  const buttonsOf = (root: HTMLElement) =>
    root.querySelectorAll<HTMLButtonElement>('[data-tab-index][role="tab"]');
  const activeIndexOf = (root: HTMLElement) =>
    [...buttonsOf(root)].findIndex((button) =>
      button.classList.contains("tabs__button--active"),
    );

  it("opens the panel that contains the URL hash target on mount", async () => {
    window.history.replaceState(null, "", "/#heading-in-c");
    const { root } = mountNav("a1", ["A", "B", "C"], {
      anchorsByPanel: { 2: "heading-in-c" },
    });

    await waitFor(() => expect(activeIndexOf(root)).toBe(2));
  });

  it("lets the hash target's panel win over ?tab= and the cookie", async () => {
    document.cookie = "tab=a; path=/";
    window.history.replaceState(null, "", "/?tab=a#heading-in-b");
    const { root } = mountNav("a2", ["A", "B"], {
      sync: { group: "tab", keys: ["a", "b"] },
      anchorsByPanel: { 1: "heading-in-b" },
    });

    await waitFor(() => expect(activeIndexOf(root)).toBe(1));
  });

  it("opens the panel that contains the new hash target on hashchange", async () => {
    const { root } = mountNav("a3", ["A", "B"], {
      anchorsByPanel: { 1: "heading-in-b" },
    });

    window.history.replaceState(null, "", "/#heading-in-b");
    window.dispatchEvent(new Event("hashchange"));

    await waitFor(() => expect(activeIndexOf(root)).toBe(1));
  });

  it("ignores a hash target outside its panels", async () => {
    const outside = document.createElement("h2");
    outside.id = "outside";
    document.body.appendChild(outside);
    window.history.replaceState(null, "", "/#outside");
    const { root } = mountNav("a4", ["A", "B"]);

    expect(activeIndexOf(root)).toBe(0);
  });
});
