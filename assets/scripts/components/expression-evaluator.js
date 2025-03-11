// Expression Evaluator Component
// This component allows users to run and see the results of expression language examples

class ExpressionEvaluator {
  constructor() {
    document.querySelectorAll('.expression-evaluator').forEach(evaluator => this.setupEvaluator(evaluator));
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
}

export default ExpressionEvaluator;
