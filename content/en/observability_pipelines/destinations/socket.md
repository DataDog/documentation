---
title: Socket Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

Use Observability Pipelines' Socket destination to send logs to a socket endpoint.

## Setup

Set up the Socket destination and its environment variables when you [set up a pipeline][1]. The following information is configured in the pipelines UI.

### Set up the destination

<div class="alert alert-danger">Only enter the identifier for the socket address and, if appliable, the key pass. Do <b>not</b> enter the actual values.</a></div>

1. Enter the identifier for your address. If you leave it blank, the [default](#set-secrets) is used.
1.  In the **Mode** dropdown menu, select the socket type to use.
1.  In the **Encoding** dropdown menu, select either `JSON` or `Raw message` as the output format.

#### Optional settings

##### Enable TLS

If you enabled **TCP** mode, you can toggle the switch to **Enable TLS**. The following certificate and key files are required for TLS:
- Enter the identifier for your socket key pass. If you leave it blank, the [default](#set-secrets) is used.

-   `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER or PEM (X.509).
-   `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) root file in DER or PEM (X.509).
-   `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

#### Buffering options

{{% observability_pipelines/destination_buffer %}}

### Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Socket address identifier:
	- References the address to which the Observability Pipelines Worker sends processed logs.
	- The default identifier is `DESTINATION_SOCKET_ADDRESS`.
- Socket TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `DESTINATION_SOCKET_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/socket %}}

{{% /tab %}}
{{< /tabs >}}

### How the destination works

#### Event batching

The Socket destination does not batch events.

[1]: https://app.datadoghq.com/observability-pipelines