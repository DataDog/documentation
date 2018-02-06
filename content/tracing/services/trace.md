---
title: Trace
kind: Documentation
---

## Definition

Used to track the time spent by an application processing a single operation. For example, a trace can be used to track the entire time spent processing a complicated web request. Even though the request may require multiple resources and machines to handle the request, all of these function calls and sub-requests would be encapsulated within a single trace.

The Name field can be found in the URL after clicking on a specific Service.

{{< img src="tracing/services/trace_url.png" alt="Trace URL" responsive="true" popup="true" style="width:80%;">}}

This Name/Trace is the name given around the function or method that would execute the code for each "Resource". This can be modified by using the `tracer.trace` method as seen here (in Python):

{{< img src="tracing/services/name_python.png" alt="Name Python" responsive="true" popup="true" style="width:50%;">}}

## Trace in datadog

{{< img src="tracing/services/trace.png" alt="Trace" responsive="true" popup="true" style="width:50%;">}}

{{< img src="tracing/services/trace_list.png" alt="Trace list" responsive="true" popup="true" style="width:50%;">}}

{{< img src="tracing/services/trace_error.png" alt="Trace Error" responsive="true" popup="true" style="width:50%;">}}

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

{{< img src="tracing/services/trace_error_formating.png" alt="Error Formating" responsive="true" popup="true" >}}


## Spans

Represents a logical unit of work in the system. Each trace consists of one or more spans. Spans are associated with a service and optionally a resource. Each span consists of a start time, a duration, and optional tags. For example, a span can describe the time spent on a distributed call on a separate machine, or the time spent in a small component within a larger operation. Spans can be nested within each other, and in those instances will have a parent-child relationship.

{{< img src="tracing/services/tracing-terminology.png" alt="Visualizing tracing terms" responsive="true" popup="true" style="width:80%;">}}