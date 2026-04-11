import { useState, useEffect } from 'preact/hooks';
import type { JSX } from 'preact';
import styles from './RegionSelector.module.css';

export interface Region {
  key: string;
  label: string;
  site: string;
}

interface RegionSelectorProps {
  regions: Region[];
  defaultRegion?: string;
}

const STORAGE_KEY = 'dd-api-region';

export function RegionSelector({ regions, defaultRegion = 'us1' }: RegionSelectorProps): JSX.Element {
  const [selected, setSelected] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY) || defaultRegion;
    }
    return defaultRegion;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, selected);
    document.documentElement.setAttribute('data-region', selected);
    document.dispatchEvent(new CustomEvent('regionchange', { detail: { region: selected } }));
  }, [selected]);

  const handleChange = (e: JSX.TargetedEvent<HTMLSelectElement>) => {
    setSelected(e.currentTarget.value);
  };

  return (
    <div class={`region-selector ${styles.selector}`} data-testid="region-selector">
      <label class={`region-selector__label ${styles.label}`} for="region-select">Site:</label>
      <select
        id="region-select"
        class={`region-selector__select ${styles.select}`}
        value={selected}
        onChange={handleChange}
        data-testid="region-selector-select"
      >
        {regions.map((r) => (
          <option key={r.key} value={r.key}>
            {r.label}
          </option>
        ))}
      </select>
    </div>
  );
}
