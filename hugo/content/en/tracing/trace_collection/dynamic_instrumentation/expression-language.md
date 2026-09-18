---
title: Expression Language for Live Debugger and Dynamic Instrumentation
description: Write logpoint templates, capture expressions, conditions, and metric expressions using Datadog's expression language.
private: false
aliases:
    - /dynamic_instrumentation/expression-language
    - /tracing/dynamic_instrumentation/expression-language
---

## Overview

[Live Debugger][1] and [Dynamic Instrumentation][2] are separate, complementary products that use the same expression language. Use it to read values from running code, select when to capture data, or calculate a metric value with a built-in function such as `len`.

An expression reads variables, parameters, and object fields available at the selected code location. It is not arbitrary Python, Java, JavaScript, or another application language. For example, write `len(items)`, not `items.size()`, and `user.name`, not `user.getName()`.

Syntax is only part of expression support. Features depend on the runtime and its SDK or Agent version. The instrumentation location also determines which values are available. For Live Debugger through MCP, check the features returned by `discover_datadog_logpoint` before supplying a template, condition, or capture expression.

## Applications

| Where you enter an expression | Format | Example |
|---|---|---|
| Live Debugger log message or Dynamic Instrumentation span tag | Put each expression inside `{}` within the text. | `Order {order.id}: {len(order.items)} items` |
| Condition | Enter a Boolean expression without outer `{}`. | `user.isActive == true && user.age > 18` |
| Dynamic metric value | Enter an expression that evaluates to a number, without outer `{}`. | `len(order.items)` |
| Live Debugger capture expression | Enter the value to capture, without outer `{}`. | `order.items[0].price` |

A template can mix text and several expressions. A condition decides when to emit data. A metric expression supplies the value of a metric; it is not a log message or a condition.

For MCP logpoints, `capture_expressions` replaces automatic variable capture with the named expressions you supply. Use it for specific values, such as a field beyond the normal capture depth. It does not add values to a full snapshot.

## Access variables and fields

| Value | Expression |
|---|---|
| Local variable or method parameter | `order` |
| Object field | `order.id` |
| Nested field | `order.customer.name` |
| List element | `order.items[0]` |
| Dictionary value | `request.headers["Host"]` |

Use the actual variable and field names from your application. Getters and computed properties are not field access. If you do not know an object's runtime fields, capture the object and inspect its snapshot. Do not guess a field name from a getter.

Variables must exist at the selected location. For a line logpoint, choose a location after the assignment of a local variable you want to read. A variable that is out of scope is different from one whose value is `null`.

Use `isDefined` before reading a value that might be missing:

```text
isDefined(user) && user != null
isDefined(user.email) && user.email != null && !isEmpty(user.email)
```

Use `null` for null checks, and `true` and `false` for Boolean values. Compare Boolean fields explicitly: write `user.isActive == true`, not `user.isActive` or `!user.isActive`, in a condition.

## Operators

| Operation | Syntax | Example |
|---|---|---|
| Compare values | `<`, `>`, `>=`, `<=`, `==`, `!=` | `status >= 400 && status < 500` |
| Combine conditions | `&&`, `\|\|` | `status == 404 \|\| status == 500` |
| Negate a condition | `!`, `not(...)` | `!isEmpty(items)` |
| Check a runtime type | `instanceof` followed by a quoted type name | `obj instanceof "java.util.Map"` |

Use parentheses to make a combined condition's intent clear. Type names for `instanceof` depend on the application language and runtime type.

The language does not support calling application methods, arithmetic such as `i + 1`, ternary expressions, or assignments. Read a value already computed by the application, or use one of the supported built-in functions.

## Contextual variables

Contextual values depend on where and when instrumentation runs. Return values and execution duration require method-exit instrumentation; they are not ordinary local variables available at any line.

| Keyword | Description |
|---|---|
| `@return` | The method's return value, when available at method exit. |
| `@duration` | The method's execution duration in milliseconds, when available at method exit. |
| `@exception` | The exception from a throwing method invocation, when available in the instrumentation context. |
| `@it` | The current element inside a list predicate, such as `any(items, {@it > 2})`. |

