---
title: HTTP Server Source
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' HTTP/S Server source to collect HTTP client logs.

You can also [send AWS vended logs with Datadog Lambda Forwarder to Observability Pipelines](#send-aws-vended-logs-with-the-datadog-lambda-forwarder-to-observability-pipelines).

## Prerequisites

{{% observability_pipelines/prerequisites/http_server %}}

## Setup

Set up this source when you [set up a pipeline][3]. You can set up a pipeline in the [UI][1], using the [API][4], or with [Terraform][5]. The instructions in this section are for setting up the source in the UI.

To configure your HTTP/S Server source, enter the following:

<div class="alert alert-danger">Only enter the identifiers for the HTTP Server address and, if applicable, the username and password for plain (also known as basic) authorization and the TLS key pass. Do <b>not</b> enter the actual values.</div>

1. Enter the identifier for your HTTP Server address. If you leave it blank, the [default](#set-secrets) is used.
    - **Note**: Only enter the identifier for the address. Do **not** enter the actual address.
1. Select your authorization strategy. If you selected **Plain**:
    - Enter the identifiers for your HTTP Server username and password. If you leave it blank, the [default](#set-secrets) is used.
1. Select the decoder you want to use on the HTTP messages. Your HTTP client logs must be in this format. **Note**: If you select `bytes` decoding, the raw log is stored in the `message` field.

### Optional TLS settings

{{% observability_pipelines/tls_settings %}}

## Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- HTTP Server address identifier:
	- References the socket address, such as `0.0.0.0:9997`, on which the Observability Pipelines Worker listens for HTTP client logs.
	- The default identifier is `SOURCE_HTTP_SERVER_ADDRESS`.
- HTTP Server TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `SOURCE_HTTP_SERVER_KEY_PASS`.
- If you are using plain authentication:
	- HTTP Server username identifier:
		- The default identifier is `SOURCE_HTTP_SERVER_USERNAME`.
	- HTTP Server password identifier:
		- The default identifier is `SOURCE_HTTP_SERVER_PASSWORD`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_server %}}

{{% /tab %}}
{{< /tabs >}}

## Send AWS vended logs with the Datadog Lambda Forwarder to Observability Pipelines

To send AWS vended logs to Observability Pipelines with the HTTP/S Server source:

- [Set up a pipeline with the HTTP/S Server source](#set-up-a-pipeline).
- [Deploy the Datadog Forwarder](#deploy-the-datadog-lambda-forwarder).

**Note**: This is available for Worker versions 2.51 or later.

### Set up a pipeline

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

### Deploy the Datadog Lambda Forwarder

{{% observability_pipelines/lambda_forwarder/deploy_forwarder %}}

[1]: https://app.datadoghq.com/observability-pipelines
[3]: /observability_pipelines/configuration/set_up_pipelines/
[4]: /api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
