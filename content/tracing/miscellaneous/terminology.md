---
title: Tracing Terminology
kind: Documentation
---

## Overview

When instrumenting your applications with the Traces Agent, and going through the [Service Page](https://app.datadoghq.com/apm/services), you may come across the following Strings: "Type", "Service", "Resource", and "Name". What do these terms mean?

{{< img src="tracing/miscellaneous/terminology/trace_ui.png" alt="Trace UI" responsive="true" popup="true" style="width:80%;">}}

### Name (Trace)

Used to track the time spent by an application processing a single operation. For example, a trace can be used to track the entire time spent processing a complicated web request. Even though the request may require multiple resources and machines to handle the request, all of these function calls and sub-requests would be encapsulated within a single trace.

The Name field can be found in the URL after clicking on a specific Service.

{{< img src="tracing/miscellaneous/terminology/trace_url.png" alt="Trace URL" responsive="true" popup="true" style="width:80%;">}}

This Name/Trace is the name given around the function or method that would execute the code for each "Resource". This can be modified by using the `tracer.trace` method as seen here (in Python):

{{< img src="tracing/miscellaneous/terminology/name_python.png" alt="Name Python" responsive="true" popup="true" style="width:50%;">}}

## Type

Every Service being monitored by your application is associated with a "Type". This type is automatically determined by Datadog and is applied for you. The "Type" specified the name of the application/framework the Datadog Agent is Integrating with. If you are monitoring a custom application, this appears as "Custom". For example, if you are using the official Flask Integration, the "Type" is set to "Web".

The type can be one of:

*  Web
*  DB
*  Cache
*  Custom

We also have some aliases for Integrations such as Postgres, MySQL, and Cassandra which are map to Type: "DB" and Integrations Redis and Memcache which are map to Type: "Cache".

### Span

Represents a logical unit of work in the system. Each trace consists of one or more spans. Spans are associated with a service and optionally a resource. Each span consists of a start time, a duration, and optional tags. For example, a span can describe the time spent on a distributed call on a separate machine, or the time spent in a small component within a larger operation. Spans can be nested within each other, and in those instances will have a parent-child relationship.

{{< img src="tracing/miscellaneous/terminology/tracing-terminology.png" alt="Visualizing tracing terms" responsive="true" popup="true" style="width:80%;">}}

### Service

The name of a set of processes that do the same job.  
For instance, a simple web application may consist of two services: 

* A single `webapp` service and a single `database` service

While a more complex environment may break it out into 6 services: 

* 3 separate services: `webapp`, `admin`, and `query`.
* 3 separate external service:  `master-db`,  `replica-db`, and `yelp-api`.

These services are defined by the user when instrumenting their application with Datadog. This field is helpful to quickly distinguish between your different processes.

In the Datadog UI, this is the "Name" field in the above image.  An example of setting a custom Service using Python:

{{< img src="tracing/miscellaneous/terminology/custom_service.png" alt="Custom Service" responsive="true" popup="true" style="width:80%;">}}

### Resource

A particular query to a service. For a web application, some examples might be a canonical URL like `/user/home` or a handler function like `web.user.home` (often referred to as "routes" in MVC frameworks). For a SQL database, a resource would be the SQL of the query itself like `select * from users where id = ?`.

Resources should be grouped together under a canonical name, like `/user/home` rather than have `/user/home?id=100` and `/user/home?id=200` as separate resources.

These resources can be found after clicking on a particular service:

{{< img src="tracing/miscellaneous/terminology/resources.png" alt="Resources" responsive="true" popup="true" style="width:50%;">}}
