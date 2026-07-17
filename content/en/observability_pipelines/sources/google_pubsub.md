---
title: Google Pub/Sub Source
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' Google Pub/Sub source to pull logs from the Google Cloud Pub/Sub messaging system.

## Prerequisites

{{% observability_pipelines/prerequisites/google_pubsub %}}

## Setup

Set up this source when you [set up a pipeline][1]. You can set up a pipeline in the [UI][5], using the [API][6], or with [Terraform][7]. The instructions in this section are for setting up the source in the UI.

After you select the Google Pub/Sub source in the pipeline UI:

1. Enter the name of the source project.
1. If you have a credentials JSON file, enter the path to your credentials JSON file. The credentials file must be placed under `DD_OP_DATA_DIR/config`. Alternatively, you can use the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to provide the credential path.
    - If you're using [workload identity][2] on Google Kubernetes Engine (GKE), the `GOOGLE_APPLICATION_CREDENTIALS` is provided for you.
    - The Worker uses standard [Google authentication methods][4].
1. Enter the subscription name.
1. Select the decoder you want to use (Bytes, GELF, JSON, syslog).

### Optional TLS settings

<div class="alert alert-danger">For Secrets Management: Only enter the identifier for the TLS key pass. Do <b>not</b> enter the actual value.</div>

{{% observability_pipelines/secrets_env_var_note %}}

{{% observability_pipelines/tls_settings %}}

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

There are no default secret identifiers for this source.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/google_pubsub %}}

{{% /tab %}}
{{< /tabs >}}

## Metrics

For [component metrics][8] and [source buffer metrics][9] emitted by all sources, see the [Pipelines Usage Metrics][10] documentation. To filter or group by Google Pub/Sub source metrics, use the tag `component_type:gcp_pubsub`.

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[4]: https://cloud.google.com/docs/authentication#auth-flowchart
[5]: https://app.datadoghq.com/observability-pipelines
[6]: /api/latest/observability-pipelines/
[7]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[8]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[9]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[10]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
