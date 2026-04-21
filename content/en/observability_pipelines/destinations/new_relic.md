---
title: New Relic Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' New Relic destination to send logs to New Relic.

## Setup

Configure this destination when you [set up a pipeline][3]. You can set up a pipeline in the [UI][1], using the [API][4], or with [Terraform][5]. The instructions in this section are for configuring the destination in the UI.

After you select the New Relic destination in the pipeline UI:

<div class="alert alert-danger">Only enter the identifiers for the account ID and license. Do <b>not</b> enter the actual values.</div>

1.  Enter the identifier for your account ID. If you leave it blank, the [default](#secrets-defaults) is used.
1.  Enter the identifier for your license. If you leave it blank, the [default](#secrets-defaults) is used.
1. Select the data center region (**US** or **EU**) of your New Relic account.

#### Optional buffering

{{% observability_pipelines/destination_buffer %}}

## Secrets defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- New Relic account ID identifier:
	- The default identifier is `DESTINATION_NEW_RELIC_ACCOUNT_ID`.
- New Relic license identifier:
	- The default identifier is `DESTINATION_NEW_RELIC_LICENSE_KEY`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/new_relic %}}

{{% /tab %}}
{{< /tabs >}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Maximum Events | Maximum Size (MB) | Timeout (seconds)   |
|----------------|-------------------|---------------------|
| 100            | 1                 | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /observability_pipelines/configuration/set_up_pipelines/
[4]: /api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
