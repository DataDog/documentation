import Barkdoc from '../../dist';
import fs from 'fs';
import { describe, test, expect } from 'vitest';

describe('rendering stages', () => {
  // retrieve test input file
  const inputPath = __dirname + '/input.mdoc';
  const inputString = fs.readFileSync(inputPath, 'utf-8');

  // stage 1: build the AST
  const ast = Barkdoc.parse(inputString);

  // stage 2: build the renderable tree
  const renderableTree = Barkdoc.transform(ast, {
    variables: {
      state: 'California',
      alwaysFalse: false,
      alwaysTrue: true
    }
  });

  // stage 3: render the HTML
  const html = Barkdoc.renderers.html(renderableTree, {
    variables: {
      state: 'Illinois',
      alwaysFalse: false,
      alwaysTrue: true
    }
  });

  // apply some styles to the HTML
  // to make "hidden" content visible but
  // in a different style than "shown" content
  const htmlWithStyles = `
  <style>
    .barkdoc__hidden {
      background-color: dimgray;
      color: white;
    }

    code {
      color: deeppink;
    }

    .barkdoc__hidden code {
      color: pink;
    }
  </style>
  ${html}
  `;

  test('ast', () => {
    expect(JSON.stringify(ast, null, 2)).toMatchFileSnapshot('../__snapshots__/ast.snap.json');
  });

  test('renderableTree', () => {
    expect(JSON.stringify(renderableTree, null, 2)).toMatchFileSnapshot('../__snapshots__/renderableTree.snap.json');
  });

  test('renderedHtml', () => {
    expect(htmlWithStyles).toMatchFileSnapshot('../__snapshots__/renderedHtml.snap.html');
  });
});
