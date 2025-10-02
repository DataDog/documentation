---
title: Trace View
description: Visualize and analyze individual traces using flame graphs, span lists, waterfalls, and maps with detailed span information.
aliases:
- /tracing/visualization/trace/
further_reading:
- link: "/tracing/trace_collection/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "/tracing/software_catalog/"
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

The legend details the color coding of the flame graph. Group spans by either **Service** (default), **[Base service][1]** (service from which the span is emitted), **Host**, or **Container**. Choose to display either the percentage of trace execution time (**% Exec Time**) or span count (**Spans**) by group. If errors exist on spans in the trace, highlight them in the flame graph by selecting the **Errors** checkbox under **Filter Spans**.

{{< site-region region="ap1,ap2,us3,us5,eu,us" >}}
Spans from [inferred services][2] are represented with a dashed outline.

[2]: /tracing/services/inferred_services
{{< /site-region >}}

{{< img src="tracing/trace_view/flamegraph_legend.mp4" alt="Flame Graph legend" video="true" style="width:90%;">}}

[1]: /tracing/guide/service_overrides#base-service
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

{{< site-region region="ap1,ap2,us3,us5,eu,us" >}}
Spans from [inferred services][1] are represented with a dashed underline.

[1]: /tracing/services/inferred_services
{{< /site-region >}}

To expand or collapse span descendants, click the chevron (>) icon on a row. To expand or collapse all spans, click the **Expand all** (+) or **Collapse all** (-) buttons.

{{% /tab %}}
{{% tab "Map" %}}

{{< img src="tracing/trace_view/trace-map.png" alt="Trace map" style="width:100%;">}}

Trace map displays a representation of all services involved in a single trace. It provides an overview of the transaction lifecycle at the service level and shows service dependencies.

Each node on the map represents a service in the transaction lifecycle. To prevent cyclic dependencies on the map, services that call another service that had already been invoked by the original service, are represented by duplicated nodes. [Inferred services][2] are represented with a dashed outline and a purple background.

Service nodes explicitly show the percentage of the **total execution time**, which shows the trace duration breakdown at the service level.

If a [service entry span][1] is in an error state, the corresponding service node is marked with a red border to highlight a faulty services. If an error occurs in a service exit span, the edge indicating the call to the next service is also highlighted in red.

To view additional information about the service entry spans for each node, hover over the error state. The tooltip displays details about the service entry span's operation and resource name, along with any error messages. To further investigation, click **View Entry Span** to switch to the Waterfall view.

[1]: /glossary/#service-entry-span
[2]: /tracing/services/inferred_services
{{% /tab %}}
{{< /tabs >}}

### Trace preview
When a trace size exceeds 100MB, it cannot be fully visualized using the default trace side panel. In such cases, Trace Preview mode is enabled. This mode returns only the most critical spans to help you continue your investigation. These include:

- Service entry level spans
- Error spans
- Long-running spans
- Spans linked to other spans or traces

The available visualization options for large traces are limited to the Waterfall and Map views. In Preview mode, the Waterfall view provides additional an option to fetch spans that are not included by default. These spans are grouped and represented using numbered pills. Each pill displays the total number of spans available in that group. You can click on a number pill to expand and view all spans within that group.

{{< img src="tracing/visualization/trace/trace-preview.png" alt="Trace preview" style="width:100%;">}}

## Span search

In the Waterfall and Flamegraph visualizations, the search option allows you to find the spans that meet specific queries. Spans that match the search query are highlighted in the trace view and you can navigate between these matches using the arrows next to the search bar.

<img src="https://github.com/user-attachments/assets/4c6fc35a-65b7-42ee-bc24-fcb9adb9d0b8" alt="Search bar" style="width:90%;">

**Note**: When the `Error` checkbox is selected, the search results return spans that match the query and are in an error state.

The search query on the trace side panel supports the following options:

- **Free text search:**
Free-form text search allows filtering by service, resource, or operation name. It highlights the spans containing the specified text within these categories.
Example: `web`
- **Key-value search:**
Use key:value expression to filter spans with specific key-value pairs.
Example: `service:web-ui`

**Note**: Wildcards are not supported in the Trace search bar.

**Supported expressions:**
- Group expression: `language:(go OR python)`
- Boolean expression: `service:event-query OR terminator`
- Range expression: `duration:>200ms`

**Note**: Numerical values support `<`, `>`, `<=`, and `>=` expressions.


## More information

The height-adjustable bottom of the Trace View shows selected span and trace information. 

The span header contains service, operation, and resource names of the selected span as well as latency information. Pivot to other parts of the platform or narrow down your [Trace Explorer][5] search by clicking on the naming pill.

{{< img src="tracing/trace_view/span_header.png" alt="Span header" style="width:90%;">}}

{{< site-region region="ap1,ap2,us3,us5,eu,us" >}}
When the span represents a client call from an instrumented service to a database, a queue, or a third-party service, the span header shows the service and the inferred entity.

{{< img src="tracing/trace_view/span_header_inferred.png" alt="Span header inferred" style="width:90%;">}}
{{< /site-region >}}

