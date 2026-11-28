import type { JSX } from "preact";
import { Select } from "@components/Select/Select";
import styles from "./ApiChangelogVersionSelect.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";

const cl = classListFactory(styles);

export interface ChangelogVersionOption {
  value: string;
  label: string;
  href: string;
}

interface Props {
  options: ChangelogVersionOption[];
  value: string;
}

export default function ApiChangelogVersionSelect({
  options,
  value,
}: Props): JSX.Element {
  const handleChange = (nextValue: string) => {
    const option = options.find((candidate) => candidate.value === nextValue);
    if (option) window.location.href = option.href;
  };

  return (
    <div class={cl("version-select")}>
      <span id="changelog-version-label" class={cl("version-select__label")}>
        API version
      </span>
      <Select
        id="changelog-version-select"
        labelledBy="changelog-version-label"
        options={options}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
