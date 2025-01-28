import CdocsMarkdoc from '../dist';
import fs from 'fs';
import { describe, test, expect } from 'vitest';

describe('rendering stages', () => {
  // retrieve test input file
  const inputPath = __dirname + '/input.mdoc';
  const inputString = fs.readFileSync(inputPath, 'utf-8');

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
      './__snapshots__/ast.snap.json'
    );
  });

  test('the RenderableTree matches the snapshot', () => {
    expect(JSON.stringify(renderableTree, null, 2)).toMatchFileSnapshot(
      './__snapshots__/renderableTree.snap.json'
    );
  });

  test('the RenderableTree correctly hides and displays content', () => {
    const displayStatus: {
      displayAttributeVal: null | true | false;
      setAtLevel: number;
    } = {
      displayAttributeVal: null,
      setAtLevel: 0
    };

    function traverseAndLog(node: any, level: number = 0) {
      if (typeof node === 'string') {
        // Any text starting with "SHOWN" should within content that is marked as displayed
        if (node.startsWith('SHOWN')) {
          expect(displayStatus.displayAttributeVal).toBe(true);
          expect(displayStatus.setAtLevel).toBeLessThan(level);
          // Any text starting with "HIDDEN" should be within content that is marked as hidden
        } else if (node.startsWith('HIDDEN')) {
          expect(displayStatus.setAtLevel).toBeLessThan(level);
        }
        // Recursively traverse the tree to find the next display attribute,
        // and update the display status accordingly
      } else if (Array.isArray(node)) {
        node.forEach((child) => traverseAndLog(child, level + 1));
      } else if (typeof node === 'object' && node !== null) {
        if (node.attributes && 'display' in node.attributes) {
          if (node.attributes.display === 'true') {
            displayStatus.displayAttributeVal = true;
            displayStatus.setAtLevel = level;
          } else if (node.attributes.display === 'false') {
            displayStatus.displayAttributeVal = false;
            displayStatus.setAtLevel = level;
          } else {
            throw new Error(`Invalid display value: ${node.attributes.display}`);
          }
        }
        if (node.children) {
          traverseAndLog(node.children, level + 1);
        }
      }
    }

    traverseAndLog(renderableTree);
  });
});
