import { useState } from 'preact/hooks';
import type { JSX } from 'preact';
import styles from './LanguageSelector.module.css';
import { classListFactory } from '../../utils/classListFactory';

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

  const handleChange = (e: JSX.TargetedEvent<HTMLSelectElement>) => {
    const code = e.currentTarget.value;
    setSelected(code);
    const opt = options.find((o) => o.code === code);
    if (opt) window.location.href = opt.href;
  };

  return (
    <div class={cl('language-selector')}>
      <label class={cl('language-selector__label')} for="language-select">
        Language
      </label>
      <select
        id="language-select"
        class={cl('language-selector__select')}
        value={selected}
        onChange={handleChange}
      >
        {options.map((opt) => (
          <option key={opt.code} value={opt.code}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
