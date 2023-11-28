---
title: Search and Manage CD Pipelines 
description: Learn how to search for your CD pipelines.
further_reading:
- link: "/continuous_delivery/explorer"
  tag: "Documentation"
  text: "Search and filter pipeline executions"
---

## Overview

The [Pipelines page][1] is useful for developers who want to keep an eye on the build pipeline for their service.

{{< img src="/continuous_integration/pipelines.png" text="CI Pipelines page" style="width:100%" >}}

This page answers the following questions:

- Is the pipeline for your service succeeding, especially on the default branch?
- If not, what's the root cause?

You can access high-level accumulation and trends, including:

- An overview of the health of the whole build system, with aggregated stats for pipeline runs and branches.
- A window to quickly spotting and fixing immediate, urgent issues like broken pipelines to production.
- How each pipeline has run, over time, and with what results and trends.
- The breakdown of where time is spent in each build stage, over time, so you can focus your improvement efforts where it makes the biggest difference.

## Search for pipelines

To see your pipelines, navigate to [**CD** > **Pipelines**][1].

The [Pipelines page][1] shows aggregate stats for the default branch of each pipeline over the selected time frame, as well as the status of the latest pipeline execution. Use this page to see all your pipelines and get a quick view of their health. The Pipelines page shows metrics for the _default_ branch, usually named something like `main` or `prod`.

Metrics shown include build frequency, failure rate, average duration, and 95th percentile duration. This information reveals which pipelines are high-usage and potentially high resource consumers. The last build result, duration, and last runtime show you the effect of the last commit.

You can filter the page by pipeline name to see the pipelines you're most concerned with. Click on a pipeline that is slow or failing to dig into details that show what commit might have introduced the performance regression or build error.

## Pipeline details and executions

Click into a specific pipeline to see the _Pipeline Details_ page which provides views of the data for the pipeline you selected over a specified time frame.

{{< img src="ci/pipeline_branch_overview_updated.png" alt="Pipeline Details page for a single pipeline" style="width:100%;">}}

Get insights on the selected pipeline such as total and failed executions over time, build duration percentiles, error rates, and total time spent breakdown by stage. There are also summary tables for stages and jobs so you can quickly sort them in terms of duration, percentage of overall execution time, or failure rate.

The pipeline execution list shows all the times that pipeline (or its stages or jobs) ran during the selected time frame, for the selected branch. Use the facets on the left side to filter the list to exactly the pipelines, stages, or jobs you want to see.

### Explore connections to services, resources, and network events

Click one of the executions to open the pipeline execution view and see the flame graph or span list for the pipeline and its stages. The _Executions (n)_ list on the left side gives you quick access to the data for each retry of the pipeline for the same commit.

Click the CI provider link (`gitlab-ci gitlab.pipeline > documentation` in the following image) to investigate the Resource, Service, or Analytics page for the pipeline, stage, or job specifically. You can also find complete tags information and links to network monitoring events.

{{< img src="ci/ci-pipeline-execution.png" alt="Pipeline execution view with trace info and flamegraph display" style="width:100%;">}}

### Explore connections to logs

If job log collection is supported and enabled for the CI provider, related log events can be found in the _Logs_ tab of the pipeline execution view.

Job log collection is supported for the following providers:

- [GitHub Actions][4]
- [GitLab][5]
- [Jenkins][6]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cd/pipelines