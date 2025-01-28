import CdocsMarkdoc from '../dist';
import fs from 'fs';
import { describe, test, expect } from 'vitest';

describe('rendering stages', () => {
  // retrieve test input file
  const inputPath = __dirname + '/input.mdoc';
  const inputString = fs.readFileSync(inputPath, 'utf-8');

  // stage 1: build the AST
  const ast = CdocsMarkdoc.parse(inputString);

  // stage 2: build the renderable tree
  const renderableTree = CdocsMarkdoc.transform(ast, {
    variables: {
      test_string: 'Datadog',
      always_false: false,
      always_true: true
    }
  });

  test('the AST matches the snapshot', () => {
    expect(JSON.stringify(ast, null, 2)).toMatchFileSnapshot(
      './__snapshots__/renderingStages/ast.snap.json'
    );
  });

  test('the RenderableTree matches the snapshot', () => {
    expect(JSON.stringify(renderableTree, null, 2)).toMatchFileSnapshot(
      './__snapshots__/renderingStages/renderableTree.snap.json'
    );
  });

  test('the RenderableTree correctly hides and displays content', () => {
    let lastDisplayValue: boolean | null = null;

    function traverseAndLog(node: any) {
      // Any text starting with "NO: " should be marked as hidden
      // Any text starting with "YES: " should be marked as displayed
      if (typeof node === 'string') {
        if (node.startsWith('YES: ')) {
          expect(lastDisplayValue).toBe(true);
        } else if (node.startsWith('NO: ')) {
          expect(lastDisplayValue).toBe(false);
        }
        // Recursively traverse the tree to find the next display attribute
      } else if (Array.isArray(node)) {
        node.forEach((child) => traverseAndLog(child));
      } else if (typeof node === 'object' && node !== null) {
        if (node.attributes && 'display' in node.attributes) {
          if (node.attributes.display === 'true') {
            lastDisplayValue = true;
          } else if (node.attributes.display === 'false') {
            lastDisplayValue = false;
          } else {
            throw new Error(`Invalid display value: ${node.attributes.display}`);
          }
        }
        if (node.children) {
          traverseAndLog(node.children);
        }
      }
    }

    traverseAndLog(renderableTree);
  });
});
