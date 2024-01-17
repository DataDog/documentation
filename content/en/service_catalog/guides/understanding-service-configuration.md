---
title: Understanding Your Service Configuration
kind: guide
aliases:
  - /tracing/service_catalog/guides/understanding-service-configuration
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
---

Following monitoring best practices such as tracing, logging, and code profiling helps you ensure that you have all the data you need during incident triage. Service Catalog provides automatic checks for these recommended setups. It helps you detect any monitoring gaps and helps you connect all available data for a service.

To view the configuration completeness for a service, click it in the [Service Catalog][1]. On the service details page, click **Service Info** in the upper-right side. 

On this page you can see the ownership, PagerDuty, and related links information you've specified for the service in its [service definition][2].

You can also find which Datadog features you are actively using for a given service, to help you find and close gaps in your monitoring completeness. 

{{< img src="tracing/service_catalog/svc_cat_completeness1.png" alt="Service configuration page showing configuration completeness." >}}

This table does not necessarily reflect billing for individual products, but rather activity for the service you are presently examining. For example, if the service does not emit infrastructure metrics for a long time, `Infrastructure Monitoring` might have `Not Enabled` specified, even if you have hosts or containers running infrastructure monitoring. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /tracing/service_catalog/service_definition_api/