{{< tabs >}}
{{% tab "Span Info" %}} 

See all span metadata, including custom tags. Click on a span tag to update the search query in the Trace Explorer or copy the tag's value to the clipboard.

Other information may be displayed under various conditions:
- Error message and stack trace (on error span)
- SQL Query markup (on database spans)
- RUM Context and Metadata (on RUM spans)
- Spark Metrics (on Spark job spans)
- A git warning message (when git information is missing on a CI Test)

{{< img src="tracing/trace_view/info_tab.png" alt="Span Info tab" style="width:90%;">}}

{{< site-region region="ap1,ap2,us3,us5,eu,us" >}}
When the service name is an override from the base service name, the top of the info section shows the:
- **[Base service][2]**: service from which the span is emitted, identified by the `@base_service` attribute.
- **[Service override][3]**: service name, different from the base service name, set automatically in Datadog integrations or changed via the programmatic API. The service override is identified by the `service` reserved attribute.
- **[Inferred service][4]** (_when applicable_): name of the inferred entity being called by the base service, identified by one of the [peer attributes][5].

{{< img src="tracing/trace_view/base_override_inferred_service.png" alt="Base, Override, and inferred service" style="width:80%;">}}

[2]: /tracing/guide/service_overrides#base-service
[3]: /tracing/guide/service_overrides
[4]: /tracing/services/inferred_services
[5]: /tracing/services/inferred_services#peer-tags
{{< /site-region >}}

[1]: /tracing/glossary/#trace
{{% /tab %}}
{{% tab "Infrastructure" %}}

Toggle between host-level and container-level (when available) infrastructure information for the selected span.

See associated tags, as well as critical host/container metrics graphs including CPU, Memory, and I/O with an overlay of when the trace occurred.

{{< img src="tracing/trace_view/infrastructure_tab.png" alt="Infrastructure tab" style="width:90%;">}}

{{% /tab %}}
{{% tab "Logs" %}}

See logs related to your service at the time of the trace. When you hover over a log, a line showing its timestamp is displayed on the trace flame graph. Clicking on the log brings you to the [Log Explorer search][1].

{{< img src="tracing/connect_logs_and_traces/logs-trace-correlation.png" alt="Logs in Traces" style="width:100%;">}}


[1]: /logs/explorer/search/
{{% /tab %}}
{{% tab "Processes" %}}

Click on a service's span to see the processes running on its underlying infrastructure. A service's span processes are correlated with the hosts or pods on which the service runs at the time of the request. You can analyze process metrics such as CPU and RSS memory alongside code-level errors to distinguish between application-specific and wider infrastructure issues. Clicking on a process will bring you to the [Live Processes page][1]. To view span-specific processes, enable [process collection][2]. Related processes are not currently supported for serverless and browser traces. 

{{< img src="tracing/trace_view/processes_tab.png" alt="Processes tab" style="width:90%;">}}

[1]: https://docs.datadoghq.com/infrastructure/process/?tab=linuxwindows
[2]: https://docs.datadoghq.com/infrastructure/process/?tab=linuxwindows#installation
{{% /tab %}}

{{% tab "Network" %}}

Click on a service's span to see network dependencies of the service making the request. Use key network performance metrics such as volume, errors (TCP retransmits), and network latency (TCP round-trip time) to differentiate between application-specific and network-wide issues, especially when no code errors have been generated. For instance, you can use network telemetry to determine if high request latency is due to traffic overloading of the relevant application, or faulty dependencies with a downstream pod, security group, or any other tagged endpoint. Clicking on a process brings you to the [Network Analytics][1] page. To view span-specific processes, enable [Cloud Network Monitoring][2].

**Note**: Related network telemetry is not currently supported for serverless traces.

{{< img src="tracing/trace_view/network_tab.png" alt="Network tab" style="width:90%;">}}

[1]: /network_monitoring/performance/network_analytics
[2]: /network_monitoring/performance/setup
{{% /tab %}}

{{% tab "Security" %}}

See attack attempts that target the services of the distributed trace. You can see the pattern used by the attacker, the rule that detects the attack, and whether the attacker found a vulnerability in your service.

Click **View in AAP** to investigate further using [Datadog App and API Protection][1].

{{< img src="tracing/trace_view/security_tab.png" alt="Security tab" style="width:90%;">}}

[1]: /security/application_security/how-it-works/
{{% /tab %}}
{{% tab "Profiles" %}}

View [Profiles][1] to identify lines of code related to performance issues. The values on the left side represent the time spent in each method call during the selected span.

{{< img src="profiler/profiles_tab.png" alt="Profiles tab showing time spent in each method for a selected span" style="width:90%;">}}

[1]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces

{{% /tab %}}
{{% tab "Span Links" %}}

[Span links][4] correlate one or more spans together that are causally related but don't have a typical parent-child relationship.

Click a span in the flame graph to display spans connected with span links:

{{< img src="tracing/span_links/span_links_tab_2.png" alt="Span Links tab" style="width:90%;">}}

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
[6]: /glossary/#service-entry-span
