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

{{< site-region region="us,eu" >}}
JUnit test report files are XML files that contain test execution information, such as test and suite names, pass/fail status, duration, and sometimes error logs. Although it was introduced by the [JUnit][1] testing framework, many other popular frameworks are able to output results using this format.

As an alternative to instrumenting your tests natively using Datadog tracers, which is the recommended option as it provides the most comprehensive test results, you can also upload JUnit XML test reports.

Test results imported from JUnit XML reports appear alongside test data reported by tracers. However, there are some limitations when using this method, such as the lack of distributed traces on integration tests or structured stack traces. For this reason, only use this method if there is no native support for the language or testing framework being used.

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

Specify a valid [Datadog API key][3] in the `DATADOG_API_KEY` environment variable, and the environment where tests were run (for example, `local` when uploading results from a developer workstation, or `ci` when uploading them from a CI provider) in the `DD_ENV` environment variable. For example:

{{< site-region region="us" >}}
{{< code-block lang="bash" >}}
DD_ENV=ci DATADOG_API_KEY=<api_key> datadog-ci junit upload \
  --service my-api-service \
  unit-tests/junit-reports e2e-tests/single-report.xml
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="eu" >}}
{{< code-block lang="bash" >}}
DD_ENV=ci DATADOG_API_KEY=<api_key> DATADOG_SITE=datadoghq.eu datadog-ci junit upload \
  --service my-api-service \
  unit-tests/junit-reports e2e-tests/single-report.xml
{{< /code-block >}}
{{< /site-region >}}

## Configuration settings

This is the full list of options available when using the `datadog-ci junit upload` command:

`--service` (Required)
: Name of the service or library under test.<br/>
**Environment variable**: `DD_SERVICE`<br/>
**Example**: `my-api-service`

`--tags`
: Key-value pairs in the form `key:value` to be attached to all tests (the `--tags` parameter can be specified multiple times). When specifying tags using `DD_TAGS`, separate them using commas (for example, `team:backend,priority:high`).<br/>
**Environment variable**: `DD_TAGS`<br/>
**Default**: (none)<br/>
**Example**: `team:backend`<br/>
**Note**: Tags specified using `--tags` and with the `DD_TAGS` environment variable are merged. If the same key appears in both `--tags` and `DD_TAGS`, the value in the environment variable `DD_TAGS` takes precedence.

`--max-concurrency`
: The number of concurrent uploads to the API.<br/>
**Default**: `20`

`--dry-run`
: Runs the command without actually uploading the file to Datadog. All other checks are performed.<br/>
**Default**: `false`

Positional arguments
: The file paths or directories in which the JUnit XML reports are located. If you pass a directory, the CLI looks for all `.xml` files in it.

The following environment variables are supported:

`DATADOG_API_KEY` (Required)
: [Datadog API key][3] used to authenticate the requests.<br/>
**Default**: (none)

`DD_ENV`
: The environment you want your test results to appear in.<br/>
**Default**: (none)<br/>
**Examples**: `local`, `ci`

{{< site-region region="eu" >}}
Additionally, configure the Datadog site to use the selected one ({{< region-param key="dd_site_name" >}}):

`DATADOG_SITE` (Required)
: The [Datadog site][1] to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}

[1]: /getting_started/site/
{{< /site-region >}}


## Collecting repository and commit metadata

The Datadog CI CLI tries to extract git repository and commit metadata from CI provider environment variables and from the local `.git` directory and attach it to test executions. In order to read this directory, the [`git`][4] binary is required.

If running tests in non-supported CI providers or with no `.git` folder, Git information can be set manually using environment variables. These environment variables take precedence over any autodetected information.
The supported environment variables for providing Git information are the following:

`DD_GIT_REPOSITORY_URL`
: URL of the repository where the code is stored. Both HTTP and SSH URLs are supported.<br/>
**Example**: `git@github.com:MyCompany/MyApp.git`, `https://github.com/MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: Git branch being tested. Leave empty if providing tag information instead.<br/>
**Example**: `develop`

`DD_GIT_TAG`
: Git tag being tested (if applicable). Leave empty if providing branch information instead.<br/>
**Example**: `1.0.1`

`DD_GIT_COMMIT_SHA`
: Full commit hash.<br/>
**Example**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: Commit message.<br/>
**Example**: `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: Commit author name.<br/>
**Example**: `John Doe`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: Commit author email.<br/>
**Example**: `john@doe.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: Commit author date in ISO 8601 format.<br/>
**Example**: `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: Commit committer name.<br/>
**Example**: `Jane Doe`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: Commit committer email.<br/>
**Example**: `jane@doe.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: Commit committer date in ISO 8601 format.<br/>
**Example**: `2021-03-12T16:00:28Z`

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://junit.org/junit5/
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://git-scm.com/downloads
{{< /site-region >}}
{{< site-region region="us3,gov" >}}
The selected Datadog site ({{< region-param key="dd_site_name" >}}) is not supported at this time.
{{< /site-region >}}
