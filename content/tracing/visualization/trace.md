---
title: Trace page
kind: Documentation
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: Learn how to setup APM tracing with your application
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: Discover the list of services reporting to Datadog
- link: "tracing/visualization/service"
  tag: "Documentation"
  text: Learn more about services in Datadog
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: Dive into your resource performance and traces
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: Understand how to read a Datadog Trace
---

View an individual trace to see all of its spans and associated metadata. Each trace can be viewed either as a flame graph or as a list (grouped by service or host).

{{< img src="tracing/visualization/trace/trace.png" alt="Trace" responsive="true" style="width:90%;">}}

Calculate breakdown of execution time and adjust the color scheme by either **service** or **host**.

{{< img src="tracing/visualization/trace/service_host_display.png" alt="Service host display" responsive="true" style="width:40%;">}}

List sorts resources by service, not chronologically. Here it's easy to see all resources at a glance and sort by count of spans, average duration, and others:

{{< img src="tracing/visualization/trace/trace_list.png" alt="Trace list" responsive="true" style="width:90%;">}}

If you are analyzing an error trace, the error has a specific display if you followed the [special meaning tags rules](#traces-special-meaning-tags):

{{< img src="tracing/visualization/trace/trace_error.png" alt="Trace Error" responsive="true" style="width:90%;">}}

Want to look closer at the flame graph? Zoom in by scrolling:

{{< img src="tracing/visualization/trace/trace_zoom.gif" alt="Trace Error" responsive="true" style="width:90%;">}}

### Traces special meaning tags

When [submitting your traces][1] you may add attributes in the `meta` parameter.
Some of them have a special meaning which lead to a dedicated display and behavior in Datadog:

* **`sql.query`**:
    Allows specific SQL query formating and display in Datadog UI.

* **`error.msg`**:
    Allows dedicated display for error message.

* **`error.type`**:
    Allows dedicated display for error types. Types available are for instance for python `ValueError` or `Exception` and for Java `ClassNotFoundException` or `NullPointerException`.

* **`error.stack`**:
    Allows a better display of the Stacktrace of an exception in Datadog UI (red boxes etc...)

{{< img src="tracing/visualization/trace/trace_error_formating.png" alt="Error Formating" responsive="true" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/#tracing
