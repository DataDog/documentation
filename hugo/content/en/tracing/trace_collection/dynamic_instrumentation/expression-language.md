---
title: Expression Language for Live Debugger and Dynamic Instrumentation
private: false
aliases:
    - /dynamic_instrumentation/expression-language
    - /tracing/dynamic_instrumentation/expression-language
---

## Overview

[Live Debugger](/tracing/live_debugger/) and [Dynamic Instrumentation](/dynamic_instrumentation/) use this expression language to read values from running code and define conditions, metrics, and span tags. It borrows syntax elements from common programming languages, but also has its own unique rules. The language lets you access local variables, method parameters, and nested fields within objects, and it supports the use of comparison and logical operators.

Expression support depends on the runtime version and instrumentation location.

Examples:
- `someVar.someField`
- `request.headers["Host"]`
- `any(post.tags, {@it == "debugger"})`
- `@duration > 10 && len(p.data) < 100`

Generally, the Expression Language supports:
* Accessing local variables, method parameters, and deeply nested fields and attributes within objects.
* Using comparison operators (`<`, `>`, `>=`, `<=`, `==`, `!=`, `instanceof`) to compare variables, fields, and constants in your conditions, for example: `localVar1.field1.field2 != 15`.
* Using logical operators (`&&`, `||`, and `!` or `not(...)`) to build complex Boolean conditions, for example: `!isEmpty(user.email) && not(contains(user.name, "abc"))`.
* Using the `null` literal (which is automatically translated to `None` in Python and `nil` in Ruby).

It does **not** support:
* Calling application methods. You can access fields directly, including private fields when supported by the runtime.
* Arithmetic such as `i + 1`.
* Other native programming language syntax beyond what is described on this page.

For `instanceof`, quote the runtime type name, for example `obj instanceof "java.util.Map"`.

Try [autocomplete and search (in Preview)](/dynamic_instrumentation/symdb/) for an improved user experience using the Expression Language.

## Applications

Expressions can be used to produce metrics and as conditions to emit filtered data.

For example, you can create a histogram from the length of a string using `len(data)` as the metric expression. Metric expressions must evaluate to a number.

In Live Debugger log messages and Dynamic Instrumentation span tag values, enclose expressions in braces, for example: `User name is {user.name}`. These expressions can evaluate to any value.

Instrumentation conditions must evaluate to a Boolean, for example:
 - `startsWith(user.name, "abc")`
 - `len(str) > 20`
 - `a == b`
 - `user.isActive == true`

Compare Boolean fields explicitly, rather than using `user.isActive` alone.

## Contextual variables

The available contextual variables depend on the instrumentation location. `@return` and `@duration` are available at method exit; `@it` is used inside collection predicates.

| Keyword     | Description                                                                |
|-------------|----------------------------------------------------------------------------|
| `@return`   | Provides access to the method return value. |
| `@duration` | Provides access to the method call execution duration, as a floating-point value in milliseconds. |
| `@exception`| Provides access to the exception thrown within the method (only available if an uncaught exception exists). |
| `@it`       | Provides access to the current element during collection iteration. Used in predicates for list operations. |

Text expressions do not support `@key` or `@value`. Use bracket indexing to read a dictionary value, such as `myMap["b"]`.

## General operations

The following examples assume a variable named `myString` with value `Hello, world!`:

| Operation | Description | Example |
|-----------|-------------|---------|
| `isDefined(var)` | Checks whether a variable or field exists in the current scope. A defined value can still be `null`. | {{< expression-language-evaluator expression="isDefined(myString)" >}} |
| `len(value_src)` | Gets the string length. | {{< expression-language-evaluator expression="len(myString)" >}} |
| `isEmpty(value_src)` | Checks whether a non-null string is empty. | {{< expression-language-evaluator expression="isEmpty(myString)" >}} |
| `substring(value_src, startIndex, endIndex)` | Gets a substring, excluding the end index. | {{< expression-language-evaluator expression="substring(myString, 0, 2)" >}} |
| `startsWith(value_src, string_literal)` | Checks whether a string starts with the given string literal. | {{< expression-language-evaluator expression="startsWith(myString, \"He\")" >}} |
| `endsWith(value_src, string_literal)` | Checks whether the string ends with the given string literal. | {{< expression-language-evaluator expression="endsWith(myString, \"ld!\")" >}} |
| `contains(value_src, string_literal)` | Checks whether the string contains the string literal. | {{< expression-language-evaluator expression="contains(myString, \"ll\")" >}} |
| `matches(value_src, string_literal)` | Checks whether the string matches the regular expression provided as a string literal. | {{< expression-language-evaluator expression="matches(myString, \"^H.*!$\")" >}} |

For missing or nullable values, guard access: `isDefined(user.email) && user.email != null && !isEmpty(user.email)`. Null handling can differ across runtimes.

## Collection operations

Use `@it` in predicates over sequential collections. See the [Contextual variables](#contextual-variables) section for details.

The following examples assume a variable named `mySequence` with value `[1,2,3,4]` and `myMap` with value `{"a": 1, "b": 2, "c": 3}`:

| Operation | Description | Example |
|-----------|-------------|---------|
| `len(value_src)` | Gets the collection size. | {{< expression-language-evaluator expression="len(mySequence)" >}} {{< expression-language-evaluator expression="len(myMap)" >}}  |
| `isEmpty(value_src)` | Checks whether the collection is empty. | {{< expression-language-evaluator expression="isEmpty(mySequence)" >}} {{< expression-language-evaluator expression="isEmpty(myMap)" >}} |
| `[ i ]`, `[ key ]` | For sequential containers returns the `i`-th item in the collection (where `i` must be an integer). For dictionaries, returns the value that corresponds to the `key` (where `key` must match the key type of the dictionary). If the item does not exist, the expression yields an error or returns null, depending on the language. | {{< expression-language-evaluator expression="mySequence[3]" >}} {{< expression-language-evaluator expression="myMap[\"b\"]" >}} |
| `any(value_src, {predicate})` | Checks if there is at least one element in the collection that satisfies the given predicate. The current element is accessed with the `@it` reference for sequential containers. | {{< expression-language-evaluator expression="any(mySequence, {@it > 2})" >}} |
| `all(value_src, {predicate})` | Checks whether every element in a collection satisfies the specified predicate. The current element is accessed with the `@it` reference. | {{< expression-language-evaluator expression="all(mySequence, {@it > 2})" >}} |
| `filter(value_src, {predicate})` | Filters the elements of the collection using the predicate. The current element is accessed with the `@it` reference. | {{< expression-language-evaluator expression="filter(mySequence, {@it > 1})" >}} |

## Try your own conditions

This interactive illustration shows how conditions affect whether data is captured when instrumenting a method. Its syntax and missing-value behavior can differ from your application.

Select one of the examples or enter an expression in the "when" field and click "SIMULATE" to see whether data is captured based on your condition.

Available variables in this example:

- `loops`: The route parameter hardcoded to `5`
- `myString`: A string `"Hello, world!"`
- `mySequence`: An array of integers `[1, 2, 3, 4]`
- `myMap`: A dictionary `{"a": 1, "b": 2, "c": 3}`
- `i`: The current loop iteration index

{{< expression-language-simulator >}}
