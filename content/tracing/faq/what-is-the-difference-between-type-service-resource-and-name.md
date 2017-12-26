---
title: What is the Difference Between "Type", "Service", "Resource", and "Name"?
kind: faq
---

When instrumenting the Traces Agent with your applications, and going through the [Traces Page](https://app.datadoghq.com/trace/services), you may come across the following Strings: "Type", "Service", "Resource", and "Name". What do these terms mean? 

{{< img src="tracing/faq/trace_ui.png" alt="Trace UI" responsive="true" popup="true">}}

## Type

Every Service being monitored by your application is associated with a "Type". This type is automatically determined by Datadog and is applied for you. The "Type" specified the name of the application/framework the Datadog Agent is Integrating with. If you are monitoring a custom application, this appears as "Custom". For example, if you are using the official Flask Integration, the "Type" is set to "Web". 

The type can be one of:

*  Web
*  DB
*  HTTP
*  Cache
*  Custom

We also have some aliases for Integrations such as Postgres, MySQL, and Cassandra which are map to Type: "DB" and Integrations Redis and Memcache which are map to Type: "Cache". 

## Service

A "Service" is the name of a set of processes that work together to provide a feature set. For instance, a simple web application may consist of two services: a single webapp service and a single database service, while a more complex environment may break it out into 6 services: 3 separate webapp, admin, and query services, along with a master-db, a replica-db, and a yelp-api external service.

These services are defined by the user when instrumenting their application with Datadog. This field is helpful to quickly distinguish between your different processes.

In the Datadog UI, this is the "Name" field in the above image.  An example of setting a custom Service using Python: 

{{< img src="tracing/faq/custom_service.png" alt="Custom Service" responsive="true" popup="true">}}

## Resource

A particular query to a service. For a web application, some examples might be a canonical URL like `/user/home` or a handler function like

web.user.home (often referred to as "routes" in MVC frameworks). For a SQL database, a resource would be the SQL of the query itself like select * from users where id = ?

The Tracing backend can track thousands (not millions or billions) of unique resources per service, so resources should be grouped together under a canonical name, like `/user/home` rather than have `/user/home?id=100` and `/user/home?id=200` as separate resources.

These resources can be found after clicking on a particular service:

{{< img src="tracing/faq/Resources.png" alt="Resources" responsive="true" popup="true">}}

## Name (Trace)

The Name field can be found in the URL after clicking on a specific Service.

{{< img src="tracing/faq/trace_url.png" alt="Trace URL" responsive="true" popup="true">}}

 This Name/Trace is the name given around the function or method that would execute the code for each "Resource". This can be modified by using the "tracer.trace" method as seen here (again in Python): 

{{< img src="tracing/faq/name_python.png" alt="Name Python" responsive="true" popup="true">}}
