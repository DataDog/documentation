---
title: Services
kind: Documentation
---

After having [instrumented your application](/tracing/languages), your reporting services are listed on [the APM services page](https://app.datadoghq.com/apm/services)

{{< img src="tracing/services/services_page.png" alt="Services page" responsive="true" popup="true">}}


## Filtering the services list

The service list can be filtered depending on:

* [Your environment](/tracing/miscellaneous/environments).
* [Your service type](/tracing/miscellaneous/terminology/#type)
* A query

{{< img src="tracing/services/services_filtering.gif" alt="Services filtering" responsive="true" popup="true" style="width:75%;">}}

## Services types

Every Service monitored by your application is associated with a "Type". This type is automatically determined by Datadog and is applied for you. The "Type" specified the name of the application/framework the Datadog Agent is Integrating with.

For example, if you are using the official Flask Integration, the "Type" is set to "Web". If you are monitoring a custom application, this appears as "Custom".

The type of the service can be one of:

*  Cache
*  Custom
*  DB
*  Web
