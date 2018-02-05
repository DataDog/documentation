---
title: Services
kind: Documentation
---

After having [instrumented your application](/tracing/languages), your reporting services are listed on [the APM services page](https://app.datadoghq.com/apm/services)

{{< img src="tracing/services/services_page.png" alt="Services page" responsive="true" popup="true">}}


## Filtering the services list

The service list can be filtered depending of:

* [Your environment](/tracing/miscellaneous/environments).
* [Your service type](/tracing/miscellaneous/terminology/#type)
* A query

{{< img src="tracing/services/services_filtering.gif" alt="Services filtering" responsive="true" popup="true" style="width:75%;">}}

## Services types

Every Service being monitored by your application is associated with a "Type". This type is automatically determined by Datadog and is applied for you. The "Type" specified the name of the application/framework the Datadog Agent is Integrating with.  
If you are monitoring a custom application, this appears as "Custom". For example, if you are using the official Flask Integration, the "Type" is set to "Web".

The type can be one of:

*  [Cache](/tracing/services/cache)
*  [Custom](/tracing/services/custom)
*  [DB](/tracing/services/db)
*  [Web](/tracing/services/web)