Do not use `@key` or `@value` in expressions entered in the UI or through MCP. Use bracket indexing to read a dictionary value, such as `myMap["b"]`. The list-predicate examples below do not establish support for iterating dictionaries in every runtime.

## General operations

These examples assume the application has a string `myString` with the value `"Hello, world!"`.

| Operation | Description | Example | Result |
|---|---|---|---|
| `isDefined(value)` | Checks whether a variable or field can be resolved. A defined value can still be `null`. | `isDefined(myString)` | `true` |
| `len(value)` | Gets the length of a string. | `len(myString)` | `13` |
| `isEmpty(value)` | Checks whether a string is empty. Check nullable values explicitly rather than assuming identical null behavior across runtimes. | `isEmpty(myString)` | `false` |
| `substring(value, start, end)` | Extracts characters from `start` up to, but not including, `end`. | `substring(myString, 0, 2)` | `"He"` |
| `startsWith(value, string_literal)` | Checks for a prefix. | `startsWith(myString, "He")` | `true` |
| `endsWith(value, string_literal)` | Checks for a suffix. | `endsWith(myString, "ld!")` | `true` |
| `contains(value, string_literal)` | Checks for a substring. The second argument is a string literal. | `contains(myString, "ll")` | `true` |
| `matches(value, string_literal)` | Checks a string against a regular expression. | `matches(myString, "^H.*!$")` | `true` |

For a value that might be null, use a condition such as `user.email == null || isEmpty(user.email)`. If the variable or field itself might be missing, check `isDefined` first.

## Collection operations

These examples assume the application has `mySequence = [1, 2, 3, 4]` and `myMap = {"a": 1, "b": 2, "c": 3}`. The examples describe application data, not collection literals to enter as expressions.

| Operation | Description | Example | Result |
|---|---|---|---|
| `len(value)` | Gets the size of a collection. | `len(mySequence)` | `4` |
| `isEmpty(value)` | Checks whether a collection is empty. | `isEmpty(mySequence)` | `false` |
| `[index]` | Reads a list element using a zero-based index. | `mySequence[3]` | `4` |
| `[key]` | Reads a dictionary value using a key of the appropriate type. | `myMap["b"]` | `2` |
| `any(value, {predicate})` | Checks whether at least one list element matches. | `any(mySequence, {@it > 2})` | `true` |
| `all(value, {predicate})` | Checks whether every list element matches. | `all(mySequence, {@it > 0})` | `true` |
| `filter(value, {predicate})` | Returns the list elements that match. | `filter(mySequence, {@it > 1})` | `[2, 3, 4]` |

For numeric membership, use `any(mySequence, {@it == 2})`, not `contains(mySequence, 2)`. You can compose supported functions, for example `len(filter(mySequence, {@it > 1}))`, which returns `3` for this list.

Missing keys and out-of-range indexes can produce evaluation errors. Guard a lookup that might be absent with `isDefined(myMap["key"])` before using its value.

## Try your own conditions

The illustration below uses `myString = "Hello, world!"`, `mySequence = [1, 2, 3, 4]`, and `myMap = {"a": 1, "b": 2, "c": 3}`. The loop runs five times, with `i` from `0` to `4`.

{{< expression-language-simulator >}}

## Check an expression in your application

Start with a value whose name and scope you know. Confirm that the code location executes, inspect the captured value, and then add a condition or a more specific expression.

If an expression does not produce the expected result:

1. Check syntax separately from runtime availability. A valid expression can still read a missing field or an unavailable contextual value.
2. Check the selected service, environment, deployed code version, and instrumentation location.
3. For a Live Debugger log event, inspect `debugger.snapshot.evaluationErrors`. Do not treat an event with a condition-evaluation error as evidence that the condition matched.
4. If field access fails, capture the parent object and inspect its fields. Check for redacted, truncated, or uncaptured values before assuming a value is absent.

For help finding code locations and variables, see [Autocomplete and Search][3].

[1]: /tracing/live_debugger/
[2]: /dynamic_instrumentation/
[3]: /dynamic_instrumentation/symdb/
