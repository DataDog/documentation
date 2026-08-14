---
title: Datadog APM Destination
disable_toc: false
products:
- name: Traces
  icon: apm
  url: /observability_pipelines/configuration/?tab=traces#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' {{< tooltip text="Datadog APM destination" tooltip="Contact your account manager to request access." >}} to send traces to Datadog.

## Setup

Configure the Datadog APM destination when you [set up a pipeline][1] in the UI.

### Optional buffering

{{% observability_pipelines/destination_buffer %}}

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

There are no secret identifiers for this destination.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

{{% /tab %}}
{{< /tabs >}}

## AWS PrivateLink

To send traces from Observability Pipelines to Datadog using AWS PrivateLink, see [Connect to Datadog over AWS PrivateLink][7] for setup instructions. The two endpoints you need to set up are:

- Traces: {{< region-param key=traces_endpoint_private_link code="true" >}}
- Remote Configuration: {{< region-param key=remote_config_endpoint_private_link code="true" >}}

**Note**: The `obpipeline-intake.datadoghq.com` endpoint is used for Live Capture and is not available as a PrivateLink endpoint.

## Health metrics

See [Component metrics][5] and [Destination buffer metrics][6] for more information on metrics emitted by all destinations.

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[5]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[6]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/?tab=destinations#component-metrics
[7]: /agent/guide/private-link/?tab=crossregionprivatelinkendpoints
