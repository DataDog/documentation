---
title: Adding Custom Spans to Pipeline Traces
kind: documentation
further_reading:
    - link: "/continuous_integration/setup_pipelines/custom_spans/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

{{< site-region region="us,eu" >}}
Custom spans provide a way to trace individual commands in your CI pipelines, allowing you to measure the time your command takes without taking into account any setup or teardown actions that the job might have (for example, downloading Docker images or waiting for an available node in a Kubernetes-based infrastructure). These spans appear as part of the pipeline's trace:

{{< img src="ci/ci-custom-spans.png" alt="Details for a single pipeline with custom spans" style="width:100%;">}}

## Compatibility

Custom spans work with the following CI providers:

- Jenkins with Datadog plugin >= v3.2.0
- CircleCI

## Installing the Datadog CI CLI

Install the [`datadog-ci`][1] (>=v0.17.0) CLI globally using `npm`:

{{< code-block lang="bash" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

## Tracing a command

To trace a command, run:

{{< code-block lang="bash" >}}
datadog-ci trace [--name <name>] -- <command>
{{< /code-block >}}

Specify a valid [Datadog API key][2] in the `DATADOG_API_KEY` environment variable. For example:

{{< site-region region="us" >}}
{{< code-block lang="bash" >}}
DATADOG_API_KEY=<api_key> datadog-ci trace \
  --name "Greet" \
  -- \
  echo "Hello World"
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="eu" >}}
{{< code-block lang="bash" >}}
DATADOG_API_KEY=<api_key> DATADOG_SITE=datadoghq.eu datadog-ci trace \
  --name "Greet" \
  -- \
  echo "Hello World"
{{< /code-block >}}
{{< /site-region >}}

## Configuration settings

These options are available for the `datadog-ci trace` command:

`--name`
: Display name of the custom span.<br/>
**Default**: same value as `<command>`<br/>
**Example**: `Wait for DB to be reachable`

`--tags`
: Key-value pairs in the form `key:value` to be attached to the custom span (the `--tags` parameter can be specified multiple times). When specifying tags using `DD_TAGS`, separate them using commas (for example, `team:backend,priority:high`).<br/>
**Environment variable**: `DD_TAGS`<br/>
**Default**: (none)<br/>
**Example**: `team:backend`<br/>
**Note**: Tags specified using `--tags` and with the `DD_TAGS` environment variable are merged. If the same key appears in both `--tags` and `DD_TAGS`, the value in the environment variable `DD_TAGS` takes precedence.

`--no-fail`
: Prevents datadog-ci from failing even if run in an unsupported CI provider. In this case, the command is run and nothing is reported to Datadog.<br/>
**Default**: `false`

Positional arguments
: The command that is launched and traced.

The following environment variables are supported:

`DATADOG_API_KEY` (Required)
: [Datadog API key][2] used to authenticate the requests.<br/>
**Default**: (none)


{{< site-region region="eu" >}}
Additionally, configure the Datadog site to use the selected one ({{< region-param key="dd_site_name" >}}):

`DATADOG_SITE` (Required)
: The [Datadog site][1] to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}

[1]: /getting_started/site/
{{< /site-region >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://app.datadoghq.com/account/settings#api
{{< /site-region >}}
{{< site-region region="us3,gov" >}}
The selected Datadog site ({{< region-param key="dd_site_name" >}}) does not support this feature.
{{< /site-region >}}
