---
title: HTTP Client Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- name: Metrics
  icon: metrics
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' HTTP Client destination to send logs to an HTTP client, such as a logging platform or SIEM.

## Set up destination

Configure the HTTP Client destination when you [set up a pipeline][3]. You can set up a pipeline in the [UI][1], using the [API][4], or with [Terraform][5]. The steps in this section are configured in the UI.

<div class="alert alert-danger">Only enter the identifiers for the HTTP Client URI and, if applicable, username and password for basic authorization and the TLS key pass. Do <b>not</b> enter the actual values.</div>

After you select the HTTP Client destination in the pipeline UI:

1. Enter the identifier for your HTTP Client URI. If you leave it blank, the [default](#secret-defaults) is used.
1. Select your authorization strategy (**None**, **Basic**, or **Bearer**). If you selected:
	- **Basic**:
		- Enter the identifier for your HTTP Client username. If you leave it blank, the [default](#secret-defaults) is used.
		- Enter the identifier for your HTTP Client password. If you leave it blank, the [default](#secret-defaults) is used.
	- **Bearer**:
		- Enter the identifier for your HTTP Client token. If you leave it blank, the [default](#secret-defaults) is used.
1. JSON is the only available encoder.

### Optional settings

#### Enable compression

Toggle the switch to **Enable Compression**. If enabled:
1. GZIP is the only available compression algorithm.
1. Select the compression level you want to use.

#### Enable TLS

{{% observability_pipelines/tls_settings %}}

#### Buffering

{{% observability_pipelines/destination_buffer %}}

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- HTTP Client URI endpoint identifier:
	- The default identifier is `DESTINATION_HTTP_CLIENT_URI`.
- HTTP Client TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `DESTINATION_HTTP_CLIENT_KEY_PASS`.
- If you are using basic authentication:
	- HTTP Client username identifier:
		- The default identifier is `DESTINATION_HTTP_CLIENT_USERNAME`.
	- HTTP Client password identifier:
		- The default identifier is `DESTINATION_HTTP_CLIENT_PASSWORD`.
- If you are using bearer authentication:
	- HTTP Client bearer token identifier:
		- The default identifier is `DESTINATION_HTTP_CLIENT_BEARER_TOKEN`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/http_client %}}

{{% /tab %}}
{{< /tabs >}}

## How the destination works

### Event batching

A batch of events is flushed when one of these conditions occurs. See [event batching][2] for more information.

| Maximum Events | Maximum Size (MB) | Timeout (seconds)   |
|----------------|-------------------|---------------------|
| 1,000          | 1                 | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /observability_pipelines/configuration/set_up_pipelines/
[4]: /api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
