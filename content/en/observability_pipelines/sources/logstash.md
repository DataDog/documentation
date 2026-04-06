---
title: Logstash Source
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' Logstash source to receive logs from your Logstash agent.

You can also use the Logstash source to [send logs to Observability Pipelines using Filebeat][2].

## Prerequisites

{{% observability_pipelines/prerequisites/logstash%}}

## Setup

Set up this source when you [set up a pipeline][1]. You can set up a pipeline in the [UI][4], using the [API][5], or with [Terraform][6]. The instructions in this section are for setting up the source in the UI.

<div class="alert alert-danger">Only enter the identifiers for the Logstash address and, if applicable, the TLS key pass. Do <b>not</b> enter the actual values.</div>

- Enter the identifier for your Logstash address. If you leave it blank, the [default](#set-secrets) is used.

### Optional settings

Toggle the switch to **Enable TLS**.
- If you are using Secrets Management, enter the identifier for the Logstash key pass. See [Set secrets](#set-secrets) for the defaults used.
{{% observability_pipelines/tls_settings %}}

## Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Logstash address identifier:
	- References the address on which the Observability Pipelines Worker listens for incoming log messages.
	- The default identifier is `SOURCE_LOGSTASH_ADDRESS`.
- Logstash TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `SOURCE_LOGSTASH_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/logstash %}}

{{% /tab %}}
{{< /tabs >}}

## Send logs to the Observability Pipelines Worker over Logstash

{{% observability_pipelines/log_source_configuration/logstash %}}

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: /observability_pipelines/sources/filebeat/
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline