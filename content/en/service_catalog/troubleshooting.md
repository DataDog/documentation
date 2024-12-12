---
title: Troubleshooting Service Catalog
aliases:
  - /tracing/service_catalog/troubleshooting
  - /service_catalog/guides/troubleshooting
  - /api_catalog/troubleshoot/
further_reading:
  - link: "/tracing/service_catalog/setup/"
    tag: "Documentation"
    text: "Setting Up Service Catalog"
---

If you experience unexpected behavior with Datadog Service Catalog, this guide may help you resolve the issue. If you continue to have trouble, contact [Datadog Support][4] for further assistance.

## Services

### APM-instrumented services not appearing

If services that you know are instrumented for APM are not appearing in the Service Catalog list, it's likely because they have not been emitting performance data in the past hour for the selected `env` (or any Primary Tag values of your choosing) or [Secondary Primary Tag][1]. To confirm, on the **Performance** tab, hover over the columns where you expect the performance metrics to appear and see information on which environments the services are active. 

{{< img src="tracing/service_catalog/svc_cat_troubleshooting_1.png" alt="Hover message indicating that no performance data has been reported in the past hour" >}}

### SLOs not listed in Setup Guidance section

The count in the Service Catalog Setup Guidance section reflects the number of SLOs with `service` tags. If your SLOs are not listed, verify that they have `service` tag values specified and that they match with the service names in other products such as APM and USM.

### Additional telemetry is available to a service but it's not listed

Service Catalog relies on the `DD_SERVICE` tag in all telemetry types (infrastructure metrics, logs, Cloud Network Monitoring) to gather information about a given service. If you don't see a telemetry type that you expect in the Service Catalog, ensure that you have configured the `DD_SERVICE` tag according to the instructions in [Unified Service Tagging][2]. 

### Can't add metadata for RUM services

Adding metadata for RUM services is not supported. 

### Multiple services share the same metadata
 
If you have many services that share the same metadata, you do not need separate `service.datadog.yaml` files for each one. You can define multiple services in a single `service.datadog.yaml` file by separating each service with a `---` separator. Copy and paste the shared metadata for the relevant dd-service entities. 

### Associated monitors not displayed in the Setup Guidance section

The Service Catalog associates monitors to services when they are tagged, scoped, or grouped with service or [APM primary tags][3]. 

The total monitor count displayed on the **Setup Guidance** tab for a single service does not include muted monitors and groups. 

## Endpoints

### Definition matches too many services

By default, The API Catalog matches a definition to all instances that fit the defined path.
You can scope the definition to a specific service by adding the [service parameter][6] to the API definition.

### Missing endpoints

API Catalog is based on APM tracing, so the first step is to make sure your services are instrumented. Click **Learn More** in the app, then select **Troubleshoot** to verify this.
{{< img src="tracing/api_catalog/api-catalog-discovery-learn-more.png" alt="Learn More button in the app" style="width:30%;text-align: left;" >}}

If your service is instrumented and you still can't see the endpoints, there are two options:
- **Upload OpenAPI file**: Uploading a spec file to the **Catalog** page automatically connects any trace seen in traffic to the matching endpoints. You should expect to see the endpoints in the **Explorer** page soon after uploading, depending on traffic.
- **Use the Setup wizard to enable autodiscovery for the service**: Not all instrumentation libraries are supported, so you can use the wizard on the **Setup** page to see if an upgrade is required, or learn how to add missing tags yourself.

### No telemetry data for OpenAPI file

API Catalog is based on APM tracing, so info from traffic is displayed only when there are traces for the endpoint. After uploading an OpenAPI file, deployment data (Last Seen, environments, and more) is visible after Datadog ingests a span for the endpoint.

### No data for new monitor

API Catalog is based on APM tracing, so info from traffic is displayed only when there are traces for the endpoint. If you do not see data in the monitor graph, one of the options below may apply:
- The endpoint has not been used yet since it was registered/uploaded through OpenAPI.
- Traces are sampled on the Agent side. Read [Ingestion Controls][5] for more information.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[2]: /getting_started/tagging/unified_service_tagging
[3]: /tracing/guide/setting_primary_tags_to_scope
[4]: /help/
[5]: /tracing/trace_pipeline/ingestion_controls/
[6]: /api_catalog/add_metadata/#metadata-structure-and-supported-versions
