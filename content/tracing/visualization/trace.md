---
title: Trace page
kind: Documentation
further_reading:
- link: "/tracing/setup/"
  tag: "Documentation"
  text: Learn how to setup APM tracing with your application
- link: "/tracing/visualization/services_list/"
  tag: "Documentation"
  text: Discover the list of services reporting to Datadog
- link: "/tracing/visualization/service"
  tag: "Documentation"
  text: Learn more about services in Datadog
- link: "/tracing/visualization/resource"
  tag: "Documentation"
  text: Dive into your resource performances and traces
- link: "/tracing/visualization/trace"
  tag: "Documentation"
  text: Understand how to read a Datadog Trace
---

Selecting a trace offers you the list of spans associated to it with a flame graph display of each spans with their associated metadata:

{{< img src="tracing/visualization/trace/trace.png" alt="Trace" responsive="true" popup="true" style="width:90%;">}}

Select between **Service** or **Host** break down to group your graphs and stats accordingly:

* **Service**: show all span associated services
* **Host**: show all spans associated hots

{{< img src="tracing/visualization/trace/service_host_display.png" alt="Service host display" responsive="true" popup="true" style="width:40%;">}}

Switch to a list display in order to displaying all resources at a glance:

{{< img src="tracing/visualization/trace/trace_list.png" alt="Trace list" responsive="true" popup="true" style="width:90%;">}}

If you are analyzing an error trace, the error has a specific display if you followed the [special meaning tags rules](#traces-special-meaning-tags):

{{< img src="tracing/visualization/trace/trace_error.png" alt="Trace Error" responsive="true" popup="true" style="width:90%;">}}

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

{{< img src="tracing/visualization/trace/trace_error_formating.png" alt="Error Formating" responsive="true" popup="true" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}