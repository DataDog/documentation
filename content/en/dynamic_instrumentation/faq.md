---
title: Dynamic Instrumentation FAQ
kind: faq
cascade: 
  - private: true
---

## What languages are supported by Dynamic Instrumentation?

Java, Python and .NET

## How does Dynamic Instrumentation works?

Dynamic instrumentation allows users to add probes to their production systems at anypoint in their code (and even 3rd party libraries). Dynamic Instrumentation has low overhead and is guaranteed to have no side effects on your system.

## What probe types does Dynamic Instrumentation support?

* **Snapshots probes** - captures the context of a method/line (rate limited for 1 snapshot per sec)
  * Method arguments, Local Variables and fields.
  * Stack trace
  * Exceptions
* **Metric probes** - generate a dynamic metric 
  * Support: Count, Gauge and Histogram metrics
  * Use any argument, local variables or field as a metric value

Comming soon:
* **Logs Probes** - add dynamic log at any line of code
* **Span probes** - add dynamic span from any method invocation

## What data does Dynamic Instrumentation Snapshot probe captures?

Dynamic instrumentation captures the current context of a method or line:
* Method Arguments, Local Variables and fields. 
  * Captures 3 levels deep of class objects
  * Limit to the first 100 items inside collections
  * Limit string values to 255 characters
  * Limit to 20 collected fields in an object. Static fields are not been collected.
* Call Stack
* Caught & uncaught exceptions 

**Note**: The capture limits are configurable and subject to change while in Beta.

**Note**: Snapshot probes are rate limited to create 1 snapshot per second.

## What data does Dynamic Instrumentation Metric probe captures?

Dynamic metrics support 3 different methric types:
* [**Count**][1] - counts how many times a given method / line where executed
  * Can be mixed with metric expression to count the values of a variable
* [**Gauge**][2] - generates a guage based on a last value of a variable
  * This metric requies an metric expression
* [**Histogram**][3] - generates a statisical distribution of variable.
  * This metric requies an metric expression

**Note**: Metric probes are not limited and would be invoked everytime the method/line is invoked.

## What metric expression are supported?

Metric expression can be use generate dynamic metrics. For example, you can create an histogram on size of a file by using a reference expression like `#file.content.size`.

The first part of the reference expression uses a prefix depend on the variable source
- **. (period)** - is used to access fields of the local class
- **# (hash)** - is used to access local variables
- **^ (circumflex)** is used to access method arguments

You can use multiple reference segements to access inner fields. Please note, metric mexpressions can only access fields (public/private) of an object. If the field in a reference expression doesn't exists or returns null the reference path terminates.

[1]: https://docs-staging.datadoghq.com/asm/protect/metrics/types/?tab=count#metric-types
[2]: https://docs-staging.datadoghq.com/asm/protect/metrics/types/?tab=gauge#metric-types
[3]: https://docs-staging.datadoghq.com/asm/protect/metrics/types/?tab=histogram#metric-types
