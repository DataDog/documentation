import { useEffect, useState } from 'preact/hooks';
import type { JSX } from 'preact';
import styles from './RegionSelector.module.css';
import {
  getActiveRegion,
  setActiveRegion,
  syncRegionFromReferrer,
  onRegionChange,
} from './regionState';
import { getAllowedRegions, DEFAULT_REGION_KEY } from '../../data/api/regionConfig';

/**
 * Dropdown for picking the active Datadog site. Population, persistence, and
 * DOM sync all go through `regionState` — there are no props because the full
 * list of sites is a global (Hugo's `allowedRegions` snapshot).
 */
export function RegionSelector(): JSX.Element {
  const regions = getAllowedRegions();
  const [selected, setSelected] = useState<string>(DEFAULT_REGION_KEY);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    syncRegionFromReferrer();
    setSelected(getActiveRegion());
    setHydrated(true);
    const unsubscribe = onRegionChange((region) => setSelected(region));
    return unsubscribe;
  }, []);

  const handleChange = (e: JSX.TargetedEvent<HTMLSelectElement>) => {
    setActiveRegion(e.currentTarget.value);
  };

  return (
    <div class={`region-selector ${styles.selector}`} data-testid="region-selector" data-hydrated={hydrated ? 'true' : undefined}>
      <label class={`region-selector__label ${styles.label}`} for="region-select">Datadog site</label>
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
