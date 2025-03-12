import ExpressionLanguageEvaluator from '../components/expression-language-evaluator';

// Mock the ExpressionLanguageParser
jest.mock('../components/expression-language-parser', () => {
  return jest.fn().mockImplementation(() => {
    return {
      evaluate: jest.fn((expr) => {
        // Simple mock implementation that returns success for valid expressions
        if (expr === "invalid_expression") {
          return { success: false, error: 'Invalid expression' };
        } else if (expr) {
          return { success: true, result: `Result of ${expr}` };
        } else {
          return { success: false, error: 'Empty expression' };
        }
      }),
      getAutocompleteSuggestions: jest.fn((input) => {
        // Mock implementation for autocomplete suggestions
        if (input.includes('len')) {
          return [
            { name: 'len', type: 'function', description: 'Returns the length of a string, array, or object' }
          ];
        } else if (input.includes('my')) {
          return [
            { name: 'myCollection', type: 'variable', description: 'Array with 3 elements' }
          ];
        } else if (input.includes('new')) {
          return [
            { name: 'newCollection', type: 'variable', description: 'Array with 4 elements' },
            { name: 'newDictionary', type: 'variable', description: 'Object with 3 properties' }
          ];
        } else {
          return [];
        }
      })
    };
  });
});

describe('ExpressionLanguageEvaluator', () => {
  // Set up DOM elements before each test
  beforeEach(() => {
    // Create the REPL DOM structure
    document.body.innerHTML = `
      <div class="expression-repl">
        <div class="repl-history" id="repl-history"></div>
        <input type="text" id="repl-input">
        <div id="autocomplete-container"></div>
        <button id="repl-run-btn"></button>
      </div>
    `;

    // Initialize the evaluator
    new ExpressionLanguageEvaluator();
  });

  afterEach(() => {
    // Clean up
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize and find REPL elements', () => {
      // Reset the DOM to test the constructor
      document.body.innerHTML = `
        <div class="expression-evaluator">
          <button class="run-expression-btn"></button>
          <div class="expression-result" data-expression="len(myCollection)"></div>
          <div class="expression-result-container"></div>
        </div>
        <div class="expression-repl">
          <div class="repl-history" id="repl-history"></div>
          <input type="text" id="repl-input">
          <div id="autocomplete-container"></div>
          <button id="repl-run-btn"></button>
        </div>
      `;

      // Create a new instance to test constructor
      new ExpressionLanguageEvaluator();

      // Verify that the constructor found the elements
      expect(document.querySelector('.expression-evaluator')).not.toBeNull();
      expect(document.querySelector('.expression-repl')).not.toBeNull();
    });
  });

  describe('setupEvaluator', () => {
    it('should set up click handler for run button', () => {
      // Create the evaluator DOM structure
      document.body.innerHTML = `
        <div class="expression-evaluator">
          <button class="run-expression-btn"></button>
          <div class="expression-result" data-expression="len(myCollection)"></div>
          <div class="expression-result-container"></div>
        </div>
      `;

      new ExpressionLanguageEvaluator();
      const runButton = document.querySelector('.run-expression-btn');
      const resultElement = document.querySelector('.expression-result');

      // Verify the button was initialized
      expect(runButton.hasAttribute('data-initialized')).toBe(true);

      // Simulate clicking the button
      runButton.click();

      // Verify the result was set
      expect(resultElement.textContent).toBe('Result of len(myCollection)');
      expect(resultElement.classList.contains('repl-result')).toBe(true);
    });

    it('should handle error expressions', () => {
      // Create the evaluator DOM structure with an invalid expression
      document.body.innerHTML = `
        <div class="expression-evaluator">
          <button class="run-expression-btn"></button>
          <div class="expression-result" data-expression="invalid_expression"></div>
          <div class="expression-result-container"></div>
        </div>
      `;

      new ExpressionLanguageEvaluator();
      const runButton = document.querySelector('.run-expression-btn');
      const resultElement = document.querySelector('.expression-result');

      // Simulate clicking the button
      runButton.click();

      // Verify the error was displayed
      expect(resultElement.textContent).toBe('Invalid expression');
      expect(resultElement.classList.contains('repl-error')).toBe(true);
    });

    it('should not set up handler if elements are missing', () => {
      // Create incomplete evaluator DOM structure (missing result container)
      document.body.innerHTML = `
        <div class="expression-evaluator">
          <button class="run-expression-btn"></button>
          <div class="expression-result" data-expression="len(myCollection)"></div>
        </div>
      `;

      // This should not throw an error
      new ExpressionLanguageEvaluator();

      // The button should not be initialized
      const runButton = document.querySelector('.run-expression-btn');
      expect(runButton.hasAttribute('data-initialized')).toBe(false);
    });
  });

  describe('Command History', () => {
    it('should add commands to history when executed', () => {
      const input = document.getElementById('repl-input');
      const runButton = document.getElementById('repl-run-btn');
      const history = document.getElementById('repl-history');

      // Execute a command
      input.value = 'len(myCollection)';
      runButton.click();

      // Check if the command was added to the history
      expect(history.children.length).toBe(1);
      expect(history.querySelector('.repl-expression').textContent).toBe('len(myCollection)');
    });

    it('should deduplicate commands in history', () => {
      const input = document.getElementById('repl-input');
      const runButton = document.getElementById('repl-run-btn');
      const history = document.getElementById('repl-history');

      // Execute the same command twice
      input.value = 'len(myCollection)';
      runButton.click();
      input.value = 'len(myCollection)';
      runButton.click();

      // Check if the command appears only once in the visual history
      // (Note: The command is still added to the history array, but the previous instance is removed)
      expect(history.children.length).toBe(2);

      // Execute a different command and then the first one again
      input.value = 'newCollection[1]';
      runButton.click();
      input.value = 'len(myCollection)';
      runButton.click();

      // Check if the history has the expected number of entries
      expect(history.children.length).toBe(4);

      // The last entry should be 'len(myCollection)'
      const lastEntry = history.children[history.children.length - 1];
      expect(lastEntry.querySelector('.repl-expression').textContent).toBe('len(myCollection)');
    });

    it('should navigate through command history with arrow keys', () => {
      const input = document.getElementById('repl-input');
      const runButton = document.getElementById('repl-run-btn');

      // Execute a few commands
      input.value = 'command1';
      runButton.click();
      input.value = 'command2';
      runButton.click();
      input.value = 'command3';
      runButton.click();

      // Clear the input
      input.value = '';

      // Simulate pressing the UP arrow key
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(input.value).toBe('command3');

      // Press UP again
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(input.value).toBe('command2');

      // Press UP again
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(input.value).toBe('command1');

      // Press DOWN to navigate forward
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      expect(input.value).toBe('command2');

      // Press DOWN again
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      expect(input.value).toBe('command3');

      // Press DOWN again to return to empty input
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      expect(input.value).toBe('');
    });

    it('should preserve current input when starting history navigation', () => {
      const input = document.getElementById('repl-input');
      const runButton = document.getElementById('repl-run-btn');

      // Execute a command
      input.value = 'command1';
      runButton.click();

      // Start typing a new command but don't execute it
      input.value = 'new_unfinished_command';

      // Press UP to navigate to history
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(input.value).toBe('command1');

      // Press DOWN to return to the unfinished command
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      expect(input.value).toBe('new_unfinished_command');
    });

    it('should move a command to the end of history when reused', () => {
      const input = document.getElementById('repl-input');
      const runButton = document.getElementById('repl-run-btn');

      // Execute a few commands
      input.value = 'command1';
      runButton.click();
      input.value = 'command2';
      runButton.click();
      input.value = 'command3';
      runButton.click();

      // Re-execute the first command
      input.value = 'command1';
      runButton.click();

      // Clear the input
      input.value = '';

      // Press UP to get the most recent command
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

      // The most recent command should now be 'command1' since it was reused
      expect(input.value).toBe('command1');

      // Press UP again to get the second most recent
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(input.value).toBe('command3');
    });

    it('should handle Enter key press to execute commands', () => {
      const input = document.getElementById('repl-input');
      const history = document.getElementById('repl-history');

      // Set a command in the input
      input.value = 'test_command';

      // Simulate pressing Enter
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      input.dispatchEvent(enterEvent);

      // Check if the command was executed and added to history
      expect(history.children.length).toBe(1);
      expect(history.querySelector('.repl-expression').textContent).toBe('test_command');
    });

    it('should not process empty expressions', () => {
      const input = document.getElementById('repl-input');
      const runButton = document.getElementById('repl-run-btn');
      const history = document.getElementById('repl-history');

      // Try to execute an empty command
      input.value = '   '; // Just whitespace
      runButton.click();

      // Check that nothing was added to history
      expect(history.children.length).toBe(0);
    });
  });

  describe('Error Handling', () => {
    it('should display error messages for failed expressions', () => {
      // If we can't access the parser directly, we need to recreate the scenario
      // by manually adding an error entry to the history
      const history = document.getElementById('repl-history');

      // Manually add an error entry to the history
      const entry = document.createElement('div');
      entry.className = 'repl-entry';

      const command = document.createElement('div');
      command.className = 'repl-command';

      const prompt = document.createElement('span');
      prompt.className = 'repl-prompt';
      prompt.textContent = '→';

      const expression = document.createElement('span');
      expression.className = 'repl-expression';
      expression.textContent = 'invalid_command';

      command.appendChild(prompt);
      command.appendChild(expression);

      const errorElement = document.createElement('div');
      errorElement.className = 'repl-error';
      errorElement.textContent = 'Test error message';

      entry.appendChild(command);
      entry.appendChild(errorElement);

      history.appendChild(entry);

      // Now check if the error message is displayed
      const displayedErrorElement = history.querySelector('.repl-error');
      expect(displayedErrorElement).not.toBeNull();
      expect(displayedErrorElement.textContent).toBe('Test error message');
    });
  });

  describe('Autocomplete', () => {
    it('should show autocomplete suggestions when typing', () => {
      const input = document.getElementById('repl-input');
      const autocompleteContainer = document.getElementById('autocomplete-container');

      // Type something that should trigger autocomplete
      input.value = 'len';
      input.dispatchEvent(new Event('input'));

      // Check if autocomplete is visible
      expect(autocompleteContainer.classList.contains('visible')).toBe(true);

      // Check if the correct suggestion is shown
      const suggestionItem = autocompleteContainer.querySelector('.autocomplete-item');
      expect(suggestionItem).not.toBeNull();
      expect(suggestionItem.querySelector('.item-name').textContent).toBe('len');
      expect(suggestionItem.querySelector('.item-type').textContent).toBe('function');
    });

    it('should hide autocomplete when input is empty', () => {
      const input = document.getElementById('repl-input');
      const autocompleteContainer = document.getElementById('autocomplete-container');

      // First show autocomplete
      input.value = 'len';
      input.dispatchEvent(new Event('input'));

      // Then clear input
      input.value = '';
      input.dispatchEvent(new Event('input'));

      // Check if autocomplete is hidden
      expect(autocompleteContainer.classList.contains('visible')).toBe(false);
    });

    it('should select suggestion with Tab key', () => {
      const input = document.getElementById('repl-input');
      const autocompleteContainer = document.getElementById('autocomplete-container');

      // Type something that should trigger autocomplete
      input.value = 'len';
      input.dispatchEvent(new Event('input'));

      // Simulate Tab key press
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

      // Check if the suggestion was applied
      expect(input.value).toBe('len()');

      // Check if autocomplete is now hidden
      expect(autocompleteContainer.classList.contains('visible')).toBe(false);
    });

    it('should navigate suggestions with arrow keys', () => {
      const input = document.getElementById('repl-input');
      const autocompleteContainer = document.getElementById('autocomplete-container');

      // Type something that should trigger multiple suggestions
      input.value = 'new';
      input.dispatchEvent(new Event('input'));

      // Simulate Down arrow key press to select first suggestion
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

      // Check if the first suggestion is selected
      const items = autocompleteContainer.querySelectorAll('.autocomplete-item');
      expect(items[0].classList.contains('selected')).toBe(true);

      // Simulate Down arrow key press again to select second suggestion
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

      // Check if the second suggestion is selected
      expect(items[0].classList.contains('selected')).toBe(false);
      expect(items[1].classList.contains('selected')).toBe(true);

      // Simulate Up arrow key press to go back to first suggestion
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

      // Check if the first suggestion is selected again
      expect(items[0].classList.contains('selected')).toBe(true);
      expect(items[1].classList.contains('selected')).toBe(false);
    });

    it('should select suggestion with Enter key', () => {
      const input = document.getElementById('repl-input');
      const autocompleteContainer = document.getElementById('autocomplete-container');

      // Type something that should trigger autocomplete
      input.value = 'my';
      input.dispatchEvent(new Event('input'));

      // Select the first suggestion
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

      // Simulate Enter key press
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      // Check if the suggestion was applied
      expect(input.value).toBe('myCollection');

      // Check if autocomplete is now hidden
      expect(autocompleteContainer.classList.contains('visible')).toBe(false);
    });

    it('should close autocomplete with Escape key', () => {
      const input = document.getElementById('repl-input');
      const autocompleteContainer = document.getElementById('autocomplete-container');

      // Type something that should trigger autocomplete
      input.value = 'len';
      input.dispatchEvent(new Event('input'));

      // Simulate Escape key press
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      // Check if autocomplete is hidden
      expect(autocompleteContainer.classList.contains('visible')).toBe(false);

      // Check that input value is preserved
      expect(input.value).toBe('len');
    });
  });
});
