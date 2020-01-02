---
title: Trace View
kind: documentation
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "tracing/visualization/service"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
---

View an individual [trace][1] to see all of its [spans][2] and associated metadata. Each trace can be viewed either as a flame graph or as a list (grouped by [service][3] or host).

{{< img src="tracing/visualization/trace/trace.png" alt="Trace" responsive="true" style="width:90%;">}}

Calculate the breakdown of execution time and adjust the color scheme by either **service** or **host**.

{{< img src="tracing/visualization/trace/service_host_display.png" alt="Service host display" responsive="true" style="width:40%;">}}

To get a closer look at the flame graph, zoom in by scrolling:

{{< img src="tracing/visualization/trace/trace_zoom.mp4" alt="Trace Error" video="true" responsive="true" width="90%" >}}

The List view aggregates [resources][4] by [service][3] and sorts them according to their corresponding count of spans. Services are sorted per relative percentage of execution time spent by the trace in each service:

{{< img src="tracing/visualization/trace/trace_list.png" alt="Trace list" responsive="true" style="width:90%;">}}

### More Information

{{< tabs >}}
{{% tab "Span tags" %}}

Click on a span in the flame graph to show its metadata below the graph. If there's an error, the stack trace is provided:

{{< img src="tracing/visualization/trace/trace_error.png" alt="Trace Error" responsive="true" style="width:90%;">}}

If you are analyzing a [trace][1] reporting an error, the error has a specific display if you follow the special meaning tags rules. When submitting your traces you can add attributes to the `meta` parameter.

Some attributes have special meanings that lead to a dedicated display or specific behavior in Datadog:

| Attribute     | Description                                                                                                                                                                        |
| ----          | ------                                                                                                                                                                             |
| `sql.query`   | Allows specific SQL query formatting and display in Datadog's UI.                                                                                                                     |
| `error.msg`   | Allows dedicated display for error message.                                                                                                                                        |
| `error.type`  | Allows dedicated display for error types. Available types include, for instance, in Python `ValueError` or `Exception` and in Java `ClassNotFoundException` or `NullPointerException`. |
| `error.stack` | Allows a better display of the stack trace of an exception in Datadog's UI (red boxes, etc...)                                                                                         |

{{< img src="tracing/visualization/trace/trace_error_formating.png" alt="Error Formating" responsive="true" >}}

[1]: /tracing/visualization/#trace
{{% /tab %}}
{{% tab "Host Info" %}}

View the host information related to the trace including host tags and graphs around the time of the trace.

{{< img src="tracing/visualization/trace/trace_host_info.png" alt="Trace Host Info" responsive="true" style="width:90%;">}}

{{% /tab %}}
{{% tab "Logs" %}}

See logs related to your service at the time of the trace. When you hover over a log, a line showing its timestamp is displayed on the trace flame graph. Clicking on the log brings you to the [log explorer search][1].

{{< img src="tracing/visualization/trace/trace_logs.png" alt="Trace Logs" responsive="true" style="width:90%;">}}

[1]: /logs/explorer/search
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#trace
[2]: /tracing/visualization/#spans
[3]: /tracing/visualization/#services
[4]: /tracing/visualization/#resources
