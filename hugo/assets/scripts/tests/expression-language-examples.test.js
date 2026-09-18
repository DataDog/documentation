import fs from 'fs';
import path from 'path';
import ExpressionLanguageEvaluator from '../components/expression-language-evaluator';
import ExpressionLanguageParser from '../components/expression-language-parser';

const shortcode = fs.readFileSync(
  path.resolve(__dirname, '../../../layouts/shortcodes/expression-language-simulator.html'),
  'utf8'
);

describe('Published expression examples', () => {
  beforeEach(() => {
    document.body.innerHTML = shortcode;
    new ExpressionLanguageEvaluator();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test.each([
    ['i > 3', 1],
    ['i == mySequence[0]', 1],
    ['i < myMap["b"]', 2],
    ['', 5],
    ['i == 420', 0],
  ])('captures %s only on matching iterations', (condition, count) => {
    document.getElementById('condition-input').value = condition;
    document.getElementById('simulate-button').click();

    const messages = [...document.querySelectorAll('.log-message')];
    expect(messages).toHaveLength(count);
    for (const message of messages) {
      expect(message.textContent).toBe(document.querySelector('.template-input').textContent);
    }
  });

  test.each(['myString', 'mySequence', 'myMap'])('displays the fixture used for %s', (name) => {
    const parser = new ExpressionLanguageParser();
    const prefix = `${name} = `;
    const assignment = [...document.querySelectorAll('.code-line')]
      .map(line => line.textContent.trim())
      .find(line => line.startsWith(prefix));

    expect(JSON.parse(assignment.slice(prefix.length))).toEqual(parser.environment[name]);
  });
});
