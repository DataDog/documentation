---
title: Socket Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' Socket destination to send logs to a socket endpoint.

## Setup

Configure this destination when you [set up a pipeline][2]. You can set up a pipeline in the [UI][1], using the [API][3], or with [Terraform][4]. The instructions in this section are configured in the UI.

After you select the Socket destination in the pipeline UI:

<div class="alert alert-danger">Only enter the identifier for the socket address and, if appliable, the key pass. Do <b>not</b> enter the actual values.</a></div>

1. Enter the identifier for your address. If you leave it blank, the [default](#secrets-defaults) is used.
1.  In the **Mode** dropdown menu, select the socket type to use.
1.  In the **Encoding** dropdown menu, select either `JSON` or `Raw message` as the output format.

#### Optional settings

##### Enable TLS

{{% observability_pipelines/tls_settings %}}

##### Buffering

{{% observability_pipelines/destination_buffer %}}

## Secrets defaults

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
[2]: /observability_pipelines/configuration/set_up_pipelines/
[3]: /api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
