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

### Compatibility

<div class="alert alert-info">Are you interested in critical path and your CI provider is not supported yet? Fill out this form.</div>

Filtering CI Jobs on the Critical Path is available for the following CI Providers:
* [GitLab][3]

Note that this applies only to filtering CI Jobs on the critical path. You can still [highlight which CI Jobs are on the critical path][4] using the Pipeline Execution detail view across all CI providers.

## Identify the CI Jobs to improve your CI Pipeline

### Using the facet

You can use the facet `@ci.on_critical_path` to identify which CI Jobs are on the critical path in your CI Pipelines.
Using that facet, you can create your custom dashboards and notebooks for your needs.

{{< img src="continuous_integration/critical_path_facet.png" alt="Filter using critical path facet" width="90%">}}

Notice that the facet is only available using the `ci_level:job` in your queries, as it's a tag added only to the CI Job level.

### Using the dashboard template

You can also import the [CI Visibility - Critical Path][1] dashboard template:
- Open [civisibility-critical-path-gitlab-dashboard.json][1] dashboard template and copy the content in the clipboard.
- Create a [New Dashboard][2] in Datadog.
- Paste the copied content in the new dashboard.
- Save the dashboard.

{{< img src="continuous_integration/critical_path_dashboard.png" alt="Critical path dashboard for CI Visibility" width="90%">}}

#### Terminology

| Column            | Description                                                                                                                                                                                               |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Total Duration    | Sum all jobs duration                                                                                                                                                                                     |
| Count             | Number of times that the job has been detected on the critical path                                                                                                                                       |
| Avg Duration      | Avg duration of the jobs                                                                                                                                                                                  |
| Impact on Latency | Represents the impact of a particular job across all your pipelines. This value is proportional to the total duration and count. The higher the number is the higher is the impact of the job in your CI. |

#### Using Impact on Latency value

You can identify the CI Jobs with the highest impact on your CI by sorting by `Impact on Latency`.

This metric helps you to determine quickly which CI Jobs require attention to <u>achieve the best effort-to-benefit ratio</u> for overall CI improvement, as it accounts, not only for the CI Job duration, but also for the frequency with which a particular CI Job is executed.

**Example**

In the previous image, we can observe that the first two rows correspond to different types of CI Jobs:

- The `tests` CI Job, executed in the `shopist/cart-service` repository, has an average duration of 5 minutes and runs approximately 2,500 times. This is undoubtedly the CI Job with the highest impact on this repository. Improving it would yield the most significant improvement in our CI performance.
- The `build` CI Job, also executed in the `shopist/cart-service` repository, has an average duration of less than 2 minutes but is executed almost twice as often as the `tests` CI Job. As a result, its `Impact on Latency` ranks second, despite its significantly shorter duration.

{{< img src="continuous_integration/critical_path_dashboard_focus_impact.png" alt="Focus on the CI Jobs with the highest impact" width="90%">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /resources/json/civisibility-critical-path-gitlab-dashboard.json
[2]: /dashboards/
[3]: /continuous_integration/pipelines/gitlab/?tab=gitlabcom
[4]: /continuous_integration/search/#highlight-critical-path