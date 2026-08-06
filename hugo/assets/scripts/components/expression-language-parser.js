/**
 * Expression Language Parser
 *
 * This module handles parsing and evaluating expressions for the Dynamic Instrumentation Expression Language REPL.
 */

class ExpressionLanguageParser {
  constructor(options = {}) {
    // Set simulator mode (default: false)
    this.simulatorMode = options.simulatorMode || false;

    // Built-in functions
    this.builtinFunctions = {
      // Variable operations
      isDefined: (varNameNode) => {
        // isDefined receives the AST node directly, not the evaluated value
        // This allows us to check if a variable exists without throwing an error
        if (varNameNode && varNameNode.type === 'VARIABLE') {
          return this.environment.hasOwnProperty(varNameNode.name);
        }
        // If it's not a variable node, it must be a value that exists
        return true;
      },

      // String functions
      len: (value) => {
        if (typeof value === 'string') return value.length;
        if (Array.isArray(value)) return value.length;
        if (typeof value === 'object' && value !== null) return Object.keys(value).length;
        throw new Error('len() requires a string, array, or object argument');
      },
      count: (value) => {
        if (typeof value === 'string') return value.length;
        if (Array.isArray(value)) return value.length;
        if (typeof value === 'object' && value !== null) return Object.keys(value).length;
        throw new Error('count() requires a string, array, or object argument');
      },
      isEmpty: (value) => {
        if (typeof value === 'string') return value.length === 0;
        if (Array.isArray(value)) return value.length === 0;
        if (typeof value === 'object' && value !== null) return Object.keys(value).length === 0;
        throw new Error('isEmpty() requires a string, array, or object argument');
      },
      substring: (str, start, end) => {
        if (typeof str !== 'string') throw new Error('substring() requires a string as first argument');
        return str.substring(start, end);
      },
      startsWith: (str, prefix) => {
        if (typeof str !== 'string') throw new Error('startsWith() requires a string as first argument');
        return str.startsWith(prefix);
      },
      endsWith: (str, suffix) => {
        if (typeof str !== 'string') throw new Error('endsWith() requires a string as first argument');
        return str.endsWith(suffix);
      },
      contains: (container, value) => {
        if (typeof container === 'string') return container.includes(value);
        if (Array.isArray(container)) return container.includes(value);
        if (typeof container === 'object' && container !== null) {
          return Object.values(container).includes(value);
        }
        throw new Error('contains() requires a string, array, or object argument');
      },
      matches: (str, pattern) => {
        if (typeof str !== 'string') throw new Error('matches() requires a string as first argument');
        return new RegExp(pattern).test(str);
      },

      // Collection functions
      filter: (collection, predicate) => {
        if (!Array.isArray(collection) && (typeof collection !== 'object' || collection === null)) {
          throw new Error('filter() requires an array or object as first argument');
        }

        if (Array.isArray(collection)) {
          return collection.filter(item => {
            const tempEnv = { '@it': item };
            return this._evaluateWithEnvironment(predicate, tempEnv);
          });
        } else {
          const result = {};
          Object.entries(collection).forEach(([key, value]) => {
            const tempEnv = { '@key': key, '@value': value };
            if (this._evaluateWithEnvironment(predicate, tempEnv)) {
              result[key] = value;
            }
          });
          return result;
        }
      },
      any: (collection, predicate) => {
        if (!Array.isArray(collection) && (typeof collection !== 'object' || collection === null)) {
          throw new Error('any() requires an array or object as first argument');
        }

        // If no predicate is provided, check if the collection has any elements
        if (predicate === undefined) {
          if (Array.isArray(collection)) {
            return collection.length > 0;
          } else {
            return Object.keys(collection).length > 0;
          }
        }

        if (Array.isArray(collection)) {
          if (collection.length === 0) return false;
          return collection.some(item => {
            const tempEnv = { '@it': item };
            return this._evaluateWithEnvironment(predicate, tempEnv);
          });
        } else {
          const entries = Object.entries(collection);
          if (entries.length === 0) return false;
          return entries.some(([key, value]) => {
            const tempEnv = { '@key': key, '@value': value };
            return this._evaluateWithEnvironment(predicate, tempEnv);
          });
        }
      },
      all: (collection, predicate) => {
        if (!Array.isArray(collection) && (typeof collection !== 'object' || collection === null)) {
          throw new Error('all() requires an array or object as first argument');
        }

        // If no predicate is provided, check if all elements in the collection are truthy
        if (predicate === undefined) {
          if (Array.isArray(collection)) {
            if (collection.length === 0) return true;
            return collection.every(item => Boolean(item));
          } else {
            const values = Object.values(collection);
            if (values.length === 0) return true;
            return values.every(value => Boolean(value));
          }
        }

        if (Array.isArray(collection)) {
          if (collection.length === 0) return true;
          return collection.every(item => {
            const tempEnv = { '@it': item };
            return this._evaluateWithEnvironment(predicate, tempEnv);
          });
        } else {
          const entries = Object.entries(collection);
          if (entries.length === 0) return true;
          return entries.every(([key, value]) => {
            const tempEnv = { '@key': key, '@value': value };
            return this._evaluateWithEnvironment(predicate, tempEnv);
          });
        }
      }
    };

    // Initialize the environment with default variables
    this.environment = {
      myString: "Hello, world!",
      mySequence: [1, 2, 3, 4],
      myMap: {"a": 1, "b": 2, "c": 3},
      loops: 5,
      i: 0
    };

    // Add built-in functions to the environment
    Object.keys(this.builtinFunctions).forEach(key => {
      this.environment[key] = this.builtinFunctions[key];
    });
  }

