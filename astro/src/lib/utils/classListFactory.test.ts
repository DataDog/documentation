import { describe, it, expect } from 'vitest';
import { classListFactory } from './classListFactory';

describe('classListFactory', () => {
  const styles = { alert: '_alert_abc', 'alert--info': '_alert--info_abc' };
  const cl = classListFactory(styles);

  it('returns BEM class paired with its module class as a string', () => {
    expect(cl('alert')).toBe('alert _alert_abc');
  });

  it('returns multiple BEM classes each paired with their module class', () => {
    expect(cl('alert', 'alert--info')).toBe('alert _alert_abc alert--info _alert--info_abc');
  });

  it('omits undefined for a BEM name with no module counterpart', () => {
    expect(cl('alert--unknown')).toBe('alert--unknown');
  });
});
