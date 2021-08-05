---
title: Exploring Pipelines
kind: documentation
further_reading:
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

Your pipelines appear in the [Pipelines][1] page under the CI menu. 

## Pipelines health overview

The Pipelines page shows aggregate stats for the default branch of each pipeline over the selected time frame, as well as the status of the latest pipeline execution. Use this page to see all your pipelines and get a quick view of their health. The Pipelines page shows metrics for the _default_ branch, usually named something like `main` or `prod`. 

Metrics shown include build frequency, failure rate, average duration, and 95th percentile duration. This information reveals which pipelines are high-usage and potentially high resource consumers. The last build result, duration, and last run time show you the the effect of the last commit.

You can filter the page by pipeline name to see the pipelines you're most concerned with. Click on a pipeline that is slow or failing to dig into details that show what commit might have introduced the performance regression or build error.

## Pipeline details and branches

Click into a specific pipeline to see the _Pipeline Details_ page which provides views of the data for the pipeline you selected over a specified time frame, and can display branches other than the default. 

{{< img src="ci/ci-single-pipeline.png" alt="Details for a single pipeline" style="width:100%;">}}

Get insights on the selected pipeline such as total and failed executions over time, build duration percentiles, and total time spent breakdown by stage. There are also summary tables for stages and jobs so you can quickly sort them in terms of duration, percentage of overall execution time, or failure rate. 

The pipeline execution list at the bottom shows all the times that pipeline (or its stages or jobs) ran during the selected time frame, for the selected branch. Use the facets on the left side to filter the list to exactly the pipelines, stages, or jobs you want to see. 

### Explore connections to services, resources, logs, and network events

Click one of the executions to open the pipeline execution view and see the flame graph or span list for the pipeline and its stages. The _Executions (n)_ list on the left side gives you quick access to the data for each retry of the pipeline for the same commit. 

Click the CI provider link (`gitlab-ci gitlab.pipeline > documentation` in the following image) to drill down to the Resource, Service, or Analytics page for the pipeline, stage, or job. You can also find complete tags information and links to related log events and network monitoring events.

{{< img src="ci/ci-pipeline-execution.png" alt="Trace info for pipeline execution" style="width:100%;">}}

## Pipeline executions details and traces

On the [Pipeline Executions][2] page, you can see aggregated data about pipeline executions over the selected time frame. Use the search field and facets to scope the list down to the executions you want to investigate. Change the list to show pipelines, stages, or jobs using the buttons at the top. 

Each pipeline execution is reported as a trace, which includes stage and job information. Access individual pipeline, stage, and job execution traces by clicking on an execution in the list (similar to clicking into a pipeline execution from the Pipeline Details page). 

Alternatively, click the [Analytics][3] button to interactively slice and dice pipelines execution data into visualizations you can use to answer questions and to share on dashboards.

{{< img src="ci/ci-pipelines-execution.png" alt="Analytics for a pipeline execution" style="width:100%;">}}

## Communicate about CI pipelines data

CI pipeline data is available when you create widgets in [Dashboards][4] and [Notebooks][5]. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pipelines
[2]: https://app.datadoghq.com/ci/pipeline-executions
[3]: https://app.datadoghq.com/ci/pipeline-executions?viz=timeseries
[4]: https://app.datadoghq.com/dashboard/lists
[5]: https://app.datadoghq.com/notebook/list
