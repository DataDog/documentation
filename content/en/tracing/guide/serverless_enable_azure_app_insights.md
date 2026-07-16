---
title: Azure App Insights Integration
private: true
description: "Bring your Azure Application Insights distributed traces into Datadog APM into Datadog APM without reinstrumenting your application."
further_reading:
- link: "/integrations/azure/"
  tag: "Documentation"
  text: "Microsoft Azure integration"
---

{{< callout url="https://www.datadoghq.com/product-preview/azure-app-insights-integration/" header="Join the Preview" >}}
The Azure App Insights Integration is in Preview. Use this form to request access.
{{< /callout >}}

## Overview

Bring your Azure Application Insights distributed traces into Datadog APM. Datadog converts App Insights traces into APM spans and enriches spans from supported services with Azure resource metadata.

{{< img src="tracing/guide/serverless_enable_azure_app_insights/app-insights-azure-fn-example.png" alt="An Azure Application Insights trace shown in the Datadog APM flame graph, with Azure resource metadata visible on the selected span." style="width:100%;" >}}

The integration reads App Insights records forwarded to Datadog as logs and emits APM spans from them. No changes to your application code or instrumentation are required.

## How it works

When Application Insights is enabled on your workloads and your Azure logs are flowing to Datadog, Datadog:

1. Reads App Insights records from your forwarded Azure logs.
2. Converts each App Insights operation into a Datadog APM span, preserving parent-child relationships across both the legacy hierarchical Request-Id format and W3C Trace Context.
3. Enriches spans for [supported Azure services](#supported-azure-services) with Azure resource metadata, including resource group, subscription, region, and resource tags.

After conversion, the spans behave like any other Datadog APM spans. They appear in the same waterfall view, support trace search, and correlate with your logs and metrics.

## Prerequisites

Before you can use the Azure App Insights Integration, set up the following:

1. **Enable Azure Application Insights** on the Azure workloads you want to trace, using the classic Application Insights SDK. If your workload uses the [Azure Monitor OpenTelemetry Distro][5], see [OpenTelemetry in Datadog][6] instead.
2. **Configure [Azure Automated Log Forwarding][2]** to forward Azure App Insights Logs to Datadog. Confirm that metrics and resource collection are enabled in the [Microsoft Azure integration][1], so spans can be enriched with Azure resource metadata.

## Supported Azure services

Datadog enriches converted spans with Azure resource metadata for the following services:

- Azure Functions
- Azure App Service
- Azure Storage
- Azure Cosmos DB
- Azure API Management
- Azure Cache for Redis

Traces from other Azure services are converted into APM spans, but without Azure resource metadata enrichment.

## Request access

The Azure App Insights Integration is in Preview. To request access, sign up through the [Preview form][4]. The Datadog team responds within one week to confirm access.

## Limitations

- **Preview status.** The integration is in Preview with a limited design-partner cohort. Access is granted after sign-up through the Preview form.
- **Resource metadata enrichment is service-specific.** Spans for Azure services outside the [supported list](#supported-azure-services) are converted but not enriched with Azure resource metadata.
- **Mixed-format trace hierarchy depends on span links.** Some Azure workloads emit a mix of the legacy hierarchical Request-Id format and W3C Trace Context. Datadog connects the two formats with [span links][3], so you can navigate between related traces.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/azure/
[2]: /logs/guide/azure-automated-log-forwarding/
[3]: /tracing/trace_collection/span_links/
[4]: https://www.datadoghq.com/product-preview/azure-app-insights-integration/
[5]: https://learn.microsoft.com/en-us/azure/azure-monitor/app/opentelemetry-enable
[6]: /opentelemetry/
