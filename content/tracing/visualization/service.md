---
title: Service
kind: Documentation
further_reading:
- link: "/tracing/setup/"
  tag: "Documentation"
  text: Learn how to setup APM tracing with your application
- link: "/tracing/visualization/services_list/"
  tag: "Documentation"
  text: Discover the list of services reporting to Datadog
- link: "/tracing/visualization/resource"
  tag: "Documentation"
  text: Dive into your resource performances and traces
- link: "/tracing/visualization/trace"
  tag: "Documentation"
  text: Understand how to read a Datadog Trace
---

## Overview 

Selecting a service on the services page leads you to the detailed service page:

{{< img src="tracing/services/service/detailed_service_page.png" alt="Detailed service page" responsive="true" popup="true" style="width:90%;">}}

Consult on this page:

* [Service monitor states](#service-monitor) 
* [Out of the box graphs](#out-of-the-box-graphs) 
* [Resources associated to this service](/tracing/visualization/resource) 

## Service monitor

Datadog propose list of monitor depending of your service type: 

{{< img src="tracing/services/service/service_monitors.png" alt="Service Monitors" responsive="true" popup="true" style="width:90%;">}}

Enable them directly or create your own [APM monitors](/monitors/monitor_types/apm).

**Note**: Tag any monitor with `service:<SERVICE_NAME>` to attach it to an APM service.

## Out of the box graphs

Datadog provides out of the box graphs for any given Service:

* Requests - Choose to display:
    *  The **Total amount of requests** 
    *  The amount of **Requests per second**
* Latency -  Choose to display:
    *  The Avg/p75/p90/p95/p99/Max latency of your traced requests 
    *  The **[Apdex](/tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm) score** of your service (for *web* type service only)
* Error - Choose to display:
    * The **Total amount of errors** 
    * The amount of **Errors per second** 
    * The **% Error Rate** 
* Sub-Services: When there is multiple service involved a 4th graph is available that breaks down your **Total time spent**/**%of time spent**/**Avg time per request** of your service by *services* or *type*. For services like *Postgres* or *Redis*, which are "final" operations not calling other service underneath, there will be no Sub-services graph.

{{< img src="tracing/services/service/out_of_the_box_service_graph.png" alt="Out of the bow service graphs" responsive="true" popup="true" style="width:90%;">}}

### Export to Timeboard

On the upper-right corner of each graphs click on the little arrow in order to export your graph into a pre-existing [Timeboard](/graphing/dashboards/timeboard):

{{< img src="tracing/services/service/save_to_timeboard.png" alt="Save to timeboard" responsive="true" popup="true" style="width:40%;">}}

### Latency distribution

In addition to all those graphs there is a service latency distribution graph

{{< img src="tracing/services/service/latency_distribution.png" alt="latency distribution" responsive="true" popup="true" style="width:90%;">}}

Use the top right selector of this graph to zoom on a given percentile of latency distribution:

{{< img src="tracing/services/service/latency_distribution_selector.png" alt="latency distribution selector" responsive="true" popup="true" style="width:20%;">}}

## Resources

Consult the list of resources associated to your service:

{{< img src="tracing/services/service/resources.png" alt="Resources" responsive="true" popup="true" style="width:90%;">}}

[Refer to our dedicated resource documentation to learn more](/tracing/visualization/resource).

### Filtering the resources list
Filter your resources list with a query for basic text filtering:

{{< img src="tracing/services/service/resources_filtering.gif" alt="Resource filtering" responsive="true" popup="true" style="width:90%;">}}

### Columns 

Choose what do display in your resources list:

* **Request**: Absolute amount of requests traced (per seconds)
* **Avg/p75/p90/p95/p99/Max Latency**: The Avg/p75/p90/p95/p99/Max latency of your traced requests
* **Total time**: Sum of all time spend in this resource 
* **Error**: Absolute amount of error for a given resource
* **Error Rate**: Percent of error for a given resource

{{< img src="tracing/services/service/resource_columns.png" alt="Resource columns" responsive="true" popup="true" style="width:50%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}