---
title: Socket Source
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' Socket source to send logs to the Worker over a socket connection (TCP or UDP).

## Prerequisites

{{% observability_pipelines/prerequisites/socket %}}

## Setup

Set up this source when you [set up a pipeline][1]. You can set up a pipeline in the [UI][3], using the [API][4], or with [Terraform][5]. The instructions in this section are for setting up the source in the UI.

<div class="alert alert-danger">Only enter the identifiers for the socket address and, if applicable, the TLS key pass. Do <b>not</b> enter the actual values.</div>

1.  Enter the identifier for your socket address. If you leave it blank, the [default](#set-secrets) is used.
1. In the **Mode** dropdown menu, select the socket type to use.
1. In the **Framing** dropdown menu, select how to delimit the stream of events.
    <table>
        <colgroup>
            <col style="width:40%">
            <col style="width:60%">
        </colgroup>
        <thead>
            <tr>
                <th>FRAMING METHOD</th>
                <th>DESCRIPTION</th>
            </tr>
        </thead>
        <tr>
            <td><code>newline_delimited</code></td>
            <td>Byte frames are delimited by a newline character.</td>
        </tr>
        <tr>
            <td><code>bytes</code></td>
            <td>Byte frames are passed through as-is according to the underlying I/O boundaries (for example, split between messages or stream segments).</td>
        </tr>
        <tr>
            <td><code>character_delimited</code></td>
            <td>Byte frames are delimited by a chosen character.</td>
        </tr>
        <tr>
            <td><code>chunked_gelf</code></td>
            <td>Byte frames are chunked GELF messages.</td>
        </tr>
        <tr>
            <td><code>octet_counting</code></td>
            <td>Byte frames are delimited according to the octet counting format.</td>
        </tr>
    </table>

### Optional settings

{{% observability_pipelines/tls_settings %}}

## Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Socket address identifier:
	- References the address and port where the Observability Pipelines Worker listens for incoming logs.
	- The default identifier is `SOURCE_SOCKET_ADDRESS`.
- Socket TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `SOURCE_SOCKET_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/socket %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline