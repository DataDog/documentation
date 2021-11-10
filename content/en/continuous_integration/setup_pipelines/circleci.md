---
title: Set up Tracing on a CircleCI Workflow
kind: documentation
further_reading:
    - link: "/continuous_integration/explore_pipelines"
      tag: "Documentation"
      text: "Explore Pipeline Execution Results and Performance"
    - link: "/continuous_integration/setup_pipelines/custom_commands/"
      tag: "Documentation"
      text: "Extend Pipeline Visibility by tracing individual commands"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Configure the Datadog integration

The Datadog integration for [CircleCI][1] works by using [webhooks][2] to send data to Datadog.

1. For each project, go to **Project Settings > Webhooks** in CircleCI and add a new webhook:
   * **Webhook URL**: <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/?dd-api-key=<API_KEY></code> where `<API_KEY>` is your [Datadog API key][3].
   * **Name**: `Datadog CI Visibility` or any other identifier name that you want to provide.
   * **Events**: Select `Workflow Completed` and `Job Completed`.
   * **Certificate verifications**: Enable this check.

2. Click **Add Webhook** to save the new webhook.

## Visualize pipeline data in Datadog

The [Pipelines][4] and [Pipeline Executions][5] pages populate with data after the workflows finish.

**Note**: The Pipelines page shows data for only the default branch of each repository.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://circleci.com/
[2]: https://circleci.com/docs/2.0/webhooks
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
