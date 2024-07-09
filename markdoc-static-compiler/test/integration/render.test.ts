import MarkdocStaticCompiler from '../../dist';
import fs from 'fs';
import { describe, test, expect } from 'vitest';
import prettier from 'prettier';

describe('rendering stages', () => {
  // retrieve test input file
  const inputPath = __dirname + '/input.mdoc';
  const inputString = fs.readFileSync(inputPath, 'utf-8');

  // stage 1: build the AST
  const ast = MarkdocStaticCompiler.parse(inputString);

  // stage 2: build the renderable tree
  const renderableTree = MarkdocStaticCompiler.transform(ast, {
    variables: {
      test_string: 'Datadog',
      always_false: false,
      always_true: true
    }
  });

  // stage 3: render the HTML
  const html = MarkdocStaticCompiler.renderers.html(renderableTree, {
    variables: {
      test_string: 'Datadog',
      always_false: false,
      always_true: true
    }
  });

  // apply some styles to the HTML
  // to make "hidden" content visible but
  // in a different style than "shown" content
  const htmlWithStyles = `
  <style>
    .markdoc__hidden {
      background-color: dimgray;
      color: white;
    }

    code {
      color: deeppink;
    }

    .markdoc__hidden code {
      color: pink;
    }
  </style>
  ${html}
  `;

  // format the HTML with prettier
  const formattedHtml = prettier.format(htmlWithStyles, {
    parser: 'html',
    htmlWhitespaceSensitivity: 'ignore'
  });

  test('ast', () => {
    expect(JSON.stringify(ast, null, 2)).toMatchFileSnapshot('../__snapshots__/ast.snap.json');
  });

  test('renderableTree', () => {
    expect(JSON.stringify(renderableTree, null, 2)).toMatchFileSnapshot('../__snapshots__/renderableTree.snap.json');
  });

  test('renderedHtml', () => {
    expect(formattedHtml).toMatchFileSnapshot('../__snapshots__/renderedHtml.snap.html');
  });
});
