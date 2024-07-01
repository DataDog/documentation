---
title: Troubleshooting
is_beta: true
further_reading:
- link: /tracing/api_catalog/
  tag: Documentation
  text: API Catalog
---

If you experience unexpected behavior with Datadog API Catalog, this guide may help you resolve the issue. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

## Missing endpoints

API Catalog is based on APM tracing, so the first step is to make sure your services are instrumented. Click **Learn More** in the app, then select **Troubleshoot** to verify this.
{{< img src="tracing/api_catalog/api-catalog-discovery-learn-more.png" alt="Learn More button in the app" style="width:30%;text-align: left;" >}}

If your service is instrumented and you still can't see the endpoints, there are two options:
- **Upload OpenAPI file**: Uploading a spec file to the **Catalog** page automatically connects any trace seen in traffic to the matching endpoints. You should expect to see the endpoints in the **Explorer** page soon after uploading, depending on traffic.
- **Use the Setup wizard to enable autodiscovery for the service**: Not all instrumentation libraries are supported, so you can use the wizard on the **Setup** page to see if an upgrade is required, or learn how to add missing tags yourself.

## No telemetry data for OpenAPI file

API Catalog is based on APM tracing, so info from traffic is displayed only when there are traces for the endpoint. After uploading an OpenAPI file, deployment data (Last Seen, environments, and more) is visible after Datadog ingests a span for the endpoint.

## No data for new monitor

API Catalog is based on APM tracing, so info from traffic is displayed only when there are traces for the endpoint. If you do not see data in the monitor graph, one of the options below may apply:
- The endpoint has not been used yet since it was registered/uploaded through OpenAPI.
- Traces are sampled on the Agent side. Read [Ingestion Controls][3] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /tracing/trace_collection/
[3]: /tracing/trace_pipeline/ingestion_controls/