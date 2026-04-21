---
title: Fluentd and Fluent Bit Sources
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' Fluentd or Fluent Bit source to receive logs from the your Fluentd or Fluent Bit agent.

## Prerequisites

{{% observability_pipelines/prerequisites/fluent %}}

## Setup

Set up this source when you [set up a pipeline][1]. You can set up a pipeline in the [UI][3], using the [API][4], or with [Terraform][5]. The instructions in this section are for setting up the source in the UI.

<div class="alert alert-danger">Only enter the identifiers for the Fluent address and, if applicable, the TLS key pass. Do <b>not</b> enter the actual values.</div>

1. Enter the identifier for your Fluent address. If you leave it blank, the [default](#set-secrets) is used.

### Optional settings

{{% observability_pipelines/tls_settings %}}

## Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Fluent address identifier:
	- References the address on which the Observability Pipelines Worker listens for incoming log messages.
	- The default identifier is `SOURCE_FLUENT_ADDRESS`.
- Fluent TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `SOURCE_FLUENT_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/fluent %}}

{{% /tab %}}
{{< /tabs >}}

## Send logs to the Observability Pipelines Worker over Fluent

{{% observability_pipelines/log_source_configuration/fluent %}}

[1]: /observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline