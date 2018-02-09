---
title: Trace
kind: Documentation
---

## Definition

{{< img src="tracing/services/trace/tracing-terminology.png" alt="Visualizing tracing terms" responsive="true" popup="true" style="width:80%;">}}

### Trace

**A trace is used to track the time spent by an application processing a single operation, Each trace consists of one or more spans.**  

For example, a trace can be used to track the entire time spent processing a complicated web request. Even though the request may require multiple resources and machines to handle the request, all of these function calls and sub-requests would be encapsulated within a single trace.

### Spans

**A Span represents a logical unit of work in the system.**  

Spans are associated with a [Service](/tracing/services/service) and optionally a resource. Each span consists of a start time, a duration, and optional tags. For example, a span can describe the time spent on a distributed call on a separate machine, or the time spent in a small component within a larger operation. Spans can be nested within each other, and in those instances will have a parent-child relationship.

## Trace in datadog

Selecting a trace offers you the list of spans associated to it with a flame graph display:

{{< img src="tracing/services/trace/trace.png" alt="Trace" responsive="true" popup="true" style="width:90%;">}}

Select between **Service** or **Host** break down:

* **Service**: show all span associated services
* **Host**: show all spans associated hots

{{< img src="tracing/services/trace/service_host_display.png" alt="Service host display" responsive="true" popup="true" style="width:40%;">}}

You can switch to a list display in order to have all insights at onces on your spans:

{{< img src="tracing/services/trace/trace_list.png" alt="Trace list" responsive="true" popup="true" style="width:90%;">}}

If you are analyzing an error trace, the error has a specific display if you followed the [special meaning tags rules](#traces-special-meaning-tags):

{{< img src="tracing/services/trace/trace_error.png" alt="Trace Error" responsive="true" popup="true" style="width:90%;">}}

### Traces special meaning tags

When [submitting your traces](/api/#tracing) you may add attributes in the `meta` parameter.  
Some of them have a special meaning which lead to a dedicated display and behavior in Datadog:

* **`sql.query`**:  
    Allows specific SQL query formating and display in Datadog UI.

* **`error.msg`**:  
    Allows dedicated display for error message.

* **`error.type`**:  
    Allows dedicated display for error types. Types available are for instance for python `ValueError` or `Exception` and for Java `ClassNotFoundException` or `NullPointerException`..

* **`error.stack`**:  
    Allows a better display of the Stacktrace of an exception in Datadog UI (red boxes etc....)

{{< img src="tracing/services/trace/trace_error_formating.png" alt="Error Formating" responsive="true" popup="true" >}}

