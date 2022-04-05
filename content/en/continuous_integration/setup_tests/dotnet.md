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

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

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

<div class="alert alert-info">
  <strong>Note:</strong> Agentless mode is currently on beta, if you want to test this feature follow the [instructions][5].
</div>

## Installing the .NET tracer

To install or update the `dd-trace` command globally on the machine, run:

{{< code-block lang="bash" >}}
dotnet tool update -g dd-trace
{{< /code-block >}}

## Instrumenting tests

To instrument your test suite, prefix your test command with `dd-trace ci run`, providing the name of the service or library under test as the `--dd-service` parameter, and the environment where tests are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) as the `--dd-env` parameter. For example:

{{< code-block lang="bash" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

All tests are automatically instrumented.

## Configuration settings

You can change the default configuration of the CLI by using command line arguments or environment variables. For a full list of configuration settings, run:

{{< code-block lang="bash" >}}
dd-trace ci run --help
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

## Custom instrumentation


<div class="alert alert-warning">
  <strong>Note:</strong> Your custom instrumentation setup depends on the <code>dd-trace</code> version. To use the custom instrumentation, you must keep the package versions for <code>dd-trace</code> and <code>Datadog.Trace</code> NuGet packages in sync.
</div>

To use the custom instrumentation in your .NET application:

1. Execute `dd-trace --version` to get the version of the tool.
1. Add the `Datadog.Trace` [NuGet package][3] with the same version to your application.
2. In your application code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

For more information about how to add spans and tags for custom instrumentation, see the [.NET Custom Instrumentation documentation][4].

## Agentless (Beta)

To instrument your test suite without requiring an agent, prefix your test command with `dd-trace ci run`, providing the Datadog API key][6] as the `--api-key`, the name of the service or library under test as the `--dd-service` parameter, and the environment where tests are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) as the `--dd-env` parameter. For example:

{{< code-block lang="bash" >}}
dd-trace ci run --api-key <API KEY> --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

When the `--api-key` is set, the agentless mode is automatically enabled.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /continuous_integration/setup_tests/agent/
[2]: /tracing/setup_overview/setup/dotnet-core/?tab=windows#configuration
[3]: https://www.nuget.org/packages/Datadog.Trace
[4]: /tracing/setup_overview/custom_instrumentation/dotnet/
[5]: /continuous_integration/setup_tests/dotnet/#agentless-beta
[6]: https://app.datadoghq.com/organization-settings/api-keys