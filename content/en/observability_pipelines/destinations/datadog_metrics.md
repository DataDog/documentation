---
title: Datadog Metrics
description: Learn how to set up the Datadog Metrics destination.
disable_toc: false
products:
- name: Metrics
  icon: metrics
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
---

{{< product-availability >}}

{{< callout url="https://www.datadoghq.com/product-preview/metrics-ingestion-and-cardinality-control-in-observability-pipelines/"
 btn_hidden="false" header="Join the Preview!">}}
Sending metrics to Observability Pipelines is in Preview. Fill out the form to request access.
{{< /callout >}}

## Overview

Use Observability Pipelines' Datadog Metrics destination ({{< tooltip glossary="preview" case="title" >}}) to send metrics to Datadog. You can also use [AWS PrivateLink](#aws-privatelink) to send metrics from Observability Pipelines to Datadog.

## Setup

Configure this destination when you [set up a pipeline][5]. You can set up a pipeline in the [UI][1], using the [API][6], or with [Terraform][7]. The instructions in this section are configured in the UI.

{{< img src="observability_pipelines/destinations/datadog_metrics_settings.png" alt="The Datadog Metrics destination settings" style="width:40%;" >}}

#### Optional settings

After you select the Datadog Metrics destination in the pipeline UI, you can configure buffering.

{{% observability_pipelines/destination_buffer %}}

## Secrets defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

There are no secret identifiers for this destination.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

{{% /tab %}}
{{< /tabs >}}

## How the destination works

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Maximum Events | Maximum Size (MB) | Timeout (seconds)   |
|----------------|-------------------|---------------------|
| 100,000        | None              | 2                   |

## AWS PrivateLink

To send metrics from Observability Pipelines to Datadog using AWS PrivateLink, see [Connect to Datadog over AWS PrivateLink][3] for setup instructions. The two endpoints you need to set up are:

- Metrics: {{< region-param key=metrics_endpoint_private_link code="true" >}}
- Remote Configuration: {{< region-param key=remote_config_endpoint_private_link code="true" >}}

**Note**: The `obpipeline-intake.datadoghq.com` endpoint is used for Live Capture and is not available as a PrivateLink endpoint.

[1]: https://app.datadoghq.com/observability-pipelines
[2]: https://docs.datadoghq.com/observability_pipelines/destinations/#event-batching
[3]: https://docs.datadoghq.com/agent/guide/private-link/?tab=crossregionprivatelinkendpoints
[4]: http://config.datadoghq.com
[5]: /observability_pipelines/configuration/set_up_pipelines/
[6]: /api/latest/observability-pipelines/
[7]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
