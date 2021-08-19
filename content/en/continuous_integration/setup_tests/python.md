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

### Collecting Git and build metadata

Correct Git information is essential for the CI visibility product. Both pipeline visualization and testing instrumentation use git to identify and group their results. Git metadata and build information is automatically collected using CI provider environment variables and is also collected using the local `.git` folder at the project path.

The user can also provide Git information by using custom environment variables. This is useful for adding Git information for non-supported CI providers, or for .git folders that are not available from the running process. Custom environment variables are also useful for overwriting existing Git information. If these environment variables are set, they take precedence over those coming from the CI or from the .git folder. The list of supported environment variables for Git information includes the following:

`DD_GIT_REPOSITORY_URL`
: URL of the repository where the code is stored.
**Example**: `git@github.com:MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: Branch where this commit belongs.
**Example**: `develop`

`DD_GIT_TAG`
: Tag of the commit, if it has one.
**Example**: `1.0.1`

`DD_GIT_COMMIT_SHA`
: Commit SHA.
**Example**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: Commit message.
**Example**: `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: Author name.
**Example**: `John Doe`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: Author email.
**Example**: `john@doe.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: Author date. ISO 8601 format.
**Example**: `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: Committer name.
**Example**: `Jane Doe`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: Committer email.
**Example**: `jane@doe.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: Committer date. ISO 8601 format.
**Example**: `2021-03-12T16:00:28Z`

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/setup_tests/agent/
[2]: /tracing/setup_overview/setup/python/
[3]: /tracing/setup_overview/setup/python/?tab=containers#configuration
