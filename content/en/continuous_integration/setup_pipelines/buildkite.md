---
title: Set up Tracing on a Buildkite Pipeline
kind: documentation
further_reading:
    - link: "/continuous_integration/explore_pipelines"
      tag: "Documentation"
      text: "Explore Pipeline Execution Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

{{< site-region region="us,eu" >}}
## Configure the Datadog integration

The Datadog integration for [Buildkite][2] works by using [webhooks][1] to send pipeline data to Datadog.

{{< site-region region="us" >}}
1. Go to **Settings > Notification Services** in Buildkite and add a new webhook:
   * **Webhook URL**: `https://webhook-intake.datadoghq.com/api/v2/webhook/?dd-api-key=<API_KEY>` where `<API_KEY>` is [your Datadog API key][1].
   * **Events**: Select `job.finished` and `build.finished`.
   * **Pipelines**: Select all pipelines or the subset of pipelines you want to trace.

[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

{{< site-region region="eu" >}}
1. Go to **Settings > Notification Services** in Buildkite and add a new webhook:
   * **Webhook URL**: `https://webhook-intake.datadoghq.eu/api/v2/webhook/?dd-api-key=<API_KEY>` where `<API_KEY>` is [your Datadog API key][1].
   * **Events**: Select `job.finished` and `build.finished`.
   * **Pipelines**: Select all pipelines or the subset of pipelines you want to trace.

[1]: https://app.datadoghq.eu/organization-settings/api-keys
{{< /site-region >}}

2. Click **Add Webhook Notification** to save the new webhook.

## Visualize pipeline data in Datadog

{{< site-region region="us" >}}
The [Pipelines][1] and [Pipeline Executions][2] pages populate with data after the pipelines finish.

[1]: https://app.datadoghq.com/ci/pipelines
[2]: https://app.datadoghq.com/ci/pipeline-executions
{{< /site-region >}}

{{< site-region region="eu" >}}

The [Pipelines][1] and [Pipeline Executions][2] pages populate with data after the pipelines finish.

[1]: https://app.datadoghq.eu/ci/pipelines
[2]: https://app.datadoghq.eu/ci/pipeline-executions
{{< /site-region >}}

**Note**: The Pipelines page shows data for only the default branch of each repository.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://buildkite.com/docs/apis/webhooks
[2]: https://buildkite.com
[3]: /getting_started/tagging/unified_service_tagging
{{< /site-region >}}

{{< site-region region="us3,gov" >}}
This feature is not supported for the selected Datadog site ({{< region-param key="dd_site_name" >}}).
{{< /site-region >}}
