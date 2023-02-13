---
title: How Dynamic Instrumentation Works
kind: documentation
private: true
---


## Overview

Dynamic instrumentation allows you to add probes to your production systems at any location in your application's code, including third-party libraries. Dynamic Instrumentation has low overhead and is guaranteed to have no side effects on your system.

## Probe types

You can create *log probes* and *metric probes*.

### Log probes

Log probes are enabled by default on all service instances that match the desired environment and version. They are rate limited to 5000 logs/s.

If you enable `Capture method parameters and local variables` on the log probe, Dynamic Instrumentation captures the following data and adds it to the log event:
  - **Method arguments**, **local variables**, and **fields**, with the following limits by default:
    - Follow references three levels deep (configurable in the UI).
    - The first 100 items inside collections.
    - The first 255 characters for string values.
    - 20 fields inside objects. Static fields are not collected.
  - Call **stack trace**.
  - Caught and uncaught **exceptions**.

Since capturing snapshots is a more performance intensive operation, by default it is only enabled on one instance of your service that matches the desired environment and version. Probes with snapshot capture are rate limited to execute once every second.

**Note**: The capture limits are configurable and subject to change while Dynamic Instrumentation is in beta.

### Metric probes

Metric probes are enabled by default on all service instances that match the desired environment and version. Metric probes are not rate limited and execute every time the method or line is invoked.

Dynamic Instrumentation metric probes support the following metric types:

- [**Count**][1]: Counts how many times a given method or line is executed. Can be combined with [metric expressions](#expression-language) to use the value of a variable to increment the count.
- [**Gauge**][2]: Generates a gauge based on the last value of a variable. This metric requires a [metric expression](#expression-language).
- [**Histogram**][3]: Generates a statistical distribution of a variable. This metric requires a [metric expression](#expression-language).


#### Expression language

The dynamic instrumentation expression language is used in log message templates, metric expressions and probe conditions.

For example, you can create a histogram from the size of a collection using `count(myCollection)` as the metric expression. Metric expressions must evaluate to a number.

In log templates, expressions are delimited from the static parts of the template with brackets, for example: `User name {user.name}`. Log template expressions can evaluate to any value. If evaluating the expression fails, it is replaced with `UNDEFINED`.

Probe conditions must evaluate to a boolean, for example: `startsWith(user.name, "abc")`, `len(str) > 20` or `a == b`.

[1]: /metrics/types/?tab=count#metric-types
[2]: /metrics/types/?tab=gauge#metric-types
[3]: /metrics/types/?tab=histogram#metric-types
