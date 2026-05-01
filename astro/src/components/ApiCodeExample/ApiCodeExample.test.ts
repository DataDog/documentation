import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
// @ts-ignore — Preact renderer is registered for SSR of nested islands (CopyButton, etc.).
import preactRenderer from '@astrojs/preact/server.js';
import ApiCodeExample from './ApiCodeExample.astro';

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

async function createContainer() {
  const container = await AstroContainer.create();
  container.addServerRenderer({ renderer: preactRenderer, name: '@astrojs/preact' });
  return container;
}

async function renderComponent(props: { examples: typeof examples }) {
  const container = await createContainer();
  return container.renderToString(ApiCodeExample, { props });
}

describe('ApiCodeExample (astro)', () => {
  it('renders nothing when examples is empty', async () => {
    const html = await renderComponent({ examples: [] });
    expect(html).not.toContain('api-code-example__heading');
    expect(html).not.toContain('role="tablist"');
  });

  it('renders the BEM root and heading', async () => {
    const html = await renderComponent({ examples });
    expect(html).toContain('api-code-example');
    expect(html).toMatch(/api-code-example__heading[^>]*>Code Example</);
  });

  it('renders a language tab for each example set', async () => {
    const html = await renderComponent({ examples });
    expect(html).toMatch(/data-tab-index="0"[^>]*>cURL</);
    expect(html).toMatch(/data-tab-index="1"[^>]*>Python</);
  });

  it('inlines a single-entry language tab (no accordion)', async () => {
    const html = await renderComponent({ examples: [examples[0]] });
    expect(html).toContain('code-block');
    expect(html).not.toContain('api-code-example__accordion');
  });

  it('renders an accordion <details> per entry when a language has multiple entries', async () => {
    const html = await renderComponent({ examples: [examples[1]] });
    const detailsMatches = html.match(/<details[^>]*api-code-example__accordion/g) ?? [];
    expect(detailsMatches.length).toBe(2);
    expect(html).toMatch(/<span[^>]*>First<\/span>/);
    expect(html).toMatch(/<span[^>]*>Second<\/span>/);
  });

  it('expands only the first accordion entry by default', async () => {
    const html = await renderComponent({ examples: [examples[1]] });
    // First <details> has open, second does not.
    const details = [...html.matchAll(/<details([^>]*)>/g)].map((m) => m[1]);
    expect(details[0]).toMatch(/\bopen\b/);
    expect(details[1]).not.toMatch(/\bopen\b/);
  });

  it('renders per-region code blocks with data-region when an entry has regionVariants', async () => {
    const html = await renderComponent({
      examples: [
        {
          language: 'curl',
          label: 'cURL',
          entries: [
            {
              description: 'Regional',
              code: 'fallback',
              syntax: 'shell',
              regionVariants: {
                us: { code: 'curl us.example.com' },
                eu: { code: 'curl eu.example.com' },
              },
            },
          ],
        },
      ],
    });

    expect(html).toContain('data-region="us"');
    expect(html).toContain('data-region="eu"');
    // Shiki wraps the code in syntax-highlighted spans, so match the unique hostname only.
    expect(html).toContain('us.example.com');
    expect(html).toContain('eu.example.com');
  });
});
