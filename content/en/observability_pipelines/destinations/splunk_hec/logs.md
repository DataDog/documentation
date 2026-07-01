---
title: Splunk HTTP Event Collector (HEC) Destination
description: Learn how to set up the Splunk HEC destination for logs in Observability Pipelines.
disable_toc: false
aliases:
- /observability_pipelines/destinations/splunk_hec/
code_lang: logs
type: multi-code-lang
weight: 1
---

## Overview

Use Observability Pipelines' Splunk HTTP Event Collector (HEC) destination to send logs to Splunk HEC.

**Note**: Observability Pipelines compresses logs with the gzip (level 6) algorithm.

## Setup

Configure the Splunk HEC destination when you [set up a pipeline][5]. You can set up a pipeline in the [UI][1], using the [API][6], or with [Terraform][7]. The steps in this section are configured in the UI.

<div class="alert alert-danger">For Secrets Management: Only enter the identifiers for the Splunk HEC token and endpoint. Do <b>not</b> enter the actual values.</div>

{{% observability_pipelines/secrets_env_var_note %}}

After you select the Splunk HEC destination in the pipeline UI:

1. For the {{< ui >}}Token strategy{{< /ui >}} dropdown menu:
	- Only select {{< ui >}}From Source{{< /ui >}} if you are using a [Splunk HEC source][8] and have enabled {{< ui >}}Store HEC token{{< /ui >}} on the source. Otherwise, an error occurs and you cannot proceed to install the Worker. This option forwards the token received by Observability Pipelines onto the Splunk HEC destination.
	- If you use the default {{< ui >}}Custom{{< /ui >}} token strategy, enter the identifier for your token. If you leave it blank, the [default](#secret-defaults) is used.
1. Enter the identifier for your endpoint URL. If you leave it blank, the [default](#secret-defaults) is used.
1. Enter the identifier for your token. If you leave it blank, the [default](#secret-defaults) is used.
1. Enter the identifier for your endpoint URL. If you leave it blank, the [default](#secret-defaults) is used.

### Optional settings

#### Splunk index

Enter the name of the Splunk index you want your data in. This has to be an allowed index for your HEC. See [template syntax][3] if you want to route logs to different indexes based on specific fields in your logs.

#### Auto-extract timestamp

Select whether the timestamp should be auto-extracted. If set to `true`, Splunk extracts the timestamp from the message with the expected format of `yyyy-mm-dd hh:mm:ss`.

#### Sourcetype override

Set the `sourcetype` to override Splunk's default value, which is `httpevent` for HEC data. See [template syntax][3] if you want to route logs to different source types based on specific fields in your logs.

#### Encoding

Select the {{< ui >}}Encoding{{< /ui >}} in the dropdown menu ({{< ui >}}JSON{{< /ui >}} or {{< ui >}}Raw{{< /ui >}}).
- If you selected {{< ui >}}JSON{{< /ui >}}, optionally click {{< ui >}}Add Field{{< /ui >}} to add keys of fields you want extracted as [indexed fields][4]. This indexes the specified fields when the Splunk HTTP Event Collector ingests the logs.

#### Buffering

{{% observability_pipelines/destination_buffer %}}

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

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Maximum Events | Maximum Size (MB) | Timeout (seconds)   |
|----------------|-------------------|---------------------|
| None           | 1                 | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /observability_pipelines/destinations/#template-syntax
[4]: https://help.splunk.com/en/splunk-enterprise/get-started/get-data-in/9.0/get-data-with-http-event-collector/automate-indexed-field-extractions-with-http-event-collector
[5]: /observability_pipelines/configuration/set_up_pipelines/
[6]: /api/latest/observability-pipelines/
[7]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[8]: /observability_pipelines/sources/splunk_hec/