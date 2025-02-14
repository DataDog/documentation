import MarkdocStaticCompiler from 'cdocs-markdoc';
import fs from 'fs';
import { describe, test, expect } from 'vitest';
import prettier from 'prettier';
import { SNAPSHOTS_DIR } from '../../../config/constants';
import { render } from '../../../../src/markdocCustomization/renderer';
import { mockHugoGlobalConfig } from '../../../config/mocks/valid/hugoConfig';

describe('rendering stages', () => {
  // retrieve test input file
  const inputPath = __dirname + '/input.mdoc.md';
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
  const html = render({
    node: renderableTree,
    markdocConfig: {
      variables: {
        test_string: 'Datadog',
        always_false: false,
        always_true: true
      }
    },
    hugoConfig: {
      global: mockHugoGlobalConfig,
      page: { path: '/path/to/page', lang: 'en' }
    }
  });

  // apply some styles to the HTML
  // to make "hidden" content visible but
  // in a different style than "shown" content
  const htmlWithStyles = `
  <style>
    .cdoc__hidden {
      background-color: dimgray;
      color: white;
    }

    code {
      color: deeppink;
    }

    .cdoc__hidden code {
      color: pink;
    }
  </style>
  ${html}
  `;

  // format the HTML with prettier
  const formattedHtml = prettier.format(htmlWithStyles, {
    parser: 'html'
  });

  test('ast', async () => {
    await expect(JSON.stringify(ast, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/helperModules/renderer/renderingStages/ast.snap.json`
    );
  });

  test('renderableTree', async () => {
    await expect(JSON.stringify(renderableTree, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/helperModules/renderer/renderingStages/renderableTree.snap.json`
    );
  });

  test('renderedHtml', async () => {
    await expect(formattedHtml).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/helperModules/renderer/renderingStages/renderedHtml.snap.html`
    );
  });
});
