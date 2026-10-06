---
title: Send Azure Container Apps Traces with the Managed OpenTelemetry Agent
description: "Export traces from a Datadog SDK to Datadog through the Azure Container Apps managed OpenTelemetry agent."
further_reading:
  - link: "/serverless/azure_container_apps/"
    tag: "Documentation"
    text: "Azure Container Apps"
  - link: "/opentelemetry/instrument/dd_sdks/otlp_trace_export/"
    tag: "Documentation"
    text: "Export Traces from Datadog SDKs in OTLP Format"
  - link: "/opentelemetry/setup/otlp_ingest/serverless/?tab=azure#container-apps"
    tag: "Documentation"
    text: "Send Azure Container Apps traces to Datadog with OTLP"
  - link: "https://learn.microsoft.com/en-us/azure/container-apps/opentelemetry-agents"
    tag: "Azure"
    text: "Collect and read OpenTelemetry data in Azure Container Apps"
  - link: "https://learn.microsoft.com/en-us/azure/container-apps/opentelemetry-export-datadog"
    tag: "Azure"
    text: "Export OpenTelemetry data to Datadog in Azure Container Apps"
---

## Overview

{% alert level="info" %}
OTLP trace export from Datadog SDKs is in Preview. For the status of the managed OpenTelemetry agent, see the [Azure documentation][1].
{% /alert %}

The Azure Container Apps managed OpenTelemetry agent receives OTLP data from your apps and forwards it to Datadog. Use this setup if you want Azure to manage the collection layer instead of running a Datadog Agent or OpenTelemetry Collector sidecar.

```text
Your app + Datadog SDK
        |
        |  OTLP over gRPC
        v
Azure managed OpenTelemetry agent
        |
        |  Datadog destination (site and API key)
        v
Datadog APM
```

Other ways to send traces from Azure Container Apps to Datadog include:

- [`serverless-init`][2], which adds distributed tracing, enhanced metrics, and logs.
- [Direct OTLP intake][3], which sends traces from an OpenTelemetry SDK straight to Datadog over HTTP.

## Prerequisites

- A Container Apps environment with the managed OpenTelemetry agent enabled. See the [Azure documentation][1].
- A [Datadog API key][4] and your [Datadog site][5].
- A Java application using the Datadog Java tracer v1.62.0 or later.

### Language support

The managed agent accepts only the gRPC protocol. This page documents Java, which supports exporting OTLP traces over gRPC.

Other Datadog SDKs do not support gRPC for OTLP trace export, so they cannot send traces to the managed agent:

| SDK | Supported OTLP protocols |
|---|---|
| Python | `http/json` |
| Node.js | `http/json` |
| Go | `http/protobuf` |
| .NET | `http/json`, `http/protobuf` |

For the latest protocol support, see [Export Traces from Datadog SDKs in OTLP Format][6].

## Setup

{% stepper %}
{% step title="Configure Datadog as a destination" %}
Configure the managed agent on your Container Apps environment to send traces to Datadog. You need your Datadog site ({% region-param key="dd_site" code=true /%}) and API key.

For instructions, see [Export OpenTelemetry data to Datadog in Azure Container Apps][7] in the Azure documentation.
{% /step %}
{% step title="Instrument your app with the Datadog Java tracer" %}
Add the Datadog Java tracer to your application image and attach it with the `-javaagent` JVM flag. For instructions, see [Tracing Java applications][11].
{% /step %}
{% step title="Set the environment variables" %}
Set the following environment variables on your container app. For how to set environment variables, see [Manage environment variables on Azure Container Apps][8] in the Azure documentation.

| Variable | Description |
|---|---|
| `DD_SERVICE`, `DD_ENV`, `DD_VERSION` | Datadog [unified service tagging][12]. |
| `DD_TRACE_OTEL_ENABLED` | Set to `true` to enable OTLP trace export. |
| `OTEL_TRACES_EXPORTER` | Set to `otlp` to export traces in OTLP format. |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | Set to `grpc`. The managed agent accepts only gRPC. |
| `OTEL_RESOURCE_ATTRIBUTES` | Set the required resource attributes (see below). |

