import CdocsMarkdoc from '../../dist';
import fs from 'fs';
import { describe, test, expect } from 'vitest';

describe('Static elements', () => {
  const inputPath = __dirname + '/input.mdoc';
  const inputString = fs.readFileSync(inputPath, 'utf-8');

  const ast = CdocsMarkdoc.parse(inputString);
  const renderableTree = CdocsMarkdoc.transform(ast);

  test('the AST matches the snapshot', () => {
    expect(JSON.stringify(ast, null, 2)).toMatchFileSnapshot(
      '../__snapshots__/staticElements/ast.snap.json'
    );
  });

  test('the RenderableTree matches the snapshot', () => {
    expect(JSON.stringify(renderableTree, null, 2)).toMatchFileSnapshot(
      '../__snapshots__/staticElements/renderableTree.snap.json'
    );
  });
});
