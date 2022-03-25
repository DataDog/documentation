---
title: Python Tests
kind: documentation
further_reading:
    - link: "/continuous_integration/explore_tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-info">Python test instrumentation is in beta. There are no billing implications for instrumenting Python tests during this period.
</div>

## Compatibility

Supported Python interpreters:
* Python >= 2.7 and >= 3.5

Supported test frameworks:
* pytest >= 3.0.0
  * pytest < 5 when using Python 2

## Prerequisites

[Install the Datadog Agent to collect tests data][1].

## Installing the Python tracer

Install the Python tracer by running:

{{< code-block lang="bash" >}}
pip install -U ddtrace
{{< /code-block >}}

For more information, see the [Python tracer installation documentation][2].

## Instrumenting your tests

To enable instrumentation of `pytest` tests, add the `--ddtrace` option when running `pytest`, specifying the name of the service or library under test in the `DD_SERVICE` environment variable, and the environment where tests are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) in the `DD_ENV` environment variable:

{{< code-block lang="bash" >}}
DD_SERVICE=my-python-app DD_ENV=ci pytest --ddtrace
{{< /code-block >}}

If you also want to enable the rest of the APM integrations to get more information in your flamegraph, add the `--ddtrace-patch-all` option:

{{< code-block lang="bash" >}}
DD_SERVICE=my-python-app DD_ENV=ci pytest --ddtrace --ddtrace-patch-all
{{< /code-block >}}

## Configuration settings

The following is a list of the most important configuration settings that can be used with the tracer, either in code or using environment variables:

`ddtrace.config.service`
: Name of the service or library under test.<br/>
**Environment variable**: `DD_SERVICE`<br/>
**Default**: `pytest`<br/>
**Example**: `my-python-app`

`ddtrace.config.env`
: Name of the environment where tests are being run.<br/>
**Environment variable**: `DD_ENV`<br/>
**Default**: `none`<br/>
**Examples**: `local`, `ci`

The following environment variable can be used to configure the location of the Datadog Agent:

`DD_TRACE_AGENT_URL`
: Datadog Agent URL for trace collection in the form `http://hostname:port`.<br/>
**Default**: `http://localhost:8126`

All other [Datadog Tracer configuration][3] options can also be used.

### Collecting Git metadata

Datadog uses Git information for visualizing your test results and grouping them by repository, branch, and commit. Git metadata is automatically collected by the test instrumentation from CI provider environment variables and the local `.git` folder in the project path, if available.

If you are running tests in non-supported CI providers or with no `.git` folder, you can set the Git information manually using environment variables. These environment variables take precedence over any auto-detected information. Set the following environment variables to provide Git information:

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
**Example**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: Commit author email.<br/>
**Example**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: Commit author date in ISO 8601 format.<br/>
**Example**: `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: Commit committer name.<br/>
**Example**: `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: Commit committer email.<br/>
**Example**: `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: Commit committer date in ISO 8601 format.<br/>
**Example**: `2021-03-12T16:00:28Z`

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/setup_tests/agent/
[2]: /tracing/setup_overview/setup/python/
[3]: /tracing/setup_overview/setup/python/?tab=containers#configuration
