---
title: Adding Custom Tags and Measures to Pipeline Traces
aliases:
  - /continuous_integration/pipelines/custom_tags_and_metrics
  - /continuous_integration/setup_pipelines/custom_tags_and_metrics
further_reading:
  - link: "/continuous_integration/troubleshooting/"
    tag: "Documentation"
    text: "Troubleshooting CI Visibility"
  - link: "https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/"
    tag: "Blog"
    text: "Configure pipeline alerts with Datadog CI monitors"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available for the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Use the custom tags and measures commands to add user-defined text and numerical tags to your pipeline traces in [CI Pipeline Visibility][11]. You can use the [`datadog-ci` NPM package][1] to add custom tags to a pipeline trace or a job span, in addition to adding measures to a pipeline trace or a job span. From these custom tags and measures, you can create facets (string value tags) or measures (numerical value tags). 

You can use facets and measures to filter, create visualizations, or create monitors for your pipelines in the [CI Visibility Explorer][10].

### Compatibility

Custom tags and measures work with the following CI providers:

- Buildkite
- CircleCI
- GitLab (SaaS or self-hosted >= 14.1)
- GitHub.com (SaaS): For adding tags and measures to GitHub jobs, see the [section below](#add-tags-and-measures-to-github-jobs).
- Jenkins: For Jenkins, follow [these instructions][5] to set up custom tags in your pipelines.
- Azure DevOps Pipelines

## Install the Datadog CI CLI

Install the [`datadog-ci`][1] (>=v1.15.0) CLI globally using `npm`:

```shell
npm install -g @datadog/datadog-ci
```

Alternatively, you can try and use the beta [standalone binary][2] if you don't want to use `npm`.

{{< tabs >}}
{{% tab "Linux" %}}
To install the standalone binary on Linux, run:

```shell
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_linux-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
```
{{% /tab %}}

{{% tab "MacOS" %}}
To install the standalone binary on MacOS, run:

```shell
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_darwin-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
```
{{% /tab %}}

{{% tab "Windows" %}}
To install the standalone binary on Windows, run:

```shell
Invoke-WebRequest -Uri "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_win-x64.exe" -OutFile "datadog-ci.exe"
```
{{% /tab %}}
{{< /tabs >}}

## Add tags to pipeline traces

Tags can be added to the pipeline span or to the job span. 

To do this, run the `tag` command:

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci tag [--level <pipeline|job>] [--tags <tags>]
```

You must specify a valid [Datadog API key][3] using the environment variable `DATADOG_API_KEY` and the [Datadog site][12] using the environment variable `DATADOG_SITE`.

The following example adds the tag `team` to the pipeline span.

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci tag --level pipeline --tags team:backend
```

The following example adds the tag `go.version` to the span for the current job:

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci tag --level job --tags "go.version:`go version`"
```

To create a facet from a tag, click the gear icon next to a tag name on the [Pipeline Executions page][4], and click **Create Facet**.

{{< img src="ci/custom-tags-create-facet.mp4" alt="Facet creation for custom tag" style="width:100%;" video="true">}}

## Add measures to pipeline traces

To add numerical tags to the pipeline span or the job span, run the `measure` command:

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci measure [--level <pipeline|job>] [--measures <measures>]
```

You must specify a valid [Datadog API key][3] using the environment variable `DATADOG_API_KEY` and the [Datadog site][12] using the environment variable `DATADOG_SITE`.

The following example adds the measure `error_rate` to the pipeline span:

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci measure --level pipeline --measures "error_rate:0.56"
```

The following example adds a measure `binary.size` to the span for the currently running job:

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci measure --level job --measures "binary.size:`ls -l dst/binary | awk '{print \$5}' | tr -d '\n'`"
```

To create a measure, click the gear icon next to a measures name on the [Pipeline Executions page][4] and click **Create Measure**.

## Add tags and measures to GitHub jobs

To add tags and measures to GitHub jobs, `datadog-ci CLI` version `2.29.0` or higher is required.
If the job name does not match the entry defined in the workflow configuration file (the GitHub [job ID][7]),
the `DD_GITHUB_JOB_NAME` environment variable needs to be exposed, pointing to the job name. For example:
1. If the job name is changed using the [name property][8]:
    ```yaml
    jobs:
      build:
        name: My build job name
        env:
          DD_GITHUB_JOB_NAME: My build job name
        steps:
        - run: datadog-ci tag ...
    ```
2. If the [matrix strategy][9] is used, several job names are generated by GitHub by adding the matrix values at the end of the job name, within parenthesis. The `DD_GITHUB_JOB_NAME` environment variable should then be conditional on the matrix values:

    ```yaml
    jobs:
      build:
        strategy:
          matrix:
            version: [1, 2]
            os: [linux, macos]
        env:
          DD_GITHUB_JOB_NAME: build (${{ matrix.version }}, ${{ matrix.os }})
        steps:
        - run: datadog-ci tag ...
    ```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://github.com/datadog/datadog-ci#standalone-binary-beta
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: /continuous_integration/pipelines/jenkins?tab=usingui#setting-custom-tags-for-your-pipelines
[6]: /continuous_integration/pipelines/custom_tags_and_measures/?tab=linux#add-tags-and-measures-to-github-jobs
[7]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_id
[8]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#name
[9]: https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs#using-a-matrix-strategy
[10]: /continuous_integration/pipelines/explorer
[11]: /continuous_integration/pipelines/
[12]: /getting_started/site/