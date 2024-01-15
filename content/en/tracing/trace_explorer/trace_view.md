---
title: Trace View
kind: documentation
aliases:
- /tracing/visualization/trace/
further_reading:
- link: "/tracing/trace_collection/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Discover and catalog the services reporting to Datadog"
- link: "/tracing/services/service_page/"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "/tracing/services/resource_page/"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "/tracing/trace_explorer/trace_view/"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
---

{{< img src="tracing/trace_view/trace_view.png" alt="Trace View" style="width:90%;">}}

## Overview

View an individual [trace][1] to see all of its [spans][2] and associated metadata. Each trace can be visualized as either a Flame Graph, Span List, Waterfall, or Map.

The trace header displays critical trace information, including the root span's service name, resource name, trace ID, end-to-end trace duration, and the trace start time. To get a permalink to the trace, click **Open Full Page** and save the URL.

{{< img src="tracing/trace_view/trace_header.png" alt="Trace header" style="width:90%;">}}


## Trace visualizations

{{< tabs >}}
{{% tab "Flame Graph" %}}

{{< img src="tracing/trace_view/flamegraph.png" alt="Flame Graph" style="width:90%;">}}

The Flame Graph is the default visualization that displays all the color-coded spans from a trace on a timeline. This is useful for understanding the execution path of a request and where time was spent over a trace.

To navigate the graph, scroll to zoom, click and drag to move around, and use the minimap to zoom into the selected span or zoom out to the full trace.

The legend details the color coding of the flame graph. Group spans by either **Service** (default), **Host**, or **Container**. Choose to display either the percentage of trace execution time (**% Exec Time**) or span count (**Spans**) by group. If errors exist on spans in the trace, highlight them in the flame graph by selecting the **Errors** checkbox under **Filter Spans**.

{{< img src="tracing/trace_view/flamegraph_legend.mp4" alt="Flame Graph legend" video="true" style="width:90%;">}}


{{% /tab %}}
{{% tab "Span List" %}}

{{< img src="tracing/trace_view/spanlist.png" alt="Trace View" style="width:90%;">}}

Displays [resources][1] by group ([service][2] by default) and sorts them according to their count of spans. This visualization is useful for scanning latency information by resource or grouping.

Filter resources by type or naming information using the corresponding buttons and text-based search.

{{< img src="tracing/trace_view/spanlist_headers.png" alt="Span List headers" style="width:90%;">}}

Groups can be sorted by clicking on the corresponding column header: **RESOURCE**, **SPANS**, average duration (**AVG DURATION**), execution time (**EXEC TIME**), or percentage of trace execution time (**% EXEC TIME**).

[1]: /tracing/glossary/#resources
[2]: /tracing/glossary/#services
{{% /tab %}}
{{% tab "Waterfall (Beta)" %}}

<div class="alert alert-info"><strong>Join the Beta!</strong><br />
To join the Waterfall private beta <a href="https://forms.gle/LjJR1ZbF1tNDv5JC6">fill out this form</a>.</div>

{{< img src="tracing/trace_view/waterfall.png" alt="Waterfall" style="width:90%;">}}

Displays all the spans for an associated trace, color-coded on separate rows and on a timeline. This visualization is useful for isolating and focusing on relevant parts of a trace.

On each row (that is, per span):
* A bar (colored by service), whose length corresponds to the percentage of total trace duration
* The service name, operation name, and resource name, with font styling: **service** operation <span style="color:gray">resource</span>
* Absolute and relative span duration information
* (when applicable) An error icon or HTTP status code

To expand or collapse span descendants, click the plus or minus button on any row. To expand all spans, click the plus button to the left of the timescale.

{{% /tab %}}
{{% tab "Map" %}}

{{< img src="tracing/trace_view/map.png" alt="Map" style="width:90%;">}}

Displays a service-level representation of the trace, with arrows showing the flow of calls between services. This visualization is useful for getting a high-level overview of the trace and the order in which services are called.

Hover over a service to highlight its parent and children, and click on it to focus on the service entry span.

{{% /tab %}}
{{< /tabs >}}

## More information

The height-adjustable bottom of the Trace View shows selected span and trace information. 

The span header contains service, operation, and resource names of the selected span as well as latency information. Pivot to other parts of the platform or narrow down your [Trace Explorer][5] search by clicking on the naming pill.

