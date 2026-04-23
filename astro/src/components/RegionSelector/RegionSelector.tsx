import { useEffect, useMemo, useState } from 'preact/hooks';
import type { JSX } from 'preact';
import styles from './RegionSelector.module.css';
import {
  getActiveRegion,
  setActiveRegion,
  syncRegionFromReferrer,
  onRegionChange,
  initRegionState,
  DEFAULT_REGION_KEY,
} from './regionState';
import type { ClientRegion } from '../../config/regions';

export interface RegionSelectorProps {
  /** Allowed Datadog sites. Supplied by `RegionSelectorIsland.astro` at build time. */
  regions: ClientRegion[];
}

/**
 * Dropdown for picking the active Datadog site. Persistence and DOM sync go
 * through `regionState`. The region list is passed in by the `.astro` island
 * wrapper so this component (and its client bundle) never imports the
 * build-time region config or the `yaml` parser.
 */
export function RegionSelector({ regions }: RegionSelectorProps): JSX.Element {
  useMemo(() => initRegionState(regions), [regions]);

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
