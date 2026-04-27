import { describe, it, expect } from 'vitest';
import { renderApiCodeExampleMd } from './ApiCodeExample.md';
import type { CodeExampleSet } from '../../../data/api/examples';

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

describe('renderApiCodeExampleMd', () => {
  it('returns empty string for an empty list', () => {
    expect(renderApiCodeExampleMd([])).toBe('');
  });

  it('emits one tab per language with a fenced code block', () => {
    const out = renderApiCodeExampleMd(examples);
    expect(out.startsWith('{% tabs %}')).toBe(true);
    expect(out).toContain('{% tab label="Curl" %}');
    expect(out).toContain('{% tab label="Python" %}');
    expect(out).toContain('```bash\ncurl -X GET');
    expect(out).toContain('```python\nfrom datadog_api_client');
    expect(out.endsWith('{% /tabs %}')).toBe(true);
  });

  it('omits per-entry headings when there is only one entry per language', () => {
    const out = renderApiCodeExampleMd(examples);
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
    const out = renderApiCodeExampleMd(multiEntry);
    expect(out).toContain('**Basic**');
    expect(out).toContain('**With auth**');
  });
});
