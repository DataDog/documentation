---
title: Adding Custom Commands to Pipeline Traces
aliases:
  - /continuous_integration/setup_pipelines/custom_commands
further_reading:
  - link: "/continuous_integration/pipelines/custom_commands/"
    tag: "Documentation"
    text: "Troubleshooting CI Visibility"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available for the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Custom commands provide a way to trace individual commands in your CI pipelines, allowing you to measure the time your command takes without taking into account any setup or teardown actions that the job might have (for example, downloading Docker images or waiting for an available node in a Kubernetes-based infrastructure). These spans appear as part of the pipeline's trace:

{{< img src="ci/ci-custom-spans.png" alt="Details for a single pipeline with custom commands" style="width:100%;">}}

## Compatibility

Custom commands work with the following CI providers:

- Jenkins with the Datadog plugin >= v3.2.0
- CircleCI

## Install the Datadog CI CLI

Install the [`datadog-ci`][1] (>=v0.17.0) CLI globally using `npm`:

{{< code-block lang="shell" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

## Trace a command

To trace a command, run:

{{< code-block lang="shell" >}}
datadog-ci trace [--name <name>] -- <command>
{{< /code-block >}}

Specify a valid [Datadog API key][2] in the `DATADOG_API_KEY` environment variable. For example:

{{< site-region region="us,us3,eu,ap1" >}}
<pre>
<code>
DATADOG_API_KEY=&lt;key&gt; DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci trace \
--name "Greet" \
-- \
echo "Hello World"
</code>
</pre>
{{< /site-region >}}
{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Configuration settings

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

Positional arguments
: The command that is launched and traced.

The following environment variables are supported:

`DATADOG_API_KEY` (Required)
: [Datadog API key][2] used to authenticate the requests.<br/>
**Default**: (none)

{{< site-region region="us3,us5,eu,ap1" >}}
Additionally, configure the Datadog site to use the selected one ({{< region-param key="dd_site_name" >}}):

`DATADOG_SITE`
: The Datadog site to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}
{{< /site-region >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
