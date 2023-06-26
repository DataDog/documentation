---
title: Dynamic Instrumentation Expression Language
kind: documentation
private: false
---

The Dynamic Instrumentation Expression Language is a language that's designed to handle tasks such as formulating log probe message templates, metric probe expressions, span tag values, and probe conditions. It borrows syntax elements from common programming languages, but stands as its own entity with unique rules. The language allows for the accessing of local variables, method parameters, and nested fields within objects, and supports the use of comparison and logical operators. 

For example, you can create a histogram from the size of a collection using `count(myCollection)` as the metric expression. Metric expressions must evaluate to a number.

In log templates and tag values, expressions are delimited from the static parts of the template with brackets, for example: `User name is {user.name}`. Log template expressions can evaluate to any value. If evaluating the expression fails, it is replaced with `UNDEFINED`.

Probe conditions must evaluate to a Boolean, for example: `startsWith(user.name, "abc")`, `len(str) > 20` or `a == b`.

Some general guidelines on what the Expression Language supports:
* You CAN access local variables, method parameters, and deeply nested fields/attributes within objects
* You CAN use comparison operators (`<`, `>`, `>=`, `<=`, `==`, `!=`) to compare variables, fields, and constants in your conditions, as shown in the example `localVar1.field1.field2 != 15.`
* You CAN use logical operators (`&&`, `||`, and `not` or `!`) to build complex Boolean conditions.
* You CAN use the `null` literal (equivalent of `nil` in Python)
* You CANNOT call methods, as Dynamic Instrumentation does not allow users to execute code that may have side effects.
* You CANNOT use syntax that is used in your native programming language if it does not appear in this document. While the Dynamic Instrumentation Expression Language includes many constructs that appear in popular programming language, it is its own language with syntax.

The following sections summarize the different variables and operations that the Dynamic Instrumentation Expression Language supports.

### Contextual variables

| Keyword  | Description                                                                 |
|--------- |----------------------------------------------------------------------------|
| @return  | Provides access to the return value                                        |
| @duration| Provides access to the call execution duration                              |
| @it      | Provides access to the current value in collection iterating operations     |


### String operations

| Operation | Description | Example |
|-----------|-------------|---------|
| `isEmpty(value_src)` | Check for presence of data. For strings, it is equivalent to `len(str) == 0`. For collections, it is equivalent to `count(myCollection) == 0` | `isEmpty("Hello")` -> `False` |
| `len(value_src)` | Get the string length. | `len("Hello")` -> `5` |
| `substring(value_src, startIndex, endIndex)` | Get a substring. | `substring("Hello", 0, 2)` -> `"He"` |
| `startsWith(value_src, string_literal)` | Check whether a string starts with the given string literal. | `startsWith("Hello", "He")` -> `True` |
| `endsWith(value_src, string_literal)` | Check whether the string ends with the given string literal. | `endsWith("Hello", "lo")` -> `True` |
| `contains(value_src, string_literal)` | Check whether the string contains the string literal. | `contains("Hello", "ll")` -> `True` |
| `matches(value_src, string_literal)` | Check whether the string matches the regular expression provided as a string literal. | `matches("Hello", "^H.*o$")` -> `True` |

### Collection operations

Assuming a variable named `myCollection` is defined as `[1,2,3]`:


| Operation | Description | Example |
|-----------|-------------|---------|
| `any(value_src, {predicate})` | Check if there is at least one element in the collection that satisfies the given predicate. The current element is accessed as `@it` reference. | `any(myCollection, @it > 2)` -> `True` |
| `all(value_src, {predicate})` | Checks whether every element in a collection satisfies the specified predicate. The current element is accessed as `@it` reference. | `all(myCollection, @it < 4)` -> `True` |
| `filter(value_src, {predicate})` | Filters the elements of the collection using the predicate. The current element is accessed as `@it` reference. | `filter(myCollection, @it > 1)` -> `[2,3]` |
| `len(value_src)` | Get the collection size. | `len(myCollection)` -> `3` |
| `[ n ]` | For collections, returns the nth item in the collection. For maps/dictionaries, returns the value that corresponds to the key `n`. If the item does not exist, the expression yields an error. | `myCollection[1]` -> `2` |

[1]: /metrics/types/?tab=count#metric-types
[2]: /metrics/types/?tab=gauge#metric-types
[3]: /metrics/types/?tab=histogram#metric-types
[4]: /tracing/trace_collection/custom_instrumentation/java/#adding-spans
[5]: /tracing/trace_collection/custom_instrumentation/java/#adding-tags