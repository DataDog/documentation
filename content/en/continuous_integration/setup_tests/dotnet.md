---
title: .NET Tests
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

Supported .NET versions:
* .NET Core >= 2.1 and >= 3.0
* .NET >= 5.0

Supported test frameworks:
* xUnit >= 2.2
* NUnit >= 3.0
* MsTest V2 >= 14

## Prerequisites

[Install the Datadog Agent to collect tests data][1].

## Installing the .NET tracer

To install or update the `dd-trace` command globally on the machine, run:

{{< code-block lang="bash" >}}
dotnet tool update -g dd-trace
{{< /code-block >}}

## Instrumenting tests

To instrument your test suite, prefix your test command with `dd-trace`, providing the name of the service or library under test as the `--dd-service` parameter, and the environment where tests are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) as the `--dd-env` parameter. For example:

{{< code-block lang="bash" >}}
dd-trace --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

All tests are automatically instrumented.

## Configuration settings

You can change the default configuration of the CLI by using command line arguments or environment variables. For a full list of configuration settings, run:

{{< code-block lang="bash" >}}
dd-trace --help
{{< /code-block >}}

The following list shows the default values for key configuration settings:

`--dd-service`
: Name of the service or library under test.<br/>
**Environment variable**: `DD_SERVICE`<br/>
**Default**: The repository name<br/>
**Example**: `my-dotnet-app`

`--dd-env`
: Name of the environment where tests are being run.<br/>
**Environment variable**: `DD_ENV`<br/>
**Default**: `none`<br/>
**Examples**: `local`, `ci`

`--agent-url`
: Datadog Agent URL for trace collection in the form `http://hostname:port`.<br/>
**Environment variable**: `DD_TRACE_AGENT_URL`<br/>
**Default**: `http://localhost:8126`

All other [Datadog Tracer configuration][2] options can also be used.

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
[2]: /tracing/setup_overview/setup/dotnet-core/?tab=windows#configuration
