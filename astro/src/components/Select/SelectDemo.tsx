import { useEffect, useState } from "preact/hooks";
import type { JSX } from "preact";
import styles from "./SelectDemo.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import { Select, type SelectOption } from "./Select";

const cl = classListFactory(styles);

const fruitOptions: SelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "dragonfruit", label: "Dragon fruit" },
];

/**
 * Live example for the Select test page (`/dd_e2e/components/select`). Holds
 * the state that real consumers like `RegionSelector` keep themselves, and
 * shows the current value so `onChange` is visible.
 */
export function SelectDemo(): JSX.Element {
  const [selected, setSelected] = useState(fruitOptions[0].value);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div
      class={cl("select-demo")}
      data-hydrated={hydrated ? "true" : undefined}
    >
      <span id="select-demo-label" class={cl("select-demo__label")}>
        Fruit
      </span>
      <Select
        id="select-demo"
        labelledBy="select-demo-label"
        options={fruitOptions}
        value={selected}
        onChange={setSelected}
      />
      <span class={cl("select-demo__readout")}>
        Value: <code class={cl("select-demo__value")}>{selected}</code>
      </span>
    </div>
  );
}
