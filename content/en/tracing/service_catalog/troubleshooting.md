---
title: Troubleshooting Service Catalog
kind: documentation
further_reading:
- link: "/tracing/service_catalog/setup/"
  tag: "Documentation"
  text: "Setting Up Service Catalog"
---



## APM-instrumented services not appearing

If services that you know are instrumented for APM are not appearing in the Service Catalog list, it's likely because they have not been emitting performance data in the past hour for the selected `env` (or any Primary Tag values of your choosing) or [Secondary Primary Tag][1]. To confirm, on the **Performance** tab, hover over the columns where you expect the performance metrics to appear and see information on which environments the services are active. 

{{< img src="tracing/service_catalog/svc_cat_troubleshooting_1.png" alt="Hover message indicating that no performance data has been reported in the past hour" >}}

## Additional telemetry is available to a service but it's not listed

Service Catalog relies on the `DD_SERVICE` tag in all telemetry types (infrastructure metrics, logs, network performance monitoring) to gather information about a given service. If you don’t see a telemetry type that you expect in the Service Catalog, ensure that you have configured the `DD_SERVICE` tag according to the instructions in [Unified Service Tagging][2]. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[2]: /getting_started/tagging/unified_service_tagging
