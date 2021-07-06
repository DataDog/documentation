---
title: Uploading JUnit test report files to Datadog
kind: documentation
further_reading:
    - link: "/continuous_integration/explore_tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

JUnit test report files are XML files that contain test execution information, such as test and suite names, pass/fail status, duration, and sometimes error logs. Although it was introduced by the [JUnit][4] testing framework, lots of other popular frameworks are able to output results using this format.

As an alternative to instrumenting your tests natively using Datadog tracers, which is the recommended option as it provides the most comprehensive test results, you can also upload JUnit XML test reports.

Test results imported via JUnit XML reports will appear alongside tests reported via tracers. However, there are some limitations when using this method, such as the lack of distributed traces on integration tests or structured stacktraces. For this reason, only use this method if there is no native support for the language or testing framework being used.

## Installing the Datadog CI CLI

Install the [`datadog-ci`][2] CLI globally using `npm`:

{{< code-block lang="bash" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

## Uploading test reports

To upload your JUnit XML test reports to Datadog, run the following command, specifying the name of the service or library that was tested using the `--service` parameter, and one or more file paths to either the XML report files directly or directories containing them:

{{< code-block lang="bash" >}}
datadog-ci junit upload --service <service_name> <path> [<path> ...]
{{< /code-block >}}

You will need to specify a valid [Datadog API key][3] in the `DATADOG_API_KEY` environment variable, and the environment where tests were run (e.g. `local` when uploading results from a developer workstation, or `ci` when uploading them from a CI provider) in the `DD_ENV` environment variable. For example:

{{< code-block lang="bash" >}}
DD_ENV=ci DATADOG_API_KEY=<api_key> datadog-ci junit upload \
  --service my-api-service \
  unit-tests/junit-reports e2e-tests/single-report.xml
{{< /code-block >}}

## Additional configuration settings

This is the full list of options available when using the `datadog-ci junit upload` command:

`--service` (Required)
: Name of the service or library under test.<br/>
**Environment variable**: `DD_SERVICE`<br/>
**Example**: `my-api-service`

`--tags`
: Key-value pairs in the form `key:value` to be attached to all tests (the `--tags` parameter can be specified multiple times). When specifying tags using `DD_TAGS`, separate them using commas (e.g. `team:backend,priority:high`).
**Environment variable**: `DD_TAGS`<br/>
**Default**: (none)<br/>
**Example**: `team:backend`<br/>
**Note**: Tags specified using `--tags` and via the `DD_TAGS` environment variable are merged. If the same key appears in both `--tags` and `DD_TAGS`, the value in the environment variable `DD_TAGS` takes precedence.

`--max-concurrency`
: The number of concurrent uploads to the API.<br/>
**Default**: `20`

`--dry-run`
: Runs the command without the final upload step. All other checks are performed.<br/>
**Default**: `false`

Positional arguments
: The file paths or directories in which the JUnit XML reports are located. If you pass a directory, the CLI will look for all `.xml` files in it.

Additionally, the following environment variables are supported:

`DATADOG_API_KEY` (Required)
: [Datadog API key][3] used to authenticate the requests.<br/>
**Default**: (none)

`DD_ENV`
: The environment you want your test results to appear in.<br/>
**Default**: (none)<br/>
**Examples**: `local`, `ci`

<!-- TODO: uncomment this once we support any datacenter other than us1
`DATADOG_SITE`
: The Datadog site to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Possible values**: `datadoghq.com`, `datadoghq.eu` or `us3.datadoghq.com`
-->

## Collecting repository and commit metadata

The Datadog CI CLI will try to extract git repository and commit metadata from CI provider environment variables and from the local `.git` directory and attach it to test executions. In order to read this directory, the [`git`][1] binary is required.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://git-scm.com/downloads
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://junit.org/junit5/
