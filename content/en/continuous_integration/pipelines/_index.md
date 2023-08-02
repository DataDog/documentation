---
title: Pipeline Visibility in Datadog
kind: documentation
aliases:
  - /continuous_integration/pipelines_setup/
  - /continuous_integration/explore_pipelines/
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

[Pipeline Visibility][1] provides a pipeline-first view into your CI health by displaying important metrics and results from your pipelines. It can help you investigate performance problems and test failures that concern you the most because you work on the related code, not because you maintain the pipelines they are run in.

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
