import { useEffect, useState } from "preact/hooks";
import type { JSX } from "preact";
import styles from "./LanguageSelector.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import { Select } from "@components/Select/Select";

const cl = classListFactory(styles);

export interface LocaleOption {
  code: string;
  label: string;
  href: string;
}

interface Props {
  options: LocaleOption[];
  currentCode: string;
}

export function LanguageSelector({ options, currentCode }: Props): JSX.Element {
  const [selected, setSelected] = useState(currentCode);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleChange = (code: string) => {
    setSelected(code);
    const opt = options.find((o) => o.code === code);
    if (opt) window.location.href = opt.href;
  };

  return (
    <div
      class={cl("language-selector")}
      data-hydrated={hydrated ? "true" : undefined}
    >
      <span id="language-select-label" class={cl("language-selector__label")}>
        {/* TODO: replace with i18n() once the helper exposes the singular form
            of the `language` key in i18n/en.json (currently returns plural). */}
        Language
      </span>
      <Select
        id="language-select"
        labelledBy="language-select-label"
        options={options.map((option) => ({
          value: option.code,
          label: option.label,
        }))}
        value={selected}
        onChange={handleChange}
      />
    </div>
  );
}
