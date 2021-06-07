---
title: Exploring Pipelines
kind: documentation
further_reading:
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

Your pipelines appear in the [Pipelines][1] page under the CI menu.

See all your pipelines and get a quick view of their health:
- Build frequency, failure rate, average duration, and 95th percentile duration reveal which pipelines are high-usage and potentially high resource consumers.
- Last build result, duration, and last run time show you the the effect of the last commit---did you break your build?

You can filter the page by pipeline name to see the pipelines you're more concerned with.

This page shows metrics for the _default_ branch, usually named something like `main` or `prod`. Click into a specific pipeline to see more details or to view metrics for another branch. 

The Pipeline Details page breaks down the data for the pipeline you selected. 

Each pipeline execution is reported as a trace, which includes stage and job information. You can list, filter, and get individual pipeline execution traces on the [Pipeline Executions][2] page. Interactively plot graphs and top lists using the [Analytics][3] section.

The [Pipelines][1] page shows aggregate stats for the default branch of each pipeline, as well as the status of the latest pipeline execution. Selecting a pipeline takes you to a page with insights such as total and failed executions over time, build duration percentiles, and total time spent breakdown by stage. There are also summary tables for both stages and jobs to quickly rank them in terms of duration, percentage of overall execution time, or failure rate.

{{< img src="ci/ci-single-pipeline.png" alt="Details for a single pipeline"  style="width:100%;">}}

CI pipeline data is available in [Dashboards][4] and [Notebooks][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pipelines
[2]: https://app.datadoghq.com/ci/pipeline-executions
[3]: https://app.datadoghq.com/ci/pipeline-executions?viz=timeseries
[4]: https://app.datadoghq.com/dashboard/lists
[5]: https://app.datadoghq.com/notebook/list
