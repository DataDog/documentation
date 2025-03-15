import ExpressionLanguageParser from './expression-language-parser';

class ExpressionLanguageEvaluator {
  constructor() {
    // Find all expression evaluators on the page
    const evaluators = document.querySelectorAll('.expression-evaluator');
    evaluators.forEach(evaluator => this.setupEvaluator(evaluator));

    // Find and set up the simulator
    const simulator = document.querySelector('.expression-simulator');
    if (simulator) this.setupSimulator(simulator);
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

  setupSimulator(simulator) {
    const simulateButton = simulator.querySelector('#simulate-button');
    const conditionInput = simulator.querySelector('#condition-input');
    const templateInput = simulator.querySelector('.template-input');
    const simulationControls = simulator.querySelector('.simulation-controls');
    const autocompleteContainer = simulator.querySelector('#simulator-autocomplete-container');
    // Add example buttons selector
    const exampleButtons = document.querySelectorAll('.example-button');

    if (!simulateButton || !conditionInput || !templateInput || !simulationControls || !autocompleteContainer) return;

    // Get the template text (without the styling)
    const templateText = templateInput.textContent;

    // Create a new instance of the expression language parser with simulator mode enabled
    const parser = new ExpressionLanguageParser({ simulatorMode: true });

    // Create a container for simulation results if it doesn't exist
    let resultsContainer = simulator.querySelector('.simulation-results');
    if (!resultsContainer) {
      resultsContainer = document.createElement('div');
      resultsContainer.className = 'simulation-results';
      simulator.appendChild(resultsContainer);
    }

    // Set up click handlers for example buttons
    exampleButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Get the expression from the data-expression attribute
        const expression = button.getAttribute('data-expression');

        // Check if this is the "Write your own!" button (empty expression)
        if (expression === '') {
          // Clear the condition input
          conditionInput.value = '';
        } else if (expression) {
          // Set the expression in the condition input
          conditionInput.value = expression;
        }

        // Focus the input
        conditionInput.focus();
        // Hide autocomplete if visible
        hideAutocompleteSuggestions();
      });
    });

    // Autocomplete state
    let selectedSuggestionIndex = -1;
    let suggestions = [];
    let isAutocompleteVisible = false;

    // Function to show autocomplete suggestions
    const showAutocompleteSuggestions = () => {
      // Get the current word at the cursor position
      const cursorPosition = conditionInput.selectionStart;
      const textBeforeCursor = conditionInput.value.substring(0, cursorPosition);

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

      // Adjust position to ensure it's visible
      try {
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

      // Scroll to make selected item visible
      if (items[selectedSuggestionIndex].scrollIntoView) {
        items[selectedSuggestionIndex].scrollIntoView({ block: 'nearest' });
      }
    };

    // Function to select a suggestion
    const selectSuggestion = (index) => {
      if (index < 0 || index >= suggestions.length) return;

      const suggestion = suggestions[index];
      const inputValue = conditionInput.value;
      const cursorPosition = conditionInput.selectionStart;

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
      conditionInput.value = newValue;

      // Calculate the new cursor position
      const newCursorPosition = wordStartPos + suggestion.name.length;

      // Add parentheses for functions and position cursor between them
      if (suggestion.type === 'function') {
        // Check if there are already parentheses after the function name
        if (conditionInput.value.substring(newCursorPosition, newCursorPosition + 2) !== '()') {
          // Insert parentheses
          conditionInput.value = conditionInput.value.substring(0, newCursorPosition) +
                      '()' +
                      conditionInput.value.substring(newCursorPosition);

          // Position cursor between parentheses
          setTimeout(() => {
            conditionInput.selectionStart = conditionInput.selectionEnd = newCursorPosition + 1;
          }, 0);
        } else {
          // Parentheses already exist, just position cursor between them
          setTimeout(() => {
            conditionInput.selectionStart = conditionInput.selectionEnd = newCursorPosition + 1;
          }, 0);
        }
      } else {
        // For non-functions, position cursor after the inserted suggestion
        setTimeout(() => {
          conditionInput.selectionStart = conditionInput.selectionEnd = newCursorPosition;
        }, 0);
      }

      // Hide autocomplete
      hideAutocompleteSuggestions();

      // Focus the input
      conditionInput.focus();
    };

    // Handle input events for autocomplete
    conditionInput.addEventListener('input', () => {
      if (conditionInput.value.trim()) {
        // Check if the input ends with a space or other non-word character
        // If it does, don't show autocomplete
        if (conditionInput.value.match(/\s$/)) {
          hideAutocompleteSuggestions();
        } else {
          showAutocompleteSuggestions();
        }
      } else {
        hideAutocompleteSuggestions();
      }
    });

    // Handle focus/blur events for autocomplete
    conditionInput.addEventListener('focus', () => {
      if (conditionInput.value.trim()) {
        showAutocompleteSuggestions();
      }
    });

    // Close autocomplete when clicking outside
    document.addEventListener('click', (e) => {
      if (!autocompleteContainer.contains(e.target) && e.target !== conditionInput) {
        hideAutocompleteSuggestions();
      }
    });

    // Handle key events for autocomplete
    conditionInput.addEventListener('keydown', (e) => {
      // Handle Enter key
      if (e.key === 'Enter') {
        // If autocomplete is visible and an item is selected, select it
        if (isAutocompleteVisible && selectedSuggestionIndex >= 0) {
          selectSuggestion(selectedSuggestionIndex);
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
    });

    // Function to add a log entry to the results
    const addLogEntry = (loopIndex, result, isError = false) => {
      const entry = document.createElement('div');
      entry.className = 'simulation-log-entry';

      const logMessage = document.createElement('div');
      logMessage.className = isError ? 'log-error' : 'log-message';

      if (isError) {
        logMessage.textContent = `Error on loop ${loopIndex + 1}: ${result}`;
      } else {
        // Replace {i+1} with the actual value
        const logText = templateText.replace(/{i\+1}/g, loopIndex + 1);
        logMessage.textContent = logText;
      }

      entry.appendChild(logMessage);
      resultsContainer.appendChild(entry);

      // Scroll to the bottom
      resultsContainer.scrollTop = resultsContainer.scrollHeight;
    };

    // Set up the click handler for the simulate button
    simulateButton.addEventListener('click', () => {
      // Hide autocomplete if visible
      hideAutocompleteSuggestions();

      // Clear previous results
      resultsContainer.innerHTML = '';

      // Add a header to the results section
      const header = document.createElement('div');
      header.className = 'simulation-header';
      header.textContent = 'Simulation Results:';
      resultsContainer.appendChild(header);

      // Get the condition expression
      const condition = conditionInput.value.trim();

      // Track if any logs were generated
      let logsGenerated = false;

      // Run the simulation for 5 loops (0 to 4)
      for (let i = 0; i < 5; i++) {
        // Update the loop index in the parser environment
        parser.environment.i = i;

        try {
          // If no condition is provided, always log
          if (!condition) {
            addLogEntry(i, null);
            logsGenerated = true;
            continue;
          }

          // Evaluate the condition
          const evaluation = parser.evaluate(condition);

          if (evaluation.success) {
            // Convert the result to a boolean
            const result = evaluation.result.toLowerCase();
            const shouldLog = result === 'true';

            // If the condition is true, add a log entry
            if (shouldLog) {
              addLogEntry(i, null);
              logsGenerated = true;
            }
          } else {
            // If there's an error evaluating the condition, show it
            addLogEntry(i, evaluation.error, true);
            logsGenerated = true; // Errors count as output
            break; // Stop the simulation if there's an error
          }
        } catch (error) {
          addLogEntry(i, error.message, true);
          logsGenerated = true; // Errors count as output
          break; // Stop the simulation if there's an error
        }
      }

      // If no logs were generated, show a message
      if (!logsGenerated) {
        const noLogsEntry = document.createElement('div');
        noLogsEntry.className = 'simulation-log-entry no-logs-entry';

        const noLogsMessage = document.createElement('div');
        noLogsMessage.className = 'log-error';
        noLogsMessage.textContent = 'No logs generated';

        noLogsEntry.appendChild(noLogsMessage);
        resultsContainer.appendChild(noLogsEntry);
      }
    });

    // Set up the clear button
    const clearButton = simulator.querySelector('.clear-button');
    if (clearButton) {
      clearButton.addEventListener('click', () => {
        conditionInput.value = '';
        hideAutocompleteSuggestions();
        conditionInput.focus();
      });
    }
  }
}

export default ExpressionLanguageEvaluator;
