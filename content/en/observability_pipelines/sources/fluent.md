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

<div class="alert alert-danger">For Secrets Management: Only enter the identifiers for the Fluent address and, if applicable, the TLS key pass. Do <b>not</b> enter the actual values.</div>

{{% observability_pipelines/secrets_env_var_note %}}

After you select the Fluent source in the pipeline UI, enter the identifier for your Fluent address. If you leave it blank, the [default](#secret-defaults) is used.

### Optional settings

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## Secret defaults

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

## Metrics

For [component metrics][6] and [source buffer metrics][7] emitted by all sources, see the [Pipelines Usage Metrics][8] documentation. To filter or group by Fluent source metrics, use the tag `component_type:fluent`.

[1]: /observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[8]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
