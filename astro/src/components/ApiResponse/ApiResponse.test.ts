import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
// @ts-ignore — Preact renderer is registered for SSR of nested ApiSchemaTable islands.
import preactRenderer from '@astrojs/preact/server.js';
import ApiResponse from './ApiResponse.astro';

const responses = [
  {
    statusCode: '200',
    description: 'OK response',
    schema: [
      { name: 'id', type: 'string', required: true, deprecated: false, readOnly: false, description: 'Identifier' },
    ],
    examples: [{ name: 'Example 1', value: '{"ok": true}' }],
  },
  {
    statusCode: '404',
    description: 'Not found response',
  },
];

async function createContainer() {
  const container = await AstroContainer.create();
  container.addServerRenderer({ renderer: preactRenderer, name: '@astrojs/preact' });
  return container;
}

async function renderComponent(props: { responses: typeof responses }) {
  const container = await createContainer();
  return container.renderToString(ApiResponse, { props });
}

describe('ApiResponse (astro)', () => {
  it('renders nothing when responses is empty', async () => {
    const html = await renderComponent({ responses: [] });

    expect(html).not.toContain('api-response__heading');
    expect(html).not.toContain('role="tablist"');
  });

  it('renders the BEM root, heading, and an outer tab per status code', async () => {
    const html = await renderComponent({ responses });

    expect(html).toContain('api-response');
    expect(html).toMatch(/api-response__heading[^>]*>Response</);
    expect(html).toMatch(/data-tab-index="0"[^>]*>200</);
    expect(html).toMatch(/data-tab-index="1"[^>]*>404</);
  });

  it('renders a status-scoped panel wrapper for each response', async () => {
    const html = await renderComponent({ responses });

    expect(html).toContain('api-response__panel--200');
    expect(html).toContain('api-response__panel--404');
  });

  it('renders descriptions with the BEM description class', async () => {
    const html = await renderComponent({ responses });

    expect(html).toMatch(/api-response__description[^>]*>OK response</);
    expect(html).toMatch(/api-response__description[^>]*>Not found response</);
  });

  it('renders Model/Example inner tabs when a response has both schema and examples', async () => {
    const html = await renderComponent({ responses });

    expect(html).toMatch(/data-tab-index="0"[^>]*>Model</);
    expect(html).toMatch(/data-tab-index="1"[^>]*>Example</);
    expect(html).toContain('schema-table');
    expect(html).toContain('code-block');
    expect(html).toContain('api-response__example');
  });

  it('omits the Model/Example inner tabs when a response has neither schema nor examples', async () => {
    const html = await renderComponent({ responses: [responses[1]] });

    expect(html).toMatch(/data-tab-index="0"[^>]*>404</);
    expect(html).not.toMatch(/data-tab-index="[^"]+"[^>]*>Model</);
    expect(html).not.toMatch(/data-tab-index="[^"]+"[^>]*>Example</);
  });

  it('renders a schema table without inner tabs when a response has only a schema', async () => {
    const html = await renderComponent({
      responses: [{ statusCode: '200', schema: responses[0].schema }],
    });

    expect(html).toContain('schema-table');
    expect(html).not.toMatch(/data-tab-index="[^"]+"[^>]*>Model</);
  });

  it('renders code blocks without inner tabs when a response has only examples', async () => {
    const html = await renderComponent({
      responses: [{ statusCode: '200', examples: responses[0].examples }],
    });

    expect(html).toContain('code-block');
    expect(html).toContain('api-response__example');
    expect(html).not.toMatch(/data-tab-index="[^"]+"[^>]*>Model</);
  });

  it('interprets the description as HTML (allows markup passthrough)', async () => {
    const html = await renderComponent({
      responses: [{ statusCode: '200', description: 'Hello <em>world</em>' }],
    });

    expect(html).toContain('Hello <em>world</em>');
  });
});
