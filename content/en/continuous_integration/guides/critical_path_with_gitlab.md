---
title: Identify GitLab Jobs on the Critical Path to improve your Pipelines
description: Learn how to identify those GitLab Jobs that are on the critical path to improve the duration of your CI Pipelines.
further_reading:
  - link: "/continuous_integration/pipelines/gitlab"
    tag: "Documentation"
    text: "Set up CI Visibility on a GitLab pipeline"
  - link: "/continuous_integration/search/#pipeline-details-and-executions"
    tag: "Documentation"
    text: "Learn how to search and manage your pipeline executions"
---

## Overview

This guide explains how to identify the CI jobs that are on the critical path, with the goal of determining which CI jobs to focus on to improve the overall duration of CI pipelines.

## Identify the CI Jobs to improve your CI Pipeline

You can use the facet `@ci.on_critical_path` to identify which CI Jobs are on the critical path in your CI Pipelines.
Using that facet, you can create your custom dashboards and notebooks for your needs.

You can also import the [CI Visibility - Critical Path][1] dashboard template:
- Open [civisibility-critical-path-gitlab-dashboard.json][1] dashboard template and copy the content in the clipboard.
- Create a [New Dashboard][8] in Datadog.
- Paste the copied content in the new dashboard.
- Save the dashboard.

{{< img src="continuous_integration/critical_path_dashboard.png" alt="Critical path dashboard for CI Visibility" width="90%">}}

### Terminology

| Column            | Description                                                                                                                                                                                   |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Total Duration    | Sum all jobs duration                                                                                                                                                                         |
| Count             | Number of times that the job has been detected on the critical path                                                                                                                           |
| Avg Duration      | Avg duration of the jobs                                                                                                                                                                      |
| Impact on Latency | Represents the impact of a particular job in a pipeline. This value is proportional to the total duration and count. The higher the number is the higher is the impact of the job in your CI. |



[1]: /resources/json/civisibility-critical-path-gitlab-dashboard.json
[2]: /dashboards/