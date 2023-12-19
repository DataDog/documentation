---
title: Send custom pipelines to Datadog
kind: documentation
aliases:
  - /continuous_integration/setup_pipelines/custom
further_reading:
    - link: "/continuous_integration/pipelines"
      tag: "Documentation"
      text: "Explore Pipeline Execution Results and Performance"
    - link: "/continuous_integration/guides/pipeline_data_model"
      tag: "Documentation"
      text: "Learn about the Pipeline Data Model and Execution Types"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"

---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Compatibility

- **Custom tags and metrics**: Attach custom tags and metrics to pipeline executions

- **Manual steps**: View manually triggered pipelines

- **Parameters**: Set custom parameters to pipelines

- **Partial pipelines**: View partially retried pipelines

- **Pipeline failure reasons**: Identify pipeline failure reasons from error messages

- **Queue time**: View amount of time pipeline jobs sit in the queue before processing

## Send pipelines to Datadog

Send custom pipelines through HTTP using the [public API endpoint][1]. For details about how pipeline executions are modeled, see [Pipeline Data Model and Execution Types][2].

## Visualize pipeline data in Datadog

The [Pipelines][3] and [Pipeline Executions][4] pages populate with data after the pipelines are accepted for processing.

**Note**: The Pipelines page shows data for only the default branch of each repository.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/ci-visibility-pipelines/#send-pipeline-event
[2]: /continuous_integration/guides/pipeline_data_model/
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
