---
title: Identify CI Jobs on the Critical Path to Reduce the Pipeline Duration
description: Learn how to identify CI jobs that are on the critical path to improve the duration of your CI pipelines.
further_reading:
  - link: "/continuous_integration/search/#pipeline-details-and-executions"
    tag: "Documentation"
    text: "Learn how to search and manage your pipeline executions"
  - link: "continuous_integration/search/#highlight-critical-path"
    tag: "Documentation"
    text: "Highlight critical path in your Pipeline Execution"
---

## Overview

This guide explains how to identify the CI jobs that are on the critical path to help you determine which jobs to prioritize in order to reduce the overall duration of the CI pipelines.

### Understanding the critical path in a CI pipeline

The critical path of a CI pipeline execution is the longest sequence of CI jobs that determines the total duration of that pipeline execution. Essentially, it is the path through the dependency graph of CI jobs that takes the most time to complete. To reduce the total duration of a CI pipeline execution, you need to shorten the duration of CI jobs along this critical path.

{{< img src="continuous_integration/critical_path_highlight_pipeline.png" alt="Highlight of jobs on the critical path in a pipeline execution." width="90%">}}

Looking at the job duration may not be enough. CI jobs are typically executed in parallel with other jobs, which means the reduction of the pipeline execution time is determined by reducing the **exclusive time** of the CI job.

The exclusive time of a job on the critical path represents the amount of time the CI runner has spent executing a specific job, excluding the execution time of other jobs that were running in parallel.

{{< img src="continuous_integration/critical_path_highlight_pipeline_exclusive_time.png" alt="Highlight exclusive time of the jobs on the critical path in a pipeline execution." width="90%">}}

If a CI job `job1` is on the critical path with a duration of 100ms and runs in parallel with a CI job `job2`, which has a duration of 80ms, the exclusive time of `job1` on the critical path is 20ms. This means that reducing the duration of the `job1` by more than 20ms would still only decrease the overall pipeline duration by 20ms.

## Identify the key CI jobs to improve your CI pipeline

### Using the facet

You can use the facet `@ci.on_critical_path` or `@ci.critical_path.exclusive_time` to identify which CI jobs are on the critical path in your CI pipelines. Using those facets, you can create custom dashboards and notebooks for your needs.

{{< img src="continuous_integration/critical_path_facets.png" alt="Filter using critical path facets" width="90%">}}

Notice that these facets are only available using the `ci_level:job` in your queries.

### Using the dashboard template

You can also import the [CI Visibility - Critical Path][1] dashboard template:
- Open the [civisibility-critical-path-dashboard.json][1] dashboard template and copy the content in the clipboard.
- Create a [New Dashboard][2] in Datadog.
- Paste the copied content in the new dashboard.
- Save the dashboard.

{{< img src="continuous_integration/critical_path_dashboard.png" alt="Critical path dashboard for CI Visibility" width="90%">}}

#### Terminology

| Column                                | Description                                                                                                                                                      |
|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Total Exclusive Time On Critical Path | Sum of all exclusive time of the job. It estimates the potential time savings for the pipelines involved.                                      |
| Avg Exclusive Time On Critical Path   | Average exclusive time of a particular job on the critical path. This measures the potential reduction of a pipeline duration if the job reduces its exclusive time. |
| Rate On Critical Path                 | Measures how often a job is on the critical path.                                                                                                                |

##### Example

In the previous image, we can observe that a CI job called `metrics` is a potential candidate for improvement, as its total exclusive time is the highest. The average exclusive time is around 21 minutes, meaning there is room for improvement of up to 21 minutes for this CI job. 

Since we know this CI job is on the critical path 43.5% of the time, we could potentially reduce the average pipeline duration by up to 21 minutes for 43.5% of the pipeline executions.

{{< img src="continuous_integration/critical_path_dashboard_outlier_job_highlighted.png" alt="Potential CI Job candidate to improve the exclusive time." width="90%">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /resources/json/civisibility-critical-path-dashboard.json
[2]: /dashboards/
[3]: /continuous_integration/pipelines/gitlab/?tab=gitlabcom
[4]: /continuous_integration/search/#highlight-critical-path