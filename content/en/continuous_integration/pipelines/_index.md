---
title: CI Pipeline Visibility in Datadog
aliases:
  - /continuous_integration/pipelines_setup/
  - /continuous_integration/explore_pipelines/
  - /continuous_integration/setup_pipelines/
further_reading:
    - link: "/monitors/types/ci/"
      tag: "Documentation"
      text: "Creating CI Pipeline Monitors"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
cascade:
    algolia:
        rank: 70
        tags: ['ci pipeline', 'ci pipelines', 'supported features']
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

[Pipeline Visibility][1] provides a pipeline-first view into your CI health by displaying important metrics and results from your pipelines. It helps you troubleshoot pipeline failures, address performance bottlenecks, and track CI performance and reliability over time.

## Setup

{{< whatsnext desc="Select your CI provider to set up Pipeline Visibility in Datadog:" >}}
    {{< nextlink href="continuous_integration/pipelines/awscodepipeline" >}}AWS CodePipeline{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/azure" >}}Azure{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/buildkite" >}}Buildkite{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/circleci" >}}CircleCI{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/codefresh" >}}Codefresh{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/github" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/gitlab" >}}GitLab{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/jenkins" >}}Jenkins{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/teamcity" >}}TeamCity{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom" >}}Other CI Providers{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom_commands" >}}Custom Commands{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom_tags_and_measures" >}}Custom Tags and measures{{< /nextlink >}}
{{< /whatsnext >}}

### Terminology

While the concept of a CI pipeline may vary depending on your provider, see how those concepts correspond to the definition of a CI pipeline in Datadog Pipeline Visibility:

{{< tabs >}}
{{% tab "GitHub Actions" %}}

| Datadog  | GitHub Actions |
|----------|----------------|
| Pipeline | Workflow       |
| Job      | Job            |
| Step     | Step           |

{{% /tab %}}
{{% tab "GitLab" %}}

| Datadog                    | GitLab   |
|----------------------------|----------|
| Pipeline                   | Pipeline |
| Stage                      | Stage    |
| Job                        | Job      |
| _Not available in Datadog_ | Script   |

{{% /tab %}}
{{% tab "Jenkins" %}}

| Datadog  | Jenkins  |
|----------|----------|
| Pipeline | Pipeline |
| Stage    | Stage    |
| Job      | Step     |

{{% /tab %}}
{{% tab "CircleCI" %}}

| Datadog                    | CircleCI  |
|----------------------------|-----------|
| Pipeline                   | Workflow  |
| Job                        | Job       |
| _Not available in Datadog_ | Step      |

{{% /tab %}}
{{% tab "Buildkite" %}}

| Datadog                    | Buildkite |
|----------------------------|-----------|
| Pipeline                   | Pipeline  |
| Job                        | Job       |
| _Not available in Datadog_ | Step      |

{{% /tab %}}
{{% tab "TeamCity" %}}

| Datadog                    | TeamCity    |
|----------------------------|-------------|
| Pipeline                   | Build Chain |
| Job                        | Build       |
| _Not available in Datadog_ | Step        |

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

| Datadog                    | Azure Pipelines |
|----------------------------|-----------------|
| Pipeline                   | Pipeline        |
| Stage                      | Stage           |
| Job                        | Job             |
| _Not available in Datadog_ | Step            |

{{% /tab %}}
{{% tab "AWS CodePipeline" %}}

| Datadog  | AWS CodePipeline |
|----------|------------------|
| Pipeline | Pipeline         |
| Stage    | Stage            |
| Job      | Action           |

{{% /tab %}}

{{% tab "Other CI Providers" %}}

| Datadog  | Other CI Providers |
|----------|--------------------|
| Pipeline | Pipeline           |
| Stage    | Stage              |
| Job      | Job                |
| Step     | Step               |

{{% /tab %}}
{{< /tabs >}}

If your CI provider is not supported, you can try setting up Pipeline Visibility through the [public API endpoint][2].

### Supported features

|  | Jenkins | GitLab | CircleCI | Buildkite | GitHub Actions | Azure Pipelines | Codefresh | TeamCity | AWS CodePipeline | Other CI Providers |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Pipeline trace visualization" >}}Visualization of pipeline executions with associated tracing.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="Running pipelines" >}}Identification of pipelines executions that are running with associated tracing.{{< /ci-details >}} | | {{< X >}} | | | {{< X >}} | | | | {{< X >}} |
| {{< ci-details title="Partial retries" >}}Identification of partial retries (for example, when only a subset of jobs were retried).{{< /ci-details >}} |  | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  {{< X >}} |
| {{< ci-details title="Step spans" >}}Step level spans are available for more granular visibility.{{< /ci-details >}} | {{< X >}} (_But are presented as job spans_) |  |  |  | {{< X >}} |  | {{< X >}} |  |  |  {{< X >}} |
| {{< ci-details title="Manual steps" >}}Identification of when there is a job with a manual approval phase in the overall pipeline.{{< /ci-details >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  {{< X >}} |
| {{< ci-details title="Approval wait time">}}Time for which a pipeline or job has been waiting for a manual approval.{{< /ci-details >}} |  | {{< X >}} |  |  |  {{< X >}}  | {{< X >}}  |   |  | {{< X >}} |  |
| {{< ci-details title="Queue time" >}}Time for which a pipeline or job was in the queue before execution.{{< /ci-details >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  {{< X >}} |
| {{< ci-details title="Execution time" >}}Time for which a pipeline has been actively running jobs.{{< /ci-details >}} | | {{< X >}} | | | | | | | | |
| {{< ci-details title="Logs correlation" >}}Retrieval of pipeline or job logs from the CI provider. Logs are displayed on the <strong>Logs</strong> tab in the Pipeline Execution view.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  | {{< X >}} |  |
| {{< ci-details title="Infrastructure metric correlation" >}}Correlation of host-level information for the Datadog Agent, CI pipelines, or job runners to CI pipeline execution data.{{< /ci-details >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  |  |  |  |
| {{< ci-details title="Custom spans for traced commands using datadog-ci" >}}Support for sending command-level events to CI Visibility to be incorporated into pipeline flame graph visualization. You can then query and analyze <a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_commands/">these events</a>. {{< /ci-details >}} | {{< X >}} |  | {{< X >}} |  |  |  |  |  |  |  |
| {{< ci-details title="Custom predefined tags" >}}Support for setting static pipeline tags in the CI provider that do not change between executions.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  |  |  |
| {{< ci-details title="Custom tags and measures at runtime" >}}Support for adding <a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_tags_and_measures/">user-defined text and numerical tags</a> to pipelines and jobs in CI Visibility.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |  |  |  {{< X >}} |
| {{< ci-details title="Parameters" >}}Support for adding custom pipeline parameters that users set (for example, <code>DYNAMICS_IS_CHILD:true</code>). You can then search using these parameters in the <a href="https://docs.datadoghq.com/continuous_integration/explorer/?tab=pipelineexecutions">CI Visibility Explorer</a> to find all events with a specific parameter.{{< /ci-details >}} | {{< X >}} | {{< X >}} |  |  |  |  | {{< X >}} |  |  |  {{< X >}} |
| {{< ci-details title="Pipeline failure reason" >}}Identification of a specific reason behind a pipeline or job failure.{{< /ci-details >}} | {{< X >}} | {{< X >}} |  |  |  |  | {{< X >}} | {{< X >}} | {{< X >}} |  {{< X >}} |

## Use CI pipelines data

When creating a [dashboard][8] or a [notebook][9], you can use CI pipeline data in your search query, which updates the visualization widget options. For more information, see the [Dashboards][10] and [Notebooks documentation][11].

## Alert on pipeline data

You can export your search query to a [CI Pipeline monitor][12] on the [**Executions** page][6] or the [**Test Runs** page][13] by clicking the **Export** button.

## Further reading

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
