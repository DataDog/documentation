import { describe, it, expect } from 'vitest';
import { render } from 'preact-render-to-string';
import { h } from 'preact';
import { RegionSelector } from './RegionSelector';
import { getAllowedRegions } from '../../data/api/regionConfig';

describe('RegionSelector component', () => {
  it('renders with data-testid attributes', () => {
    const html = render(h(RegionSelector, {}));

    expect(html).toContain('data-testid="region-selector"');
    expect(html).toContain('data-testid="region-selector-select"');
  });

  it('renders an option for every allowed region', () => {
    const html = render(h(RegionSelector, {}));

    for (const r of getAllowedRegions()) {
      expect(html).toContain(`value="${r.key}"`);
      expect(html).toContain(r.label);
    }
  });

  it('binds the "Datadog site" label to the select', () => {
    const html = render(h(RegionSelector, {}));

    expect(html).toContain('Datadog site');
    expect(html).toMatch(/for="region-select"/);
    expect(html).toMatch(/id="region-select"/);
  });
});
