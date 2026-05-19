import { describe, it, expect } from 'vitest';
import { renderAlertMd } from './Alert';

describe('renderAlertMd', () => {
  it('wraps the body in a {% alert %} block with the given level', () => {
    expect(renderAlertMd('warning', 'Heads up.')).toBe(
      '{% alert level="warning" %}\nHeads up.\n{% /alert %}',
    );
  });

  it('supports all four levels', () => {
    for (const level of ['info', 'danger', 'warning', 'tip'] as const) {
      expect(renderAlertMd(level, 'x')).toBe(
        `{% alert level="${level}" %}\nx\n{% /alert %}`,
      );
    }
  });

  it('preserves multi-line bodies verbatim', () => {
    const body = 'Line one.\n\nLine two with [a link](https://example.com).';
    expect(renderAlertMd('info', body)).toBe(
      `{% alert level="info" %}\n${body}\n{% /alert %}`,
    );
  });
});
