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

{{< site-region region="us,eu,us3" >}}
## Configure the Datadog integration

The steps to activate the Datadog integration for [Buildkite][1] are:

{{< site-region region="us" >}}
1. Go to **Settings > Notification Services** in Buildkite and click add a **Datadog Pipeline Visibility** integration:
2. Fill in the form with the following:
   * **Description**: A description to help identify the integration in the future, such as Datadog CI Visibility integration.
   * **API key**: [your Datadog API Key][1].
   * **Datadog site**: datadoghq.com
   * **Pipelines**: Select all pipelines or the subset of pipelines you want to trace.
   * **Branch filtering**: Leave empty to trace all branches or select the subset of branches you want to trace.
3. Click **Add Datadog Pipeline Visibility Notification** to save the integration.

[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

{{< site-region region="eu" >}}
1. Go to **Settings > Notification Services** in Buildkite and click add a **Datadog Pipeline Visibility** integration:
2. Fill in the form with the following:
   * **Description**: A description to help identify the integration in the future, such as Datadog CI Visibility integration.
   * **API key**: [your Datadog API Key][1].
   * **Datadog site**: datadoghq.eu
   * **Pipelines**: Select all pipelines or the subset of pipelines you want to trace.
   * **Branch filtering**: Leave empty to trace all branches or select the subset of branches you want to trace.
3. Click **Add Datadog Pipeline Visibility Notification** to save the integration.

[1]: https://app.datadoghq.eu/organization-settings/api-keys
{{< /site-region >}}

{{< site-region region="us3" >}}
1. Go to **Settings > Notification Services** in Buildkite and click add a **Datadog Pipeline Visibility** integration:
2. Fill in the form with the following:
   * **Description**: A description to help identify the integration in the future, such as Datadog CI Visibility integration.
   * **API key**: [your Datadog API Key][1].
   * **Datadog site**: us3.datadoghq.com
   * **Pipelines**: Select all pipelines or the subset of pipelines you want to trace.
   * **Branch filtering**: Leave empty to trace all branches or select the subset of branches you want to trace.
3. Click **Add Datadog Pipeline Visibility Notification** to save the integration.

[1]: https://us3.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}


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

{{< site-region region="us3" >}}

The [Pipelines][1] and [Pipeline Executions][2] pages populate with data after the pipelines finish.

[1]: https://us3.datadoghq.com/ci/pipelines
[2]: https://us3.datadoghq.com/ci/pipeline-executions
{{< /site-region >}}

**Note**: The Pipelines page shows data for only the default branch of each repository.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://buildkite.com
{{< /site-region >}}

{{< site-region region="us5,gov" >}}
This feature is not supported for the selected Datadog site ({{< region-param key="dd_site_name" >}}).
{{< /site-region >}}
