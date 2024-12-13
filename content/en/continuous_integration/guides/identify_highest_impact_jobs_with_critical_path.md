---
title: Identify CI Jobs on the Critical Path to reduce the Pipeline Duration
description: Learn how to identify those CI Jobs that are on the critical path to improve the duration of your CI Pipelines.
further_reading:
  - link: "/continuous_integration/search/#pipeline-details-and-executions"
    tag: "Documentation"
    text: "Learn how to search and manage your pipeline executions"
  - link: "continuous_integration/search/#highlight-critical-path"
    tag: "Documentation"
    text: "Highlight critical path in your Pipeline Execution"
---

## Overview

This guide explains how to identify the CI jobs that are on the critical path, with the goal of determining which CI jobs to focus on to improve the overall duration of CI pipelines.

### Understanding the Critical Path in a CI Pipeline

The critical path in a CI Pipeline is the longest sequence of CI Jobs that determines the total duration of that pipeline. In other words, it is the path through the DAG of CI Jobs that requires the most time to complete. You can only reduce the total duration of a CI Pipeline by reducing the duration of CI Jobs that are on the critical path.

{{< img src="continuous_integration/critical_path_highlight_pipeline.png" alt="Highlight of jobs on the critical path in a pipeline execution." width="90%">}}

However, CI jobs are typically executed in parallel with other jobs, meaning that the actual reduction in pipeline time is determined by the **exclusive time** a CI job spends on the CI runner during its execution.

The exclusive time that a job is on the critical path represents the amount of time the CI runner has spent executing a specific job exclusively, excluding the execution time of other jobs that were running in parallel.

{{< img src="continuous_integration/critical_path_highlight_pipeline_exclusive_time.png" alt="Highlight exclusive time of the jobs on the critical path in a pipeline execution." width="90%">}}

If CI job A is on the critical path with a duration of 100ms and runs in parallel with CI job B, which takes 80ms, the exclusive time for job A on the critical path would be 20ms. This means the actual improvement in pipeline duration reduction would be 20ms.

### Compatibility

<div class="alert alert-info">Are you interested in critical path and your CI provider is not supported yet? Fill out this form.</div>

Filtering and Exclusive Time computation of CI Jobs on the Critical Path is available for the following CI Providers:
* [GitLab][3]

You can still [highlight which CI Jobs are on the critical path][4] using the Pipeline Execution detail view across all CI providers.

## Identify the CI Jobs to improve your CI Pipeline

### Using the facet

You can use the facet `@ci.on_critical_path` and `@ci.critical_path.exclusive_time` to identify which CI Jobs are on the critical path in your CI Pipelines. Using those facets, you can create your custom dashboards and notebooks for your needs.

{{< img src="continuous_integration/critical_path_facets.png" alt="Filter using critical path facets" width="90%">}}

Notice that the facet is only available using the `ci_level:job` in your queries, as it's a tag added only to the CI Job level.

### Using the dashboard template

You can also import the [CI Visibility - Critical Path][1] dashboard template:
- Open [civisibility-critical-path-gitlab-dashboard.json][1] dashboard template and copy the content in the clipboard.
- Create a [New Dashboard][2] in Datadog.
- Paste the copied content in the new dashboard.
- Save the dashboard.

{{< img src="continuous_integration/critical_path_dashboard.png" alt="Critical path dashboard for CI Visibility" width="90%">}}

#### Terminology

| Column                                | Description                                                                                                                                                      |
|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Total Exclusive Time On Critical Path | Sum all exclusive time of the job. It gives an approximation of the potential saved time the involved pipelines might have.                                      |
| Avg Exclusive Time On Critical Path   | Avg exclusive time of a particular job on the critical path. This measures the potential reduction of a pipeline duration if the job reduces its exclusive time. |
| Rate On Critical Path                 | Measures the porcentage that a job is on the critical path compared when that job is not.                                                                        |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /resources/json/civisibility-critical-path-gitlab-dashboard.json
[2]: /dashboards/
[3]: /continuous_integration/pipelines/gitlab/?tab=gitlabcom
[4]: /continuous_integration/search/#highlight-critical-path