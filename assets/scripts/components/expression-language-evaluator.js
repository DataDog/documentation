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

    // Get the expression from the data attribute
    const expression = resultElement.getAttribute('data-expression');

    // Create a parser instance
    const parser = new ExpressionLanguageParser();

    // Only set up the click handler if it hasn't been set up already
    if (!runButton.hasAttribute('data-initialized')) {
      runButton.setAttribute('data-initialized', 'true');

      runButton.addEventListener('click', () => {
        // Evaluate the expression using the parser
        const evaluation = parser.evaluate(expression);

        // Set the result text based on the evaluation
        if (evaluation.success) {
          resultElement.textContent = evaluation.result;
          resultElement.classList.remove('repl-error');
          resultElement.classList.add('repl-result');
        } else {
          resultElement.textContent = evaluation.error;
          resultElement.classList.remove('repl-result');
          resultElement.classList.add('repl-error');
        }

        // Force a repaint to ensure styles are applied correctly
        void resultContainer.offsetWidth;
      });
    }
  }

  setupRepl(repl) {
    const input = repl.querySelector('#repl-input');
    const runButton = repl.querySelector('#repl-run-btn');
    const history = repl.querySelector('#repl-history');
    const autocompleteContainer = repl.querySelector('#autocomplete-container');

    if (!input || !runButton || !history || !autocompleteContainer) return;

    // Create a new instance of the expression language parser
    const parser = new ExpressionLanguageParser();

    // Command history management
    const commandHistory = [];
    let historyIndex = -1;
    let currentInput = '';

    // Autocomplete state
    let selectedSuggestionIndex = -1;
    let suggestions = [];
    let isAutocompleteVisible = false;

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

    // Function to show autocomplete suggestions
    const showAutocompleteSuggestions = () => {
      // Get the current word at the cursor position
      const cursorPosition = input.selectionStart;
      const textBeforeCursor = input.value.substring(0, cursorPosition);

      // Find the current word being typed at the cursor position
      const lastWordMatch = textBeforeCursor.match(/[a-zA-Z0-9_@]*$/);
      const currentWord = lastWordMatch ? lastWordMatch[0] : '';

      // Don't show suggestions if there's no word at the cursor position
      if (!currentWord) {
        hideAutocompleteSuggestions();
        return;
      }

      // Get suggestions from parser based on the current word only
      suggestions = parser.getAutocompleteSuggestions(currentWord);

      // Don't show autocomplete if there are no suggestions
      if (suggestions.length === 0) {
        hideAutocompleteSuggestions();
        return;
      }

      // Clear previous suggestions
      autocompleteContainer.innerHTML = '';

      // Create suggestion elements
      suggestions.forEach((suggestion, index) => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        item.dataset.index = index;

        const name = document.createElement('span');
        name.className = 'item-name';
        name.textContent = suggestion.name;

        const type = document.createElement('span');
        type.className = 'item-type';
        type.textContent = suggestion.type;
        type.dataset.type = suggestion.type;

        const description = document.createElement('span');
        description.className = 'item-description';
        description.textContent = suggestion.description;

        item.appendChild(name);
        item.appendChild(type);
        item.appendChild(description);

        // Add click handler to select suggestion
        item.addEventListener('click', () => {
          selectSuggestion(index);
        });

        autocompleteContainer.appendChild(item);
      });

      // Show the autocomplete container
      autocompleteContainer.classList.add('visible');
      isAutocompleteVisible = true;
      selectedSuggestionIndex = -1;

      // Ensure no items are initially selected
      const items = autocompleteContainer.querySelectorAll('.autocomplete-item.selected');
      items.forEach(item => {
        item.classList.remove('selected');
      });

      // Adjust position to ensure it's visible (only in browser environment)
      try {
        // Check if we're in a browser environment with proper DOM support
        if (typeof window !== 'undefined' && window.innerHeight &&
            autocompleteContainer.getBoundingClientRect &&
            typeof autocompleteContainer.getBoundingClientRect === 'function') {

          const containerRect = autocompleteContainer.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          if (containerRect.bottom > viewportHeight) {
            // Position above the input if it would go below viewport
            autocompleteContainer.style.top = 'auto';
            autocompleteContainer.style.bottom = '100%';
            autocompleteContainer.style.maxHeight = `${Math.min(200, containerRect.top - 10)}px`;
          } else {
            // Reset to default position below input
            autocompleteContainer.style.top = '100%';
            autocompleteContainer.style.bottom = 'auto';
            autocompleteContainer.style.maxHeight = '200px';
          }
        }
      } catch (e) {
        // Fallback for test environment
        autocompleteContainer.style.top = '100%';
        autocompleteContainer.style.bottom = 'auto';
        autocompleteContainer.style.maxHeight = '200px';
      }
    };

    // Function to hide autocomplete suggestions
    const hideAutocompleteSuggestions = () => {
      autocompleteContainer.classList.remove('visible');
      isAutocompleteVisible = false;
      selectedSuggestionIndex = -1;

      // Clear all selected items to prevent visual selection state from persisting
      const items = autocompleteContainer.querySelectorAll('.autocomplete-item.selected');
      items.forEach(item => {
        item.classList.remove('selected');
      });
    };

    // Function to navigate through suggestions
    const navigateSuggestions = (direction) => {
      if (!isAutocompleteVisible || suggestions.length === 0) return;

      // Remove selection from current item
      const items = autocompleteContainer.querySelectorAll('.autocomplete-item');
      if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < items.length) {
        items[selectedSuggestionIndex].classList.remove('selected');
      }

      // Update selected index
      if (direction === 'down') {
        selectedSuggestionIndex = (selectedSuggestionIndex + 1) % suggestions.length;
      } else {
        selectedSuggestionIndex = (selectedSuggestionIndex - 1 + suggestions.length) % suggestions.length;
      }

      // Add selection to new item
      items[selectedSuggestionIndex].classList.add('selected');

      // Scroll to make selected item visible (only in browser environment)
      if (items[selectedSuggestionIndex].scrollIntoView && typeof items[selectedSuggestionIndex].scrollIntoView === 'function') {
        items[selectedSuggestionIndex].scrollIntoView({ block: 'nearest' });
      }
    };

    // Function to select a suggestion
    const selectSuggestion = (index) => {
      if (index < 0 || index >= suggestions.length) return;

      const suggestion = suggestions[index];
      const inputValue = input.value;
      const cursorPosition = input.selectionStart;

      // Find the word being replaced at the cursor position
      const textBeforeCursor = inputValue.substring(0, cursorPosition);
      const textAfterCursor = inputValue.substring(cursorPosition);

      // Find the word boundary before cursor
      const wordBeforeCursorMatch = textBeforeCursor.match(/[a-zA-Z0-9_@]*$/);
      const wordBeforeCursor = wordBeforeCursorMatch ? wordBeforeCursorMatch[0] : '';

      // Find the word boundary after cursor
      const wordAfterCursorMatch = textAfterCursor.match(/^[a-zA-Z0-9_@]*/);
      const wordAfterCursor = wordAfterCursorMatch ? wordAfterCursorMatch[0] : '';

      // Calculate the full word at cursor and its boundaries
      const fullWord = wordBeforeCursor + wordAfterCursor;
      const wordStartPos = cursorPosition - wordBeforeCursor.length;
      const wordEndPos = cursorPosition + wordAfterCursor.length;

      // Create the new input value by replacing the word at cursor
      const newValue = inputValue.substring(0, wordStartPos) +
                       suggestion.name +
                       inputValue.substring(wordEndPos);

      // Set the new input value
      input.value = newValue;

      // Calculate the new cursor position
      const newCursorPosition = wordStartPos + suggestion.name.length;

      // Add parentheses for functions and position cursor between them
      if (suggestion.type === 'function') {
        // Check if there are already parentheses after the function name
        if (input.value.substring(newCursorPosition, newCursorPosition + 2) !== '()') {
          // Insert parentheses
          input.value = input.value.substring(0, newCursorPosition) +
                        '()' +
                        input.value.substring(newCursorPosition);

          // Position cursor between parentheses
          setTimeout(() => {
            input.selectionStart = input.selectionEnd = newCursorPosition + 1;
          }, 0);
        } else {
          // Parentheses already exist, just position cursor between them
          setTimeout(() => {
            input.selectionStart = input.selectionEnd = newCursorPosition + 1;
          }, 0);
        }
      } else {
        // For non-functions, position cursor after the inserted suggestion
        setTimeout(() => {
          input.selectionStart = input.selectionEnd = newCursorPosition;
        }, 0);
      }

      // Hide autocomplete
      hideAutocompleteSuggestions();

      // Focus the input
      input.focus();
    };

    // Handle the run button click
    runButton.addEventListener('click', () => {
      const expr = input.value.trim();
      if (!expr) return; // Don't process empty expressions

      // Hide autocomplete if visible
      hideAutocompleteSuggestions();

      // Improved deduplication: Remove the command if it already exists in history
      // and add it to the end (most recent position)
      const existingIndex = commandHistory.indexOf(expr);
      if (existingIndex !== -1) {
        commandHistory.splice(existingIndex, 1);
      }

      // Add the command to the end of history
      commandHistory.push(expr);

      // Reset history index
      historyIndex = -1;
      currentInput = '';

      const evaluation = parser.evaluate(expr);

      if (evaluation.success) {
        addToHistory(expr, evaluation.result);
      } else {
        addToHistory(expr, evaluation.error, true);
      }

      // Clear the input
      input.value = '';

      // Reset autocomplete state completely
      hideAutocompleteSuggestions();
      suggestions = [];
      selectedSuggestionIndex = -1;

      input.focus();
    });

    // Handle input events for autocomplete
    input.addEventListener('input', () => {
      if (input.value.trim()) {
        // Check if the input ends with a space or other non-word character
        // If it does, don't show autocomplete
        if (input.value.match(/\s$/)) {
          hideAutocompleteSuggestions();
        } else {
          showAutocompleteSuggestions();
        }
      } else {
        hideAutocompleteSuggestions();
      }
    });

    // Handle focus/blur events for autocomplete
    input.addEventListener('focus', () => {
      if (input.value.trim()) {
        showAutocompleteSuggestions();
      }
    });

    // Close autocomplete when clicking outside
    document.addEventListener('click', (e) => {
      if (!autocompleteContainer.contains(e.target) && e.target !== input) {
        hideAutocompleteSuggestions();
      }
    });

    // Handle key events for autocomplete and command history
    input.addEventListener('keydown', (e) => {
      // Handle Enter key
      if (e.key === 'Enter') {
        // If autocomplete is visible and an item is selected, select it
        if (isAutocompleteVisible && selectedSuggestionIndex >= 0) {
          selectSuggestion(selectedSuggestionIndex);
          e.preventDefault();
        } else {
          // Otherwise, run the command
          // Make sure to completely reset autocomplete state
          hideAutocompleteSuggestions();
          suggestions = [];
          selectedSuggestionIndex = -1;
          runButton.click();
          e.preventDefault();
        }
      }
      // Handle Tab key for autocomplete
      else if (e.key === 'Tab') {
        if (isAutocompleteVisible) {
          if (selectedSuggestionIndex >= 0) {
            // If an item is selected, select it
            selectSuggestion(selectedSuggestionIndex);
          } else if (suggestions.length === 1) {
            // If there's only one suggestion, select it automatically
            selectSuggestion(0);
          }
          e.preventDefault();
        }
      }
      // Handle Escape key to close autocomplete
      else if (e.key === 'Escape' && isAutocompleteVisible) {
        hideAutocompleteSuggestions();
        e.preventDefault();
      }
      // Handle arrow keys for autocomplete navigation
      else if (e.key === 'ArrowDown' && isAutocompleteVisible) {
        navigateSuggestions('down');
        e.preventDefault();
      }
      else if (e.key === 'ArrowUp' && isAutocompleteVisible) {
        navigateSuggestions('up');
        e.preventDefault();
      }
      // Handle command history navigation when autocomplete is not visible
      else if (e.key === 'ArrowUp' && !isAutocompleteVisible) {
        // Save current input if we're just starting to navigate history
        if (historyIndex === -1) {
          currentInput = input.value;
        }

        // Navigate up through history
        if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
          historyIndex++;
          input.value = commandHistory[commandHistory.length - 1 - historyIndex];

          // Move cursor to end of input
          setTimeout(() => {
            input.selectionStart = input.selectionEnd = input.value.length;
          }, 0);
        }
        e.preventDefault();
      }
      else if (e.key === 'ArrowDown' && !isAutocompleteVisible) {
        // Navigate down through history
        if (historyIndex > 0) {
          historyIndex--;
          input.value = commandHistory[commandHistory.length - 1 - historyIndex];
        } else if (historyIndex === 0) {
          // Return to the current input when reaching the bottom of history
          historyIndex = -1;
          input.value = currentInput;
        }

        // Move cursor to end of input
        setTimeout(() => {
          input.selectionStart = input.selectionEnd = input.value.length;
        }, 0);

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
