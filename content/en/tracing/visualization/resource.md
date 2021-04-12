---
title: Resource Page
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
- link: "/tracing/visualization/trace/"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
---

{{< img src="tracing/visualization/resource/ressource.png" alt="Ressource"  >}}

A resource is a particular action for a given [service][1] (typically an individual endpoint or query). Read more about resources in [Getting Started with APM][2]. For each resource, APM automatically generates a dashboard page covering:

* Key health metrics
* Monitor status for all monitors associated with this service
* List and metrics for all resources associated with this service

## Out of the box graphs

Datadog provides out of the box graphs for any given resource:

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

### Export to Timeboard

On the upper-right corner of each graph, click on the up arrow in order to export your graph into a pre-existing [Timeboard][4].

### Latency distribution

The resource page also displays a resource latency distribution graph:

{{< img src="tracing/visualization/resource/resource_latency_distribution.png" alt="Latency distribution"  style="width:100%;">}}

Use the top right percentile selectors to zoom into a given percentile, or hover over the sidebar to view percentile markers.

{{< img src="tracing/visualization/service/latency_distribution_sidebar.png" alt="latency distribution selector"  style="width:50%;">}}

## Span Summary

For a given resource, Datadog provides you a [span][5] analysis breakdown of all matching traces:

{{< img src="tracing/visualization/resource/span_stats.png" alt="Span statistics"  style="width:80%;">}}

The displayed metrics represent, per span:

| Metric            | Description                                                                                                                                        |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| `Avg Span/trace`  | Average number of occurrences of the span, for traces including the current resource, where the span is present at least once.                     |
| `% of traces`     | Percentage of traces including the current resource where the span is present at least once.                                                       |
| `Avg duration`    | Average duration of the span, for traces including the current resource, where the span is present at least once.                                  |
| `Avg % Exec Time` | Average ratio of execution time for which the span was active, for traces including the current resource, where the span is present at least once. |

**Note**: A span is considered active when it's not waiting for a child span to complete. The active spans at a given time, for a given trace, are all the leaf spans (i.e.: spans without children).

## Traces

Consult the list of [traces][6] associated with this resource in the [Trace search][7] modal already filtered on your environment, service, operation, and resource name:

{{< img src="tracing/visualization/resource/traces_list.png" alt="Traces list"  style="width:90%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#services
[2]: /tracing/visualization/
[3]: /tracing/visualization/#trace
[4]: /dashboards/timeboard/
[5]: /tracing/visualization/#spans
[6]: /tracing/visualization/trace/
[7]: /tracing/search/
