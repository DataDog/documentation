---
title: Dynamic Instrumentation Expression Language
private: false
---

## Overview

The Dynamic Instrumentation Expression Language helps you formulate log probe message templates, metric probe expressions, span tag values, and probe conditions. It borrows syntax elements from common programming languages, but also has its own unique rules. The language lets you access local variables, method parameters, and nested fields within objects, and it supports the use of comparison and logical operators.

For example, you can create a histogram from the size of a collection using `count(myCollection)` as the metric expression. Metric expressions must evaluate to a number.

In log templates and tag values, expressions are delimited from the static parts of the template with brackets, for example: `User name is {user.name}`. Log template expressions can evaluate to any value. If evaluating the expression fails, it is replaced with `UNDEFINED`.

Probe conditions must evaluate to a Boolean, for example: `startsWith(user.name, "abc")`, `len(str) > 20` or `a == b`.

Generally, the Expression Language supports:
* Accessing local variables, method parameters, and deeply nested fields and attributes within objects.
* Using comparison operators (`<`, `>`, `>=`, `<=`, `==`, `!=`, `instanceof`) to compare variables, fields, and constants in your conditions, for example: `localVar1.field1.field2 != 15`.
* Using logical operators (`&&`, `||`, and `not` or `!`) to build complex Boolean conditions.
* Using the `null` literal (equivalent to `nil` in Python).

It does **not** support:
* Calling methods. Dynamic Instrumentation does not permit executing code that may have side effects. However, you can access `private` fields directly.
* Other native programming language syntax beyond what is described on this page.

Try the [autocomplete and search open beta][6] for an improved user experience using the Expression Language.

The following sections summarize the variables and operations that the Dynamic Instrumentation Expression Language supports.

## Contextual variables

| Keyword     | Description                                                                |
|-------------|----------------------------------------------------------------------------|
| `@return`   | Provides access to the return value                                        |
| `@duration` | Provides access to the call execution duration                             |
| `@it`       | Provides access to the current value in collection iterating operations    |
| `@exception`| Provides access to the current uncaught exception                          |


## String operations

| Operation | Description | Example |
|-----------|-------------|---------|
| `isEmpty(value_src)` | Checks for presence of data. For strings, it is equivalent to `len(str) == 0`. For collections, it is equivalent to `count(myCollection) == 0` | `isEmpty("Hello")` -> `False` |
| `len(value_src)` | Gets the string length. | `len("Hello")` -> `5` |
| `substring(value_src, startIndex, endIndex)` | Gets a substring. | `substring("Hello", 0, 2)` -> `"He"` |
| `startsWith(value_src, string_literal)` | Checks whether a string starts with the given string literal. | `startsWith("Hello", "He")` -> `True` |
| `endsWith(value_src, string_literal)` | Checks whether the string ends with the given string literal. | `endsWith("Hello", "lo")` -> `True` |
| `contains(value_src, string_literal)` | Checks whether the string contains the string literal. | `contains("Hello", "ll")` -> `True` |
| `matches(value_src, string_literal)` | Checks whether the string matches the regular expression provided as a string literal. | `matches("Hello", "^H.*o$")` -> `True` |

## Collection operations

The following examples use a variable named `myCollection` defined as `[1,2,3]`:

| Operation | Description | Example |
|-----------|-------------|---------|
| `any(value_src, {predicate})` | Checks if there is at least one element in the collection that satisfies the given predicate. The current element is accessed with the `@it` reference. | `any(myCollection, @it > 2)` -> `True` |
| `all(value_src, {predicate})` | Checks whether every element in a collection satisfies the specified predicate. The current element is accessed with the `@it` reference. | `all(myCollection, @it < 4)` -> `True` |
| `filter(value_src, {predicate})` | Filters the elements of the collection using the predicate. The current element is accessed with the `@it` reference. | `filter(myCollection, @it > 1)` -> `[2,3]` |
| `len(value_src)` | Gets the collection size. | `len(myCollection)` -> `3` |
| `[ n ]` | For collections, returns the nth item in the collection. For maps and dictionaries, returns the value that corresponds to the key `n`. If the item does not exist, the expression yields an error. | `myCollection[1]` -> `2` |

[1]: /metrics/types/?tab=count#metric-types
[2]: /metrics/types/?tab=gauge#metric-types
[3]: /metrics/types/?tab=histogram#metric-types
[4]: /tracing/trace_collection/custom_instrumentation/java/#adding-spans
[5]: /tracing/trace_collection/custom_instrumentation/java/#adding-tags
[6]: /dynamic_instrumentation/symdb/
