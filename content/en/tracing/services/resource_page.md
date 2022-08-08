---
title: Resource Page
kind: documentation
aliases:
- /tracing/visualization/resource/
further_reading:
- link: "/tracing/trace_collection/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "/tracing/services/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "/tracing/services/service_page/"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "/tracing/trace_explorer/trace_view/"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
---

{{< img src="tracing/visualization/resource/ressource.png" alt="Ressource"  >}}

A resource is a particular action for a given [service][1] (typically an individual endpoint or query). Read more about resources in [Getting Started with APM][2]. For each resource, APM automatically generates a dashboard page covering:

* Key health metrics
* Monitor status for all monitors associated with this service
* List and metrics for all resources associated with this service

## Out-of-the-box graphs

Datadog provides out-of-the-box graphs for any given resource:

* Requests - Choose to display:
    *  The **Total amount of requests**
    *  The amount of **Requests per second**
* Latency -  Choose to display:
    *  The Avg/p75/p90/p95/p99/Max latency of your traced requests
* Error - Choose to display:
    * The **Total amount of errors**
    * The amount of **Errors per second**
    * The **% Error Rate**
* Sub-Services: When there are multiple services involved, a fourth graph is available that breaks down your **Total time spent**/**%of time spent**/**Avg time per request** of your service by *services* or *type*.

    This represents the total/relative/average time spent by [traces][3] from the current service to the other *services* or *type*.

    **Note**: For services like *Postgres* or *Redis*, which are "final" operations that do not call other services, there is no sub-services graph.

{{< img src="tracing/visualization/resource/resource_otb_graphs.png" alt="Out of the bow resource graphs"  style="width:90%;">}}

### Export to dashboard

On the upper-right corner of each graph, click on the up arrow in order to export your graph into a pre-existing [Dashboard][4].

### Latency distribution

The resource page also displays a resource latency distribution graph:

{{< img src="tracing/visualization/resource/resource_latency_distribution.png" alt="Latency distribution"  style="width:100%;">}}

Use the top right percentile selectors to zoom into a given percentile, or hover over the sidebar to view percentile markers.

{{< img src="tracing/visualization/service/latency_distribution_sidebar.png" alt="latency distribution selector"  style="width:50%;">}}

## Dependency Map

You can also view a map of all of a resource’s upstream and downstream service dependencies. With the Dependency Map, you can quickly see the flow of services with spans that go through the specific resource (such as endpoints or database queries) end-to-end.

{{<img alt="resource dependency map" src="tracing/visualization/resource/resource_dependency_map.png" style="width:100%;">}}

Hover over a node to view metrics of each service including requests/second, error rate, and average latency.

The highlight color of the node indicates the service’s [monitor status][5]. If a service has more than one configured monitor, the status of the most severe monitor is shown.

{{<img src="tracing/visualization/resource/resource_dependency_map_hover.mp4" video="true" alt="hovering and clicking a resource dependency map node" style="width:100%;">}}

Click on a node to open a context menu with options to view the Service Page, related traces, and more.

## Span summary

For a given resource, Datadog provides you a [span][6] analysis breakdown of all matching traces:

{{< img src="tracing/visualization/resource/span_stats.png" alt="Span statistics"  style="width:80%;">}}

The displayed metrics represent, per span:

`Avg Spans/trace`
: Average number of occurrences of the span, for traces including the current resource, where the span is present at least once.

`% of Traces`
: Percentage of traces including the current resource where the span is present at least once.

`Avg Duration`
: Average duration of the span, for traces including the current resource, where the span is present at least once.

`Avg % Exec Time`
: Average ratio of execution time for which the span was active, for traces including the current resource, where the span is present at least once.

**Note**: A span is considered active when it's not waiting for a child span to complete. The active spans at a given time, for a given trace, are all the leaf spans (in other words, spans without children).

## Traces

Consult the list of [traces][7] associated with this resource in the [Trace search][8] modal already filtered on your environment, service, operation, and resource name:

{{< img src="tracing/visualization/resource/traces_list.png" alt="Traces list"  style="width:90%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/glossary/#services
[2]: /tracing/glossary/
[3]: /tracing/glossary/#trace
[4]: /dashboards/
[5]: /monitors/manage/status/
[6]: /tracing/glossary/#spans
[7]: /tracing/trace_explorer/trace_view/
[8]: /tracing/search/
