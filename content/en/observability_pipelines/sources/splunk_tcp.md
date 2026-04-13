---
title: Splunk Heavy or Universal Forwarders (TCP) Source
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

Set up this source when you [set up a pipeline][1]. You can set up a pipeline in the [UI][2], using the [API][3], or with [Terraform][4]. The instructions in this section are for setting up the source in the UI.

<div class="alert alert-danger">Only enter the identifiers for the Splunk TCP address and, if applicable, the TLS key pass. Do <b>not</b> enter the actual values.</div>

- Enter the identifier for your Splunk TCP address. If you leave it blank, the [default](#set-secrets) is used.

### Optional TLS settings

{{% observability_pipelines/tls_settings %}}

## Set secrets

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