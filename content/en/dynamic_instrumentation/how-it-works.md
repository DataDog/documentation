---
title: How Dynamic Instrumentation Works
kind: documentation
private: true
---


## Overview

Dynamic instrumentation allows you to add probes to your production systems at any point in your code, even in third-party libraries. Dynamic Instrumentation has low overhead and is guaranteed to have no side effects on your system.

## Probe types

You can create *snapshot probes* and *metric probes*.

### Snapshot probes

Snapshot probes capture the context of a method or line, including:

  - **Method arguments**, **local variables**, and **fields**, with the following limits:
    - Three levels deep of class objects.
    - The first 100 items inside collections.
    - 255 characters for string values.
    - 20 collected fields in an object. Static fields are not collected.
  - Call **stack trace**.
  - Caught and uncaught **exceptions**.

Snapshot probes are rate limited to one snapshot per second. 

**Note**: The capture limits are configurable and subject to change while Dynamic Instrumentation is in beta.

### Metric probes

Metric probes generate a dynamic metric. They use any argument, local variable, or field as a metric value. Metric probes are not rate limited and are invoked every time the method or line is invoked.

Dynamic metric probes support the following metric types:

- [**Count**][1]: Counts how many times a given method or line is executed. Can be combined with [metric expressions](#metric-expressions) to count the values of a variable.
- [**Gauge**][2]: Generates a gauge based on the last value of a variable. This metric requires a [metric expression](#metric-expressions).
- [**Histogram**][3]: Generates a statistical distribution of a variable. This metric requires a [metric expression](#metric-expressions).


#### Metric expressions

Metric expression can be use generate dynamic metrics. For example, you can create an histogram for the size of a file by using a reference expression like `#file.content.size`.

The first part of the reference expression is a prefix that indicates the variable source:

- `.` (period) - to access fields of the local class
- `#` (hash) - to access local variables
- `^` (caret) - to access method arguments

You can use multiple reference segments to access inner fields. Metric expressions can only access fields (public or private) of an object. If the field in a reference expression doesn't exists or returns null, the reference path terminates.

[1]: /metrics/types/?tab=count#metric-types
[2]: /metrics/types/?tab=gauge#metric-types
[3]: /metrics/types/?tab=histogram#metric-types
