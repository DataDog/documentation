// @vitest-environment happy-dom
import { describe, it, expect, afterEach, vi } from "vitest";
import { render, cleanup } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { h } from "preact";
import { Select, type SelectOption } from "../Select";

const fruitOptions: SelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

function renderSelect(props: Partial<Parameters<typeof Select>[0]> = {}): {
  onChange: ReturnType<typeof vi.fn>;
} {
  const onChange = vi.fn();
  render(
    h("div", null, [
      h("span", { id: "fruit-label" }, "Fruit"),
      h(Select, {
        id: "fruit",
        labelledBy: "fruit-label",
        options: fruitOptions,
        value: "apple",
        onChange,
        ...props,
      }),
      h("button", { id: "outside" }, "Outside"),
    ]),
  );
  return { onChange };
}

const getWrapper = () => document.querySelector<HTMLElement>(".select")!;
const getButton = () =>
  document.querySelector<HTMLButtonElement>(".select__button")!;
const getMenu = () => document.querySelector<HTMLElement>(".select__menu")!;
const getOptions = () =>
  Array.from(document.querySelectorAll<HTMLElement>(".select__option"));
const getActiveOption = () =>
  document.querySelector<HTMLElement>(".select__option--active");

afterEach(cleanup);

describe("Select — closed state", () => {
  it("shows the label of the current value on the button", () => {
    renderSelect({ value: "banana" });
    expect(getButton().textContent).toContain("Banana");
  });

  it("exposes the current value on the wrapper", () => {
    renderSelect({ value: "banana" });
    expect(getWrapper().getAttribute("data-value")).toBe("banana");
  });

  it("renders every option in a hidden listbox", () => {
    renderSelect();
    expect(getMenu().getAttribute("role")).toBe("listbox");
    expect(getMenu().hidden).toBe(true);
    expect(getOptions().map((option) => option.dataset.value)).toEqual([
      "apple",
      "banana",
      "cherry",
    ]);
  });

  it("marks only the current option as selected", () => {
    renderSelect({ value: "banana" });
    const selectedOptions = getOptions().filter(
      (option) => option.getAttribute("aria-selected") === "true",
    );
    expect(selectedOptions.map((option) => option.dataset.value)).toEqual([
      "banana",
    ]);
    expect(selectedOptions[0].classList).toContain("select__option--selected");
  });

  it("labels the button with the external label and its own value", () => {
    renderSelect();
    const button = getButton();
    expect(button.id).toBe("fruit");
    expect(button.getAttribute("aria-haspopup")).toBe("listbox");
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(button.getAttribute("aria-labelledby")).toBe("fruit-label fruit");
  });
});

describe("Select — opening and closing", () => {
  it("opens the menu on click and marks the wrapper open", async () => {
    const user = userEvent.setup();
    renderSelect();

    await user.click(getButton());

    expect(getMenu().hidden).toBe(false);
    expect(getButton().getAttribute("aria-expanded")).toBe("true");
    expect(getWrapper().classList).toContain("select--open");
  });

  it("moves focus into the menu and highlights the current option", async () => {
    const user = userEvent.setup();
    renderSelect({ value: "banana" });

    await user.click(getButton());

    expect(document.activeElement).toBe(getMenu());
    expect(getActiveOption()?.dataset.value).toBe("banana");
    expect(getMenu().getAttribute("aria-activedescendant")).toBe(
      getActiveOption()?.id,
    );
  });

  it("closes the menu on a second click of the button", async () => {
    const user = userEvent.setup();
    renderSelect();

    await user.click(getButton());
    await user.click(getButton());

    expect(getMenu().hidden).toBe(true);
  });

  it("closes the menu and refocuses the button on Escape", async () => {
    const user = userEvent.setup();
    renderSelect();

    await user.click(getButton());
    await user.keyboard("{Escape}");

    expect(getMenu().hidden).toBe(true);
    expect(document.activeElement).toBe(getButton());
  });

  it("closes the menu on Tab", async () => {
    const user = userEvent.setup();
    renderSelect();

    await user.click(getButton());
    await user.keyboard("{Tab}");

    expect(getMenu().hidden).toBe(true);
  });

  it("closes the menu on a click outside the component", async () => {
    const user = userEvent.setup();
    renderSelect();

    await user.click(getButton());
    await user.click(document.getElementById("outside")!);

    expect(getMenu().hidden).toBe(true);
  });

  it("opens the menu with ArrowDown on the button", async () => {
    const user = userEvent.setup();
    renderSelect();

    getButton().focus();
    await user.keyboard("{ArrowDown}");

    expect(getMenu().hidden).toBe(false);
  });
});

describe("Select — choosing an option", () => {
  it("calls onChange with the clicked option's value and closes", async () => {
    const user = userEvent.setup();
    const { onChange } = renderSelect();

    await user.click(getButton());
    await user.click(getOptions()[2]);

    expect(onChange).toHaveBeenCalledExactlyOnceWith("cherry");
    expect(getMenu().hidden).toBe(true);
    expect(document.activeElement).toBe(getButton());
  });

  it("does not call onChange when the current option is chosen again", async () => {
    const user = userEvent.setup();
    const { onChange } = renderSelect();

    await user.click(getButton());
    await user.click(getOptions()[0]);

    expect(onChange).not.toHaveBeenCalled();
  });

  it("moves the highlight with arrow keys, Home, and End", async () => {
    const user = userEvent.setup();
    renderSelect();

    await user.click(getButton());
    await user.keyboard("{ArrowDown}");
    expect(getActiveOption()?.dataset.value).toBe("banana");

    await user.keyboard("{End}");
    expect(getActiveOption()?.dataset.value).toBe("cherry");

    await user.keyboard("{ArrowDown}");
    expect(getActiveOption()?.dataset.value).toBe("cherry");

    await user.keyboard("{Home}");
    expect(getActiveOption()?.dataset.value).toBe("apple");

    await user.keyboard("{ArrowUp}");
    expect(getActiveOption()?.dataset.value).toBe("apple");
  });

  it("chooses the highlighted option with Enter", async () => {
    const user = userEvent.setup();
    const { onChange } = renderSelect();

    await user.click(getButton());
    await user.keyboard("{ArrowDown}{Enter}");

    expect(onChange).toHaveBeenCalledExactlyOnceWith("banana");
    expect(getMenu().hidden).toBe(true);
  });

  it("highlights the option under the pointer", async () => {
    const user = userEvent.setup();
    renderSelect();

    await user.click(getButton());
    await user.hover(getOptions()[2]);

    expect(getActiveOption()?.dataset.value).toBe("cherry");
  });
});
