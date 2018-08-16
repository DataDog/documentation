---
title: Service Map
kind: Documentation
description: "The Service Map visualizes data that is being collected by Datadog APM."
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: Learn how to setup APM tracing with your application
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: Discover the list of services reporting to Datadog
- link: "tracing/visualization/service"
  tag: "Documentation"
  text: Learn more about services in Datadog
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: Dive into your resource performance and traces
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: Understand how to read a Datadog Trace
- link: "tracing/search"
  tag: "Documentation"
  text: Global search of all your traces with tags
---

The Service Map decomposes your application into all its component services and draws the observed dependencies between these services in real time, so you can identify bottlenecks and understand how data flows through your architecture. 

## Setup

The Service Map visualizes data that is being collected by Datadog APM. No setup is required.

## Ways to use it

We built the Service Map not only to give you an overview of all your services and their health, but also to cut through noise and isolate problem areas. You can also access other telemetry collected by Datadog directly from this view.

## Filtering vs changing scopes

The Service Map can be filtered based on the type of service it is—a webserver, database, cache, etc.—or based on a fuzzy string match. This helps you find the service you need in a microservices environment of hundreds or thousands of nodes. 

Services are also scoped by `env`, and, optionally, a [first-class dimension][1].  Using the dropdowns to select a different scope draws an entirely different map, consisting of those services within the scope. These services cannot call or be called by services in other environments.

## Inspection

Mousing over a service highlights it and shows its request traffic as animated lines to better emphasize directionality.

{{< img src="tracing/servicemap/servicemap-anim.gif" alt="Service Map" responsive="true" style="width:90%;">}}

Clicking into a service offers you the option to inspect that service. This isolates the service and shows you which other services are the sources of requests, and which ones this service requests data from (and therefore depends on). Generally, the services on the left are closer to your customers, and the ones on the right are more likely root causes.

On the inspection page, each node can itself be inspected, so you can pivot around the Service Map one dependency at a time.

{{< img src="tracing/servicemap/servicemap.png" alt="Service Map" responsive="true" style="width:90%;">}}

## The "service" tag

Clicking on a service reveals further drilldown options.

{{< img src="tracing/servicemap/servicetag.png" alt="Service Map tag" responsive="true" style="width:40%;">}}

The service tag has a special meaning in Datadog, and is used both to identify APM services and link them to other parts of the product.

The following screenshot shows a dashboard query for `service:fse-auto-process`. This is tagged automatically by APM.

{{< img src="tracing/servicemap/servicedash.png" alt="Service Map dashboard" responsive="true" style="width:90%;">}}

Using this tag on your Host Map or logs with the same key allows Datadog to join applications to logs, infrastructure, or custom business metrics. On the drilldown menu, discussed above, each option pivots to the appropriate view of the data collected by Datadog scoped to your `service`.

{{< img src="tracing/servicemap/servicemaptags.png" alt="Service Map tags" responsive="true" style="width:80%;">}}

In addition to infrastructure or logs, monitors can be tagged by service in the “Say what’s happening” section of a new monitor. This allows you to associate monitors for any metric, including custom business metrics with your services. The status of monitors is exposed directly on the Service Map.

{{< img src="tracing/servicemap/servicemon.png" alt="Service Map monitor" responsive="true" style="width:90%;">}}

## Data freshness and meaning

### Nodes and edges

Nodes represent services exactly as instrumented in APM and match those in your [Services][2] page. Edges represent aggregate calls from one service to another. You can see these interactions on the flame graph for each individual trace.

New services or connections will appear within moments of being instrumented and will age out if there are no corresponding traces seen for two weeks.  This takes into account services that do work infrequently, but are nonetheless an important part of a functioning system.

{{< img src="tracing/servicemap/servicenodes.gif" alt="Service Map nodes" responsive="true" style="width:90%;">}}

### Color

If a monitor is enabled for a service, the circumference has a weighted border colored with green, yellow, red, or grey, based on the status of that monitor.  If multiple monitors are defined, the status of the one in the most severe state is used.

Monitors are not constrained to APM monitors; the service tag, described above, can be used to associate any monitor type with a service

[1]: https://docs.datadoghq.com/tracing/setup/first_class_dimensions/
[2]: https://app.datadoghq.com/apm/services
