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
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

The [**Pipelines**][1] page provides a pipeline-first view into your CI health by displaying important metrics and results from your pipelines. It can help you investigate performance problems and test failures that concern you the most because you work on the related code, not because you maintain the pipelines they are run in.

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
  
## Explore pipelines

To see your pipelines, navigate to **CI** > **Pipelines**.

## Pipelines health overview

The Pipelines page shows aggregate stats for the default branch of each pipeline over the selected time frame, as well as the status of the latest pipeline execution. Use this page to see all your pipelines and get a quick view of their health. The Pipelines page shows metrics for the _default_ branch, usually named something like `main` or `prod`.

Metrics shown include build frequency, failure rate, average duration, and 95th percentile duration. This information reveals which pipelines are high-usage and potentially high resource consumers. The last build result, duration, and last run time show you the effect of the last commit.

You can filter the page by pipeline name to see the pipelines you're most concerned with. Click on a pipeline that is slow or failing to dig into details that show what commit might have introduced the performance regression or build error.

## Pipeline details and branches

Click into a specific pipeline to see the _Pipeline Details_ page which provides views of the data for the pipeline you selected over a specified time frame, and can display branches other than the default.

{{< img src="ci/pipeline_branch_overview_updated.png" alt="Details for a single pipeline" style="width:100%;">}}

Get insights on the selected pipeline such as total and failed executions over time, build duration percentiles, and total time spent breakdown by stage. There are also summary tables for stages and jobs so you can quickly sort them in terms of duration, percentage of overall execution time, or failure rate.

When viewing the _default_ branch for a pipeline, each stage and job summary table on the page contains a _Duration Change_ graph that visualizes the absolute and relative change in duration of stages and jobs, along with a graph of _Errored Executions_.

{{< img src="ci/pipeline_job_summary_duration_change.png" alt="Job summary table" style="width:100%;">}}

When viewing a feature branch for a pipeline, there are two graphs for _Errored Executions_: one for failed executions in this feature branch, and another for comparing failures in this branch to other failures. You have the option to toggle between `Other Branches` and `Specific Branch`. Selecting `Other Branches` compares failed executions in this feature branch with aggregated failures across all other branches to help you distinguish between introduced (local) execution failures and inherited (global) execution failures. Toggling to `Specific Branch` directly compares failed executions in this feature branch with failed executions in another branch of your choice to help you specifically track changes in pipeline performance.

Optionally, you can directly compare failed executions in this feature branch with failed executions in another branch of your choice.

{{< img src="ci/pipeline_stage_summary_feature_branch.png" alt="Stage summary table" style="width:100%;">}}

The pipeline execution list at the bottom shows all the times that pipeline (or its stages or jobs) ran during the selected time frame, for the selected branch. Use the facets on the left side to filter the list to exactly the pipelines, stages, or jobs you want to see.

### Explore connections to services, resources, and network events

Click one of the executions to open the pipeline execution view and see the flame graph or span list for the pipeline and its stages. The _Executions (n)_ list on the left side gives you quick access to the data for each retry of the pipeline for the same commit.

Click the CI provider link (`gitlab-ci gitlab.pipeline > documentation` in the following image) to investigate the Resource, Service, or Analytics page for the pipeline, stage, or job specifically. You can also find complete tags information and links to network monitoring events.

{{< img src="ci/ci-pipeline-execution.png" alt="Trace info for pipeline execution" style="width:100%;">}}

### Explore connections to logs

If job log collection is supported and enabled for the CI provider, related log events can be found in the _Logs_ tab of the pipeline execution view.

**Note**: Job log collection is supported for a limited set of providers:
- [GitHub Actions][3]
- [GitLab][4] (beta)
- [Jenkins][5]

## Pipeline executions details and traces

On the [Pipeline Executions][6] page, you can see aggregated data about pipeline executions over the selected time frame. Use the search field and facets to scope the list down to the executions you want to investigate. Change the list to show pipelines, stages, or jobs using the buttons at the top.

Below are three graphs that visualize the durations of your most active pipelines, your failed pipelines over time, and the executions of your pipelines with an option to toggle to accumulated duration, respectively. These graphs are scoped to the level chosen at the top left (`Pipeline`, `Stage`, `Job`, and more.)

{{< img src="ci/pipeline_explorer_trends.png" alt="Explorer view trend graphs" style="width:100%;">}}

Each pipeline execution is reported as a trace, which includes stage and job information. Access individual pipeline, stage, and job execution traces by clicking on an execution in the list (similar to clicking into a pipeline execution from the Pipeline Details page).

Alternatively, click the [**Analytics**][7] button to interactively filter and group pipelines execution data into visualizations you can use to answer questions and share on dashboards.

{{< img src="ci/ci-pipelines-execution.png" alt="Analytics for a pipeline execution" style="width:100%;">}}

## Use CI pipelines data

When creating a [dashboard][8] or a [notebook][9], you can use CI pipeline data in your search query, which updates the visualization widget options. For more information, see the [Dashboards][10] and [Notebooks documentation][11].

## Alert on pipeline data

You can export your search query to a [CI Pipeline monitor][12] on the [**Pipelines Executions** page][6] or the [**Test Runs** page][13] by clicking the **Export** button.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/ci/pipelines
[2]: /api/latest/ci-visibility-pipelines/#send-pipeline-event
[3]: /continuous_integration/pipelines/github/#enable-log-collection
[4]: /continuous_integration/pipelines/gitlab/#enable-job-log-collection-beta
[5]: /continuous_integration/pipelines/jenkins#enable-job-log-collection
[6]: https://app.datadoghq.com/ci/pipeline-executions
[7]: https://app.datadoghq.com/ci/pipeline-executions?viz=timeseries
[8]: https://app.datadoghq.com/dashboard/lists
[9]: https://app.datadoghq.com/notebook/list
[10]: /dashboards
[11]: /notebooks
[12]: /monitors/types/ci
[13]: https://app.datadoghq.com/ci/test-runs