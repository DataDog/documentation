/**
 * Integration tests for `renderCategoryMd`, including a Markdoc round-trip
 * parse to verify that the output is parseable Markdoc (no error nodes).
 *
 * This is the "parseable Markdoc" contract that downstream AI agents rely on:
 * tabs, alerts, and fenced code blocks must all parse cleanly.
 */

import { describe, it, expect } from 'vitest';
import Markdoc from '@markdoc/markdoc';
import { renderCategoryMd } from './renderCategoryMd';
import { getCategoryBySlug, getApiCategories } from './index';
import { getEndpointsForCategory } from './endpoints';
import type { ApiCategory } from './index';
import type { EndpointData } from './endpoints';

function pickRealCategory(): { category: ApiCategory; endpoints: EndpointData[] } {
  // Prefer action-connection (the example used in the plan) but fall back to
  // any category with at least one endpoint to keep the test robust.
  const preferredSlugs = ['action-connection', 'authentication', 'metrics'];
  for (const slug of preferredSlugs) {
    const cat = getCategoryBySlug(slug);
    if (cat) {
      const eps = getEndpointsForCategory(slug);
      if (eps.length > 0) return { category: cat, endpoints: eps };
    }
  }
  for (const cat of getApiCategories()) {
    const eps = getEndpointsForCategory(cat.slug);
    if (eps.length > 0) return { category: cat, endpoints: eps };
  }
  throw new Error('No category with endpoints found in the spec');
}

describe('renderCategoryMd', () => {
  it('emits a level-1 heading with the category name and an HR before each endpoint', () => {
    const md = renderCategoryMd(
      { name: 'Test', slug: 'test', description: '', operations: [], deprecated: false },
      [
        {
          operationId: 'foo',
          summary: 'Foo',
          slug: 'foo',
          method: 'GET',
          path: '/foo',
          description: '',
          version: 'v2',
          deprecated: false,
          unstable: false,
          responses: [],
          codeExamples: [],
        },
      ],
    );

    expect(md).toMatch(/^# Test/);
    expect(md).toContain('---');
    expect(md).toContain('## Foo (v2 — latest)');
    expect(md.endsWith('\n')).toBe(true);
  });

  it('renders a real category from the spec without throwing', () => {
    const { category, endpoints } = pickRealCategory();
    const md = renderCategoryMd(category, endpoints);
    expect(md.length).toBeGreaterThan(0);
    expect(md).toContain(`# ${category.name}`);
  });

  it('produces parseable Markdoc (no error nodes) for a real category', () => {
    const { category, endpoints } = pickRealCategory();
    const md = renderCategoryMd(category, endpoints);

    const ast = Markdoc.parse(md);
    const errors = Markdoc.validate(ast, {
      tags: {
        tabs: { attributes: {} },
        tab: { attributes: { label: { type: String } } },
        alert: { attributes: { level: { type: String } } },
      },
    });

    const fatal = errors.filter((e) => e.error.level === 'critical' || e.error.level === 'error');
    if (fatal.length > 0) {
      console.error('Markdoc errors:', JSON.stringify(fatal.slice(0, 5), null, 2));
    }
    expect(fatal).toEqual([]);
  });
});