  /**
   * Get autocomplete suggestions based on current input
   * @param {string} input - The current input text
   * @returns {Array} - Array of suggestion objects with name, type, and description
   */
  getAutocompleteSuggestions(input) {
    const suggestions = [];
    const lastWord = this._getLastWord(input);

    // If input ends with a dot, suggest object properties
    if (input.trim().endsWith('.')) {
      const objectName = input.trim().slice(0, -1).trim();
      return this._getObjectProperties(objectName);
    }

    // Add special operators
    const specialOperators = [
      {
        name: '@it',
        type: 'special',
        description: 'Current element in collection iteration'
      },
      {
        name: '@key',
        type: 'special',
        description: 'Current key in object/map iteration'
      },
      {
        name: '@value',
        type: 'special',
        description: 'Current value in object/map iteration'
      }
    ];

    for (const operator of specialOperators) {
      if (operator.name.toLowerCase().startsWith(lastWord.toLowerCase())) {
        suggestions.push(operator);
      }
    }

    // Add built-in functions
    for (const funcName of Object.keys(this.builtinFunctions)) {
      if (funcName.toLowerCase().startsWith(lastWord.toLowerCase())) {
        suggestions.push({
          name: funcName,
          type: 'function',
          description: this._getFunctionDescription(funcName)
        });
      }
    }

    // Add environment variables (excluding functions)
    for (const varName of Object.keys(this.environment)) {
      if (typeof this.environment[varName] !== 'function' &&
          varName.toLowerCase().startsWith(lastWord.toLowerCase())) {
        suggestions.push({
          name: varName,
          type: 'variable',
          description: this._getTypeDescription(this.environment[varName])
        });
      }
    }

    return suggestions;
  }

  /**
   * Get the last word of the input for autocomplete matching
   * @param {string} input - The input text
   * @returns {string} - The last word
   * @private
   */
  _getLastWord(input) {
    const match = input.match(/[a-zA-Z0-9_@]*$/);
    return match ? match[0] : '';
  }

  /**
   * Get properties of an object for autocomplete
   * @param {string} objectName - The name of the object
   * @returns {Array} - Array of property suggestions
   * @private
   */
  _getObjectProperties(objectName) {
    const suggestions = [];
    try {
      // Try to evaluate the object name to get its value
      const tokens = this._tokenize(objectName);
      const ast = this._parse(tokens);
      const obj = this._evaluateAst(ast);

      if (typeof obj === 'object' && obj !== null) {
        // For arrays, suggest length property and indices
        if (Array.isArray(obj)) {
          suggestions.push({
            name: 'length',
            type: 'property',
            description: 'Number of elements in the array'
          });

          // Add some array indices as suggestions
          for (let i = 0; i < Math.min(obj.length, 5); i++) {
            suggestions.push({
              name: i.toString(),
              type: 'index',
              description: `Value: ${this._formatValue(obj[i])}`
            });
          }
        } else {
          // For objects, suggest all keys
          for (const key of Object.keys(obj)) {
            suggestions.push({
              name: key,
              type: 'property',
              description: `Value: ${this._formatValue(obj[key])}`
            });
          }
        }
      }
    } catch (e) {
      // If evaluation fails, return empty suggestions
      console.log('Error getting object properties:', e);
    }

    return suggestions;
  }

