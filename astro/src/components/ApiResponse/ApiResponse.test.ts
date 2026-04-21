import { describe, it, expect } from 'vitest';
import { render } from 'preact-render-to-string';
import { h } from 'preact';
import { ApiResponse } from './ApiResponse';

describe('ApiResponse component', () => {
  const responses = [
    {
      statusCode: '200',
      description: 'OK response',
      examples: [{ name: 'Example 1', value: '{"ok": true}' }],
    },
    {
      statusCode: '404',
      description: 'Not found response',
    },
  ];

  it('renders with data-testid and a heading', () => {
    const html = render(h(ApiResponse, { responses }));

    expect(html).toContain('data-testid="api-response"');
    expect(html).toContain('Response');
  });

  it('renders a tab label for every status code', () => {
    const html = render(h(ApiResponse, { responses }));

    expect(html).toContain('200');
    expect(html).toContain('404');
  });

  it('renders the active response\'s description and panel', () => {
    const html = render(h(ApiResponse, { responses }));

    expect(html).toContain('OK response');
    expect(html).toContain('data-testid="api-response-panel-200"');
  });
});
