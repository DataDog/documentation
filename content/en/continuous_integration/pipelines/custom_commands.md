---
title: Adding Custom Commands to Pipeline Traces
aliases:
  - /continuous_integration/setup_pipelines/custom_commands
further_reading:
  - link: "/continuous_integration/pipelines/custom_commands/"
    tag: "Documentation"
    text: "Troubleshooting CI Visibility"
---

Custom commands provide a way to trace individual commands in your CI pipelines, allowing you to measure the time your command takes without taking into account any setup or teardown actions that the job might have (for example, downloading Docker images or waiting for an available node in a Kubernetes-based infrastructure). These spans appear as part of the pipeline's trace:

{{< img src="ci/ci-custom-spans.png" alt="Details for a single pipeline with custom commands" style="width:100%;">}}

## Compatibility

Custom commands work with the following CI providers:

- GitHub.com (SaaS) with datadog-ci CLI >= 2.40. For sending custom commands in GitHub Actions, see [Known issue with Github Actions](#known-issue-with-github-actions).
- GitLab (SaaS or self-hosted >= 14.1) with datadog-ci CLI >= 2.40.
- Jenkins with the Datadog plugin >= v3.2.0
- CircleCI
- Azure DevOps Pipelines with datadog-ci CLI >= 2.40.
- AWS Codepipeline with datadog-ci CLI >= 2.40. Follow [Adding custom commands][6] to set up custom commands in AWS Codepipeline.
- Buildkite with datadog-ci CLI >= 2.40.

## Install the Datadog CI CLI

Install the [`datadog-ci`][1] (>=v0.17.0) CLI globally using `npm`:

{{< code-block lang="shell" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

## Trace a command line

To trace a command line, run:

{{< code-block lang="shell" >}}
datadog-ci trace [--name <name>] -- <command>
{{< /code-block >}}

Specify a valid [Datadog API key][2] in the `DATADOG_API_KEY` environment variable. For example:

{{< site-region region="us,us3,eu,ap1,ap2" >}}
<pre>
<code>
DATADOG_API_KEY=&lt;key&gt; DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci trace \
--name "Greet" \
-- \
echo "Hello World"
</code>
</pre>
{{< /site-region >}}
{{< site-region region="gov" >}}
<div class="alert alert-danger">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

### Configuration settings

These options are available for the `datadog-ci trace` command:

`--name`
: Display name of the custom command.<br/>
**Default**: same value as `<command>`<br/>
**Example**: `Wait for DB to be reachable`

`--tags`
: Key-value pairs in the form `key:value` to be attached to the custom command (the `--tags` parameter can be specified multiple times). When specifying tags using `DD_TAGS`, separate them using commas (for example, `team:backend,priority:high`).<br/>
**Environment variable**: `DD_TAGS`<br/>
**Default**: (none)<br/>
**Example**: `team:backend`<br/>
**Note**: Tags specified using `--tags` and with the `DD_TAGS` environment variable are merged. If the same key appears in both `--tags` and `DD_TAGS`, the value in the environment variable `DD_TAGS` takes precedence.

`--measures`
: Key-value pairs in the form `key:value` to be attached to the custom command as numerical values (the `--measures` parameter can be specified multiple times).<br/>
_(Requires datadog-ci >=v2.35.0)_ <br/>
**Default**: (none)<br/>
**Example**: `size:1024`<br/>

`--no-fail`
: Prevents datadog-ci from failing even if run in an unsupported CI provider. In this case, the command is run and nothing is reported to Datadog.<br/>
**Default**: `false`

`--dry-run`
: Prevents datadog-ci from sending the custom span to Datadog. All other checks are performed.<br/>
**Default**: `false`

Positional arguments
: The command that is launched and traced.

The following environment variables are supported:

`DATADOG_API_KEY` (Required)
: [Datadog API key][2] used to authenticate the requests.<br/>
**Default**: (none)

{{< site-region region="us3,us5,eu,ap1,ap2" >}}
Additionally, configure the Datadog site to use the selected one ({{< region-param key="dd_site_name" >}}):

`DATADOG_SITE`
: The Datadog site to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}
{{< /site-region >}}

## Trace a command block

It is possible to trace multiple command lines at once by manually specifying the start and end timestamps (or the duration).

{{< code-block lang="shell" >}}
datadog-ci trace span [--name <name>] [--start-time <timestamp-ms>] [--end-time <timestamp-ms>] # [--duration <duration-ms>] can be used instead of start / end time
{{< /code-block >}}

Specify a valid [Datadog API key][2] in the `DATADOG_API_KEY` environment variable. For example:

{{< site-region region="us,us3,eu,ap1,ap2" >}}
<pre>
<code>
DATADOG_API_KEY=&lt;key&gt; DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci trace span \
--name "Build Step" \
--duration 10000
</code>
</pre>
{{< /site-region >}}
{{< site-region region="gov" >}}
<div class="alert alert-danger">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

### Configuration settings

These options are available for the `datadog-ci trace span` command:

`--name`
: Display name of the custom span.<br/>
**Example**: `Build Step`

`--start-time`
: Timestamp in milliseconds since the UNIX epoch representing the start time of the span.<br/>
**Note**: There are two ways to specify start and end time, by using `--start-time` and `--end-time` or using `--duration`.

`--end-time`
: Timestamp in milliseconds since the UNIX epoch representing the end time of the span.<br/>
**Note**: There are two ways to specify start and end time, by using `--start-time` and `--end-time` or using `--duration`.

`--duration`
: Duration amount in milliseconds. Using this, the end time is the current time when executing this command.<br/>
**Note**: There are two ways to specify start and end time, by using `--start-time` and `--end-time` or using `--duration`.

`--tags`
: Key-value pairs in the form `key:value` to be attached to the custom span (the `--tags` parameter can be specified multiple times). When specifying tags using `DD_TAGS`, separate them using commas (for example, `team:backend,priority:high`).<br/>
**Environment variable**: `DD_TAGS`<br/>
**Default**: (none)<br/>
**Example**: `team:backend`<br/>
**Note**: Tags specified using `--tags` and with the `DD_TAGS` environment variable are merged. If the same key appears in both `--tags` and `DD_TAGS`, the value in the environment variable `DD_TAGS` takes precedence.

`--measures`
: Key-value pairs in the form `key:value` to be attached to the custom span as numerical values (the `--measures` parameter can be specified multiple times).<br/>
_(Requires datadog-ci >=v2.35.0)_ <br/>
**Default**: (none)<br/>
**Example**: `size:1024`<br/>

`--dry-run`
: Prevents datadog-ci from sending the custom span to Datadog. All other checks are performed.<br/>
**Default**: `false`

The following environment variables are supported:

`DATADOG_API_KEY` (Required)
: [Datadog API key][2] used to authenticate the requests.<br/>
**Default**: (none)

{{< site-region region="us3,us5,eu,ap1,ap2" >}}
Additionally, configure the Datadog site to use the selected one ({{< region-param key="dd_site_name" >}}):

`DATADOG_SITE`
: The Datadog site to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}
{{< /site-region >}}

## Known issue with GitHub Actions


Starting with `datadog-ci` version `4.1.1`, no additional action is required, even when using custom names or matrix strategies.

<details>
<summary><strong>For datadog-ci versions prior to 4.1.1</strong></summary>

If you are using `datadog-ci` version `2.29.0` to `4.1.0` and the job name does not match the entry defined in the workflow configuration file (the GitHub [job ID][3]), the `DD_GITHUB_JOB_NAME` environment variable needs to be exposed, pointing to the job name. For example:

1. If the job name is changed using the [name property][4]:
    ```yaml
    jobs:
      build:
        name: My build job name
        env:
          DD_GITHUB_JOB_NAME: My build job name
        steps:
        - run: datadog-ci trace ...
    ```
2. If the [matrix strategy][5] is used, several job names are generated by GitHub by adding the matrix values at the end of the job name, within parenthesis. The `DD_GITHUB_JOB_NAME` environment variable should then be conditional on the matrix values:

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
        - run: datadog-ci trace ...
    ```
</details>

## Troubleshooting

### Payload too large
The size limit is approximately `4MB`. The most common cause for this error is extremely large tags.
Use the `--dry-run` option to see the traced command's contents before sending it to Datadog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_id
[4]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#name
[5]: https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs#using-a-matrix-strategy
[6]: /continuous_integration/pipelines/awscodepipeline/#add-the-pipeline-execution-id-as-an-environment-variable
