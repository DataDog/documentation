---
title: Set up Tracing on a CircleCI Workflow
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

The Datadog integration for [CircleCI][1] works by using [webhooks][2] to send data to Datadog.


{{< site-region region="us" >}}
1. For each project, go to **Project Settings > Webhooks** in CircleCI and add a new webhook:
   * **Webhook URL**: `https://webhook-intake.datadoghq.com/api/v2/webhook/?dd-api-key=<API_KEY>` where `<API_KEY>` is [your Datadog API key][1].
   * **Name**: `Datadog CI Visibility` or any other identifier name that you want to provide.
   * **Events**: Select `Workflow Completed` and `Job Completed`.
   * **Certificate verifications**: Enable this check.

[1]: https://app.datadoghq.com/account/settings#api
{{< /site-region >}}

{{< site-region region="eu" >}}
1. For each project, go to **Project Settings > Webhooks** in CircleCI and add a new webhook:
   * **Webhook URL**: `https://webhook-intake.datadoghq.eu/api/v2/webhook/?dd-api-key=<API_KEY>` where `<API_KEY>` is [your Datadog API key][1].
   * **Name**: `Datadog CI Visibility` or any other identifier name that you want to provide.
   * **Events**: Select `Workflow Completed` and `Job Completed`.
   * **Certificate verifications**: Enable this check.

[1]: https://app.datadoghq.eu/account/settings#api
{{< /site-region >}}

2. Click **Add Webhook** to save the new webhook.

## Visualize pipeline data in Datadog

{{< site-region region="us" >}}

The [Pipelines][1] and [Pipeline Executions][2] pages populate with data after the workflows finish.

[1]: https://app.datadoghq.com/ci/pipelines
[2]: https://app.datadoghq.com/ci/pipeline-executions
{{< /site-region >}}

{{< site-region region="eu" >}}

The [Pipelines][1] and [Pipeline Executions][2] pages populate with data after the workflows finish.

[1]: https://app.datadoghq.eu/ci/pipelines
[2]: https://app.datadoghq.eu/ci/pipeline-executions
{{< /site-region >}}

**Note**: The Pipelines page shows data for only the default branch of each repository.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://circleci.com/
[2]: https://circleci.com/docs/2.0/webhooks
{{< /site-region >}}

{{< site-region region="us3,gov" >}}
This feature is not supported for the selected Datadog site ({{< region-param key="dd_site_name" >}}).
{{< /site-region >}}
