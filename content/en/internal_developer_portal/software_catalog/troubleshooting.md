---
title: Troubleshooting Software Catalog
aliases:
  - /tracing/software_catalog/troubleshooting
  - /software_catalog/guides/troubleshooting
  - /tracing/service_catalog/troubleshooting
  - /service_catalog/guides/troubleshooting
  - /api_catalog/troubleshoot/
  - /service_catalog/troubleshooting
  - /software_catalog/troubleshooting
further_reading:
  - link: "/tracing/software_catalog/setup/"
    tag: "Documentation"
    text: "Setting Up Software Catalog"
---

If you experience unexpected behavior with Datadog Software Catalog, this guide may help you resolve the issue. If you continue to have trouble, contact [Datadog Support][4] for further assistance.

## Services

### APM-instrumented services not appearing

If services that you know are instrumented for APM are not appearing in the Software Catalog list, it's likely because they have not been emitting performance data in the past hour for the selected `env` (or any primary tag values of your choosing) or [additional primary tags][1]. To confirm, on the **Performance** tab, hover over the columns where you expect the performance metrics to appear and see information on which environments the services are active. 

{{< img src="tracing/software_catalog/svc_cat_troubleshooting_1.png" alt="Hover message indicating that no performance data has been reported in the past hour" >}}

### SLOs not listed in Setup Guidance section

The count in the Software Catalog Setup Guidance section reflects the number of SLOs with `service` tags. If your SLOs are not listed, verify that they have `service` tag values specified and that they match with the service names in other products such as APM and USM.

### Additional telemetry is available to a service but it's not listed

Software Catalog relies on the `DD_SERVICE` tag in all telemetry types (infrastructure metrics, logs, Cloud Network Monitoring) to gather information about a given service. If you don't see a telemetry type that you expect in the Software Catalog, ensure that you have configured the `DD_SERVICE` tag according to the instructions in [Unified Service Tagging][2]. 

### Can't add metadata for RUM services

Adding metadata for RUM services is not supported. 

### Multiple services share the same metadata
 
If you have many services that share the same metadata, you do not need separate `service.datadog.yaml` files for each one. You can define multiple services in a single `service.datadog.yaml` file by separating each service with a `---` separator. Copy and paste the shared metadata for the relevant dd-service entities. 

### Associated monitors not displayed in the Setup Guidance section

The Software Catalog associates monitors to services when they are tagged, scoped, or grouped with service or [APM primary tags][3]. 

The total monitor count displayed on the **Setup Guidance** tab for a single service does not include muted monitors and groups. 

## Endpoints

### Missing endpoints

The Endpoints list is based on APM tracing, so make sure your [services are instrumented][7].

### Definition matches too many services

By default, the Endpoints list matches a definition to all instances that fit the defined path.
You can scope the definition to a specific service by adding the [service parameter][6] to the API definition.

### No telemetry data for OpenAPI file

The Endpoints list is derived from APM tracing, so traffic information is displayed only if traces are available for the endpoint. After uploading an OpenAPI file, deployment data becomes visible after Datadog ingests a span for the endpoint.

### No data for new monitor

The Endpoints list relies on APM tracing, so traffic information is displayed only when traces are available for the endpoint. If no data appears in the monitor graph, one of the following may apply:
- The endpoint has not been accessed since it was registered and uploaded via OpenAPI.
- Traces are sampled on the Agent side. For more details, see [Ingestion Controls][5].


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/setting_primary_tags_to_scope/#add-additional-primary-tags-in-datadog
[2]: /getting_started/tagging/unified_service_tagging
[3]: /tracing/guide/setting_primary_tags_to_scope
[4]: /help/
[5]: /tracing/trace_pipeline/ingestion_controls/
[6]: /api_catalog/add_metadata/
[7]: /tracing/trace_collection/