{{< img src="tracing/trace_view/span_header.png" alt="Span header" style="width:90%;">}}

{{< tabs >}}
{{% tab "Span tags" %}}

Click on a span in the flame graph to show its metadata below the graph. If there's an error, the stack trace is provided:

{{< img src="tracing/visualization/trace/trace_error.png" alt="Trace Error" style="width:90%;">}}

If you are analyzing a [trace][1] reporting an error, the error has a specific display if you follow the special meaning tags rules. When submitting your traces you can add attributes to the `meta` parameter.

Some attributes have special meanings that lead to a dedicated display or specific behavior in Datadog:

| Attribute     | Description                                                                                                                                                                        |
| ----          | ------                                                                                                                                                                             |
| `sql.query`   | Allows specific SQL query formatting and display in Datadog's UI.                                                                                                                     |
| `error.msg`   | Allows dedicated display for error message.                                                                                                                                        |
| `error.type`  | Allows dedicated display for error types. Available types include, for instance, in Python `ValueError` or `Exception` and in Java `ClassNotFoundException` or `NullPointerException`. |
| `error.stack` | Allows a better display of the stack trace of an exception in Datadog's UI (red boxes, etc...)                                                                                         |

{{< img src="tracing/visualization/trace/trace_error_formating.png" alt="Error Formating" >}}

[1]: /tracing/glossary/#trace
{{% /tab %}}
{{% tab "Host Info" %}}

View the host information related to the trace including host tags and graphs around the time of the trace.

{{< img src="tracing/visualization/trace/trace_host_info.png" alt="Trace Host Info" style="width:90%;">}}

{{% /tab %}}
{{% tab "Logs" %}}

See logs related to your service at the time of the trace. When you hover over a log, a line showing its timestamp is displayed on the trace flame graph. Clicking on the log brings you to the [log explorer search][1].

{{< img src="tracing/visualization/trace/trace_logs.png" alt="Trace Logs" style="width:90%;">}}


[1]: /logs/explorer/search/
{{% /tab %}}
{{% tab "Processes" %}}

Click on a service's span to see the processes running on its underlying infrastructure. A service's span processes are correlated with the hosts or pods on which the service runs at the time of the request. You can analyze process metrics such as CPU and RSS memory alongside code-level errors to distinguish between application-specific and wider infrastructure issues. Clicking on a process will bring you to the [Live Processes page][1]. To view span-specific processes, enable [process collection][2]. Related processes are not currently supported for serverless and browser traces. 

{{< img src="tracing/visualization/trace/trace_processes.png" alt="Trace Processes" style="width:90%;">}}

[1]: https://docs.datadoghq.com/infrastructure/process/?tab=linuxwindows
[2]: https://docs.datadoghq.com/infrastructure/process/?tab=linuxwindows#installation
{{% /tab %}}

{{% tab "Network" %}}

Click on a service's span to see network dependencies of the service making the request. Use key network performance metrics such as volume, errors (TCP retransmits), and network latency (TCP round-trip time) to differentiate between application-specific and network-wide issues, especially when no code errors have been generated. For instance, you can use network telemetry to determine if high request latency is due to traffic overloading of the relevant application, or faulty dependencies with a downstream pod, security group, or any other tagged endpoint. Clicking on a process brings you to the [Network Analytics][1] page. To view span-specific processes, enable [Network Performance Monitoring][2].

**Note**: Related network telemetry is not currently supported for serverless traces.

{{< img src="tracing/visualization/trace/trace_networks.png" alt="Trace Network Dependencies" style="width:90%;">}}

[1]: /network_monitoring/performance/network_analytics
[2]: /network_monitoring/performance/setup
{{% /tab %}}

{{% tab "Security" %}}

See attack attempts that target the services of the distributed trace. You can see the pattern used by the attacker, the rule that detects the attack, and whether the attacker found a vulnerability in your service.

Click **View in ASM** to investigate further using [Datadog Application Security Management][1].

{{< img src="tracing/visualization/trace/trace_security.png" alt="Trace Attack Attempts" style="width:90%;">}}

[1]: /security/application_security/how-appsec-works/
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/glossary/#trace
[2]: /tracing/glossary/#spans
[3]: /tracing/glossary/#services
[4]: /tracing/glossary/#resources
[5]: /tracing/trace_explorer
