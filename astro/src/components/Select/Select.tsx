import type { ComponentChildren, JSX } from "preact";
import styles from "./Select.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";

const cl = classListFactory(styles);

export interface SelectProps {
  id?: string;
  value?: string;
  onChange?: (e: JSX.TargetedEvent<HTMLSelectElement>) => void;
  "aria-label"?: string;
  children: ComponentChildren;
}

export function Select({
  id,
  value,
  onChange,
  "aria-label": ariaLabel,
  children,
}: SelectProps): JSX.Element {
  return (
    <span class={cl("select")}>
      <select
        id={id}
        class={cl("select__control")}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
      >
        {children}
      </select>
    </span>
  );
}
