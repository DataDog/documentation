---
title: CrowdStrike Next-Gen SIEM Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' CrowdStrike Next-Gen SIEM destination to send logs to CrowdStrike Next-Gen SIEM.

## Setup

Set up the CrowdStrike NG-SIEM destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

To use the CrowdStrike NG-SIEM destination, you need to set up a CrowdStrike data connector using the HEC/HTTP Event Connector. See [Step 1: Set up the HEC/HTTP event data connector][3] for instructions. When you set up the data connector, you are given a HEC API key and URL, which you use when you configure the Observability Pipelines Worker later on.

<div class="alert alert-danger">Only enter the identifiers for the CrowdStrike NG-SIEM endpoint URL, token, and if applicable, the TLS pass key. Do <b>not</b> enter the actual values.</div>

1. Enter the identifier for your CrowdStrike NG-SIEM endpoint URL. If you leave it blank, the [default](#set-secrets) is used.
1. Enter the identifier for your CrowdStrike NG-SIEM token. If you leave it blank, the [default](#set-secrets) is used.
1. Select **JSON** or **Raw** encoding in the dropdown menu.

#### Optional settings

##### Enable compressions

1. Toggle the switch to **Enable compressions**.
1. Select an algorithm (**gzip** or **zlib**) in the dropdown menu.

##### Enable TLS

{{% observability_pipelines/tls_settings %}}

##### Buffering

{{% observability_pipelines/destination_buffer %}}

### Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- CrowdStrike NG-SIEM endpoint URL identifier:
	- In your secrets manager, do **not** include the suffix `/services/collector` in the URL. The URL must follow this format: `https://<your_instance_id>.ingest.us-1.crowdstrike.com`.
	- The default identifier is `DESTINATION_CROWDSTRIKE_NEXT_GEN_SIEM_ENDPOINT_URL`.
- CrowdStrike NG-SIEM token identifier:
	- The default identifier is `DESTINATION_CROWDSTRIKE_NEXT_GEN_SIEM_TOKEN`.
- CrowdStrike NG-SIEM TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `DESTINATION_CROWDSTRIKE_NEXT_GEN_SIEM_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/crowdstrike_ng_siem %}}

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
[3]: https://falcon.us-2.crowdstrike.com/documentation/page/bdded008/hec-http-event-connector-guide
