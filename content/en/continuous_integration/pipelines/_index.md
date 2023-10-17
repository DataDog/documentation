---
title: Pipeline Visibility in Datadog
kind: documentation
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
        tags: ['ci pipeline', 'ci pipelines']
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

[Pipeline Visibility][1] provides a pipeline-first view into your CI health by displaying important metrics and results from your pipelines. It helps you troubleshoot pipeline failures, address performance bottlenecks, and track CI performance and reliability over time.

### Supported features

|  | Jenkins | GitLab | CircleCI | Buildkite | GitHub Actions | Azure Pipelines | Codefresh | TeamCity |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Collect traces" >}}The ability to capture APM traces.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="Partial retries" >}}The ability to identify partial retries (for example, when only a subset of jobs were retried) in CI providers.{{< /ci-details >}} |  | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="Manual steps" >}}The ability to identify when there is a job with a manual approval phase in the overall pipeline, which is split into two pipelines: <br>- From the beginning of the pipeline to when the manual approval action starts and the pipeline becomes <code>Blocked</code>.<br>- From the end of the manual approval action to the end of the pipeline.<br>{{< /ci-details >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  | {{< X >}} |  |
| {{< ci-details title="Queue time" >}}The ability to add the time for which a job (or pipeline depending on the CI provider) was in the queue before it executes.{{< /ci-details >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |
| {{< ci-details title="Logs correlation" >}}The ability to retrieve pipeline or job logs from the CI provider. Logs are displayed on the **Logs** tab in the Pipeline Execution view.{{< /ci-details >}} | {{< X >}} | {{< X >}} |  |  | {{< X >}} |  |  |  |
| {{< ci-details title="Infrastructure metric correlation" >}}The ability to display host-level information for the Datadog Agent or runners running jobs or pipelines.{{< /ci-details >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  |  |
| {{< ci-details title="Custom spans for traced commands using datadog-ci" >}}The ability to send command-level events to CI Visibility so the events can be incorporated in the pipeline flame graph. You can then query and analyze <a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_commands/">these events</a>. {{< /ci-details >}} | {{< X >}} |  | {{< X >}} |  | {{< X >}} |  |  |  |
| {{< ci-details title="Custom predefined tags" >}}The ability to set static pipeline tags that do not change between executions.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="Custom tags and metrics at runtime" >}}The ability to add <a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_tags_and_metrics/">user-defined text and numerical tags</a> to pipelines and jobs in CI Visibility.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |
| {{< ci-details title="Parameters" >}}The ability to add the custom pipeline parameters that users set (for example, <code>DYNAMICS_IS_CHILD:true</code>). Users can search using these parameters in the Datadog UI to find all the events with a specific parameter.{{< /ci-details >}} | {{< X >}} | {{< X >}} |  |  |  |  | {{< X >}} |  |
| {{< ci-details title="Pipeline failure reason" >}}The ability to add the reason for a failure of a pipeline or a job.{{< /ci-details >}} | {{< X >}} | {{< X >}} |  |  |  |  | {{< X >}} | {{< X >}} |

## Setup

{{< whatsnext desc="Select your CI provider to set up Pipeline Visibility in Datadog:" >}}
    {{< nextlink href="continuous_integration/pipelines/azure" >}}Azure{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/buildkite" >}}Buildkite{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/circleci" >}}CircleCI{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/codefresh" >}}Codefresh{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/github" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/gitlab" >}}GitLab{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/jenkins" >}}Jenkins{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/teamcity" >}}TeamCity{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom_commands" >}}Custom Commands{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom_tags_and_metrics" >}}Custom Tags and Metrics{{< /nextlink >}}
{{< /whatsnext >}}

### Terminology

While the concept of a CI pipeline may vary depending on your provider, see how those concepts correspond to the definition of a CI pipeline in Datadog Pipeline Visibility:

{{< tabs >}}
{{% tab "GitHub Actions" %}}

| Datadog | GitHub Actions |
|---|---|
| Pipeline | Workflow |
| Stage | Job |
| Job | Step |
| Step | Action |

{{% /tab %}}
{{% tab "GitLab" %}}

| Datadog | GitLab |
|---|---|
| Pipeline | Pipeline |
| Stage | Stage |
| Job | Job |
| Step |  |

{{% /tab %}}
{{% tab "Jenkins" %}}

| Datadog | Jenkins |
|---|---|
| Pipeline | Pipeline |
| Stage | Stage |
| Job | Job |
| Step | Step |

{{% /tab %}}
{{% tab "CircleCI" %}}

| Datadog | CircleCI |
|---|---|
| Pipeline | Pipeline |
| Stage | Workflow |
| Job | Job |
| Step | Step |

{{% /tab %}}
{{% tab "Buildkite" %}}


| Datadog | Buildkite |
|---|---|
| Pipeline | Pipeline |
| Pipeline Execution | Build |
| Stage |  |
| Job | Job |
| Step |  |

{{% /tab %}}
{{% tab "TeamCity" %}}

| Datadog | TeamCity |
|---|---|
| Pipeline | Build Chain |
| Stage |  |
| Job | Build |
| Step |  |

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

| Datadog | Azure Pipelines |
|---|---|
| Pipeline | Pipeline |
| Stage | Stage |
| Job | Job |
| Step | Step |

{{% /tab %}}
{{< /tabs >}}

If your CI provider is not supported, you can try setting up Pipeline Visibility through the [public API endpoint][2].

## Use CI pipelines data

When creating a [dashboard][8] or a [notebook][9], you can use CI pipeline data in your search query, which updates the visualization widget options. For more information, see the [Dashboards][10] and [Notebooks documentation][11].

## Alert on pipeline data

You can export your search query to a [CI Pipeline monitor][12] on the [**Pipelines Executions** page][6] or the [**Test Runs** page][13] by clicking the **Export** button.

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
