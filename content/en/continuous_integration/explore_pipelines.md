---
title: Exploring Pipelines
kind: documentation
further_reading:
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

Your pipelines appear in the [Pipelines][1] page under the CI menu. The Pipelines page shows aggregate stats for the default branch of each pipeline, as well as the status of the latest pipeline execution. Use this page to see all your pipelines and get a quick view of their health

Build frequency, failure rate, average duration, and 95th percentile duration reveal which pipelines are high-usage and potentially high resource consumers. Last build result, duration, and last run time show you the the effect of the last commit---did you break your build?

You can filter the page by pipeline name to see the pipelines you're most concerned with.

The Pipelines page shows metrics for the _default_ branch, usually named something like `main` or `prod`. Click into a specific pipeline to see the _Pipeline Details_ page which provides more views of the data for the pipeline you selected, and lets you switch to information for other branches. 

{{< img src="ci/ci-single-pipeline.png" alt="Details for a single pipeline"  style="width:100%;">}}

On the Pipeline Details page, get insights on the selected pipeline such as total and failed executions over time, build duration percentiles, and total time spent breakdown by stage. There are also summary tables for both stages and jobs so you can quickly rank them in terms of duration, percentage of overall execution time, or failure rate. And from those tables, you can click into a Pipeline Execution view to see the flame graph or span list for the pipeline and its stages, for each time it was executed.

{{< img src="ci/ci-pipeline-execution.png" alt="Trace info for pipeline execution"  style="width:100%;">}}

On the [Pipeline Executions][2] page, you can see aggregated data about pipeline executions. Each pipeline execution is reported as a trace, which includes stage and job information. You can list, filter, and access individual pipeline execution traces by clicking on an execution (similar to clicking into a Pipeline execution from the Pipeline Details page). 

Alternatively, click the [Analytics][3] button to interactively slice and dice pipelines execution data into visualizations you can use to answer questions and to share on dashboards.

{{< img src="ci/ci-pipelines-execution.png" alt="Analytics for a pipeline execution"  style="width:100%;">}}

CI pipeline data is available in [Dashboards][4] and [Notebooks][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pipelines
[2]: https://app.datadoghq.com/ci/pipeline-executions
[3]: https://app.datadoghq.com/ci/pipeline-executions?viz=timeseries
[4]: https://app.datadoghq.com/dashboard/lists
[5]: https://app.datadoghq.com/notebook/list
