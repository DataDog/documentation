import ExpressionLanguageParser from './expression-language-parser';

class ExpressionLanguageEvaluator {
  constructor() {
    // Find all expression evaluators on the page
    const evaluators = document.querySelectorAll('.expression-evaluator');
    evaluators.forEach(evaluator => this.setupEvaluator(evaluator));

    // Find and set up the REPL if it exists
    const repl = document.querySelector('.expression-repl');
    if (repl) this.setupRepl(repl);
  }

  setupEvaluator(evaluator) {
    const runButton = evaluator.querySelector('.run-expression-btn');
    const resultElement = evaluator.querySelector('.expression-result');
    const resultContainer = evaluator.querySelector('.expression-result-container');

    if (!runButton || !resultElement || !resultContainer) return;

    const result = resultElement.getAttribute('data-result');

    // Only set up the click handler if it hasn't been set up already
    if (!runButton.hasAttribute('data-initialized')) {
      runButton.setAttribute('data-initialized', 'true');

      runButton.addEventListener('click', () => {
        // Set the result text
        resultElement.textContent = result;

        // Force a repaint to ensure styles are applied correctly
        void resultContainer.offsetWidth;
      });
    }
  }

  setupRepl(repl) {
    const input = repl.querySelector('#repl-input');
    const runButton = repl.querySelector('#repl-run-btn');
    const history = repl.querySelector('#repl-history');

    if (!input || !runButton || !history) return;

    // Create a new instance of the expression language parser
    const parser = new ExpressionLanguageParser();

    // Function to add an entry to the history
    const addToHistory = (expr, result, isError = false) => {
      const entry = document.createElement('div');
      entry.className = 'repl-entry';

      const command = document.createElement('div');
      command.className = 'repl-command';

      const prompt = document.createElement('span');
      prompt.className = 'repl-prompt';
      prompt.textContent = '→';

      const expression = document.createElement('span');
      expression.className = 'repl-expression';
      expression.textContent = expr;

      command.appendChild(prompt);
      command.appendChild(expression);

      const resultElement = document.createElement('div');
      resultElement.className = isError ? 'repl-error' : 'repl-result';
      resultElement.textContent = result;

      entry.appendChild(command);
      entry.appendChild(resultElement);

      history.appendChild(entry);

      // Scroll to the bottom
      history.scrollTop = history.scrollHeight;
    };

    // Handle the run button click
    runButton.addEventListener('click', () => {
      const expr = input.value.trim();
      if (!expr) return; // Don't process empty expressions

      const evaluation = parser.evaluate(expr);

      if (evaluation.success) {
        addToHistory(expr, evaluation.result);
      } else {
        addToHistory(expr, evaluation.error, true);
      }

      // Clear the input
      input.value = '';
      input.focus();
    });

    // Handle Enter key in the input
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        runButton.click();
        e.preventDefault();
      }
    });

    // Scroll to the bottom of history on load
    history.scrollTop = history.scrollHeight;

    // Focus the input on load
    input.focus();
  }
}

export default ExpressionLanguageEvaluator;
