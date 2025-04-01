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

Try [autocomplete and search (in Preview)][6] for an improved user experience using the Expression Language.

The following sections summarize the variables and operations that the Dynamic Instrumentation Expression Language supports.

## Contextual variables

The Expression Language provides contextual variables for different instrumentation scenarios: method instrumentation variables (`@return`, `@duration`, `@exception`) are available only when instrumenting entire methods, while collection and dictionary variables (`@it`, `@key`, `@value`) are available only within predicate expressions for filtering and transforming collections.

| Keyword     | Description                                                                |
|-------------|----------------------------------------------------------------------------|
| `@return`   | Provides access to the method return value |
| `@duration` | Provides access to the method call execution duration |
| `@exception`| Provides access to the exception thrown within the method (only available if an uncaught exception exists) |
| `@it`       | Provides access to the current element during collection iteration. Used in predicates for list operations. |
| `@key`      | Provides access to the current key during dictionary iteration. Used in predicates for dictionary operations. |
| `@value`    | Provides access to the current value during dictionary iteration. Used in predicates for dictionary operations. |

## String operations

| Operation | Description | Example |
|-----------|-------------|---------|
| `isEmpty(value_src)` | Checks for presence of data. For strings, it is equivalent to `len(str) == 0`. For collections, it is equivalent to `count(myCollection) == 0` | {{< expression-language-evaluator expression="isEmpty(\"Hello\")" >}} |
| `len(value_src)` | Gets the string length. | {{< expression-language-evaluator expression="len(\"Hello\")" >}} |
| `substring(value_src, startIndex, endIndex)` | Gets a substring. | {{< expression-language-evaluator expression="substring(\"Hello\", 0, 2)" >}} |
| `startsWith(value_src, string_literal)` | Checks whether a string starts with the given string literal. | {{< expression-language-evaluator expression="startsWith(\"Hello\", \"He\")" >}} |
| `endsWith(value_src, string_literal)` | Checks whether the string ends with the given string literal. | {{< expression-language-evaluator expression="endsWith(\"Hello\", \"lo\")" >}} |
| `contains(value_src, string_literal)` | Checks whether the string contains the string literal. | {{< expression-language-evaluator expression="contains(\"Hello\", \"ll\")" >}} |
| `matches(value_src, string_literal)` | Checks whether the string matches the regular expression provided as a string literal. | {{< expression-language-evaluator expression="matches(\"Hello\", \"^H.*o$\")" >}} |

## Collection operations

When working with collections (lists, maps, etc.), you can use contextual variables in predicates to access elements during iteration. See the [Contextual variables](#contextual-variables) section for details.

The following examples use a variable named `myCollection` defined as `[1,2,3]`:

| Operation | Description | Example |
|-----------|-------------|---------|
| `any(value_src, {predicate})` | Checks if there is at least one element in the collection that satisfies the given predicate. The current element is accessed with the `@it` reference. | {{< expression-language-evaluator expression="any(myCollection, {@it > 2})" >}} |
| `all(value_src, {predicate})` | Checks whether every element in a collection satisfies the specified predicate. The current element is accessed with the `@it` reference. | {{< expression-language-evaluator expression="all(myCollection, {@it < 4})" >}} |
| `filter(value_src, {predicate})` | Filters the elements of the collection using the predicate. The current element is accessed with the `@it` reference. | {{< expression-language-evaluator expression="filter(myCollection, {@it > 1})" >}} |
| `len(value_src)` | Gets the collection size. | {{< expression-language-evaluator expression="len(myCollection)" >}} |
| `[ n ]` | For collections, returns the nth item in the collection. For maps and dictionaries, returns the value that corresponds to the key `n`. If the item does not exist, the expression yields an error. | {{< expression-language-evaluator expression="myCollection[1]" >}} |

## Try It Out

This interactive simulator helps you experiment with the Expression Language syntax in a realistic environment. It shows how conditions affect whether a log line will be generated when instrumenting a method.

Enter an expression in the "when" field and click "SIMULATE" to see if the log would be generated based on your condition.

Available variables in this example:

- `loops`: The route parameter hardcoded to `5`
- `a`: An array of integers `[6, 7, 8, 9, 10]`
- `b`: A dictionary/object `{"a": 1, "b": 2, "c": 3}`
- `c`: A string `"hello world"`
- `i`: The current loop iteration index

{{< expression-language-simulator >}}
