import CdocsMarkdoc from '../dist';
import { describe, test, expect } from 'vitest';

const inputString = `
{% if equals($test_string, "Datadog") %}
The test string is Datadog.
{% else equals($test_string, "Bits") /%}
The test string is Bits.
{% else /%}
The test string is not Datadog or Bits.
{% /if %}
`;

describe('Conditional tags', () => {
  // Build the AST
  const ast = CdocsMarkdoc.parse(inputString);

  // Build the renderable tree
  const renderableTree = CdocsMarkdoc.transform(ast, {
    variables: {
      test_string: 'Datadog',
      always_false: false,
      always_true: true
    }
  });

  test('the AST matches the snapshot', () => {
    expect(JSON.stringify(ast, null, 2)).toMatchFileSnapshot(
      './__snapshots__/conditions/ast.snap.json'
    );
  });

  test('the RenderableTree matches the snapshot', () => {
    expect(JSON.stringify(renderableTree, null, 2)).toMatchFileSnapshot(
      './__snapshots__/conditions/renderableTree.snap.json'
    );
  });
});
