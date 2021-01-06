---
title: Service Map
kind: documentation
description: "The Service Map visualizes data that is being collected by Datadog APM."
aliases:
  - /tracing/servicemap
further_reading:
- link: "/tracing/setup/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "https://www.datadoghq.com/blog/service-map/"
  tag: "Blog"
  text: "Introducing the Service Map in Datadog"
- link: "https://www.datadoghq.com/videos/dash-keynote-creating-context-with-service-maps/"
  tag: "Blog"
  text: "Creating context with service maps (Datadog + Airbnb)"
---

The Service Map decomposes your application into all its component [services][1] and draws the observed dependencies between these services in real time, so you can identify bottlenecks and understand how data flows through your architecture.

{{< img src="tracing/visualization/services_map/service_map_overview.png" alt="Service Map Overview" >}}

## Setup

The Service Map visualizes data collected by Datadog APM and RUM. Setup is not required to view [services][1].

## Ways to use it

The Service Map was built to provide an overview of your services and their health. This helps to cut through noise and isolate problem areas. Also, you can access other telemetry collected by Datadog directly from this view.

## Filtering vs changing scopes

The Service Map can be filtered based on the type of service (webserver, database, cache, etc.) or based on a fuzzy string match. This is particularly useful in a microservices environment with hundreds or thousands of nodes. In addition, the service can be scoped to a specific time range, helpful for keeping track of your evolving architecture.

Services are also scoped by `env`, and, optionally, a [Second Primary Tag][2].  Using the dropdowns to select a different scope draws an entirely different map consisting of the services within that scope. These services cannot call or be called by services in other environments.

## Inspection

Mousing over a service highlights it and shows its request traffic as animated lines to better emphasize directionality.

{{< img src="tracing/visualization/services_map/servicemap-anim.mp4" alt="Service Map" video="true"  width="90%" >}}

Clicking a service offers you the option to inspect that service. This isolates the service, displays the source of requests from other services, and the requests for data sent by this service to other services. Generally, the services on the left are closer to your customers, and the ones on the right are more likely root causes.

On the inspection page, each node can be inspected allowing you to pivot around the Service Map one dependency at a time.

{{< img src="tracing/visualization/services_map/servicemap.png" alt="Service Map"  style="width:90%;">}}

## The "service" tag

Clicking on a service reveals further drill-down options:

{{< img src="tracing/visualization/services_map/servicetag.png" alt="Service Map tag"  style="width:40%;">}}

The service tag has a special meaning in Datadog, and is used both to identify APM services and link them to other parts of the product.

The following screenshot shows a dashboard query for `service:fse-auto-process`. This is tagged automatically by APM.

{{< img src="tracing/visualization/services_map/servicedash.png" alt="Service Map dashboard"  style="width:90%;">}}

Using this tag on your Host Map or logs with the same key allows Datadog to join applications to logs, infrastructure, or custom business metrics. On the drill-down menu shown above, each option pivots to the appropriate view of the collected data scoped to your `service`.

{{< img src="tracing/visualization/services_map/servicemaptags.png" alt="Service Map tags"  style="width:80%;">}}

Additionally, monitors can be tagged by service in the “Say what’s happening” section. This allows you to associate monitors for any metric, including custom business metrics, with your services. The status of monitors is exposed directly on the Service Map.

{{< img src="tracing/visualization/services_map/servicemon.png" alt="Service Map monitor"  style="width:90%;">}}

## Data freshness and meaning

### Nodes and edges

Nodes represent services exactly as instrumented in APM and match those in your [Services][3] page. Edges represent aggregate calls from one service to another. These interactions are shown on the flame graph for each individual [trace][4].

New services or connections appear within moments of being instrumented and age out if there are no corresponding traces seen for 30 days.  This takes into account services that do work infrequently, but are an important part of a functioning system.

{{< img src="tracing/visualization/services_map/servicenodes.mp4" alt="Service Map nodes" video="true"  width="90%">}}

### Color

If a monitor is enabled for a service, the circumference has a weighted border colored with green, yellow, red, or grey, based on the status of that monitor.  If multiple monitors are defined, the status of the monitor in the most severe state is used.

Monitors are not constrained to APM monitors. The service tag, described above, can be used to associate any monitor type with a service.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#services
[2]: /tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[3]: https://app.datadoghq.com/apm/services
[4]: /tracing/visualization/#trace