  /**
   * Get a description for a function
   * @param {string} funcName - The function name
   * @returns {string} - The function description
   * @private
   */
  _getFunctionDescription(funcName) {
    const descriptions = {
      'isDefined': 'Checks whether a variable is defined',
      'len': 'Returns the length of a string, array, or object',
      'count': 'Returns the length of a string, array, or object',
      'isEmpty': 'Checks if a string, array, or object is empty',
      'substring': 'Returns a substring from start to end index',
      'startsWith': 'Checks if a string starts with the specified prefix',
      'endsWith': 'Checks if a string ends with the specified suffix',
      'contains': 'Checks if a string/array/object contains a value',
      'matches': 'Checks if a string matches a regular expression pattern',
      'filter': 'Filters elements of a collection based on a predicate',
      'any': 'Checks if any element in a collection satisfies a predicate',
      'all': 'Checks if all elements in a collection satisfy a predicate'
    };

    return descriptions[funcName] || 'Function';
  }

  /**
   * Get a description of the value type
   * @param {*} value - The value to describe
   * @returns {string} - The type description
   * @private
   */
  _getTypeDescription(value) {
    if (Array.isArray(value)) {
      return `Array with ${value.length} elements`;
    } else if (typeof value === 'object' && value !== null) {
      return `Object with ${Object.keys(value).length} properties`;
    } else {
      return typeof value;
    }
  }

