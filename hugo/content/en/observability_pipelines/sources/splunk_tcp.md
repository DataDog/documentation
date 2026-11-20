---
title: Splunk Heavy or Universal Forwarders (TCP) Source
description: Learn how to collect logs from Splunk Heavy or Universal Forwarders over TCP using the Observability Pipelines Worker.
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' Splunk Heavy and Universal Forwards (TCP) source to receive logs sent to your Splunk forwarders.

## Prerequisites

{{% observability_pipelines/prerequisites/splunk_tcp %}}

## Setup

<div class="alert alert-danger">For Secrets Management: Only enter the identifiers for the Splunk TCP address and, if applicable, the TLS key pass. Do <b>not</b> enter the actual values.</div>

Set up this source when you [set up a pipeline][1]. You can set up a pipeline in the [UI][2], using the [API][3], or with [Terraform][4]. The instructions in this section are for setting up the source in the UI.

After you select the Splunk TCP source in the pipeline UI, enter the identifier for your Splunk TCP address. If you leave it blank, the [default](#secret-defaults) is used.

{{% observability_pipelines/secrets_env_var_note %}}

### Optional settings

#### Maximum connection duration

Enter the maximum number of seconds to keep a connection open. If left unset, connections can remain open indefinitely.

#### Enable TLS

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

### Settings configured with environment variables

#### Connection limit

By default, the Splunk TCP source doesn't limit the number of connections. To set a maximum number of connections, set the `DD_OP_SPLUNK_TCP_CONNECTION_LIMIT` environment variable. If the variable is unset or set to `0`, there is no limit.

#### Maximum frame length

By default, the Splunk TCP source doesn't limit the size of an event. To prevent unbounded memory consumption, such as from malformed connections or connections that remain open indefinitely, set the `DD_OP_SPLUNK_TCP_MAX_FRAME_LENGTH` environment variable to the maximum frame length in bytes.

#### TCP keepalive

TCP keepalive is enabled by default with a 60-second idle time. This helps detect dead connections when clients disconnect without closing the connection. To change the idle time, set the `DD_OP_SPLUNK_TCP_KEEPALIVE_TIME_SECS` environment variable to the number of seconds.

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Splunk TCP address identifier:
	- References the socket address, such as `0.0.0.0:9997` on which the Observability Pipelines Worker listens to receive logs from the Splunk Forwarder.
	- The default identifier is `SOURCE_SPLUNK_TCP_ADDRESS`.
- Splunk TCP TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `SOURCE_SPLUNK_TCP_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_tcp %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/log_source_configuration/splunk_tcp %}}

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline