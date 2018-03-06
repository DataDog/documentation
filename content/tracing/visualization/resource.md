---
title: Resource
kind: Documentation
further_reading:
- link: "/tracing/setup/"
  tag: "Documentation"
  text: Learn how to setup APM tracing with your application
- link: "/tracing/visualization/services_list/"
  tag: "Documentation"
  text: Discover the list of services reporting to Datadog
- link: "/tracing/visualization/service"
  tag: "Documentation"
  text: Learn more about services in Datadog
- link: "/tracing/visualization/trace"
  tag: "Documentation"
  text: Understand how to read a Datadog Trace
---

{{< img src="tracing/services/resource/ressource.png" alt="Ressource" responsive="true" popup="true">}}

## Out of the box graphs

Datadog provides out of the box graphs for any given Resource:

* Requests - Choose to display:
    *  The **Total amount of requests** 
    *  The amount of **Requests per second**
* Latency -  Choose to display:
    *  The Avg/p75/p90/p95/p99/Max latency of your traced requests 
* Error - Choose to display:
    * The **Total amount of errors** 
    * The amount of **Errors per second** 
    * The **% Error Rate** 
* Sub-Services: When there is multiple service involved a 4th graph is available that breaks down your **Total time spent**/**%of time spent**/**Avg time per request** of your service by *services* or *type*. For services like *Postgres* or *Redis*, which are "final" operations not calling other service underneath, there will be no Sub-services graph.

{{< img src="tracing/services/resource/resource_otb_graphs.png" alt="Out of the bow resource graphs" responsive="true" popup="true" style="width:90%;">}}

### Export to Timeboard

On the upper-right corner of each graphs click on the little arrow in order to export your graph into a pre-existing [Timeboard](/graphing/dashboards/timeboard):

{{< img src="tracing/services/resource/save_to_timeboard.png" alt="Save to timeboard" responsive="true" popup="true" style="width:40%;">}}

### Latency distribution

In addition to all those graph there is a resource latency distribution graph

{{< img src="tracing/services/resource/resource_latency_distribution.png" alt="Latency distribution" responsive="true" popup="true" style="width:90%;">}}

Use the top right selector of this graph to zoom on a given percentile of latency distribution:

{{< img src="tracing/services/service/latency_distribution_selector.png" alt="latency distribution selector" responsive="true" popup="true" style="width:20%;">}}

Zoom on this graph to filter corresponding traces.

## Traces

Consult the list of sampled traces associated to your service. Filter/sort this list to see fast/slow and error/non-error traces:  

[Refer to our dedicated trace documentation to learn more](/tracing/visualization/trace).

{{< img src="tracing/services/resource/traces_list.png" alt="Traces list" responsive="true" popup="true" style="width:90%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}