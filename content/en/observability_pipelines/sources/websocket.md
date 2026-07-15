---
title: WebSocket Source
disable_toc: false
description: Learn how to connect the Observability Pipelines Worker to a WebSocket and ingest the messages as logs.
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

{{< callout url="#" btn_hidden="true" header="Join the Preview!">}}
The WebSocket source is in Preview. Contact your account manager to request access.
{{< /callout >}}

## Overview

Use Observability Pipelines' WebSocket source to connect the Observability Pipelines Worker as a client to an upstream `ws://` or `wss://` endpoint. The Worker ingests the messages as logs.

## Prerequisites

To use Observability Pipelines' WebSocket source, you must have the following information:

- The full WebSocket URI that the Observability Pipelines Worker connects to, such as `wss://example.com/stream`.
- If the endpoint requires authentication, the credentials for your chosen authorization strategy (a username and password, a bearer token, or a custom `Authorization` header value).

## Setup

Set up this source when you [set up a pipeline][1]. You can set up a pipeline in the [UI][3], using the [API][4], or with [Terraform][5]. The instructions in this section are for setting up the source in the UI.

<div class="alert alert-danger">For Secrets Management: Only enter the identifiers for the WebSocket URI and, if applicable, your authorization strategy secrets and TLS key pass. Do <b>not</b> enter the actual values.</div>

{{% observability_pipelines/secrets_env_var_note %}}

After you select the WebSocket source in the pipeline UI:

1. Enter the identifier for your WebSocket URI, which references the `ws://` or `wss://` endpoint that the Worker connects to. If you leave it blank, the [default](#secret-defaults) is used.
1. Select your authorization strategy. If you selected:
   - **None**: No authentication is sent with the connection request. Use this when the endpoint does not require credentials.
   - **Basic**: Enter the identifiers for your WebSocket username and password. If you leave it blank, the [default](#secret-defaults) is used.
   - **Bearer**: Enter the identifier for your bearer token. The token is sent in the `Authorization` header as `Bearer <token>`. If you leave it blank, the [default](#secret-defaults) is used.
   - **Custom**: Enter the identifier for your custom `Authorization` header value. The Worker sends this value as the `Authorization` header exactly as provided. Use this when the endpoint expects an authentication scheme other than basic or bearer. If you leave it blank, the [default](#secret-defaults) is used.
1. In the **Decoding** dropdown menu, select the decoder to apply to incoming messages. Messages received from the endpoint must be in the selected format.

   | Decoding | Description |
   | -------- | ----------- |
   | `bytes` | Send each message as raw bytes. The raw message is stored in the `message` field. |
   | `gelf`  | Decode each message as a Graylog Extended Log Format (GELF) event. |
   | `json`  | Decode each message as a JSON object. |
   | `syslog`| Decode each message as a Syslog-formatted event. |

   If your messages do not match one of the formats above, select `bytes` to ingest the raw message in the `message` field, then transform it with a [Custom Processor][6].

### Optional TLS settings

For `wss://` endpoints, configure TLS so that data is encrypted in transit. The WebSocket source supports two TLS modes:

#### Enable TLS

Toggle the switch to **Enable TLS**. Because the Worker connects to the endpoint as a client, no certificate fields are required. Enabling TLS encrypts the connection and the endpoint must present a certificate signed by a trusted Certificate Authority (CA).

#### Enable TLS with a client certificate

To use mutual TLS (mTLS), where the Worker presents a client certificate to the endpoint, provide a client certificate in addition to enabling TLS:

- `Client Certificate Path`: The path to the client certificate file in DER, PEM, or CRT (X.509) format. This field is required for mTLS.
- `CA Certificate Path` (optional): The path to the Certificate Authority (CA) root file used to verify the endpoint, in DER, PEM, or CRT (X.509) format.
- `Client Key Path` (optional): The path to the `.key` private key file that belongs to your client certificate, in DER, PEM, or CRT (PKCS #8) format.
- If your client key is encrypted, enter the identifier for the key passphrase. If you leave it blank, the [default](#secret-defaults) is used.

**Notes**:
- The configuration data directory `/var/lib/observability-pipelines-worker/config/` is automatically appended to the file paths. See [Advanced Worker Configurations][7] for more information.
- The certificate and key files must be readable by the `observability-pipelines-worker` group and user.

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- WebSocket URI identifier:
	- References the `ws://` or `wss://` endpoint that the Observability Pipelines Worker connects to and ingests log events from.
	- The default identifier is `SOURCE_WEBSOCKET_URI`.
- WebSocket TLS passphrase identifier (when a client certificate key is encrypted):
	- The default identifier is `SOURCE_WEBSOCKET_KEY_PASS`.
- If you are using basic authentication:
	- WebSocket username identifier:
		- The default identifier is `SOURCE_WEBSOCKET_USERNAME`.
	- WebSocket password identifier:
		- The default identifier is `SOURCE_WEBSOCKET_PASSWORD`.
- If you are using bearer authentication:
	- WebSocket bearer token identifier:
		- The default identifier is `SOURCE_WEBSOCKET_BEARER_TOKEN`.
- If you are using custom authentication:
	- WebSocket custom `Authorization` header identifier:
		- The default identifier is `SOURCE_WEBSOCKET_HEADERS_AUTHORIZATION`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/websocket %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /observability_pipelines/processors/custom_processor/
[7]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
