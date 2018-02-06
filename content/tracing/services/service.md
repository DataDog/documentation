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

The name of a set of processes that do the same job. For instance, a simple web application may consist of two services: 

* A single `webapp` service and a single `database` service

While a more complex environment may break it out into 6 services: 

* 3 separate services: `webapp`, `admin`, and `query`.
* 3 separate external service:  `master-db`,  `replica-db`, and `yelp-api`.

You defined those service when instrumenting your application with Datadog.
An example of setting a custom Service using Python:

{{< img src="tracing/services/custom_service.png" alt="Custom Service" responsive="true" popup="true" style="width:80%;">}}

Service names
* **must be lowercase, alphanumeric characters**.
* **cannot have more than 50 characters**.
* **cannot contain spaces** (spaces are replaced with underscores).
* must adhere to [metric naming rules](/developers/metrics/).

## Service monitor

{{< img src="tracing/services/service_monitors.png" alt="Service Monitors" responsive="true" popup="true" style="width:90%;">}}

## Out of the box graphs

## Resources

{{< img src="tracing/services/resources.png" alt="Resources" responsive="true" popup="true">}}

### Columns 
