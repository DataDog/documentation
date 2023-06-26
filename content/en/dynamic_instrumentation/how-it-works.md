---
title: How Dynamic Instrumentation Works
kind: documentation
private: false
---


## Overview

Dynamic instrumentation allows you to add probes to your production systems at any location in your application's code, including third-party libraries. Dynamic Instrumentation has low overhead and is guaranteed to have no side effects on your system.

## Probe types

### Log probes

Log probes are enabled by default on all service instances that match the specified environment and version. They are rate limited to execute at most 5000 times per second, on each service instance.

If you enable `Capture method parameters and local variables` on the log probe, Dynamic Instrumentation captures the following data and adds it to the log event:
  - **Method arguments**, **local variables**, and **fields**, with the following limits by default:
    - Follow references three levels deep (configurable in the UI).
    - The first 100 items inside collections.
    - The first 255 characters for string values.
    - 20 fields inside objects. Static fields are not collected.
  - Call **stack trace**.
  - Caught and uncaught **exceptions**.

Because capturing this data is performance-intensive, by default it is enabled on only one instance of your service that matches the specified environment and version. Probes with this setting enabled are rate limited to one hit per second.

You must set a log message template on every log probe. The template supports embedding [expressions](#expression-language) inside curly brackets. For example: `User {user.id} purchased {count(products)} products`.

You can also set a condition on a log probe using the [expression language](#expression-language). The expression must evaluate to a Boolean. The probe executes if the expression is true, and does not capture or emit any data if the expression is false.

### Metric probes

Metric probes are enabled by default on all service instances that match the specified environment and version. Metric probes are not rate limited and execute every time the method or line is invoked.

Dynamic Instrumentation metric probes support the following metric types:

- [**Count**][1]: Counts how many times a given method or line is executed. Can be combined with [metric expressions](#expression-language) to use the value of a variable to increment the count.
- [**Gauge**][2]: Generates a gauge based on the last value of a variable. This metric requires a [metric expression](#expression-language).
- [**Histogram**][3]: Generates a statistical distribution of a variable. This metric requires a [metric expression](#expression-language).

### Span probes

A *span probe* emits a span when a method is executed. You can use a *span probe* as a more efficient alternative to [creating new spans with Custom Instrumentation][4], as it does not require making code changes and redeploying your software. If the method throws an exception, the details of the exception will be associated with the newly created span's `error` tag.


### Span Tag probes

A *span tag* probe decorates an existing span with a tag value.  You can use a *span tag probe* as a more efficient alternative to [using Custom Instrumentation to addings tags in code][5], as it does not require making code changes and redeploying your software.

## Expression language

Use the Dynamic Instrumentation expression language in log message templates, metric expressions, tag values, and probe conditions.

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

### Contextual Variables 

| Keyword  | Description                                                                 |
|--------- |----------------------------------------------------------------------------|
| @return  | Provides access to the return value                                        |
| @duration| Provides access to the call execution duration                              |
| @it      | Provides access to the current value in collection iterating operations     |


### String Operations

| Operation | Description | Example |
|-----------|-------------|---------|
| `isEmpty(value_src)` | Check for presence of data. For strings, it is equivalent to `len(str) == 0`. For collections, it is equivalent to `count(myCollection) == 0` | `isEmpty("Hello")` -> `False` |
| `len(value_src)` | Get the string length. | `len("Hello")` -> `5` |
| `substring(value_src, startIndex, endIndex)` | Get a substring. | `substring("Hello", 0, 2)` -> `"He"` |
| `startsWith(value_src, string_literal)` | Check whether a string starts with the given string literal. | `startsWith("Hello", "He")` -> `True` |
| `endsWith(value_src, string_literal)` | Check whether the string ends with the given string literal. | `endsWith("Hello", "lo")` -> `True` |
| `contains(value_src, string_literal)` | Check whether the string contains the string literal. | `contains("Hello", "ll")` -> `True` |
| `matches(value_src, string_literal)` | Check whether the string matches the regular expression provided as a string literal. | `matches("Hello", "^H.*o$")` -> `True` |

### Collection Operations

Assuming we have a variable `myCollection` defined as `[1,2,3]`:


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