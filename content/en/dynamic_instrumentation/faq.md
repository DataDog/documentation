---
title: Dynamic Instrumentation FAQ
kind: faq
cascade: 
  - private: true
---

## What languages are supported by Dynamic Instrumentation?

Java, Python and .NET

<!-- {{< whatsnext desc="List of Frequently Asked Questions:" >}}
    {{< nextlink href="/logs/faq/how-to-investigate-a-log-parsing-issue" >}}How to investigate a log parsing issue?{{< /nextlink >}}
{{< /whatsnext >}} -->

## How does Dynamic Instrumentation works?

Dynamic instrumentation allows users to add probes to their production systems at anypoint in their code (and even 3rd party libraries). Dynamic Instrumentation has low overhead and is guaranteed to have no side effects on your system.

## What data does Dynamic Instrumentation Snapshot probe captures

Dynamic instrumentation capture the current context of a method or line that includes:
* Method Arguments, Local Variables and fields. 
* * Captures 3 levels deep of class objects
* * Limit to the first 100 items inside collections
* * Limit string values to 255 characters
* * Limit to 20 collected fields in an object
* Call Stack
* Caught & uncaught exceptions 

## What probe types does Dynamic Instrumentation support?

* *Snapshots probes* - captures the context of a method/line (rate limited for 1 snapshot per sec)
* * Method arguments, Local Variables and fields, all captured at 3 levels deep.
* * Stack trace
* * Exceptions
* *Metric probes* - generate a dynamic metric 
* * Support: Count, Gauge and Histogram metrics
* * Use any argument, local variables or field as a metric value
