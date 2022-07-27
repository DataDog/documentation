---
title: Services List
kind: documentation
aliases:
- /tracing/visualization/services_list/
further_reading:
- link: "/tracing/trace_collection/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "/tracing/services/service_page/"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "/tracing/services/resource_page/"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "/tracing/trace_explorer/trace_view/"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
---

{{< img src="tracing/visualization/services_page_2.png" alt="Services page"  >}}

<div class="alert alert-warning">The Services List is being replaced by the <a href="https://app.datadoghq.com/services">Service Catalog</a>. Read more in the <a href="/tracing/service_catalog/">Service Catalog documentation</a>.</div>

## Overview 

After you [instrument your application][1], your reporting [services][2] appear on [the APM services page][3]. The services list is a high-level view of all [services][4] reporting from your infrastructure.
Select an individual service to view detailed performance insights. [Read the dedicated service documentation to learn more][4].

## Filtering the service list

Filter the services list by:

* [Environment][5]
* [Primary Tag][6]
* [Facets](#facets)
* [Services type](#services-types)
* A query (basic text filtering)


{{< img src="tracing/visualization/services_filtering_2.mp4" alt="Services filtering" video="true" width="100%" >}}

### Facets

You can filter and search the services list using the facets on the left side of the list. Facets are tags that Datadog automatically attaches to your services. Filtering and searching by facets helps you scope down the view to show the most relevant services.

Types of facets:

* [**Service type**](#services-types)
* **Last deploy**: Time of the last deployment for a service
* **Watchdog**: Whether the service has [Watchdog insights][7]
* **Monitor status**: Current active status of monitors
* **Infra type**: Type of infrastructure

### Services types

Every service monitored by your application is associated with a type. Datadog automatically determines this type based on the `span.type` attribute attached to your [spans][8]. The type specifies the name of the application or framework that the Datadog Agent is integrating with.

For example, if you use the official Flask Integration, the `Type` is set to "Web". If you are monitoring a custom application, the `Type` appears as "Custom".

The type of the service can be one of:

*  Cache
*  Custom
*  DB
*  Serverless function
*  Web

Some integrations alias to types. For example, Postgres, MySQL, and Cassandra map to the type "DB". Redis and Memcache integrations map to the type "Cache".

## Changing service color

Service color is used in [trace visualizations][9]. Select your service color to change it:

{{< img src="tracing/visualization/service_color.png" alt="Services colors"  style="width:30%;">}}

## Selecting columns

Click the cog menu to choose what to display in your services list:

* **Last Deploy**: Time of the last deployment for a service
* **Requests**: Total amount of requests traced (per seconds)
* **Avg/p75/p90/p95/p99/Max Latency**: Avg/p75/p90/p95/p99/Max latency of your traced requests
* **Error Rate**: Amount of requests traced (per seconds) that ended with an error
* **Apdex**: Apdex score of the service. [Learn more about Apdex][10].
* **Monitor status**: [Status of monitors][11] attached to a service

{{< img src="tracing/visualization/services_columns_2.png" alt="Services columns" style="width:40%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/send_traces/
[2]: /tracing/glossary/#services
[3]: https://app.datadoghq.com/apm/services
[4]: /tracing/services/service_page/
[5]: /tracing/guide/setting_primary_tags_to_scope/#environment
[6]: /tracing/guide/setting_primary_tags_to_scope/
[7]: /watchdog/
[8]: /tracing/trace_explorer/trace_view/#spans
[9]: /tracing/trace_explorer/trace_view/
[10]: /tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm/
[11]: /tracing/services/service_page/#service-monitor
