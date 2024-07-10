---
title: Resource Page
aliases:
- /tracing/visualization/resource/
further_reading:
- link: "https://www.datadoghq.com/blog/dependency-map-navigator/"
  tag: "Blog"
  text: "Pinpoint performance issues in downstream services with the Dependency Map Navigator"
- link: "/tracing/trace_collection/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Discover and catalog the services reporting to Datadog"
- link: "/tracing/services/service_page/"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "/tracing/trace_explorer/trace_view/"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
---

{{< img src="tracing/visualization/resource/resource-page-cropped.png" alt="The APM resource page, showing monitor status and trends for key metrics" >}}

A resource is a particular action for a given [service][1] (typically an individual endpoint or query). Read more about resources in [Getting Started with APM][2]. For each resource, APM automatically generates a dashboard page covering:

* Key health metrics
* Monitor status for all monitors associated with this service
* List of metrics for all resources associated with this service

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

{{< img src="tracing/visualization/resource/resource_otb_graphs.png" alt="Out-of-the-box resource graphs showing requests per second, latency, total errors, and percent time spent per service" style="width:90%;">}}

### Export to dashboard

On the upper-right corner of each graph, click on the up arrow in order to export your graph into a pre-existing [Dashboard][4].

### Latency distribution

The resource page also displays a resource latency distribution graph:

{{< img src="tracing/visualization/resource/resource_latency_distribution.png" alt="A latency distribution graph showing a distribution of the time taken per resource request" style="width:100%;">}}

Use the top right percentile selectors to zoom into a given percentile, or hover over the sidebar to view percentile markers.

{{< img src="tracing/visualization/service/latency_distribution_sidebar.png" alt="A close-up of the latency distribution graph sidebar which allows filtering on percentiles" style="width:50%;">}}

## Dependency Map with Navigator

You can also view a map of all of a resource's upstream and downstream service dependencies. With the Dependency Map Navigator, you can see the flow of services, with spans that go through a specific resource ( endpoint, database query, etc.) end-to-end, along with their request counts. 

This map is based on a sample of ingested spans; the sample is drawn by a fixed sampling algorithm that considers the structure of traces. The sampling algorithm is not configurable and is not impacted by ingestion control. 

The dependency map is only available for resources containing service entry spans. 

{{< img src="tracing/visualization/resource/dependency-map-navigator-cropped.png" alt="A dependency map for a resource, with a list of service dependencies and flow diagram of requests from service to service" style="width:100%;" >}}

Hover over a node to view metrics of each service including requests/second, error rate, and average latency. Click on a node to open a context menu with options to view the Service Page, related traces, and more.

The highlight color of the node indicates the service's [monitor status][5]. If a service has more than one configured monitor, the status of the most severe monitor is shown.

{{< img src="tracing/visualization/resource/dependency-navigator-cropped.mp4" video="true" alt="A video that shows selecting a service in the dependency map list to view the flow of requests into and out of that service" style="width:100%;" >}}

### Load amplification

A service has load amplification if it's receiving more than 100% of the requests received by the selected resource upstream. Services with call paths highlighted in orange have load amplification, and the amplification multiplier is shown in the list on the panel. The amplification is calculated based on the requests received by the resource (shown highlighted on the map in the image below), and the requests received by the downstream service (shown inside the downstream service node on the map). By clicking on a service in the list, you can see the spans contributing to the amplification.

{{< img src="tracing/visualization/resource/dependency-map-requests-cropped.png" alt="A dependency map that shows the flow of requests into and out of a particular resource and highlights the request count of that resource" style="width:100%;" >}}


## Span summary

For a given resource, Datadog provides you a [span][6] analysis breakdown of all matching traces:

{{< img src="tracing/visualization/resource/span_stats.png" alt="A table showing several key metrics for a list of the spans associated with a particular resource" style="width:80%;">}}

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

The span summary table is only available for resources containing service entry spans.

## Traces

Consult the list of [traces][7] associated with this resource in the [Trace search][8] modal already filtered on your environment, service, operation, and resource name:

{{< img src="tracing/visualization/resource/traces_list.png" alt="A list of traces associated with a particular resource that shows the timestamp, duration, status, and latency breakdown of each trace" style="width:90%;">}}

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
