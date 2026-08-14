import { describe, it, expect } from 'vitest';
import { format } from '@markdoc/markdoc';
import { documentNode } from '@lib/plaintext/helpers';
import { apiCodeExampleNode } from '../ApiCodeExample';
import type { CodeExampleSet } from '@lib/api/schemas/codeExamples';

const examples: CodeExampleSet[] = [
  {
    language: 'curl',
    label: 'Curl',
    entries: [
      {
        description: 'Get a thing',
        code: 'curl -X GET "https://api.datadoghq.com/api/v2/things/1"',
        syntax: 'bash',
      },
    ],
  },
  {
    language: 'python',
    label: 'Python',
    entries: [
      {
        description: 'Get a thing',
        code: 'from datadog_api_client import ApiClient\nApiClient().get_thing("1")',
        syntax: 'python',
      },
    ],
  },
];

function render(sets: CodeExampleSet[]): string {
  const node = apiCodeExampleNode(sets);
  if (node === null) {
    return '';
  }
  return format(documentNode([node]));
}

describe('apiCodeExampleNode', () => {
  it('returns null for an empty list', () => {
    expect(apiCodeExampleNode([])).toBeNull();
  });

  it('emits one tab per language with a fenced code block', () => {
    const out = render(examples);
    expect(out).toContain('{% tabs %}');
    expect(out).toContain('label="Curl"');
    expect(out).toContain('label="Python"');
    expect(out).toContain('```bash');
    expect(out).toContain('curl -X GET');
    expect(out).toContain('```python');
    expect(out).toContain('from datadog_api_client');
    expect(out).toContain('{% /tabs %}');
  });

  it('omits per-entry headings when there is only one entry per language', () => {
    const out = render(examples);
    expect(out).not.toContain('**Get a thing**');
  });

  it('includes per-entry headings when there are multiple entries per language', () => {
    const multiEntry: CodeExampleSet[] = [
      {
        language: 'curl',
        label: 'Curl',
        entries: [
          { description: 'Basic', code: 'curl -X GET ...', syntax: 'bash' },
          { description: 'With auth', code: 'curl -H "DD-API-KEY: ..." -X GET ...', syntax: 'bash' },
        ],
      },
    ];
    const out = render(multiEntry);
    expect(out).toContain('**Basic**');
    expect(out).toContain('**With auth**');
  });

  it('builds a tabs tag node', () => {
    const node = apiCodeExampleNode(examples);
    expect(node?.type).toBe('tag');
    expect(node?.tag).toBe('tabs');
    expect(node?.children).toHaveLength(2);
    expect(node?.children[0].tag).toBe('tab');
    expect(node?.children[0].attributes.label).toBe('Curl');
  });
});
