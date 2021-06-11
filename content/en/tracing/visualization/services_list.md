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

{{< img src="tracing/visualization/services_page.png" alt="Services page"  >}}

## Overview

After you have [instrumented your application][1], your reporting [services][2] appear on [the APM services page][3]. The services list is a bird's eye view of all [services][4] reporting from your infrastructure.
Select an individual service to view detailed performance insights. [Read the dedicated service documentation to learn more][4].

## Filtering the service list

Filter the services list depending on:

* [Environment][5]
* [Primary Tag][6]
* [Service type](#services-types)
* A query (basic text filtering)

{{< img src="tracing/visualization/services_filtering.mp4" alt="Services filtering" video="true"  width="75%" >}}

### Services types

Every service monitored by your application is associated with a "type". This type is automatically determined by Datadog based on the `span.type` attribute attached to your [spans][7]. The "type" specified the name of the application/framework the Datadog Agent is integrating with.

For example, if you are using the official Flask Integration, the "Type" is set to "Web". If you are monitoring a custom application, the "Type" appears as "Custom".

The type of the service can be one of:

*  Cache
*  Custom
*  DB
*  Web

We also have some aliases for Integrations such as Postgres, MySQL, and Cassandra which are map to Type: "DB" and Integrations Redis and Memcache which are map to Type: "Cache".

### Changing service color

Service color is used in [trace visualizations][8]. Select your service color to change it:

{{< img src="tracing/visualization/service_color.png" alt="Services colors"  style="width:30%;">}}

## Selecting columns

Choose what to display in your services list:

* **Requests**: Total amount of requests traced (per seconds)
* **Avg/p75/p90/p95/p99/Max Latency**: Avg/p75/p90/p95/p99/Max latency of your traced requests
* **Error Rate**: Amount of requests traced (per seconds) that ended with an error
* **Apdex**: Apdex score of the service, [learn more on Apdex][9]
* **Monitor status**: [Status of monitors][10] attached to a service

{{< img src="tracing/visualization/services_columns.png" alt="Services columns"  style="width:40%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/send_traces/
[2]: /tracing/visualization/#services
[3]: https://app.datadoghq.com/apm/services
[4]: /tracing/visualization/service/
[5]: /tracing/guide/setting_primary_tags_to_scope/#environment
[6]: /tracing/guide/setting_primary_tags_to_scope/
[7]: /tracing/visualization/trace/#spans
[8]: /tracing/visualization/trace/
[9]: /tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm/
[10]: /tracing/visualization/service/#service-monitor
