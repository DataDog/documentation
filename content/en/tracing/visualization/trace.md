---
title: Trace View
kind: documentation
further_reading:
- link: "/tracing/setup/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "/tracing/visualization/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "/tracing/visualization/service/"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "/tracing/visualization/resource/"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "/tracing/visualization/trace/"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
---

View an individual [trace][1] to see all of its [spans][2] and associated metadata. Each trace can be viewed either as a flame graph or as a list (grouped by [service][3] or host).

{{< img src="tracing/visualization/trace/trace.png" alt="Trace"  style="width:90%;">}}

Calculate the breakdown of execution time and adjust the color scheme by either **service** or **host**.

{{< img src="tracing/visualization/trace/service_host_display.png" alt="Service host display"  style="width:40%;">}}

To get a closer look at the flame graph, zoom in by scrolling:

{{< img src="tracing/visualization/trace/trace_zoom.mp4" alt="Trace Error" video="true"  width="90%" >}}

The List view aggregates [resources][4] by [service][3] and sorts them according to their corresponding count of spans. Services are sorted per relative percentage of execution time spent by the trace in each service:

{{< img src="tracing/visualization/trace/trace_list.png" alt="Trace list"  style="width:90%;">}}

### More Information

{{< tabs >}}
{{% tab "Span tags" %}}

Click on a span in the flame graph to show its metadata below the graph. If there's an error, the stack trace is provided:

{{< img src="tracing/visualization/trace/trace_error.png" alt="Trace Error"  style="width:90%;">}}

If you are analyzing a [trace][1] reporting an error, the error has a specific display if you follow the special meaning tags rules. When submitting your traces you can add attributes to the `meta` parameter.

Some attributes have special meanings that lead to a dedicated display or specific behavior in Datadog:

| Attribute     | Description                                                                                                                                                                        |
| ----          | ------                                                                                                                                                                             |
| `sql.query`   | Allows specific SQL query formatting and display in Datadog's UI.                                                                                                                     |
| `error.msg`   | Allows dedicated display for error message.                                                                                                                                        |
| `error.type`  | Allows dedicated display for error types. Available types include, for instance, in Python `ValueError` or `Exception` and in Java `ClassNotFoundException` or `NullPointerException`. |
| `error.stack` | Allows a better display of the stack trace of an exception in Datadog's UI (red boxes, etc...)                                                                                         |

{{< img src="tracing/visualization/trace/trace_error_formating.png" alt="Error Formating"  >}}

[1]: /tracing/visualization/#trace
{{% /tab %}}
{{% tab "Host Info" %}}

View the host information related to the trace including host tags and graphs around the time of the trace.

{{< img src="tracing/visualization/trace/trace_host_info.png" alt="Trace Host Info"  style="width:90%;">}}

{{% /tab %}}
{{% tab "Logs" %}}

See logs related to your service at the time of the trace. When you hover over a log, a line showing its timestamp is displayed on the trace flame graph. Clicking on the log brings you to the [log explorer search][1].

{{< img src="tracing/visualization/trace/trace_logs.png" alt="Trace Logs"  style="width:90%;">}}


[1]: /logs/explorer/search/
{{% /tab %}}
{{% tab "Processes" %}}

Click on a service’s span to see the processes running on its underlying infrastructure. A service’s span processes are correlated with the hosts or pods on which the service runs at the time of the request. You can analyze process metrics such as CPU and RSS memory alongside code-level errors to distinguish between application-specific and wider infrastructure issues. Clicking on a process will bring you to the [Live Processes page][1]. To view span-specific processes, enable [process collection][2]. Related processes are not currently supported for serverless and browser traces. 

{{< img src="tracing/visualization/trace/trace_processes.png" alt="Trace Processes"  style="width:90%;">}}

[1]: https://docs.datadoghq.com/infrastructure/process/?tab=linuxwindows
[2]: https://docs.datadoghq.com/infrastructure/process/?tab=linuxwindows#installation
{{% /tab %}}

{{% tab "Network" %}}

Click on a service’s span to see network dependencies of the service making the request. Use key network performance metrics such as volume, errors (TCP retransmits), and network latency (TCP round-trip time) to differentiate between application-specific and network-wide issues, especially when no code errors have been generated. For instance, you can use network telemetry to determine if high request latency is due to traffic overloading of the relevant application, or faulty dependencies with a downstream pod, security group, or any other tagged endpoint. Clicking on a process brings you to the [Network Overview][1]. To view span-specific processes, enable [Network Performance Monitoring][2].

**Note**: Related network telemetry is not currently supported for serverless traces.

{{< img src="tracing/visualization/trace/trace_networks.png" alt="Trace Network Dependencies" style="width:90%;">}}

[1]: /network_monitoring/performance/network_page
[2]: /network_monitoring/performance/setup
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#trace
[2]: /tracing/visualization/#spans
[3]: /tracing/visualization/#services
[4]: /tracing/visualization/#resources
