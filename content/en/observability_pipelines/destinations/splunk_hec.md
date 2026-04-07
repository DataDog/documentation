---
title: Splunk HTTP Event Collector (HEC) Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' Splunk HTTP Event Collector (HEC) destination to send logs to Splunk HEC.

## Setup

Set up the Splunk HEC destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

<div class="alert alert-danger">Observability Pipelines compresses logs with the gzip (level 6) algorithm.<br>Only enter the identifiers for the Splunk HEC token and endpoint. Do <b>not</b> enter the actual values.</div>

1. Enter the identifier for your token. If you leave it blank, the [default](#set-secrets) is used.
1. Enter the identifier for your endpoint URL. If you leave it blank, the [default](#set-secrets) is used.

#### Optional settings

##### Splunk index

Enter the name of the Splunk index you want your data in. This has to be an allowed index for your HEC. See [template syntax][3] if you want to route logs to different indexes based on specific fields in your logs.

##### Auto-extract timestamp

Select whether the timestamp should be auto-extracted. If set to `true`, Splunk extracts the timestamp from the message with the expected format of `yyyy-mm-dd hh:mm:ss`.

##### Sourcetype override

Set the `sourcetype` to override Splunk's default value, which is `httpevent` for HEC data. See [template syntax][3] if you want to route logs to different source types based on specific fields in your logs.

##### Encoding

Select the **Encoding** in the dropdown menu (**JSON** or **Raw**).
- If you selected **JSON**, optionally click **Add Field** to add keys of fields you want extracted as [indexed fields][4]. This indexes the specified fields when the Splunk HTTP Event Collector ingests the logs.

##### Buffering

{{% observability_pipelines/destination_buffer %}}

### Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Splunk HEC token identifier:
	- References the Splunk HEC token for the Splunk indexer.
	- The default identifier is `DESTINATION_SPLUNK_HEC_TOKEN`.
- Splunk HEC endpoint URL identifier:
	- References the Splunk HTTP Event Collector endpoint your Observability Pipelines Worker sends processed logs to. For example, `https://hec.splunkcloud.com:8088`.
	- **Note**: `/services/collector/event` path is automatically appended to the endpoint.
	- The default identifier is `DESTINATION_SPLUNK_HEC_ENDPOINT_URL`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/splunk_hec %}}

{{% /tab %}}
{{< /tabs >}}

### How the destination works

#### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Maximum Events | Maximum Size (MB) | Timeout (seconds)   |
|----------------|-------------------|---------------------|
| None           | 1                 | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /observability_pipelines/destinations/#template-syntax
[4]: https://help.splunk.com/en/splunk-enterprise/get-started/get-data-in/9.0/get-data-with-http-event-collector/automate-indexed-field-extractions-with-http-event-collector