  /**
   * Evaluate an expression
   * @param {string} expr - The expression to evaluate
   * @returns {Object} - The result of the evaluation
   */
  evaluate(expr) {
    try {
      if (!expr.trim()) {
        return {
          success: false,
          error: 'Empty expression'
        };
      }

      // Split the expression into statements
      const statements = this._splitStatements(expr);

      // In simulator mode, reject multiple statements
      if (this.simulatorMode && statements.length > 1) {
        return {
          success: false,
          error: 'Multiple statements are not allowed'
        };
      }

      // In simulator mode, reject assignments
      if (this.simulatorMode && this._containsAssignmentInExpression(expr)) {
        return {
          success: false,
          error: 'Variable assignments are not allowed'
        };
      }

      let result;

      // Evaluate each statement
      for (const statement of statements) {
        result = this._evaluateStatement(statement);
      }

      // Format the result
      return {
        success: true,
        result: this._formatValue(result)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Split an expression into statements
   * @param {string} expr - The expression to split
   * @returns {string[]} - The statements
   * @private
   */
  _splitStatements(expr) {
    const statements = [];
    let currentStatement = '';
    let inString = false;
    let stringChar = '';
    let bracketCount = 0;
    let parenCount = 0;
    let curlyCount = 0;

    for (let i = 0; i < expr.length; i++) {
      const char = expr[i];

      // Handle string literals
      if ((char === '"' || char === "'") && (i === 0 || expr[i-1] !== '\\')) {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
        }
      }

      // Count brackets and parentheses
      if (!inString) {
        if (char === '[') bracketCount++;
        else if (char === ']') bracketCount--;
        else if (char === '(') parenCount++;
        else if (char === ')') parenCount--;
        else if (char === '{') curlyCount++;
        else if (char === '}') curlyCount--;

        // Split on semicolons, but only if not inside any brackets or strings
        if (char === ';' && bracketCount === 0 && parenCount === 0 && curlyCount === 0) {
          statements.push(currentStatement.trim());
          currentStatement = '';
          continue;
        }
      }

      currentStatement += char;
    }

    if (currentStatement.trim()) {
      statements.push(currentStatement.trim());
    }

    return statements;
  }

  /**
   * Evaluate a single statement
   * @param {string} statement - The statement to evaluate
   * @returns {*} - The result of the evaluation
   * @private
   */
  _evaluateStatement(statement) {
    // Tokenize the statement
    const tokens = this._tokenize(statement);

    // Parse the tokens into an AST
    const ast = this._parse(tokens);

    // Evaluate the AST
    return this._evaluateAst(ast);
  }

  /**
   * Tokenize a statement
   * @param {string} statement - The statement to tokenize
   * @returns {Array} - The tokens
   * @private
   */
  _tokenize(statement) {
    const tokens = [];
    let i = 0;

    while (i < statement.length) {
      const char = statement[i];

      // Skip whitespace
      if (/\s/.test(char)) {
        i++;
        continue;
      }

      // Numbers
      if (/[0-9]/.test(char) || (char === '-' && /[0-9]/.test(statement[i+1]))) {
        let number = char;
        let j = i + 1;
        let isFloat = false;

        while (j < statement.length) {
          const nextChar = statement[j];
          if (/[0-9]/.test(nextChar)) {
            number += nextChar;
            j++;
          } else if (nextChar === '.' && !isFloat) {
            number += nextChar;
            isFloat = true;
            j++;
          } else {
            break;
          }
        }

        tokens.push({
          type: 'NUMBER',
          value: isFloat ? parseFloat(number) : parseInt(number, 10)
        });

        i = j;
        continue;
      }

      // Strings
      if (char === '"' || char === "'") {
        let string = '';
        let j = i + 1;
        const quote = char;

        while (j < statement.length) {
          const nextChar = statement[j];
          if (nextChar === quote && statement[j-1] !== '\\') {
            break;
          }
          string += nextChar;
          j++;
        }

        tokens.push({
          type: 'STRING',
          value: string
        });

        i = j + 1;
        continue;
      }

      // Identifiers (variables and functions)
      if (/[a-zA-Z_@]/.test(char)) {
        let identifier = char;
        let j = i + 1;

        while (j < statement.length) {
          const nextChar = statement[j];
          if (/[a-zA-Z0-9_@]/.test(nextChar)) {
            identifier += nextChar;
            j++;
          } else {
            break;
          }
        }

        // Check for keywords
        if (identifier === 'true') {
          tokens.push({ type: 'BOOLEAN', value: true });
        } else if (identifier === 'false') {
          tokens.push({ type: 'BOOLEAN', value: false });
        } else if (identifier === 'null') {
          tokens.push({ type: 'NULL', value: null });
        } else if (identifier === 'not') {
          tokens.push({ type: 'NOT' });
        } else {
          tokens.push({ type: 'IDENTIFIER', value: identifier });
        }

        i = j;
        continue;
      }

      // Operators
      if (char === '+') {
        tokens.push({ type: 'PLUS' });
        i++;
      } else if (char === '-') {
        tokens.push({ type: 'MINUS' });
        i++;
      } else if (char === '*') {
        tokens.push({ type: 'MULTIPLY' });
        i++;
      } else if (char === '/') {
        tokens.push({ type: 'DIVIDE' });
        i++;
      } else if (char === '=') {
        if (statement[i+1] === '=') {
          tokens.push({ type: 'EQUALS' });
          i += 2;
        } else {
          tokens.push({ type: 'ASSIGN' });
          i++;
        }
      } else if (char === '!') {
        if (statement[i+1] === '=') {
          tokens.push({ type: 'NOT_EQUALS' });
          i += 2;
        } else {
          tokens.push({ type: 'NOT' });
          i++;
        }
      } else if (char === '<') {
        if (statement[i+1] === '=') {
          tokens.push({ type: 'LESS_THAN_EQUALS' });
          i += 2;
        } else {
          tokens.push({ type: 'LESS_THAN' });
          i++;
        }
      } else if (char === '>') {
        if (statement[i+1] === '=') {
          tokens.push({ type: 'GREATER_THAN_EQUALS' });
          i += 2;
        } else {
          tokens.push({ type: 'GREATER_THAN' });
          i++;
        }
      } else if (char === '&' && statement[i+1] === '&') {
        tokens.push({ type: 'AND' });
        i += 2;
      } else if (char === '|' && statement[i+1] === '|') {
        tokens.push({ type: 'OR' });
        i += 2;
      } else if (char === '(') {
        tokens.push({ type: 'LEFT_PAREN' });
        i++;
      } else if (char === ')') {
        tokens.push({ type: 'RIGHT_PAREN' });
        i++;
      } else if (char === '[') {
        tokens.push({ type: 'LEFT_BRACKET' });
        i++;
      } else if (char === ']') {
        tokens.push({ type: 'RIGHT_BRACKET' });
        i++;
      } else if (char === '{') {
        tokens.push({ type: 'LEFT_BRACE' });
        i++;
      } else if (char === '}') {
        tokens.push({ type: 'RIGHT_BRACE' });
        i++;
      } else if (char === ',') {
        tokens.push({ type: 'COMMA' });
        i++;
      } else if (char === ':') {
        tokens.push({ type: 'COLON' });
        i++;
      } else {
        throw new Error(`Unexpected character: ${char}`);
      }
    }

    return tokens;
  }

  /**
   * Parse tokens into an AST
   * @param {Array} tokens - The tokens to parse
   * @returns {Object} - The AST
   * @private
   */
  _parse(tokens) {
    let position = 0;

    // Helper function to peek at the current token
    const peek = () => tokens[position];

    // Helper function to consume the current token and move to the next
    const consume = () => tokens[position++];

    // Helper function to check if we've reached the end of the tokens
    const isAtEnd = () => position >= tokens.length;

    // Helper function to match a token type
    const match = (type) => {
      if (isAtEnd()) return false;
      if (peek().type !== type) return false;
      consume();
      return true;
    };

    // Helper function to expect a token type
    const expect = (type, message) => {
      if (peek().type === type) return consume();
      throw new Error(message || `Expected ${type}, got ${peek().type}`);
    };

    // Grammar rules
    const expression = () => {
      return assignment();
    };

    const assignment = () => {
      const expr = logicalOr();

      if (match('ASSIGN')) {
        const value = assignment();

        if (expr.type === 'VARIABLE') {
          return {
            type: 'ASSIGN',
            name: expr.name,
            value
          };
        }

        throw new Error('Invalid assignment target');
      }

      return expr;
    };

    const logicalOr = () => {
      let expr = logicalAnd();

      while (match('OR')) {
        const right = logicalAnd();
        expr = {
          type: 'LOGICAL',
          operator: 'OR',
          left: expr,
          right
        };
      }

      return expr;
    };

    const logicalAnd = () => {
      let expr = equality();

      while (match('AND')) {
        const right = equality();
        expr = {
          type: 'LOGICAL',
          operator: 'AND',
          left: expr,
          right
        };
      }

      return expr;
    };

    const equality = () => {
      let expr = comparison();

      while (match('EQUALS') || match('NOT_EQUALS')) {
        const operator = tokens[position - 1].type === 'EQUALS' ? '==' : '!=';
        const right = comparison();
        expr = {
          type: 'BINARY',
          operator,
          left: expr,
          right
        };
      }

      return expr;
    };

    const comparison = () => {
      let expr = term();

      while (
        match('LESS_THAN') ||
        match('LESS_THAN_EQUALS') ||
        match('GREATER_THAN') ||
        match('GREATER_THAN_EQUALS')
      ) {
        let operator;
        switch (tokens[position - 1].type) {
          case 'LESS_THAN': operator = '<'; break;
          case 'LESS_THAN_EQUALS': operator = '<='; break;
          case 'GREATER_THAN': operator = '>'; break;
          case 'GREATER_THAN_EQUALS': operator = '>='; break;
        }

        const right = term();
        expr = {
          type: 'BINARY',
          operator,
          left: expr,
          right
        };
      }

      return expr;
    };

    const term = () => {
      let expr = factor();

      while (match('PLUS') || match('MINUS')) {
        const operator = tokens[position - 1].type === 'PLUS' ? '+' : '-';
        const right = factor();
        expr = {
          type: 'BINARY',
          operator,
          left: expr,
          right
        };
      }

      return expr;
    };

    const factor = () => {
      let expr = unary();

      while (match('MULTIPLY') || match('DIVIDE')) {
        const operator = tokens[position - 1].type === 'MULTIPLY' ? '*' : '/';
        const right = unary();
        expr = {
          type: 'BINARY',
          operator,
          left: expr,
          right
        };
      }

      return expr;
    };

    const unary = () => {
      if (match('MINUS') || match('NOT')) {
        const operator = tokens[position - 1].type === 'MINUS' ? '-' : '!';
        const right = unary();
        return {
          type: 'UNARY',
          operator,
          right
        };
      }

      return call();
    };

    const call = () => {
      let expr = primary();

      while (true) {
        if (match('LEFT_PAREN')) {
          expr = finishCall(expr);
        } else if (match('LEFT_BRACKET')) {
          const index = expression();
          expect('RIGHT_BRACKET', 'Expected "]" after index');
          expr = {
            type: 'INDEX',
            object: expr,
            index
          };
        } else {
          break;
        }
      }

      return expr;
    };

    const finishCall = (callee) => {
      const args = [];

      if (peek().type !== 'RIGHT_PAREN') {
        do {
          if (peek().type === 'LEFT_BRACE') {
            // Special case for predicates in collection functions
            consume(); // Consume LEFT_BRACE
            const predicate = expression();
            expect('RIGHT_BRACE', 'Expected "}" after predicate');
            args.push({
              type: 'PREDICATE',
              expression: predicate
            });
          } else {
            args.push(expression());
          }
        } while (match('COMMA'));
      }

      expect('RIGHT_PAREN', 'Expected ")" after arguments');

      return {
        type: 'CALL',
        callee,
        args
      };
    };

    const primary = () => {
      if (match('NUMBER')) {
        return {
          type: 'LITERAL',
          value: tokens[position - 1].value
        };
      }

      if (match('STRING')) {
        return {
          type: 'LITERAL',
          value: tokens[position - 1].value
        };
      }

      if (match('BOOLEAN')) {
        return {
          type: 'LITERAL',
          value: tokens[position - 1].value
        };
      }

      if (match('NULL')) {
        return {
          type: 'LITERAL',
          value: null
        };
      }

      if (match('IDENTIFIER')) {
        return {
          type: 'VARIABLE',
          name: tokens[position - 1].value
        };
      }

      if (match('LEFT_PAREN')) {
        const expr = expression();
        expect('RIGHT_PAREN', 'Expected ")" after expression');
        return {
          type: 'GROUPING',
          expression: expr
        };
      }

      if (match('LEFT_BRACKET')) {
        return array();
      }

      if (match('LEFT_BRACE')) {
        return dictionary();
      }

      throw new Error(`Unexpected token: ${peek().type}`);
    };

    const array = () => {
      const elements = [];

      if (peek().type !== 'RIGHT_BRACKET') {
        do {
          elements.push(expression());
        } while (match('COMMA'));
      }

      expect('RIGHT_BRACKET', 'Expected "]" after array elements');

      return {
        type: 'ARRAY',
        elements
      };
    };

    const dictionary = () => {
      const entries = [];

      if (peek().type !== 'RIGHT_BRACE') {
        do {
          // Key can be a string or number
          let key;
          if (peek().type === 'STRING' || peek().type === 'NUMBER' || peek().type === 'IDENTIFIER') {
            key = consume().value;
          } else {
            throw new Error('Dictionary key must be a string, number, or identifier');
          }

          expect('COLON', 'Expected ":" after dictionary key');

          const value = expression();

          entries.push({
            key,
            value
          });
        } while (match('COMMA'));
      }

      expect('RIGHT_BRACE', 'Expected "}" after dictionary entries');

      return {
        type: 'DICTIONARY',
        entries
      };
    };

    // Start parsing
    return expression();
  }

  /**
   * Evaluate an AST
   * @param {Object} ast - The AST to evaluate
   * @returns {*} - The result of the evaluation
   * @private
   */
  _evaluateAst(ast) {
    switch (ast.type) {
      case 'LITERAL':
        return ast.value;

      case 'VARIABLE':
        if (this.environment.hasOwnProperty(ast.name)) {
          return this.environment[ast.name];
        }
        throw new Error(`Undefined variable: ${ast.name}`);

      case 'ASSIGN':
        const value = this._evaluateAst(ast.value);
        this.environment[ast.name] = value;
        return value;

      case 'BINARY':
        const left = this._evaluateAst(ast.left);
        const right = this._evaluateAst(ast.right);

        switch (ast.operator) {
          case '+': return left + right;
          case '-': return left - right;
          case '*': return left * right;
          case '/':
            if (right === 0) throw new Error('Division by zero');
            return left / right;
          case '==': return left === right;
          case '!=': return left !== right;
          case '<': return left < right;
          case '<=': return left <= right;
          case '>': return left > right;
          case '>=': return left >= right;
          default: throw new Error(`Unknown binary operator: ${ast.operator}`);
        }

      case 'UNARY':
        const operand = this._evaluateAst(ast.right);

        switch (ast.operator) {
          case '-': return -operand;
          case '!': return !operand;
          default: throw new Error(`Unknown unary operator: ${ast.operator}`);
        }

      case 'LOGICAL':
        const leftExpr = this._evaluateAst(ast.left);

        if (ast.operator === 'AND') {
          return leftExpr ? this._evaluateAst(ast.right) : false;
        } else if (ast.operator === 'OR') {
          return leftExpr ? true : this._evaluateAst(ast.right);
        }

        throw new Error(`Unknown logical operator: ${ast.operator}`);

      case 'GROUPING':
        return this._evaluateAst(ast.expression);

      case 'CALL':
        const callee = this._evaluateAst(ast.callee);

        // Special handling for isDefined - pass the AST node directly
        if (ast.callee.type === 'VARIABLE' && ast.callee.name === 'isDefined') {
          if (ast.args.length !== 1) {
            throw new Error('isDefined() requires exactly one argument');
          }
          return callee(ast.args[0]);
        }

        const args = ast.args.map(arg => {
          if (arg.type === 'PREDICATE') {
            return arg;
          }
          return this._evaluateAst(arg);
        });

        if (typeof callee === 'function') {
          return callee(...args);
        }

        throw new Error(`${ast.callee.name} is not a function`);

      case 'INDEX':
        const object = this._evaluateAst(ast.object);
        const index = this._evaluateAst(ast.index);

        if (Array.isArray(object)) {
          if (index < 0 || index >= object.length) {
            throw new Error('Array index out of bounds');
          }
          return object[index];
        } else if (typeof object === 'object' && object !== null) {
          if (!object.hasOwnProperty(index)) {
            throw new Error(`Key not found in object: ${index}`);
          }
          return object[index];
        }

        throw new Error('Cannot index non-array or non-object');

      case 'ARRAY':
        return ast.elements.map(element => this._evaluateAst(element));

      case 'DICTIONARY':
        const dict = {};
        for (const entry of ast.entries) {
          dict[entry.key] = this._evaluateAst(entry.value);
        }
        return dict;

      default:
        throw new Error(`Unknown AST node type: ${ast.type}`);
    }
  }

  /**
   * Evaluate an expression with a temporary environment
   * @param {Object} predicate - The predicate AST node
   * @param {Object} tempEnv - The temporary environment
   * @returns {*} - The result of the evaluation
   * @private
   */
  _evaluateWithEnvironment(predicate, tempEnv) {
    // Check for assignments in the predicate
    if (this._containsAssignment(predicate.expression)) {
      throw new Error('Assignment not allowed in predicate');
    }

    // Save the current environment
    const savedEnv = { ...this.environment };

    // Merge the temporary environment with the current environment
    Object.assign(this.environment, tempEnv);

    // Evaluate the predicate
    const result = this._evaluateAst(predicate.expression);

    // Restore the original environment
    this.environment = savedEnv;

    return result;
  }

  /**
   * Check if an AST node contains an assignment
   * @param {Object} node - The AST node to check
   * @returns {boolean} - True if the node contains an assignment, false otherwise
   * @private
   */
  _containsAssignment(node) {
    if (!node || typeof node !== 'object') return false;

    // Check if the current node is an assignment
    if (node.type === 'ASSIGN') return true;

    // Recursively check all properties of the node
    return Object.values(node).some(value => {
      if (Array.isArray(value)) {
        return value.some(item => this._containsAssignment(item));
      } else if (value && typeof value === 'object') {
        return this._containsAssignment(value);
      }
      return false;
    });
  }

  /**
   * Format a value for display
   * @param {*} value - The value to format
   * @returns {string} - The formatted value
   * @private
   */
  _formatValue(value) {
    if (value === undefined) return 'undefined';
    if (value === null) return 'null';
    if (typeof value === 'boolean') return value ? 'True' : 'False';
    if (typeof value === 'string') return `"${value}"`;
    if (Array.isArray(value)) return `[${value.map(item => this._formatValue(item)).join(', ')}]`;
    if (typeof value === 'object') {
      // For dictionaries, we need to maintain the order of keys as specified in the tests
      // We'll sort the keys to ensure consistent output
      const sortedKeys = Object.keys(value).sort();
      const entries = sortedKeys.map(k => `"${k}": ${this._formatValue(value[k])}`);
      return `{${entries.join(', ')}}`;
    }
    return String(value);
  }

  /**
   * Check if an expression contains an assignment
   * @param {string} expr - The expression to check
   * @returns {boolean} - True if the expression contains an assignment, false otherwise
   * @private
   */
  _containsAssignmentInExpression(expr) {
    const tokens = this._tokenize(expr);
    const ast = this._parse(tokens);
    return this._containsAssignment(ast);
  }
}

export default ExpressionLanguageParser;
