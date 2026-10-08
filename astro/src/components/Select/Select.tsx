import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import type { JSX } from "preact";
import styles from "./Select.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";

const cl = classListFactory(styles);

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  /** Applied to the button. Also prefixes the listbox and option IDs. */
  id: string;
  /** ID of the visible label element, such as "Datadog site". */
  labelledBy: string;
  options: SelectOption[];
  value: string;
  /** Called only when the chosen value differs from `value`. */
  onChange: (value: string) => void;
}

/**
 * A dropdown that opens a styled menu below its button, matching the Hugo
 * Bootstrap dropdown. Follows the WAI-ARIA listbox button pattern: a native
 * <select> can't be used because its popup is drawn by the OS, which on macOS
 * opens over the current value and ignores CSS.
 */
export function Select({
  id,
  labelledBy,
  options,
  value,
  onChange,
}: SelectProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const listboxId = `${id}-listbox`;
  const optionId = (index: number) => `${id}-option-${options[index].value}`;

  // A layout effect, not useEffect: useEffect runs after paint, so keys typed
  // right after opening would still reach the button and close the menu.
  useLayoutEffect(() => {
    if (isOpen) menuRef.current?.focus();
  }, [isOpen]);

  useCloseOnOutsidePointer(isOpen, wrapperRef, () => setIsOpen(false));

  const openMenu = () => {
    setActiveIndex(selectedIndex);
    setIsOpen(true);
  };

  const closeMenu = ({ refocusButton }: { refocusButton: boolean }) => {
    setIsOpen(false);
    if (refocusButton) buttonRef.current?.focus();
  };

  const chooseOption = (index: number) => {
    closeMenu({ refocusButton: true });
    const chosenValue = options[index].value;
    if (chosenValue !== value) onChange(chosenValue);
  };

  const handleButtonKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openMenu();
    }
  };

  const handleMenuKeyDown = (event: KeyboardEvent) => {
    const lastIndex = options.length - 1;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, lastIndex));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(lastIndex);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        chooseOption(activeIndex);
        break;
      case "Escape":
        event.preventDefault();
        closeMenu({ refocusButton: true });
        break;
      case "Tab":
        // Let focus move on naturally; just close.
        closeMenu({ refocusButton: false });
        break;
    }
  };

  return (
    <span
      ref={wrapperRef}
      class={cl("select", isOpen && "select--open")}
      data-value={value}
    >
      <button
        ref={buttonRef}
        id={id}
        type="button"
        class={cl("select__button")}
        aria-haspopup="listbox"
        aria-expanded={isOpen ? "true" : "false"}
        aria-controls={listboxId}
        aria-labelledby={`${labelledBy} ${id}`}
        onClick={() =>
          isOpen ? closeMenu({ refocusButton: false }) : openMenu()
        }
        onKeyDown={handleButtonKeyDown}
      >
        {options[selectedIndex]?.label}
      </button>
      <ul
        ref={menuRef}
        id={listboxId}
        class={cl("select__menu")}
        role="listbox"
        tabIndex={-1}
        aria-labelledby={labelledBy}
        aria-activedescendant={isOpen ? optionId(activeIndex) : undefined}
        hidden={!isOpen}
        onKeyDown={handleMenuKeyDown}
      >
        {options.map((option, index) => (
          <li
            key={option.value}
            id={optionId(index)}
            class={cl(
              "select__option",
              index === selectedIndex && "select__option--selected",
              isOpen && index === activeIndex && "select__option--active",
            )}
            role="option"
            aria-selected={index === selectedIndex ? "true" : "false"}
            data-value={option.value}
            onClick={() => chooseOption(index)}
            onMouseEnter={() => setActiveIndex(index)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </span>
  );
}

function useCloseOnOutsidePointer(
  isOpen: boolean,
  wrapperRef: { current: HTMLElement | null },
  close: () => void,
): void {
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);
}
