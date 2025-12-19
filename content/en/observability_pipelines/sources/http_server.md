---
title: HTTP Server Source
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

Use Observability Pipelines' HTTP/S Server source to collect HTTP client logs. Select and set up this source when you [set up a pipeline][1].

You can also [send AWS vended logs with Datadog Lambda Forwarder to Observability Pipelines](#send-aws-vended-logs-with-the-datadog-lambda-forwarder-to-observability-pipelines).

## Prerequisites

{{% observability_pipelines/prerequisites/http_server %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

To configure your HTTP/S Server source, enter the following:

<div class="alert alert-danger">Only enter the identifiers for the HTTP Server address and, if applicable, the username and password for basic authorization and the TLS key pass. Do <b>not</b> enter the actual values.</div>

1. Enter the identifier for your HTTP Server address. If you leave it blank, the [default](#set-secrets) is used.
    - **Note**: Only enter the identifier for the address. Do **not** enter the actual address.
1. Select your authorization strategy. If you selected **Basic**:
    - Enter the identifier for your HTTP Server username. If you leave it blank, the [default](#set-secrets) is used.
    - Enter the identifier for your HTTP Server password. If you leave it blank, the [default](#set-secrets) is used.
1. Select the decoder you want to use on the HTTP messages. Your HTTP client logs must be in this format. **Note**: If you select `bytes` decoding, the raw log is stored in the `message` field.

### Optional settings

Toggle the switch to **Enable TLS**. If you enable TLS, the following certificate and key files are required.<br>**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Worker Configurations][2] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
- Enter the identifier for your HTTP Server key pass. If you leave it blank, the [default](#set-secrets) is used.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER or PEM (X.509).
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS #8) format.

## Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- HTTP Server address identifier:
	- The default identifier is `SOURCE_HTTP_SERVER_ADDRESS`.
- HTTP Server TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `SOURCE_HTTP_SERVER_KEY_PASS`.
- If you are using basic authentication:
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
[2]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/