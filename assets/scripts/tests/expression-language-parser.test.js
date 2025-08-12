import ExpressionLanguageParser from '../components/expression-language-parser';

describe('ExpressionLanguageParser', () => {
  let parser;

  beforeEach(() => {
    parser = new ExpressionLanguageParser();
    // Set up the myCollection variable that's used in examples
    const initResult = parser.evaluate('myCollection = [1, 2, 3]');
  });

  describe('Literals', () => {
    test('should evaluate number literals', () => {
      const result = parser.evaluate('42');
      expect(result.success).toBe(true);
      expect(result.result).toBe('42');
    });

    test('should evaluate string literals', () => {
      const result = parser.evaluate('"hello"');
      expect(result.success).toBe(true);
      expect(result.result).toBe('"hello"');
    });

    test('should evaluate boolean literals', () => {
      const trueResult = parser.evaluate('true');
      expect(trueResult.success).toBe(true);
      expect(trueResult.result).toBe('True');

      const falseResult = parser.evaluate('false');
      expect(falseResult.success).toBe(true);
      expect(falseResult.result).toBe('False');
    });

    test('should evaluate array literals', () => {
      const result = parser.evaluate('[1, 2, 3]');
      expect(result.success).toBe(true);
      expect(result.result).toBe('[1, 2, 3]');
    });
  });

  describe('Variables', () => {
    test('should assign and access variables', () => {
      const assignResult = parser.evaluate('x = 5');
      expect(assignResult.success).toBe(true);
      expect(assignResult.result).toBe('5');

      const accessResult = parser.evaluate('x');
      expect(accessResult.success).toBe(true);
      expect(accessResult.result).toBe('5');
    });

    test('should reassign variables', () => {
      parser.evaluate('x = 5');

      const reassignResult = parser.evaluate('x = 10');
      expect(reassignResult.success).toBe(true);
      expect(reassignResult.result).toBe('10');

      const accessResult = parser.evaluate('x');
      expect(accessResult.success).toBe(true);
      expect(accessResult.result).toBe('10');
    });

    test('should handle different variable types', () => {
      const strResult = parser.evaluate('str = "hello"');
      expect(strResult.success).toBe(true);
      expect(strResult.result).toBe('"hello"');

      const boolResult = parser.evaluate('flag = true');
      expect(boolResult.success).toBe(true);
      expect(boolResult.result).toBe('True');

      const arrResult = parser.evaluate('arr = [1, 2, 3]');
      expect(arrResult.success).toBe(true);
      expect(arrResult.result).toBe('[1, 2, 3]');
    });
  });

  describe('Arithmetic', () => {
    test('should perform basic arithmetic', () => {
      const addResult = parser.evaluate('5 + 3');
      expect(addResult.success).toBe(true);
      expect(addResult.result).toBe('8');

      const subResult = parser.evaluate('5 - 3');
      expect(subResult.success).toBe(true);
      expect(subResult.result).toBe('2');

      const mulResult = parser.evaluate('5 * 3');
      expect(mulResult.success).toBe(true);
      expect(mulResult.result).toBe('15');

      const divResult = parser.evaluate('6 / 3');
      expect(divResult.success).toBe(true);
      expect(divResult.result).toBe('2');
    });

    test('should respect operator precedence', () => {
      const noParenResult = parser.evaluate('2 + 3 * 4');
      expect(noParenResult.success).toBe(true);
      expect(noParenResult.result).toBe('14');

      const parenResult = parser.evaluate('(2 + 3) * 4');
      expect(parenResult.success).toBe(true);
      expect(parenResult.result).toBe('20');
    });

    test('should handle variables in arithmetic', () => {
      parser.evaluate('x = 10');

      const result = parser.evaluate('x + 5');
      expect(result.success).toBe(true);
      expect(result.result).toBe('15');
    });

    test('should handle negative numbers', () => {
      const result = parser.evaluate('-5');
      expect(result.success).toBe(true);
      expect(result.result).toBe('-5');
    });

    test('should handle decimal numbers', () => {
      const result = parser.evaluate('3.14');
      expect(result.success).toBe(true);
      expect(result.result).toBe('3.14');
    });
  });

  describe('Comparisons', () => {
    test('should evaluate equality', () => {
      const trueResult = parser.evaluate('5 == 5');
      expect(trueResult.success).toBe(true);
      expect(trueResult.result).toBe('True');

      const falseResult = parser.evaluate('5 == 6');
      expect(falseResult.success).toBe(true);
      expect(falseResult.result).toBe('False');
    });

    test('should evaluate inequality', () => {
      const trueResult = parser.evaluate('5 != 6');
      expect(trueResult.success).toBe(true);
      expect(trueResult.result).toBe('True');

      const falseResult = parser.evaluate('5 != 5');
      expect(falseResult.success).toBe(true);
      expect(falseResult.result).toBe('False');
    });

    test('should evaluate greater than', () => {
      const trueResult = parser.evaluate('5 > 3');
      expect(trueResult.success).toBe(true);
      expect(trueResult.result).toBe('True');

      const falseResult = parser.evaluate('3 > 5');
      expect(falseResult.success).toBe(true);
      expect(falseResult.result).toBe('False');
    });

    test('should evaluate less than', () => {
      const trueResult = parser.evaluate('3 < 5');
      expect(trueResult.success).toBe(true);
      expect(trueResult.result).toBe('True');

      const falseResult = parser.evaluate('5 < 3');
      expect(falseResult.success).toBe(true);
      expect(falseResult.result).toBe('False');
    });

    test('should evaluate greater than or equal', () => {
      const trueResult = parser.evaluate('5 >= 5');
      expect(trueResult.success).toBe(true);
      expect(trueResult.result).toBe('True');

      const falseResult = parser.evaluate('3 >= 5');
      expect(falseResult.success).toBe(true);
      expect(falseResult.result).toBe('False');
    });

    test('should evaluate less than or equal', () => {
      const trueResult = parser.evaluate('5 <= 5');
      expect(trueResult.success).toBe(true);
      expect(trueResult.result).toBe('True');

      const falseResult = parser.evaluate('5 <= 3');
      expect(falseResult.success).toBe(true);
      expect(falseResult.result).toBe('False');
    });

    test('should compare strings', () => {
      const result = parser.evaluate('"abc" == "abc"');
      expect(result.success).toBe(true);
      expect(result.result).toBe('True');
    });
  });

  describe('Logical Operations', () => {
    test('should evaluate logical AND', () => {
      const trueResult = parser.evaluate('true && true');
      expect(trueResult.success).toBe(true);
      expect(trueResult.result).toBe('True');

      const falseResult = parser.evaluate('true && false');
      expect(falseResult.success).toBe(true);
      expect(falseResult.result).toBe('False');
    });

    test('should evaluate logical OR', () => {
      const trueResult = parser.evaluate('true || false');
      expect(trueResult.success).toBe(true);
      expect(trueResult.result).toBe('True');

      const falseResult = parser.evaluate('false || false');
      expect(falseResult.success).toBe(true);
      expect(falseResult.result).toBe('False');
    });

    test('should evaluate logical NOT', () => {
      const notFalseResult = parser.evaluate('!false');
      expect(notFalseResult.success).toBe(true);
      expect(notFalseResult.result).toBe('True');

      const notTrueResult = parser.evaluate('!true');
      expect(notTrueResult.success).toBe(true);
      expect(notTrueResult.result).toBe('False');

      const wordNotFalseResult = parser.evaluate('not false');
      expect(wordNotFalseResult.success).toBe(true);
      expect(wordNotFalseResult.result).toBe('True');

      const wordNotTrueResult = parser.evaluate('not true');
      expect(wordNotTrueResult.success).toBe(true);
      expect(wordNotTrueResult.result).toBe('False');
    });

    test('should evaluate complex logical expressions', () => {
      const result = parser.evaluate('(5 > 3) && (2 < 4)');
      expect(result.success).toBe(true);
      expect(result.result).toBe('True');
    });
  });

  describe('Array Access', () => {
    test('should access array elements', () => {
      const result = parser.evaluate('myCollection[0]');
      expect(result.success).toBe(true);
      expect(result.result).toBe('1');
    });

    test('should access elements of array variables', () => {
      parser.evaluate('arr = [1, 2, 3]');

      const result = parser.evaluate('arr[1]');
      expect(result.success).toBe(true);
      expect(result.result).toBe('2');
    });

    test('should handle array access in arithmetic', () => {
      const result = parser.evaluate('myCollection[0] + 2');
      expect(result.success).toBe(true);
      expect(result.result).toBe('3');
    });

    test('should handle array access in comparisons', () => {
      const result = parser.evaluate('myCollection[1] > myCollection[0]');
      expect(result.success).toBe(true);
      expect(result.result).toBe('True');
    });
  });

  describe('Functions', () => {
    test('should evaluate len function', () => {
      const strResult = parser.evaluate('len("hello")');
      expect(strResult.success).toBe(true);
      expect(strResult.result).toBe('5');

      const arrResult = parser.evaluate('len(myCollection)');
      expect(arrResult.success).toBe(true);
      expect(arrResult.result).toBe('3');
    });

    test('should evaluate contains function', () => {
      const strResult = parser.evaluate('contains("hello world", "world")');
      expect(strResult.success).toBe(true);
      expect(strResult.result).toBe('True');

      const arrResult = parser.evaluate('contains(myCollection, 2)');
      expect(arrResult.success).toBe(true);
      expect(arrResult.result).toBe('True');
    });

    test('should evaluate string functions', () => {
      const startsWithResult = parser.evaluate('startsWith("hello", "he")');
      expect(startsWithResult.success).toBe(true);
      expect(startsWithResult.result).toBe('True');

      const endsWithResult = parser.evaluate('endsWith("hello", "lo")');
      expect(endsWithResult.success).toBe(true);
      expect(endsWithResult.result).toBe('True');

      const substringResult = parser.evaluate('substring("hello", 1, 3)');
      expect(substringResult.success).toBe(true);
      expect(substringResult.result).toBe('"el"');

      const isEmptyFalseResult = parser.evaluate('isEmpty("hello")');
      expect(isEmptyFalseResult.success).toBe(true);
      expect(isEmptyFalseResult.result).toBe('False');

      const isEmptyTrueResult = parser.evaluate('isEmpty("")');
      expect(isEmptyTrueResult.success).toBe(true);
      expect(isEmptyTrueResult.result).toBe('True');
    });

    test('should evaluate matches function', () => {
      const result = parser.evaluate('matches("Hello", "^H.*o$")');
      expect(result.success).toBe(true);
      expect(result.result).toBe('True');
    });

    test('should evaluate collection functions', () => {
      const result = parser.evaluate('filter(myCollection, {@it > 1})');
      expect(result.success).toBe(true);
      expect(result.result).toBe('[2, 3]');
    });

    test('should evaluate nested function calls', () => {
      const result = parser.evaluate('len(filter(myCollection, {@it > 1}))');
      expect(result.success).toBe(true);
      expect(result.result).toBe('2');
    });

    test('should evaluate complex nested function calls with multiple levels', () => {
      parser.evaluate('numbers = [1, 2, 3, 4, 5, 6]');
      parser.evaluate('words = ["hello", "world", "test"]');

      const result = parser.evaluate('len(filter(numbers, {@it > len(filter(words, {len(@it) > 4}))}))');
      expect(result.success).toBe(true);
      expect(result.result).toBe('4');
    });
  });

  describe('Multi-Statement Expressions', () => {
    test('should evaluate multiple statements', () => {
      const result = parser.evaluate('x = 5; y = 10; x + y');
      expect(result.success).toBe(true);
      expect(result.result).toBe('15');
    });

    test('should handle arrays in multi-statements', () => {
      const result = parser.evaluate('a = [1, 2]; a[0] + a[1]');
      expect(result.success).toBe(true);
      expect(result.result).toBe('3');
    });

    test('should handle functions in multi-statements', () => {
      const result = parser.evaluate('str = "hello"; len(str)');
      expect(result.success).toBe(true);
      expect(result.result).toBe('5');
    });
  });

  describe('Parenthesized Expressions', () => {
    test('should evaluate simple parenthesized expressions', () => {
      const result = parser.evaluate('(2 + 3)');
      expect(result.success).toBe(true);
      expect(result.result).toBe('5');
    });

    test('should respect operator precedence with parentheses', () => {
      const result = parser.evaluate('(2 + 3) * 4');
      expect(result.success).toBe(true);
      expect(result.result).toBe('20');
    });
  });

  describe('Complex Logical Expressions', () => {
    test('should evaluate complex logical expressions', () => {
      const result = parser.evaluate('(5 > 3) && (2 < 4)');
      expect(result.success).toBe(true);
      expect(result.result).toBe('True');
    });
  });

  describe('Simple Tests', () => {
    test('should evaluate expressions with variables', () => {
      const result1 = parser.evaluate('x = 10');
      expect(result1.success).toBe(true);

      const result2 = parser.evaluate('x + 5');
      expect(result2.success).toBe(true);
      expect(result2.result).toBe('15');
    });

    test('should handle multi-statement expressions', () => {
      const result = parser.evaluate('x = 5; x + 2');
      expect(result.success).toBe(true);
      expect(result.result).toBe('7');
    });

    test('should handle array access in arithmetic expressions', () => {
      const result = parser.evaluate('myCollection[0] + 2');
      expect(result.success).toBe(true);
      expect(result.result).toBe('3');
    });
  });

  describe('Operator precedence tests', () => {
    test('should respect operator precedence in arithmetic expressions', () => {
      const parser = new ExpressionLanguageParser();

      // Test multiplication before addition
      const result1 = parser.evaluate('2 + 3 * 4');
      expect(result1.success).toBe(true);
      expect(result1.result).toBe('14');

      // Test division before addition
      const result2 = parser.evaluate('2 + 8 / 4');
      expect(result2.success).toBe(true);
      expect(result2.result).toBe('4');

      // Test multiplication before subtraction
      const result3 = parser.evaluate('10 - 2 * 3');
      expect(result3.success).toBe(true);
      expect(result3.result).toBe('4');

      // Test complex expression with multiple operators
      const result4 = parser.evaluate('2 + 3 * 4 - 6 / 2');
      expect(result4.success).toBe(true);
      expect(result4.result).toBe('11');
    });

    test('should respect simple parentheses', () => {
      const parser = new ExpressionLanguageParser();

      // Test parentheses overriding precedence
      const result1 = parser.evaluate('(2 + 3) * 4');
      expect(result1.success).toBe(true);
      expect(result1.result).toBe('20');
    });
  });

  describe('String comparison format tests', () => {
    test('should return "True" and "False" for string comparisons', () => {
      const parser = new ExpressionLanguageParser();

      // Test equality
      const result1 = parser.evaluate('"hello" == "hello"');
      expect(result1.success).toBe(true);
      expect(result1.result).toBe('True');

      // Test inequality
      const result2 = parser.evaluate('"hello" != "world"');
      expect(result2.success).toBe(true);
      expect(result2.result).toBe('True');

      // Test false equality
      const result3 = parser.evaluate('"hello" == "world"');
      expect(result3.success).toBe(true);
      expect(result3.result).toBe('False');
    });
  });

  describe('Collection function tests', () => {
    test('should correctly evaluate filter function', () => {
      const parser = new ExpressionLanguageParser();
      parser.evaluate('myCollection = [1, 2, 3, 4, 5]');

      // Test filter with greater than
      const result1 = parser.evaluate('filter(myCollection, {@it > 3})');
      expect(result1.success).toBe(true);
      expect(result1.result).toBe('[4, 5]');

      // Test filter with equality
      const result2 = parser.evaluate('filter(myCollection, {@it == 3})');
      expect(result2.success).toBe(true);
      expect(result2.result).toBe('[3]');
    });

    test('should correctly evaluate all function', () => {
      const parser = new ExpressionLanguageParser();
      parser.evaluate('myCollection = [1, 2, 3, 4, 5]');

      // Test all with true condition
      const result1 = parser.evaluate('all(myCollection, {@it > 0})');
      expect(result1.success).toBe(true);
      expect(result1.result).toBe('True');

      // Test all with false condition
      const result2 = parser.evaluate('all(myCollection, {@it > 3})');
      expect(result2.success).toBe(true);
      expect(result2.result).toBe('False');
    });

    test('should correctly evaluate any function', () => {
      const parser = new ExpressionLanguageParser();
      parser.evaluate('myCollection = [1, 2, 3, 4, 5]');

      // Test any with true condition
      const result1 = parser.evaluate('any(myCollection, {@it > 4})');
      expect(result1.success).toBe(true);
      expect(result1.result).toBe('True');

      // Test any with false condition
      const result2 = parser.evaluate('any(myCollection, {@it > 5})');
      expect(result2.success).toBe(true);
      expect(result2.result).toBe('False');
    });

    test('should handle empty collections in collection functions', () => {
      const parser = new ExpressionLanguageParser();
      parser.evaluate('emptyCollection = []');

      // Test filter with empty collection
      const result1 = parser.evaluate('filter(emptyCollection, {@it > 0})');
      expect(result1.success).toBe(true);
      expect(result1.result).toBe('[]');

      // Test all with empty collection (should be true by definition)
      const result2 = parser.evaluate('all(emptyCollection, {@it > 0})');
      expect(result2.success).toBe(true);
      expect(result2.result).toBe('True');

      // Test any with empty collection (should be false by definition)
      const result3 = parser.evaluate('any(emptyCollection, {@it > 0})');
      expect(result3.success).toBe(true);
      expect(result3.result).toBe('False');
    });

    test('should handle invalid predicate formats in collection functions', () => {
      const parser = new ExpressionLanguageParser();
      parser.evaluate('myCollection = [1, 2, 3]');

      // Test missing curly braces
      const result1 = parser.evaluate('filter(myCollection, @it > 0)');
      expect(result1.success).toBe(false);

      // Test empty predicate
      const result2 = parser.evaluate('filter(myCollection, {})');
      expect(result2.success).toBe(false);
    });

    test('should reject assignments in filter predicates', () => {
      const parser = new ExpressionLanguageParser();
      parser.evaluate('myCollection = [1, 2, 3]');
      parser.evaluate('x = {"a": 2, "b": 1, "c": 3}');

      // Test assignment in array filter predicate
      const result1 = parser.evaluate('filter(myCollection, {@it = 2})');
      expect(result1.success).toBe(false);
      expect(result1.error).toContain('Assignment not allowed in predicate');

      // Test assignment in dictionary filter predicate with @key
      const result2 = parser.evaluate('filter(x, {@key = "a"})');
      expect(result2.success).toBe(false);
      expect(result2.error).toContain('Assignment not allowed in predicate');

      // Test assignment in dictionary filter predicate with @value
      const result3 = parser.evaluate('filter(x, {@value = 2})');
      expect(result3.success).toBe(false);
      expect(result3.error).toContain('Assignment not allowed in predicate');
    });

    // New test for nested function calls within predicates
    test('should support nested function calls within predicates', () => {
      const parser = new ExpressionLanguageParser();
      parser.evaluate('stringsCollection = ["apple", "banana", "cherry", "date"]');

      // Test filter with startsWith function in the predicate
      const result1 = parser.evaluate('filter(stringsCollection, {startsWith(@it, "a")})');
      expect(result1.success).toBe(true);
      expect(result1.result).toBe('["apple"]');

      // Test filter with multiple nested functions
      const result2 = parser.evaluate('filter(stringsCollection, {startsWith(@it, substring("apple", 0, 1))})');
      expect(result2.success).toBe(true);
      expect(result2.result).toBe('["apple"]');

      // Test with deeply nested functions
      parser.evaluate('nestedCollection = [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]');
      const result3 = parser.evaluate('filter(nestedCollection, {startsWith(@it["name"], "J") && @it["age"] > 25})');
      expect(result3.success).toBe(true);
      expect(result3.result).toBe('[{"age": 30, "name": "John"}]');

      // More complex nested scenarios
      parser.evaluate('words = ["hello", "world", "test", "example"]');

      // Test with nested filter inside another filter
      const result4 = parser.evaluate('filter(filter(words, {len(@it) > 4}), {startsWith(@it, "h")})');
      expect(result4.success).toBe(true);
      expect(result4.result).toBe('["hello"]');

      // Test with deeply nested function calls in predicate
      parser.evaluate('numbers = [1, 2, 3, 4, 5]');
      const result5 = parser.evaluate('filter(numbers, {@it > len(filter(words, {startsWith(@it, "t")}))})');
      expect(result5.success).toBe(true);
      expect(result5.result).toBe('[2, 3, 4, 5]');

      // Test with extremely complex nesting
      parser.evaluate('users = [{"name": "Alice", "tags": ["admin", "user"]}, {"name": "Bob", "tags": ["user"]}]');
      const result6 = parser.evaluate('filter(users, {any(@it["tags"], {startsWith(@it, "a")})})');
      expect(result6.success).toBe(true);
      expect(result6.result).toBe('[{"name": "Alice", "tags": ["admin", "user"]}]');
    });
  });

  describe('Edge case tests', () => {
    test('should handle simple comparison expressions correctly', () => {
      const parser = new ExpressionLanguageParser();

      // Test simple comparison
      const result1 = parser.evaluate('5 > 3');
      expect(result1.success).toBe(true);
      expect(result1.result).toBe('True');

      // Test nested function calls
      const result2 = parser.evaluate('len(substring("hello world", 0, 5))');
      expect(result2.success).toBe(true);
      expect(result2.result).toBe('5');
    });

    test('should handle division by zero', () => {
      const parser = new ExpressionLanguageParser();

      const result = parser.evaluate('5 / 0');
      expect(result.success).toBe(false);
      expect(result.error).toContain('Division by zero');
    });

    test('should handle variable access in complex expressions', () => {
      const parser = new ExpressionLanguageParser();
      parser.evaluate('x = 5');
      parser.evaluate('y = 10');

      const result = parser.evaluate('x * 2 + y');
      expect(result.success).toBe(true);
      expect(result.result).toBe('20');
    });
  });

  describe('Error handling tests', () => {
    test('should handle invalid expressions gracefully', () => {
      const parser = new ExpressionLanguageParser();

      // Test invalid arithmetic expression
      const result1 = parser.evaluate('2 + * 3');
      expect(result1.success).toBe(false);

      // Test unmatched parentheses
      const result2 = parser.evaluate('(2 + 3');
      expect(result2.success).toBe(false);

      // Test invalid function call
      const result3 = parser.evaluate('unknownFunction(123)');
      expect(result3.success).toBe(false);
    });

    test('should handle empty expressions', () => {
      const parser = new ExpressionLanguageParser();

      // Test empty expression
      const result = parser.evaluate('');
      expect(result.success).toBe(false);
    });
  });

  describe('Multiple statement tests', () => {
    test('should handle multiple statements separated by semicolons', () => {
      const parser = new ExpressionLanguageParser();

      // Test multiple statements
      const result = parser.evaluate('x = 5; y = 10; x + y');
      expect(result.success).toBe(true);
      expect(result.result).toBe('15');
    });
  });

  describe('Variable assignment and access tests', () => {
    test('should handle variable assignment and access', () => {
      const parser = new ExpressionLanguageParser();

      // Test variable assignment
      const result1 = parser.evaluate('myVar = 42');
      expect(result1.success).toBe(true);

      // Test variable access
      const result2 = parser.evaluate('myVar');
      expect(result2.success).toBe(true);
      expect(result2.result).toBe('42');

      // Test variable reassignment
      const result3 = parser.evaluate('myVar = "hello"');
      expect(result3.success).toBe(true);

      // Test variable access after reassignment
      const result4 = parser.evaluate('myVar');
      expect(result4.success).toBe(true);
      expect(result4.result).toBe('"hello"');
    });
  });

  describe('Dictionary support tests', () => {
    test('should evaluate dictionary literals', () => {
      const parser = new ExpressionLanguageParser();

      // Test simple dictionary
      const result1 = parser.evaluate('{"a": 2, "b": 3}');
      expect(result1.success).toBe(true);
      expect(result1.result).toBe('{"a": 2, "b": 3}');

      // Test dictionary with mixed key types
      const result2 = parser.evaluate('{"a": 2, 5: 2, "c": true}');
      expect(result2.success).toBe(true);
      expect(result2.result).toBe('{"5": 2, "a": 2, "c": True}');
    });

    test('should assign and access dictionaries', () => {
      const parser = new ExpressionLanguageParser();

      // Test dictionary assignment
      const assignResult = parser.evaluate('x = {"a": 2, "b": 3}');
      expect(assignResult.success).toBe(true);
      expect(assignResult.result).toBe('{"a": 2, "b": 3}');

      // Test dictionary access
      const accessResult = parser.evaluate('x');
      expect(accessResult.success).toBe(true);
      expect(accessResult.result).toBe('{"a": 2, "b": 3}');
    });

    test('should access dictionary values by key', () => {
      const parser = new ExpressionLanguageParser();
      parser.evaluate('x = {"a": 2, "b": 3, "c": true}');

      // Test accessing by string key
      const result1 = parser.evaluate('x["a"]');
      expect(result1.success).toBe(true);
      expect(result1.result).toBe('2');

      // Test accessing by numeric key
      parser.evaluate('y = {5: 10, 10: 20}');
      const result2 = parser.evaluate('y[5]');
      expect(result2.success).toBe(true);
      expect(result2.result).toBe('10');
    });

    test('should handle dictionary values in expressions', () => {
      const parser = new ExpressionLanguageParser();
      parser.evaluate('x = {"a": 2, "b": 3}');

      // Test using dictionary value in arithmetic
      const result = parser.evaluate('x["a"] + 5');
      expect(result.success).toBe(true);
      expect(result.result).toBe('7');
    });

    test('should filter dictionaries with key and value variables', () => {
      const parser = new ExpressionLanguageParser();
      parser.evaluate('x = {"a": 2, "b": 1, "c": 3}');

      // Test filter with value condition
      const result1 = parser.evaluate('filter(x, {@value > 1})');
      expect(result1.success).toBe(true);
      expect(result1.result).toBe('{"a": 2, "c": 3}');

      // Test filter with key condition
      const result2 = parser.evaluate('filter(x, {@key == "a"})');
      expect(result2.success).toBe(true);
      expect(result2.result).toBe('{"a": 2}');

      // Test filter with both key and value
      const result3 = parser.evaluate('filter(x, {@key == "c" || @value == 3})');
      expect(result3.success).toBe(true);
      expect(result3.result).toBe('{"c": 3}');
    });

    test('should handle any and all functions with dictionaries', () => {
      const parser = new ExpressionLanguageParser();
      parser.evaluate('x = {"a": 2, "b": 1, "c": 3}');

      // Test any with value condition
      const result1 = parser.evaluate('any(x, {@value > 2})');
      expect(result1.success).toBe(true);
      expect(result1.result).toBe('True');

      // Test all with value condition
      const result2 = parser.evaluate('all(x, {@value > 0})');
      expect(result2.success).toBe(true);
      expect(result2.result).toBe('True');

      // Test all with false condition
      const result3 = parser.evaluate('all(x, {@value > 2})');
      expect(result3.success).toBe(true);
      expect(result3.result).toBe('False');
    });

    test('should handle len function with dictionaries', () => {
      const parser = new ExpressionLanguageParser();
      parser.evaluate('x = {"a": 2, "b": 3, "c": 4}');

      const result = parser.evaluate('len(x)');
      expect(result.success).toBe(true);
      expect(result.result).toBe('3');
    });

    test('should handle isEmpty function with dictionaries', () => {
      const parser = new ExpressionLanguageParser();
      parser.evaluate('emptyDict = {}');
      parser.evaluate('nonEmptyDict = {"a": 1}');

      const result1 = parser.evaluate('isEmpty(emptyDict)');
      expect(result1.success).toBe(true);
      expect(result1.result).toBe('True');

      const result2 = parser.evaluate('isEmpty(nonEmptyDict)');
      expect(result2.success).toBe(true);
      expect(result2.result).toBe('False');
    });
  });

  describe('Simulator Mode', () => {
    let parser;

    beforeEach(() => {
      // Create a parser in simulator mode
      parser = new ExpressionLanguageParser({ simulatorMode: true });
    });

    test('should reject variable assignments in simulator mode', () => {
      const result = parser.evaluate('x = 5');
      expect(result.success).toBe(false);
      expect(result.error).toContain('Variable assignments are not allowed');
    });

    test('should reject multiple statements in simulator mode', () => {
      const result = parser.evaluate('x = 5; y = 10');
      expect(result.success).toBe(false);
      expect(result.error).toContain('Multiple statements are not allowed');
    });

    test('should allow valid expressions in simulator mode', () => {
      const result = parser.evaluate('5 + 3');
      expect(result.success).toBe(true);
      expect(result.result).toBe('8');
    });

    test('should allow function calls in simulator mode', () => {
      const result = parser.evaluate('len("hello")');
      expect(result.success).toBe(true);
      expect(result.result).toBe('5');
    });

    test('should allow array access in simulator mode', () => {
      const result = parser.evaluate('mySequence[0]');
      expect(result.success).toBe(true);
      expect(result.result).toBe('1');
    });

    test('should allow complex expressions in simulator mode', () => {
      const result = parser.evaluate('(5 > 3) && (2 < 4)');
      expect(result.success).toBe(true);
      expect(result.result).toBe('True');
    });
  });
});
