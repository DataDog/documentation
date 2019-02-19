---
title: Service page
kind: Documentation
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
---

{{< img src="tracing/visualization/service/detailed_service_page.png" alt="Detailed service page" responsive="true" style="width:90%;">}}

## Overview 

Selecting a service on the services page leads you to the detailed service page. A service is a set of processes that do the same job - for example a web framework or database (read more about how services are defined in [Getting Started with APM][1]). 

Consult on this page:

* [Service monitor states](#service-monitor) 
* [Out of the box graphs](#out-of-the-box-graphs) 
* [Resources associated to this service][2] 

## Service Monitor

Datadog proposes a list of monitors depending on your service type: 

{{< img src="tracing/visualization/service/service_monitors.png" alt="Service Monitors" responsive="true" style="width:90%;">}}

Enable them directly or create your own [APM monitors][3].

**Note**: Tag any monitor with `service:<SERVICE_NAME>` to attach it to an APM service.  

## Out of the box graphs

Datadog provides out of the box graphs for any given Service:

* Requests - Choose to display:
    *  The **Total amount of requests** 
    *  The amount of **Requests per second**
* Latency -  Choose to display:
    *  The Avg/p75/p90/p95/p99/Max latency of your traced requests 
    *  The **Apdex score** for web services; [learn more about Apdex][4]
* Error - Choose to display:
    * The **Total amount of errors** 
    * The amount of **Errors per second** 
    * The **% Error Rate** 
* Sub-Services: When there are multiple services involved, a fourth graph is available that breaks down your **Total time spent**/**%of time spent**/**Avg time per request** of your service by *services* or *type*. For services like *Postgres* or *Redis*, which are "final" operations not calling other service underneath, there will be no Sub-services graph.

{{< img src="tracing/visualization/service/out_of_the_box_service_graph.png" alt="Out of the bow service graphs" responsive="true" style="width:90%;">}}

**Note**: Use the *cogs* icon to display all options available for any given graph.

### Export to Timeboard

On the upper-right corner of each graph click on the arrow in order to export your graph into a pre-existing [Timeboard][5]:

{{< img src="tracing/visualization/service/save_to_timeboard.png" alt="Save to timeboard" responsive="true" style="width:40%;">}}

### Latency distribution

In addition to all those graphs there is a service latency distribution graph:

{{< img src="tracing/visualization/service/latency_distribution.png" alt="latency distribution" responsive="true" style="width:90%;">}}

Use the top right selector of this graph to zoom on a given percentile of latency distribution:

{{< img src="tracing/visualization/service/latency_distribution_selector.png" alt="latency distribution selector" responsive="true" style="width:20%;">}}

## Resources

See the list of resources associated with your service. Resources are particular actions for your services (typically individual endpoints or queries). Read more about resources in [Getting Started with APM][1]. Sort the resources for this service by requests, latency, errors, and time, to identify areas of high traffic or potential trouble. Note that the these metric columns are configurable (see image below).

{{< img src="tracing/visualization/service/resources.png" alt="Resources" responsive="true" style="width:90%;">}}

[Refer to the dedicated resource documentation to learn more][2].

### Filtering the resources list
Filter your resources list with a query for basic text filtering:

{{< img src="tracing/visualization/service/resources_filtering.gif" alt="Resource filtering" responsive="true" style="width:90%;">}}

### Columns 

Choose what to display in your resources list:

* **Requests**: Absolute amount of requests traced (per seconds)
* **Avg/p75/p90/p95/p99/Max Latency**: The Avg/p75/p90/p95/p99/Max latency of your traced requests
* **Total time**: Sum of all time spend in this resource 
* **Error**: Absolute amount of error for a given resource
* **Error Rate**: Percent of error for a given resource

{{< img src="tracing/visualization/service/resource_columns.png" alt="Resource columns" responsive="true" style="width:50%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization
[2]: /tracing/visualization/resource
[3]: /monitors/monitor_types/apm
[4]: /tracing/getting_further/configure_an_apdex_for_your_traces_with_datadog_apm
[5]: /graphing/dashboards/timeboard
