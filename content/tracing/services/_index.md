---
title: Services list
kind: Documentation
further_reading:
- link: "/tracing/services/service"
  text: Learn more about services in Datadog
- link: "/tracing/services/resource"
  text: "Dive into your resource performances and traces"
- link: "/tracing/services/trace"
  text: "Understand how to read a Datadog Trace"
---

<div class="alert alert-info"> 
<a href="https://docs.datadoghq.com/getting_started/apm_tracing">Read our APM getting started page</a>to have a bird-eyed view of all tracing concepts
</div>

## Overview

After you have [instrumented your application](/tracing/setup), your reporting services appear on [the APM services page](https://app.datadoghq.com/apm/services).  
Select a service view detailed performance insights, [read our dedicated service documentation to learn more](tracing/services/service)

{{< img src="tracing/services/services_page.png" alt="Services page" responsive="true" popup="true">}}

## Filtering the service list

The services list is a bird's eye view of all [services](/tracing/services/service) reporting from your infrastructure. It can be filtered by:

* [Environment](/tracing/setup/environment)
* [Service type](#services-types)
* A query (basic text filtering)

{{< img src="tracing/services/services_filtering.gif" alt="Services filtering" responsive="true" popup="true" style="width:75%;">}}

### Services types

Every Service monitored by your application is associated with a "type". This type is automatically determined by Datadog based on the `span.type` attribute attached to your [spans](/tracing/services/trace/#spans). The "type" specified the name of the application/framework the Datadog Agent is integrating with.

For example, if you are using the official Flask Integration, the "Type" is set to "Web". If you are monitoring a custom application, the "Type" appears as "Custom".

The type of the service can be one of:

*  Cache
*  Custom
*  DB
*  Web

We also have some aliases for Integrations such as Postgres, MySQL, and Cassandra which are map to Type: "DB" and Integrations Redis and Memcache which are map to Type: "Cache".

#### Change service color

Select your service color to change it:

{{< img src="tracing/services/service_color.png" alt="Services colors" responsive="true" popup="true" style="width:30%;">}}

## Columns

Choose what do display in your services list:

* **Request**: Total amount of requests traced (per seconds)
* **Avg/p75/p90/p95/p99/Max Latency**: Avg/p75/p90/p95/p99/Max latency of your traced requests
* **Error Rate**: Amount of requests traced (per seconds) that ended with an error
* **Apdex**: Apdex score of the service, [learn more on Apdex](/tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm)
* **Monitor status**: [Status of monitors](/tracing/services/service/#service-monitor) attached to a service

{{< img src="tracing/services/services_columns.png" alt="Services columns" responsive="true" popup="true" style="width:40%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}