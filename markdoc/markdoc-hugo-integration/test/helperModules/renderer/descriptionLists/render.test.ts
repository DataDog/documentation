import MarkdocStaticCompiler from 'markdoc-static-compiler';
import fs from 'fs';
import { describe, test, expect } from 'vitest';
import prettier from 'prettier';
import { SNAPSHOTS_DIR } from '../../../config/constants';
import { render } from '../../../../src/helperModules/renderer';
import { mockHugoGlobalConfig } from '../../../mocks/valid/hugoConfig';

describe('description lists', () => {
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
      page: { lang: 'en', path: '/path/to/page' }
    }
  });

  // format the HTML with prettier
  const formattedHtml = prettier.format(html, {
    parser: 'html'
  });

  test('ast', async () => {
    await expect(JSON.stringify(ast, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/helperModules/renderer/descriptionLists/ast.snap.json`
    );
  });

  test('renderableTree', async () => {
    await expect(JSON.stringify(renderableTree, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/helperModules/renderer/descriptionLists/renderableTree.snap.json`
    );
  });

  test('renderedHtml', async () => {
    await expect(formattedHtml).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/helperModules/renderer/descriptionLists/renderedHtml.snap.html`
    );
  });
});
