---
title: Services list
kind: Documentation
further_reading:
- link: "/tracing/setup/"
  tag: "Documentation"
  text: Learn how to setup APM tracing with your application
- link: "/tracing/visualization/service"
  tag: "Documentation"
  text: Learn more about services in Datadog
- link: "/tracing/visualization/resource"
  tag: "Documentation"
  text: Dive into your resource performance and traces
- link: "/tracing/visualization/trace"
  tag: "Documentation"
  text: Understand how to read a Datadog Trace
---

{{< img src="tracing/visualization/services_page.png" alt="Services page" responsive="true" popup="true">}}

## Overview

After you have [instrumented your application](/tracing/setup), your reporting services appear on [the APM services page](https://app.datadoghq.com/apm/services). The services list is a bird's eye view of all [services](/tracing/visualization/service) reporting from your infrastructure.  
Select an individual service to view detailed performance insights, [read our dedicated service documentation to learn more](/tracing/visualization/service).

## Filtering the service list

Filter the services list depending on: 

* [Environment](/tracing/setup/environment)
* [Service type](#services-types)
* A query (basic text filtering)

{{< img src="tracing/visualization/services_filtering.gif" alt="Services filtering" responsive="true" popup="true" style="width:75%;">}}

### Services types

Every service monitored by your application is associated with a "type". This type is automatically determined by Datadog based on the `span.type` attribute attached to your [spans](/tracing/visualization/trace/#spans). The "type" specified the name of the application/framework the Datadog Agent is integrating with.

For example, if you are using the official Flask Integration, the "Type" is set to "Web". If you are monitoring a custom application, the "Type" appears as "Custom".

The type of the service can be one of:

*  Cache
*  Custom
*  DB
*  Web

We also have some aliases for Integrations such as Postgres, MySQL, and Cassandra which are map to Type: "DB" and Integrations Redis and Memcache which are map to Type: "Cache".

### Changing service color

Service color is used in [trace visualizations](/tracing/visualization/trace). Select your service color to change it:

{{< img src="tracing/visualization/service_color.png" alt="Services colors" responsive="true" popup="true" style="width:30%;">}}

## Selecting Columns

Choose what to display in your services list:

* **Requests**: Total amount of requests traced (per seconds)
* **Avg/p75/p90/p95/p99/Max Latency**: Avg/p75/p90/p95/p99/Max latency of your traced requests
* **Error Rate**: Amount of requests traced (per seconds) that ended with an error
* **Apdex**: Apdex score of the service, [learn more on Apdex](/tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm)
* **Monitor status**: [Status of monitors](/tracing/visualization/service/#service-monitor) attached to a service

{{< img src="tracing/visualization/services_columns.png" alt="Services columns" responsive="true" popup="true" style="width:40%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}