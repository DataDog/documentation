---
title: Search and Manage CI Pipelines
description: Learn how to search for your CI pipelines.
aliases:
- /continuous_integration/explorer/search/
further_reading:
- link: "/continuous_integration/explorer"
  tag: "Documentation"
  text: "Search and filter pipeline executions"
- link: "/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/"
  tag: "Documentation"
  text: "Identify CI Jobs on the Critical Path to reduce the Pipeline Duration"
- link: "/continuous_integration/guides/use_ci_jobs_failure_analysis/"
  tag: "Documentation"
  text: "Use CI jobs failure analysis to identify root causes in failed jobs"
---

## Overview

The [Pipelines page][1] is useful for developers who want to keep an eye on the build pipeline for their service.

{{< img src="/continuous_integration/pipelines.png" text="CI Pipelines page" style="width:100%" >}}

This page answers the following questions:

- Is the pipeline for your service performant and reliable, especially on the default branch?
- If not, what's the root cause?

You can access high-level accumulation and trends, including:

- An overview of the health of the whole build system, with aggregated stats for pipeline runs and branches.
- A window to quickly spotting and fixing immediate, urgent issues like broken pipelines to production.
- How each pipeline has run, over time, and with what results and trends.
- The breakdown of where time is spent in each build stage, over time, so you can focus your improvement efforts where it makes the biggest difference.

## Search for pipelines

To see your pipelines, navigate to [**Software Delivery** > **CI Visibility** > **CI Pipeline List**][1].

The [Pipelines page][1] shows aggregate stats for the default branch of each pipeline over the selected time frame, as well as the status of the latest pipeline execution. Use this page to see all your pipelines and get a quick view of their health. Only pipelines with Git information associated to the default branch (usually named `main` or `prod`), as well as pipelines without any Git information, are displayed on this page.

The metrics shown include build frequency, failure rate, median duration, and change in median duration on both an absolute and relative basis. This information reveals which pipelines are high-usage and potentially high-resource consumers, or are experiencing regressions. The last build result, duration, and last runtime shows you the effect of the last commit.

You can filter the page by pipeline name to see the pipelines you're most concerned with. Click on a pipeline that is slow or failing to dig into details that show what commit might have introduced the performance regression or build error. If you are using [Datadog Teams][6], you can filter for specific pipelines associated to your team using [custom tags][7] that match team handles.

## Pipeline details and executions

Click into a specific pipeline to see the _Pipeline Details_ page which provides views of the data for the pipeline you selected over a specified time frame.

{{< img src="ci/pipeline_branch_overview_updated.png" alt="Pipeline Details page for a single pipeline" style="width:100%;">}}

Get insights on the selected pipeline such as total and failed executions over time, build duration percentiles, error rates, and total time spent breakdown by stage. There are also summary tables for stages and jobs so you can quickly sort them in terms of duration, percentage of overall execution time, or failure rate.

The pipeline execution list shows all the times that pipeline (or its stages or jobs) ran during the selected time frame, for the selected branch. Use the facets on the left side to filter the list to exactly the pipelines, stages, or jobs you want to see.

### Highlight critical path

To highlight the critical path on the trace, click on the `Critical path` checkbox on the pipeline execution page.

The critical path highlights the spans that you need to speed up if you want to reduce the overall execution time of your pipeline. If a CI job is on the critical path, it means it is part of the longest path through the trace in terms of execution time. Speeding up the CI Jobs on the critical path is strictly necessary to speed up the CI pipeline.

You can use [this guide][11] to identify the CI jobs on the critical path to help you determine which jobs to prioritize in order to reduce the overall duration of the CI pipelines.

### Explore connections to services, resources, and network events

Click one of the executions to open the pipeline execution view and see the flame graph or span list for the pipeline and its stages. The _Executions (n)_ list on the left side gives you quick access to the data for each retry of the pipeline for the same commit.

Click the CI provider link (`gitlab-ci gitlab.pipeline > documentation` in the following image) to investigate the Resource, Service, or Analytics page for the pipeline, stage, or job specifically. You can also find complete tags information and links to network monitoring events.

{{< img src="ci/ci-pipeline-execution.png" alt="Pipeline execution view with trace info and flamegraph display" style="width:100%;">}}

### Explore connections to logs

If job log collection is supported and enabled for the CI provider, related log events can be found in the _Logs_ tab of the pipeline execution view.

Job log collection is supported for the following providers:

- [AWS CodePipeline][8]
- [Azure][9]
- [CircleCI][10]
- [GitHub Actions][3]
- [GitLab][4]
- [Jenkins][5]

### CI jobs failure analysis based on relevant logs

CI Visibility uses an LLM model to generate enhanced error messages and categorize them with a domain and subdomain, based on the relevant logs collected from every failed CI job.

Use [CI jobs failure analysis][12] to identify the most common root causes of failure for your CI jobs.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pipelines
[3]: /continuous_integration/pipelines/github/#enable-log-collection
[4]: /continuous_integration/pipelines/gitlab/#enable-job-log-collection
[5]: /continuous_integration/pipelines/jenkins#enable-job-log-collection
[6]: /account_management/teams/
[7]: /continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: /continuous_integration/pipelines/awscodepipeline/#collect-job-logs
[9]: /continuous_integration/pipelines/azure/#collect-job-logs
[10]: /continuous_integration/pipelines/circleci/#enable-log-collection
[11]: /continuous_integration/guides/identify_highest_impact_jobs_with_critical_path
[12]: /continuous_integration/guides/use_ci_jobs_failure_analysis/
