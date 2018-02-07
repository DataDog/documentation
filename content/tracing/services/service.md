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

Each Service has 3 out of the box graphs:

* Request:
    {{< img src="tracing/services/service/request_graph.png" alt="Request Graph" responsive="true" popup="true" style="width:40%;">}}
* Latency:
    {{< img src="tracing/services/service/latency_graph_1.png" alt="Latency Graph" responsive="true" popup="true" style="width:40%;">}}
Apdex one
* Error:
    {{< img src="tracing/services/service/error_graph.png" alt="Error graph" responsive="true" popup="true" style="width:40%;">}}

When there is multiple service involved then there is a 4th graph breakdown by suplier  (sub services)

{{< img src="tracing/services/service/by_service_graph.png" alt="By service graph" responsive="true" popup="true" style="width:40%;">}}

In addition to all those graph there is a latency distribution graph

{{< img src="tracing/services/service/latency_distribution.png" alt="latency distribution" responsive="true" popup="true" style="width:90%;">}}

## Resources

Consult the list of resources associated to your service:

{{< img src="tracing/services/service/resources.png" alt="Resources" responsive="true" popup="true" style="width:90%;">}}

[Refer to our dedicated resource documentation to learn more](/tracing/services/resource).

### Filtering the resources list
Filter your resources list with a query:

{{< img src="tracing/services/service/resources_filtering.gif" alt="Resource filtering" responsive="true" popup="true" style="width:90%;">}}

### Columns 

{{< img src="tracing/services/service/resource_columns.png" alt="Resource columns" responsive="true" popup="true" style="width:50%;">}}

Choose what do display in your resources list:

* **Request**: Absolute amount of requests traced (per seconds)
* **Avg/p75/p90/p95/p99/Max Latency**: The Avg/p75/p90/p95/p99/Max latency of your traced requests
* **Total time**: Sum of all time spend in this resource 
* **Error**: Absolute amount of error for a given resource
* **Error Rate**: Percent of error for a given resource