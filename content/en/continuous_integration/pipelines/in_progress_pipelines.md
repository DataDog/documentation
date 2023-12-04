---
title: Visualize In-Progress Pipeline Executions
kind: documentation
aliases:
  - /continuous_integration/setup_pipelines/in_progress_pipelines
further_reading:
  - link: "/continuous_integration/troubleshooting/"
    tag: "Documentation"
    text: "Troubleshooting CI"
  - link: "https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/"
    tag: "Blog"
    text: "Configure pipeline alerts with Datadog CI monitors"  
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available for the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">In-progress pipelines is a beta feature.</div>

In-progress pipelines provides a way to visualize CI Visibility pipeline traces that are still in progress in the CI provider.
This feature tracks the duration of a pipeline that is in progress in the CI provider. The duration of the pipeline can then be used to have observability of those pipelines that are taking too much time to finish in the CI Provider. Facets and measures that belong to the pipelines in progress can be used to search, graph, or monitor the pipelines.

{{< img src="ci/ci-in-progress-pipelines.png" alt="Details for a single pipeline in progress" style="width:100%;">}}

## Compatibility

In-progress pipelines work with the following CI providers:

- GitLab (SaaS or self-hosted >= 14.1)

## Limitations

### Webhook Events Deliver Is Not Ensured by CI Providers

This feature depends on CI Providers sending the webhook events properly indicating if pipelines are running or have finished.

You can see pipeline executions marked as `Running` in Datadog that have already finished if the CI Provider could not send all the webhooks events properly. This might lead to have false positives on monitors tracking in-progress pipelines.

Notice that the webhook events deliver is not ensured by CI Providers.

### Maximum Duration for a Pipeline Execution

The maximum duration that a pipeline execution can be in progress is 3 days. After that time, the pipeline execution will not be tracked as "in-progress" anymore in CI Visibility. 

If the pipeline execution finishes after +3 days, you can visualize the finished pipeline execution in CI Visibility as usual, even if the pipeline execution was not being tracked as "in-progress" anymore.

### Trace View Only Shows Pipeline Level

The trace view only shows the pipeline level while the pipeline execution is running.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pipelines
[2]: /api/latest/ci-visibility-pipelines/#send-pipeline-event
[6]: https://app.datadoghq.com/ci/pipeline-executions
[8]: https://app.datadoghq.com/dashboard/lists
[9]: https://app.datadoghq.com/notebook/list
[10]: /dashboards
[11]: /notebooks
[12]: /monitors/types/ci
[13]: https://app.datadoghq.com/ci/test-runs