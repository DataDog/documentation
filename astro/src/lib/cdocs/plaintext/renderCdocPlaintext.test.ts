import { describe, it, expect } from 'vitest';
import { renderCdocPlaintext } from './renderCdocPlaintext';

// The cdocs plaintext renderer: parse the `.mdoc` body, evaluate `if`/`else`
// against the resolved filter variables (dropping non-matching branches, the
// same server-side dropping the HTML page uses), inline partials, then format
// the pruned AST back to Markdoc text. Custom tags (`alert`, fences) round-trip
// via the formatter, matching html-to-mdoc's output conventions.
const render = (
  body: string,
  variables: Record<string, string>,
  opts: Partial<Parameters<typeof renderCdocPlaintext>[0]> = {},
) => renderCdocPlaintext({ body, variables, ...opts });

describe('renderCdocPlaintext', () => {
  it('keeps only the matching if branch', () => {
    const body = [
      '{% if equals($prog_lang, "java") %}',
      'Java content',
      '{% /if %}',
      '{% if equals($prog_lang, "python") %}',
      'Python content',
      '{% /if %}',
    ].join('\n');
    const out = render(body, { prog_lang: 'java' });
    expect(out).toContain('Java content');
    expect(out).not.toContain('Python content');
  });

  it('evaluates includes() and not()', () => {
    const body = [
      '{% if includes($prog_lang, ["java", "go"]) %}',
      'JVM-ish',
      '{% /if %}',
      '{% if not(equals($prog_lang, "java")) %}',
      'Not java',
      '{% /if %}',
    ].join('\n');
    const out = render(body, { prog_lang: 'java' });
    expect(out).toContain('JVM-ish');
    expect(out).not.toContain('Not java');
  });

  it('evaluates nested conditionals', () => {
    const body = [
      '{% if equals($api_type, "otel_api") %}',
      '{% if equals($prog_lang, "java") %}',
      'otel java',
      '{% /if %}',
      '{% if equals($prog_lang, "python") %}',
      'otel python',
      '{% /if %}',
      '{% /if %}',
    ].join('\n');
    const out = render(body, { api_type: 'otel_api', prog_lang: 'python' });
    expect(out).toContain('otel python');
    expect(out).not.toContain('otel java');
    expect(render(body, { api_type: 'dd_api', prog_lang: 'python' })).not.toContain(
      'otel python',
    );
  });

  it('supports an else branch', () => {
    const body = [
      '{% if equals($prog_lang, "java") %}',
      'Java',
      '{% else /%}',
      'Other',
      '{% /if %}',
    ].join('\n');
    expect(render(body, { prog_lang: 'go' })).toContain('Other');
    expect(render(body, { prog_lang: 'go' })).not.toContain('Java');
    expect(render(body, { prog_lang: 'java' })).toContain('Java');
    expect(render(body, { prog_lang: 'java' })).not.toContain('Other');
  });

  it('inlines partials and evaluates conditionals inside them', () => {
    const body = '{% partial file="@partials/x.mdoc" /%}';
    const resolvePartial = (file: string) =>
      file === '@partials/x.mdoc'
        ? '{% if equals($prog_lang, "java") %}\nfrom partial java\n{% /if %}'
        : null;
    const out = render(body, { prog_lang: 'java' }, { resolvePartial });
    expect(out).toContain('from partial java');
    expect(render(body, { prog_lang: 'python' }, { resolvePartial })).not.toContain(
      'from partial java',
    );
  });

  it('drops a partial that cannot be resolved without throwing', () => {
    const body = '{% partial file="@partials/missing.mdoc" /%}\n\nAfter';
    const out = render(body, {}, { resolvePartial: () => null });
    expect(out).toContain('After');
  });

  it('preserves alert tags and standard markdown', () => {
    const body = [
      '## Heading',
      '',
      '{% alert level="danger" %}',
      'Be careful',
      '{% /alert %}',
      '',
      'A [link](/x) and **bold**.',
    ].join('\n');
    const out = render(body, {});
    expect(out).toContain('## Heading');
    expect(out).toContain('{% alert level="danger" %}');
    expect(out).toContain('Be careful');
    // Internal doc links are rewritten to their `.md` twin.
    expect(out).toContain('[link](/x.md)');
    expect(out).toContain('**bold**');
  });

  it('rewrites internal doc links to .md, leaving external links alone', () => {
    const body = [
      'See [the agent guide](/agent/guide/) for setup.',
      '',
      'See [the spec](https://example.com/spec) for details.',
    ].join('\n');
    const out = render(body, {});
    expect(out).toContain('[the agent guide](/agent/guide.md)');
    expect(out).toContain('[the spec](https://example.com/spec)');
  });

  it('strips HTML comments', () => {
    const body = 'Before\n\n<!-- an authoring note -->\n\nAfter';
    const out = render(body, {});
    expect(out).not.toContain('<!--');
    expect(out).not.toContain('authoring note');
    expect(out).toContain('Before');
    expect(out).toContain('After');
  });

  it('strips inline HTML comments mid-sentence', () => {
    const out = render('Some text <!-- hidden note --> and more.', {});
    expect(out).not.toContain('<!--');
    expect(out).not.toContain('hidden note');
    expect(out).toContain('Some text');
    expect(out).toContain('and more.');
  });

  it('strips multi-line HTML comments (spanning softbreaks)', () => {
    const body = ['Before', '', '<!-- these lines', 'are all', 'internal -->', '', 'After'].join(
      '\n',
    );
    const out = render(body, {});
    expect(out).not.toContain('<!--');
    expect(out).not.toContain('-->');
    expect(out).not.toContain('internal');
    expect(out).not.toContain('are all');
    expect(out).toContain('Before');
    expect(out).toContain('After');
  });

  it('does not strip <!-- --> inside a fenced code block', () => {
    const body = ['```html', '<!-- a real HTML example -->', '```'].join('\n');
    const out = render(body, {});
    expect(out).toContain('<!-- a real HTML example -->');
  });

  it('drops orphaned link reference definitions', () => {
    // In the real fixtures, definition lines are glued under an HTML comment
    // (no blank line), so markdown-it never treats them as definitions — they
    // survive as dead `[id]: url` text once filtering drops their usages.
    const body = [
      'Some intro text.',
      '',
      '<!-- internal marker -->',
      '[100]: /tracing/setup/java/',
      '[200]: /other/',
    ].join('\n');
    const out = render(body, {});
    expect(out).toContain('Some intro text.');
    expect(out).not.toContain('[100]:');
    expect(out).not.toContain('[200]:');
    expect(out).not.toContain('/tracing/setup/java/');
  });

  it('keeps a paragraph that only looks partly like a reference definition', () => {
    const out = render('Real prose with [a link](/x) inline.', {});
    expect(out).toContain('Real prose with [a link](/x.md) inline.');
  });

  it('strips explicit heading IDs ({% #id %}) from headings', () => {
    const body = ['## Standard logging {% #standard-logging-python %}', '', 'Body text.'].join(
      '\n',
    );
    const out = render(body, {});
    expect(out).toContain('## Standard logging');
    expect(out).not.toContain('#standard-logging-python');
    expect(out).not.toContain('{%');
    expect(out).toContain('Body text.');
  });

  it('strips text-form heading IDs ({#id}) from headings', () => {
    const out = render('## Standard logging {#standard-logging-python}', {});
    expect(out).toContain('## Standard logging');
    expect(out).not.toContain('{#standard-logging-python}');
  });

  it('numbers ordered lists sequentially even when authored as all 1.', () => {
    const body = ['1. First', '1. Second', '1. Third'].join('\n');
    const out = render(body, {});
    expect(out).toContain('1. First');
    expect(out).toContain('2. Second');
    expect(out).toContain('3. Third');
  });

  it('prepends the title as an H1', () => {
    const out = render('Body text', {}, { title: 'My Doc' });
    expect(out.startsWith('# My Doc\n')).toBe(true);
    expect(out).toContain('Body text');
  });
});
