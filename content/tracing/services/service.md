---
title: Service
kind: Documentation
---

Selecting a service on the services page leads you to the detailed service page:

{{< img src="tracing/services/service/detailed_service_page.png" alt="Detailed service page" responsive="true" popup="true" style="width:90%;">}}

Consult on this page:

* Your [service monitor states](#service-monitor) 
* Your [out of the box graphs](#out-of-the-box-graphs) 
* Your [Resources](/tracing/services/resource) 

## Definition

**A Service is the name of a set of processes that do the same job.**  
For instance, a simple web application may consist of two services: 

* A single `webapp` service and a single `database` service

While a more complex environment may break it out into 6 services: 

* 3 separate services: `webapp`, `admin`, and `query`.
* 3 separate external service:  `master-db`,  `replica-db`, and `yelp-api`.

You defined those service when instrumenting your application with Datadog.
An example of setting a custom Service using Python:
```python
from ddtrace import tracer
# add the `wrap` decorator to trace an entire function
@tracer.wrap(service='my-app')
```

Service names:

* **must be lowercase, alphanumeric characters**.
* **cannot have more than 50 characters**.
* **cannot contain spaces** (spaces are replaced with underscores).
* must adhere to [metric naming rules](/developers/metrics/).

## Service monitor

Datadog propose list of monitor depending of your service name/(type?): 

{{< img src="tracing/services/service/service_monitors.png" alt="Service Monitors" responsive="true" popup="true" style="width:90%;">}}

Enable them directly or create your own [APM monitors](/monitors/monitor_types/apm)

Hard-coded one + any monitor tagged with the service name in the monitor list


## Out of the box graphs

Datadog provides out of the box graphs for any given Service:

* Requests - Choose to display:
    *  The **Total amount of requests** 
    *  The amount of **Requests per second**
* Latency -  Choose to display:
    *  The Avg/p75/p90/p95/p99/Max latency of your traced requests 
    *  The **[Apdex](/tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm) score** of your service
* Error - Choose to display:
    * The **Total amount of errors** 
    * The amount of **Errors per second** 
    * The **% Error Rate** 
* Sub-Services: When there is multiple service involved a 4th graph is available that breaks down your **Total time spent**/**%of time spent**/**Avg time per request** of your service by *services* or *type*.

{{< img src="tracing/services/service/out_of_the_box_service_graph.png" alt="Out of the bow service graphs" responsive="true" popup="true" style="width:90%;">}}

### Export to Timeboard

On the upper-right corner of each graphs click on the little arrow in order to export your graph into a pre-existing [Timeboard](/graphing/dashboards/timeboard):

{{< img src="tracing/services/service/save_to_timeboard.png" alt="Save to timeboard" responsive="true" popup="true" style="width:40%;">}}

### Latency distribution

In addition to all those graphs there is a service latency distribution graph

{{< img src="tracing/services/service/latency_distribution.png" alt="latency distribution" responsive="true" popup="true" style="width:90%;">}}

## Resources

Consult the list of resources associated to your service:

{{< img src="tracing/services/service/resources.png" alt="Resources" responsive="true" popup="true" style="width:90%;">}}

[Refer to our dedicated resource documentation to learn more](/tracing/services/resource).

### Filtering the resources list
Filter your resources list with a query:

{{< img src="tracing/services/service/resources_filtering.gif" alt="Resource filtering" responsive="true" popup="true" style="width:90%;">}}

### Columns 

Choose what do display in your resources list:

* **Request**: Absolute amount of requests traced (per seconds)
* **Avg/p75/p90/p95/p99/Max Latency**: The Avg/p75/p90/p95/p99/Max latency of your traced requests
* **Total time**: Sum of all time spend in this resource 
* **Error**: Absolute amount of error for a given resource
* **Error Rate**: Percent of error for a given resource

{{< img src="tracing/services/service/resource_columns.png" alt="Resource columns" responsive="true" popup="true" style="width:50%;">}}