import { describe, it, expect } from 'vitest';
import { render } from 'preact-render-to-string';
import { h } from 'preact';
import { ApiCodeExample } from './ApiCodeExample';

describe('ApiCodeExample component', () => {
  const examples = [
    {
      language: 'curl',
      label: 'cURL',
      entries: [
        { description: 'Basic call', code: 'curl https://api.example.com', syntax: 'shell' },
      ],
    },
    {
      language: 'python',
      label: 'Python',
      entries: [
        { description: 'First', code: 'print("hi")', syntax: 'python' },
        { description: 'Second', code: 'print("bye")', syntax: 'python' },
      ],
    },
  ];

  it('renders with data-testid and a heading', () => {
    const html = render(h(ApiCodeExample, { examples }));

    expect(html).toContain('data-testid="api-code-example"');
    expect(html).toContain('Code Example');
  });

  it('renders a tab label for every example set', () => {
    const html = render(h(ApiCodeExample, { examples }));

    expect(html).toContain('cURL');
    expect(html).toContain('Python');
  });

  it('renders the active tab\'s single-entry code inline', () => {
    const html = render(h(ApiCodeExample, { examples }));

    expect(html).toContain('curl https://api.example.com');
  });
});
