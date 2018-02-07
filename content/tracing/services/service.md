---
title: Service
kind: Documentation
---

Selecting a service on the services page leads you to the detailed service page:

{{< img src="tracing/services/detailed_service_page.png" alt="Detailed service page" responsive="true" popup="true" style="width:90%;">}}

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

{{< img src="tracing/services/service_monitors.png" alt="Service Monitors" responsive="true" popup="true" style="width:90%;">}}

Enable them directly or create your own [APM monitors](/monitors/monitor_types/apm)

## Out of the box graphs

//  
// Is there specific graph for specific service type?  
// Is there graphs that are shared across all services ?  
//  
//  

## Resources

Consult the list of resources associated to your service:

{{< img src="tracing/services/resources.png" alt="Resources" responsive="true" popup="true" style="width:90%;">}}

[Refer to our dedicated resource documentation to learn more](/tracing/services/resource).

### Columns 

{{< img src="tracing/services/resource_columns.png" alt="Resource columns" responsive="true" popup="true" style="width:50%;">}}

Choose what do display in your resources list:

* **Request**: Absolute amount of requests traced (per seconds)
* **Avg/p75/p90/p95/p99/Max Latency**: The Avg/p75/p90/p95/p99/Max latency of your traced requests
* **Total time**: Sum of all time spend in this resource 
* **Error**: Absolute amount of error for a given resource
* **Error Rate**: Percent of error for a given resource