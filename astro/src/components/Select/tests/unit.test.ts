// @vitest-environment happy-dom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, cleanup } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import type { ComponentType } from 'preact';
import { Select } from '../Select';

const SelectComponent = Select as ComponentType<any>;

function getWrapper() {
  return document.querySelector<HTMLElement>('.select')!;
}
function getControl() {
  return document.querySelector<HTMLSelectElement>('.select__control')!;
}

afterEach(cleanup);

describe('Select — static render', () => {
  it('renders wrapper and native select with BEM classes', () => {
    render(
      h(SelectComponent, { id: 's', value: 'a', onChange: () => {} }, [
        h('option', { value: 'a' }, 'A'),
        h('option', { value: 'b' }, 'B'),
      ]),
    );

    expect(getWrapper().classList.contains('select')).toBe(true);
    expect(getControl().classList.contains('select__control')).toBe(true);
  });

  it('forwards id, value, and aria-label to the native select', () => {
    render(
      h(
        SelectComponent,
        { id: 'lang', value: 'b', 'aria-label': 'Language', onChange: () => {} },
        [h('option', { value: 'a' }, 'A'), h('option', { value: 'b' }, 'B')],
      ),
    );

    const control = getControl();
    expect(control.id).toBe('lang');
    expect(control.value).toBe('b');
    expect(control.getAttribute('aria-label')).toBe('Language');
  });

  it('renders option children', () => {
    render(
      h(SelectComponent, { value: 'a', onChange: () => {} }, [
        h('option', { value: 'a' }, 'Apple'),
        h('option', { value: 'b' }, 'Banana'),
      ]),
    );

    const options = Array.from(getControl().options);
    expect(options.map((o) => o.value)).toEqual(['a', 'b']);
    expect(options.map((o) => o.textContent)).toEqual(['Apple', 'Banana']);
  });
});

describe('Select — interactivity', () => {
  it('fires onChange when the user selects a new option', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      h(SelectComponent, { value: 'a', onChange }, [
        h('option', { value: 'a' }, 'A'),
        h('option', { value: 'b' }, 'B'),
      ]),
    );

    await user.selectOptions(getControl(), 'b');

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});

describe('Select — visibility', () => {
  it('wrapper and control are present and not hidden', () => {
    render(
      h(SelectComponent, { value: 'a', onChange: () => {} }, [
        h('option', { value: 'a' }, 'A'),
      ]),
    );

    const wrapper = getWrapper();
    const control = getControl();
    expect(wrapper.isConnected).toBe(true);
    expect(control.isConnected).toBe(true);
    expect(wrapper.hasAttribute('hidden')).toBe(false);
    expect(control.hasAttribute('hidden')).toBe(false);
  });
});
