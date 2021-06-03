---
title: Pipeline Performance
kind: documentation
further_reading:
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

Your pipelines appear in the [Pipelines][1] section under the CI menu.

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
