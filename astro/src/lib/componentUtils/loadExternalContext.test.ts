// @vitest-environment happy-dom
import { describe, it, expect, afterEach, vi } from "vitest";
import { withExternalContext } from "./loadExternalContext";

const context = {
  scope: "group",
  entries: { panels: ["panel-0", "panel-1"] },
};

function addPanel(id: string) {
  const panel = document.createElement("div");
  panel.id = id;
  document.getElementById("group")!.append(panel);
}

function setReadyState(state: DocumentReadyState) {
  vi.spyOn(document, "readyState", "get").mockReturnValue(state);
}

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

describe("withExternalContext", () => {
  it("runs setup right away when the document is already parsed", () => {
    document.body.innerHTML = '<div id="group"></div>';
    addPanel("panel-0");
    addPanel("panel-1");
    setReadyState("complete");
    const setup = vi.fn();

    withExternalContext(context, setup);

    expect(setup).toHaveBeenCalledOnce();
    expect(
      setup.mock.calls[0][0].panels.map((el: HTMLElement) => el.id),
    ).toEqual(["panel-0", "panel-1"]);
  });

  it("waits for DOMContentLoaded while later elements are still being parsed", () => {
    // On a large page, an island can hydrate before the browser has parsed
    // the HTML that follows it, such as a tab group's second panel.
    document.body.innerHTML = '<div id="group"></div>';
    addPanel("panel-0");
    setReadyState("loading");
    const setup = vi.fn();

    withExternalContext(context, setup);
    expect(setup).not.toHaveBeenCalled();

    addPanel("panel-1");
    setReadyState("interactive");
    document.dispatchEvent(new Event("DOMContentLoaded"));

    expect(setup).toHaveBeenCalledOnce();
    expect(setup.mock.calls[0][0].panels).toHaveLength(2);
  });

  it("skips setup when an element is still missing after parsing", () => {
    document.body.innerHTML = '<div id="group"></div>';
    addPanel("panel-0");
    setReadyState("complete");
    const setup = vi.fn();

    withExternalContext(context, setup);

    expect(setup).not.toHaveBeenCalled();
  });

  it("runs the cleanup that setup returns", () => {
    document.body.innerHTML = '<div id="group"></div>';
    addPanel("panel-0");
    addPanel("panel-1");
    setReadyState("complete");
    const teardown = vi.fn();

    const cleanup = withExternalContext(context, () => teardown);
    cleanup();

    expect(teardown).toHaveBeenCalledOnce();
  });

  it("never runs setup if cleanup happens before DOMContentLoaded", () => {
    document.body.innerHTML = '<div id="group"></div>';
    addPanel("panel-0");
    addPanel("panel-1");
    setReadyState("loading");
    const setup = vi.fn();

    const cleanup = withExternalContext(context, setup);
    cleanup();
    document.dispatchEvent(new Event("DOMContentLoaded"));

    expect(setup).not.toHaveBeenCalled();
  });
});
