import { describe, it, expect } from 'vitest';
import { renderApiStatusAlertMd } from './ApiStatusAlert.md';

describe('renderApiStatusAlertMd', () => {
  it('renders a deprecated alert at warning level with the default message', () => {
    const out = renderApiStatusAlertMd({ type: 'deprecated' });
    expect(out).toContain('{% alert level="warning" %}');
    expect(out).toContain('**Deprecated:** This endpoint is deprecated.');
    expect(out).toContain('{% /alert %}');
  });

  it('renders an unstable alert at warning level', () => {
    const out = renderApiStatusAlertMd({ type: 'unstable' });
    expect(out).toContain('{% alert level="warning" %}');
    expect(out).toContain('**Unstable:**');
  });

  it('renders a beta alert at info level', () => {
    const out = renderApiStatusAlertMd({ type: 'beta' });
    expect(out).toContain('{% alert level="info" %}');
    expect(out).toContain('**Beta:**');
  });

  it('uses a custom message when provided', () => {
    const out = renderApiStatusAlertMd({
      type: 'deprecated',
      message: 'Will be removed in v3.',
    });
    expect(out).toContain('Will be removed in v3.');
    expect(out).not.toContain('This endpoint is deprecated.');
  });

  it('appends a newer-version link only for deprecated alerts', () => {
    const dep = renderApiStatusAlertMd({
      type: 'deprecated',
      newerVersionUrl: '/api/latest/foo',
    });
    expect(dep).toContain('[Use the newer version.](/api/latest/foo)');

    const unstable = renderApiStatusAlertMd({
      type: 'unstable',
      newerVersionUrl: '/api/latest/foo',
    });
    expect(unstable).not.toContain('Use the newer version.');
  });

  it('converts HTML in the message to Markdown', () => {
    const out = renderApiStatusAlertMd({
      type: 'unstable',
      message: 'See <a href="https://x.example">docs</a>.',
    });
    expect(out).toContain('See [docs](https://x.example).');
  });
});
