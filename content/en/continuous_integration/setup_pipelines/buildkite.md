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

{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">
The selected Datadog site ({{< region-param key="dd_site_name" >}}) is not supported.
</div>
{{< /site-region >}}

{{< site-region region="us,eu,us3" >}}
## Configure the Datadog integration

The Datadog integration for [Buildkite][1] works by using [webhooks][2] to send pipeline data to Datadog.

1. Go to **Settings > Notification Services** in Buildkite and add a new webhook:
   * **Webhook URL**: <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/?dd-api-key=<API_KEY></code> where `<API_KEY>` is your [Datadog API key][3].
   * **Events**: Select `job.finished` and `build.finished`.
   * **Pipelines**: Select all pipelines or the subset of pipelines you want to trace.

2. Click **Add Webhook Notification** to save the new webhook.

## Visualize pipeline data in Datadog

The [Pipelines][4] and [Pipeline Executions][5] pages populate with data after the pipelines finish.

**Note**: The Pipelines page shows data for only the default branch of each repository.

[1]: https://buildkite.com
[2]: https://buildkite.com/docs/apis/webhooks
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
{{< /site-region >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