Set `OTEL_RESOURCE_ATTRIBUTES` with the following required attributes:

```text
cloud.provider=azure,cloud.platform=azure.container_apps,cloud.resource_id=/subscriptions/<SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP>/providers/Microsoft.App/containerApps/<APP_NAME>
```

You don't need to set `OTEL_EXPORTER_OTLP_ENDPOINT`. Azure injects it into your container and points it at the managed agent. If traces don't arrive, see [Troubleshooting](#troubleshooting).
{% /step %}
{% /stepper %}

## Verify traces in Datadog

Send requests to your app, wait a few minutes, then open the [Trace Explorer][9] and search for `service:<SERVICE_NAME>`. If no traces appear, see [Troubleshooting](#troubleshooting).

## Troubleshooting

If no traces appear in Datadog, check each step from your app to the managed agent:

1. **Confirm the tracer is exporting OTLP.** In your container's console logs, find the tracer startup line that contains `TRACER CONFIGURATION`, and confirm that `"otlp_traces_export_enabled": true`. For how to read console logs, see [Log monitoring in Azure Container Apps][10] in the Azure documentation.

2. **Confirm spans are created.** Set `DD_TRACE_DEBUG=true`, send requests, and look for `Started span` and `Finished span (WRITTEN)` lines in the console logs. If you see these lines but no traces in Datadog, spans are not reaching the managed agent. Remove `DD_TRACE_DEBUG` after you finish.

3. **Confirm the OTLP endpoint is set.** Check that `OTEL_EXPORTER_OTLP_ENDPOINT` and `OTEL_EXPORTER_OTLP_PROTOCOL=grpc` are present in your running container. If the endpoint variable is missing, the Datadog SDK sends traces to its default endpoint (`http://localhost:4318/v1/traces`), where nothing listens, and traces are dropped without errors.

   Azure documents `OTEL_EXPORTER_OTLP_ENDPOINT` as injected automatically ([environment variables reference][1]). If it is missing in your container, set it to the managed agent's base URL. To get the base URL, copy the value of any `CONTAINERAPP_OTEL_*_GRPC_ENDPOINT` variable in your container. Then remove the trailing signal path (for example, `/v1/traces`). The result looks like `http://<AGENT_HOST>:4317`.

   Use the hostname from your own container's variables, not from documentation examples. Set either `OTEL_EXPORTER_OTLP_ENDPOINT` or `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`, not both.

4. **Confirm the Datadog destination.** Verify that the Datadog site and API key are configured on the Container Apps environment (Step 1).

### Connection errors to `localhost:8126`

You may see repeated errors such as `Failed to upload batch to http://localhost:8126/debugger/v1/diagnostics` in your logs. These come from tracer features that expect a local Datadog Agent, which this setup does not use. They do not affect OTLP trace export. To reduce the noise, set `DD_REMOTE_CONFIG_ENABLED=false` and `DD_DYNAMIC_INSTRUMENTATION_ENABLED=false`.

## Limitations

- OTLP trace export from Datadog SDKs supports core APM functionality. Other Datadog features may not be supported, or may require the Datadog Agent. See [Export Traces from Datadog SDKs in OTLP Format][6].
- The managed agent accepts only the gRPC protocol, which limits the SDKs you can use (see [Language support](#language-support)).

For limitations of the managed OpenTelemetry agent itself, see the [Azure documentation][1].

[1]: https://learn.microsoft.com/en-us/azure/container-apps/opentelemetry-agents
[2]: /serverless/azure_container_apps/
[3]: /opentelemetry/setup/otlp_ingest/serverless/?tab=azure#container-apps
[4]: /account_management/api-app-keys/
[5]: /getting_started/site/
[6]: /opentelemetry/instrument/dd_sdks/otlp_trace_export/
[7]: https://learn.microsoft.com/en-us/azure/container-apps/opentelemetry-export-datadog
[8]: https://learn.microsoft.com/en-us/azure/container-apps/environment-variables
[9]: /tracing/trace_explorer/
[10]: https://learn.microsoft.com/en-us/azure/container-apps/log-monitoring
[11]: /tracing/trace_collection/dd_libraries/java/
[12]: /getting_started/tagging/unified_service_tagging/
