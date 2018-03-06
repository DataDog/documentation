---
title: Service
kind: Documentation
further_reading:
- link: "/tracing/services/resource"
  text: "Dive into your resource performances and traces"
- link: "/tracing/services/trace"
  text: "Understand how to read a Datadog Trace"
---

<div class="alert alert-info"> 
<a href="https://docs.datadoghq.com/getting_started/apm_tracing">Read the APM Getting Started Guide</a>to get an overview of key APM concepts.
</div>

## Overview 

Selecting a service on the services page leads you to the detailed service page:

{{< img src="tracing/services/service/detailed_service_page.png" alt="Detailed service page" responsive="true" popup="true" style="width:90%;">}}

Consult on this page:

* [Service monitor states](#service-monitor) 
* [Out of the box graphs](#out-of-the-box-graphs) 
* [Resources associated to this service](/tracing/services/resource) 

## Definition

**A service is a set of processes that do the same job.**  
For instance, a simple web application may consist of two services: 

* A single `webapp` service and a single `database` service

While a more complex environment may break it out into 6 services: 

* 3 separate services: `webapp`, `admin`, and `query`.
* 3 separate external service:  `master-db`,  `replica-db`, and `yelp-api`.

Explicitly name services by instrumenting your application. For example in Python:  

```python
from ddtrace import tracer
# add the `wrap` decorator to trace an entire function
@tracer.wrap(service='my-app')
```

Read more about manually instrumenting your application for [Go](/tracing/setup/go/#opentracing-api), [Java](/tracing/setup/java/#manual-instrumentation), [Python](/tracing/setup/python/#example), [Ruby](/tracing/setup/ruby/#example)."

Service names:

* **must be lowercase, alphanumeric characters**.
* **cannot have more than 50 characters**.
* **cannot contain spaces** (spaces are replaced with underscores).
* must adhere to [metric naming rules](/developers/metrics/).

**Note**: Service must have a type attached, [learn more on Service type]().

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

[Refer to our dedicated resource documentation to learn more](/tracing/services/resource).

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