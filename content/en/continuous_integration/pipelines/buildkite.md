---
title: Set up Tracing on a Buildkite Pipeline
aliases:
  - /continuous_integration/setup_pipelines/buildkite
further_reading:
    - link: "/continuous_integration/pipelines"
      tag: "Documentation"
      text: "Explore Pipeline Execution Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
    - link: "/continuous_integration/pipelines/custom_tags_and_measures/"
      tag: "Documentation"
      text: "Extend Pipeline Visibility by adding custom tags and measures"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

[Buildkite][1] is a continuous integration and deployment platform that allows you to run builds on your own infrastructure, providing you with full control over security and customizing your build environment while managing orchestration in the cloud.

Set up tracing on Buildkite to optimize your resource usage, reduce overhead, and improve the speed and quality of your software development lifecycle. 

### Compatibility

| Pipeline Visibility | Platform | Definition |
|---|---|---|
| [Partial retries][9] | Partial pipelines | View partially retried pipeline executions. |
| Infrastructure metric correlation | Infrastructure metric correlation | Correlate jobs to [infrastructure host metrics][6] for Buildkite agents. |
| [Manual steps][12] | Manual steps | View manually triggered pipelines. |
| [Queue time][13] | Queue time | View the amount of time pipeline jobs sit in the queue before processing. |
| [Custom tags][10] [and measures at runtime][11] | Custom tags and measures at runtime | Configure [custom tags and measures][6] at runtime. |

## Configure the Datadog integration

To set up the Datadog integration for [Buildkite][1]:

1. Go to **Settings > Notification Services** in Buildkite and click add a **Datadog Pipeline Visibility** integration.
2. Fill in the form with the following information:
   * **Description**: A description to help identify the integration in the future, such as Datadog CI Visibility integration.
   * **API key**: your [Datadog API Key][2].
   * **Datadog site**: {{< region-param key="dd_site" code="true" >}}
   * **Pipelines**: Select all pipelines or the subset of pipelines you want to trace.
   * **Branch filtering**: Leave empty to trace all branches or select the subset of branches you want to trace.
3. Click **Add Datadog Pipeline Visibility Notification** to save the integration.

### Set custom tags

Custom tags can be added to Buildkite traces by using the `buildkite-agent meta-data set` command.
Any metadata tags with a key starting with `dd_tags.` are added to the job and pipeline spans. These
tags can be used to create string facets to search and organize the pipelines.

The YAML below illustrates a simple pipeline where tags for the team name and the Go version have
been set.

```yaml
steps:
  - command: buildkite-agent meta-data set "dd_tags.team" "backend"
  - command: go version | buildkite-agent meta-data set "dd_tags.go.version"
    label: Go version
  - commands: go test ./...
    label: Run tests
```

The following tags are shown in the root span as well as the relevant job span in Datadog.

- `team: backend`
- `go.version: go version go1.17 darwin/amd64` (output depends on the runner)

The resulting pipeline looks as follows:

{{< img src="ci/buildkite-custom-tags.png" alt="Buildkite pipeline trace with custom tags" style="width:100%;">}}

Any metadata with a key starting with `dd-measures.` and containing a numerical value will be set as
a metric tag that can be used to create numerical measures. You can use the `buildkite-agent meta-data set`
command to create such tags. This can be used for example to measure the binary size in a pipeline:

```yaml
steps:
  - commands:
    - go build -o dst/binary .
    - ls -l dst/binary | awk '{print \$5}' | tr -d '\n' | buildkite-agent meta-data set "dd_measures.binary_size"
    label: Go build
```

The resulting pipeline will have the tags shown below in the pipeline span:

- `binary_size: 502` (output depends on the file size)

In this example, you can use the value of `binary_size` to plot the change in the binary size over time.

## Visualize pipeline data in Datadog

The [**CI Pipeline List**][3] and [**Executions**][4] pages populate with data after the pipelines finish.

The **CI Pipeline List** page shows data for only the default branch of each repository.

### Correlate infrastructure metrics to jobs

If you are using Buildkite agents, you can correlate jobs with the infrastructure that is running them.
For this feature to work, install the [Datadog Agent][7] in the hosts running the Buildkite agents.

### View partial and downstream pipelines

On the **Executions** page, you can use the filters below in the search bar:

`Downstream Pipeline`
: Possible values: `true`, `false`

`Manually Triggered`
: Possible values: `true`, `false`

`Partial Pipeline`
: Possible values: `retry`, `paused`, `resumed`

{{< img src="ci/partial_retries_search_tags.png" alt="The Pipeline executions page with Partial Pipeline:retry entered in the search query" style="width:100%;">}}

These filters can also be applied through the facet panel on the left hand side of the page.
{{< img src="ci/partial_retries_facet_panel.png" alt="The facet panel with Partial Pipeline facet expanded and the value Retry selected, the Partial Retry facet expanded and the value true selected" style="width:40%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://buildkite.com
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: /continuous_integration/pipelines/buildkite/#view-partial-and-downstream-pipelines
[6]: /continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[7]: /agent/
[8]: /continuous_integration/pipelines/buildkite/#correlate-infrastructure-metrics-to-jobs
[9]: /glossary/#partial-retry
[10]: /glossary/#custom-tag
[11]: /glossary/#custom-measure
[12]: /glossary/#manual-step
[13]: /glossary/#queue-time