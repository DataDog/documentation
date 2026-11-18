// @vitest-environment happy-dom
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, cleanup } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { h } from "preact";

// `navigate` from astro:transitions/client isn't available under Vitest; stub it
// so we can assert the client-side navigation target a pill click produces.
const navigate = vi.fn();
vi.mock("astro:transitions/client", () => ({
  navigate: (...args: unknown[]) => navigate(...args),
}));

import CdocsFilterBar from "../CdocsFilterBar";
import type { CdocsFilterLinks } from "@lib/cdocs/filterOptionLinks";

const BARE_URL = "/dd_e2e/cdocs/custom_instrumentation/";

const filterLinks: CdocsFilterLinks[] = [
  {
    traitId: "prog_lang",
    label: "Language",
    options: [
      {
        id: "java",
        label: "Java",
        isSelected: true,
        url: `${BARE_URL}?api_type=dd_api&prog_lang=java`,
        labels: [],
      },
      {
        id: "python",
        label: "Python",
        isSelected: false,
        url: `${BARE_URL}?api_type=dd_api&prog_lang=python`,
        labels: [],
      },
    ],
  },
  {
    traitId: "api_type",
    label: "API",
    options: [
      {
        id: "otel_api",
        label: "OpenTelemetry API",
        isSelected: false,
        url: `${BARE_URL}?api_type=otel_api&prog_lang=java`,
        labels: [],
      },
      {
        id: "dd_api",
        label: "Datadog API",
        isSelected: true,
        url: `${BARE_URL}?api_type=dd_api&prog_lang=java`,
        labels: [],
      },
    ],
  },
];

const mount = (props = { filterLinks }) => render(h(CdocsFilterBar, props));

const pill = (label: string) =>
  [
    ...document.querySelectorAll<HTMLButtonElement>(".cdocs-filter-bar__pill"),
  ].find((button) => button.textContent === label)!;

const isSelected = (label: string) =>
  pill(label).classList.contains("cdocs-filter-bar__pill--selected");

beforeEach(() => {
  navigate.mockReset();
  window.history.replaceState({}, "", BARE_URL);
});

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

describe("CdocsFilterBar", () => {
  it("renders a labeled radiogroup of pills per filter", () => {
    mount();
    const groups = document.querySelectorAll(".cdocs-filter-bar__pills");
    expect(groups.length).toBe(2);
    expect(groups[0].getAttribute("role")).toBe("radiogroup");

    const labels = [
      ...document.querySelectorAll(".cdocs-filter-bar__label"),
    ].map((el) => el.textContent);
    expect(labels).toEqual(["Language", "API"]);

    // The group is labelled by its heading for assistive tech.
    const labelId = document.querySelector(".cdocs-filter-bar__label")!.id;
    expect(groups[0].getAttribute("aria-labelledby")).toBe(labelId);
  });

  it("marks the current value as the selected pill", () => {
    mount();
    expect(isSelected("Java")).toBe(true);
    expect(pill("Java").getAttribute("aria-checked")).toBe("true");
    expect(pill("Python").getAttribute("aria-checked")).toBe("false");
    // Second filter's resolved value drives its selection independently.
    expect(isSelected("Datadog API")).toBe(true);
    expect(pill("OpenTelemetry API").getAttribute("aria-checked")).toBe(
      "false",
    );
  });

  it("navigates to the clicked option's URL", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", `${BARE_URL}?prog_lang=java&stale=1`);
    mount();
    await user.click(pill("Python"));
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(
      `${BARE_URL}?api_type=dd_api&prog_lang=python`,
    );
  });

  it("selects the clicked pill before the new page arrives", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(pill("Python"));

    expect(isSelected("Python")).toBe(true);
    expect(pill("Python").getAttribute("aria-checked")).toBe("true");
    expect(isSelected("Java")).toBe(false);
    expect(pill("Java").getAttribute("aria-checked")).toBe("false");
    // Other filters keep their selection until the new page says otherwise.
    expect(isSelected("Datadog API")).toBe(true);
  });

  it("shows the new page's selection when its props arrive", async () => {
    const user = userEvent.setup();
    const { rerender } = mount();
    await user.click(pill("Python"));

    // The server resolved Java after all (say, Python was dropped).
    rerender(h(CdocsFilterBar, { filterLinks: structuredClone(filterLinks) }));

    expect(isSelected("Java")).toBe(true);
    expect(isSelected("Python")).toBe(false);
  });

  it("renders nothing when there are no filters", () => {
    mount({ filterLinks: [] });
    expect(document.querySelector(".cdocs-filter-bar")).toBeNull();
  });
});
