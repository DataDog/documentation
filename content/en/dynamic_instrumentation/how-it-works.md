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

[1]: /metrics/types/?tab=count#metric-types
[2]: /metrics/types/?tab=gauge#metric-types
[3]: /metrics/types/?tab=histogram#metric-types
[4]: /tracing/trace_collection/custom_instrumentation/java/#adding-spans
[5]: /tracing/trace_collection/custom_instrumentation/java/#adding-tags