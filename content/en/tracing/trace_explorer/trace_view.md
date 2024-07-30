---
title: Trace View
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
algolia:
  tags: ['trace view']
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
{{% tab "Waterfall" %}}

{{< img src="tracing/trace_view/waterfall2.png" alt="Waterfall" style="width:100%;">}}

Displays all spans for a trace on a timeline where each row corresponds to a span. This visualization is useful for isolating and focusing on relevant parts of a trace.

Each row (span) indicates the following:

- **Relative span duration**: The length of the color-coded bar corresponds to the percentage of total trace duration.
- **Absolute span duration**: The absolute time in milliseconds (ms).
- **Span details**: The corresponding service name and resource name are displayed.
- **Statuses**: When applicable, an HTTP status code is displayed.
- **Color coding**: Spans are color-coded by service (default), host, or container. To change how spans are color-coded, use the **Color by** dropdown.

To expand or collapse span descendants, click the chevron (>) icon on a row. To expand or collapse all spans, click the **Expand all** (+) or **Collapse all** (-) buttons.

{{% /tab %}}
{{% tab "Map" %}}

{{< img src="tracing/trace_view/map.png" alt="Map" style="width:90%;">}}

Displays a representation of all the services involved in the trace. This visualization is useful for getting a high-level overview of the services' dependencies and transaction lifecycle at a service level.

Hover over a service to highlight its parent and children, and click on it to focus on the service entry span.

{{% /tab %}}
{{< /tabs >}}

## More information

The height-adjustable bottom of the Trace View shows selected span and trace information. 

The span header contains service, operation, and resource names of the selected span as well as latency information. Pivot to other parts of the platform or narrow down your [Trace Explorer][5] search by clicking on the naming pill.

{{< img src="tracing/trace_view/span_header.png" alt="Span header" style="width:90%;">}}

{{< tabs >}}
{{% tab "Span Info" %}} 

See all span metadata, including custom tags. Click on a span tag to update the search query in the Trace Explorer or copy the tag's value to the clipboard.

Other information may be displayed under various conditions:
- A git warning message (when git information is missing on a CI Test)
- SQL Query markup (on a SQL query)
- RUM Context and Metadata (on a RUM span)
- Spark Metrics (on a Spark job span)

{{< img src="tracing/trace_view/info_tab.png" alt="Span Info tab" style="width:90%;">}}

[1]: /tracing/glossary/#trace
{{% /tab %}}
{{% tab "Infrastructure" %}}

Toggle between host-level and container-level (when available) infrastructure information for the selected span.

See associated tags, as well as critical host/container metrics graphs including CPU, Memory, and I/O with an overlay of when the trace occurred.

{{< img src="tracing/trace_view/infrastructure_tab.png" alt="Infrastructure tab" style="width:90%;">}}

{{% /tab %}}
{{% tab "Logs" %}}

See logs related to your service at the time of the trace. When you hover over a log, a line showing its timestamp is displayed on the trace flame graph. Clicking on the log brings you to the [log explorer search][1].

{{< img src="tracing/trace_view/logs_tab.png" alt="Logs tab" style="width:90%;">}}


[1]: /logs/explorer/search/
{{% /tab %}}
{{% tab "Processes" %}}

Click on a service's span to see the processes running on its underlying infrastructure. A service's span processes are correlated with the hosts or pods on which the service runs at the time of the request. You can analyze process metrics such as CPU and RSS memory alongside code-level errors to distinguish between application-specific and wider infrastructure issues. Clicking on a process will bring you to the [Live Processes page][1]. To view span-specific processes, enable [process collection][2]. Related processes are not currently supported for serverless and browser traces. 

{{< img src="tracing/trace_view/processes_tab.png" alt="Processes tab" style="width:90%;">}}

[1]: https://docs.datadoghq.com/infrastructure/process/?tab=linuxwindows
[2]: https://docs.datadoghq.com/infrastructure/process/?tab=linuxwindows#installation
{{% /tab %}}

{{% tab "Network" %}}

Click on a service's span to see network dependencies of the service making the request. Use key network performance metrics such as volume, errors (TCP retransmits), and network latency (TCP round-trip time) to differentiate between application-specific and network-wide issues, especially when no code errors have been generated. For instance, you can use network telemetry to determine if high request latency is due to traffic overloading of the relevant application, or faulty dependencies with a downstream pod, security group, or any other tagged endpoint. Clicking on a process brings you to the [Network Analytics][1] page. To view span-specific processes, enable [Network Performance Monitoring][2].

**Note**: Related network telemetry is not currently supported for serverless traces.

{{< img src="tracing/trace_view/network_tab.png" alt="Network tab" style="width:90%;">}}

[1]: /network_monitoring/performance/network_analytics
[2]: /network_monitoring/performance/setup
{{% /tab %}}

{{% tab "Security" %}}

See attack attempts that target the services of the distributed trace. You can see the pattern used by the attacker, the rule that detects the attack, and whether the attacker found a vulnerability in your service.

Click **View in ASM** to investigate further using [Datadog Application Security Management][1].

{{< img src="tracing/trace_view/security_tab.png" alt="Security tab" style="width:90%;">}}

[1]: /security/application_security/how-appsec-works/
{{% /tab %}}
{{% tab "Code Hotspots" %}}

View [Code Hotspots][1] to identify lines of code related to performance issues. The values on the left side represent the time spent in each method call during the selected span.

{{< img src="profiler/code_hotspots_tab.png" alt="Code Hotspots tab showing time spent in each method for a selected span" style="width:90%;">}}

[1]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces

{{% /tab %}}
{{% tab "Span Links (Beta)" %}}

<div class="alert alert-info">Span link support is in beta.</div>

[Span links][4] correlate one or more spans together that are causally related but don't have a typical parent-child relationship.

Click a span in the flame graph to display spans connected with span links:

{{< img src="tracing/span_links/span_links_tab.png" alt="Span Links tab" style="width:90%;">}}

**Note**: Span links only display when the corresponding spans are ingested and indexed, for example, with a [retention filter][1].

To learn more about span links and how to add them with custom instrumentation, read [Span Links][4].

[1]: /tracing/trace_pipeline/trace_retention/
[2]: /tracing/trace_collection/custom_instrumentation/php#adding-span-links-beta
[3]: /tracing/trace_collection/otel_instrumentation/java#requirements-and-limitations
[4]: /tracing/trace_collection/span_links/

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/glossary/#trace
[2]: /tracing/glossary/#spans
[3]: /tracing/glossary/#services
[4]: /tracing/glossary/#resources
[5]: /tracing/trace_explorer
