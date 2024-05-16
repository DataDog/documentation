---
title: Troubleshooting Service Catalog
kind: documentation
aliases:
  - /tracing/service_catalog/troubleshooting
  - /service_catalog/troubleshooting
further_reading:
- link: "/tracing/service_catalog/setup/"
  tag: "Documentation"
  text: "Setting Up Service Catalog"
---

## APM-instrumented services not appearing

If services that you know are instrumented for APM are not appearing in the Service Catalog list, it's likely because they have not been emitting performance data in the past hour for the selected `env` (or any Primary Tag values of your choosing) or [Secondary Primary Tag][1]. To confirm, on the **Performance** tab, hover over the columns where you expect the performance metrics to appear and see information on which environments the services are active. 

{{< img src="tracing/service_catalog/svc_cat_troubleshooting_1.png" alt="Hover message indicating that no performance data has been reported in the past hour" >}}

## SLOs not listed in Setup Guidance section

The count in the Service Catalog Setup Guidance section reflects the number of SLOs with `service` tags. If your SLOs are not listed, verify that they have `service` tag values specified and that they match with the service names in other products such as APM and USM.

## Additional telemetry is available to a service but it's not listed

Service Catalog relies on the `DD_SERVICE` tag in all telemetry types (infrastructure metrics, logs, network performance monitoring) to gather information about a given service. If you don't see a telemetry type that you expect in the Service Catalog, ensure that you have configured the `DD_SERVICE` tag according to the instructions in [Unified Service Tagging][2]. 

## Can't add metadata for RUM services

Adding metadata for RUM services is not supported. 



## Multiple services share the same metadata
 
If you have many services that share the same metadata, you do not need separate `service.datadog.yaml` files for each one. You can define multiple services in a single `service.datadog.yaml` file by separating each service with a `---` separator. Copy and paste the shared metadata for the relevant dd-service entities. 

## Associated monitors not displayed in the Setup Guidance section

The Service Catalog associates monitors to services when you tag the monitor with `service` and [APM primary tags][3]. 

The total monitor count displayed on the **Setup Guidance** tab for a single service does not include muted monitors and groups. 


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[2]: /getting_started/tagging/unified_service_tagging
[3]: /tracing/guide/setting_primary_tags_to_scope
