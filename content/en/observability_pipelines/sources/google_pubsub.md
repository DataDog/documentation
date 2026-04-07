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

1. Enter the name of the source project.
1. If you have a credentials JSON file, enter the path to your credentials JSON file. The credentials file must be placed under `DD_OP_DATA_DIR/config`. Alternatively, you can use the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to provide the credential path.
    - If you're using [workload identity][2] on Google Kubernetes Engine (GKE), the `GOOGLE_APPLICATION_CREDENTIALS` is provided for you.
    - The Worker uses standard [Google authentication methods][4].
1. Enter the subscription name.
1. Select the decoder you want to use (Bytes, GELF, JSON, syslog).
{{% observability_pipelines/tls_settings %}}

## Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

There are no default secret identifiers for this source.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/google_pubsub %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[4]: https://cloud.google.com/docs/authentication#auth-flowchart
[5]: https://app.datadoghq.com/observability-pipelines
[6]: /api/latest/observability-pipelines/
[7]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline