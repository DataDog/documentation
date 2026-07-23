---
title: Splunk HTTP Event Collector (HEC) Destination
description: Learn how to set up the Splunk HEC destination for metrics in Observability Pipelines.
disable_toc: false
code_lang: metrics
type: multi-code-lang
weight: 2
---

## Overview

Use Observability Pipelines' Splunk HTTP Event Collector (HEC) destination to send metrics to Splunk HEC.

## Setup

Configure the Splunk HEC destination when you [set up a pipeline][1]. You can set up a pipeline in the [UI][3], using the [API][4], or with [Terraform][5]. The steps in this section are configured in the UI.

**Notes**:
- The Splunk index you send your metrics to must be a metrics index. If you send your metrics to an events index, you can't view them in Splunk using any metrics type queries, such as `mcatalog` and `mstats`.
- If you don't attach your index to the Splunk authentication token you are using for Observability Pipelines, you must enter the name of the [index](#splunk-index) when you set up the destination.

<div class="alert alert-danger">For Secrets Management: Only enter the identifiers for the Splunk HEC token, endpoint, and if applicable, the TLS key pass. Do <b>not</b> enter the actual values.</div>

{{% observability_pipelines/secrets_env_var_note %}}

After you select the Splunk HEC destination in the pipeline UI:

1. Enter the identifier for your token. If you leave it blank, the [default](#secret-defaults) is used.
1. Enter the identifier for your endpoint URL. If you leave it blank, the [default](#secret-defaults) is used.

### Optional settings

#### Default namespace

Enter a default namespace to use as a prefix for metrics that don't already have a namespace. The namespace is prepended to the metric name with a period (`.`). For example, in `service.cpu.usage`, `service` is the namespace.

#### Compression

To compress your metrics with gzip, select **gzip** in the dropdown menu. The default compression is **None**.

#### Splunk index

Enter the name of the Splunk metrics index to which you are sending metrics. See [template syntax][6] to route metrics to different indexes based on specific fields.

**Note**: The **Index** field is optional only if you have an index attached to the Splunk authentication token you are using for Observability Pipelines. Otherwise, you must enter the name of the Splunk metrics index.

#### Source

Enter a value to add the `source` field to your metrics.

#### Source type override

Set the `sourcetype` to override Splunk's default value, which is `httpevent` for HEC data. See [template syntax][6] to route metrics to different source types based on specific fields.

#### Buffering

{{% observability_pipelines/destination_buffer %}}

#### Enable TLS

{{% observability_pipelines/tls_settings %}}

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

{{% observability_pipelines/splunk_hec_secrets %}}

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/splunk_hec %}}

{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

### 401 Unauthorized errors

{{% observability_pipelines/splunk_hec_unauthorized_error %}}

## How the destination works

### Event batching

A batch of events is flushed when one of the following parameters is met. See [event batching][2] for more information.

| Maximum Events | Maximum Size (MB) | Timeout (seconds) |
|----------------|-------------------|-------------------|
|    None        |       1           |          1        |

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: /observability_pipelines/destinations/#event-batching
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /observability_pipelines/destinations/#template-syntax