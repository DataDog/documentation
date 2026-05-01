// @vitest-environment happy-dom
import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import type { ComponentType } from 'preact';
import { RegionSelector } from './RegionSelector';
import { buildClientRegions } from '../../config/regions';

const RegionSelectorComponent = RegionSelector as ComponentType<any>;
const regions = buildClientRegions();
const regionProps = { regions };

function getContainer() {
  return document.querySelector<HTMLElement>('.region-selector')!;
}
function getSelect() {
  return document.querySelector<HTMLSelectElement>('.region-selector__select')!;
}

beforeEach(() => {
  // Reset DOM state between tests so region persistence (cookie, URL, html attr)
  // doesn't leak across tests.
  document.documentElement.removeAttribute('data-active-region');
  document.cookie = 'site=; path=/; max-age=0';
  window.history.replaceState({}, '', '/');
});

afterEach(cleanup);

describe('RegionSelector — static render', () => {
  it('renders the container and select', () => {
    render(h(RegionSelectorComponent, regionProps));

    expect(getContainer()).toBeTruthy();
    expect(getSelect()).toBeTruthy();
  });

  it('renders an option for every allowed region', () => {
    render(h(RegionSelectorComponent, regionProps));

    const select = getSelect();
    const optionValues = Array.from(select.options).map((o) => o.value);
    const optionLabels = Array.from(select.options).map((o) => o.textContent);

    for (const r of regions) {
      expect(optionValues).toContain(r.key);
      expect(optionLabels).toContain(r.label);
    }
  });

  it('binds the "Datadog site" label to the select', () => {
    render(h(RegionSelectorComponent, regionProps));

    const label = screen.getByText('Datadog site') as HTMLLabelElement;
    const select = getSelect();

    expect(label.getAttribute('for')).toBe('region-select');
    expect(select.getAttribute('id')).toBe('region-select');
  });
});

describe('RegionSelector — BEM class state', () => {
  it('applies BEM classes to container, label, and select', () => {
    render(h(RegionSelectorComponent, regionProps));

    const container = getContainer();
    const select = getSelect();
    const label = screen.getByText('Datadog site');

    expect(container.classList.contains('region-selector')).toBe(true);
    expect(label.classList.contains('region-selector__label')).toBe(true);
    expect(select.classList.contains('region-selector__select')).toBe(true);
  });
});

describe('RegionSelector — interactivity', () => {
  it('defaults to the US region on initial render', () => {
    render(h(RegionSelectorComponent, regionProps));

    expect(getSelect().value).toBe('us');
  });

  it('selecting a region updates the select value and the BEM-identified element reflects it', async () => {
    const user = userEvent.setup();
    render(h(RegionSelectorComponent, regionProps));

    const select = getSelect();
    const targetRegion = regions.find((r) => r.key !== 'us');
    expect(targetRegion).toBeTruthy();

    await user.selectOptions(select, targetRegion!.key);

    // BEM-classed select reflects the new value
    expect(select.classList.contains('region-selector__select')).toBe(true);
    expect(select.value).toBe(targetRegion!.key);
  });

  it('selecting a region syncs the active region to the <html> data attribute', async () => {
    const user = userEvent.setup();
    render(h(RegionSelectorComponent, regionProps));

    const select = getSelect();
    const targetRegion = regions.find((r) => r.key !== 'us');

    await user.selectOptions(select, targetRegion!.key);

    expect(document.documentElement.getAttribute('data-active-region')).toBe(
      targetRegion!.key,
    );
  });

  it('reacts to external region changes dispatched on document', async () => {
    render(h(RegionSelectorComponent, regionProps));

    const select = getSelect();
    const targetRegion = regions.find((r) => r.key !== 'us')!;

    // Simulate another island changing the region
    document.documentElement.setAttribute('data-active-region', targetRegion.key);
    document.dispatchEvent(
      new CustomEvent('regionchange', { detail: { region: targetRegion.key } }),
    );

    // Re-query (value is a prop bound to the signal / state)
    await Promise.resolve();
    expect(select.value).toBe(targetRegion.key);
  });
});

describe('RegionSelector — visibility', () => {
  it('the select and label are present and visible in the DOM', () => {
    render(h(RegionSelectorComponent, regionProps));

    const container = getContainer();
    const select = getSelect();
    const label = screen.getByText('Datadog site');

    expect(container.isConnected).toBe(true);
    expect(select.isConnected).toBe(true);
    expect(label.isConnected).toBe(true);

    // No hidden attribute applied
    expect(select.hasAttribute('hidden')).toBe(false);
    expect(container.hasAttribute('hidden')).toBe(false);
  });
});
