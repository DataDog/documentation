---
title: Resource Page
description: Analyze resource performance with health metrics, dependency maps, span summaries, and frontend impact data.
aliases:
- /tracing/visualization/resource/
further_reading:
- link: "https://www.datadoghq.com/blog/dependency-map-navigator/"
  tag: "Blog"
  text: "Pinpoint performance issues in downstream services with the Dependency Map Navigator"
- link: "/tracing/trace_collection/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "/tracing/software_catalog/"
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

Datadog provides out-of-the-box graphs for any given resource. Use the dropdown above each graph to change the displayed information.

{{< img src="tracing/visualization/resource/resource_otb_graphs.png" alt="Out-of-the-box resource graphs showing requests per second, latency, total errors, and percent time spent per service" style="width:90%;">}}

{{% apm-ootb-graphs %}}

### Export to dashboard

On the upper-right corner of each graph, click on the up arrow in order to export your graph into a pre-existing [Dashboard][4].

### Latency distribution

The resource page also displays a resource latency distribution graph:

{{< img src="tracing/visualization/resource/resource_latency_distribution.png" alt="A latency distribution graph showing a distribution of the time taken per resource request" style="width:100%;">}}

Use the top right percentile selectors to zoom into a given percentile, or hover over the sidebar to view percentile markers.

{{< img src="tracing/visualization/service/latency_distribution_sidebar.png" alt="A close-up of the latency distribution graph sidebar which allows filtering on percentiles" style="width:50%;">}}

## Dependency Map 

Use the Dependency Map to view a flow graph of all of a resource's upstream and downstream service dependencies. The map is scoped to the requests flowing through the selected service and resource (endpoint, database query, etc.) you're focused on.

{{< site-region region="ap1,us3,us5,eu,us,ap2" >}}
[Inferred service dependencies][10] like databases, queues or third-party services are represented with a purple background node.

[10]: /tracing/services/inferred_services/
{{< /site-region >}}

Click on a downstream or upstream service node to see which resources are invoked in the request flow. To focus on a particular request path, select a node an click `set as start/end`. This filters the map to focus on the requests that also flow through this upstream or downstream dependency.

**Note**: This map is based on a sample of ingested spans. Request rates are then upscaled based on applied sampling rates to represent actual application/service traffic.

The dependency map is only available for service-entry span resources.

{{< img src="tracing/visualization/resource/dependency_map.png" alt="Resource page dependency map" style="width:100%;" >}}

{{< site-region region="ap1,us3,us5,eu,us,ap2" >}}
**Note**: [Service overrides][9] are represented as part of the edge of the dependency map to keep visibility over the actual remote service, database or queue the service is interacting with.

[9]: /tracing/guide/service_overrides/
{{< /site-region >}}

### Frontend Impact

Datadog provides you visibility into how a web resource impacts your frontend applications. You can understand what frontend view is sending requests to the resource and identify views that are experiencing high latency or errors from the resource. 

{{< img src="tracing/visualization/resource/resource_frontend_impact.png" alt="A table showing several key metrics for a list of views sending requests to a particular resource" style="width:100%;" >}} 

Isolate requests and errors over time for a specific frontend view by hovering over a RUM View Name in the table and clicking on **Isolate this View**. From here, you can explore sampled traces originating from the frontend views by clicking on **View Traces** at the top right of the panel. You can also investigate the sampled RUM sessions for each view by clicking on the context menu for a frontend view in the table. 

The frontend impact panel is only available if you use Real User Monitoring (RUM) and the resource belongs to a web service. Unlike the requests, errors, and latency graphs which use unsampled data sources, the frontend impact metrics are built on indexed trace data from the past 1 hour: 

`RUM View Name:` 
: Name of the frontend view 

`App Name:` 
: Name of application that contains the frontend view

`Sessions:` 
: Number of sessions for the frontend view

`Error Rate Per Sessions:` 
: Number of sessions that included the frontend view 

`P95 Latency` 
: P95 latency for requests originating from the frontend view  

`Requests` 
: Number of requests originating from the frontend view  


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

## Endpoint definition

An endpoint is an HTTP resource exposed by a service at a specific URL path.

If a resource represents an endpoint, a new **Definition** section is added to the resource page.

{{< img src="tracing/software_catalog/definition-section.png" alt="Resource side panel showing endpoint Definition section." style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/glossary/#services
[2]: /tracing/glossary/
[3]: /tracing/glossary/#trace
[4]: /dashboards/
[5]: /monitors/status/
[6]: /tracing/glossary/#spans
[7]: /tracing/trace_explorer/trace_view/
[8]: /tracing/search/

