import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
// @ts-ignore — Preact renderer is registered for SSR of islands in headless tests.
import preactRenderer from '@astrojs/preact/server.js';
import ApiRequestBodyTabs from './ApiRequestBodyTabs.astro';

const schema = [
  {
    name: 'id',
    type: 'string',
    required: true,
    deprecated: false,
    readOnly: false,
    description: 'Identifier',
  },
];
const examples = [{ name: 'Example', value: '{"id": "abc"}' }];
const multipleExamples = [
  { name: 'First', value: '{"id": "abc"}' },
  { name: 'Second', value: '{"id": "xyz"}' },
];

async function createContainer() {
  const container = await AstroContainer.create();
  container.addServerRenderer({ renderer: preactRenderer, name: '@astrojs/preact' });
  return container;
}

async function renderComponent(props: { schema: typeof schema; examples: typeof examples }) {
  const container = await createContainer();
  return container.renderToString(ApiRequestBodyTabs, { props });
}

describe('ApiRequestBodyTabs (astro)', () => {
  it('renders only the schema table when no examples are provided', async () => {
    const html = await renderComponent({ schema, examples: [] });

    expect(html).toContain('schema-table');
    expect(html).not.toContain('role="tablist"');
    expect(html).not.toContain('code-block');
  });

  it('renders only code blocks when no schema is provided', async () => {
    const html = await renderComponent({ schema: [], examples });

    expect(html).toContain('code-block');
    expect(html).not.toContain('schema-table');
    expect(html).not.toContain('role="tablist"');
  });

  it('renders nothing meaningful when both schema and examples are empty', async () => {
    const html = await renderComponent({ schema: [], examples: [] });

    expect(html).not.toContain('schema-table');
    expect(html).not.toContain('code-block');
    expect(html).not.toContain('role="tablist"');
  });

  it('renders a Model/Example tab pair when both are provided', async () => {
    const html = await renderComponent({ schema, examples });

    expect(html).toMatch(/data-tab-index="0"[^>]*>Model</);
    expect(html).toMatch(/data-tab-index="1"[^>]*>Example</);
    expect(html).toContain('schema-table');
    expect(html).toContain('code-block');
  });

  it('renders example labels only when multiple examples are provided', async () => {
    const htmlMultiple = await renderComponent({ schema, examples: multipleExamples });
    expect(htmlMultiple).toMatch(/<strong[^>]*>First<\/strong>/);
    expect(htmlMultiple).toMatch(/<strong[^>]*>Second<\/strong>/);

    const htmlSingle = await renderComponent({ schema, examples });
    expect(htmlSingle).not.toMatch(/<strong[^>]*>Example<\/strong>/);
  });
});
