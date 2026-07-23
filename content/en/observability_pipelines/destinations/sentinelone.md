---
title: SentinelOne Destination
disable_toc: false
further_reading:
- link: "https://www.datadoghq.com/blog/observability-pipelines-sentinelone/"
  tag: "blog"
  text: "Optimize EDR logs and route them to SentinelOne with Observability Pipelines"
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' SentinelOne destination to send logs to SentinelOne.

## Setup

Configure the SentinelOne destination when you [set up a pipeline][4]. You can set up a pipeline in the [UI][1], using the [API][5], or with [Terraform][6]. The steps in this section are configured in the UI.

After you select the SentinelOne destination in the pipeline UI:

<div class="alert alert-danger">For Secrets Management: Only enter the identifier for the token. Do <b>not</b> enter the actual value.</div>

{{% observability_pipelines/secrets_env_var_note %}}

1. Enter the identifier for your token. If you leave it blank, the [default](#secret-defaults) is used.
1. Select your SentinelOne logs environment in the dropdown menu.

### Optional buffering

{{% observability_pipelines/destination_buffer %}}

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- SentinelOne write access token identifier:
	- The default identifier is `DESTINATION_SENTINEL_ONE_TOKEN`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sentinelone %}}

{{% /tab %}}
{{< /tabs >}}

## View logs in a SentinelOne cluster

After you've set up the pipeline to send logs to the SentinelOne destination, you can view the logs in a SentinelOne cluster:

1. Log into the [S1 console][2].
2. Navigate to the Singularity Data Lake (SDL) {{< ui >}}Search{{< /ui >}} page. To access it from the console, click on {{< ui >}}Visibility{{< /ui >}} on the left menu to go to SDL, and make sure you're on the {{< ui >}}Search{{< /ui >}} tab.
3. Make sure the filter next to the search bar is set to {{< ui >}}All Data{{< /ui >}}.
4. This page shows the logs you sent from Observability Pipelines to SentinelOne.

## Metrics

For [component metrics][7] and [destination buffer metrics][8] emitted by all destinations, see the [Pipelines Usage Metrics][9] documentation. To filter or group by Splunk HEC destination metrics, use the tag `component_type:splunk_hec_logs`.

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][3] for more information.

| Maximum Events | Maximum Size (MB) | Timeout (seconds)   |
|----------------|-------------------|---------------------|
| None           | 1                 | 1                   |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: https://usea1-partners.sentinelone.net/login
[3]: /observability_pipelines/destinations/#event-batching
[4]: /observability_pipelines/configuration/set_up_pipelines/
[5]: /api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[7]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[8]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[9]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
