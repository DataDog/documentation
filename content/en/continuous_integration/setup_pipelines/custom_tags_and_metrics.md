---
title: Adding Custom Tags and Metrics to Pipeline Traces
kind: documentation
further_reading:
  - link: "/continuous_integration/setup_pipelines/troubleshooting/"
    tag: "Documentation"
    text: "Troubleshooting CI"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available for the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

The custom tags and metrics commands provide a way to add user defined text and numerical tags to the CI Visibility
pipeline traces.
These tags can be used to create facets (string value tags) or measures (numerical value tags). Facets and measures
can, in turn, be used to search, graph, or monitor the pipelines.

## Compatibility

Custom tags and metrics work with the following CI providers:

- Buildkite
- CircleCI
- GitLab (SaaS or self-hoster >= 14.1)
- GitHub.com (SaaS). **Note:** For GitHub tags and metrics can only be added to the pipeline span

## Installing the Datadog CI CLI

Install the [`datadog-ci`][1] (>=v1.15.0) CLI globally using `npm`:

{{< code-block lang="bash" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

## Adding tags to pipeline traces

Tags can be added to the pipeline span or to the job span. To do this run:

{{< code-block lang="bash" >}}
datadog-ci tag [--level <pipeline|job>] [--tags <tags>]
{{< /code-block >}}

A valid [Datadog API key][2] has to be specified using the eniroment variable `DATADOG_API_KEY`.

{{< site-region region="us5,us3,eu" >}}
The [Datadog site][3] has to be specidied using the enviromental variable `DATADOG_SITE`.

{{< /site-region >}}

The example below adds the tag `team` to the pipeline span.

{{< code-block lang="bash" >}}
datadog-ci tag --level pipeline --tags team:backend
{{< /code-block >}}

The example below adds the tag `go.version` to the span for the current job.

{{< code-block lang="bash" >}}
datadog-ci tag --level job --tags "go.version:`go version`"
{{< /code-block >}}

You can then create facets from the tags by click on the gear next to the tag name in the [pipeline executions page][4]
and then clicking on the `create facet` option.

{{< img src="ci/custom-tags-create-facet.mp4" alt="Facet creation for custom tag" style="width:100%;" video="true">}}

## Adding metrics to pipeline traces

Numerical tags can be added to the pipeline span or the job span. To do this run:

{{< code-block lang="bash" >}}
datadog-ci metric [--level <pipeline|job>] [--metrics <metrics>]
{{< /code-block >}}

A valid [Datadog API key][2] has to be specified using the eniroment variable `DATADOG_API_KEY`.
{{< site-region region="us5,us3,eu" >}}
The [Datadog site][3] has to be specidied using the enviromental variable `DATADOG_SITE`.

{{< /site-region >}}

The example below adds the metric `error_rate` to the pipeline span.

{{< code-block lang="bash" >}}
datadog-ci metric --level pipeline --metrics "error_rate:0.56"
{{< /code-block >}}

The example below adds a metric `binary.size` to the span for the currently running job.

{{< code-block lang="bash" >}}
datadog-ci metric --level job --metric "binary.size:`ls -l dst/binary | awk '{print \$5}' | tr -d '\n'`"
{{< /code-block >}}

You can create a measure by clicking on the gear next to the metrics name in the [pipeline executions page][4]
and then clicking on the `create measure` option.

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /getting_started/site/
[4]: https://app.datadoghq.com/ci/pipeline-executions
