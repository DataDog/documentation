import MarkdocStaticCompiler, { Tag, Config, CustomHtmlComponent } from '../../dist';
import fs from 'fs';
import { describe, test, expect } from 'vitest';
import prettier from 'prettier';

const alert = {
  render: 'Alert',
  children: ['paragraph'],
  attributes: {
    level: {
      type: String,
      default: 'info',
      matches: ['info', 'warning']
    }
  }
};

class Alert extends CustomHtmlComponent {
  level = 'info';

  constructor(
    tag: Tag,
    config?: Config,
    components?: Record<string, CustomHtmlComponent>
  ) {
    super(tag, config, components);
    this.level = tag.attributes.level || 'info';
  }

  render() {
    return `<div class="alert ${this.level}">${this.contents}</div>`;
  }
}

describe('custom components', () => {
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
    },
    tags: {
      alert
    }
  });

  // stage 3: render the HTML
  const html = MarkdocStaticCompiler.renderers.html(
    renderableTree,
    {
      variables: {
        test_string: 'Datadog',
        always_false: false,
        always_true: true
      },
      tags: {
        alert
      }
    },
    {
      Alert
    }
  );

  // apply some styles to the HTML
  // to make "hidden" content visible but
  // in a different style than "shown" content
  const htmlWithStyles = `
  <style>
    .mdoc__hidden {
      background-color: dimgray;
      color: white;
    }

    code {
      color: deeppink;
    }

    .mdoc__hidden code {
      color: pink;
    }

    div.info {
      border: 1px solid blue;
    }

    div.warning {
      border: 1px solid red;
    }
  </style>
  ${html}
  `;

  // format the HTML with prettier
  const formattedHtml = prettier.format(htmlWithStyles, {
    parser: 'html'
  });

  test('ast', () => {
    expect(JSON.stringify(ast, null, 2)).toMatchFileSnapshot(
      '../__snapshots__/customComponents/ast.snap.json'
    );
  });

  test('renderableTree', () => {
    expect(JSON.stringify(renderableTree, null, 2)).toMatchFileSnapshot(
      '../__snapshots__/customComponents/renderableTree.snap.json'
    );
  });

  test('renderedHtml', () => {
    expect(formattedHtml).toMatchFileSnapshot(
      '../__snapshots__/customComponents/renderedHtml.snap.html'
    );
  });
});
