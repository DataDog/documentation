---
title: Services List
kind: documentation
further_reading:
- link: "/tracing/setup/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "/tracing/visualization/service/"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "/tracing/visualization/resource/"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "/tracing/visualization/trace/"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
---

{{< img src="tracing/visualization/services_page_2.png" alt="Services page"  >}}

## Overview 

After you [instrument your application][1], your reporting [services][2] appear on [the APM services page][3]. The services list is a high level view of all [services][4] reporting from your infrastructure.
Select an individual service to view detailed performance insights. [Read the dedicated service documentation to learn more][4].

## Filtering the service list

Filter the services list by:

* [Environment][5]
* [Primary Tag][6]
* [Facets](#facets)
* [Services type](#services-types)
* A query (basic text filtering)


{{< img src="tracing/visualization/services_filtering_2.mp4" alt="Services filtering" video="true"  width="100%" >}}

### Facets

You can filter and search the services list using the facets on the left side of the list. Facets are tags that Datadog automatically attaches to your services. Filtering and searching by facets helps you to scope down the view to show the services most relevant to you.

Types of facets:

* [**Service type**](#services-types)
* **Last deploy**: Time of last deployment for a service
* **Watchdog**: Whether the service has [Watchdog insights][7]
* **Monitor status**: Current active status of monitors
* **Infra type**: Type of infrastructure

### Services types

Every service monitored by your application is associated with a type. This type is automatically determined by Datadog based on the `span.type` attribute attached to your [spans][8]. The type specifies the name of the application or framework that the Datadog Agent is integrating with.

For example, if you use the official Flask Integration, the Type is set to "Web". If you are monitoring a custom application, the Type appears as "Custom".

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

* **Last Deploy**: Time of last deployment for a service
* **Requests**: Total amount of requests traced (per seconds)
* **Avg/p75/p90/p95/p99/Max Latency**: Avg/p75/p90/p95/p99/Max latency of your traced requests
* **Error Rate**: Amount of requests traced (per seconds) that ended with an error
* **Apdex**: Apdex score of the service. [Learn more about Apdex][10].
* **Monitor status**: [Status of monitors][11] attached to a service

{{< img src="tracing/visualization/services_columns_2.png" alt="Services columns"  style="width:40%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/send_traces/
[2]: /tracing/visualization/#services
[3]: https://app.datadoghq.com/apm/services
[4]: /tracing/visualization/service/
[5]: /tracing/guide/setting_primary_tags_to_scope/#environment
[6]: /tracing/guide/setting_primary_tags_to_scope/
[7]: /watchdog/
[8]: /tracing/visualization/trace/#spans
[9]: /tracing/visualization/trace/
[10]: /tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm/
[11]: /tracing/visualization/service/#service-monitor
